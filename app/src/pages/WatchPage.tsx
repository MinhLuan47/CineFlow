import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Play, ArrowLeft, Tv, Film, Star, Share2, Info } from "lucide-react";

/**
 * WatchPage - Trang xem phim rạp với trình phát video chất lượng cao giả lập.
 */
export const WatchPage: React.FC = () => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const location = useLocation();
  
  const isTv = type === "tv" || location.pathname.includes("/watch/tv/");
  const typeLabel = isTv ? "Phim Bộ" : "Phim Lẻ";

  return (
    <div className="container-custom py-8">
      {/* Nút quay lại chi tiết */}
      <div className="mb-6">
        <Link 
          to={isTv ? `/tv/${id}` : `/movie/${id}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-primary transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại trang chi tiết</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trình phát phim chính */}
        <div className="lg:col-span-2">
          {/* Màn hình trình chiếu */}
          <div className="relative aspect-video w-full bg-black border border-themeBorder/60 rounded-sharp overflow-hidden flex items-center justify-center group shadow-2xl">
            {/* Lớp phủ màn hình */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />
            
            {/* Icon lớn giả lập */}
            <div className="flex flex-col items-center gap-4 text-center z-10">
              <div className="w-16 h-16 bg-primary/20 border border-primary/40 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-primary fill-current" />
              </div>
              <p className="text-sm font-bold tracking-wide text-text/80">Trình phát phim CineFlow Player Simulator</p>
              <span className="text-[10px] uppercase font-black tracking-widest text-muted px-2 py-0.5 bg-themeBorder/40 rounded-sharp">
                Chất lượng: UHD 4K
              </span>
            </div>

            {/* Điều khiển trình phát mẫu ở góc dưới */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-muted z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>0:00 / 2:28:00</span>
              <span>100% Volume</span>
            </div>
          </div>

          {/* Tiêu đề & Thông tin nhanh bên dưới trình phát */}
          <div className="mt-6 text-left">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-sharp">
                {typeLabel}
              </span>
              <span className="text-xs text-muted">ID: {id}</span>
            </div>
            
            <h1 className="font-display font-extrabold text-2xl md:text-3xl mt-2 text-text">
              Đang phát: Siêu Phẩm {typeLabel} #{id}
            </h1>
            
            <div className="flex items-center gap-6 mt-4 text-xs text-muted border-b border-themeBorder/20 pb-6">
              <div className="flex items-center gap-1 text-gold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold text-text">8.8</span>
              </div>
              <span>•</span>
              <span>2026</span>
              <span>•</span>
              <span>Thuyết Minh / Vietsub</span>
            </div>

            {/* Mô tả */}
            <div className="mt-6">
              <h3 className="text-xs font-black uppercase text-muted tracking-wider mb-2">Tóm tắt nội dung</h3>
              <p className="text-sm text-muted leading-relaxed">
                Trình phát video đang hiển thị ở trạng thái mô phỏng. CineFlow hỗ trợ stream các tập phim với băng thông rộng thông qua các máy chủ lưu trữ nhanh. Hệ thống sẽ liên kết trực tiếp để load player trong các bản phát hành tiếp theo.
              </p>
            </div>
          </div>
        </div>

        {/* Danh sách tập phim hoặc gợi ý xem tiếp bên phải */}
        <div className="space-y-6">
          <div className="border border-themeBorder bg-surface p-6 rounded-sharp text-left">
            <h2 className="font-display font-bold text-lg text-text mb-4 flex items-center gap-2">
              {isTv ? <Tv className="w-5 h-5 text-gold" /> : <Film className="w-5 h-5 text-primary" />}
              <span>{isTv ? "Danh sách tập phim" : "Phim đề cử xem tiếp"}</span>
            </h2>

            {isTv ? (
              /* Danh sách tập phim */
              <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-1">
                {Array.from({ length: 10 }).map((_, idx) => (
                  <button
                    key={idx}
                    className={`h-10 text-xs font-bold rounded-sharp border transition-all ${
                      idx === 0
                        ? "bg-gold border-gold text-background"
                        : "bg-background border-themeBorder text-text hover:border-gold/60"
                    }`}
                  >
                    Tập {idx + 1}
                  </button>
                ))}
              </div>
            ) : (
              /* Danh sách phim đề cử liên quan */
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Link
                    key={idx}
                    to={`/watch/movie/${idx + 500}`}
                    className="flex gap-3 p-2 hover:bg-background border border-transparent hover:border-themeBorder rounded-sharp transition-all group"
                  >
                    <div className="w-16 aspect-video bg-themeBorder rounded-sharp overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <Play className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-text truncate group-hover:text-primary transition-colors">
                        Phim Đề Cử Xem Tiếp #{idx + 1}
                      </h4>
                      <span className="text-[10px] text-muted block mt-1">128 phút • 2026</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Các nút chia sẻ nhanh */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-surface hover:bg-themeBorder border border-themeBorder rounded-sharp text-xs font-bold text-text transition-all">
              <Share2 className="w-4 h-4" />
              <span>Chia sẻ</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-surface hover:bg-themeBorder border border-themeBorder rounded-sharp text-xs font-bold text-text transition-all">
              <Info className="w-4 h-4" />
              <span>Báo lỗi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
