import { useRef } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { categoryTaxonomy, type CategoryKey } from "../../consts/categoryTaxonomy";

// Faixa de categorias em "chips": cada um com ícone, cor própria e contador.
// O ativo acende na cor da categoria e a descrição dela aparece logo abaixo.
interface CategoryFilterBarProps {
  active: CategoryKey;
  counts: Partial<Record<CategoryKey, number>>;
  onChange: (key: CategoryKey) => void;
  theme: string;
}

const items = categoryTaxonomy[0].items;

const CategoryFilterBar = ({ active, counts, onChange, theme }: CategoryFilterBarProps) => {
  const { t } = useTranslation();
  const listRef = useRef<HTMLDivElement>(null);
  const activeItem = items.find((i) => i.key === active) ?? items[0];

  const select = (key: CategoryKey, el?: HTMLButtonElement | null) => {
    onChange(key);
    // No celular a faixa rola de lado: centraliza o chip escolhido só dentro dela
    const list = listRef.current;
    if (el && list && list.scrollWidth > list.clientWidth) {
      const left = el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2;
      list.scrollTo({ left, behavior: "smooth" });
    }
  };

  // Setas do teclado andam entre as categorias (padrão de abas)
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const idx = items.findIndex((i) => i.key === active);
    const next =
      e.key === "Home" ? 0
      : e.key === "End" ? items.length - 1
      : (idx + (e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
    const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>("button");
    buttons?.[next]?.focus();
    select(items[next].key, buttons?.[next]);
  };

  return (
    <div className={`categoryTabs categoryTabs--${theme}`}>
      <div
        className="categoryTabs-list"
        role="tablist"
        aria-label={t("project.groups.categoria")}
        ref={listRef}
        onKeyDown={handleKeyDown}
      >
        {items.map((item) => {
          const isActive = item.key === active;
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={`categoryTabs-chip${isActive ? " is-active" : ""}`}
              style={{ "--c": item.color } as CSSProperties}
              onClick={(e) => select(item.key, e.currentTarget)}
            >
              <i className={item.icon} aria-hidden="true" />
              <span>{t(item.labelKey)}</span>
              <b className="categoryTabs-count">{counts[item.key] ?? 0}</b>
            </button>
          );
        })}
      </div>

      <p
        key={activeItem.key}
        className="categoryTabs-description"
        style={{ "--c": activeItem.color } as CSSProperties}
        aria-live="polite"
      >
        {t(`project.categoryDescriptions.${activeItem.labelKey.split(".").pop()}`)}
      </p>
    </div>
  );
};

export default CategoryFilterBar;
