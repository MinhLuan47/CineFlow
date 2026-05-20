import React from "react";
import { motion } from "framer-motion";
import { Play, Sparkles, Film } from "lucide-react";
import { Container, Button } from "../components";
import { SAMPLE_MOVIES } from "../data/movies";

/**
 * Phần Kêu Gọi Hành Động Cuối Trang (Final CTA Section).
 * - Sử dụng Container và Button dùng chung.
 */
export const FinalCTA: React.FC = () => {
  const displayPosters = [
    SAMPLE_MOVIES[0]?.poster,
    SAMPLE_MOVIES[5]?.poster,
    SAMPLE_MOVIES[2]?.poster
  ];

  return (
    <Container py="none" className="pb-16 md:pb-24 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      <div className="absolute right-[-10%] top-[-10%] w-[30%] h-[60%] rounded-full bg-ember/5 blur-[100px] pointer-events-none" />

      <div className="relative border border-themeBorder bg-surface/40 p-8 md:p-16 overflow-hidden rounded-sharp">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Cột trái: Nội dung & CTA */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col gap-6 items-center lg:items-start max-w-xl mx-auto lg:mx-0">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <Film className="w-4 h-4" />
              <span>Khởi đầu hành trình điện ảnh</span>
            </div>

            <h2 className="font-display font-black text-3xl md:text-5xl leading-tight uppercase text-text">
              Sẵn Sàng Cho Buổi Tối Xem Phim Tiếp Theo?
            </h2>

            <p className="text-muted text-sm md:text-base leading-relaxed">
              Khám phá hàng ngàn bộ phim điện ảnh bom tấn, phim bộ dài tập độc quyền và anime sinh động trên một nền tảng rạp phim trực tuyến duy nhất. Trải nghiệm không giới hạn ngay hôm nay.
            </p>

            <div className="mt-4 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto relative group overflow-hidden"
                icon={<Play className="w-4 h-4 fill-current ml-0.5" />}
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/10 -skew-x-12 -translate-x-full group-hover:animate-shine pointer-events-none" />
                <span>Bắt Đầu Xem Ngay</span>
              </Button>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted/80 mt-1">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Dùng thử miễn phí 7 ngày gói VIP Premium</span>
            </div>
          </div>

          {/* Cột phải: 3 Thẻ poster phim lơ lửng 3D */}
          <div className="lg:col-span-5 relative w-full h-[280px] sm:h-[350px] lg:h-[400px] flex items-center justify-center select-none mt-6 lg:mt-0">
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [-8, -6, -8]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ rotate: -8 }}
              className="absolute left-[10%] sm:left-[15%] lg:left-0 top-[10%] w-[120px] sm:w-[150px] aspect-[2/3] bg-card border border-themeBorder shadow-2xl overflow-hidden rounded-sharp z-10"
            >
              <img 
                src={displayPosters[0]} 
                alt="Movie poster background 1" 
                className="w-full h-full object-cover opacity-80"
              />
            </motion.div>

            <motion.div
              animate={{
                y: [-15, 0, -15],
                rotate: [2, 4, 2]
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ rotate: 3 }}
              className="absolute left-[35%] sm:left-[38%] lg:left-[32%] top-[5%] w-[130px] sm:w-[165px] aspect-[2/3] bg-card border border-primary/30 shadow-[0_0_30px_rgba(229,9,20,0.15)] overflow-hidden rounded-sharp z-25"
            >
              <img 
                src={displayPosters[1]} 
                alt="Movie poster background 2" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-primary/20 pointer-events-none rounded-sharp" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [10, 8, 10]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ rotate: 10 }}
              className="absolute right-[10%] sm:right-[15%] lg:right-4 top-[15%] w-[110px] sm:w-[140px] aspect-[2/3] bg-card border border-themeBorder shadow-2xl overflow-hidden rounded-sharp z-20"
            >
              <img 
                src={displayPosters[2]} 
                alt="Movie poster background 3" 
                className="w-full h-full object-cover opacity-70"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </Container>
  );
};
