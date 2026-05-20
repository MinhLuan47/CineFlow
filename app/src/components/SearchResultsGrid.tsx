import React from "react";
import { Link } from "react-router-dom";
import { MovieCard } from "./MovieCard";
import { EmptyState } from "./ui/EmptyState";
import { mapNormalizedToMovie } from "../utils/movieMapper";
import type { SearchResult, NormalizedMovie, NormalizedTvSeries } from "../types/api";

interface SearchResultsGridProps {
  filteredResults: SearchResult[];
}

export const SearchResultsGrid: React.FC<SearchResultsGridProps> = ({
  filteredResults,
}) => {
  if (filteredResults.length === 0) {
    return (
      <div className="py-20">
        <EmptyState message="Không tìm thấy kết quả nào thuộc loại bộ lọc được chọn." />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {filteredResults.map((item) => {
        const isMovie = item.mediaType === "movie";
        const isPerson = item.mediaType === "person";

        // Xử lý hiển thị thẻ diễn viên (Person) chuyên dụng
        if (isPerson) {
          return (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center p-6 bg-surface/40 border border-themeBorder/40 rounded-sharp text-center hover:border-gold/30 hover:scale-[1.02] transition-all duration-300 group shadow-lg"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-themeBorder mb-4 shadow-md border border-white/5 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={
                    item.profileUrl ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"
                  }
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-black text-text truncate w-full group-hover:text-gold transition-colors">
                {item.name}
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest text-muted mt-1 bg-surface border border-themeBorder px-2 py-0.5 rounded-sharp">
                Diễn viên
              </span>
            </div>
          );
        }

        // Xử lý hiển thị thẻ Phim lẻ / Phim bộ dùng MovieCard
        const movieProp = mapNormalizedToMovie(
          item as NormalizedMovie | NormalizedTvSeries
        );
        const detailLink = isMovie ? `/movie/${item.id}` : `/tv/${item.id}`;

        return (
          <Link
            key={item.id}
            to={detailLink}
            className="block hover:-translate-y-1 transition-transform duration-300 relative group"
          >
            <MovieCard movie={movieProp} />
            {/* Nhãn phân loại loại hình phim đè lên góc */}
            <span className="absolute top-3 right-3 z-30 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sharp bg-black/75 backdrop-blur-sm border border-white/10 text-gold shadow-md">
              {isMovie ? "Phim Lẻ" : "Phim Bộ"}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
