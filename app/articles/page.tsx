import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { articleCards, products } from "../data";

export const metadata: Metadata = {
  title: "Heat Sink Sourcing Articles | Huixun Metal",
  description: "Technical articles for custom extruded aluminum heat sink RFQs, profile selection, and export packing.",
};

export default function ArticlesPage() {
  return (
    <>
      <section className="sub-hero navy-hero">
        <div className="container sub-hero-grid">
          <div>
            <p className="eyebrow hero-sequence">Articles</p>
            <h1 className="page-title hero-sequence">Practical notes for custom heat sink sourcing.</h1>
            <p className="page-intro hero-sequence">
              Short buyer-focused guides for RFQ preparation, extrusion profile selection, thermal fit, and protected
              export packing.
            </p>
          </div>
          <div className="sub-hero-card hero-sequence">
            <FileText size={28} />
            <strong>Buyer knowledge base</strong>
            <span>RFQ, engineering, and export notes for aluminum heat sinks</span>
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container article-feature reveal">
          <div className="article-feature-media">
            <img src="/assets/factory-cutting.webp" alt="Heat sink cutting machine" />
          </div>
          <article>
            <span>RFQ Guide</span>
            <h2>What to prepare before requesting a custom aluminum heat sink quote</h2>
            <p>
              A clear RFQ helps the factory check feasibility, quote faster, and reduce engineering back-and-forth.
              Buyers should prepare profile width or model, cut length, mounting hole coordinates, application load,
              surface finish, logo needs, quantity plan, packing requirements, and shipping destination.
            </p>
            <div className="article-points">
              <strong>Quote-ready checklist</strong>
              <ul>
                <li>Profile model or heat sink drawing with width, height, base thickness, and fin dimensions.</li>
                <li>Cut length, hole positions, tapping requirements, and tolerance expectations.</li>
                <li>Finish choice: mill, brushed, polished, anodized, or custom marking.</li>
                <li>Sample quantity, mass production quantity, packaging, and destination country.</li>
              </ul>
            </div>
            <Link className="primary-button" href="/inquiry">
              Send your RFQ
              <ArrowRight size={18} />
            </Link>
          </article>
        </div>
      </section>

      <section className="section navy-section">
        <div className="container article-grid">
          {articleCards.map((article) => (
            <article className="article-card dark-article tilt-card reveal" key={article.slug}>
              <img src={article.image} alt={article.title} loading="lazy" />
              <div>
                <span>{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <small>{article.readTime}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section light-section">
        <div className="container spec-matrix">
          <div className="section-heading reveal">
            <p className="eyebrow">Profiles mentioned in sourcing notes</p>
            <h2>Start with width, then confirm machining and finish details.</h2>
          </div>
          <div className="matrix-grid">
            {products.map((product) => (
              <Link className="matrix-card reveal" href={`/products/${product.slug}`} key={product.slug}>
                <span>{product.width}</span>
                <strong>{product.model}</strong>
                <p>{product.shortTitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
