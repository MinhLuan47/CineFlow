import React from "react";
import { Tv } from "lucide-react";

interface WatchEpisodeSelectorProps {
  numberOfEpisodes: number;
  activeEpisode: number;
  onEpisodeChange: (episodeNumber: number) => void;
}

export const WatchEpisodeSelector: React.FC<WatchEpisodeSelectorProps> = ({
  numberOfEpisodes,
  activeEpisode,
  onEpisodeChange,
}) => {
  const totalEpisodes = Math.min(numberOfEpisodes || 12, 24);

  return (
    <div className="border border-themeBorder bg-surface p-6 rounded-sharp text-left shadow-xl">
      <h2 className="font-display font-bold text-base text-text mb-4 flex items-center gap-2">
        <Tv className="w-5 h-5 text-gold" />
        <span>Danh sách tập phim</span>
      </h2>

      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-1">
        {Array.from({ length: totalEpisodes }).map((_, idx) => {
          const epNum = idx + 1;
          const isActive = activeEpisode === epNum;
          return (
            <button
              key={idx}
              onClick={() => onEpisodeChange(epNum)}
              className={`h-9 text-xs font-bold rounded-sharp border transition-all ${
                isActive
                  ? "bg-gold border-gold text-background shadow-lg shadow-gold/15"
                  : "bg-background border-themeBorder text-text hover:border-gold/60"
              }`}
            >
              Tập {epNum}
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-[10px] text-muted italic text-center">
        Mô phỏng phát sóng Mùa 1 - Tập {activeEpisode}
      </div>
    </div>
  );
};
