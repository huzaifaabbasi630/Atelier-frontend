import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, activeIndex, onSelect }) => {
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;
    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[90px_minmax(0,1fr)]">
      <div className="flex gap-4 overflow-x-auto lg:flex-col lg:overflow-y-auto scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onMouseEnter={() => onSelect(index)}
            onClick={() => onSelect(index)}
            className={`flex-shrink-0 w-20 h-24 overflow-hidden rounded-3xl border ${activeIndex === index ? 'border-slate-900 ring-2 ring-slate-900' : 'border-slate-200'} bg-slate-50 transition`}
          >
            <img src={image} alt={`Gallery ${index + 1}`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
          </button>
        ))}
      </div>

      <div
        className="relative overflow-hidden rounded-[32px] bg-slate-100"
        onMouseEnter={() => setIsZooming(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZooming(false)}
      >
        <img
          src={images[activeIndex]}
          alt={`Product ${activeIndex + 1}`}
          className="h-full w-full object-cover transition-transform duration-500 ease-out"
          style={{
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            transform: isZooming ? 'scale(1.3)' : 'scale(1)',
          }}
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
