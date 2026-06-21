import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";

const IMAGES = [
  { src: g1, alt: "A-frame cabin interior with fireplace and mountain view" },
  { src: g2, alt: "A-frame cabin exterior in snow at dusk" },
  { src: g3, alt: "Infinity pool overlooking Armenian mountains" },
  { src: g4, alt: "Outdoor BBQ terrace with fire pit and lounge chairs" },
];

export function Gallery() {
  const { t } = useTranslation();
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, dragFree: false, align: "center" });
  const [selected, setSelected] = useState(0);
  const [modal, setModal] = useState<number | null>(null);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    onSelect();
  }, [embla]);

  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    if (modal === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
      if (e.key === "ArrowRight") setModal((m) => (m === null ? m : (m + 1) % IMAGES.length));
      if (e.key === "ArrowLeft")
        setModal((m) => (m === null ? m : (m - 1 + IMAGES.length) % IMAGES.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  return (
    <section id="gallery" className="relative border-t border-border/60 py-24 md:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{t("gallery.eyebrow")}</p>
            <h2 className="mt-3 max-w-2xl text-4xl md:text-6xl">{t("gallery.title")}</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">{t("gallery.subtitle")}</p>
        </div>

        <div className="relative mt-14">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {IMAGES.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setModal(i)}
                  className="group relative mr-4 aspect-[4/5] w-[78%] flex-[0_0_78%] overflow-hidden md:aspect-[16/10] md:w-[70%] md:flex-[0_0_70%]"
                  aria-label={`Open image ${i + 1}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-1.5">
              {IMAGES.map((_, i) => (
                <span
                  key={i}
                  className={`block h-px transition-all ${
                    i === selected ? "w-10 bg-foreground" : "w-5 bg-border"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                aria-label="Previous"
                onClick={prev}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:bg-foreground hover:text-background"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Next"
                onClick={next}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:bg-foreground hover:text-background"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
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
            className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border hover:bg-foreground hover:text-background"
          >
            <X className="h-4 w-4" />
          </button>
          <img
            src={IMAGES[modal].src}
            alt={IMAGES[modal].alt}
            className="max-h-[90vh] max-w-[95vw] object-contain"
          />
        </div>
      )}
    </section>
  );
}
