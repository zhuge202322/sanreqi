import type { Metadata } from "next";
import { Factory, Globe2, MapPin, PackageCheck } from "lucide-react";
import { capabilities, company, factoryProof } from "../data";

export const metadata: Metadata = {
  title: "About Huixun Metal | Foshan Heat Sink Factory",
  description: "Company profile, factory capability, address, and export support for custom aluminum heat sinks.",
};

export default function AboutPage() {
  return (
    <>
      <section className="sub-hero navy-hero about-hero">
        <div className="container sub-hero-grid">
          <div>
            <p className="eyebrow hero-sequence">About the factory</p>
            <h1 className="page-title hero-sequence">Foshan aluminum heat sink manufacturing for export buyers.</h1>
            <p className="page-intro hero-sequence">
              Huixun Metal supports extrusion profile selection, cutting, machining, surface treatment, sample
              confirmation, packing, and shipment for industrial electronics programs.
            </p>
          </div>
          <div className="sub-hero-image hero-sequence">
            <img src="/assets/factory-front.webp" alt="Huixun Metal factory entrance" />
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container about-grid">
          <article className="about-card reveal">
            <Factory size={26} />
            <span>Manufacturing company</span>
            <h2>{company.name}</h2>
            <p>{company.address}</p>
          </article>
          <article className="about-card reveal">
            <Globe2 size={26} />
            <span>Trading and export support</span>
            <h2>{company.tradingName}</h2>
            <p>{company.tradingAddress}</p>
          </article>
        </div>
      </section>

      <section className="section navy-section">
        <div className="container capability-layout">
          <div className="section-heading reveal">
            <p className="eyebrow on-dark">What buyers can verify</p>
            <h2>Real process proof, clear tolerances, and export-aware packing.</h2>
          </div>
          <div className="capability-grid">
            {capabilities.map((item) => (
              <article className="dark-card tilt-card reveal" key={item.label}>
                <item.icon size={24} />
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container factory-grid about-gallery">
          <div className="section-heading reveal">
            <p className="eyebrow">Factory images</p>
            <h2>Stock, cutting, and shipment scenes from the working floor.</h2>
          </div>
          {factoryProof.map((item) => (
            <figure className="factory-tile reveal" key={item.title}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <figcaption>
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section contact-band">
        <div className="container contact-grid reveal">
          <div>
            <MapPin size={24} />
            <strong>Factory location</strong>
            <p>{company.address}</p>
          </div>
          <div>
            <PackageCheck size={24} />
            <strong>Export support</strong>
            <p>Carton packing, loading coordination, and shipment details can be confirmed before production.</p>
          </div>
        </div>
      </section>
    </>
  );
}
