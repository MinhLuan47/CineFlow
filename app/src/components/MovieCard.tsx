import React from "react";
import { Play, Star, Eye } from "lucide-react";
import type { Movie } from "../types/movie";
import { Badge } from "./ui";

interface MovieCardProps {
  movie?: Movie;
  loading?: boolean;
}

/**
 * Thành phần MovieCard (Thẻ Phim) có khả năng tái sử dụng cao.
 * Thiết kế đáp ứng các yêu cầu:
 * - Ảnh poster chuẩn tỉ lệ dọc 2:3 với hiệu ứng thu phóng mượt mà khi hover.
 * - Tiêu đề chính và tiêu đề gốc của phim.
 * - Thể loại và năm phát hành.
 * - Huy hiệu chất lượng (quality) và điểm đánh giá (rating).
 * - Lớp phủ hover (Watch Now) mượt mà tích hợp nút "Xem ngay".
 * - Hỗ trợ hiển thị Skeleton Shimmer khi đang tải dữ liệu (loading: true).
 */
export const MovieCard: React.FC<MovieCardProps> = ({ movie, loading = false }) => {
  
  // 1. GIAO DIỆN SKELETON (Khi đang tải dữ liệu)
  if (loading || !movie) {
    return (
      <div className="w-full flex flex-col gap-3 animate-pulse">
        {/* Khung poster giả lập hiệu ứng shimmer */}
        <div className="aspect-[2/3] w-full bg-themeBorder rounded-sharp relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
        {/* Tên phim giả lập */}
        <div className="h-4 w-3/4 bg-themeBorder rounded-sharp relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
        {/* Dòng mô tả phụ giả lập */}
        <div className="h-3 w-1/2 bg-themeBorder/60 rounded-sharp relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
      </div>
    );
  }

  // Định dạng lượt xem cho đẹp (ví dụ: 124.5k)
  const formatViews = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count.toString();
  };

  // 2. GIAO DIỆN CHÍNH THỨC CỦA THẺ PHIM
  return (
    <div className="group relative w-full flex flex-col gap-3 cursor-pointer">
      
      {/* Khung Poster */}
      <div className="relative aspect-[2/3] w-full overflow-hidden border border-themeBorder bg-surface rounded-sharp transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(229,9,20,0.15)]">
        
        {/* Hình ảnh poster - Zoom nhẹ khi hover */}
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Lớp phủ chuyển màu tối bảo vệ các huy hiệu */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-70" />

        {/* 
          Huy hiệu điểm đánh giá (Rating Badge) - Góc trái phía trên
          Thiết kế kính mờ Glassmorphism.
        */}
        <Badge
          variant="gold"
          size="sm"
          className="absolute top-2.5 left-2.5 bg-background/80 backdrop-blur-md border-themeBorder/60 px-2 text-[10px] font-black flex items-center gap-1"
        >
          <Star className="w-3 h-3 fill-current" />
          <span>{movie.rating.toFixed(1)}</span>
        </Badge>

        {/* Huy hiệu Chất lượng (Quality Badge) - Góc right phía trên */}
        <Badge
          variant="primary"
          size="sm"
          className="absolute top-2.5 right-2.5 bg-primary/95 text-text font-black text-[9px] uppercase tracking-wider px-2"
        >
          {movie.quality}
        </Badge>

        {/* Huy hiệu Phụ đề - Góc trái phía dưới */}
        <Badge
          variant="outline"
          size="sm"
          className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-md border border-themeBorder/40 text-text/90 text-[10px]"
        >
          {movie.subtitle}
        </Badge>

        {/* Số lượt xem - Góc phải phía dưới */}
        <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-muted text-[10px] flex items-center gap-1 px-1.5 py-0.5 rounded-sharp">
          <Eye className="w-3 h-3" />
          <span>{formatViews(movie.views)}</span>
        </div>

        {/* 
          LỚP PHỦ HOVER CHI TIẾT (Hover Overlay)
          Hiện ra mượt mà và chuyển đổi các nút bấm.
        */}
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center">
          
          {/* Nút Xem ngay dạng tròn rực rỡ */}
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-text shadow-lg shadow-primary/30 transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 delay-75 hover:bg-primary-dark">
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </div>

          <span className="mt-3 text-xs font-bold uppercase tracking-widest text-text transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
            Xem ngay
          </span>

          {/* Mô tả tóm tắt siêu ngắn trong hover */}
          <p className="mt-4 text-[10px] text-muted line-clamp-3 px-2 leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-150">
            {movie.description}
          </p>

        </div>

      </div>

      {/* Thông tin chữ bên dưới thẻ phim */}
      <div className="flex flex-col gap-1">
        
        {/* Tên Tiếng Việt */}
        <h3 className="font-display font-bold text-sm text-text leading-tight group-hover:text-primary transition-colors line-clamp-1">
          {movie.title}
        </h3>

        {/* Tên gốc / Tên tiếng Anh gốc */}
        <span className="text-[10px] text-muted font-medium line-clamp-1">
          {movie.originalTitle}
        </span>

        {/* Thông tin phụ: Thể loại chính & Năm */}
        <div className="flex items-center gap-1.5 text-xs text-muted/80 mt-1">
          <span>{movie.genre[0]}</span>
          <span className="w-1 h-1 bg-muted/40 rounded-full" />
          <span>{movie.year}</span>
          <span className="w-1 h-1 bg-muted/40 rounded-full" />
          <span>{movie.duration}</span>
        </div>

      </div>

    </div>
  );
};
