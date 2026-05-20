import React from "react";
import { Star, Calendar, Clock, AlertCircle } from "lucide-react";

interface WatchMediaInfoProps {
  activeItem: any;
  isTv: boolean;
  typeLabel: string;
  formattedRuntime: string;
}

export const WatchMediaInfo: React.FC<WatchMediaInfoProps> = ({
  activeItem,
  isTv,
  typeLabel,
  formattedRuntime,
}) => {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-2">
        <span
          className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sharp ${
            isTv
              ? "bg-gold/10 border border-gold/20 text-gold"
              : "bg-primary/10 border border-primary/20 text-primary"
          }`}
        >
          {typeLabel}
        </span>
        <span className="text-xs text-muted">ID: #{activeItem.id}</span>
      </div>

      <h1 className="font-display font-extrabold text-2xl md:text-4xl mt-3 text-text leading-tight">
        {isTv ? activeItem.name : activeItem.title}
      </h1>
      <h2 className="text-sm text-muted font-medium italic mt-1.5">
        {isTv ? activeItem.originalName : activeItem.originalTitle}{" "}
        {activeItem.year ? `(${activeItem.year})` : ""}
      </h2>

      <div className="flex flex-wrap items-center gap-y-2 gap-x-4 md:gap-x-6 mt-5 text-xs text-muted border-b border-themeBorder/20 pb-6 font-bold">
        <div className="flex items-center gap-1 text-gold bg-gold/15 border border-gold/20 px-2 py-0.5 rounded-sharp">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span className="text-text">
            {activeItem.voteAverage ? activeItem.voteAverage.toFixed(1) : "0.0"}{" "}
            IMDb
          </span>
        </div>
        <span className="text-muted/50">•</span>

        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-gold" />
          <span>{isTv ? activeItem.firstAirDate : activeItem.releaseDate}</span>
        </div>
        <span className="text-muted/50">•</span>

        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-gold" />
          <span>{formattedRuntime}</span>
        </div>
      </div>

      {/* Thể loại */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        {activeItem.genres.map((genreName: string, idx: number) => (
          <span
            key={idx}
            className="text-[11px] font-bold bg-surface border border-themeBorder/60 px-2.5 py-0.5 rounded-sharp text-text"
          >
            {genreName}
          </span>
        ))}
      </div>

      {/* Mô tả cốt truyện */}
      <div className="mt-8">
        <h3 className="text-xs font-black uppercase text-gold tracking-widest mb-2">
          Tóm tắt nội dung
        </h3>
        <p className="text-sm md:text-base text-muted leading-relaxed font-medium">
          {activeItem.overview || "Nội dung tóm tắt hiện đang được cập nhật..."}
        </p>
      </div>

      {/* Cảnh báo mô phỏng */}
      <div className="mt-8 p-4 bg-surface border border-themeBorder/40 rounded-sharp flex gap-3 items-start">
        <AlertCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-text uppercase tracking-wide">
            Lưu ý mô phỏng trình phát
          </h4>
          <p className="text-[11px] text-muted leading-relaxed mt-1">
            Trang chiếu phim đang chạy ở chế độ nhúng Trailer bản quyền chính
            thức từ TMDB. CineFlow cam kết tuân thủ nghiêm ngặt bản quyền số,
            không lưu trữ hoặc truyền phát lậu phim thương mại có bản quyền.
          </p>
        </div>
      </div>
    </div>
  );
};
