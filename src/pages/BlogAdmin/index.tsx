// BlogAdmin.tsx — Jefferson Santos Portfolio
// Estilização em _blog.scss + _blog-admin-extra.scss
// Editor Markdown com preview: @uiw/react-md-editor
//
// npm install @uiw/react-md-editor
//
// O @uiw/react-md-editor já inclui o CSS próprio — importe no topo:
// import "@uiw/react-md-editor/markdown-editor.css";
// import "@uiw/react-md-editor/markdown.css";

import { useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import { BASE_API } from "../Blog";

// ─── TYPES ───────────────────────────────────────────────────────────────────

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
  category: string;
}

type ToastType = "success" | "error";

// ─── CONSTANTES ───────────────────────────────────────────────────────────────

const ALL_TAGS = [
  "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust", "Kotlin", "Swift",
  "PHP", "Ruby", "Dart", "Bash", "Solidity", "Elixir",
  "React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt.js", "Astro", "Vite", "Tailwind",
  "Material UI", "Bootstrap", "Sass",
  "Node.js", "Express", "NestJS", "Fastify", "Django", "Flask", "FastAPI", "Laravel",
  "Spring Boot", "ASP.NET Core",
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Firebase",
  "Docker", "Kubernetes", "AWS", "GCP", "Azure", "Terraform", "GitHub Actions", "Git", "Linux", "GitHub",
  "TensorFlow", "PyTorch", "Hugging Face", "LangChain",
  "React Native", "Flutter", "Electron", "Tauri", "Expo",
  "Jest", "Cypress", "Vitest", "Playwright", "Mocha", "Chai",
  "JWT", "OAuth2", "Kafka", "RabbitMQ", "Prometheus", "Grafana",
  "Figma", "Unity", "Unreal Engine",
  "HTML", "CSS", "GraphQL", "Apollo", "Prisma", "Supabase", "Strapi",
  "Socket.IO", "WebSockets",
  "Nginx", "Apache", "Jenkins", "CircleCI", "GitLab CI", "Ansible",
  "DigitalOcean", "Vercel", "Netlify", "Railway",
  "PlanetScale", "CockroachDB", "MariaDB", "Neo4j", "Cassandra",
  "Hadoop", "Spark", "Pandas", "NumPy", "ScikitLearn",
  "OpenAI", "Claude AI", "Gemini AI", "Mistral AI", "LLaMA", "Ollama",
  "Stable Diffusion", "Midjourney",
  "Three.js", "WebGL", "PWA",
  "ESLint", "Prettier", "Zod", "Joi",
  "Webpack", "Parcel", "Rollup",
  "MVC", "MVVM", "Clean Architecture", "Hexagonal", "Onion Architecture",
  "SOLID", "DRY", "KISS", "YAGNI",
  "Design Patterns", "Singleton", "Factory", "Factory Method", "Observer",
  "Strategy", "Adapter", "Decorator", "Facade",
  "Repository", "ServiceLayer", "CQRS", "EventDriven", "Domain Driven Design",
  "MERN", "MEAN", "MEVN", "PERN", "JAMstack", "T3", "LAMP",
  "Serverless", "Microservices", "Monolith", "BFF",
  "Fullstack", "SSR", "CSR", "SSG", "Edge",
].sort();

const ALL_CATEGORIES = [
  "Frontend", "Backend", "DevOps", "IA / ML", "Vida", "Acontecimentos", "Outros",
];

const ADMIN_PASSWORD =
  (import.meta as any).env?.VITE_ADMIN_PASSWORD ?? "#NaoPrecisamosDeArmas00#";
const API_BASE = `${BASE_API}/api`;

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function estimateReadTime(text: string) {
  return Math.max(
    1,
    Math.ceil(text.split(/\s+/).filter(Boolean).length / 200)
  );
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Falha ao ler arquivo."));
    reader.readAsDataURL(file);
  });
}

