// Blog.tsx — Jefferson Santos Portfolio
// Estilização em _blog.scss (sem CSS-in-JS)
// Suporta posts técnicos e pessoais

import { useState, useEffect, useRef } from "react";

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface Tag {
  name: string;
  color: string;
  bg: string;
  icon: string;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string | null;
  tags: string[];
  featured: boolean;
  createdAt: string;
  readTime: number;
  category?: string;
}

// ─── TAG REGISTRY ─────────────────────────────────────────────────────────────

const TAG_REGISTRY: Record<string, Tag> = {
  JavaScript:      { name: "JavaScript",    color: "#F7DF1E", bg: "rgba(247,223,30,0.09)",   icon: "bxl-javascript" },
  TypeScript:      { name: "TypeScript",    color: "#3178C6", bg: "rgba(49,120,198,0.09)",   icon: "bxl-typescript" },
  Python:          { name: "Python",        color: "#3776AB", bg: "rgba(55,118,171,0.09)",   icon: "bxl-python" },
  Java:            { name: "Java",          color: "#F89820", bg: "rgba(248,152,32,0.09)",   icon: "bxl-java" },
  "C++":           { name: "C++",           color: "#00599C", bg: "rgba(0,89,156,0.09)",     icon: "bx-code-alt" },
  "C#":            { name: "C#",            color: "#9B4F96", bg: "rgba(155,79,150,0.09)",   icon: "bx-code-alt" },
  Go:              { name: "Go",            color: "#00ACD7", bg: "rgba(0,172,215,0.09)",    icon: "bx-code-alt" },
  Rust:            { name: "Rust",          color: "#CE412B", bg: "rgba(206,65,43,0.09)",    icon: "bx-code-alt" },
  Kotlin:          { name: "Kotlin",        color: "#7F52FF", bg: "rgba(127,82,255,0.09)",   icon: "bx-code-alt" },
  Swift:           { name: "Swift",         color: "#FA7343", bg: "rgba(250,115,67,0.09)",   icon: "bx-code-alt" },
  PHP:             { name: "PHP",           color: "#777BB4", bg: "rgba(119,123,180,0.09)",  icon: "bxl-php" },
  Ruby:            { name: "Ruby",          color: "#CC342D", bg: "rgba(204,52,45,0.09)",    icon: "bx-code-alt" },
  Dart:            { name: "Dart",          color: "#0175C2", bg: "rgba(1,117,194,0.09)",    icon: "bx-code-alt" },
  Bash:            { name: "Bash",          color: "#4EAA25", bg: "rgba(78,170,37,0.09)",    icon: "bx-terminal" },
  Solidity:        { name: "Solidity",      color: "#8892BF", bg: "rgba(136,146,191,0.09)",  icon: "bx-code-alt" },
  Elixir:          { name: "Elixir",        color: "#6E4A7E", bg: "rgba(110,74,126,0.09)",   icon: "bx-code-alt" },
  React:           { name: "React",         color: "#61DAFB", bg: "rgba(97,218,251,0.09)",   icon: "bxl-react" },
  Vue:             { name: "Vue",           color: "#42B883", bg: "rgba(66,184,131,0.09)",   icon: "bxl-vuejs" },
  Angular:         { name: "Angular",       color: "#DD0031", bg: "rgba(221,0,49,0.09)",     icon: "bxl-angular" },
  Svelte:          { name: "Svelte",        color: "#FF3E00", bg: "rgba(255,62,0,0.09)",     icon: "bx-code-block" },
  "Next.js":       { name: "Next.js",       color: "#EEEEEE", bg: "rgba(238,238,238,0.06)",  icon: "bx-code-block" },
  "Nuxt.js":       { name: "Nuxt.js",       color: "#00DC82", bg: "rgba(0,220,130,0.09)",   icon: "bx-code-block" },
  Astro:           { name: "Astro",         color: "#FF5D01", bg: "rgba(255,93,1,0.09)",     icon: "bx-code-block" },
  Vite:            { name: "Vite",          color: "#646CFF", bg: "rgba(100,108,255,0.09)",  icon: "bx-zap" },
  Tailwind:        { name: "Tailwind",      color: "#38BDF8", bg: "rgba(56,189,248,0.09)",   icon: "bx-palette" },
  Bootstrap:       { name: "Bootstrap",     color: "#7952B3", bg: "rgba(121,82,179,0.09)",   icon: "bxl-bootstrap" },
  Sass:            { name: "Sass",          color: "#CC6699", bg: "rgba(204,102,153,0.09)",  icon: "bxl-sass" },
  "Material UI":   { name: "Material UI",  color: "#007FFF", bg: "rgba(0,127,255,0.09)",    icon: "bx-palette" },
  "Node.js":       { name: "Node.js",       color: "#339933", bg: "rgba(51,153,51,0.09)",   icon: "bxl-nodejs" },
  Express:         { name: "Express",       color: "#CCCCCC", bg: "rgba(204,204,204,0.06)",  icon: "bx-server" },
  NestJS:          { name: "NestJS",        color: "#E0234E", bg: "rgba(224,35,78,0.09)",    icon: "bx-server" },
  Fastify:         { name: "Fastify",       color: "#DDDDDD", bg: "rgba(221,221,221,0.06)",  icon: "bx-server" },
  Django:          { name: "Django",        color: "#44B78B", bg: "rgba(68,183,139,0.09)",   icon: "bx-server" },
  Flask:           { name: "Flask",         color: "#AAAAAA", bg: "rgba(170,170,170,0.06)",  icon: "bx-server" },
  FastAPI:         { name: "FastAPI",       color: "#009688", bg: "rgba(0,150,136,0.09)",    icon: "bx-server" },
  Laravel:         { name: "Laravel",       color: "#FF2D20", bg: "rgba(255,45,32,0.09)",    icon: "bxl-php" },
  "Spring Boot":   { name: "Spring Boot",  color: "#6DB33F", bg: "rgba(109,179,63,0.09)",   icon: "bx-leaf" },
  PostgreSQL:      { name: "PostgreSQL",   color: "#4169E1", bg: "rgba(65,105,225,0.09)",   icon: "bx-data" },
  MySQL:           { name: "MySQL",         color: "#4479A1", bg: "rgba(68,121,161,0.09)",   icon: "bx-data" },
  MongoDB:         { name: "MongoDB",       color: "#47A248", bg: "rgba(71,162,72,0.09)",    icon: "bx-data" },
  Redis:           { name: "Redis",         color: "#DC382D", bg: "rgba(220,56,45,0.09)",    icon: "bx-data" },
  SQLite:          { name: "SQLite",        color: "#5599AA", bg: "rgba(85,153,170,0.09)",   icon: "bx-data" },
  Firebase:        { name: "Firebase",      color: "#FFCA28", bg: "rgba(255,202,40,0.09)",   icon: "bxl-firebase" },
  Docker:          { name: "Docker",        color: "#2496ED", bg: "rgba(36,150,237,0.09)",   icon: "bxl-docker" },
  Kubernetes:      { name: "Kubernetes",    color: "#326CE5", bg: "rgba(50,108,229,0.09)",   icon: "bx-cube" },
  AWS:             { name: "AWS",           color: "#FF9900", bg: "rgba(255,153,0,0.09)",    icon: "bxl-aws" },
  GCP:             { name: "GCP",           color: "#4285F4", bg: "rgba(66,133,244,0.09)",   icon: "bxl-google-cloud" },
  Azure:           { name: "Azure",         color: "#0078D4", bg: "rgba(0,120,212,0.09)",    icon: "bx-cloud" },
  Terraform:       { name: "Terraform",     color: "#7B42BC", bg: "rgba(123,66,188,0.09)",   icon: "bx-cube-alt" },
  "GitHub Actions":{ name: "GitHub Actions",color: "#2088FF", bg: "rgba(32,136,255,0.09)",   icon: "bxl-github" },
  Git:             { name: "Git",           color: "#F05032", bg: "rgba(240,80,50,0.09)",    icon: "bxl-git" },
  GitHub:          { name: "GitHub",        color: "#EEEEEE", bg: "rgba(238,238,238,0.06)",  icon: "bxl-github" },
  TensorFlow:      { name: "TensorFlow",   color: "#FF6F00", bg: "rgba(255,111,0,0.09)",    icon: "bx-brain" },
  PyTorch:         { name: "PyTorch",       color: "#EE4C2C", bg: "rgba(238,76,44,0.09)",    icon: "bx-brain" },
  "Hugging Face":  { name: "Hugging Face", color: "#FFD21E", bg: "rgba(255,210,30,0.09)",   icon: "bx-brain" },
  LangChain:       { name: "LangChain",    color: "#00A67E", bg: "rgba(0,166,126,0.09)",    icon: "bx-link-alt" },
  "React Native":  { name: "React Native", color: "#61DAFB", bg: "rgba(97,218,251,0.09)",   icon: "bxl-react" },
  Flutter:         { name: "Flutter",       color: "#02569B", bg: "rgba(2,86,155,0.09)",     icon: "bx-mobile" },
  Electron:        { name: "Electron",      color: "#47848F", bg: "rgba(71,132,143,0.09)",   icon: "bx-desktop" },
  Jest:            { name: "Jest",          color: "#C21325", bg: "rgba(194,19,37,0.09)",    icon: "bx-check-shield" },
  Cypress:         { name: "Cypress",       color: "#69D3A7", bg: "rgba(105,211,167,0.09)",  icon: "bx-check-shield" },
  Linux:           { name: "Linux",         color: "#FCC624", bg: "rgba(252,198,36,0.09)",   icon: "bxl-tux" },
  Figma:           { name: "Figma",         color: "#F24E1E", bg: "rgba(242,78,30,0.09)",    icon: "bxl-figma" },
  Unity:           { name: "Unity",         color: "#CCCCCC", bg: "rgba(204,204,204,0.06)",  icon: "bx-game" },
};

