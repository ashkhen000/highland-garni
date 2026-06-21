import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type GalleryImage = { src: string; alt: string };

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [modal, setModal] = useState<number | null>(null);

  useEffect(() => {
    if (modal === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
      if (e.key === "ArrowRight") setModal((m) => (m === null ? m : (m + 1) % images.length));
      if (e.key === "ArrowLeft")
        setModal((m) => (m === null ? m : (m - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal, images.length]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setModal(i)}
            className={`group relative overflow-hidden ${
              i % 3 === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/5]"
            }`}
            aria-label={`Open image ${i + 1}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>

      {modal !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-fade-up"
          role="dialog"
          aria-modal="true"
        >
          <button
            aria-label="Close"
            onClick={() => setModal(null)}
            className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white hover:text-black"
          >
            <X className="h-4 w-4" />
          </button>
          <button
            aria-label="Previous"
            onClick={() => setModal((m) => (m === null ? m : (m - 1 + images.length) % images.length))}
            className="absolute left-5 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white hover:text-black"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Next"
            onClick={() => setModal((m) => (m === null ? m : (m + 1) % images.length))}
            className="absolute right-5 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white hover:text-black"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <img
            src={images[modal].src}
            alt={images[modal].alt}
            className="max-h-[90vh] max-w-[95vw] object-contain"
          />
        </div>
      )}
    </>
  );
}
