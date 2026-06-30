import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { products } from "../data";

type Product = (typeof products)[number];

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card tilt-card reveal">
      <Link className="product-media" href={`/products/${product.slug}`}>
        <span className="product-series">Series {product.model}</span>
        <img className="product-photo" src={product.image} alt={`${product.model} dimension drawing main image`} loading="lazy" />
        <span className="product-photo-chip">Actual photos inside</span>
      </Link>
      <div className="product-card-body">
        <div className="product-meta">
          <span>{product.width}</span>
          <strong>{product.model}</strong>
        </div>
        <h3>{product.shortTitle}</h3>
        <p>{product.summary}</p>
        <dl className="mini-specs">
          <div>
            <dt>Weight</dt>
            <dd>{product.weight}</dd>
          </div>
          <div>
            <dt>Fins</dt>
            <dd>{product.fins}</dd>
          </div>
        </dl>
        <div className="catalog-readout">
          <span>Material</span>
          <strong>{product.material}</strong>
          <span>Tolerance</span>
          <strong>{product.cuttingTolerance}</strong>
        </div>
        <Link className="text-link" href={`/products/${product.slug}`}>
          <FileText size={16} />
          View detail
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
