import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import useTheme from "../../hooks/useTheme";
import { OWNER, openPrivacyPolicy } from "../../consts/legal";
import { socialButtonList, useNavLinks } from "../../consts/dataConsts";

const SERVICE_KEYS = ["sites", "mobile", "systems", "whatsapp", "automation", "content"] as const;

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navLinks = useNavLinks();
  const quoteRef = useRef<HTMLDivElement>(null);

  // A frase "se escreve" quando aparece na tela
  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const goTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className={`ft ft--${theme}`}>
      <div className="ft-inner">
        <div className="ft-top">
          <div className="ft-brand">
            <a href="#" className="ft-logo" onClick={goTo("body")} aria-label={t("footer.backToTop")}>
              ‹ <b>J</b>eff /›
            </a>
            <p>{t("footer.tagline")}</p>
            <ul className="ft-social">
              {socialButtonList.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.arialLAbel}>
                    <i className={s.iconClass} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="ft-col" aria-label={t("footer.navigation")}>
            <h3>{t("footer.navigation")}</h3>
            <ul>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={goTo(l.href)}>
                    {l.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ft-col">
            <h3>{t("services.title")}</h3>
            <ul>
              {SERVICE_KEYS.map((k) => (
                <li key={k}>
                  <a href="#service" onClick={goTo("#service")}>
                    {t(`services.items.${k}.title`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="ft-col">
            <h3>{t("footer.contact")}</h3>
            <ul>
              <li>
                <a href={`mailto:${OWNER.email}`}>
                  <i className="bx bx-envelope" aria-hidden="true" />
                  {OWNER.email}
                </a>
              </li>
              <li>
                <a href={OWNER.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <i className="bx bxl-whatsapp" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
              <li>
                <span>
                  <i className="bx bx-map" aria-hidden="true" />
                  {OWNER.city}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Decreto 7.962/2013, art. 2º, I e II — nome, documento, endereço físico e eletrônico */}
        <div className="ft-bottom">
          <p>
            © {new Date().getFullYear()} {OWNER.name}
            {OWNER.document && ` · ${OWNER.document}`} · {t("footer.rights")}
          </p>
          <button type="button" className="ft-privacy" onClick={openPrivacyPolicy}>
            {t("privacy.title")}
          </button>
        </div>

        <div className="ft-quote" ref={quoteRef}>
          <p lang={t("footer.quoteLang")}>
            <span>{t("footer.quote")}</span>
          </p>
          <svg className="ft-quote-line" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true">
            <path d="M4 16 C 70 6, 140 22, 210 12 S 340 6, 396 14" />
          </svg>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
