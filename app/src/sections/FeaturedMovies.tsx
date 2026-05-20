import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Clapperboard, Filter } from "lucide-react";
import { MovieCard, Button, SectionHeader, Container, LoadingState, ErrorState, EmptyState } from "../components";
import { useTrendingMovies } from "../hooks/useMovies";
import type { Movie } from "../types/movie";
import type { NormalizedMovie } from "../types/api";

interface FilterCategory {
  id: string;
  label: string;
  genreName?: string;
}

/**
 * Hàm hỗ trợ chuyển đổi dữ liệu phim đã chuẩn hóa (NormalizedMovie)
 * sang định dạng hiển thị cũ (Movie) để đảm bảo không phá vỡ UI của MovieCard.
 */
const mapNormalizedToMovie = (normalized: NormalizedMovie): Movie => {
  return {
    id: normalized.id,
    title: normalized.title,
    originalTitle: normalized.originalTitle,
    poster: normalized.posterUrl || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80",
    backdrop: normalized.backdropUrl || "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1600&auto=format&fit=crop&q=80",
    year: normalized.year || 2026,
    genre: normalized.genres.length > 0 ? normalized.genres : ["Đang cập nhật"],
    rating: normalized.voteAverage,
    duration: normalized.runtime ? `${Math.floor(normalized.runtime / 60)}h ${normalized.runtime % 60}m` : "2h 00m",
    quality: normalized.quality || "FHD",
    subtitle: normalized.subtitleLanguages.length > 0 ? normalized.subtitleLanguages[0] : "Vietsub",
    description: normalized.overview || "Chưa có tóm tắt nội dung.",
    views: normalized.voteCount * 123 // Tạo lượt xem giả lập dựa trên lượt vote
  };
};

/**
 * Phần "Phim Đề Cử Nổi Bật" (Featured Movies Section).
 * - Sử dụng các thành phần LoadingState, ErrorState và EmptyState chuẩn hóa.
 */
export const FeaturedMovies: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  // Gọi API lấy danh sách phim xu hướng
  const { data: movies, loading, error, refetch } = useTrendingMovies();

  const categories: FilterCategory[] = [
    { id: "all", label: "Tất cả" },
    { id: "action", label: "Hành động", genreName: "Hành động" },
    { id: "scifi", label: "Viễn tưởng", genreName: "Viễn tưởng" },
    { id: "romance", label: "Lãng mạn", genreName: "Lãng mạn" },
    { id: "anime", label: "Anime", genreName: "Hoạt hình" },
    { id: "thriller", label: "Gây cấn", genreName: "Gây cấn" },
  ];

  // Lọc phim theo thể loại hoạt động
  const displayMovies = useMemo(() => {
    if (!movies) return [];
    
    const filtered = movies.filter((movie) => {
      if (activeFilter === "all") return true;
      const category = categories.find((c) => c.id === activeFilter);
      if (!category || !category.genreName) return true;
      
      return movie.genres.some(
        (g) => g.toLowerCase().includes(category.genreName!.toLowerCase())
      );
    });

    return filtered.slice(0, 8);
  }, [movies, activeFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <Container py="md">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <SectionHeader
          accentIcon={<Clapperboard className="w-4 h-4 text-gold animate-pulse" />}
          accentText="Phim đề cử xuất sắc"
          title="Phim Nổi Bật"
          subtitle="Tuyển chọn những tác phẩm điện ảnh xuất sắc nhất được cập nhật mỗi ngày."
          className="mb-0"
        />

        {/* Bộ lọc ngang di động */}
        <div className="flex items-center gap-3 overflow-x-auto pb-3 lg:pb-0 scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0">
          <div className="flex-shrink-0 text-muted/60 flex items-center gap-1.5 text-xs font-semibold mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Lọc:</span>
          </div>
          {categories.map((category) => {
            const isActive = activeFilter === category.id;
            return (
              <Button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                variant={isActive ? "primary" : "secondary"}
                size="sm"
                className="flex-shrink-0"
              >
                {category.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Hiển thị lỗi nhỏ thân thiện từ ErrorState chuẩn hóa */}
      {error && (
        <ErrorState onRetry={refetch} variant="banner" />
      )}

      {/* Lưới Phim Responsive */}
      {loading ? (
        <LoadingState 
          variant="skeleton" 
          skeletonCount={8} 
          gridClass="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10" 
        />
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10"
        >
          <AnimatePresence mode="popLayout">
            {displayMovies.map((movie) => {
              const movieProp = mapNormalizedToMovie(movie);
              return (
                <motion.div
                  key={movie.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                  className="w-full"
                >
                  <MovieCard movie={movieProp} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Hiển thị EmptyState chuẩn hóa */}
      {!loading && displayMovies.length === 0 && (
        <EmptyState 
          message="Chưa có phim đề cử thuộc thể loại này. Vui lòng chọn thể loại khác." 
          onReset={() => setActiveFilter("all")}
          resetText="Quay lại tất cả"
        />
      )}

      {/* Nút xem tất cả phim */}
      <div className="flex justify-center mt-14 md:mt-18">
        <Button
          variant="outline"
          icon={<ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />}
          iconPosition="right"
          className="group"
        >
          Xem tất cả phim
        </Button>
      </div>
    </Container>
  );
};
