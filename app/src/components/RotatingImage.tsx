import { useState, useEffect } from 'react';

const RotatingImage = ({ images, alt, className = "" }: { images: string[], alt: string, className?: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`${alt} ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        />
      ))}
    </>
  );
};

export default RotatingImage;
