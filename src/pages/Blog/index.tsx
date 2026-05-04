// Blog.tsx — Jefferson Santos Portfolio
// Estilização em _blog.scss (sem CSS-in-JS)
// Ao clicar em um post, navega para /blog/:id (ViewPost)

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TAG_REGISTRY } from "../../consts/dataConsts";

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface Tag {
  name: string;
  color: string;
  bg: string;
  icon: string;
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageBase64?: string | null;
  imageUrl?: string | null;
  tags: string[];
  featured: boolean;
  createdAt: string;
  readTime: number;
  category?: string;
}

export const BASE_API = "https://blog-server-tawny-ten.vercel.app";

// ─── TAG REGISTRY ─────────────────────────────────────────────────────────────

const ALL_CATEGORIES = [
  "Todos",
  "Frontend",
  "Backend",
  "DevOps",
  "IA / ML",
  "Vida",
  "Acontecimentos",
  "Outros",
];

const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "Construindo APIs Modernas com Node.js + Fastify",
    excerpt:
      "Descubra como o Fastify supera o Express em performance e como estruturar APIs de produção com TypeScript, validação de schemas e muito mais.",
    content: "",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    tags: ["Node.js", "Fastify", "TypeScript", "PostgreSQL"],
    featured: true,
    createdAt: "2026-04-15",
    readTime: 8,
    category: "Backend",
  },
  {
    id: "2",
    title: "React 19 na Prática: Server Components e Actions",
    excerpt:
      "Uma análise profunda das mudanças do React 19, como Server Components mudam a arquitetura das aplicações e quando usar Server Actions.",
    content: "",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80",
    tags: ["React", "Next.js", "TypeScript"],
    featured: true,
    createdAt: "2026-03-28",
    readTime: 12,
    category: "Frontend",
  },
  {
    id: "3",
    title: "Aquela vez que meu deploy foi pro saco em produção",
    excerpt:
      "Uma sexta-feira tranquila que virou pesadelo. O que aprendi depois de derrubar um sistema em horário de pico e como sobrevivi pra contar.",
    content: "",
    imageUrl:
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80",
    tags: ["Docker", "AWS"],
    featured: false,
    createdAt: "2026-03-10",
    readTime: 6,
    category: "Acontecimentos",
  },
  {
    id: "4",
    title: "PostgreSQL Avançado: Performance e Indexação",
    excerpt:
      "Técnicas avançadas de otimização: índices parciais, EXPLAIN ANALYZE, particionamento e query planning.",
    content: "",
    imageUrl:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
    tags: ["PostgreSQL"],
    featured: false,
    createdAt: "2026-02-20",
    readTime: 10,
    category: "Backend",
  },
  {
    id: "5",
    title: "Integrando LLMs com LangChain e Python",
    excerpt:
      "Como construir aplicações inteligentes usando LangChain, conectar modelos a dados externos e criar agentes autônomos.",
    content: "",
    imageUrl:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    tags: ["Python", "LangChain", "Hugging Face", "FastAPI"],
    featured: false,
    createdAt: "2026-02-05",
    readTime: 11,
    category: "IA / ML",
  },
  {
    id: "6",
    title: "Minha rotina de dev: o que funcionou (e o que não funcionou)",
    excerpt:
      "Tentei de tudo — Pomodoro, deep work, headphones com lofi. Aqui está o que realmente funciona no meu dia a dia.",
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
  return (
    TAG_REGISTRY[name] ?? {
      name,
      color: "#9ca3af",
      bg: "rgba(156,163,175,0.08)",
      icon: "bx-hash",
    }
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function filterByCategory(posts: Post[], cat: string): Post[] {
  if (cat === "Todos") return posts;
  const techMap: Record<string, string[]> = {
    Frontend: [
      "React","Vue","Angular","Svelte","Next.js","Nuxt.js","Astro",
      "Tailwind","Vite","JavaScript","TypeScript","Sass","Material UI","Bootstrap",
    ],
    Backend: [
      "Node.js","Express","NestJS","Fastify","Django","Flask","FastAPI",
      "Laravel","Spring Boot","PostgreSQL","MySQL","MongoDB","Redis","SQLite",
    ],
    DevOps: [
      "Docker","Kubernetes","AWS","GCP","Azure","Terraform","GitHub Actions","Git","Linux",
    ],
    "IA / ML": ["TensorFlow","PyTorch","Hugging Face","LangChain"],
  };
  return posts.filter(
    (p) =>
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
      style={
        { "--tag-color": tag.color, "--tag-bg": tag.bg } as React.CSSProperties
      }
    >
      <i className={`bx ${tag.icon}`} />
      {name}
    </span>
  );
}

// ─── POST CARD ────────────────────────────────────────────────────────────────

function PostCard({ post, onClick }: { post: Post; onClick: () => void }) {
  const thumb = post.imageBase64 || post.imageUrl;
  return (
    <article
      className={`blog-card${post.featured ? " blog-card--featured" : ""}`}
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      role="button"
      aria-label={`Ler: ${post.title}`}
    >
      {thumb && (
        <div className="blog-card__thumb">
          <img src={thumb} alt={post.title} loading="lazy" />
          {post.featured && (
            <span className="blog-card__featured-badge">
              <i className="bx bxs-star" /> Destaque
            </span>
          )}
        </div>
      )}
      <div className="blog-card__body">
        <div className="blog-card__meta">
          <span>
            <i className="bx bx-calendar" />
            {formatDate(post.createdAt)}
          </span>
          <span>
            <i className="bx bx-time-five" />
            {post.readTime} min
          </span>
          {post.category && (
            <span>
              <i className="bx bx-category" />
              {post.category}
            </span>
          )}
        </div>
        <h3 className="blog-card__title">{post.title}</h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        {post.tags.length > 0 && (
          <div className="blog-card__tags">
            {post.tags.slice(0, 3).map((t) => (
              <TagBadge key={t} name={t} small />
            ))}
            {post.tags.length > 3 && (
              <span className="blog-tag blog-tag--small blog-tag--more">
                +{post.tags.length - 3}
              </span>
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

// ─── BLOG PRINCIPAL ───────────────────────────────────────────────────────────

export default function Blog() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetch(`${BASE_API}/api/posts`)
      .then((r) => r.json())
      .then((d) => setPosts(d.data ?? []))
      .catch(() => {});
  }, []);

  const filtered = filterByCategory(
    posts.filter(
      (p) =>
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        (p.category ?? "").toLowerCase().includes(search.toLowerCase())
    ),
    activeCategory
  );

  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  function openPost(id: string) {
    navigate(`/blog/${id}`);
  }

  return (
    <section className="groupBlog" id="blog">
      <link
        rel="stylesheet"
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      />

      <div className="blog">
        {/* Botões de navegação */}
        <nav className="blog-nav" aria-label="Navegação do blog">
          <Link to="/" className="blog-nav__btn">
            <i className="bx bx-arrow-back" />
            <span>Início</span>
          </Link>
          <Link to="/admin" className="blog-nav__btn blog-nav__btn--admin">
            <i className="bx bx-shield-quarter" />
            <span>Admin</span>
          </Link>
        </nav>

        {/* Título */}
        <div className="groupBlog-primary">
          <div className="dividir-titulo-linha">
            <div className="linhas-blog" />
            <div className="linhas-blog" />
          </div>
          <h2 className="titleBlog">Blog</h2>
        </div>

        <p className="blog-subtitle">
          Artigos técnicos, causos do dia a dia e o que mais me der vontade de
          escrever.
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
              <button
                className="blog-search__clear"
                onClick={() => setSearch("")}
              >
                <i className="bx bx-x" />
              </button>
            )}
          </div>
          <div className="blog-categories">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`blog-categories__btn${
                  activeCategory === cat
                    ? " blog-categories__btn--active"
                    : ""
                }`}
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
              <PostCard key={p.id} post={p} onClick={() => openPost(p.id)} />
            ))}
          </div>
        )}

        {featured.length > 0 && regular.length > 0 && (
          <div className="blog-divider">
            <span>Mais posts</span>
          </div>
        )}

        {/* Grid regular */}
        {filtered.length === 0 ? (
          <div className="blog-empty">
            <i className="bx bx-search-alt" />
            <p>
              Nenhum post encontrado para <strong>"{search}"</strong>
            </p>
            <button
              className="btn-blog btn-blog--sm"
              onClick={() => {
                setSearch("");
                setActiveCategory("Todos");
              }}
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="blog-grid">
            {regular.slice(0, visibleCount).map((p) => (
              <PostCard
                key={p.id}
                post={p}
                onClick={() => openPost(p.id)}
              />
            ))}
          </div>
        )}

        {visibleCount < regular.length && (
          <div className="blog-load-more">
            <button
              className="btn-blog btn-blog--ghost"
              onClick={() => setVisibleCount((v) => v + 3)}
            >
              <i className="bx bx-chevron-down" /> Carregar mais
            </button>
          </div>
        )}
      </div>
    </section>
  );
}