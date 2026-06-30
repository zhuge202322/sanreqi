import Link from "next/link";
import { ExternalLink, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { company, navLinks } from "../data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="/logo-web.png" alt="Foshan City Huixun metal CO., LTD." />
          <strong>{company.name}</strong>
          <p>
            Custom extruded aluminum heat sinks, CNC machining, surface finishing, and protected export packing
            from Foshan, China.
          </p>
          <a className="footer-social-button" href={company.facebook} target="_blank" rel="noreferrer">
            <ExternalLink size={18} />
            Facebook
          </a>
        </div>
        <div className="footer-links">
          <strong>Pages</strong>
          {navLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="footer-contact">
          <strong>Contact</strong>
          <a href={`mailto:${company.email}`}>
            <Mail size={18} />
            {company.email}
          </a>
          <a href="tel:+8615989996985">
            <Phone size={18} />
            {company.phone}
          </a>
          <a href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
            <MessageCircle size={18} />
            WhatsApp {company.whatsapp}
          </a>
          <span>
            <Send size={18} />
            WeChat {company.wechat}
          </span>
          <span>
            <MapPin size={18} />
            {company.address}
          </span>
        </div>
      </div>
    </footer>
  );
}
