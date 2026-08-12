// Blog.tsx — Jefferson Santos Portfolio
// Estilização em _blog.scss (sem CSS-in-JS)
// Suporta posts técnicos e pessoais
// Markdown: react-markdown + remark-gfm + rehype-highlight

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TAG_REGISTRY } from "../../consts/dataConsts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

// Importe o tema do highlight.js no seu arquivo de estilos global ou aqui:
// import "highlight.js/styles/github-dark.css";
// (ou qualquer outro tema disponível em highlight.js/styles/)

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface Tag {
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
  imageBase64?: string | null;
  imageUrl?: string | null;
  tags: string[];
  featured: boolean;
  createdAt: string;
  readTime: number;
  category?: string;
}

// pages/Blog/index.tsx
export const BASE_API = "https://blog-server-8my7.onrender.com";

// ─── CATEGORIAS ──────────────────────────────────────────────────────────────

const ALL_CATEGORIES = ["Todos", "Frontend", "Backend", "DevOps", "IA / ML", "Vida", "Acontecimentos", "Outros"];

const MOCK_POSTS: Post[] = [];

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
      "React","Vue","Angular","Svelte","Next.js","Nuxt.js","Astro","Tailwind",
      "Vite","JavaScript","TypeScript","Sass","Material UI","Bootstrap",
    ],
    Backend: [
      "Node.js","Express","NestJS","Fastify","Django","Flask","FastAPI",
      "Laravel","Spring Boot","PostgreSQL","MySQL","MongoDB","Redis","SQLite",
    ],
    DevOps: ["Docker","Kubernetes","AWS","GCP","Azure","Terraform","GitHub Actions","Git","Linux"],
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
      style={{ "--tag-color": tag.color, "--tag-bg": tag.bg } as React.CSSProperties}
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

// Blog.tsx — adicionar após os outros componentes (PostCard, MarkdownContent...), antes de PostModal

// ─── SKELETON LOADING ─────────────────────────────────────────────────────────

function PostCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div className={`blog-card blog-card--skeleton${featured ? " blog-card--featured" : ""}`}>
      <div className="skeleton skeleton--thumb" />
      <div className="blog-card__body">
        <div className="skeleton-meta">
          <div className="skeleton skeleton--pill" />
          <div className="skeleton skeleton--pill" />
        </div>
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--line" />
        <div className="skeleton skeleton--line" style={{ width: "70%" }} />
        <div className="skeleton-meta" style={{ marginTop: "auto" }}>
          <div className="skeleton skeleton--tag" />
          <div className="skeleton skeleton--tag" />
        </div>
      </div>
    </div>
  );
}