// ─── TOAST ───────────────────────────────────────────────────────────────────

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: ToastType;
  onClose: () => void;
}) {
  return (
    <div className={`admin-toast admin-toast--${type}`}>
      <i
        className={`bx ${type === "success" ? "bx-check-circle" : "bx-x-circle"
          }`}
      />
      <span>{message}</span>
      <button onClick={onClose}>
        <i className="bx bx-x" />
      </button>
    </div>
  );
}

// ─── CONFIRM DIALOG ───────────────────────────────────────────────────────────

function ConfirmDialog({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="admin-dialog-overlay">
      <div className="admin-dialog">
        <i className="bx bx-trash admin-dialog__icon" />
        <h3>Deletar post?</h3>
        <p>Esta ação não pode ser desfeita.</p>
        <div className="admin-dialog__actions">
          <button className="btn-blog btn-blog--ghost" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn-blog btn-blog--danger" onClick={onConfirm}>
            <i className="bx bx-trash" /> Deletar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── TAG SELECTOR ─────────────────────────────────────────────────────────────

function TagSelector({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (t: string[]) => void;
}) {
  const [search, setSearch] = useState("");

  const options = ALL_TAGS.filter(
    (t) =>
      t.toLowerCase().includes(search.toLowerCase()) &&
      !selected.includes(t)
  ).slice(0, 14);

  return (
    <div className="admin-tag-selector">
      <div className="admin-tag-selector__selected">
        {selected.map((t) => (
          <span key={t} className="admin-tag-chip">
            {t}
            <button
              type="button"
              onClick={() => onChange(selected.filter((s) => s !== t))}
            >
              <i className="bx bx-x" />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        className="input-blog"
        placeholder="Buscar tecnologia..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <div className="admin-tag-selector__dropdown">
          {options.length === 0 ? (
            <span className="admin-tag-selector__empty">
              Nenhuma tag encontrada
            </span>
          ) : (
            options.map((t) => (
              <button
                key={t}
                type="button"
                className="admin-tag-selector__option"
                onClick={() => {
                  onChange([...selected, t]);
                  setSearch("");
                }}
              >
                {t}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ─── IMAGE FIELD ──────────────────────────────────────────────────────────────

interface ImageFieldProps {
  base64: string;
  url: string;
  onBase64Change: (v: string) => void;
  onUrlChange: (v: string) => void;
}

function ImageField({
  base64,
  url,
  onBase64Change,
  onUrlChange,
}: ImageFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const preview = base64 || url;

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      alert("Imagem muito grande. Máximo: 8 MB.");
      return;
    }
    const b64 = await fileToBase64(file);
    onBase64Change(b64);
    onUrlChange("");
  }

  function handleUrl(e: React.ChangeEvent<HTMLInputElement>) {
    onUrlChange(e.target.value);
    onBase64Change("");
  }

  function remove() {
    onBase64Change("");
    onUrlChange("");
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="admin-image-area">
      {preview && (
        <div className="admin-image-preview">
          <img src={preview} alt="Preview da capa" />
          <button
            type="button"
            className="admin-image-remove"
            onClick={remove}
          >
            <i className="bx bx-trash" /> Remover
          </button>
        </div>
      )}
      <div className="admin-image-inputs">
        <input
          type="url"
          className="input-blog"
          placeholder="URL da imagem (https://...)"
          value={url}
          onChange={handleUrl}
          disabled={!!base64}
        />
        <span className="admin-image-separator">ou</span>
        <button
          type="button"
          className="btn-blog btn-blog--sm btn-blog--ghost"
          onClick={() => fileRef.current?.click()}
          disabled={!!url}
        >
          <i className="bx bx-upload" /> Upload
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          style={{ display: "none" }}
          onChange={handleFile}
        />
      </div>
      {base64 && (
        <small className="admin-hint">
          <i className="bx bx-check-circle" style={{ color: "#22c55e" }} />{" "}
          Imagem carregada como arquivo — será salva como base64.
        </small>
      )}
      {url && (
        <small className="admin-hint">
          <i className="bx bx-link" style={{ color: "#00ffff" }} /> URL externa
          — salva diretamente.
        </small>
      )}
    </div>
  );
}

// ─── MARKDOWN EDITOR FIELD ───────────────────────────────────────────────────
// Wrapper do @uiw/react-md-editor com dark theme e controles de visualização

type EditorMode = "edit" | "preview" | "live";

function MarkdownEditorField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [mode, setMode] = useState<EditorMode>("live");
  const readTime = estimateReadTime(value);

  return (
    <div className="admin-md-wrapper" data-color-mode="dark">
      {/* Toolbar extra acima do editor */}
      <div className="admin-md-toolbar">
        <div className="admin-md-toolbar__modes">
          <button
            type="button"
            className={`admin-md-mode-btn${mode === "edit" ? " active" : ""}`}
            onClick={() => setMode("edit")}
            title="Apenas editor"
          >
            <i className="bx bx-code-alt" />
            <span>Editar</span>
          </button>
          <button
            type="button"
            className={`admin-md-mode-btn${mode === "live" ? " active" : ""}`}
            onClick={() => setMode("live")}
            title="Editor + Preview lado a lado"
          >
            <i className="bx bx-layout" />
            <span>Split</span>
          </button>
          <button
            type="button"
            className={`admin-md-mode-btn${mode === "preview" ? " active" : ""}`}
            onClick={() => setMode("preview")}
            title="Apenas preview"
          >
            <i className="bx bx-show" />
            <span>Preview</span>
          </button>
        </div>
        <div className="admin-md-toolbar__info">
          <span>
            <i className="bx bx-time-five" /> ~{readTime} min
          </span>
          <span>
            <i className="bx bx-text" />{" "}
            {value.split(/\s+/).filter(Boolean).length} palavras
          </span>
        </div>
      </div>

      {/* Editor */}
      <MDEditor
        value={value}
        onChange={(v) => onChange(v ?? "")}
        preview={mode}
        height={480}
        visibleDragbar={false}
        // Oculta a toolbar interna de modo — usamos a nossa
        hideToolbar={false}
        data-color-mode="dark"
        style={{
          background: "#161616",
          borderRadius: "5px",
          border: "1px solid #2e2e2e",
        }}
      />

      <small className="admin-hint" style={{ marginTop: "0.4rem" }}>
        Suporta <strong>Markdown completo</strong> — headers, listas, código,
        tabelas, links, imagens e muito mais.
      </small>
    </div>
  );
}

// ─── POST FORM ────────────────────────────────────────────────────────────────

interface PostFormProps {
  initial?: Partial<Post>;
  onSave: (data: Omit<Post, "id" | "createdAt">) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

function PostForm({ initial, onSave, onCancel, saving }: PostFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [base64, setBase64] = useState(initial?.imageBase64 ?? "");
  const [imgUrl, setImgUrl] = useState(initial?.imageUrl ?? "");
  const [tags, setTags] = useState<string[]>(initial?.tags ?? []);
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [category, setCategory] = useState(
    initial?.category ?? ALL_CATEGORIES[0]
  );

  // Controla qual seção está aberta no accordion mobile
  const [openSection, setOpenSection] = useState<string>("conteudo");

  function toggleSection(s: string) {
    setOpenSection((prev) => (prev === s ? "" : s));
  }

  async function handleSubmit() {
    if (!title.trim()) return;
    await onSave({
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      imageBase64: base64 || null,
      imageUrl: imgUrl.trim() || null,
      tags,
      featured,
      category,
      readTime: estimateReadTime(content || excerpt),
    });
  }

  return (
    <div className="admin-form">
      {/* ── Seção: Informações básicas ── */}
      <div className="admin-form-section">
        <button
          type="button"
          className="admin-form-section__toggle"
          onClick={() => toggleSection("info")}
        >
          <span>
            <i className="bx bx-info-circle" /> Informações básicas
          </span>
          <i
            className={`bx bx-chevron-${openSection === "info" ? "up" : "down"}`}
          />
        </button>

        {openSection === "info" && (
          <div className="admin-form-section__body">
            {/* Título */}
            <div className="admin-form-field admin-form-field--full">
              <label className="admin-label">Título *</label>
              <input
                type="text"
                className={`input-blog${!title.trim() ? " input-blog--error" : ""}`}
                placeholder="Título do post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {!title.trim() && (
                <small className="admin-hint admin-hint--error">
                  <i className="bx bx-error-circle" /> Título é obrigatório
                </small>
              )}
            </div>

            {/* Categoria */}
            <div className="admin-form-field admin-form-field--full">
              <label className="admin-label">Categoria</label>
              <select
                className="input-blog"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {ALL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Resumo */}
            <div className="admin-form-field admin-form-field--full">
              <label className="admin-label">
                Resumo (excerpt){" "}
                <span className="admin-label__hint">
                  — aparece nos cards da listagem
                </span>
              </label>
              <textarea
                className="textarea-blog"
                placeholder="Breve descrição que aparece nos cards..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
              />
              <small className="admin-hint">
                {excerpt.length}/1000 caracteres
              </small>
            </div>

            {/* Featured toggle */}
            <div className="admin-form-field admin-form-field--full">
              <label className="admin-toggle">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                <span className="admin-toggle__track" />
                <span className="admin-toggle__label">
                  <i className="bx bxs-star" /> Destacar este post (aparece no
                  topo da listagem)
                </span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* ── Seção: Conteúdo Markdown ── */}
      <div className="admin-form-section admin-form-section--highlight">
        <button
          type="button"
          className="admin-form-section__toggle"
          onClick={() => toggleSection("conteudo")}
        >
          <span>
            <i className="bx bx-code-block" /> Conteúdo (Markdown)
          </span>
          <i
            className={`bx bx-chevron-${openSection === "conteudo" ? "up" : "down"
              }`}
          />
        </button>

        {openSection === "conteudo" && (
          <div className="admin-form-section__body">
            <MarkdownEditorField value={content} onChange={setContent} />
          </div>
        )}
      </div>

      {/* ── Seção: Imagem ── */}
      <div className="admin-form-section">
        <button
          type="button"
          className="admin-form-section__toggle"
          onClick={() => toggleSection("imagem")}
        >
          <span>
            <i className="bx bx-image" /> Imagem de capa
          </span>
          <i
            className={`bx bx-chevron-${openSection === "imagem" ? "up" : "down"
              }`}
          />
        </button>

        {openSection === "imagem" && (
          <div className="admin-form-section__body">
            <ImageField
              base64={base64}
              url={imgUrl}
              onBase64Change={setBase64}
              onUrlChange={setImgUrl}
            />
          </div>
        )}
      </div>

      {/* ── Seção: Tags ── */}
      <div className="admin-form-section">
        <button
          type="button"
          className="admin-form-section__toggle"
          onClick={() => toggleSection("tags")}
        >
          <span>
            <i className="bx bx-purchase-tag-alt" /> Tags de tecnologia
            {tags.length > 0 && (
              <span className="admin-section-badge">{tags.length}</span>
            )}
          </span>
          <i
            className={`bx bx-chevron-${openSection === "tags" ? "up" : "down"
              }`}
          />
        </button>

        {openSection === "tags" && (
          <div className="admin-form-section__body">
            <TagSelector selected={tags} onChange={setTags} />
            <small className="admin-hint">
              Deixe vazio para posts não-técnicos (Vida, Acontecimentos...).
            </small>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="admin-form-actions">
        <button
          type="button"
          className="btn-blog btn-blog--ghost"
          onClick={onCancel}
        >
          <i className="bx bx-x" /> Cancelar
        </button>
        <button
          type="button"
          className="btn-blog"
          onClick={handleSubmit}
          disabled={saving || !title.trim()}
        >
          <i
            className={`bx ${saving ? "bx-loader-alt bx-spin" : "bx-save"}`}
          />
          {saving ? "Salvando..." : "Salvar post"}
        </button>
      </div>
    </div>
  );
}

// ─── BLOG ADMIN MAIN ──────────────────────────────────────────────────────────

export default function BlogAdmin() {
  const [authed, setAuthed] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [passError, setPassError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  function showToast(message: string, type: ToastType = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }

  // ── Auth ──

  async function handleLogin() {
    if (passInput === ADMIN_PASSWORD) {
      setAuthed(true);
      setPassError(false);
      await loadPosts();
    } else {
      try {
        const res = await fetch(`${API_BASE}/admin/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: passInput }),
        });
        if (res.ok) {
          setAuthed(true);
          setPassError(false);
          await loadPosts();
        } else {
          setPassError(true);
        }
      } catch {
        setPassError(true);
      }
    }
  }

  // ── API ──

  async function loadPosts() {
    try {
      const res = await fetch(`${API_BASE}/posts?limit=50`);
      const d = await res.json();
      setPosts(d.data ?? []);
    } catch {
      showToast("Erro ao carregar posts.", "error");
    }
  }

  async function handleSave(data: Omit<Post, "id" | "createdAt">) {
    setSaving(true);
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "X-Admin-Password": passInput,
      };

      if (view === "create") {
        const res = await fetch(`${API_BASE}/posts`, {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        });
        const newPost = await res.json();
        setPosts((prev) => [newPost, ...prev]);
        showToast("Post criado com sucesso!");
      } else if (view === "edit" && editingPost) {
        const res = await fetch(`${API_BASE}/posts/${editingPost.id}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(data),
        });
        const updated = await res.json();
        setPosts((prev) =>
          prev.map((p) => (p.id === editingPost.id ? updated : p))
        );
        showToast("Post atualizado!");
      }
    } catch {
      showToast("Erro ao salvar post.", "error");
    } finally {
      setSaving(false);
      setView("list");
      setEditingPost(null);
    }
  }

  async function handleDelete(id: string) {
    try {
      await fetch(`${API_BASE}/posts/${id}`, {
        method: "DELETE",
        headers: { "X-Admin-Password": passInput },
      });
      setPosts((prev) => prev.filter((p) => p.id !== id));
      showToast("Post deletado.", "error");
    } catch {
      showToast("Erro ao deletar post.", "error");
    } finally {
      setDeletingId(null);
    }
  }

  // ── Tela de login ──

  if (!authed) {
    return (
      <section className="groupBlogAdmin" id="blog-admin">
        <link
          rel="stylesheet"
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        />
        <div className="blog-admin">
          <div className="admin-login-wrapper">
            <div className="admin-login-card">
              <div className="admin-login-card__logo">
                ‹ Jeff <span className="slash">⁄</span> Admin ›
              </div>
              <h2>Área administrativa</h2>
              <p>Acesso restrito ao gerenciamento do blog.</p>

              <div className="admin-login-card__form">
                <div
                  className={`admin-login-card__field${passError ? " admin-login-card__field--error" : ""
                    }`}
                >
                  <i className="bx bx-lock" />
                  <input
                    type="password"
                    placeholder="Senha de acesso"
                    value={passInput}
                    onChange={(e) => {
                      setPassInput(e.target.value);
                      setPassError(false);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    autoFocus
                  />
                </div>
                {passError && (
                  <span className="admin-login-card__error">
                    <i className="bx bx-error-circle" /> Senha incorreta.
                  </span>
                )}
                <button className="btn-blog btn-blog--full" onClick={handleLogin}>
                  <i className="bx bx-log-in" /> Entrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Painel principal ──

  return (
    <section className="groupBlogAdmin" id="blog-admin">
      <link
        rel="stylesheet"
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {deletingId && (
        <ConfirmDialog
          onConfirm={() => handleDelete(deletingId)}
          onCancel={() => setDeletingId(null)}
        />
      )}

      <div className="blog-admin">
        {/* Header */}
        <div className="admin-header">
          <div className="admin-header__left">
            <h2 className="titleBlogAdmin">Blog Admin</h2>
            <span className="admin-badge">
              <i className="bx bx-file" /> {posts.length} posts
            </span>
          </div>
          <div className="admin-header__right">
            {view === "list" ? (
              <button className="btn-blog" onClick={() => setView("create")}>
                <i className="bx bx-plus" /> Novo post
              </button>
            ) : (
              <button
                className="btn-blog btn-blog--ghost"
                onClick={() => {
                  setView("list");
                  setEditingPost(null);
                }}
              >
                <i className="bx bx-arrow-back" /> Voltar
              </button>
            )}
            <button
              className="btn-blog btn-blog--ghost"
              onClick={() => {
                setAuthed(false);
                setPosts([]);
              }}
              title="Sair"
            >
              <i className="bx bx-log-out" />
            </button>
          </div>
        </div>

        {/* Formulário */}
        {(view === "create" || view === "edit") && (
          <div className="admin-panel">
            <h3 className="admin-panel-title">
              <i className={`bx bx-${view === "create" ? "plus" : "edit"}`} />
              {view === "create" ? "Novo post" : "Editar post"}
            </h3>
            <PostForm
              initial={editingPost ?? undefined}
              onSave={handleSave}
              onCancel={() => {
                setView("list");
                setEditingPost(null);
              }}
              saving={saving}
            />
          </div>
        )}

        {/* Lista */}
        {view === "list" && (
          <div className="admin-panel">
            {posts.length === 0 ? (
              <div className="admin-empty">
                <i className="bx bx-file-blank" />
                <p>Nenhum post ainda.</p>
                <button className="btn-blog" onClick={() => setView("create")}>
                  <i className="bx bx-plus" /> Criar primeiro post
                </button>
              </div>
            ) : (
              <div className="admin-posts-list">
                {posts.map((post) => {
                  const thumb = post.imageBase64 || post.imageUrl;
                  return (
                    <div key={post.id} className="admin-post-row">
                      {thumb && (
                        <div className="admin-post-row__thumb">
                          <img src={thumb} alt={post.title} />
                        </div>
                      )}
                      <div className="admin-post-row__info">
                        <div className="admin-post-row__title-row">
                          <h4>{post.title}</h4>
                          {post.featured && (
                            <span className="admin-featured-badge">
                              <i className="bx bxs-star" /> Destaque
                            </span>
                          )}
                          {post.category && (
                            <span className="admin-tag-sm">
                              {post.category}
                            </span>
                          )}
                        </div>
                        <p className="admin-post-row__excerpt">
                          {post.excerpt}
                        </p>
                        <div className="admin-post-row__meta">
                          <span>
                            <i className="bx bx-calendar" />
                            {formatDate(post.createdAt)}
                          </span>
                          <span>
                            <i className="bx bx-time-five" />
                            {post.readTime} min
                          </span>
                          <span>
                            <i className="bx bx-image" />
                            {post.imageBase64
                              ? "Base64"
                              : post.imageUrl
                                ? "URL"
                                : "Sem imagem"}
                          </span>
                          <span>
                            <i className="bx bx-text" />
                            {post.content
                              ? `${post.content.split(/\s+/).filter(Boolean).length} palavras`
                              : "Sem conteúdo"}
                          </span>
                        </div>
                        {post.tags.length > 0 && (
                          <div className="admin-post-row__tags">
                            {post.tags.slice(0, 5).map((t) => (
                              <span key={t} className="admin-tag-sm">
                                {t}
                              </span>
                            ))}
                            {post.tags.length > 5 && (
                              <span className="admin-tag-sm admin-tag-sm--more">
                                +{post.tags.length - 5}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="admin-post-row__actions">
                        <button
                          className="admin-icon-btn admin-icon-btn--edit"
                          title="Editar"
                          onClick={() => {
                            setEditingPost(post);
                            setView("edit");
                          }}
                        >
                          <i className="bx bx-edit" />
                        </button>
                        <button
                          className="admin-icon-btn admin-icon-btn--delete"
                          title="Deletar"
                          onClick={() => setDeletingId(post.id)}
                        >
                          <i className="bx bx-trash" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}