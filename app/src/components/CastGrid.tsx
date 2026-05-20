import React from "react";
import { Users } from "lucide-react";
import type { NormalizedCast } from "../types/api";

interface CastGridProps {
  cast: NormalizedCast[] | null;
  loading: boolean;
}

export const CastGrid: React.FC<CastGridProps> = ({ cast, loading }) => {
  return (
    <div className="mt-16 pt-12 border-t border-themeBorder/20">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-4 h-4 text-gold" />
        <h3 className="text-xs font-black uppercase tracking-widest text-text">
          Dàn Diễn Viên Chính
        </h3>
      </div>

      {loading ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="flex flex-col items-center gap-2 w-24 flex-shrink-0 animate-pulse"
            >
              <div className="w-16 h-16 bg-surface rounded-full border border-themeBorder/50" />
              <div className="h-3 bg-surface w-12 rounded" />
            </div>
          ))}
        </div>
      ) : cast && cast.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
          {cast.slice(0, 8).map((actor) => (
            <div
              key={actor.id}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-surface border border-themeBorder/40 shadow-lg mb-3 transform group-hover:scale-105 transition-transform duration-300">
                <img
                  src={
                    actor.profileUrl ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                  }
                  alt={actor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-bold text-text truncate w-full">
                {actor.name}
              </span>
              <span className="text-[10px] text-muted truncate w-full mt-0.5">
                {actor.character}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted">
          Thông tin diễn viên đang được cập nhật.
        </p>
      )}
    </div>
  );
};
