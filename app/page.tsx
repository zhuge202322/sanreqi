import Link from "next/link";
import { ArrowRight, BadgeCheck, Boxes, Factory, Gauge, Mail, ShieldCheck, Truck } from "lucide-react";
import { ProductCard } from "./components/ProductCard";
import { articleCards, capabilities, company, factoryProof, homeMetrics, processSteps, products } from "./data";

export default function Home() {
  const featuredProducts = products.slice(1, 4);

  return (
    <>
      <section className="home-hero navy-hero">
        <div className="container hero-grid">
          <div className="hero-copy-block">
            <p className="eyebrow hero-sequence">Foshan export factory for thermal aluminum profiles</p>
            <h1 className="hero-title hero-sequence">Extruded aluminum heat sinks built for export programs.</h1>
            <p className="hero-text hero-sequence">
              30 mm to 252 mm heat sink extrusion profiles with cutting, hole machining, surface finishing,
              sample support, and protected carton packing for industrial electronics buyers.
            </p>
            <div className="hero-actions hero-sequence">
              <Link className="primary-button" href="/inquiry">
                <Mail size={18} />
                Send RFQ
              </Link>
              <Link className="secondary-button" href="/products">
                <Boxes size={18} />
                View products
              </Link>
            </div>
          </div>

          <div className="hero-product tilt-card hero-sequence">
            <div className="scan-window">
              <span className="scan-line" />
              <img src="/assets/product-100.webp" alt="100 mm extruded aluminum heat sink dimension drawing" />
            </div>
            <div className="hero-product-readout">
              <span>SR-K002</span>
              <strong>100 mm extrusion profile</strong>
              <small>6063-T5 aluminum alloy, custom cut length, drilling, tapping, and finish options.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container metric-grid">
          {homeMetrics.map((metric) => (
            <article className="metric-card reveal" key={metric.label}>
              <metric.icon size={22} />
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section light-section">
        <div className="container split-heading">
          <div className="section-heading reveal">
            <p className="eyebrow">Profile series</p>
            <h2>Width-based heat sink extrusions for purchasing and engineering teams.</h2>
          </div>
          <Link className="outline-button reveal" href="/products">
            All profiles
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="container product-grid three-up">
          {featuredProducts.map((product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      </section>

      <section className="section navy-section">
        <div className="container capability-layout">
          <div className="section-heading reveal">
            <p className="eyebrow on-dark">Factory capability</p>
            <h2>Numbers and process details visible before the buyer sends drawings.</h2>
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
        <div className="container factory-grid">
          <div className="section-heading reveal">
            <p className="eyebrow">Production workflow</p>
            <h2>Our Comprehensive Production Workflow</h2>
            <p className="section-note">Storage · Cutting · Processing · Packaging · Shipping</p>
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

      <section className="section process-section">
        <div className="container split-heading">
          <div className="section-heading reveal">
            <p className="eyebrow">RFQ workflow</p>
            <h2>A clear path from technical drawing to export shipment.</h2>
          </div>
          <Link className="primary-button reveal" href="/inquiry">
            Start inquiry
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="container process-grid">
          {processSteps.map((step) => (
            <article className="process-card reveal" key={step.step}>
              <span>{step.step}</span>
              <step.icon size={24} />
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section light-section">
        <div className="container split-heading">
          <div className="section-heading reveal">
            <p className="eyebrow">Buyer notes</p>
            <h2>Short technical articles for custom heat sink sourcing.</h2>
          </div>
          <Link className="outline-button reveal" href="/articles">
            Read articles
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="container article-grid">
          {articleCards.map((article) => (
            <article className="article-card tilt-card reveal" key={article.slug}>
              <img src={article.image} alt={article.title} loading="lazy" />
              <div>
                <span>{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner reveal">
          <div>
            <p className="eyebrow on-dark">Quote-ready details</p>
            <h2>Send model, width, length, hole positions, surface finish, quantity, and destination.</h2>
          </div>
          <Link className="primary-button light-button" href="/inquiry">
            Contact {company.name.split(" ")[2]}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
