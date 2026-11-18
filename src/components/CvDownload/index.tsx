import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useTheme from "../../hooks/useTheme";

// Ícone "Baixar currículo" do menu: abre a escolha de área e baixa o PDF
// no idioma do visitante (português ou, nos demais idiomas, inglês).
const AREAS = [{ key: "fullstack" }, { key: "frontend" }, { key: "backend" }] as const;

const CvDownload = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  // idle → filling (água subindo) → done (✓) → idle
  const [phase, setPhase] = useState<"idle" | "filling" | "done">("idle");
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const startDownload = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    if (phase !== "idle") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fill = reduce ? 0 : 1600;
    setPhase("filling");
    timers.current.push(
      window.setTimeout(() => {
        const a = document.createElement("a");
        a.href = href;
        a.download = href.split("/").pop() || "curriculo.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setPhase("done");
      }, fill),
      window.setTimeout(() => setPhase("idle"), fill + 1600)
    );
  };
  const ref = useRef<HTMLDivElement>(null);
  const lang = i18n.language?.startsWith("pt") ? "pt" : "en";

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={`cvd cvd--${theme}${open ? " is-open" : ""}`} ref={ref}>
      <button
        type="button"
        className={`cvd-btn is-${phase}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("cv.button")}
        title={t("cv.button")}
        onClick={() => phase === "idle" && setOpen((v) => !v)}
      >
        <span className="cvd-water" aria-hidden="true">
          <span className="cvd-wave cvd-wave--a" />
          <span className="cvd-wave cvd-wave--b" />
        </span>
        <span className="cvd-label">
          <i className={`bx ${phase === "done" ? "bx-check" : "bx-download"}`} aria-hidden="true" />
          CV
        </span>
      </button>
      <span className="sr-only" aria-live="polite">
        {phase === "filling" ? t("cv.preparing") : phase === "done" ? t("cv.done") : ""}
      </span>

      <div className="cvd-menu" role="menu" hidden={!open}>
        <p className="cvd-hint">{t("cv.button")}</p>
        {AREAS.map((a) => (
          <a
            key={a.key}
            role="menuitem"
            className="cvd-item"
            href={`/curriculo/jefferson-santos-${a.key}-${lang}.pdf`}
            download
            onClick={(e) => startDownload(e, `/curriculo/jefferson-santos-${a.key}-${lang}.pdf`)}
          >
            <span>
              <b>{t(`cv.areas.${a.key}`)}</b>
              <small>PDF · {lang === "pt" ? "Português" : "English"}</small>
            </span>
            <i className="bx bx-download" aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default CvDownload;
