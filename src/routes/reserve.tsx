import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { Reservation } from "@/components/sections/Reservation";

export const Route = createFileRoute("/reserve")({
  head: () => ({
    meta: [
      { title: "Reserve — Highland Garni" },
      { name: "description", content: "Request your reservation at Highland Garni." },
      { property: "og:title", content: "Reserve — Highland Garni" },
    ],
  }),
  component: ReservePage,
});

function ReservePage() {
  const { t } = useTranslation();
  return (
    <PageLayout
      hero={
        <PageHero
          eyebrow={t("reserve.eyebrow")}
          title={t("reserve.title")}
          subtitle={t("reserve.subtitle")}
        />
      }
    >
      <div className="section-soft">
        <Reservation />
      </div>
    </PageLayout>
  );
}
