"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ChevronDown,
  Eye,
  Grid3X3,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

/* ─── Video Data ─────────────────────────────────────────── */
const videos = [
  {
    id: 1,
    title: "Main Door Carving Process",
    description:
      "Watch our master artisans bring an intricate main door design to life, from raw timber to finished masterpiece.",
    src: "/Design/video1.mp4",
    thumbnail: "/Maindoor/door1.jpeg",
    tag: "Process",
    likes: 1243,
    views: 18420,
    comments: 87,
  },
  {
    id: 2,
    title: "Traditional Motif Techniques",
    description:
      "A close look at how traditional Nepali motifs are carved using time-honored chiseling techniques.",
    src: "/Design/video2.mp4",
    thumbnail: "/Maindoor/door4.jpg",
    tag: "Technique",
    likes: 982,
    views: 14300,
    comments: 54,
  },
  {
    id: 3,
    title: "Workshop Tour",
    description:
      "Take a virtual tour of our Bungamati workshop where heritage meets craftsmanship every day.",
    src: "/Design/video3.mp4",
    thumbnail: "/Maindoor/door7.jpg",
    tag: "Tour",
    likes: 2105,
    views: 32100,
    comments: 142,
  },
  {
    id: 4,
    title: "Relief Carving in Sal Wood",
    description:
      "Deep relief carving demonstration on premium Sal wood — the backbone of Nepali woodcraft.",
    src: "/Design/video4.mp4",
    thumbnail: "/Maindoor/door10.jpg",
    tag: "Technique",
    likes: 765,
    views: 9870,
    comments: 38,
  },
  {
    id: 5,
    title: "Finishing & Polishing",
    description:
      "The final steps: sanding, oiling, and polishing bring warmth and protect the wood for generations.",
    src: "/Design/video5.mp4",
    thumbnail: "/Maindoor/door13.jpg",
    tag: "Process",
    likes: 1567,
    views: 21800,
    comments: 96,
  },
  {
    id: 6,
    title: "Custom Order Creation",
    description:
      "From blueprint to delivery — see how a custom order goes through our entire production pipeline.",
    src: "/Design/video6.mp4",
    thumbnail: "/Maindoor/door16.jpg",
    tag: "Behind the Scenes",
    likes: 893,
    views: 11200,
    comments: 63,
  },
];

type VideoItem = (typeof videos)[0];

/* ─── Format number for display ──────────────────────────── */
function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

