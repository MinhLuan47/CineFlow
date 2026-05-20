import React from "react";
import { useParams, Link } from "react-router-dom";
import { Play, Plus, Star, Heart, Calendar, Clock, Globe, ArrowLeft } from "lucide-react";

/**
 * MovieDetailPage - Trang chi tiết phim điện ảnh hiển thị thông tin, danh sách diễn viên, trailer và phim gợi ý liên quan.
 */
export const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen pb-16">
      {/* Nút quay lại và Banner phim backdrop */}
      <div className="relative h-[40vh] md:h-[60vh] bg-themeBorder overflow-hidden">
        {/* Lớp phủ đen phía trên */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/60 z-10" />
        
        {/* Nút quay lại */}
        <Link 
          to="/" 
          className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-sharp text-xs font-bold uppercase tracking-wider text-text hover:bg-primary hover:border-primary transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </Link>

        {/* Khung ảnh nền (Backdrop) */}
        <div className="w-full h-full flex items-center justify-center bg-surface/40">
          <Globe className="w-16 h-16 text-muted animate-pulse" />
        </div>
      </div>

      {/* Thông tin chi tiết phim */}
      <div className="container-custom relative z-20 -mt-32 md:-mt-48">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Ảnh Poster phim */}
          <div className="w-48 md:w-64 aspect-[2/3] bg-surface border border-themeBorder/80 rounded-sharp overflow-hidden flex-shrink-0 shadow-2xl relative group">
            <div className="w-full h-full flex items-center justify-center">
              <Globe className="w-12 h-12 text-muted opacity-40" />
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Play className="w-12 h-12 text-primary fill-current" />
            </div>
          </div>

          {/* Chi tiết nội dung văn bản */}
          <div className="flex-1 text-left md:pt-24">
            <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-text leading-tight">
              CHI TIẾT PHIM <span className="text-primary">#{id}</span>
            </h1>
            <h2 className="text-sm md:text-base text-muted font-medium mt-1">
              Movie Detail Placeholder / ID: {id}
            </h2>

            {/* Thống kê nhanh */}
            <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-muted font-medium">
              <div className="flex items-center gap-1 text-gold">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-text">8.7</span> / 10
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>2026</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>148 phút</span>
              </div>
            </div>

            {/* Tóm tắt */}
            <p className="mt-6 text-sm md:text-base text-muted leading-relaxed max-w-3xl">
              Đây là trang chi tiết phim điện ảnh của CineFlow. Giao diện hiển thị các thông tin tổng quan, mô tả tóm tắt nội dung cốt truyện, ê-kíp sản xuất và danh sách diễn viên tham gia diễn xuất. Trong giai đoạn tiếp theo, CineFlow sẽ tích hợp các nguồn API dữ liệu thật từ máy chủ proxy để hiển thị đầy đủ thông tin này.
            </p>

            {/* Các nút hành động */}
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                to={`/watch/movie/${id}`}
                className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-text text-sm font-bold uppercase tracking-wider rounded-sharp shadow-lg shadow-primary/20 transition-all duration-300"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Xem Ngay</span>
              </Link>
              
              <button className="flex items-center gap-2 px-4 py-3 bg-surface hover:bg-themeBorder border border-themeBorder text-text text-sm font-bold uppercase tracking-wider rounded-sharp transition-all duration-300">
                <Plus className="w-4 h-4" />
                <span>Danh sách phát</span>
              </button>

              <button className="flex items-center justify-center w-12 h-12 bg-surface hover:bg-themeBorder border border-themeBorder rounded-sharp transition-all duration-300">
                <Heart className="w-4 h-4 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
