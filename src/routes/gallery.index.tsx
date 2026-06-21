import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { GALLERY_CATEGORIES } from "@/data/gallery";

export const Route = createFileRoute("/gallery/")({
  head: () => ({
    meta: [
      { title: "Gallery — Highland Garni" },
      {
        name: "description",
        content: "Browse the Highland Garni gallery: interiors, exteriors, and mountain views.",
      },
      { property: "og:title", content: "Gallery — Highland Garni" },
      { property: "og:description", content: "Interiors, exteriors and views of the triangle cabins." },
    ],
  }),
  component: GalleryIndex,
});

function GalleryIndex() {
  const { t } = useTranslation();
  return (
    <PageLayout
      hero={
        <PageHero
          eyebrow={t("gallery.eyebrow")}
          title={t("gallery.title")}
          subtitle={t("gallery.subtitle")}
        />
      }
    >
      <section className="section-soft py-20 md:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <p className="eyebrow">{t("gallery.browse")}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {GALLERY_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/gallery/$category"
                params={{ category: c.slug }}
                className="group relative block overflow-hidden bg-card"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={c.cover}
                    alt={t(`gallery.categories.${c.slug}`)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="font-display text-2xl md:text-3xl">
                    {t(`gallery.categories.${c.slug}`)}
                  </h3>
                  <p className="mt-1 max-w-xs text-sm text-white/70">
                    {t(`gallery.categories.${c.slug}Desc`)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em]">
                    {t("gallery.viewAll")} <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