const ALL_CATEGORIES = ["Todos", "Frontend", "Backend", "DevOps", "IA / ML", "Vida", "Acontecimentos", "Outros"];

const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "Construindo APIs Modernas com Node.js + Fastify",
    excerpt: "Descubra como o Fastify supera o Express em performance e como estruturar APIs de produção com TypeScript, validação de schemas e muito mais.",
    content: "",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    tags: ["Node.js", "Fastify", "TypeScript", "PostgreSQL"],
    featured: true,
    createdAt: "2026-04-15",
    readTime: 8,
    category: "Backend",
  },
  {
    id: "2",
    title: "React 19 na Prática: Server Components e Actions",
    excerpt: "Uma análise profunda das mudanças do React 19, como Server Components mudam a arquitetura das aplicações e quando usar Server Actions.",
    content: "",
    imageUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80",
    tags: ["React", "Next.js", "TypeScript"],
    featured: true,
    createdAt: "2026-03-28",
    readTime: 12,
    category: "Frontend",
  },
  {
    id: "3",
    title: "Aquela vez que meu deploy foi pro saco em produção",
    excerpt: "Uma sexta-feira tranquila que virou pesadelo. O que aprendi depois de derrubar um sistema em horário de pico e como sobrevivi pra contar.",
    content: "",
    imageUrl: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80",
    tags: ["Docker", "AWS"],
    featured: false,
    createdAt: "2026-03-10",
    readTime: 6,
    category: "Acontecimentos",
  },
  {
    id: "4",
    title: "PostgreSQL Avançado: Performance e Indexação",
    excerpt: "Técnicas avançadas de otimização: índices parciais, EXPLAIN ANALYZE, particionamento e query planning.",
    content: "",
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
    tags: ["PostgreSQL"],
    featured: false,
    createdAt: "2026-02-20",
    readTime: 10,
    category: "Backend",
  },
  {
    id: "5",
    title: "Integrando LLMs com LangChain e Python",
    excerpt: "Como construir aplicações inteligentes usando LangChain, conectar modelos a dados externos e criar agentes autônomos.",
    content: "",
    imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    tags: ["Python", "LangChain", "Hugging Face", "FastAPI"],
    featured: false,
    createdAt: "2026-02-05",
    readTime: 11,
    category: "IA / ML",
  },
  {
    id: "6",
    title: "Minha rotina de dev: o que funcionou (e o que não funcionou)",
    excerpt: "Tentei de tudo — Pomodoro, deep work, headphones com lofi. Aqui está o que realmente funciona no meu dia a dia.",
    content: "",
    imageUrl: null,
    tags: [],
    featured: false,
    createdAt: "2026-01-18",
    readTime: 5,
    category: "Vida",
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function getTag(name: string): Tag {
  return TAG_REGISTRY[name] ?? { name, color: "#9ca3af", bg: "rgba(156,163,175,0.08)", icon: "bx-hash" };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

function filterByCategory(posts: Post[], cat: string): Post[] {
  if (cat === "Todos") return posts;
  const techMap: Record<string, string[]> = {
    Frontend: ["React","Vue","Angular","Svelte","Next.js","Nuxt.js","Astro","Tailwind","Vite","JavaScript","TypeScript","Sass","Material UI","Bootstrap"],
    Backend:  ["Node.js","Express","NestJS","Fastify","Django","Flask","FastAPI","Laravel","Spring Boot","PostgreSQL","MySQL","MongoDB","Redis","SQLite"],
    DevOps:   ["Docker","Kubernetes","AWS","GCP","Azure","Terraform","GitHub Actions","Git","Linux"],
    "IA / ML":["TensorFlow","PyTorch","Hugging Face","LangChain"],
  };
  return posts.filter((p) =>
    p.category === cat ||
    (techMap[cat] && p.tags.some((t) => techMap[cat].includes(t)))
  );
}

// ─── TAG BADGE ────────────────────────────────────────────────────────────────

function TagBadge({ name, small = false }: { name: string; small?: boolean }) {
  const tag = getTag(name);
  return (
    <span
      className={`blog-tag${small ? " blog-tag--small" : ""}`}
      style={{ "--tag-color": tag.color, "--tag-bg": tag.bg } as React.CSSProperties}
    >
      <i className={`bx ${tag.icon}`} />
      {name}
    </span>
  );
}

// ─── POST CARD ────────────────────────────────────────────────────────────────

function PostCard({ post, onClick }: { post: Post; onClick: () => void }) {
  return (
    <article
      className={`blog-card${post.featured ? " blog-card--featured" : ""}`}
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      role="button"
      aria-label={`Ler: ${post.title}`}
    >
      {post.imageUrl && (
        <div className="blog-card__thumb">
          <img src={post.imageUrl} alt={post.title} loading="lazy" />
          {post.featured && (
            <span className="blog-card__featured-badge">
              <i className="bx bxs-star" /> Destaque
            </span>
          )}
        </div>
      )}
      <div className="blog-card__body">
        <div className="blog-card__meta">
          <span><i className="bx bx-calendar" />{formatDate(post.createdAt)}</span>
          <span><i className="bx bx-time-five" />{post.readTime} min</span>
          {post.category && <span><i className="bx bx-category" />{post.category}</span>}
        </div>
        <h3 className="blog-card__title">{post.title}</h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        {post.tags.length > 0 && (
          <div className="blog-card__tags">
            {post.tags.slice(0, 3).map((t) => <TagBadge key={t} name={t} small />)}
            {post.tags.length > 3 && (
              <span className="blog-tag blog-tag--small blog-tag--more">+{post.tags.length - 3}</span>
            )}
          </div>
        )}
        <button className="blog-card__cta">
          Ler artigo <i className="bx bx-right-arrow-alt" />
        </button>
      </div>
    </article>
  );
}

// ─── POST MODAL ───────────────────────────────────────────────────────────────

function PostModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const [author, setAuthor] = useState("");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/posts/${post.id}/comments`)
      .then((r) => r.json())
      .then((d) => setComments(d.data ?? []))
      .catch(() => {});
  }, [post.id]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  async function submitComment() {
    if (!author.trim() || !commentText.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${post.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: author.trim(), text: commentText.trim() }),
      });
      const c = await res.json();
      setComments((prev) => [c, ...prev]);
      setCommentText("");
    } catch {
      setComments((prev) => [{
        id: String(Date.now()), author: author.trim(),
        text: commentText.trim(), createdAt: new Date().toISOString(),
      }, ...prev]);
      setCommentText("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="blog-modal-overlay"
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className="blog-modal" role="dialog" aria-modal="true">
        <button className="blog-modal__close" onClick={onClose} aria-label="Fechar">
          <i className="bx bx-x" />
        </button>

        {post.imageUrl && (
          <div className="blog-modal__hero">
            <img src={post.imageUrl} alt={post.title} />
          </div>
        )}

        <div className="blog-modal__content">
          <div className="blog-modal__meta">
            <span><i className="bx bx-calendar" />{formatDate(post.createdAt)}</span>
            <span><i className="bx bx-time-five" />{post.readTime} min de leitura</span>
            {post.category && <span><i className="bx bx-category" />{post.category}</span>}
          </div>

          <h2 className="blog-modal__title">{post.title}</h2>

          {post.tags.length > 0 && (
            <div className="blog-modal__tags">
              {post.tags.map((t) => <TagBadge key={t} name={t} />)}
            </div>
          )}

          <div className="blog-modal__body">
            <p>{post.excerpt}</p>
            <p>
              O conteúdo completo é carregado via API.{" "}
              {post.tags.length > 0 && (
                <>Tecnologias: {post.tags.slice(0, 2).map((t, i) => (
                  <span key={t}><TagBadge name={t} small />{i < 1 ? " e " : ""}</span>
                ))}.</>
              )}
            </p>
          </div>

          <div className="blog-comments">
            <h4 className="blog-comments__title">
              <i className="bx bx-comment-dots" /> Comentários ({comments.length})
            </h4>
            {comments.length === 0 && (
              <p className="blog-comments__empty">Nenhum comentário ainda. Seja o primeiro!</p>
            )}
            <div className="blog-comments__list">
              {comments.map((c) => (
                <div key={c.id} className="blog-comment">
                  <div className="blog-comment__avatar">{c.author[0]?.toUpperCase()}</div>
                  <div className="blog-comment__body">
                    <span className="blog-comment__author">{c.author}</span>
                    <span className="blog-comment__date">{formatDate(c.createdAt.slice(0, 10))}</span>
                    <p className="blog-comment__text">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="blog-comment-form">
              <input
                type="text"
                placeholder="Seu nome"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="input-blog"
              />
              <textarea
                placeholder="Deixe seu comentário..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="textarea-blog"
                rows={3}
              />
              <button
                className="btn-blog btn-blog--sm"
                onClick={submitComment}
                disabled={loading || !author.trim() || !commentText.trim()}
              >
                <i className={`bx ${loading ? "bx-loader-alt" : "bx-send"}`} />
                {loading ? "Enviando..." : "Comentar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BLOG PRINCIPAL ───────────────────────────────────────────────────────────

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  // Produção: busca da API
  // useEffect(() => {
  //   fetch("/api/posts").then(r => r.json()).then(d => setPosts(d.data ?? []));
  // }, []);

  const filtered = filterByCategory(
    posts.filter((p) =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      (p.category ?? "").toLowerCase().includes(search.toLowerCase())
    ),
    activeCategory
  );

  const featured = filtered.filter((p) => p.featured);
  const regular  = filtered.filter((p) => !p.featured);

  return (
    <section className="groupBlog" id="blog">
      <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" />

      <div className="blog">
        {/* Título — padrão do portfólio */}
        <div className="groupBlog-primary">
          <div className="dividir-titulo-linha">
            <div className="linhas-blog" />
            <div className="linhas-blog" />
          </div>
          <h2 className="titleBlog">Blog</h2>
        </div>

        <p className="blog-subtitle">
          Artigos técnicos, causos do dia a dia e o que mais me der vontade de escrever.
        </p>

        {/* Controles */}
        <div className="blog-controls">
          <div className="blog-search">
            <i className="bx bx-search" />
            <input
              type="text"
              placeholder="Buscar por título, tag ou categoria..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="blog-search__clear" onClick={() => setSearch("")}>
                <i className="bx bx-x" />
              </button>
            )}
          </div>
          <div className="blog-categories">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`blog-categories__btn${activeCategory === cat ? " blog-categories__btn--active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Destaques */}
        {featured.length > 0 && (
          <div className="blog-featured-grid">
            {featured.map((p) => (
              <PostCard key={p.id} post={p} onClick={() => setSelectedPost(p)} />
            ))}
          </div>
        )}

        {featured.length > 0 && regular.length > 0 && (
          <div className="blog-divider"><span>Mais posts</span></div>
        )}

        {/* Grid regular */}
        {filtered.length === 0 ? (
          <div className="blog-empty">
            <i className="bx bx-search-alt" />
            <p>Nenhum post encontrado para <strong>"{search}"</strong></p>
            <button className="btn-blog btn-blog--sm" onClick={() => { setSearch(""); setActiveCategory("Todos"); }}>
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="blog-grid">
            {regular.slice(0, visibleCount).map((p) => (
              <PostCard key={p.id} post={p} onClick={() => setSelectedPost(p)} />
            ))}
          </div>
        )}

        {visibleCount < regular.length && (
          <div className="blog-load-more">
            <button className="btn-blog btn-blog--ghost" onClick={() => setVisibleCount((v) => v + 3)}>
              <i className="bx bx-chevron-down" /> Carregar mais
            </button>
          </div>
        )}
      </div>

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </section>
  );
}