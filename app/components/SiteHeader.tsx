"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Send, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "../data";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand-lockup" href="/" aria-label="Huixun Metal home" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <img src="/logo-web.png" alt="Foshan City Huixun Metal" />
          </span>
          <span className="brand-copy">
            <strong>Huixun Metal</strong>
            <small>Extruded heat sink factory</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link className={isActive(link.href) ? "is-active" : ""} href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link className="nav-cta" href="/inquiry">
            <Send size={18} />
            Send RFQ
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <nav className={`mobile-nav ${open ? "is-open" : ""}`} id="mobile-menu" aria-label="Mobile navigation">
        {navLinks.map((link) => (
          <Link className={isActive(link.href) ? "is-active" : ""} href={link.href} key={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
