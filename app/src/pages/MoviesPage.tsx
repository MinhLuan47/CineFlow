import React from "react";
import { useParams, Link } from "react-router-dom";
import { Film, Flame, Star, Calendar, Layers } from "lucide-react";

/**
 * MoviesPage - Trang khám phá và phân loại danh sách phim điện ảnh.
 */
export const MoviesPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  
  // Xác định thông tin danh mục hiện tại dựa trên param
  const activeCategory = category || "trending";
  
  const categories = [
    { id: "trending", label: "Xu Hướng", icon: Flame, desc: "Phim được xem nhiều và quan tâm nhất hôm nay." },
    { id: "popular", label: "Phổ Biến", icon: Layers, desc: "Những tác phẩm được yêu thích rộng rãi bởi khán giả." },
    { id: "now-playing", label: "Đang Chiếu", icon: Film, desc: "Phim điện ảnh mới đang chiếu tại rạp." },
    { id: "top-rated", label: "Đánh Giá Cao", icon: Star, desc: "Được chấm điểm cao nhất bởi giới phê bình và khán giả." },
    { id: "upcoming", label: "Sắp Chiếu", icon: Calendar, desc: "Các siêu phẩm hứa hẹn sẽ đổ bộ phòng vé trong thời gian tới." }
  ];

  const currentCat = categories.find(c => c.id === activeCategory) || categories[0];

  return (
    <div className="container-custom py-10 min-h-[60vh]">
      {/* Tiêu đề trang */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-themeBorder/40 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
            <currentCat.icon className="w-4 h-4 text-gold" />
            <span>Phim Điện Ảnh / {currentCat.label}</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-text">
            KHO PHIM <span className="text-primary">{currentCat.label.toUpperCase()}</span>
          </h1>
          <p className="text-muted text-sm mt-2 max-w-2xl">{currentCat.desc}</p>
        </div>

        {/* Bộ lọc danh mục */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isActive = cat.id === activeCategory;
            return (
              <Link
                key={cat.id}
                to={cat.id === "trending" ? "/movies" : `/movies/${cat.id}`}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sharp border transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-text border-primary shadow-lg shadow-primary/20"
                    : "bg-surface border-themeBorder text-muted hover:border-primary/40 hover:text-text"
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Grid danh sách phim giả lập / Placeholder */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div 
            key={idx} 
            className="group relative bg-surface border border-themeBorder rounded-sharp overflow-hidden transition-all duration-300 hover:border-primary hover:-translate-y-1"
          >
            <div className="aspect-[2/3] w-full bg-themeBorder relative overflow-hidden flex items-center justify-center">
              <Film className="w-10 h-10 text-muted opacity-30 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>
            
            <div className="p-3">
              <h3 className="font-bold text-xs text-text truncate group-hover:text-primary transition-colors">
                Siêu Phẩm Điện Ảnh #{idx + 1}
              </h3>
              <div className="flex items-center justify-between mt-2 text-[10px] text-muted">
                <span>2026</span>
                <div className="flex items-center gap-0.5 text-gold">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  <span>8.5</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
