import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Compass, Star, Heart, Volume2, ShieldCheck, Flame } from "lucide-react";
import type { Movie } from "../types/movie";
import { fallbackMovies } from "../data/movies";
import { Button, Badge } from "../components";

/**
 * Thành phần Hero điện ảnh chuyên nghiệp cho CineFlow.
 * - Sử dụng các thành phần UI chung: Button, Badge.
 */
export const Hero: React.FC = () => {
  const featuredMovie: Movie = fallbackMovies[0];
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden py-20 lg:py-0">
      <div className="absolute inset-0 bg-background z-0">
        <div className="absolute inset-0 opacity-20 filter blur-sm">
          <img
            src={featuredMovie.backdrop}
            alt="Backdrop"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />
        
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[60%] rounded-full glow-crimson opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[45%] h-[50%] rounded-full glow-gold opacity-15 blur-3xl pointer-events-none" />
      </div>

      <div className="container-custom relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[85vh]">
        
        {/* Cột bên trái: Tiêu đề, badges, mô tả và nút bấm */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left pt-8 lg:pt-0"
        >
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-6">
            <Badge variant="primary" size="md" className="flex items-center gap-1 bg-primary/10 border border-primary/40 text-primary">
              <Flame className="w-3 h-3 text-gold" />
              HOT
            </Badge>
            <Badge variant="outline" size="md" className="bg-surface/80">
              Ultra HD 4K
            </Badge>
            <Badge variant="outline" size="md" className="bg-surface/80">
              Vietsub
            </Badge>
            <Badge variant="gold" size="md" className="bg-gold/10 border-gold/40 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Không quảng cáo
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] mb-6 uppercase text-text"
          >
            Tìm kiếm những bộ phim <br />
            bạn yêu thích, <span className="text-primary text-glow-red">mọi lúc mọi nơi.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-muted text-base md:text-lg leading-relaxed max-w-xl mb-10"
          >
            CineFlow mang đến trải nghiệm phát trực tuyến đỉnh cao với hàng ngàn phim bom tấn chiếu rạp, phim bộ độc quyền, anime sống động và các chương trình truyền hình hấp dẫn. Tất cả đều không giới hạn với chất lượng 4K HDR siêu thực.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              icon={<Play className="w-4.5 h-4.5 fill-current" />}
            >
              Bắt đầu xem
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto bg-surface/30 backdrop-blur-sm"
              icon={<Compass className="w-4.5 h-4.5" />}
            >
              Khám phá thư viện
            </Button>
          </motion.div>

        </motion.div>

        {/* Cột bên phải: Thẻ preview phim */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.4 }}
          className="lg:col-span-5 relative w-full max-w-[360px] md:max-w-[400px] mx-auto z-20 group"
        >
          <div className="absolute inset-0 bg-primary/25 blur-[60px] opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full" />
          <div className="absolute -inset-[1px] bg-gradient-to-b from-primary/40 to-themeBorder opacity-80 group-hover:opacity-100 transition-opacity duration-300 rounded-sharp" />

          <div className="relative bg-card/65 backdrop-blur-xl border border-themeBorder/40 p-4 rounded-sharp shadow-2xl flex flex-col gap-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

            <div className="relative aspect-[2/3] w-full overflow-hidden border border-themeBorder bg-background/50 rounded-sharp group/poster">
              <img
                src={featuredMovie.poster}
                alt={featuredMovie.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-60" />

              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center bg-primary hover:bg-primary-dark text-text rounded-full shadow-2xl border border-primary/50 transition-all duration-300 group-hover/poster:scale-110 active:scale-95 group-hover/poster:shadow-primary/30 z-30"
                aria-label="Phát thử trailer"
              >
                <Play className="w-7 h-7 fill-current ml-1" />
              </button>

              <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md border border-themeBorder px-2.5 py-1 text-xs font-black text-gold flex items-center gap-1 rounded-sharp">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{featuredMovie.rating}</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
                <div className="flex gap-1.5">
                  {featuredMovie.genre.slice(0, 2).map((g) => (
                    <span key={g} className="bg-black/85 text-[10px] font-bold text-text/90 border border-themeBorder/40 px-2 py-0.5 rounded-sharp">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display font-extrabold text-xl tracking-tight text-text leading-tight group-hover:text-primary transition-colors">
                  {featuredMovie.title}
                </h3>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 border border-themeBorder rounded-sharp transition-colors ${isLiked ? "bg-primary/20 border-primary text-primary" : "bg-background/40 hover:bg-themeBorder text-muted hover:text-text"}`}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                  <button className="p-2 border border-themeBorder bg-background/40 hover:bg-themeBorder text-muted hover:text-text rounded-sharp transition-colors">
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-xs text-muted leading-relaxed line-clamp-2">
                {featuredMovie.description}
              </p>
              
              <div className="flex items-center justify-between border-t border-themeBorder/40 pt-3 text-[11px] text-muted font-semibold">
                <span>Khởi chiếu: {featuredMovie.year}</span>
                <span>Thời lượng: {featuredMovie.duration}</span>
              </div>
            </div>

          </div>

          <div className="absolute -left-12 -bottom-6 w-24 h-36 border border-themeBorder/60 bg-card rounded-sharp shadow-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 overflow-hidden pointer-events-none hidden md:block z-10 -rotate-6">
            <img src={fallbackMovies[1].poster} alt="Floating movie 1" className="w-full h-full object-cover" />
          </div>

          <div className="absolute -right-12 -top-8 w-28 h-40 border border-themeBorder/60 bg-card rounded-sharp shadow-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 overflow-hidden pointer-events-none hidden md:block z-10 rotate-12">
            <img src={fallbackMovies[2].poster} alt="Floating movie 2" className="w-full h-full object-cover" />
          </div>

        </motion.div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-55 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <div className="relative max-w-4xl w-full aspect-video bg-background border border-themeBorder rounded-sharp shadow-2xl flex flex-col items-center justify-center p-8 text-center gap-6">
              <div className="w-16 h-16 bg-primary/10 border border-primary text-primary flex items-center justify-center rounded-full animate-bounce">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <h3 className="font-display font-extrabold text-2xl uppercase tracking-wider">Đang khởi chạy luồng truyền phát...</h3>
              <p className="text-muted text-sm max-w-md">
                Bản phát thử (Trailer) bộ phim <span className="text-text font-bold">{featuredMovie.title}</span> đang được giải mã. Chức năng trình chiếu video thực tế sẽ được tích hợp trong giai đoạn tích hợp trình phát.
              </p>
              <button 
                onClick={() => setIsPlaying(false)}
                className="mt-4 px-6 py-2.5 border border-primary bg-primary/15 hover:bg-primary/25 text-primary text-xs font-black uppercase tracking-widest transition-colors rounded-sharp"
              >
                Đóng phát thử
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
