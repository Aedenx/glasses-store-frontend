"use client";

import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  className?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc,
  className,
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={(e) => {
        const target = e.currentTarget;
        if (target.src !== fallbackSrc) {
          setImageSrc(fallbackSrc);
          target.src = fallbackSrc;
        }
      }}
    />
  );
}