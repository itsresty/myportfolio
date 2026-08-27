function getYouTubeEmbedUrl(source: string): string | null {
  try {
    const url = new URL(source);
    let id = "";
    if (url.hostname === "youtu.be") id = url.pathname.slice(1);
    if (url.hostname.endsWith("youtube.com")) {
      id = url.searchParams.get("v") ?? url.pathname.split("/").filter(Boolean).pop() ?? "";
    }
    return /^[A-Za-z0-9_-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

export default function VideoEmbed({ source, title }: { source?: string; title: string }) {
  if (!source) return null;
  const youtubeUrl = getYouTubeEmbedUrl(source);

  return (
    <section className="mt-12">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">Video</p>
      <div className="aspect-video overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950">
        {youtubeUrl ? (
          <iframe className="h-full w-full" src={youtubeUrl} title={`${title} video`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        ) : source.startsWith("/uploads/videos/") ? (
          <video className="h-full w-full" controls preload="metadata"><source src={source} />Your browser does not support video playback.</video>
        ) : null}
      </div>
    </section>
  );
}
