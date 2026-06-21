import { useTranslation } from "react-i18next";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { About } from "@/components/sections/About";

export function AboutPage() {
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
