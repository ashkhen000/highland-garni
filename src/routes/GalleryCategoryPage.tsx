import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { GalleryGrid } from "@/components/GalleryGrid";
import { GALLERY_CATEGORIES } from "@/data/gallery";

export function GalleryCategoryPage() {
  const { t } = useTranslation();
  const { category } = useParams<{ category: string }>();

  // Look up category directly in the component layout block
  const cat = GALLERY_CATEGORIES.find((c) => c.slug === category);

  if (!cat) {
    return (
      <div className="flex h-screen items-center justify-center font-display text-2xl">
        Category Not Found
      </div>
    );
  }

  return (
    <PageLayout
      hero={
        <PageHero
          eyebrow={t("gallery.eyebrow")}
          title={t(`gallery.categories.${cat.slug}`)}
          subtitle={t(`gallery.categories.${cat.slug}Desc`)}
        />
      }
    >
      <section className="section-soft py-16 md:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <Link
            to="/gallery"
            className="mb-10 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> {t("gallery.back")}
          </Link>
          <GalleryGrid images={cat.images} />
        </div>
      </section>
    </PageLayout>
  );
}
