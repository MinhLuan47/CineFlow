import React from "react";
import { Link } from "react-router-dom";
import { 
  Flame, Compass, Sparkles, Smile, Shield, BookOpen, Heart, Home, 
  Landmark, Skull, Music, Eye, Rocket, Tv, Zap, Swords, HelpCircle, Film 
} from "lucide-react";
import { useGenres } from "../hooks/useGenres";

// Định nghĩa kiểu dữ liệu cho Style ánh xạ
interface GenreStyle {
  icon: React.ComponentType<any>;
  color: string;
  glowClass: string;
  desc: string;
}

// Bộ ánh xạ icon, màu sắc và mô tả động cho từng ID Thể loại.
// TUYỆT ĐỐI KHÔNG DÙNG MÀU TÍM/VIOLET (Purple Ban).
const MOVIE_GENRE_STYLES: Record<number, GenreStyle> = {
  28: { icon: Flame, color: "text-red-500", glowClass: "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70", desc: "Pha hành động nghẹt thở, rượt đuổi kịch tính." },
  12: { icon: Compass, color: "text-blue-500", glowClass: "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70", desc: "Hành trình phiêu lưu khám phá vùng đất mới." },
  16: { icon: Sparkles, color: "text-cyan-400", glowClass: "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70", desc: "Thế giới hoạt họa rực rỡ sắc màu cho mọi lứa tuổi." },
  35: { icon: Smile, color: "text-yellow-500", glowClass: "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70", desc: "Câu chuyện hài hước đem lại tiếng cười sảng khoái." },
  80: { icon: Shield, color: "text-indigo-400", glowClass: "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70", desc: "Các vụ án ly kỳ và thế giới tội phạm ngầm bí ẩn." },
  99: { icon: BookOpen, color: "text-stone-400", glowClass: "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70", desc: "Những bộ phim tài liệu phản ánh chân thực cuộc sống." },
  18: { icon: Heart, color: "text-rose-500", glowClass: "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70", desc: "Kịch tính tâm lý sâu lắng nhiều cảm xúc lắng đọng." },
  10751: { icon: Home, color: "text-emerald-400", glowClass: "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70", desc: "Phim ấm áp thích hợp cho cả gia đình xem cùng nhau." },
  14: { icon: Sparkles, color: "text-orange-500", glowClass: "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70", desc: "Thế giới phép thuật huyền bí và kỳ ảo không giới hạn." },
  36: { icon: Landmark, color: "text-amber-500", glowClass: "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70", desc: "Dựa trên những sự kiện lịch sử có thật đầy hùng tráng." },
  27: { icon: Skull, color: "text-red-500", glowClass: "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70", desc: "Các hiện tượng giật gân, siêu nhiên và kinh sợ." },
  10402: { icon: Music, color: "text-sky-400", glowClass: "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70", desc: "Những giai điệu âm nhạc cuốn hút và thăng hoa." },
  9648: { icon: Eye, color: "text-teal-400", glowClass: "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70", desc: "Các câu hỏi bí ẩn, trinh thám suy luận hack não." },
  10749: { icon: Heart, color: "text-pink-500", glowClass: "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70", desc: "Tình yêu lãng mạn ngọt ngào rung động mọi trái tim." },
  878: { icon: Rocket, color: "text-teal-300", glowClass: "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70", desc: "Công nghệ tương lai, vũ trụ và khoa học giả tưởng." },
  10770: { icon: Tv, color: "text-slate-400", glowClass: "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70", desc: "Phim truyện đặc biệt được sản xuất riêng cho truyền hình." },
  53: { icon: Zap, color: "text-orange-400", glowClass: "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70", desc: "Hồi hộp, kịch tính tột độ với các cú twist bất ngờ." },
  10752: { icon: Swords, color: "text-rose-400", glowClass: "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70", desc: "Tinh thần quả cảm giữa khói lửa chiến tranh ác liệt." },
  37: { icon: Compass, color: "text-amber-600", glowClass: "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70", desc: "Cuộc sống tự do của các cao bồi nơi miền viễn tây." }
};

