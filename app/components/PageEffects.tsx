"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function PageEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    if (reduceMotion) {
      revealNodes.forEach((node) => {
        node.style.opacity = "1";
        node.style.transform = "none";
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nav-shell",
        { y: -24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-sequence",
        { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.09, ease: "power3.out" }
      );

      ScrollTrigger.batch(".reveal", {
        start: "top 84%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power3.out" }
          ),
      });

      if (document.querySelector(".scan-line")) {
        gsap.fromTo(
          ".scan-line",
          { xPercent: -120 },
          {
            xPercent: 170,
            duration: 1.4,
            ease: "power2.inOut",
            stagger: 0.08,
            scrollTrigger: { trigger: "main", start: "top 85%" },
          }
        );
      }

      if (document.querySelector(".floating-photo")) {
        gsap.fromTo(
          ".floating-photo",
          { y: 14, opacity: 0, rotate: -1 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: { trigger: "main", start: "top 85%" },
          }
        );
      }

      document.querySelectorAll<HTMLElement>(".tilt-card").forEach((card) => {
        const onMove = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          card.style.setProperty("--tilt-x", `${-y * 5}deg`);
          card.style.setProperty("--tilt-y", `${x * 7}deg`);
          card.style.setProperty("--shine-x", `${(x + 0.5) * 100}%`);
          card.style.setProperty("--shine-y", `${(y + 0.5) * 100}%`);
        };
        const onLeave = () => {
          card.style.setProperty("--tilt-x", "0deg");
          card.style.setProperty("--tilt-y", "0deg");
          card.style.setProperty("--shine-x", "50%");
          card.style.setProperty("--shine-y", "50%");
        };
        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        });
      });
    });

    ScrollTrigger.refresh();

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname]);

  return null;
}
