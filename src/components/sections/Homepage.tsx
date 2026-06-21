import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Hero } from "@/components/sections/Hero";
import { Amenities } from "@/components/sections/Amenities";
import { Contact } from "@/components/sections/Contact";
import { GALLERY_CATEGORIES } from "@/data/gallery";

const pageLinks = [
  { key: "about", href: "/about", titleKey: "about.title", labelKey: "nav.about" },
  { key: "amenities", href: "/amenities", titleKey: "amenities.title", labelKey: "nav.amenities" },
  { key: "reserve", href: "/reserve", titleKey: "reserve.title", labelKey: "nav.reserve" },
  { key: "contact", href: "/contact", titleKey: "contact.title", labelKey: "nav.contact" },
] as const;

export function Homepage() {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <Hero />

      {/* Gallery preview */}
      <section className="section-mist border-t border-border/60 py-24 md:py-32">
        <div className="container-px mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">{t("gallery.eyebrow")}</p>
              <h2 className="mt-3 max-w-2xl text-4xl md:text-6xl">{t("gallery.title")}</h2>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground hover:text-foreground"
            >
              {t("gallery.viewAll")} <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {GALLERY_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to={`/gallery/${c.slug}`}
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
                  <h3 className="font-display text-2xl">
                    {t(`gallery.categories.${c.slug}`)}
                  </h3>
                  <p className="mt-1 max-w-xs text-sm text-white/70">
                    {t(`gallery.categories.${c.slug}Desc`)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pages Section */}
      <section className="section-stone border-t border-border/60 py-24 md:py-32">
        <div className="container-px mx-auto max-w-7xl">
          <p className="eyebrow">Highland Garni</p>
          <h2 className="mt-3 max-w-3xl text-4xl md:text-6xl">
            Explore each part of the retreat on its own page
          </h2>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-4">
            {pageLinks.map((page) => (
              <Link
                key={page.key}
                to={page.href}
                className="group flex min-h-64 flex-col justify-between bg-background/82 p-6 transition-colors hover:bg-card/90 md:p-8"
              >
                <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  {t(page.labelKey)}
                </span>
                <span className="font-display text-3xl leading-tight md:text-4xl">
                  {t(page.titleKey)}
                </span>
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground transition-colors group-hover:text-foreground">
                  Open page <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* <div className="section-mist border-t border-border/60">
        <Amenities />
      </div> */}

      <div className="section-stone border-t border-border/60">
        <Contact />
      </div>
    </PageLayout>
  );
}
