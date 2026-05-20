import React from "react";
import { Link } from "react-router-dom";
import { Film, Tv } from "lucide-react";
import { useGenres } from "../hooks/useGenres";
import { getGenreStyle } from "../config/genreStyles";
import { Button, Badge } from "../components";

export const GenresPage: React.FC = () => {
  const { movieGenres, tvGenres, loading, error } = useGenres();

  // 1. GIAO DIỆN ĐANG TẢI (SKELETONS)
  if (loading) {
    return (
      <div className="container-custom py-10 min-h-[60vh]">
        <div className="border-b border-themeBorder/40 pb-6 mb-8">
          <div className="h-10 w-64 bg-themeBorder rounded-sharp animate-pulse mb-3" />
          <div className="h-4 w-96 bg-themeBorder/60 rounded-sharp animate-pulse" />
        </div>

        {/* Skeleton cho Movie Genres */}
        <div className="mb-12">
          <div className="h-6 w-48 bg-themeBorder rounded-sharp animate-pulse mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="h-32 bg-surface border border-themeBorder rounded-sharp animate-pulse" />
            ))}
          </div>
        </div>

        {/* Skeleton cho TV Genres */}
        <div>
          <div className="h-6 w-48 bg-themeBorder rounded-sharp animate-pulse mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="h-32 bg-surface border border-themeBorder rounded-sharp animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. GIAO DIỆN LỖI (ERROR STATE)
  if (error) {
    return (
      <div className="container-custom py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="p-4 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
          <Film className="w-12 h-12" />
        </div>
        <h2 className="font-display font-bold text-xl text-text mb-2">Đã xảy ra lỗi</h2>
        <p className="text-muted text-sm max-w-md">{error}</p>
        <Button 
          onClick={() => window.location.reload()}
          variant="primary"
          size="sm"
          className="mt-6 font-bold"
        >
          Tải lại trang
        </Button>
      </div>
    );
  }

  // 3. GIAO DIỆN CHÍNH THỨC
  return (
    <div className="container-custom py-10 min-h-[60vh]">
      <div className="border-b border-themeBorder/40 pb-6 mb-8">
        <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-text">
          DANH MỤC <span className="text-primary">THỂ LOẠI</span>
        </h1>
        <p className="text-muted text-sm mt-2">Duyệt tìm bộ phim yêu thích của bạn theo từng danh mục thể loại đặc thù.</p>
      </div>

      {/* Phim Điện Ảnh (Movie Genres) */}
      {movieGenres.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Film className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-xl text-text">Thể loại Phim Điện Ảnh</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movieGenres.map((genre) => {
              const style = getGenreStyle(genre.id, true);
              const Icon = style.icon;
              return (
                <Link
                  key={genre.id}
                  to={`/genre/movie/${genre.id}`}
                  className={`group relative flex flex-col items-start justify-between p-6 bg-surface/40 backdrop-blur-md border border-themeBorder/80 rounded-sharp transition-all duration-300 ${style.glowClass} overflow-hidden min-h-[140px]`}
                >
                  {/* Badge định dạng ở góc phải trên */}
                  <Badge
                    variant="primary"
                    size="sm"
                    className="absolute top-4 right-4 text-[9px]"
                  >
                    Phim lẻ
                  </Badge>

                  <div className="flex flex-col gap-2 relative z-10 w-full pr-12">
                    <Icon className={`w-8 h-8 ${style.color} group-hover:scale-110 transition-transform duration-300`} />
                    <span className="text-base font-bold text-text group-hover:text-primary transition-colors mt-2">
                      {genre.name}
                    </span>
                    <span className="text-xs text-muted leading-relaxed line-clamp-2">
                      {style.desc}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Phim Truyền Hình (TV Genres) */}
      {tvGenres.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Tv className="w-5 h-5 text-gold" />
            <h2 className="font-display font-bold text-xl text-text">Thể loại Phim Truyền Hình</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tvGenres.map((genre) => {
              const style = getGenreStyle(genre.id, false);
              const Icon = style.icon;
              return (
                <Link
                  key={genre.id}
                  to={`/genre/tv/${genre.id}`}
                  className={`group relative flex flex-col items-start justify-between p-6 bg-surface/40 backdrop-blur-md border border-themeBorder/80 rounded-sharp transition-all duration-300 ${style.glowClass} overflow-hidden min-h-[140px]`}
                >
                  {/* Badge định dạng ở góc phải trên */}
                  <Badge
                    variant="gold"
                    size="sm"
                    className="absolute top-4 right-4 text-[9px]"
                  >
                    Phim bộ
                  </Badge>

                  <div className="flex flex-col gap-2 relative z-10 w-full pr-12">
                    <Icon className={`w-8 h-8 ${style.color} group-hover:scale-110 transition-transform duration-300`} />
                    <span className="text-base font-bold text-text group-hover:text-gold transition-colors mt-2">
                      {genre.name}
                    </span>
                    <span className="text-xs text-muted leading-relaxed line-clamp-2">
                      {style.desc}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenresPage;
