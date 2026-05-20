import React, { useCallback } from "react";
import { useLocation, useSearchParams, Link } from "react-router-dom";
import { Tv, Flame, Star, Calendar, Layers } from "lucide-react";
import {
  getTrendingTv,
  getPopularTv,
  getOnTheAirTv,
  getTopRatedTv
} from "../services/tvApi";
import { useTv } from "../hooks/useTv";
import { MediaCard, LoadingState, ErrorState, EmptyState, Pagination } from "../components";
import type { NormalizedTvSeries } from "../types/api";

/**
 * TvPage - Trang khám phá và phân loại phim truyền hình dài tập (TV Series).
 */
export const TvPage: React.FC = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Đọc chỉ số trang hiện tại từ URL query params (?page=X)
  const page = parseInt(searchParams.get("page") || "1", 10);
  
  // Xác định danh mục dựa trên đường dẫn URL (pathname)
  const pathname = location.pathname;
  let activeCategory = "trending";
  if (pathname.endsWith("/popular")) {
    activeCategory = "popular";
  } else if (pathname.endsWith("/top-rated")) {
    activeCategory = "top-rated";
  } else if (pathname.endsWith("/on-the-air")) {
    activeCategory = "on-the-air";
  }

  const categories = [
    { id: "trending", label: "Xu Hướng", icon: Flame, desc: "Phim truyền hình được thảo luận sôi nổi và quan tâm nhiều nhất hôm nay." },
    { id: "popular", label: "Phổ Biến", icon: Layers, desc: "Những series dài tập kinh điển có lượng khán giả theo dõi đông đảo nhất." },
    { id: "top-rated", label: "Đánh Giá Cao", icon: Star, desc: "Các tác phẩm truyền hình nhận điểm số đánh giá xuất sắc nhất từ cộng đồng." },
    { id: "on-the-air", label: "Đang Phát Sóng", icon: Calendar, desc: "Các tập phim mới vừa phát sóng hoặc chuẩn bị phát sóng trong tuần này." }
  ];

  const currentCat = categories.find(c => c.id === activeCategory) || categories[0];

  /**
   * Tạo fetcher động phản ứng với category và page thay đổi.
   * Tất cả yêu cầu đều mặc định dùng vi-VN và khu vực VN.
   */
  const fetcher = useCallback(() => {
    const queryParams = { page, language: "vi-VN", region: "VN" };
    switch (activeCategory) {
      case "popular":
        return getPopularTv(queryParams);
      case "top-rated":
        return getTopRatedTv(queryParams);
      case "on-the-air":
        return getOnTheAirTv(queryParams);
      case "trending":
      default:
        return getTrendingTv(queryParams);
    }
  }, [activeCategory, page]);

  // Sử dụng custom hook useTv để gọi API và lấy dữ liệu
  const { data: tvSeriesList, meta, loading, error, refetch } = useTv<NormalizedTvSeries[]>(fetcher);

  // Xử lý chuyển đổi trang
  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    // Cuộn mượt mà lên đầu trang
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = meta?.totalPages || 1;

  return (
    <div className="container-custom py-10 min-h-[60vh] text-left">
      {/* Tiêu đề trang & Danh mục Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-themeBorder/40 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest mb-2">
            <Tv className="w-4 h-4 text-gold" />
            <span>Phim Bộ / {currentCat.label}</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-text">
            PHIM <span className="text-gold">TRUYỀN HÌNH</span>
          </h1>
          <p className="text-muted text-sm mt-2 max-w-2xl">{currentCat.desc}</p>
        </div>

        {/* Danh sách tab danh mục */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isActive = cat.id === activeCategory;
            return (
              <Link
                key={cat.id}
                to={cat.id === "trending" ? "/tv" : `/tv/${cat.id}`}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sharp border transition-all duration-300 ${
                  isActive
                    ? "bg-gold text-background border-gold shadow-lg shadow-gold/25"
                    : "bg-surface border-themeBorder text-muted hover:border-gold/40 hover:text-text"
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Hiển thị lỗi kết nối nếu API gặp vấn đề */}
      {error && (
        <ErrorState onRetry={refetch} variant="banner" />
      )}

      {/* Lưới Phim truyền hình chính hoặc Khung xương tải dữ liệu */}
      {loading ? (
        <LoadingState
          variant="skeleton"
          skeletonCount={12}
          gridClass="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
        />
      ) : (
        <>
          {tvSeriesList && tvSeriesList.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {tvSeriesList.map((item) => (
                <div 
                  key={item.id} 
                  className="hover:-translate-y-1 transition-transform duration-300"
                >
                  <MediaCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              message={`Hiện chưa có bộ phim truyền hình nào thuộc danh mục "${currentCat.label}".`}
            />
          )}

          {/* Phân trang (Pagination) */}
          {tvSeriesList && tvSeriesList.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              variant="gold"
            />
          )}
        </>
      )}
    </div>
  );
};

export default TvPage;
