"use client";

import { Maximize2, X } from "lucide-react";
import { useState } from "react";

type GalleryImage = {
  src: string;
  label: string;
};

type ProductGalleryProps = {
  drawing: GalleryImage;
  photos: GalleryImage[];
  model: string;
};

export function ProductGallery({ drawing, photos, model }: ProductGalleryProps) {
  const [active, setActive] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="product-gallery reveal">
        <div className="gallery-heading">
          <p className="eyebrow">Product images</p>
          <h2>Dimension drawing and actual product photos.</h2>
          <span>Click any image to enlarge. Real photos are separated from the data drawing.</span>
        </div>

        <button className="gallery-drawing" type="button" onClick={() => setActive(drawing)}>
          <span className="drawing-label">Dimension data / {model}</span>
          <img src={drawing.src} alt={drawing.label} loading="lazy" />
          <strong>
            <Maximize2 size={18} />
            Enlarge dimension drawing
          </strong>
        </button>

        <div className="actual-photo-grid" aria-label={`${model} actual product photos`}>
          {photos.map((photo, index) => (
            <button type="button" onClick={() => setActive(photo)} key={photo.src}>
              <img src={photo.src} alt={photo.label} loading="lazy" />
              <span>
                <Maximize2 size={16} />
                Actual photo {index + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      {active ? (
        <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={active.label}>
          <button className="lightbox-backdrop" type="button" aria-label="Close enlarged image" onClick={() => setActive(null)} />
          <div className="lightbox-panel">
            <button className="lightbox-close" type="button" onClick={() => setActive(null)} aria-label="Close enlarged image">
              <X size={22} />
            </button>
            <img src={active.src} alt={active.label} />
            <p>{active.label}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
