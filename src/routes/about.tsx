import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { About } from "@/components/sections/About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Highland Garni" },
      {
        name: "description",
        content: "A small collection of triangle houses set on a ridge above the Garni gorge.",
      },
      { property: "og:title", content: "About — Highland Garni" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();
  return (
    <PageLayout
      hero={
        <PageHero
          eyebrow={t("about.eyebrow")}
          title={t("about.title")}
          subtitle={t("about.p1")}
        />
      }
    >
      <div className="section-soft">
        <About />
      </div>
    </PageLayout>
  );
}

