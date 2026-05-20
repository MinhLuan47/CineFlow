import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, X, Star, Loader2 } from "lucide-react";
import { useSearch } from "../hooks/useSearch";
import type { NormalizedMovie, NormalizedTvSeries } from "../types/api";
import { Badge } from "./ui";

interface GlobalSearchProps {
  variant: "desktop" | "mobile";
  onResultClick?: () => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  variant,
  onResultClick,
}) => {
  const { query, setQuery, results, loading, clearSearch } = useSearch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Tự động đóng dropdown kết quả tìm kiếm trên Desktop khi click chuột ra ngoài
  useEffect(() => {
    if (variant !== "desktop") return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [variant]);

  const handleClear = () => {
    clearSearch();
    setIsDropdownOpen(false);
  };

  const handleItemClick = () => {
    setIsDropdownOpen(false);
    clearSearch();
    if (onResultClick) {
      onResultClick();
    }
  };

  if (variant === "mobile") {
    return (
      <div className="flex flex-col gap-4 w-full">
        {/* Thanh tìm kiếm trên Mobile */}
        <div className="relative mt-4">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/60">
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm phim..."
            className="w-full bg-surface border border-themeBorder/80 text-xs text-text placeholder:text-muted/50 pl-10 pr-9 py-3 focus:outline-none focus:border-primary focus:bg-card transition-all rounded-sharp"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text p-0.5"
              aria-label="Xoá tìm kiếm"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Danh sách kết quả tìm kiếm trên Mobile */}
        {query.trim().length >= 2 && (
          <div className="bg-card border border-themeBorder/40 rounded-sharp p-2 max-h-60 overflow-y-auto">
            {loading && results.length === 0 && (
              <div className="py-6 flex items-center justify-center text-muted gap-2 text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span>Đang tìm kiếm...</span>
              </div>
            )}

            {!loading && results.length === 0 && (
              <div className="py-6 text-center text-muted text-xs">
                Không tìm thấy kết quả nào.
              </div>
            )}

            {results.map((item) => {
              const isMovie = item.mediaType === "movie";
              const isTv = item.mediaType === "tv";
              const isPerson = item.mediaType === "person";
              const title = isMovie
                ? item.title
                : (item as any).title || item.name || "";
              const originalTitle = isMovie
                ? item.originalTitle
                : (item as any).originalTitle || item.originalName || "";
              const poster = isPerson
                ? item.profileUrl ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"
                : (item as NormalizedMovie | NormalizedTvSeries).posterUrl ||
                  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&auto=format&fit=crop&q=80";

              const detailLink = isMovie
                ? `/movie/${item.id}`
                : `/tv/${item.id}`;

              return (
                <Link
                  key={item.id}
                  to={isPerson ? "#" : detailLink}
                  className="flex items-center gap-3 p-2 border-b border-themeBorder/20 last:border-0 rounded-sharp cursor-pointer hover:bg-surface/80"
                  onClick={handleItemClick}
                >
                  <div className="w-7 h-10 bg-themeBorder rounded-sharp overflow-hidden flex-shrink-0">
                    <img
                      src={poster}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-text truncate">
                      {title}
                    </h4>
                    <span className="text-[10px] text-muted truncate block">
                      {originalTitle}{" "}
                      {!isPerson &&
                        `(${(item as NormalizedMovie | NormalizedTvSeries).year})`}
                    </span>
                  </div>
                  <span className="text-[8px] font-black uppercase text-gold bg-gold/10 px-1 py-0.5 rounded-sharp">
                    {isMovie ? "Phim lẻ" : isTv ? "Phim bộ" : "Diễn viên"}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Desktop version
  return (
    <div
      ref={searchRef}
      className="hidden md:block relative w-48 lg:w-64 xl:w-72 z-50"
    >
      <div className="relative">
        <span className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-muted/60">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
          ) : (
            <Search className="w-4 h-4 border-primary" />
          )}
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder="Tìm kiếm phim..."
          className="w-full border border-themeBorder/80 text-xs text-text placeholder:text-muted/50 pl-9 pr-8 py-2.5 focus:outline-none focus:border-primary bg-card transition-all rounded-sharp backdrop-blur-md"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-text p-0.5 hover:bg-themeBorder/40 transition-colors rounded-full"
            aria-label="Xoá tìm kiếm"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Panel kết quả tìm kiếm dạng Dropdown */}
      {isDropdownOpen && query.trim().length >= 2 && (
        <div className="absolute top-full right-0 left-0 mt-2 bg-card border border-themeBorder rounded-sharp shadow-2xl p-2 max-h-96 overflow-y-auto z-50 scrollbar-thin">
          {loading && results.length === 0 && (
            <div className="py-8 flex flex-col items-center justify-center text-muted gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="text-[11px]">Đang tìm kiếm...</span>
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="py-8 text-center text-muted text-xs">
              Không tìm thấy phim nào cho "{query}"
            </div>
          )}

          {results.map((item) => {
            const isMovie = item.mediaType === "movie";
            const isTv = item.mediaType === "tv";
            const isPerson = item.mediaType === "person";
            const title = isMovie
              ? item.title
              : (item as any).title || item.name || "";
            const originalTitle = isMovie
              ? item.originalTitle
              : (item as any).originalTitle || item.originalName || "";
            const poster = isPerson
              ? item.profileUrl ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"
              : (item as NormalizedMovie | NormalizedTvSeries).posterUrl ||
                "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&auto=format&fit=crop&q=80";
            const rating = isPerson
              ? 0
              : (item as NormalizedMovie | NormalizedTvSeries).voteAverage;
            const year = isPerson
              ? null
              : (item as NormalizedMovie | NormalizedTvSeries).year;

            const detailLink = isMovie ? `/movie/${item.id}` : `/tv/${item.id}`;

            return (
              <Link
                key={item.id}
                to={isPerson ? "#" : detailLink}
                className="flex items-center gap-3 p-2 hover:bg-surface border-b border-themeBorder/20 last:border-0 rounded-sharp cursor-pointer group transition-colors duration-200"
                onClick={handleItemClick}
              >
                {/* Poster nhỏ */}
                <div className="w-8 h-11 bg-themeBorder rounded-sharp overflow-hidden flex-shrink-0 relative border border-themeBorder/40">
                  <img
                    src={poster}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Chi tiết phim */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-text group-hover:text-primary transition-colors line-clamp-1">
                    {title}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-muted">
                    <span className="line-clamp-1 max-w-[110px]">
                      {originalTitle}
                    </span>
                    <span>•</span>
                    <span>{year}</span>
                  </div>
                </div>
                {/* Rating và Loại phim */}
                <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                  {!isPerson && (
                    <div className="flex items-center gap-0.5 text-[10px] font-black text-gold">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      <span>{rating.toFixed(1)}</span>
                    </div>
                  )}
                  <Badge
                    variant={isMovie ? "primary" : isTv ? "gold" : "muted"}
                    size="sm"
                    className="text-[8px]"
                  >
                    {isMovie ? "Phim lẻ" : isTv ? "Phim bộ" : "Diễn viên"}
                  </Badge>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
