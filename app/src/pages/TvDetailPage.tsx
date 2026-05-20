import React from "react";
import { useParams, Link } from "react-router-dom";
import { Play, Plus, Star, Heart, Calendar, Clock, Globe, ArrowLeft } from "lucide-react";

/**
 * TvDetailPage - Trang chi tiết phim truyền hình.
 */
export const TvDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen pb-16">
      {/* Backdrop Banner */}
      <div className="relative h-[40vh] md:h-[60vh] bg-themeBorder overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/60 z-10" />
        
        <Link 
          to="/tv" 
          className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-sharp text-xs font-bold uppercase tracking-wider text-text hover:bg-gold hover:border-gold hover:text-background transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Danh sách phim bộ</span>
        </Link>

        <div className="w-full h-full flex items-center justify-center bg-surface/45">
          <Globe className="w-16 h-16 text-muted animate-pulse" />
        </div>
      </div>

      {/* Info Content Section */}
      <div className="container-custom relative z-20 -mt-32 md:-mt-48">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Poster */}
          <div className="w-48 md:w-64 aspect-[2/3] bg-surface border border-themeBorder/80 rounded-sharp overflow-hidden flex-shrink-0 shadow-2xl relative group">
            <div className="w-full h-full flex items-center justify-center">
              <Globe className="w-12 h-12 text-muted opacity-40" />
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Play className="w-12 h-12 text-gold fill-current" />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 text-left md:pt-24">
            <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-text leading-tight">
              SERIES TRUYỀN HÌNH <span className="text-gold">#{id}</span>
            </h1>
            <h2 className="text-sm md:text-base text-muted font-medium mt-1">
              TV Series Detail Placeholder / ID: {id}
            </h2>

            {/* Quick stats */}
            <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-muted font-medium">
              <div className="flex items-center gap-1 text-gold">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-text">9.1</span> / 10
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>2026</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>10 tập (Mùa 1)</span>
              </div>
            </div>

            {/* Overview */}
            <p className="mt-6 text-sm md:text-base text-muted leading-relaxed max-w-3xl">
              Chào mừng bạn đến với trang thông tin chi tiết phim bộ dài tập của CineFlow. Tại đây hiển thị cấu trúc các mùa phát sóng (Seasons) và danh sách chi tiết các tập phim (Episodes), kèm theo chất lượng trình chiếu. Ở các bước phát triển sau, CineFlow sẽ tích hợp đầy đủ API để cung cấp thông tin động chính xác từ TMDB.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                to={`/watch/tv/${id}`}
                className="flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold/80 text-background text-sm font-bold uppercase tracking-wider rounded-sharp shadow-lg shadow-gold/20 transition-all duration-300"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Xem Phim</span>
              </Link>
              
              <button className="flex items-center gap-2 px-4 py-3 bg-surface hover:bg-themeBorder border border-themeBorder text-text text-sm font-bold uppercase tracking-wider rounded-sharp transition-all duration-300">
                <Plus className="w-4 h-4" />
                <span>Thêm vào Watchlist</span>
              </button>

              <button className="flex items-center justify-center w-12 h-12 bg-surface hover:bg-themeBorder border border-themeBorder rounded-sharp transition-all duration-300">
                <Heart className="w-4 h-4 text-gold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvDetailPage;
