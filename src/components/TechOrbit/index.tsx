import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useTheme from "../../hooks/useTheme";
import { getSkillsData } from "../../consts/dataConsts";
import foto from "../../assets/image/jeff-orbit.webp";

// Órbita 3D de tecnologias: a foto no centro e as logos girando em dois anéis
// inclinados. A posição de cada logo é calculada a cada quadro (cos/sen), então
// elas sempre ficam de frente para a tela, passam por trás e pela frente da foto
// e o conjunto inclina seguindo o mouse.

type Item = { tech: string; image: string; color: string; ring: 0 | 1; offset: number };

const RINGS = [
  { radius: 0.31, speed: 0.00022, size: 0.112 }, // anel interno: mais rápido
  { radius: 0.435, speed: -0.00012, size: 0.1 }, // anel externo: sentido contrário
];
const BASE_TILT = 62; // graus: quanto o anel "deita"

const TechOrbit = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const ringRefs = useRef<(SVGSVGElement | null)[]>([]);
  const [size, setSize] = useState(440);
  const [hovered, setHovered] = useState<string | null>(null);
  // A pausa no hover é lida dentro do loop sem reiniciá-lo
  const hoveredRef = useRef<string | null>(null);
  hoveredRef.current = hovered;

  const items: Item[] = useMemo(() => {
    const skills = getSkillsData(theme);
    const inner = skills.slice(0, 6);
    const outer = skills.slice(6);
    return [
      ...inner.map((s, i) => ({ ...s, ring: 0 as const, offset: (i / inner.length) * Math.PI * 2 })),
      ...outer.map((s, i) => ({ ...s, ring: 1 as const, offset: (i / outer.length) * Math.PI * 2 + 0.3 })),
    ];
  }, [theme]);

  // Tamanho do palco (responsivo)
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setSize(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Loop de animação
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let visible = true;
    let last = performance.now();
    const angle = [0, 0];
    const pointer = { x: 0, y: 0 }; // -1..1, alvo
    const tilt = { x: 0, y: 0 }; // valor suavizado

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      pointer.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      pointer.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
    };
    const onLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };

    const frame = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const paused = hoveredRef.current !== null;
      if (!reduce && !paused) {
        angle[0] += RINGS[0].speed * dt;
        angle[1] += RINGS[1].speed * dt;
      }
      tilt.x += (pointer.x - tilt.x) * 0.06;
      tilt.y += (pointer.y - tilt.y) * 0.06;

      const w = stage.clientWidth;
      const tiltDeg = BASE_TILT - tilt.y * 14;
      const cosT = Math.cos((tiltDeg * Math.PI) / 180);
      const roll = tilt.x * 10; // inclinação lateral

      ringRefs.current.forEach((svg, k) => {
        if (!svg) return;
        const r = RINGS[k % 2].radius * w;
        svg.style.setProperty("--ry", `${(r * cosT).toFixed(2)}px`);
        svg.style.setProperty("--rx", `${r.toFixed(2)}px`);
        svg.style.transform = `translate(-50%, -50%) rotate(${roll}deg)`;
      });

      items.forEach((item, idx) => {
        const el = itemRefs.current[idx];
        if (!el) return;
        const ring = RINGS[item.ring];
        const a = item.offset + angle[item.ring];
        const r = ring.radius * w;
        const x0 = Math.cos(a) * r;
        const y0 = Math.sin(a) * r * cosT;
        const depth = Math.sin(a); // -1 atrás, 1 na frente
        const rad = (roll * Math.PI) / 180;
        const x = x0 * Math.cos(rad) - y0 * Math.sin(rad);
        const y = x0 * Math.sin(rad) + y0 * Math.cos(rad);
        const scale = 0.72 + (depth + 1) * 0.2;
        el.style.transform = `translate(-50%, -50%) translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(${scale.toFixed(3)})`;
        el.style.zIndex = String(depth > 0 ? 30 + Math.round(depth * 10) : 1 + Math.round((depth + 1) * 8));
        el.style.opacity = (0.45 + (depth + 1) * 0.275).toFixed(3);
        el.style.filter = depth < -0.2 ? `blur(${((-depth - 0.2) * 1.6).toFixed(2)}px)` : "none";
      });

      if (visible) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(stage);

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, [items]);

  return (
    <div
      ref={stageRef}
      className={`orbit orbit--${theme}`}
      role="img"
      aria-label={t("about.orbitLabel", { techs: items.map((i) => i.tech).join(", ") })}
    >
      <div className="orbit-glow" aria-hidden="true" />

      {RINGS.map((_, i) => (
        <svg
          key={`back-${i}`}
          ref={(el) => {
            ringRefs.current[i] = el;
          }}
          className={`orbit-ring orbit-ring--${i}`}
          aria-hidden="true"
          viewBox="0 0 2 2"
          preserveAspectRatio="none"
        >
          <ellipse cx="1" cy="1" rx="0.995" ry="0.99" />
        </svg>
      ))}

      <div className="orbit-core">
        <div className="orbit-photo">
          <img src={foto} alt="Jefferson Santos" loading="lazy" width={480} height={480} />
        </div>
      </div>
      <span className="orbit-status">
        <i aria-hidden="true" />
        {t("about.available")}
      </span>

      {RINGS.map((_, i) => (
        <svg
          key={`front-${i}`}
          ref={(el) => {
            ringRefs.current[i + 2] = el;
          }}
          className={`orbit-ring orbit-ring--${i} orbit-ring--front`}
          aria-hidden="true"
          viewBox="0 0 2 2"
          preserveAspectRatio="none"
        >
          <ellipse cx="1" cy="1" rx="0.995" ry="0.99" />
        </svg>
      ))}

      <ul className="orbit-items" aria-hidden="true">
        {items.map((item, idx) => (
          <li
            key={item.tech}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            className={`orbit-item${hovered === item.tech ? " is-hovered" : ""}`}
            style={
              {
                "--c": item.color,
                width: `${RINGS[item.ring].size * size}px`,
                height: `${RINGS[item.ring].size * size}px`,
              } as React.CSSProperties
            }
            onPointerEnter={() => setHovered(item.tech)}
            onPointerLeave={() => setHovered(null)}
          >
            <img src={item.image} alt="" draggable={false} />
            <span className="orbit-tip">{item.tech === "ReactNative" ? "React Native" : item.tech === "Nextjs" ? "Next.js" : item.tech === "Nodejs" ? "Node.js" : item.tech}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechOrbit;
