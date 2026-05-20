import React from "react";
import { Link } from "react-router-dom";
import { Play, Trash2, Film } from "lucide-react";

/**
 * WatchlistPage - Trang danh sách phim yêu thích lưu trữ (Watchlist).
 */
export const WatchlistPage: React.FC = () => {
  return (
    <div className="container-custom py-10 min-h-[60vh] text-left">
      <div className="border-b border-themeBorder/40 pb-6 mb-8">
        <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-text">
          DANH SÁCH <span className="text-primary">LƯU TRỮ</span>
        </h1>
        <p className="text-muted text-sm mt-2">Nơi lưu trữ các bộ phim điện ảnh và truyền hình bạn mong muốn thưởng thức.</p>
      </div>

      {/* Danh sách phim lưu trữ trống / Danh sách giả lập */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div 
            key={idx}
            className="flex items-center gap-4 p-4 bg-surface border border-themeBorder rounded-sharp hover:border-primary/55 transition-all duration-300 group"
          >
            {/* Ảnh đại diện thu nhỏ */}
            <div className="w-16 h-24 bg-themeBorder rounded-sharp overflow-hidden flex-shrink-0 flex items-center justify-center relative">
              <Film className="w-6 h-6 text-muted opacity-40" />
            </div>

            {/* Thông tin phim */}
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-black uppercase text-gold bg-gold/10 px-1.5 py-0.5 rounded-sharp">
                Phim Điện Ảnh
              </span>
              <h3 className="font-bold text-sm text-text truncate mt-2 group-hover:text-primary transition-colors">
                Bộ Phim Lưu Trữ #{idx + 1}
              </h3>
              <p className="text-xs text-muted mt-1">2 giờ 15 phút • Đánh giá: 8.6</p>
            </div>

            {/* Các nút hành động */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                to={`/movie/${idx + 800}`}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-primary hover:bg-primary-hover text-text text-[11px] font-bold uppercase tracking-wider rounded-sharp transition-all duration-300"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Xem</span>
              </Link>
              
              <button 
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-background hover:bg-red-500/10 border border-themeBorder hover:border-red-500/30 rounded-sharp text-muted hover:text-red-500 transition-all duration-300"
                title="Xóa khỏi danh sách"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchlistPage;
