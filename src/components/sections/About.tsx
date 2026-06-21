import { useTranslation } from "react-i18next";
import aboutImg from "@/assets/about.jpg";

export function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="relative border-t border-border/60 py-24 md:py-32">
      <div className="container-px mx-auto grid max-w-7xl gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="sticky top-28 overflow-hidden">
            <img
              src={aboutImg}
              alt="Garni gorge with basalt columns"
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-7">
          <p className="eyebrow">{t("about.eyebrow")}</p>
          <h2 className="mt-3 text-4xl md:text-6xl">{t("about.title")}</h2>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-10">
            {[
              { v: "02", k: t("about.stat1") },
              { v: "28", k: t("about.stat2") },
              { v: "∞", k: t("about.stat3") },
            ].map((s) => (
              <div key={s.k}>
                <dt className="font-display text-4xl md:text-5xl">{s.v}</dt>
                <dd className="mt-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  {s.k}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
