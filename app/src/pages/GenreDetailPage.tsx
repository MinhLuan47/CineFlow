import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { discoverMovies, discoverTv } from "../services/genreApi";
import { useGenres } from "../hooks/useGenres";
import { MediaCard, LoadingState, ErrorState, EmptyState, Pagination, Container, SectionHeader } from "../components";
import type { NormalizedMovie, NormalizedTvSeries } from "../types/api";

// Các tùy chọn sắp xếp hiển thị ở giao diện
const SORT_OPTIONS = [
  { label: "Phổ biến nhất", value: "popular" },
  { label: "Đánh giá cao", value: "top-rated" },
  { label: "Mới nhất", value: "newest" },
  { label: "Cũ nhất", value: "oldest" }
];

/**
 * Hàm trợ giúp chuyển đổi khóa sắp xếp từ URL sang định dạng tham số TMDB API tương ứng.
 * @param sortKey Khóa sắp xếp dạng ngắn (ví dụ: 'popular', 'newest')
 * @param isMovie Kiểm tra xem có phải phim điện ảnh hay không
 */
const getBackendSortValue = (sortKey: string, isMovie: boolean): string => {
  switch (sortKey) {
    case "top-rated":
      return "vote_average.desc";
    case "newest":
      return isMovie ? "primary_release_date.desc" : "first_air_date.desc";
    case "oldest":
      return isMovie ? "primary_release_date.asc" : "first_air_date.asc";
    case "popular":
    default:
      return "popularity.desc";
  }
};

export const GenreDetailPage: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Đọc giá trị trang thái hiện tại từ URL (định nghĩa fallback mặc định)
  const page = parseInt(searchParams.get("page") || "1", 10);
  const sort = searchParams.get("sort") || "popular";

  const [data, setData] = useState<Array<NormalizedMovie | NormalizedTvSeries>>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isMovie = type === "movie";
  const typeLabel = isMovie ? "Phim Điện Ảnh" : "Phim Truyền Hình";

  // Sử dụng custom hook lấy danh sách thể loại để giải mã tên Thể loại
  const { movieGenres, tvGenres } = useGenres();
  const genresList = isMovie ? movieGenres : tvGenres;
  const currentGenre = genresList.find((g) => String(g.id) === id);
  const genreName = currentGenre ? currentGenre.name : "Đang tải...";

  // 1. GỌI API LẤY DANH SÁCH PHIM LỌC THEO THỂ LOẠI VÀ SẮP XẾP
  useEffect(() => {
    let active = true;

    async function loadFilteredData() {
      setLoading(true);
      setError(null);
      try {
        const backendSort = getBackendSortValue(sort, isMovie);
        
        const response = isMovie
          ? await discoverMovies(id!, { page, sortBy: backendSort })
          : await discoverTv(id!, { page, sortBy: backendSort });

        if (active) {
          setData(response.data || []);
          setMeta(response.meta || null);
        }
      } catch (err: any) {
        if (active) {
          console.error("Lỗi khi gọi API discover:", err);
          setError(err.message || "Không thể tải danh sách phim. Vui lòng thử lại sau.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    if (id && type) {
      loadFilteredData();
    }

    return () => {
      active = false;
    };
  }, [type, id, page, sort, isMovie]);

  // 2. XỬ LÝ KHI THAY ĐỔI BỘ LỌC SẮP XẾP
  const handleSortChange = (newSort: string) => {
    setSearchParams({
      sort: newSort,
      page: "1" // Đổi bộ lọc sắp xếp tự động reset trang về 1
    });
  };

  // 3. XỬ LÝ KHI CHUYỂN TRANG
  const handlePageChange = (newPage: number) => {
    setSearchParams({
      sort,
      page: newPage.toString()
    });
    // Cuộn trang lên đầu mượt mà
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = meta?.totalPages || 1;

  // Trình kích hoạt thử lại dữ liệu khi lỗi
  const handleRetry = () => {
    setSearchParams({
      sort,
      page: page.toString()
    });
  };

  return (
    <Container py="none" className="py-10 min-h-[60vh] text-left" as="div">
      
      {/* Nút Quay lại & Tiêu đề trang */}
      <Link 
        to="/genres" 
        className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-primary transition-colors uppercase tracking-wider mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Danh mục thể loại</span>
      </Link>
      
      <SectionHeader
        title={
          <>
            THỂ LOẠI: <span className="text-primary">{genreName}</span>
          </>
        }
        description={`Danh sách các tác phẩm ${genreName.toLowerCase()} thuộc dòng ${typeLabel.toLowerCase()}.`}
        action={
          <div className="flex items-center gap-3 bg-surface border border-themeBorder px-3 py-1.5 rounded-sharp">
            <SlidersHorizontal className="w-4 h-4 text-muted" />
            <span className="text-xs font-bold text-muted uppercase tracking-wider">Sắp xếp:</span>
            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-transparent text-xs font-bold text-text focus:outline-none cursor-pointer pr-4"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-surface text-text">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        }
        className="border-b border-themeBorder/40 pb-6 mb-8 gap-4 mb-8"
      />


      {/* HIỂN THỊ CÁC TRẠNG THÁI LOADING / ERROR / EMPTY / GRID CHÍNH */}
      {loading ? (
        <LoadingState
          variant="skeleton"
          skeletonCount={12}
          gridClass="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
        />
      ) : error ? (
        <ErrorState message={error} onRetry={handleRetry} variant="blocking" />
      ) : data.length === 0 ? (
        <EmptyState message="Không tìm thấy phim nào thuộc thể loại này." />
      ) : (
        <>
          {/* Lưới Phim Sử Dụng MediaCard */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {data.map((item) => (
              <div key={item.id} className="block hover:-translate-y-1 transition-transform duration-300">
                <MediaCard item={item} />
              </div>
            ))}
          </div>

          {/* Khối phân trang (Pagination Block) */}
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

    </Container>
  );
};

export default GenreDetailPage;
