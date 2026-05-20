import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Clapperboard, Filter } from "lucide-react";
import { MovieCard, Button, SectionHeader, Container } from "../components";
import { SAMPLE_MOVIES } from "../data/movies";

interface FilterCategory {
  id: string;
  label: string;
  genreName?: string;
}

/**
 * Phần "Phim Đề Cử Nổi Bật" (Featured Movies Section).
 * - Sử dụng Container, SectionHeader, Button và MovieCard dùng chung.
 */
export const FeaturedMovies: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories: FilterCategory[] = [
    { id: "all", label: "Tất cả" },
    { id: "action", label: "Hành động", genreName: "Hành Động" },
    { id: "scifi", label: "Viễn tưởng", genreName: "Viễn Tưởng" },
    { id: "romance", label: "Lãng mạn", genreName: "Lãng Mạn" },
    { id: "anime", label: "Anime", genreName: "Anime" },
    { id: "thriller", label: "Gây cấn", genreName: "Gây Cấn" },
  ];

  const filteredMovies = SAMPLE_MOVIES.filter((movie) => {
    if (activeFilter === "all") return true;
    const category = categories.find((c) => c.id === activeFilter);
    if (!category || !category.genreName) return true;
    return movie.genre.includes(category.genreName);
  }).slice(0, 8);

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

      {/* Lưới Phim Responsive */}
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
              layout
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

      {filteredMovies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-themeBorder rounded-sharp">
          <p className="text-muted text-sm">Chưa có phim đề cử thuộc thể loại này. Vui lòng chọn thể loại khác.</p>
        </div>
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