const TV_GENRE_STYLES: Record<number, GenreStyle> = {
  10759: { icon: Flame, color: "text-red-500", glowClass: "hover:shadow-[0_0_20px_rgba(218,165,32,0.35)] hover:border-gold/70", desc: "Phiêu lưu mạo hiểm kết hợp những trận chiến dài kỳ." },
  16: { icon: Sparkles, color: "text-cyan-400", glowClass: "hover:shadow-[0_0_20px_rgba(218,165,32,0.35)] hover:border-gold/70", desc: "Phim hoạt hình dài tập và anime đặc sắc hấp dẫn." },
  35: { icon: Smile, color: "text-yellow-500", glowClass: "hover:shadow-[0_0_20px_rgba(218,165,32,0.35)] hover:border-gold/70", desc: "Hài kịch tình huống vui nhộn tạo tiếng cười thư giãn." },
  80: { icon: Shield, color: "text-indigo-400", glowClass: "hover:shadow-[0_0_20px_rgba(218,165,32,0.35)] hover:border-gold/70", desc: "Điều tra phá án, hình cảnh và thế giới ngầm tội phạm." },
  99: { icon: BookOpen, color: "text-stone-400", glowClass: "hover:shadow-[0_0_20px_rgba(218,165,32,0.35)] hover:border-gold/70", desc: "Phóng sự tài liệu dài tập chân thực về vạn vật quanh ta." },
  18: { icon: Heart, color: "text-rose-500", glowClass: "hover:shadow-[0_0_20px_rgba(218,165,32,0.35)] hover:border-gold/70", desc: "Phim chính kịch tâm lý, xung đột cuộc sống đời thường." },
  10751: { icon: Home, color: "text-emerald-400", glowClass: "hover:shadow-[0_0_20px_rgba(218,165,32,0.35)] hover:border-gold/70", desc: "Nội dung lành mạnh thích hợp giải trí cùng gia đình." },
  10762: { icon: Smile, color: "text-green-400", glowClass: "hover:shadow-[0_0_20px_rgba(218,165,32,0.35)] hover:border-gold/70", desc: "Chương trình thiếu nhi hấp dẫn mang tính giáo dục cao." },
  9648: { icon: Eye, color: "text-teal-400", glowClass: "hover:shadow-[0_0_20px_rgba(218,165,32,0.35)] hover:border-gold/70", desc: "Các hiện tượng bí ẩn khơi gợi tò mò, khám phá bí mật." },
  10763: { icon: Landmark, color: "text-sky-400", glowClass: "hover:shadow-[0_0_20px_rgba(218,165,32,0.35)] hover:border-gold/70", desc: "Bản tin thời sự, chính trị và cuộc sống thực tế." },
  10764: { icon: Tv, color: "text-yellow-500", glowClass: "hover:shadow-[0_0_20px_rgba(218,165,32,0.35)] hover:border-gold/70", desc: "Show thực tế kịch tính cùng những người nổi tiếng." },
  10765: { icon: Rocket, color: "text-teal-300", glowClass: "hover:shadow-[0_0_20px_rgba(218,165,32,0.35)] hover:border-gold/70", desc: "Huyễn tưởng phép thuật hoặc viễn tưởng không gian kỳ thú." },
  10766: { icon: Heart, color: "text-pink-400", glowClass: "hover:shadow-[0_0_20px_rgba(218,165,32,0.35)] hover:border-gold/70", desc: "Phim truyền hình tâm lý dài tập xã hội thường nhật." },
  10767: { icon: Music, color: "text-amber-400", glowClass: "hover:shadow-[0_0_20px_rgba(218,165,32,0.35)] hover:border-gold/70", desc: "Các chương trình talkshow phỏng vấn đối thoại vui vẻ." },
  10768: { icon: Swords, color: "text-rose-400", glowClass: "hover:shadow-[0_0_20px_rgba(218,165,32,0.35)] hover:border-gold/70", desc: "Tranh đấu chính trị, quân sự và bối cảnh chiến tranh." },
  37: { icon: Compass, color: "text-amber-600", glowClass: "hover:shadow-[0_0_20px_rgba(218,165,32,0.35)] hover:border-gold/70", desc: "Các cuộc hành trình cao bồi viễn tây phong cách Mỹ." }
};

// Hàm trợ giúp trả về style mặc định nếu thể loại không nằm trong bảng ánh xạ
const getGenreStyle = (id: number, isMovie: boolean): GenreStyle => {
  const styles = isMovie ? MOVIE_GENRE_STYLES : TV_GENRE_STYLES;
  return styles[id] || {
    icon: HelpCircle,
    color: isMovie ? "text-primary" : "text-gold",
    glowClass: isMovie 
      ? "hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:border-primary/70"
      : "hover:shadow-[0_0_20px_rgba(218,165,32,0.35)] hover:border-gold/70",
    desc: isMovie ? "Duyệt qua các bộ phim lẻ đặc sắc khác." : "Duyệt qua các phim truyền hình dài tập khác."
  };
};

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
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-5 py-2 bg-primary hover:bg-primary-dark text-text text-sm font-bold rounded-sharp transition-colors"
        >
          Tải lại trang
        </button>
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
                  <span className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sharp bg-primary/20 border border-primary/30 text-primary">
                    Phim lẻ
                  </span>

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
                  <span className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sharp bg-gold/20 border border-gold/30 text-gold">
                    Phim bộ
                  </span>

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
