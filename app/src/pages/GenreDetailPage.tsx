import React from "react";
import { useParams, Link } from "react-router-dom";
import { Film, Star, ArrowLeft } from "lucide-react";

/**
 * GenreDetailPage - Trang chi tiết hiển thị danh sách phim theo thể loại cụ thể.
 */
export const GenreDetailPage: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();

  // Bản đồ tên thể loại (giả lập)
  const genreNames: Record<string, string> = {
    "28": "Hành Động",
    "12": "Phiêu Lưu",
    "16": "Hoạt Hình",
    "35": "Hài Hước",
    "18": "Tâm Lý",
    "878": "Khoa Học Viễn Tưởng",
    "10759": "Hành Động & Phiêu Lưu",
    "10765": "Sci-Fi & Fantasy"
  };

  const genreName = (id && genreNames[id]) || "Thể Loại Phim";
  const typeLabel = type === "movie" ? "Phim Điện Ảnh" : "Phim Truyền Hình";

  return (
    <div className="container-custom py-10 min-h-[60vh]">
      {/* Nút quay lại và tiêu đề thể loại */}
      <div className="border-b border-themeBorder/40 pb-6 mb-8">
        <Link 
          to="/genres" 
          className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-primary transition-colors uppercase tracking-wider mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Danh sách thể loại</span>
        </Link>
        
        <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-text uppercase">
          THỂ LOẠI: <span className="text-primary">{genreName}</span>
        </h1>
        <p className="text-muted text-sm mt-2">Danh sách các tác phẩm thuộc thể loại {genreName} của dòng {typeLabel}.</p>
      </div>

      {/* Grid danh sách phim */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {Array.from({ length: 12 }).map((_, idx) => (
          <Link
            key={idx}
            to={type === "movie" ? `/movie/${idx + 100}` : `/tv/${idx + 100}`}
            className="group relative bg-surface border border-themeBorder rounded-sharp overflow-hidden transition-all duration-300 hover:border-primary hover:-translate-y-1"
          >
            <div className="aspect-[2/3] w-full bg-themeBorder relative overflow-hidden flex items-center justify-center">
              <Film className="w-10 h-10 text-muted opacity-30 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              
              <span className="absolute top-2 right-2 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-sharp bg-black/60 backdrop-blur-sm border border-white/10 text-gold">
                {type === "movie" ? "Phim lẻ" : "Phim bộ"}
              </span>
            </div>
            
            <div className="p-3">
              <h3 className="font-bold text-xs text-text truncate group-hover:text-primary transition-colors">
                Tác Phẩm {genreName} #{idx + 1}
              </h3>
              <div className="flex items-center justify-between mt-2 text-[10px] text-muted">
                <span>2026</span>
                <div className="flex items-center gap-0.5 text-gold">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  <span>8.2</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenreDetailPage;
