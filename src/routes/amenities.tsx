import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { Amenities } from "@/components/sections/Amenities";

export const Route = createFileRoute("/amenities")({
  head: () => ({
    meta: [
      { title: "Amenities — Highland Garni" },
      { name: "description", content: "Pool, BBQ, kitchen, mountain views and more." },
      { property: "og:title", content: "Amenities — Highland Garni" },
    ],
  }),
  component: AmenitiesPage,
});

function AmenitiesPage() {
  const { t } = useTranslation();
  return (
    <PageLayout
      hero={
        <PageHero
          eyebrow={t("amenities.eyebrow")}
          title={t("amenities.title")}
          subtitle="Pool, BBQ, kitchen, private parking, fast WiFi, and quiet mountain views."
        />
      }
    >
      <div className="section-warm">
        <Amenities />
      </div>
    </PageLayout>
  );
}

