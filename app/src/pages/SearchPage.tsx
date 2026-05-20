import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";
import { searchMulti } from "../services/searchApi";
import { LoadingState, ErrorState, EmptyState, Pagination, SearchFilterTabs, SearchResultsGrid, Button } from "../components";
import type { SearchResult } from "../types/api";

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
          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-4 text-xs font-black uppercase tracking-wider"
          >
            Tìm kiếm
          </Button>
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
        <SearchFilterTabs
          filter={filter}
          setFilter={setFilter}
          counts={counts}
        />
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
            <SearchResultsGrid filteredResults={filteredResults} />

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
