import React from "react";
import { 
  Flame, Compass, Sparkles, Smile, Shield, BookOpen, Heart, Home, 
  Landmark, Skull, Music, Eye, Rocket, Tv, Zap, Swords, HelpCircle 
} from "lucide-react";

export interface GenreStyle {
  icon: React.ComponentType<any>;
  color: string;
  glowClass: string;
  desc: string;
}

export const MOVIE_GENRE_STYLES: Record<number, GenreStyle> = {
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

export const TV_GENRE_STYLES: Record<number, GenreStyle> = {
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

export const getGenreStyle = (id: number, isMovie: boolean): GenreStyle => {
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