function BlogGridSkeleton() {
  return (
    <div className="blog-grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}

function PostModalSkeleton() {
  return (
    <div className="blog-modal" role="dialog" aria-modal="true">
      <div className="skeleton skeleton--hero" />
      <div className="blog-modal__content">
        <div className="skeleton-meta">
          <div className="skeleton skeleton--pill" />
          <div className="skeleton skeleton--pill" />
          <div className="skeleton skeleton--pill" />
        </div>
        <div className="skeleton skeleton--modal-title" />
        <div className="skeleton-meta" style={{ marginBottom: "2rem" }}>
          <div className="skeleton skeleton--tag" />
          <div className="skeleton skeleton--tag" />
        </div>
        <div className="skeleton skeleton--paragraph" />
        <div className="skeleton skeleton--paragraph" style={{ width: "92%" }} />
        <div className="skeleton skeleton--paragraph" style={{ width: "80%" }} />
      </div>
    </div>
  );
}

// ─── MARKDOWN RENDERER ───────────────────────────────────────────────────────
// Componente isolado para renderização de Markdown com GFM + syntax highlight

function MarkdownContent({ content }: { content: string }) {
  if (!content?.trim()) return null;

  return (
    <div className="blog-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Abre links externos em nova aba com segurança
          a({ href, children, ...props }) {
            const isExternal = href?.startsWith("http");
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
          // Imagens responsivas
          img({ src, alt, ...props }) {
            return (
              <img
                src={src}
                alt={alt}
                loading="lazy"
                style={{ maxWidth: "100%", borderRadius: "8px" }}
                {...props}
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// ─── POST MODAL ───────────────────────────────────────────────────────────────

function PostModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const [author, setAuthor] = useState("");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  // Estado para controlar carregamento do conteúdo completo via API
  const [fullPost, setFullPost] = useState<Post>(post);
  const [loadingContent, setLoadingContent] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Busca conteúdo completo do post (caso o card não tenha o content completo)
  useEffect(() => {
    // Se o post já tem conteúdo, não precisa buscar
    if (post.content?.trim()) {
      setFullPost(post);
      return;
    }

    setLoadingContent(true);
    fetch(`${BASE_API}/api/posts/${post.id}`)
      .then((r) => r.json())
      .then((d) => setFullPost(d))
      .catch(() => setFullPost(post))
      .finally(() => setLoadingContent(false));
  }, [post.id]);

  // Busca comentários
  useEffect(() => {
    fetch(`${BASE_API}/api/posts/${post.id}/comments`)
      .then((r) => r.json())
      .then((d) => setComments(d.data ?? []))
      .catch(() => {});
  }, [post.id]);

  // Bloqueia scroll do body enquanto modal está aberto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  async function submitComment() {
    if (!author.trim() || !commentText.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE_API}/api/posts/${post.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: author.trim(), text: commentText.trim() }),
      });
      const c = await res.json();
      setComments((prev) => [c, ...prev]);
      setCommentText("");
    } catch {
      setComments((prev) => [
        {
          id: String(Date.now()),
          author: author.trim(),
          text: commentText.trim(),
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
      setCommentText("");
    } finally {
      setLoading(false);
    }
  }

  const heroImage = fullPost.imageBase64 || fullPost.imageUrl;

  // Blog.tsx — dentro de PostModal, trecho do return

  return (
    <div className="blog-modal-overlay" ref={overlayRef} onClick={(e) => e.target === overlayRef.current && onClose()}>
      {loadingContent ? (
        <PostModalSkeleton />
      ) : (
        <>
          <button className="blog-modal__close" onClick={onClose} aria-label="Fechar">
            <i className="bx bx-x" />
          </button>

          {heroImage && (
            <div className="blog-modal__hero">
              <img src={heroImage} alt={fullPost.title} />
            </div>
          )}

          <div className="blog-modal__content">
            <div className="blog-modal__meta">
              <span>
                <i className="bx bx-calendar" />
                {formatDate(fullPost.createdAt)}
              </span>
              <span>
                <i className="bx bx-time-five" />
                {fullPost.readTime} min de leitura
              </span>
              {fullPost.category && (
                <span>
                  <i className="bx bx-category" />
                  {fullPost.category}
                </span>
              )}
            </div>

            <h2 className="blog-modal__title">{fullPost.title}</h2>

            {fullPost.tags.length > 0 && (
              <div className="blog-modal__tags">
                {fullPost.tags.map((t) => (
                  <TagBadge key={t} name={t} />
                ))}
              </div>
            )}

            <div className="blog-modal__body">
              {fullPost.content?.trim() ? (
                <MarkdownContent content={fullPost.content} />
              ) : (
                <p className="blog-modal__excerpt-fallback">{fullPost.excerpt}</p>
              )}
            </div>

            <div className="blog-comments">
              <h4 className="blog-comments__title">
                <i className="bx bx-comment-dots" /> Comentários ({comments.length})
              </h4>
              {comments.length === 0 && <p className="blog-comments__empty">Nenhum comentário ainda. Seja o primeiro!</p>}
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
                <button className="btn-blog btn-blog--sm" onClick={submitComment} disabled={loading || !author.trim() || !commentText.trim()}>
                  <i className={`bx ${loading ? "bx-loader-alt" : "bx-send"}`} />
                  {loading ? "Enviando..." : "Comentar"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── BLOG PRINCIPAL ───────────────────────────────────────────────────────────

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_API}/api/posts`)
      .then((r) => r.json())
      .then((d) => setPosts(d.data ?? []))
      .catch(() => { })
      .finally(() => setLoading(false));
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

  return (
    <section className="groupBlog" id="blog">
      <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" />

      <div className="blog">
        <nav className="blog-nav" aria-label="Navegação do blog">
          <Link to="/" className="blog-nav__btn">
            <i className="bx bx-arrow-back" />
            <span>Início</span>
          </Link>
          <Link to="/admin" className="blog-nav__btn blog-nav__btn--admin">
            <i className="bx bx-shield-quarter" />
            <span>Admin</span>
          </Link>
          <Link to="/financas" className="blog-nav__btn blog-nav__btn--admin">
            <i className="bx bx-wallet" />
            <span>Finanças</span>
          </Link>
        </nav>

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

        <div className="blog-controls">
          <div className="blog-search">
            <i className="bx bx-search" />
            <input
              type="text"
              placeholder="Buscar por título, tag ou categoria..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={loading}
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
                disabled={loading}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <BlogGridSkeleton />
        ) : (
          <>
            {featured.length > 0 && (
              <div className="blog-featured-grid">
                {featured.map((p) => (
                  <PostCard key={p.id} post={p} onClick={() => setSelectedPost(p)} />
                ))}
              </div>
            )}

            {featured.length > 0 && regular.length > 0 && (
              <div className="blog-divider">
                <span>Mais posts</span>
              </div>
            )}

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
          </>
        )}
      </div>

      {selectedPost && <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </section>
  );
}
