import React from "react";
import { motion } from "framer-motion";
import { Star, Play, Eye, TrendingUp } from "lucide-react";
import { Container, SectionHeader, Button } from "../components";
import { fallbackMovies } from "../data/movies";

/**
 * Phần "Bảng Xếp Hạng Tuần Này" (Top Ranking Section).
 * - Sử dụng Container, SectionHeader và Button dạng icon dùng chung.
 */
export const TopRanking: React.FC = () => {
  const rankedMovies = [...fallbackMovies]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 10);

  const formatViews = (views?: number) => {
    if (!views) return "0";
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1).replace(".0", "")}K`;
    }
    return views.toString();
  };

  const firstHalf = rankedMovies.slice(0, 5);
  const secondHalf = rankedMovies.slice(5, 10);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  };

  const renderRankItem = (movie: typeof fallbackMovies[0], index: number) => {
    const rank = index + 1;
    const isTop3 = rank <= 3;

    let rankColorClass = "text-muted/30 group-hover:text-muted/60";
    let glowShadowClass = "";

    if (rank === 1) {
      rankColorClass = "text-gold/90 font-black";
      glowShadowClass = "shadow-[0_0_15px_rgba(245,197,66,0.08)]";
    } else if (rank === 2) {
      rankColorClass = "text-slate-300 font-bold";
      glowShadowClass = "shadow-[0_0_15px_rgba(200,200,200,0.06)]";
    } else if (rank === 3) {
      rankColorClass = "text-amber-600/90 font-bold";
      glowShadowClass = "shadow-[0_0_15px_rgba(217,119,6,0.05)]";
    }

    return (
      <motion.div
        key={movie.id}
        variants={itemVariants}
        className={`group flex items-center gap-4 bg-surface/30 border border-themeBorder hover:border-primary/50 p-3 transition-all duration-300 rounded-sharp ${glowShadowClass} ${
          isTop3 ? "bg-surface/50 border-themeBorder/80" : ""
        }`}
      >
        {/* Số thứ tự xếp hạng */}
        <div className="w-12 md:w-16 flex-shrink-0 text-center select-none">
          <span className={`font-display text-4xl md:text-5xl tracking-tight transition-colors duration-300 ${rankColorClass}`}>
            {rank.toString().padStart(2, "0")}
          </span>
        </div>

        {/* Ảnh thu nhỏ Poster */}
        <div className="relative w-14 h-20 bg-card border border-themeBorder overflow-hidden flex-shrink-0 rounded-sharp">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        {/* Thông tin phim */}
        <div className="flex-grow min-w-0 flex flex-col gap-1">
          <h3 className="font-bold text-sm md:text-base text-text truncate group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <p className="text-[10px] md:text-xs text-muted truncate">
            {movie.originalTitle} • {movie.genre.slice(0, 2).join(", ")}
          </p>

          <div className="flex items-center gap-3 mt-0.5">
            <div className="flex items-center gap-1 text-gold text-[10px] md:text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{movie.rating}</span>
            </div>
            
            <div className="flex items-center gap-1 text-muted/80 text-[10px] md:text-xs font-medium">
              <Eye className="w-3.5 h-3.5" />
              <span>{formatViews(movie.views)} lượt xem</span>
            </div>
          </div>
        </div>

        {/* Nút xem nhanh */}
        <div className="flex-shrink-0 pr-1">
          <Button
            variant="icon"
            className="group-hover:bg-primary group-hover:border-primary group-hover:text-text transition-colors duration-300"
          >
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </Button>
        </div>

      </motion.div>
    );
  };

  return (
    <Container py="md" borderTop>
      <SectionHeader
        accentIcon={<TrendingUp className="w-4 h-4 text-primary animate-bounce" />}
        accentText="Bảng xếp hạng phim"
        title="Top 10 Thịnh Hành Tuần Này"
        subtitle="Những bộ phim điện ảnh và phim bộ đang làm mưa làm gió có lượt xem cao nhất trong tuần."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Cột thứ nhất: Ranks 1 - 5 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-3.5"
        >
          {firstHalf.map((movie, idx) => renderRankItem(movie, idx))}
        </motion.div>

        {/* Cột thứ hai: Ranks 6 - 10 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-3.5"
        >
          {secondHalf.map((movie, idx) => renderRankItem(movie, idx + 5))}
        </motion.div>
      </div>
    </Container>
  );
};
