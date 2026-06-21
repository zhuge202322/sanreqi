import type { Metadata } from "next";
import { Mail, Phone, ShieldCheck } from "lucide-react";
import { InquiryForm } from "../components/InquiryForm";
import { company, processSteps } from "../data";

export const metadata: Metadata = {
  title: "Send RFQ | Custom Aluminum Heat Sink Inquiry",
  description: "Send model, drawing, dimensions, hole positions, finish, quantity, and destination for heat sink quotation.",
};

export default function InquiryPage() {
  return (
    <>
      <section className="sub-hero navy-hero">
        <div className="container sub-hero-grid">
          <div>
            <p className="eyebrow hero-sequence">Request a quote</p>
            <h1 className="page-title hero-sequence">Send drawings and sourcing details for a factory quotation.</h1>
            <p className="page-intro hero-sequence">
              The fastest quote includes model or width, cut length, hole positions, surface finish, logo requirements,
              quantity, packaging, and shipping destination.
            </p>
          </div>
          <div className="sub-hero-card hero-sequence">
            <ShieldCheck size={28} />
            <strong>RFQ checklist</strong>
            <span>Drawing, application, quantity, finish, packing, and destination</span>
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container inquiry-grid">
          <div className="inquiry-aside reveal">
            <p className="eyebrow">Direct contact</p>
            <h2>Attach drawings by email after submitting the form.</h2>
            <a href={`mailto:${company.email}`}>
              <Mail size={18} />
              {company.email}
            </a>
            <a href="tel:+8615989996985">
              <Phone size={18} />
              {company.phone}
            </a>
          </div>
          <div className="form-panel reveal">
            <InquiryForm />
          </div>
        </div>
      </section>

      <section className="section navy-section">
        <div className="container process-grid compact">
          {processSteps.map((step) => (
            <article className="process-card dark-process reveal" key={step.step}>
              <span>{step.step}</span>
              <step.icon size={24} />
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
