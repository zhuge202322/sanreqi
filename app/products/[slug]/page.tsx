import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Download, FileText, Mail, ShieldCheck } from "lucide-react";
import { finishes, processSteps, productFeatureTemplate, products, transportationStorage } from "../../data";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return {
    title: product ? `${product.shortTitle} | Custom Heat Sink Factory` : "Heat Sink Product",
    description: product?.summary,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const specs = [
    ["Product Name", product.productName],
    ["Model No.", product.model],
    ["Width", `${product.width} / ${product.inchWidth}`],
    ["Material", product.material],
    ["OEM / ODM", product.oemOdm],
    ["Surface Treatment", product.surfaceTreatment],
    ["Custom Sizes", product.customSizes],
    ["Test Report", product.testReport],
    ["Cutting Tolerance", product.cuttingTolerance],
    ["Hole Position Tolerance", product.holeTolerance],
    ["Weight", product.weight],
    ["Fin Count", product.finCount],
  ];

  const featureList = [
    ...productFeatureTemplate.slice(0, 3),
    `The ${product.finCount} increase the heat sink contact area and help provide greater heat transfer.`,
    ...productFeatureTemplate.slice(3),
  ];

  return (
    <>
      <section className="product-detail-hero navy-hero">
        <div className="container detail-grid">
          <div className="detail-copy">
            <p className="eyebrow hero-sequence">Product detail / {product.model}</p>
            <h1 className="page-title hero-sequence">{product.title}</h1>
            <p className="page-intro hero-sequence">{product.summary}</p>
            <div className="hero-spec-rail hero-sequence">
              <span>AL6063-T5</span>
              <span>{product.cuttingTolerance} cut</span>
              <span>{product.holeTolerance} holes</span>
            </div>
            <div className="hero-actions hero-sequence">
              <Link className="primary-button" href="/inquiry">
                <Mail size={18} />
                Request this profile
              </Link>
              <Link className="secondary-button" href="/products">
                <ArrowRight size={18} />
                Back to products
              </Link>
            </div>
          </div>
          <div className="detail-visual tilt-card hero-sequence">
            <span className="drawing-label">CAD main image / {product.model}</span>
            <div className="scan-window detail-window">
              <span className="scan-line" />
              <img src={product.image} alt={`${product.model} dimension drawing main image`} />
            </div>
            <img className="floating-photo detail-blueprint" src={product.photo} alt={`${product.model} actual product photo`} />
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container detail-layout">
          <div className="spec-block reveal">
            <p className="eyebrow">Product Parameters</p>
            <h2>More About Extruded Aluminum Heat Sink</h2>
            <div className="spec-table">
              {specs.map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="detail-panel reveal">
            <p className="eyebrow">Product Description</p>
            <h2>Designed for continuous thermal load in industrial electronics.</h2>
            <p>{product.description}</p>
            <p>
              Please confirm the heat sink drawing, profile size, cutting length, hole positions,
              surface treatment, logo requirements, order quantity, and packaging requirements before quotation.
            </p>
            <div className="document-stack">
              <div>
                <FileText size={18} />
                <span>Preferred drawings</span>
                <strong>STEP / PDF / DXF</strong>
              </div>
              <div>
                <ShieldCheck size={18} />
                <span>Compliance file</span>
                <strong>{product.testReport}</strong>
              </div>
            </div>
            <p className="eyebrow detail-subtitle">Recommended applications</p>
            <div className="check-list">
              {product.applications.map((application) => (
                <span key={application}>
                  <CheckCircle2 size={18} />
                  {application}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section light-section performance-section">
        <div className="container performance-layout">
          <div className="thermal-chart reveal">
            <div className="chart-head">
              <span>Thermal resistance vs airflow</span>
              <strong>{product.model}</strong>
            </div>
            <svg aria-label="Illustrative thermal performance chart" role="img" viewBox="0 0 420 260">
              <path className="chart-grid-line" d="M36 42H390M36 92H390M36 142H390M36 192H390" />
              <path className="chart-grid-line" d="M80 28V222M148 28V222M216 28V222M284 28V222M352 28V222" />
              <path className="chart-axis" d="M36 28V222H390" />
              <path className="chart-baseline" d="M44 204C105 168 154 138 220 110C278 85 320 70 382 52" />
              <path className="chart-accent" d="M44 178C96 134 148 98 214 74C276 52 324 42 382 34" />
            </svg>
          </div>
          <div className="detail-panel reveal">
            <p className="eyebrow">Thermal Benchmark</p>
            <h2>Confirm final performance with your airflow, load, and assembly space.</h2>
            <p>
              The drawing profile is the quotation baseline. Final thermal behavior depends on air velocity,
              component contact quality, mounting pressure, ambient temperature, and enclosure layout.
            </p>
            <div className="check-list">
              <span>
                <CheckCircle2 size={18} />
                Use the CAD drawing to verify fin clearance and mounting area.
              </span>
              <span>
                <CheckCircle2 size={18} />
                Share heat load, airflow direction, and duty cycle for engineering review.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section navy-section">
        <div className="container detail-layout">
          <div className="section-heading reveal">
            <p className="eyebrow on-dark">Features</p>
            <h2>Thermal performance, machining options, and buyer-side confirmation points.</h2>
          </div>
          <div className="dark-list reveal">
            {featureList.map((item) => (
              <span key={item}>
                <CheckCircle2 size={18} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container detail-layout">
          <div className="section-heading reveal">
            <p className="eyebrow">Customization Options</p>
            <h2>Confirm drawing-based requirements before sample and mass production.</h2>
          </div>
          <div className="check-list reveal">
            {product.highlights.map((item) => (
              <span key={item}>
                <CheckCircle2 size={18} />
                {item}
              </span>
            ))}
            {finishes.slice(0, 4).map((finish) => (
              <span key={finish}>
                <CheckCircle2 size={18} />
                {finish}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container detail-layout storage-layout">
          <div className="section-heading reveal">
            <p className="eyebrow">Transportation & Storage</p>
            <h2>Protect surface quality before assembly or shipment transfer.</h2>
          </div>
          <div className="check-list reveal">
            {transportationStorage.map((item) => (
              <span key={item}>
                <CheckCircle2 size={18} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section light-section production-path-section">
        <div className="container split-heading">
          <div className="section-heading reveal">
            <p className="eyebrow">Production path</p>
            <h2>From drawing review to protected export packing.</h2>
          </div>
          <Link className="outline-button reveal" href="/inquiry">
            <Download size={18} />
            Send drawing
          </Link>
        </div>
        <div className="container process-grid compact">
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
    </>
  );
}
