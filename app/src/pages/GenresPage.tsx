import React from "react";
import { Link } from "react-router-dom";
import { Compass, Film, Tv, Flame, Heart, Smile, Sparkles } from "lucide-react";

/**
 * GenresPage - Trang danh sách thể loại phim.
 */
export const GenresPage: React.FC = () => {
  // Danh sách thể loại mẫu cho phim điện ảnh (movie) và phim truyền hình (tv)
  const movieGenres = [
    { id: 28, name: "Hành Động", icon: Flame, color: "from-red-500/10 to-red-500/30 text-red-500" },
    { id: 12, name: "Phiêu Lưu", icon: Compass, color: "from-blue-500/10 to-blue-500/30 text-blue-500" },
    { id: 16, name: "Hoạt Hình", icon: Sparkles, color: "from-purple-500/10 to-purple-500/30 text-purple-500" },
    { id: 35, name: "Hài Phước", icon: Smile, color: "from-yellow-500/10 to-yellow-500/30 text-yellow-500" },
    { id: 18, name: "Tâm Lý", icon: Heart, color: "from-pink-500/10 to-pink-500/30 text-pink-500" },
    { id: 878, name: "Khoa Học Viễn Tưởng", icon: Film, color: "from-emerald-500/10 to-emerald-500/30 text-emerald-500" }
  ];

  const tvGenres = [
    { id: 10759, name: "Hành Động & Phiêu Lưu", icon: Flame, color: "from-orange-500/10 to-orange-500/30 text-orange-500" },
    { id: 35, name: "Hài Kịch", icon: Smile, color: "from-yellow-500/10 to-yellow-500/30 text-yellow-500" },
    { id: 18, name: "Kịch Tính", icon: Heart, color: "from-pink-500/10 to-pink-500/30 text-pink-500" },
    { id: 968, name: "Bí Ẩn", icon: Compass, color: "from-indigo-500/10 to-indigo-500/30 text-indigo-500" },
    { id: 10765, name: "Sci-Fi & Fantasy", icon: Film, color: "from-teal-500/10 to-teal-500/30 text-teal-500" }
  ];

  return (
    <div className="container-custom py-10 min-h-[60vh]">
      <div className="border-b border-themeBorder/40 pb-6 mb-8">
        <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-text">
          DANH MỤC <span className="text-primary">THỂ LOẠI</span>
        </h1>
        <p className="text-muted text-sm mt-2">Duyệt tìm bộ phim yêu thích của bạn theo từng danh mục thể loại đặc thù.</p>
      </div>

      {/* Phim Điện Ảnh */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Film className="w-5 h-5 text-primary" />
          <h2 className="font-display font-bold text-xl text-text">Thể loại Phim Điện Ảnh</h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movieGenres.map((genre) => {
            const Icon = genre.icon;
            return (
              <Link
                key={genre.id}
                to={`/genre/movie/${genre.id}`}
                className={`relative flex flex-col items-center justify-center p-6 bg-surface border border-themeBorder rounded-sharp text-center transition-all duration-300 hover:border-primary group overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <Icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                <span className="text-xs font-bold text-text group-hover:text-primary transition-colors relative z-10">{genre.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Phim Truyền Hình */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Tv className="w-5 h-5 text-gold" />
          <h2 className="font-display font-bold text-xl text-text">Thể loại Phim Truyền Hình</h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {tvGenres.map((genre) => {
            const Icon = genre.icon;
            return (
              <Link
                key={genre.id}
                to={`/genre/tv/${genre.id}`}
                className={`relative flex flex-col items-center justify-center p-6 bg-surface border border-themeBorder rounded-sharp text-center transition-all duration-300 hover:border-primary group overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <Icon className="w-8 h-8 text-gold mb-3 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                <span className="text-xs font-bold text-text group-hover:text-gold transition-colors relative z-10">{genre.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GenresPage;
