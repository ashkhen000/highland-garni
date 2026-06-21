import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Highland Garni" },
      { name: "description", content: "Get in touch with the Highland Garni team." },
      { property: "og:title", content: "Contact — Highland Garni" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useTranslation();
  return (
    <PageLayout
      hero={
        <PageHero
          eyebrow={t("contact.eyebrow")}
          title={t("contact.title")}
          subtitle={t("contact.subtitle") !== "contact.subtitle" ? t("contact.subtitle") : undefined}
        />
      }
    >
      <div className="section-warm">
        <Contact />
      </div>
    </PageLayout>
  );
}
