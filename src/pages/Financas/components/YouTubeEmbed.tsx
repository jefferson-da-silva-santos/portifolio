// pages/Financas/components/YouTubeEmbed.tsx
// Player do YouTube incorporado, responsivo (mantém proporção 16:9 em qualquer largura).

type Props = {
  videoId: string;
  title: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
};

export function YouTubeEmbed({ videoId, title, autoPlay = false, muted = false, loop = false }: Props) {
  const params = new URLSearchParams({
    ...(autoPlay ? { autoplay: "1" } : {}),
    ...(muted ? { mute: "1" } : {}),
    ...(loop ? { loop: "1", playlist: videoId } : {}),
  });
  const query = params.toString();
  const src = `https://www.youtube.com/embed/${videoId}${query ? `?${query}` : ""}`;

  return (
    <div className="fin-video-wrap">
      <iframe
        src={src}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}