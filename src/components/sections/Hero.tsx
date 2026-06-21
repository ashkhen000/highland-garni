import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"; // Swapped import here
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  const { t } = useTranslation();
  return (
    <section
      id="home"
      className="relative isolate flex h-svh min-h-[640px] w-full items-end overflow-hidden"
    >
      <img
        src={heroImg}
        alt="Highland Garni triangle cabins below misty Armenian mountains"
        width={1920}
        height={1280}
        className="absolute inset-0 -z-10 h-full w-full object-cover animate-slow-zoom"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/10 to-white" />

      <div className="container-px mx-auto w-full max-w-7xl pb-20 text-white md:pb-28">
        <p className="eyebrow animate-fade-up !text-white/70" style={{ animationDelay: "0.1s" }}>
          {t("hero.eyebrow")}
        </p>
        <h1
          className="mt-4 max-w-4xl font-display text-[15vw] leading-[0.95] tracking-tight md:text-[8rem] lg:text-[10rem] animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          {t("hero.title")}
        </h1>
        <p
          className="mt-6 max-w-xl text-base text-white/70 md:text-lg animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          {t("hero.subtitle")}
        </p>
        <div
          className="mt-10 flex flex-wrap gap-3 animate-fade-up"
          style={{ animationDelay: "0.55s" }}
        >
          <Link
            to="/reserve"
            className="inline-flex items-center justify-center rounded-sm bg-white px-8 py-4 text-xs uppercase tracking-[0.28em] text-black transition-transform hover:-translate-y-0.5"
          >
            {t("hero.reserve")}
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-sm border border-white/80 px-8 py-4 text-xs uppercase tracking-[0.28em] text-white transition-colors hover:bg-white hover:text-black"
          >
            {t("hero.contact")}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 hidden items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/70 md:flex">
        <span>{t("hero.scroll")}</span>
        <span className="block h-px w-12 bg-white/70" />
      </div>
    </section>
  );
}
