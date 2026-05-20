import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Film, Tv, Users, ArrowLeft } from "lucide-react";
import { searchMulti } from "../services/searchApi";
import { MovieCard, LoadingState, ErrorState, EmptyState, Pagination } from "../components";
import type { Movie } from "../types/movie";
import type { NormalizedMovie, NormalizedTvSeries, SearchResult } from "../types/api";

/**
 * Hàm hỗ trợ chuyển đổi dữ liệu tìm kiếm Phim điện ảnh / Phim truyền hình đã chuẩn hóa
 * sang định dạng hiển thị cũ (Movie) để sử dụng với component MovieCard.
 */
const mapNormalizedToMovie = (normalized: NormalizedMovie | NormalizedTvSeries): Movie => {
  const isMovie = normalized.mediaType === "movie";
  const movieItem = normalized as NormalizedMovie;
  return {
    id: normalized.id,
    title: isMovie ? movieItem.title : (normalized as NormalizedTvSeries).name,
    originalTitle: isMovie ? movieItem.originalTitle : (normalized as NormalizedTvSeries).originalName,
    poster: normalized.posterUrl || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80",
    backdrop: normalized.backdropUrl || "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1600&auto=format&fit=crop&q=80",
    year: normalized.year || 2026,
    genre: normalized.genres.length > 0 ? normalized.genres : ["Đang cập nhật"],
    rating: normalized.voteAverage,
    duration: isMovie && movieItem.runtime
      ? `${Math.floor(movieItem.runtime / 60)}h ${movieItem.runtime % 60}m`
      : "Đang cập nhật",
    quality: isMovie ? movieItem.quality || "FHD" : "FHD",
    subtitle: isMovie && movieItem.subtitleLanguages && movieItem.subtitleLanguages.length > 0
      ? movieItem.subtitleLanguages[0]
      : "Vietsub",
    description: normalized.overview || "Chưa có tóm tắt nội dung.",
    views: normalized.voteCount * 123
  };
};

/**
 * SearchPage - Trang tìm kiếm phim điện ảnh & phim truyền hình nâng cao kết nối API Backend.
 */
