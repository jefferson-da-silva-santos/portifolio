import { useEffect, useRef } from "react";
import type { CSSProperties, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import type { ModalProjectProps } from "./types";
import useTheme from "../../hooks/useTheme";
import useModalProject from "../../hooks/useModalProject";
import { technologiesData } from "../../consts/dataConsts";
import { CATEGORY_MAP } from "../../consts/categoryTaxonomy";
import { getYoutubeEmbedUrl } from "../../utils/videoUtilities";
import "../../i18n";

const WHATSAPP = "558199367426";

type TechKey = keyof typeof technologiesData;

// Chip de tecnologia: logo + nome (mesmo padrão do site da JTEC)
const TechChips = ({ keys }: { keys: string[] }) => (
  <ul className="pm-chips">
    {keys.map((key) => {
      const info = technologiesData[key.toLowerCase() as TechKey];
      if (!info) return null;
      return (
        <li key={key} className="pm-chip">
          <span className="pm-chip-icon">
            <img src={info.imageSrc} alt="" loading="lazy" />
          </span>
          <span>{info.text}</span>
        </li>
      );
    })}
  </ul>
);

const ModalProject: React.FC<ModalProjectProps> = ({ selectedProject }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { closeModal } = useModalProject();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Abre como modal nativo: prende o foco, fecha com Esc e deixa o resto da página inerte
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !selectedProject) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    return () => {
      root.style.overflow = previous;
      if (dialog.open) dialog.close();
    };
  }, [selectedProject]);

  if (!selectedProject) return null;

  const {
    title,
    description,
    imgUrl,
    gitHubUrl,
    deployUrl,
    technologies = [],
    libs = [],
    infra = [],
    isApi,
    videoUrl,
    categories = [],
  } = selectedProject;

  const embedUrl = videoUrl?.includes("SEU_ID_AQUI") ? null : getYoutubeEmbedUrl(videoUrl);
  const category = categories[0] ? CATEGORY_MAP[categories[0]] : undefined;
  const stackKeys = [...technologies, ...infra].map((k) => k.toLowerCase());
  const isMobile = stackKeys.some((k) => k === "reactnative" || k === "expo");
  const isDesktop = !isMobile && stackKeys.includes("tauri");
  const kind = isApi ? "api" : isMobile ? "mobile" : isDesktop ? "desktop" : "web";
  const hasLiveUrl = !!deployUrl && /^https?:\/\//.test(deployUrl);
  const whatsappLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    t("projectModal.whatsappMessage", { project: title })
  )}`;

  const handleBackdrop = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <dialog
      ref={dialogRef}
      className={`pm pm--${theme}`}
      aria-labelledby="pm-title"
      onClick={handleBackdrop}
      onCancel={(e) => {
        e.preventDefault();
        closeModal();
      }}
    >
      <div className="pm-panel">
        <button type="button" className="pm-close" onClick={closeModal} aria-label={t("projectModal.close")}>
          <i className="bx bx-x" aria-hidden="true" />
        </button>

        <div className="pm-media">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <img src={imgUrl} alt={title} />
          )}
        </div>

        <div className="pm-content">
          <div className="pm-meta">
            {category && (
              <span className="pm-badge" style={{ "--c": category.color } as CSSProperties}>
                <i className={category.icon} aria-hidden="true" />
                {t(category.labelKey)}
              </span>
            )}
            <span className="pm-kind">
              <i
                className={`bx ${
                  kind === "api" ? "bx-server" : kind === "mobile" ? "bx-mobile-alt" : kind === "desktop" ? "bx-desktop" : "bx-globe"
                }`}
                aria-hidden="true"
              />
              {t(`projectModal.kind.${kind}`)}
            </span>
          </div>

          <h2 id="pm-title" className="pm-title">{title}</h2>
          <p className="pm-description">{description}</p>

          <section className="pm-block">
            <h3>{t("projectModal.stack")}</h3>
            <TechChips keys={technologies} />
          </section>

          {libs.length > 0 && (
            <section className="pm-block">
              <h3>{t("projectModal.libs")}</h3>
              <TechChips keys={libs} />
            </section>
          )}

          {infra.length > 0 && (
            <section className="pm-block">
              <h3>{t("projectModal.infra")}</h3>
              <TechChips keys={infra} />
            </section>
          )}

          <div className="pm-actions">
            <a className="pm-btn pm-btn--primary" href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <i className="bx bxl-whatsapp" aria-hidden="true" />
              {t("projectModal.want")}
            </a>
            {hasLiveUrl && (
              <a className="pm-btn" href={deployUrl} target="_blank" rel="noopener noreferrer">
                <i className={`bx ${kind === "mobile" || kind === "desktop" ? "bx-download" : "bx-link-external"}`} aria-hidden="true" />
                {kind === "mobile" || kind === "desktop" ? t("projectModal.download") : t("projectModal.openSite")}
              </a>
            )}
            {gitHubUrl && (
              <a className="pm-btn" href={gitHubUrl} target="_blank" rel="noopener noreferrer">
                <i className="bx bxl-github" aria-hidden="true" />
                {t("projectModal.code")}
              </a>
            )}
          </div>
          {!gitHubUrl && <p className="pm-note">{t("projectModal.privateCode")}</p>}
        </div>
      </div>
    </dialog>
  );
};

export default ModalProject;
