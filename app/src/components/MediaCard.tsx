import React from "react";
import { Link } from "react-router-dom";
import { Play, Star } from "lucide-react";
import type { NormalizedMovie, NormalizedTvSeries } from "../types/api";
import { Badge } from "./ui";

interface MediaCardProps {
  item?: NormalizedMovie | NormalizedTvSeries;
  loading?: boolean;
}

/**
 * Thành phần MediaCard (Thẻ Phim Đa năng) - Dùng chung cho cả Phim lẻ (Movie) và Phim bộ (TV Series).
 * Hỗ trợ hiển thị Skeleton Shimmer khi đang tải dữ liệu (loading: true).
 */
export const MediaCard: React.FC<MediaCardProps> = ({ item, loading = false }) => {
  
  // 1. GIAO DIỆN SKELETON (Khi đang tải dữ liệu)
  if (loading || !item) {
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

  const isMovie = item.mediaType === "movie";
  
  // Trích xuất các trường chuẩn hóa dựa trên loại hình media
  const id = item.id;
  const title = isMovie ? (item as NormalizedMovie).title : (item as NormalizedTvSeries).name;
  const subtitle = isMovie ? (item as NormalizedMovie).originalTitle : (item as NormalizedTvSeries).originalName;
  const posterUrl = item.posterUrl || "";
  const voteAverage = item.voteAverage;
  const year = item.year;
  const overview = item.overview || "";
  const genres = item.genres || [];
  
  // Thiết lập chất lượng mặc định và ngôn ngữ phụ đề
  const quality = isMovie ? (item as NormalizedMovie).quality : "FHD";
  const subtitleLanguages = isMovie 
    ? (item as NormalizedMovie).subtitleLanguages 
    : ["Vietsub"];
  const subtitleLabel = subtitleLanguages.length > 0 ? subtitleLanguages[0] : "Vietsub";

  const detailUrl = isMovie ? `/movie/${id}` : `/tv/${id}`;

  // 2. GIAO DIỆN CHÍNH THỨC CỦA THẺ PHIM
  return (
    <Link to={detailUrl} className="group relative w-full flex flex-col gap-3 cursor-pointer">
      
      {/* Khung Poster */}
      <div className="relative aspect-[2/3] w-full overflow-hidden border border-themeBorder bg-surface rounded-sharp transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(229,9,20,0.15)]">
        
        {/* Hình ảnh poster - Zoom nhẹ khi hover */}
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-muted text-xs">
            Không có ảnh
          </div>
        )}

        {/* Lớp phủ chuyển màu tối bảo vệ các huy hiệu */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-70" />

        {/* Huy hiệu điểm đánh giá (Rating Badge) - Góc trái phía trên */}
        <Badge
          variant="gold"
          size="sm"
          className="absolute top-2.5 left-2.5 bg-background/80 backdrop-blur-md border-themeBorder/60 px-2 text-[10px] font-black flex items-center gap-1"
        >
          <Star className="w-3 h-3 fill-current" />
          <span>{voteAverage ? voteAverage.toFixed(1) : "0.0"}</span>
        </Badge>

        {/* Huy hiệu Chất lượng (Quality Badge) - Góc right phía trên */}
        <Badge
          variant="primary"
          size="sm"
          className="absolute top-2.5 right-2.5 bg-primary/95 text-text font-black text-[9px] uppercase tracking-wider px-2"
        >
          {quality}
        </Badge>

        {/* Huy hiệu Phụ đề - Góc trái phía dưới */}
        <Badge
          variant="outline"
          size="sm"
          className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-md border border-themeBorder/40 text-text/90 text-[10px]"
        >
          {subtitleLabel}
        </Badge>

        {/* Huy hiệu Phân loại Movie/TV - Góc phải phía dưới */}
        <Badge
          variant={isMovie ? "primary" : "gold"}
          size="sm"
          className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-[9px] font-black uppercase tracking-wider px-1.5 border border-white/5"
        >
          {isMovie ? "Phim lẻ" : "Phim bộ"}
        </Badge>

        {/* LỚP PHỦ HOVER CHI TIẾT */}
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center">
          
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-text shadow-lg shadow-primary/30 transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 delay-75 hover:bg-primary-dark">
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </div>

          <span className="mt-3 text-xs font-bold uppercase tracking-widest text-text transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
            Xem ngay
          </span>

          <p className="mt-4 text-[10px] text-muted line-clamp-3 px-2 leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-150">
            {overview}
          </p>

        </div>

      </div>

      {/* Thông tin chữ bên dưới thẻ phim */}
      <div className="flex flex-col gap-1">
        
        {/* Tên Phim */}
        <h3 className="font-display font-bold text-sm text-text leading-tight group-hover:text-primary transition-colors line-clamp-1">
          {title}
        </h3>

        {/* Tên gốc */}
        <span className="text-[10px] text-muted font-medium line-clamp-1">
          {subtitle}
        </span>

        {/* Thể loại chính & Năm */}
        <div className="flex items-center gap-1.5 text-xs text-muted/80 mt-1">
          <span>{genres.length > 0 ? genres[0] : (isMovie ? "Phim lẻ" : "Phim bộ")}</span>
          <span className="w-1 h-1 bg-muted/40 rounded-full" />
          <span>{year || "N/A"}</span>
        </div>

      </div>

    </Link>
  );
};
export default MediaCard;
