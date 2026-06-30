import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, Ruler } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { capabilities, finishes, products } from "../data";

export const metadata: Metadata = {
  title: "Extruded Aluminum Heat Sink Products | Huixun Metal",
  description: "30 mm to 252 mm extruded aluminum heat sink profiles for custom factory quotations.",
};

export default function ProductsPage() {
  const catalogGroups = [
    {
      title: "Catalog",
      items: [
        { href: "#standard-profiles", label: "Standard profiles" },
        { href: "#manufacturing-options", label: "Manufacturing options" },
        { href: "#custom-widths", label: "Custom widths" },
      ],
    },
    {
      title: "Categories",
      items: [
        { href: "#width-30-80", label: "30-80 mm compact series" },
        { href: "#width-81-120", label: "81-120 mm power series" },
        { href: "#width-121-252", label: "121-252 mm custom series" },
      ],
    },
    {
      title: "Subcategories",
      items: [
        { href: "#machining", label: "Cutting, drilling, tapping" },
        { href: "#surface", label: "Anodized and polished finish" },
        { href: "#packing", label: "Export carton packing" },
      ],
    },
  ];

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
            <span>30 mm to 252 mm width range with OEM / ODM support</span>
          </div>
        </div>
      </section>

      <section className="section light-section" id="standard-profiles">
        <div className="container product-catalog-layout">
          <aside className="catalog-sidebar reveal" aria-label="Product catalog navigation">
            <div className="catalog-sidebar-head">
              <Boxes size={20} />
              <strong>Product directory</strong>
              <span>30-252 mm</span>
            </div>
            {catalogGroups.map((group) => (
              <div className="catalog-group" key={group.title}>
                <h2>{group.title}</h2>
                {group.items.map((item) => (
                  <a href={item.href} key={`${group.title}-${item.href}`}>
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
          </aside>
          <div className="catalog-main">
            <div className="product-filter-row reveal">
              {products.map((product) => (
                <Link href={`/products/${product.slug}`} key={product.slug}>
                  <Ruler size={16} />
                  {product.width} / {product.model}
                </Link>
              ))}
            </div>
            <div className="category-anchor-row reveal" aria-label="Heat sink width categories">
              <span id="width-30-80">30-80 mm compact series</span>
              <span id="width-81-120">81-120 mm power series</span>
              <span id="width-121-252">121-252 mm custom series</span>
            </div>
            <div className="product-grid">
              {products.map((product) => (
                <div key={product.slug}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section navy-section" id="manufacturing-options">
        <div className="container spec-matrix">
          <div className="section-heading reveal">
            <p className="eyebrow on-dark">Shared manufacturing options</p>
            <h2>Profile selection is only the start. The export order is configured around your drawing.</h2>
          </div>
          <div className="matrix-grid">
            {capabilities.map((item) => (
              <article className="matrix-card reveal" id={item.label === "Custom work" ? "machining" : undefined} key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
          <div className="finish-list reveal">
            {finishes.map((finish) => (
              <span id={finish.includes("Mill") ? "surface" : finish.includes("packing") ? "packing" : undefined} key={finish}>
                {finish}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band" id="custom-widths">
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