/* ─── Single Video Reel Card ─────────────────────────────── */
function VideoReel({
  video,
  isActive,
}: {
  video: VideoItem;
  isActive: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const playIconTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-play when reel becomes active, pause when inactive
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (isActive) {
      el.play().catch(() => {});
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }, [isActive]);

  // Progress tracking
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onTime = () => {
      if (el.duration) setProgress((el.currentTime / el.duration) * 100);
    };
    el.addEventListener("timeupdate", onTime);
    return () => el.removeEventListener("timeupdate", onTime);
  }, []);

  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play().catch(() => {});
      setPlaying(true);
    }
    // Show play/pause icon briefly
    setShowPlayIcon(true);
    if (playIconTimeout.current) clearTimeout(playIconTimeout.current);
    playIconTimeout.current = setTimeout(() => setShowPlayIcon(false), 600);
  }, [playing]);

  const toggleMute = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !muted;
    setMuted(!muted);
  }, [muted]);

  const handleLike = useCallback(() => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  }, [liked]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  }, [video]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = videoRef.current;
    if (!el || !el.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    el.currentTime = pct * el.duration;
    setProgress(pct * 100);
  }, []);

  return (
    <div className="video-reel relative w-full h-full bg-black flex items-center justify-center select-none">
      {/* Video */}
      <video
        ref={videoRef}
        src={video.src}
        poster={video.thumbnail}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        onClick={togglePlay}
      />

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

      {/* Center play/pause flash icon */}
      {showPlayIcon && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center animate-[fadeOutScale_0.6s_ease-out_forwards]">
            {playing ? (
              <Play size={32} className="text-white ml-1" />
            ) : (
              <Pause size={32} className="text-white" />
            )}
          </div>
        </div>
      )}

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-white text-xs font-medium border border-white/10">
            {video.tag}
          </span>
          <span className="flex items-center gap-1 text-white/70 text-xs">
            <Eye size={12} /> {formatCount(video.views)}
          </span>
        </div>
        <button
          onClick={toggleMute}
          className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 transition-colors border border-white/10"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {/* Right side actions (TikTok-style) */}
      <div className="absolute right-3 bottom-40 sm:bottom-44 flex flex-col items-center gap-5 z-10">
        {/* Like */}
        <button
          onClick={handleLike}
          className="flex flex-col items-center gap-1 group"
        >
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              liked
                ? "bg-temple-500 text-white scale-110"
                : "bg-white/15 backdrop-blur-md text-white hover:bg-white/25 border border-white/10"
            }`}
          >
            <Heart size={20} className={liked ? "fill-white" : ""} />
          </div>
          <span className="text-white text-[10px] font-medium">
            {formatCount(likeCount)}
          </span>
        </button>

        {/* Comments */}
        <button className="flex flex-col items-center gap-1 group">
          <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 transition-colors border border-white/10">
            <MessageCircle size={20} />
          </div>
          <span className="text-white text-[10px] font-medium">
            {formatCount(video.comments)}
          </span>
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 transition-colors border border-white/10">
            <Share2 size={20} />
          </div>
          <span className="text-white text-[10px] font-medium">Share</span>
        </button>

        {/* Bookmark */}
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className="flex flex-col items-center gap-1 group"
        >
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              bookmarked
                ? "bg-gold-500 text-white"
                : "bg-white/15 backdrop-blur-md text-white hover:bg-white/25 border border-white/10"
            }`}
          >
            <Bookmark size={20} className={bookmarked ? "fill-white" : ""} />
          </div>
          <span className="text-white text-[10px] font-medium">Save</span>
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-16 z-10 px-4 pb-5">
        {/* Creator info */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-temple-500 flex items-center justify-center text-white text-sm font-bold border-2 border-white/30">
            ॐ
          </div>
          <div>
            <span className="text-white text-sm font-semibold">
              Om Wood Carving
            </span>
            <span className="text-white/50 text-xs ml-2">@omwoodcarving</span>
          </div>
        </div>

        {/* Video title & description */}
        <h3 className="text-white text-base font-bold mb-1 font-[family-name:var(--font-playfair)] drop-shadow-lg leading-tight">
          {video.title}
        </h3>
        <p className="text-white/75 text-xs leading-relaxed line-clamp-2 max-w-[85%]">
          {video.description}
        </p>

        {/* Tags */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-gold-300 text-xs">#woodcarving</span>
          <span className="text-gold-300 text-xs">#handmade</span>
          <span className="text-gold-300 text-xs">#nepal</span>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 cursor-pointer z-20"
        onClick={handleSeek}
      >
        <div
          className="h-full bg-gradient-to-r from-gold-400 to-temple-500 transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Share toast */}
      {showShareToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20 animate-[fadeIn_0.3s_ease-out]">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
}

/* ─── Gallery Grid View ──────────────────────────────────── */
function VideoGrid({
  onSelectVideo,
}: {
  onSelectVideo: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2">
      {videos.map((video, idx) => (
        <button
          key={video.id}
          onClick={() => onSelectVideo(idx)}
          className="relative aspect-[9/16] sm:aspect-[9/14] overflow-hidden rounded-lg group"
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
              <Play size={20} className="text-white ml-0.5" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-white text-xs font-semibold line-clamp-2 leading-tight mb-1">
              {video.title}
            </p>
            <div className="flex items-center gap-2 text-white/60 text-[10px]">
              <span className="flex items-center gap-0.5">
                <Eye size={10} /> {formatCount(video.views)}
              </span>
              <span className="flex items-center gap-0.5">
                <Heart size={10} /> {formatCount(video.likes)}
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function VideoPage() {
  const [view, setView] = useState<"reel" | "grid">("reel");
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track which reel is in view using IntersectionObserver
  useEffect(() => {
    if (view !== "reel") return;
    const container = containerRef.current;
    if (!container) return;

    const reels = container.querySelectorAll(".video-reel");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(reels).indexOf(entry.target as Element);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.6 },
    );

    reels.forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, [view]);

  const scrollToVideo = useCallback((index: number) => {
    setView("reel");
    // Allow state update + render, then scroll
    setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;
      const reels = container.querySelectorAll(".video-reel");
      if (reels[index]) {
        reels[index].scrollIntoView({ behavior: "instant" });
        setActiveIndex(index);
      }
    }, 50);
  }, []);

  return (
    <div className="fixed inset-0 z-30 bg-black flex flex-col">
      {/* Top navigation bar */}
      <div className="absolute top-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium hidden sm:inline">Home</span>
        </Link>

        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full p-0.5 border border-white/10">
          <button
            onClick={() => setView("reel")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              view === "reel"
                ? "bg-white text-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            Reels
          </button>
          <button
            onClick={() => setView("grid")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              view === "grid"
                ? "bg-white text-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Grid3X3 size={14} className="inline mr-1" />
            Grid
          </button>
        </div>

        <Link
          href="/shop"
          className="px-3 py-1.5 bg-gold-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full hover:bg-gold-500 transition-colors"
        >
          Shop Now
        </Link>
      </div>

      {/* Reel View */}
      {view === "reel" && (
        <>
          <div
            ref={containerRef}
            className="flex-1 overflow-y-scroll snap-y snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: "none" }}
          >
            {videos.map((video, idx) => (
              <div
                key={video.id}
                className="w-full h-full snap-start snap-always flex-shrink-0"
                style={{ minHeight: "100%" }}
              >
                <VideoReel video={video} isActive={idx === activeIndex} />
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-30">
            {videos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const container = containerRef.current;
                  if (!container) return;
                  const reels = container.querySelectorAll(".video-reel");
                  reels[idx]?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`w-1.5 rounded-full transition-all ${
                  idx === activeIndex
                    ? "h-6 bg-white"
                    : "h-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          {/* Scroll hint on first slide */}
          {activeIndex === 0 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/50 animate-bounce">
              <ChevronDown size={20} />
              <span className="text-[10px] mt-0.5">Scroll for more</span>
            </div>
          )}

          {/* Video counter */}
          <div className="absolute bottom-3 left-4 z-20 text-white/40 text-xs font-mono">
            {activeIndex + 1} / {videos.length}
          </div>
        </>
      )}

      {/* Grid View */}
      {view === "grid" && (
        <div className="flex-1 overflow-y-auto pt-16 pb-8 px-3 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-white text-lg font-bold font-[family-name:var(--font-playfair)]">
                  Workshop Films
                </h2>
                <p className="text-white/50 text-xs mt-0.5">
                  {videos.length} videos
                </p>
              </div>
            </div>
            <VideoGrid onSelectVideo={scrollToVideo} />
          </div>
        </div>
      )}
    </div>
  );
}
