import React from "react";
import { motion } from "framer-motion";
import { Play, Info, Star, Clock } from "lucide-react";
import type { Movie } from "../types/movie";

interface HeroProps {
  movie: Movie;
}

/**
 * Thành phần Hero chính cho CineFlow.
 * Thiết kế theo phong cách: "Massive Typographic & Depth Overlay"
 * - Nền đen huyền bí kèm hiệu ứng ánh sáng đỏ (Crimson) và vàng (Gold).
 * - Chữ tiêu đề khổng lồ chạy ẩn ở phía sau poster (Z-axis).
 * - Poster phim nổi bật ở mặt trước với hiệu ứng chuyển động lơ lửng (float).
 * - Nút bấm và đánh giá sao tinh tế đậm chất điện ảnh.
 */
export const Hero: React.FC<HeroProps> = ({ movie }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 px-4 md:py-24">
      
      {/* 
        Hình nền ngang (Backdrop Image) mờ mịt làm nền rạp chiếu
        Sử dụng mặt nạ gradient tuyến tính để hòa trộn mượt mà vào màu nền đen chủ đạo.
      */}
      <div className="absolute inset-0 z-0">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover opacity-25 filter blur-[2px]"
        />
        {/* Lớp phủ gradient hòa trộn bóng tối (Ambient Occlusion) */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
      </div>

      {/* 
        1. GIANT BACKGROUND TYPOGRAPHY (Chữ nền khổng lồ cực kỳ ấn tượng)
        Nằm ở z-index 10, chạy ngang phía sau poster để tạo chiều sâu rạp phim.
        Chữ bán trong suốt (opacity 5%) tạo nét brutalist huyền ảo.
      */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 select-none pointer-events-none z-10 overflow-hidden hidden md:block">
        <motion.h1 
          initial={{ x: "30%", opacity: 0 }}
          animate={{ x: "-10%", opacity: 0.05 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="font-display font-black text-[18vw] leading-none tracking-tighter uppercase whitespace-nowrap text-text select-none"
        >
          CINEFLOW
        </motion.h1>
      </div>

      {/* Container nội dung tương tác chính */}
      <div className="container-custom relative z-20 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* 
          Cột bên trái: Thông tin phim, điểm đánh giá và nút kêu gọi hành động (CTA)
          Thiết kế cấu trúc căn lề lệch tâm để tạo sức căng thị giác (Visual Tension).
        */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 max-w-2xl text-center lg:text-left z-30"
        >
          {/* Nhãn thể loại và năm phát hành */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6 text-sm">
            <span className="bg-primary/10 border border-primary/30 text-primary font-bold px-3 py-1 text-xs tracking-wider uppercase rounded-sharp">
              Phim nổi bật
            </span>
            <span className="text-muted font-medium flex items-center gap-1">
              <Clock className="w-4 h-4" /> {movie.duration}
            </span>
            <span className="text-muted font-medium">|</span>
            <span className="text-muted font-medium">{movie.releaseYear}</span>
            <span className="text-muted font-medium">|</span>
            <div className="flex items-center gap-1 text-gold">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold">{movie.rating}</span>
            </div>
          </div>

          {/* Tên phim (Title) khổng lồ */}
          <h2 className="font-display font-extrabold text-5xl md:text-7xl tracking-tight mb-6 leading-tight uppercase">
            {movie.title}
          </h2>

          {/* Mô tả tóm tắt nội dung */}
          <p className="text-muted text-base md:text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
            {movie.description}
          </p>

          {/* Danh sách Thể loại */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-10">
            {movie.genres.map((genre) => (
              <span key={genre} className="bg-surface border border-themeBorder text-muted px-4 py-1.5 text-xs font-semibold rounded-sharp">
                {genre}
              </span>
            ))}
          </div>

          {/* Bộ nút kêu gọi hành động (CTA Group) */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            {/* Nút Xem Ngay với hiệu ứng chuyển sắc đổ bóng đỏ rực rỡ */}
            <button className="group relative overflow-hidden bg-primary hover:bg-primary-dark text-text px-8 py-4 text-base font-bold tracking-wider uppercase border border-primary/50 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-3 rounded-sharp shadow-lg shadow-primary/20">
              <Play className="w-5 h-5 fill-current" />
              <span>Xem ngay</span>
            </button>

            {/* Nút Chi Tiết kiểu tối giản viền sắc cạnh */}
            <button className="border border-themeBorder bg-surface/40 hover:bg-surface hover:border-muted text-text px-8 py-4 text-base font-bold tracking-wider uppercase transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-3 rounded-sharp">
              <Info className="w-5 h-5" />
              <span>Chi tiết</span>
            </button>
          </div>
        </motion.div>

        {/* 
          Cột bên phải: Floating Poster Card (Poster phim lơ lửng)
          - Có hiệu ứng viền sắc nét chỉ 1px.
          - Có luồng sáng đỏ (glow-crimson) hắt lên từ chân poster.
          - Hiệu ứng nổi khối Z-axis nhờ Framer Motion hover 3D tilt giả lập.
        */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-72 h-[420px] md:w-80 md:h-[480px] flex-shrink-0 z-30 group"
        >
          {/* Hào quang đỏ hắt từ sau Poster */}
          <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 rounded-full" />
          
          {/* Lớp khung tranh sắc nét phong cách Brutalist */}
          <div className="absolute -inset-1 bg-gradient-to-b from-primary to-gold opacity-30 group-hover:opacity-75 blur-[2px] transition-all duration-500 rounded-sharp" />

          {/* Ảnh Poster chính với hiệu ứng Float lơ lửng đặc trưng */}
          <div className="relative w-full h-full bg-card border-2 border-themeBorder overflow-hidden animate-float rounded-sharp shadow-2xl">
            <img
              src={movie.posterUrl}
              alt={`${movie.title} Poster`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Lớp kính phản chiếu ánh sáng nghiêng rạp chiếu */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none opacity-40" />
          </div>
        </motion.div>

      </div>

      {/* Lớp hào quang góc dưới màn hình */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent z-25 pointer-events-none" />
    </section>
  );
};
