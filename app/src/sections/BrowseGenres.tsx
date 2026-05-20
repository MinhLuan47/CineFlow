import React from "react";
import { motion } from "framer-motion";
import { 
  Flame, Heart, Smile, Ghost, Sparkles, Rocket, Compass, Film, Globe, History, Compass as GridIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import { Container, SectionHeader, Card } from "../components";
import { useTrendingMovies } from "../hooks/useMovies";
import { getNormalizedSampleMovies } from "../hooks/useMovies";

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
  const { data: apiMovies } = useTrendingMovies();

  const genres: GenreItem[] = [
    { id: "28", name: "Hành Động", searchKey: "hành động", baseCount: 142, icon: Flame },
    { id: "878", name: "Viễn Tưởng", searchKey: "viễn tưởng", baseCount: 96, icon: Rocket },
    { id: "10749", name: "Lãng Mạn", searchKey: "lãng mạn", baseCount: 78, icon: Heart },
    { id: "27", name: "Kinh Dị", searchKey: "kinh dị", baseCount: 64, icon: Ghost },
    { id: "16", name: "Anime", searchKey: "hoạt hình", baseCount: 88, icon: Sparkles },
    { id: "12", name: "Phiêu Lưu", searchKey: "phiêu lưu", baseCount: 110, icon: Compass },
    { id: "35", name: "Hài Hước", searchKey: "hài hước", baseCount: 125, icon: Smile },
    { id: "18", name: "Tâm Lý", searchKey: "chính kịch", baseCount: 154, icon: Film },
    { id: "99", name: "Phim Tài Liệu", searchKey: "tài liệu", baseCount: 45, icon: Globe },
    { id: "36", name: "Cổ Trang / Lịch Sử", searchKey: "lịch sử", baseCount: 52, icon: History },
  ];

  const getMovieCount = (item: GenreItem) => {
    const listToCount = apiMovies && apiMovies.length > 0 ? apiMovies : getNormalizedSampleMovies();
    const dynamicCount = listToCount.filter((movie) => 
      movie.genres.some((g) => g.toLowerCase().includes(item.searchKey.toLowerCase()))
    ).length;
    return item.baseCount + (dynamicCount * 12);
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
              <Link to={`/genre/movie/${genre.id}`} className="block">
                <Card
                  variant="glass"
                  className="relative overflow-hidden p-6 md:p-8 flex flex-col items-center justify-center gap-4 text-center transition-all duration-300 hover:border-primary/50 hover:bg-surface/50 hover:-translate-y-1.5"
                >
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
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </Container>
  );
};
