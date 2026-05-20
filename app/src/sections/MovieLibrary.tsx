import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Library, Sparkles, Film, PlaySquare } from "lucide-react";
import { MovieCard, SectionHeader, Container, LoadingState, ErrorState, EmptyState } from "../components";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies
} from "../services/movieApi";
import { getNormalizedSampleMovies } from "../hooks/useMovies";
import type { NormalizedMovie } from "../types/api";
import { mapNormalizedToMovie } from "../utils/movieMapper";
import { LibraryFilterBar } from "../components/LibraryFilterBar";
import type { LibraryTab } from "../components/LibraryFilterBar";

/**
 * Phần "Khám Phá Thư Viện Phim" (Movie Library Preview Section).
 * - Sử dụng các thành phần trạng thái LoadingState, ErrorState, EmptyState chuẩn hóa.
 */
export const MovieLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("new-releases");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Các trạng thái dữ liệu API
  const [movies, setMovies] = useState<NormalizedMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const tabs: LibraryTab[] = [
    { id: "new-releases", label: "Mới Ra Mắt", icon: Sparkles },
    { id: "popular", label: "Phổ Biến", icon: Film },
    { id: "top-rated", label: "Đánh Giá Cao", icon: Library },
    { id: "upcoming", label: "Sắp Chiếu", icon: PlaySquare },
  ];

  /**
   * Hàm gọi API tải dữ liệu phim theo Tab được kích hoạt.
   * Nếu có lỗi kết nối, tự động chuyển về phân tách từ tập dữ liệu giả lập (Offline Fallback).
   */
  const fetchTabData = useCallback(async (tab: string) => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (tab === "new-releases") {
        response = await getNowPlayingMovies();
      } else if (tab === "popular") {
        response = await getPopularMovies();
      } else if (tab === "top-rated") {
        response = await getTopRatedMovies();
      } else if (tab === "upcoming") {
        response = await getUpcomingMovies();
      } else {
        response = await getNowPlayingMovies();
      }
      setMovies(response.data);
    } catch (err: any) {
      console.warn(`Lỗi tải dữ liệu cho tab ${tab}, chuyển sang chế độ ngoại tuyến:`, err);
      setError(err instanceof Error ? err : new Error(String(err)));
      
      const sample = getNormalizedSampleMovies();
      if (tab === "new-releases") {
        setMovies(sample.slice(0, 6));
      } else if (tab === "popular") {
        setMovies(sample.slice(2, 8));
      } else if (tab === "top-rated") {
        setMovies(sample.slice(4, 10));
      } else if (tab === "upcoming") {
        setMovies(sample.slice(1, 7));
      } else {
        setMovies(sample.slice(0, 6));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Tải lại dữ liệu mỗi khi người dùng thay đổi tab hoạt động
  useEffect(() => {
    fetchTabData(activeTab);
  }, [activeTab, fetchTabData]);

  // Áp dụng bộ lọc tìm kiếm trên dữ liệu đã tải về
  const displayedMovies = useMemo(() => {
    let list = [...movies];
    
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.originalTitle.toLowerCase().includes(query) ||
          m.genres.some((g) => g.toLowerCase().includes(query))
      );
    }

    return list.slice(0, 6);
  }, [movies, searchQuery]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <Container py="md" borderTop>
      <SectionHeader
        accentIcon={<Library className="w-4 h-4 text-gold" />}
        accentText="Kho tài nguyên vô hạn"
        title="Thư Viện Điện Ảnh"
        subtitle="Hội tụ phim điện ảnh mới nhất, danh sách thịnh hành và phim sắp chiếu rạp được làm mới liên tục."
      />

      {/* Thanh Điều khiển (Control Bar) */}
      <LibraryFilterBar
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hiển thị thông báo lỗi từ ErrorState chuẩn hóa */}
      {error && (
        <ErrorState onRetry={() => fetchTabData(activeTab)} variant="banner" />
      )}

      {/* Lưới phim hoặc Khung xương tải dữ liệu */}
      {loading ? (
        <LoadingState 
          variant="skeleton" 
          skeletonCount={6} 
          gridClass="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6" 
        />
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedMovies.map((movie) => {
              const movieProp = mapNormalizedToMovie(movie);
              return (
                <motion.div
                  key={`${activeTab}-${movie.id}`}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
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
      {!loading && displayedMovies.length === 0 && (
        <EmptyState 
          message={`Không tìm thấy phim nào khớp với từ khoá "${searchQuery}" hoặc trong danh mục đã chọn.`}
          onReset={() => {
            setSearchQuery("");
            setActiveTab("new-releases");
          }}
          resetText="Đặt lại bộ lọc"
        />
      )}
    </Container>
  );
};