export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  // 1. Trạng thái giao diện
  const [inputValue, setInputValue] = useState<string>(queryParam);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<"all" | "movie" | "tv" | "person">("all");

  // Đồng bộ hóa giá trị input cục bộ khi URL thay đổi (ví dụ: người dùng bấm tìm từ Header)
  useEffect(() => {
    setInputValue(queryParam);
  }, [queryParam]);

  // 2. Cơ chế Debounce: Tự động đổi URL sau 400ms khi dừng gõ phím
  useEffect(() => {
    const timer = setTimeout(() => {
      const cleanInput = inputValue.trim();
      const cleanQuery = queryParam.trim();
      if (cleanInput !== cleanQuery) {
        if (cleanInput.length >= 2) {
          setSearchParams({ query: cleanInput, page: "1" });
        } else if (cleanInput.length === 0) {
          setSearchParams({});
        }
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [inputValue, queryParam, setSearchParams]);

  // 3. Thực hiện gọi API tìm kiếm khi có thay đổi trên URL (queryParam, pageParam)
  const performSearch = useCallback(async () => {
    const cleanQuery = queryParam.trim();
    if (cleanQuery.length < 2) {
      setResults([]);
      setMeta(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await searchMulti(cleanQuery, pageParam);
      setResults(response.data);
      setMeta(response.meta);
    } catch (err: any) {
      console.error("Lỗi gọi API tìm kiếm từ server:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setResults([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  }, [queryParam, pageParam]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  // Xử lý nộp form tìm kiếm thủ công (nhấn Enter)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = inputValue.trim();
    if (cleanInput.length >= 2) {
      setSearchParams({ query: cleanInput, page: "1" });
    }
  };

  // Thay đổi trang phân trang
  const handlePageChange = (newPage: number) => {
    setSearchParams({ query: queryParam, page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 4. Lọc danh sách hiển thị phía Client dựa trên Tab được chọn
  const filteredResults = useMemo(() => {
    if (filter === "all") return results;
    return results.filter((item) => item.mediaType === filter);
  }, [results, filter]);

  const totalPages = meta?.totalPages || 1;

  // Tính số lượng cho từng tab lọc để hiển thị badge
  const counts = useMemo(() => {
    return {
      all: results.length,
      movie: results.filter((item) => item.mediaType === "movie").length,
      tv: results.filter((item) => item.mediaType === "tv").length,
      person: results.filter((item) => item.mediaType === "person").length
    };
  }, [results]);

  return (
    <div className="container-custom py-10 min-h-[65vh] text-left">
      
      {/* Quay lại Trang chủ */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors mb-6 font-bold uppercase tracking-wider"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Quay lại trang chủ</span>
      </Link>

      {/* 1. Header Tìm kiếm */}
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-text mb-6">
          TÌM KIẾM <span className="text-primary">ĐIỆN ẢNH</span>
        </h1>
        
        {/* Hộp tìm kiếm */}
        <form onSubmit={handleSubmit} className="relative group">
          <input
            type="text"
            placeholder="Nhập tên phim, đạo diễn hoặc diễn viên..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full h-14 pl-14 pr-24 bg-surface border border-themeBorder focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm text-text rounded-sharp outline-none transition-all shadow-xl font-medium"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5.5 h-5.5 text-muted group-focus-within:text-primary transition-colors" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-4 bg-primary hover:bg-primary/90 text-text font-black text-xs uppercase tracking-wider rounded-sharp transition-colors duration-300"
          >
            Tìm kiếm
          </button>
        </form>

        {queryParam.trim().length >= 2 && (
          <p className="text-xs text-muted mt-3 font-medium">
            Kết quả tìm kiếm cho từ khóa: <span className="text-primary font-bold">"{queryParam}"</span>
            {meta?.totalResults ? ` (Tìm thấy ${meta.totalResults} kết quả)` : ""}
          </p>
        )}
      </div>

      {/* 2. Thanh lọc tab danh mục */}
      {queryParam.trim().length >= 2 && results.length > 0 && !loading && (
        <div className="flex flex-wrap gap-2 border-b border-themeBorder/40 pb-4 mb-8">
          {[
            { id: "all", label: "Tất cả", icon: Search, count: counts.all },
            { id: "movie", label: "Phim lẻ", icon: Film, count: counts.movie },
            { id: "tv", label: "Phim bộ", icon: Tv, count: counts.tv },
            { id: "person", label: "Diễn viên", icon: Users, count: counts.person }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sharp border transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-text border-primary shadow-lg shadow-primary/25"
                    : "bg-surface border-themeBorder text-muted hover:border-primary/40 hover:text-text"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  isActive ? "bg-black/40 text-text" : "bg-themeBorder text-muted"
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Vùng hiển thị nội dung chính */}
      <div className="mt-4">
        {error && (
          <ErrorState onRetry={performSearch} variant="blocking" />
        )}

        {loading && (
          <LoadingState
            variant="skeleton"
            skeletonCount={12}
            gridClass="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          />
        )}

        {!loading && !error && queryParam.trim().length < 2 && (
          <div className="py-20">
            <EmptyState message="Vui lòng nhập tối thiểu 2 ký tự ở ô tìm kiếm phía trên để bắt đầu khám phá." />
          </div>
        )}

        {!loading && !error && queryParam.trim().length >= 2 && results.length === 0 && (
          <div className="py-20">
            <EmptyState message={`Không tìm thấy kết quả nào khớp với từ khóa "${queryParam}".`} />
          </div>
        )}

        {/* Khung kết quả hiển thị */}
        {!loading && !error && results.length > 0 && (
          <>
            {filteredResults.length > 0 ? (
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
                            src={item.profileUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"}
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
                  const movieProp = mapNormalizedToMovie(item as NormalizedMovie | NormalizedTvSeries);
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
            ) : (
              <div className="py-20">
                <EmptyState message={`Không tìm thấy kết quả nào thuộc loại bộ lọc được chọn.`} />
              </div>
            )}

            {/* Điều khiển phân trang (chỉ hiển thị khi không lọc loại hình hoặc tổng trang > 1) */}
            {totalPages > 1 && (
              <Pagination
                currentPage={pageParam}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
