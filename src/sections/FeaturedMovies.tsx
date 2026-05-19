import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Clapperboard, Filter } from "lucide-react";
import { MovieCard } from "../components/MovieCard";
import { SAMPLE_MOVIES } from "../data/movies";

// Định nghĩa cấu trúc thể loại cho bộ lọc
interface FilterCategory {
  id: string;
  label: string;
  genreName?: string; // Tên thể loại tương ứng trong trường genre của dữ liệu phim
}

/**
 * Phần "Phim Đề Cử Nổi Bật" (Featured Movies Section).
 * Tính năng chính:
 * - Tiêu đề phụ và chính dạng chữ lớn Việt hóa đẳng cấp.
 * - Thanh bộ lọc ngang: Tất cả, Hành động, Viễn tưởng, Lãng mạn, Anime, Gây cấn.
 * - Lưới phim co giãn đa nền tảng (Desktop 4 cột, Tablet 3 cột, Mobile 2 cột).
 * - Sử dụng Framer Motion hỗ trợ hoạt ảnh chuyển đổi layout mượt mà khi đổi bộ lọc.
 * - Nút "Xem tất cả phim" tinh xảo ở cuối phần.
 */
export const FeaturedMovies: React.FC = () => {
  // Trạng thái lưu trữ bộ lọc đang được chọn
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories: FilterCategory[] = [
    { id: "all", label: "Tất cả" },
    { id: "action", label: "Hành động", genreName: "Hành Động" },
    { id: "scifi", label: "Viễn tưởng", genreName: "Viễn Tưởng" },
    { id: "romance", label: "Lãng mạn", genreName: "Lãng Mạn" },
    { id: "anime", label: "Anime", genreName: "Anime" },
    { id: "thriller", label: "Gây cấn", genreName: "Gây Cấn" },
  ];

  // Lọc phim theo thể loại được chọn
  const filteredMovies = SAMPLE_MOVIES.filter((movie) => {
    if (activeFilter === "all") return true;
    const category = categories.find((c) => c.id === activeFilter);
    if (!category || !category.genreName) return true;
    return movie.genre.includes(category.genreName);
  }).slice(0, 8); // Giới hạn hiển thị tối đa 8 thẻ phim

  // Cấu hình hoạt ảnh xuất hiện của lưới phim (Scroll Reveal & Stagger)
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
    <section className="container-custom py-16 md:py-24 relative z-20">
      
      {/* 
        Tiêu đề Section (Section Header)
        Thiết kế tinh giản, căn lề trái, tích hợp biểu tượng Clapperboard cổ điển.
      */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            <Clapperboard className="w-4 h-4 text-gold" />
            <span>Phim đề cử xuất sắc</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight uppercase text-text">
            Phim Nổi Bật
          </h2>
          <p className="text-muted text-sm md:text-base">
            Tuyển chọn những tác phẩm điện ảnh xuất sắc nhất được cập nhật mỗi ngày.
          </p>
        </div>

        {/* 
          Bộ lọc ngang di động (Horizontal Category Filters)
          Sử dụng flex-wrap trên desktop, cuộn ngang tự nhiên trên điện thoại (overflow-x-auto).
        */}
        <div className="flex items-center gap-3 overflow-x-auto pb-3 md:pb-0 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex-shrink-0 text-muted/60 flex items-center gap-1.5 text-xs font-semibold mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Lọc:</span>
          </div>
          {categories.map((category) => {
            const isActive = activeFilter === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`relative px-4 py-2 text-xs font-black tracking-wider uppercase rounded-sharp transition-all duration-300 flex-shrink-0 border ${
                  isActive
                    ? "bg-primary border-primary text-text shadow-lg shadow-primary/20"
                    : "bg-surface/40 hover:bg-surface border-themeBorder text-muted hover:text-text"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 
        Lưới Phim Responsive (Movie Grid)
        - Desktop: col-span-4
        - Tablet: col-span-3
        - Mobile: col-span-2
        Kết hợp AnimatePresence và layout prop của Framer Motion để khi chuyển filter các card di chuyển trượt rất mượt.
      */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredMovies.map((movie) => (
            <motion.div
              key={movie.id}
              layout // Kích hoạt hiệu ứng trượt vị trí thông minh khi đổi filter
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
              className="w-full"
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Thông báo nếu không có phim nào phù hợp với bộ lọc */}
      {filteredMovies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-themeBorder rounded-sharp">
          <p className="text-muted text-sm">Chưa có phim đề cử thuộc thể loại này. Vui lòng chọn thể loại khác.</p>
        </div>
      )}

      {/* 
        Nút bấm Chân phần (Section Footer Action)
        Nút xem tất cả phim dạng tối giản, hiệu ứng dịch chuyển biểu tượng mũi tên khi hover.
      */}
      <div className="flex justify-center mt-14 md:mt-18">
        <button className="group flex items-center gap-3 border border-themeBorder bg-surface/30 hover:bg-surface hover:border-primary text-xs font-black tracking-widest uppercase px-8 py-4 transition-all duration-300 rounded-sharp">
          <span>Xem tất cả phim</span>
          <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </section>
  );
};
