import React from "react";
import { Link } from "react-router-dom";
import { Film, Play, Star } from "lucide-react";

interface RelatedMediaSidebarProps {
  relatedList: any[];
  isTv: boolean;
}

export const RelatedMediaSidebar: React.FC<RelatedMediaSidebarProps> = ({
  relatedList,
  isTv,
}) => {
  return (
    <div className="border border-themeBorder bg-surface p-6 rounded-sharp text-left shadow-xl">
      <h2 className="font-display font-bold text-base text-text mb-5 flex items-center gap-2">
        <Film className="w-5 h-5 text-gold" />
        <span>Nội dung tương tự</span>
      </h2>

      {relatedList && relatedList.length > 0 ? (
        <div className="space-y-4">
          {relatedList.map((item) => (
            <Link
              key={item.id}
              to={`/watch/${isTv ? "tv" : "movie"}/${item.id}`}
              className="flex gap-3 p-2 hover:bg-background/80 border border-transparent hover:border-themeBorder rounded-sharp transition-all group"
            >
              {/* Poster nhỏ */}
              <div className="w-16 aspect-[2/3] bg-themeBorder rounded-sharp overflow-hidden flex-shrink-0 relative">
                <img
                  src={
                    item.posterUrl ||
                    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=120&auto=format&fit=crop&q=80"
                  }
                  alt={isTv ? item.name : item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-4 h-4 text-gold fill-current" />
                </div>
              </div>

              {/* Chi tiết text nhỏ */}
              <div className="flex-1 min-w-0 pt-0.5">
                <h4 className="text-xs font-bold text-text truncate group-hover:text-gold transition-colors">
                  {isTv ? item.name : item.title}
                </h4>
                <span className="text-[10px] text-muted block mt-1">
                  {item.year || "2026"} • {isTv ? "Phim Bộ" : "Phim Lẻ"}
                </span>
                <div className="flex items-center gap-1 text-gold text-[10px] font-black mt-2">
                  <Star className="w-3 h-3 fill-current" />
                  <span>
                    {item.voteAverage ? item.voteAverage.toFixed(1) : "0.0"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted">Hiện chưa có phim đề cử tương tự.</p>
      )}
    </div>
  );
};
