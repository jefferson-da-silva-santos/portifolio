// ViewPost.tsx — Jefferson Santos Portfolio
// Página dedicada de leitura de post com Markdown
// Lib: react-markdown + remark-gfm + rehype-highlight
//
// npm install react-markdown remark-gfm rehype-highlight highlight.js
//
// Roteamento esperado: /blog/:id
// Ex: <Route path="/blog/:id" element={<ViewPost />} />

import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // tema do syntax highlight
import { TAG_REGISTRY } from "../../consts/dataConsts";
import { BASE_API } from "../Blog";

// ─── TYPES ────────────────────────────────────────────────────────────────────

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
  imageBase64?: string | null;
  imageUrl?: string | null;
  tags: string[];
  featured: boolean;
  createdAt: string;
  readTime: number;
  category?: string;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function getTag(name: string): Tag {
  return TAG_REGISTRY[name] ?? {
    name,
    color: "#9ca3af",
    bg: "rgba(156,163,175,0.08)",
    icon: "bx-hash",
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// ─── TAG BADGE ────────────────────────────────────────────────────────────────

function TagBadge({ name }: { name: string }) {
  const tag = getTag(name);
  return (
    <span
      className="blog-tag"
      style={{ "--tag-color": tag.color, "--tag-bg": tag.bg } as React.CSSProperties}
    >
      <i className={`bx ${tag.icon}`} />
      {name}
    </span>
  );
}

// ─── SKELETON LOADER ─────────────────────────────────────────────────────────

function PostSkeleton() {
  return (
    <div className="vp-skeleton">
      <div className="vp-skeleton__hero" />
      <div className="vp-skeleton__body">
        <div className="vp-skeleton__line vp-skeleton__line--short" />
        <div className="vp-skeleton__line vp-skeleton__line--title" />
        <div className="vp-skeleton__line vp-skeleton__line--title vp-skeleton__line--half" />
        <div className="vp-skeleton__tags">
          <div className="vp-skeleton__tag" />
          <div className="vp-skeleton__tag" />
          <div className="vp-skeleton__tag" />
        </div>
        <div className="vp-skeleton__line" />
        <div className="vp-skeleton__line" />
        <div className="vp-skeleton__line vp-skeleton__line--short" />
        <div className="vp-skeleton__line" />
        <div className="vp-skeleton__line vp-skeleton__line--half" />
      </div>
    </div>
  );
}

// ─── COMMENT SECTION ─────────────────────────────────────────────────────────

function CommentSection({ postId }: { postId: string }) {
  const [author, setAuthor] = useState("");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    setFetching(true);
    fetch(`${BASE_API}/api/posts/${postId}/comments`)
      .then((r) => r.json())
      .then((d) => setComments(d.data ?? []))
      .catch(() => {})
      .finally(() => setFetching(false));
  }, [postId]);

  async function submitComment() {
    if (!author.trim() || !commentText.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE_API}/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: author.trim(), text: commentText.trim() }),
      });
      const c = await res.json();
      setComments((prev) => [c, ...prev]);
      setCommentText("");
    } catch {
      // fallback otimista
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

  return (
    <section className="vp-comments">
      <h3 className="vp-comments__title">
        <i className="bx bx-comment-dots" />
        Comentários
        <span className="vp-comments__count">{comments.length}</span>
      </h3>

      {/* Form */}
      <div className="vp-comment-form">
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
          <i className={`bx ${loading ? "bx-loader-alt bx-spin" : "bx-send"}`} />
          {loading ? "Enviando..." : "Comentar"}
        </button>
      </div>

      {/* Lista */}
      {fetching ? (
        <div className="vp-comments__loading">
          <i className="bx bx-loader-alt bx-spin" /> Carregando comentários...
        </div>
      ) : comments.length === 0 ? (
        <p className="vp-comments__empty">
          Nenhum comentário ainda. Seja o primeiro!
        </p>
      ) : (
        <div className="vp-comments__list">
          {comments.map((c) => (
            <div key={c.id} className="blog-comment">
              <div className="blog-comment__avatar">
                {c.author[0]?.toUpperCase()}
              </div>
              <div className="blog-comment__body">
                <span className="blog-comment__author">{c.author}</span>
                <span className="blog-comment__date">
                  {formatDate(c.createdAt.slice(0, 10))}
                </span>
                <p className="blog-comment__text">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ─── TABLE OF CONTENTS ────────────────────────────────────────────────────────

interface Heading {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split("\n");
  const headings: Heading[] = [];
  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)/);
    if (match) {
      const text = match[2].trim();
      headings.push({
        level: match[1].length,
        text,
        id: text.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      });
    }
  }
  return headings;
}

function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -75% 0px" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className="vp-toc">
      <span className="vp-toc__label">Neste artigo</span>
      <ul>
        {headings.map((h) => (
          <li
            key={h.id}
            className={`vp-toc__item vp-toc__item--h${h.level}${active === h.id ? " vp-toc__item--active" : ""}`}
          >
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── MARKDOWN COMPONENTS ──────────────────────────────────────────────────────
// Injeta IDs nos headings para anchoragem do TOC

function slugify(text: string): string {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
}

const markdownComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(String(children));
    return <h1 id={id} {...props}>{children}</h1>;
  },
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(String(children));
    return <h2 id={id} {...props}>{children}</h2>;
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(String(children));
    return <h3 id={id} {...props}>{children}</h3>;
  },
};

// ─── READING PROGRESS ────────────────────────────────────────────────────────

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="vp-progress" style={{ width: `${progress}%` }} />
  );
}

// ─── VIEW POST ────────────────────────────────────────────────────────────────

export default function ViewPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const headings = post?.content ? extractHeadings(post.content) : [];
  const imageUrl = post?.imageBase64 || post?.imageUrl;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(false);
    fetch(`${BASE_API}/api/posts/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setPost(data);
        document.title = `${data.title} — Blog`;
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    return () => { document.title = "Blog"; };
  }, [id]);

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <main className="vp-page">
        <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" />
        <div className="vp-container">
          <PostSkeleton />
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="vp-page">
        <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" />
        <div className="vp-container vp-container--centered">
          <div className="vp-error">
            <i className="bx bx-error-circle" />
            <h2>Post não encontrado</h2>
            <p>O artigo que você procura não existe ou foi removido.</p>
            <button className="btn-blog" onClick={() => navigate("/blog")}>
              <i className="bx bx-arrow-back" /> Voltar ao blog
            </button>
          </div>
        </div>
      </main>
    );
  }

  const contentIsEmpty = !post.content?.trim();
  const displayContent = contentIsEmpty
    ? post.excerpt
    : post.content;

  return (
    <main className="vp-page">
      <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" />
      <ReadingProgress />

      {/* Hero */}
      {imageUrl && (
        <div className="vp-hero">
          <img src={imageUrl} alt={post.title} />
          <div className="vp-hero__overlay" />
        </div>
      )}

      <div className="vp-container">
        {/* Nav top */}
        <nav className="vp-nav">
          <Link to="/blog" className="blog-nav__btn">
            <i className="bx bx-arrow-back" />
            <span>Voltar ao blog</span>
          </Link>
          <button
            className={`blog-nav__btn${copied ? " blog-nav__btn--copied" : ""}`}
            onClick={copyLink}
            title="Copiar link"
          >
            <i className={`bx ${copied ? "bx-check" : "bx-link"}`} />
            <span>{copied ? "Copiado!" : "Compartilhar"}</span>
          </button>
        </nav>

        <div className="vp-layout">
          {/* Sidebar TOC */}
          <aside className="vp-sidebar">
            <TableOfContents headings={headings} />
          </aside>

          {/* Artigo */}
          <article className="vp-article">
            {/* Meta */}
            <header className="vp-article__header">
              <div className="vp-article__meta">
                {post.category && (
                  <span className="vp-article__category">
                    <i className="bx bx-category" />
                    {post.category}
                  </span>
                )}
                <span>
                  <i className="bx bx-calendar" />
                  {formatDate(post.createdAt)}
                </span>
                <span>
                  <i className="bx bx-time-five" />
                  {post.readTime} min de leitura
                </span>
                {post.featured && (
                  <span className="vp-article__featured">
                    <i className="bx bxs-star" /> Destaque
                  </span>
                )}
              </div>

              <h1 className="vp-article__title">{post.title}</h1>

              {post.excerpt && (
                <p className="vp-article__excerpt">{post.excerpt}</p>
              )}

              {post.tags.length > 0 && (
                <div className="vp-article__tags">
                  {post.tags.map((t) => (
                    <TagBadge key={t} name={t} />
                  ))}
                </div>
              )}
            </header>

            {/* Divisor */}
            <hr className="vp-article__divider" />

            {/* Conteúdo Markdown */}
            <div className="vp-markdown">
              {contentIsEmpty ? (
                <p className="vp-markdown__placeholder">
                  <i className="bx bx-info-circle" />
                  Este post ainda não tem conteúdo completo. Confira o resumo acima.
                </p>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={markdownComponents as any}
                >
                  {displayContent}
                </ReactMarkdown>
              )}
            </div>

            {/* Divisor */}
            <hr className="vp-article__divider" />

            {/* Comentários */}
            <CommentSection postId={post.id} />
          </article>
        </div>
      </div>
    </main>
  );
}