import React from "react";
import { Play, Pause, Tv } from "lucide-react";

export interface Episode {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
}

interface EpisodeListProps {
  episodes: Episode[];
  activeEpisode: number;
  onEpisodeSelect: (id: number) => void;
}

/**
 * Thành phần danh sách các tập phim (Episode List Panel).
 * Được tách biệt hoàn toàn để phục vụ việc chia nhỏ mã nguồn và tái sử dụng.
 * - Nhấp chọn tập phim kích hoạt sự kiện chọn tập.
 * - Hiển thị trạng thái hoạt động (Active) cùng hoạt ảnh nhấp nháy mượt mà.
 */
export const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  activeEpisode,
  onEpisodeSelect,
}) => {
  return (
    <div className="w-full lg:w-80 flex-shrink-0 bg-surface/30 border border-themeBorder p-4 flex flex-col gap-4 rounded-sharp">
      
      {/* Tiêu đề bảng tập */}
      <div className="flex items-center justify-between border-b border-themeBorder pb-3">
        <div className="flex items-center gap-2 text-text font-bold text-sm">
          <Tv className="w-4 h-4 text-primary" />
          <span>Danh Sách Tập Phim</span>
        </div>
        <span className="text-[10px] bg-themeBorder text-muted px-2 py-0.5 rounded-sharp font-bold">
          {episodes.length} Tập
        </span>
      </div>

      {/* Danh sách cuộn chứa các tập phim */}
      <div className="flex flex-col gap-3 overflow-y-auto max-h-[300px] lg:max-h-none scrollbar-thin">
        {episodes.map((episode) => {
          const isActive = activeEpisode === episode.id;
          return (
            <button
              key={episode.id}
              onClick={() => onEpisodeSelect(episode.id)}
              className={`flex items-center gap-3 w-full p-2 transition-all duration-300 rounded-sharp text-left border ${
                isActive
                  ? "bg-primary/10 border-primary text-text shadow-[inset_0_0_15px_rgba(229,9,20,0.1)]"
                  : "bg-background/40 hover:bg-surface border-themeBorder text-muted hover:text-text"
              }`}
            >
              {/* Ảnh thu nhỏ tập phim giả lập */}
              <div className="relative w-18 h-12 bg-black rounded-sharp overflow-hidden flex-shrink-0">
                <img 
                  src={episode.thumbnail} 
                  alt={`Tập ${episode.id}`} 
                  className="w-full h-full object-cover opacity-60"
                />
                
                {/* Trạng thái phát của tập */}
                {isActive ? (
                  <div className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-primary flex items-center justify-center text-text animate-pulse">
                    <Pause className="w-3 h-3 fill-current" />
                  </div>
                ) : (
                  <div className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-text opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                )}
              </div>

              {/* Thông tin chi tiết của tập */}
              <div className="flex flex-col gap-0.5 overflow-hidden">
                <span className={`text-[11px] font-black uppercase tracking-wider ${isActive ? "text-primary" : "text-muted"}`}>
                  Tập {episode.id}
                </span>
                <span className="text-xs font-bold truncate text-text">
                  {episode.title}
                </span>
                <span className="text-[10px] text-muted/80">
                  Thời lượng: {episode.duration}
                </span>
              </div>

            </button>
          );
        })}
      </div>

    </div>
  );
};
