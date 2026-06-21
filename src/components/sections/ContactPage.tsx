import { useTranslation } from "react-i18next";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { Contact } from "@/components/sections/Contact";

export function ContactPage() {
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
