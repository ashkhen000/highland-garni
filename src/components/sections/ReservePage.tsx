import { useTranslation } from "react-i18next";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { Reservation } from "@/components/sections/Reservation";

export function ReservePage() {
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
