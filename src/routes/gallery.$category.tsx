import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { GalleryGrid } from "@/components/GalleryGrid";
import { GALLERY_CATEGORIES } from "@/data/gallery";

export const Route = createFileRoute("/gallery/$category")({
  head: ({ params }) => {
    const category = GALLERY_CATEGORIES.find((c) => c.slug === params.category);
    const title = category ? `${category.slug} Gallery — Highland Garni` : "Gallery — Highland Garni";

    return {
      meta: [
        { title },
        {
          name: "description",
          content: category
            ? `Browse Highland Garni ${category.slug} images.`
            : "Browse Highland Garni gallery images.",
        },
        { property: "og:title", content: title },
      ],
    };
  },
  component: GalleryCategoryRoute,
});

function GalleryCategoryRoute() {
  const { t } = useTranslation();
  const { category } = Route.useParams();
  const cat = GALLERY_CATEGORIES.find((c) => c.slug === category);

  if (!cat) {
    return (
      <PageLayout>
        <section className="section-soft min-h-screen py-32">
          <div className="container-px mx-auto max-w-7xl">
            <h1 className="text-4xl md:text-6xl">Category not found</h1>
            <Link
              to="/gallery"
              className="mt-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3" /> {t("gallery.back")}
            </Link>
          </div>
        </section>
      </PageLayout>
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