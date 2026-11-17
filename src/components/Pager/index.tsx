import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface PagerProps {
  count: number;
  page: number;
  onChange: (page: number) => void;
  theme: string;
}

type Slot = number | "gap-start" | "gap-end";

// Mostra sempre a primeira, a última e as vizinhas da página atual
const buildSlots = (count: number, page: number): Slot[] => {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const start = Math.max(2, Math.min(page - 1, count - 4));
  const end = Math.min(count - 1, Math.max(page + 1, 5));
  const slots: Slot[] = [1];
  if (start > 2) slots.push("gap-start");
  for (let i = start; i <= end; i++) slots.push(i);
  if (end < count - 1) slots.push("gap-end");
  slots.push(count);
  return slots;
};

const Pager = ({ count, page, onChange, theme }: PagerProps) => {
  const { t } = useTranslation();
  const listRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const [pill, setPill] = useState({ x: 0, w: 0, ready: false });
  const slots = buildSlots(count, page);

  // A pílula ativa desliza até o número selecionado
  useLayoutEffect(() => {
    const btn = btnRefs.current[page];
    const list = listRef.current;
    if (!btn || !list) return;
    const update = () => setPill({ x: btn.offsetLeft, w: btn.offsetWidth, ready: true });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(list);
    return () => ro.disconnect();
  }, [page, count]);

  const go = (p: number) => {
    if (p < 1 || p > count || p === page) return;
    onChange(p);
  };

  return (
    <nav className={`pager pager--${theme}`} aria-label={t("pager.label")}>
      <button
        type="button"
        className="pager-step"
        onClick={() => go(page - 1)}
        disabled={page === 1}
        aria-label={t("pager.prev")}
      >
        <i className="bx bx-chevron-left" aria-hidden="true" />
        <span className="pager-step-text">{t("pager.prev")}</span>
      </button>

      <div className="pager-track">
        <div className="pager-list" ref={listRef}>
          <span
            className="pager-pill"
            aria-hidden="true"
            style={{ transform: `translateX(${pill.x}px)`, width: pill.w, opacity: pill.ready ? 1 : 0 }}
          />
          {slots.map((slot) =>
            typeof slot === "number" ? (
              <button
                key={slot}
                type="button"
                ref={(el) => {
                  btnRefs.current[slot] = el;
                }}
                className={`pager-num${slot === page ? " is-active" : ""}`}
                onClick={() => go(slot)}
                aria-current={slot === page ? "page" : undefined}
                aria-label={t("pager.page", { page: slot })}
              >
                {slot}
              </button>
            ) : (
              <span key={slot} className="pager-gap" aria-hidden="true">
                •••
              </span>
            )
          )}
        </div>
        <span className="pager-compact" aria-hidden="true">
          <b>{String(page).padStart(2, "0")}</b>
          <span>/ {String(count).padStart(2, "0")}</span>
        </span>
        <span className="pager-progress" aria-hidden="true">
          <span style={{ width: `${(page / count) * 100}%` }} />
        </span>
      </div>

      <button
        type="button"
        className="pager-step"
        onClick={() => go(page + 1)}
        disabled={page === count}
        aria-label={t("pager.next")}
      >
        <span className="pager-step-text">{t("pager.next")}</span>
        <i className="bx bx-chevron-right" aria-hidden="true" />
      </button>
    </nav>
  );
};

export default Pager;
