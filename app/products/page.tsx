import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, Ruler } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { capabilities, finishes, products } from "../data";

export const metadata: Metadata = {
  title: "Extruded Aluminum Heat Sink Products | Huixun Metal",
  description: "55 mm, 75 mm, 85 mm, and 100 mm extruded aluminum heat sink profiles for custom factory quotations.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="sub-hero navy-hero">
        <div className="container sub-hero-grid">
          <div>
            <p className="eyebrow hero-sequence">Product list</p>
            <h1 className="page-title hero-sequence">Extruded aluminum heat sink profiles by width.</h1>
            <p className="page-intro hero-sequence">
              Compare standard profiles, then send drawings for custom length, machining, surface finish, logo,
              packaging, and export destination.
            </p>
          </div>
          <div className="sub-hero-card hero-sequence">
            <Boxes size={28} />
            <strong>5 active profiles</strong>
            <span>55 mm to 100 mm series with OEM / ODM support</span>
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container product-filter-row reveal">
          {products.map((product) => (
            <Link href={`/products/${product.slug}`} key={product.slug}>
              <Ruler size={16} />
              {product.width} / {product.model}
            </Link>
          ))}
        </div>
        <div className="container product-grid">
          {products.map((product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      </section>

      <section className="section navy-section">
        <div className="container spec-matrix">
          <div className="section-heading reveal">
            <p className="eyebrow on-dark">Shared manufacturing options</p>
            <h2>Profile selection is only the start. The export order is configured around your drawing.</h2>
          </div>
          <div className="matrix-grid">
            {capabilities.map((item) => (
              <article className="matrix-card reveal" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
          <div className="finish-list reveal">
            {finishes.map((finish) => (
              <span key={finish}>{finish}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner reveal">
          <div>
            <p className="eyebrow on-dark">Need another width?</p>
            <h2>Send your drawing or application load and ask for a custom extrusion quote.</h2>
          </div>
          <Link className="primary-button light-button" href="/inquiry">
            Request quote
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
