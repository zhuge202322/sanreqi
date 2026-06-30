import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { company } from "../data";

export function FloatingContact() {
  const whatsappUrl = `https://wa.me/${company.whatsapp.replace(/\D/g, "")}`;

  return (
    <aside className="floating-contact" aria-label="Quick contact">
      <span className="floating-contact-label">Contact</span>
      <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contact us on WhatsApp">
        <MessageCircle size={18} />
        <span>WhatsApp</span>
      </a>
      <a href={`mailto:${company.email}`} aria-label="Send email to Huixun Metal">
        <Mail size={18} />
        <span>E-mail</span>
      </a>
      <a href={`tel:${company.phone.replace(/\s/g, "")}`} aria-label="Call Huixun Metal">
        <Phone size={18} />
        <span>Phone</span>
      </a>
      <div className="floating-contact-note" aria-label={`WeChat ${company.wechat}`}>
        <Send size={18} />
        <span>WeChat</span>
        <strong>{company.wechat}</strong>
      </div>
    </aside>
  );
}
