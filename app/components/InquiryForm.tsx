"use client";

import { FormEvent, useState } from "react";
import { FileUp, Send } from "lucide-react";
import { company, products } from "../data";

export function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sent");
  };

  return (
    <form className="rfq-form" onSubmit={handleSubmit}>
      <label>
        Company name
        <input name="company" placeholder="Your company" required autoComplete="organization" />
      </label>
      <label>
        Work email
        <input name="email" type="email" placeholder="buyer@example.com" required autoComplete="email" />
      </label>
      <label>
        Phone or WhatsApp
        <input name="phone" type="tel" placeholder="+1 555 000 0000" autoComplete="tel" />
      </label>
      <label>
        Profile width or model
        <select name="profile" defaultValue={products[4].model}>
          {products.map((product) => (
            <option value={product.model} key={product.slug}>
              {product.model} - {product.width}
            </option>
          ))}
          <option value="custom">Custom drawing</option>
        </select>
      </label>
      <label>
        Application
        <input name="application" placeholder="Inverter, welding machine, amplifier..." />
      </label>
      <label>
        Order quantity
        <input name="quantity" placeholder="Sample quantity and mass production plan" />
      </label>
      <label>
        Cut length
        <input name="length" placeholder="e.g. 80 mm, 120 mm, or custom" />
      </label>
      <label>
        Surface finish
        <select name="finish" defaultValue="Mill finish">
          <option>Mill finish</option>
          <option>Brushed finish</option>
          <option>Mirror polished finish</option>
          <option>Anodized finish</option>
          <option>Custom finish</option>
        </select>
      </label>
      <label className="full-span">
        Requirements
        <textarea
          name="message"
          placeholder="Length, hole positions, surface finish, logo, packing, destination country, and target lead time..."
          rows={6}
        />
      </label>
      <div className="upload-panel full-span">
        <FileUp size={28} />
        <strong>STEP / PDF / DXF drawing package</strong>
        <span>Email files to {company.email} after submitting. Include hole coordinates, base thickness, and assembly limits.</span>
      </div>
      <button className="primary-button form-button" type="submit">
        <Send size={18} />
        Submit technical RFQ
      </button>
      <p className={`form-status ${status === "sent" ? "is-visible" : ""}`} aria-live="polite">
        RFQ details are captured on this frontend. Please email drawings to {company.email} for quotation.
      </p>
    </form>
  );
}
