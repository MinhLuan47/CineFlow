import React from "react";
import { motion } from "framer-motion";
import { 
  Flame, Heart, Smile, Ghost, Sparkles, Rocket, Compass, Film, Globe, History, Compass as GridIcon
} from "lucide-react";
import { Container, SectionHeader } from "../components";
import { fallbackMovies } from "../data/movies";

interface GenreItem {
  id: string;
  name: string;
  searchKey: string;
  baseCount: number;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Phần "Duyệt Theo Thể Loại" (Browse by Genre Section).
 * - Sử dụng Container và SectionHeader để quản lý cấu trúc tiêu đề và khoảng cách thống nhất.
 */
export const BrowseGenres: React.FC = () => {
  const genres: GenreItem[] = [
    { id: "action", name: "Hành Động", searchKey: "hành động", baseCount: 142, icon: Flame },
    { id: "scifi", name: "Viễn Tưởng", searchKey: "viễn tưởng", baseCount: 96, icon: Rocket },
    { id: "romance", name: "Lãng Mạn", searchKey: "lãng mạn", baseCount: 78, icon: Heart },
    { id: "horror", name: "Kinh Dị", searchKey: "kinh dị", baseCount: 64, icon: Ghost },
    { id: "anime", name: "Anime", searchKey: "anime", baseCount: 88, icon: Sparkles },
    { id: "adventure", name: "Phiêu Lưu", searchKey: "phiêu lưu", baseCount: 110, icon: Compass },
    { id: "comedy", name: "Hài Hước", searchKey: "hài hước", baseCount: 125, icon: Smile },
    { id: "drama", name: "Tâm Lý", searchKey: "tâm lý", baseCount: 154, icon: Film },
    { id: "documentary", name: "Phim Tài Liệu", searchKey: "tài liệu", baseCount: 45, icon: Globe },
    { id: "historical", name: "Cổ Trang / Lịch Sử", searchKey: "lịch sử", baseCount: 52, icon: History },
  ];

  const getMovieCount = (item: GenreItem) => {
    const dynamicCount = fallbackMovies.filter((movie) => 
      movie.genre.some((g) => g.toLowerCase().includes(item.searchKey))
    ).length;
    return item.baseCount + dynamicCount;
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <Container py="md">
      <SectionHeader
        accentIcon={<GridIcon className="w-4 h-4 text-gold" />}
        accentText="Tìm kiếm theo cảm xúc"
        title="Duyệt Theo Thể Loại"
        subtitle="Tìm kiếm bộ phim hoàn hảo phù hợp với tâm trạng của bạn."
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5"
      >
        {genres.map((genre) => {
          const GenreIcon = genre.icon;
          const totalMoviesCount = getMovieCount(genre);

          return (
            <motion.div
              key={genre.id}
              variants={itemVariants}
              className="group relative cursor-pointer"
            >
              <div className="relative overflow-hidden bg-surface/30 backdrop-blur-md border border-themeBorder/60 p-6 md:p-8 flex flex-col items-center justify-center gap-4 text-center transition-all duration-300 hover:border-primary/50 hover:bg-surface/50 hover:-translate-y-1.5 rounded-sharp">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-ember/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="w-14 h-14 bg-background/50 border border-themeBorder flex items-center justify-center text-muted group-hover:text-primary group-hover:border-primary/40 group-hover:scale-110 transition-all duration-300 rounded-sharp">
                  <GenreIcon className="w-6 h-6 transition-transform" />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-display font-extrabold text-sm text-text tracking-wide group-hover:text-primary transition-colors">
                    {genre.name}
                  </span>
                  <span className="text-[11px] text-muted/70 font-semibold uppercase tracking-wider">
                    {totalMoviesCount} tác phẩm
                  </span>
                </div>

                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 shadow-glow shadow-primary" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Container>
  );
};
