import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Star, Loader2 } from "lucide-react";
import { useSearch } from "../hooks/useSearch";
import type { NormalizedMovie, NormalizedTvSeries } from "../types/api";

/**
 * SearchPage - Trang tìm kiếm phim điện ảnh & phim truyền hình nâng cao.
 */
export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";

  const { query, setQuery, results, loading, error } = useSearch(queryParam);

  // Đồng bộ hóa từ khóa tìm kiếm khi query thay đổi
  useEffect(() => {
    if (query !== queryParam) {
      const delayDebounceFn = setTimeout(() => {
        setSearchParams(query ? { query } : {});
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [query, setSearchParams, queryParam]);

  return (
    <div className="container-custom py-10 min-h-[60vh]">
      {/* Tiêu đề & Hộp tìm kiếm */}
      <div className="max-w-xl mx-auto mb-12 text-center">
        <h1 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight text-text mb-4">
          TÌM KIẾM <span className="text-primary">ĐIỆN ẢNH</span>
        </h1>
        
        {/* Input Tìm kiếm lớn */}
        <div className="relative group">
          <input
            type="text"
            placeholder="Nhập tên phim, diễn viên hoặc từ khóa..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-surface border border-themeBorder focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm text-text rounded-sharp outline-none transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-primary transition-colors" />
        </div>
      </div>

      {/* Trạng thái hiển thị */}
      <div className="mt-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-muted gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="text-sm font-medium">Đang truy vấn phim từ rạp...</span>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-12 text-primary bg-primary/5 border border-primary/25 rounded-sharp">
            <p className="text-sm font-bold">Không thể kết nối đến máy chủ tìm kiếm</p>
            <p className="text-xs text-muted mt-1">Chi tiết lỗi: {error.message}</p>
          </div>
        )}

        {!loading && !error && query.trim().length >= 2 && results.length === 0 && (
          <div className="text-center py-20 text-muted">
            <p className="text-sm font-medium">Không tìm thấy phim nào khớp với từ khóa "{query}"</p>
            <p className="text-xs mt-1">Vui lòng thử từ khóa khác hoặc kiểm tra lại chính tả.</p>
          </div>
        )}

        {!loading && !error && query.trim().length < 2 && (
          <div className="text-center py-20 text-muted">
            <p className="text-sm font-medium">Vui lòng nhập tối thiểu 2 ký tự để tìm kiếm</p>
          </div>
        )}

        {/* Danh sách kết quả */}
        {!loading && !error && results.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-muted uppercase tracking-widest mb-6">
              Kết quả tìm kiếm ({results.length} phim)
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {results.map((item) => {
                const isMovie = item.mediaType === "movie";
                const isTv = item.mediaType === "tv";
                const isPerson = item.mediaType === "person";
                const title = isMovie ? item.title : item.name;
                const poster = isPerson 
                  ? (item.profileUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80")
                  : ((item as NormalizedMovie | NormalizedTvSeries).posterUrl || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&auto=format&fit=crop&q=80");
                const year = isPerson ? null : (item as NormalizedMovie | NormalizedTvSeries).year;
                const rating = isPerson ? 0 : (item as NormalizedMovie | NormalizedTvSeries).voteAverage;
                
                // Xác định đường dẫn chi tiết
                const detailLink = isMovie ? `/movie/${item.id}` : `/tv/${item.id}`;

                return (
                  <Link
                    key={item.id}
                    to={isPerson ? "#" : detailLink}
                    className={`group relative bg-surface border border-themeBorder rounded-sharp overflow-hidden transition-all duration-300 hover:border-primary hover:-translate-y-1 ${
                      isPerson ? "cursor-default pointer-events-none" : ""
                    }`}
                  >
                    <div className="aspect-[2/3] w-full bg-themeBorder relative overflow-hidden flex items-center justify-center">
                      <img 
                        src={poster} 
                        alt={title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                      
                      {/* Badge Loại hình */}
                      <span className="absolute top-2 right-2 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-sharp bg-black/60 backdrop-blur-sm border border-white/10 text-gold">
                        {isMovie ? "Phim lẻ" : isTv ? "Phim bộ" : "Diễn viên"}
                      </span>
                    </div>
                    
                    <div className="p-3">
                      <h3 className="font-bold text-xs text-text truncate group-hover:text-primary transition-colors">
                        {title}
                      </h3>
                      {!isPerson && (
                        <div className="flex items-center justify-between mt-2 text-[10px] text-muted">
                          <span>{year}</span>
                          <div className="flex items-center gap-0.5 text-gold">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            <span>{rating.toFixed(1)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
