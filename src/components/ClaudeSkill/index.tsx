import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useTheme from "../../hooks/useTheme";

// Marca em estrela (raios) na cor do Claude
const ClaudeMark = ({ size = 28 }: { size?: number }) => {
  const rays = 12;
  const paths = Array.from({ length: rays }, (_, i) => {
    const a = (i / rays) * Math.PI * 2;
    const long = i % 2 === 0 ? 46 : 38;
    const x = 50 + Math.cos(a) * long;
    const y = 50 + Math.sin(a) * long;
    return `M50 50 L${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d={paths} stroke="#d97757" strokeWidth="11" strokeLinecap="round" fill="none" />
    </svg>
  );
};

const SECTIONS = [
  { key: "code", icon: "bx-code-curly" },
  { key: "quality", icon: "bx-shield-quarter" },
  { key: "deploy", icon: "bx-rocket" },
  { key: "content", icon: "bx-movie-play" },
] as const;

interface ClaudeSkillProps {
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const ClaudeSkill = ({ className = "", style, onMouseEnter, onMouseLeave }: ClaudeSkillProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const flow = t("claudeSkill.flow", { returnObjects: true }) as string[];

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const root = document.documentElement;
    if (open) {
      const prev = root.style.overflow;
      root.style.overflow = "hidden";
      if (!d.open) d.showModal();
      d.scrollTop = 0;
      return () => {
        root.style.overflow = prev;
        if (d.open) d.close();
      };
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`skill-element skill-claude ${className}`}
        style={{ ...style, "--skill-color": "#d97757" } as React.CSSProperties}
        onClick={() => setOpen(true)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onMouseEnter}
        onBlur={onMouseLeave}
        aria-label={`Claude — ${t("claudeSkill.cta")}`}
      >
        <span className="skill-claude-logo">
          <ClaudeMark size={40} />
        </span>
        <span className="skill-claude-name">
          Claude <em>· {t("claudeSkill.subtitle")}</em>
        </span>
        <i className="bx bx-right-arrow-alt skill-claude-arrow" aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        className={`cdlg cdlg--${theme}`}
        aria-labelledby="cdlg-title"
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        onCancel={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
      >
        <div className="cdlg-panel">
          <button type="button" className="cdlg-close" onClick={() => setOpen(false)} aria-label={t("projectModal.close")}>
            <i className="bx bx-x" aria-hidden="true" />
          </button>

          <header className="cdlg-head">
            <span className="cdlg-mark">
              <ClaudeMark size={44} />
            </span>
            <div>
              <p className="cdlg-eyebrow">{t("claudeSkill.eyebrow")}</p>
              <h2 id="cdlg-title">{t("claudeSkill.title")}</h2>
            </div>
          </header>
          <p className="cdlg-intro">{t("claudeSkill.intro")}</p>

          <ol className="cdlg-flow" aria-label={t("claudeSkill.flowLabel")}>
            {flow.map((step, i) => (
              <li key={step} className={i % 2 === 1 ? "is-ai" : ""}>
                <span>{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>

          <div className="cdlg-grid">
            {SECTIONS.map((s) => (
              <section key={s.key} className="cdlg-card">
                <i className={`bx ${s.icon}`} aria-hidden="true" />
                <h3>{t(`claudeSkill.sections.${s.key}.title`)}</h3>
                <p>{t(`claudeSkill.sections.${s.key}.text`)}</p>
              </section>
            ))}
          </div>

          <p className="cdlg-foot">{t("claudeSkill.foot")}</p>
        </div>
      </dialog>
    </>
  );
};

export default ClaudeSkill;
