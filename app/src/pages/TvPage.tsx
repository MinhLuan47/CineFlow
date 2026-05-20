import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tv, Flame, Star, Calendar, Layers } from "lucide-react";

/**
 * TvPage - Trang khám phá danh sách phim truyền hình (TV Series) đa tập.
 */
export const TvPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("trending");

  const tabs = [
    { id: "trending", label: "Xu Hướng", icon: Flame, desc: "Phim bộ được theo dõi nhiều nhất tuần qua." },
    { id: "popular", label: "Phổ Biến", icon: Layers, desc: "Phim bộ kinh điển có số lượng người xem áp đảo." },
    { id: "top-rated", label: "Đánh Giá Cao", icon: Star, desc: "Điểm số IMDb cao ngất ngưởng từ người hâm mộ." },
    { id: "airing-today", label: "Phát Sóng Hôm Nay", icon: Calendar, desc: "Các tập phim mới chuẩn bị lên sóng hôm nay." }
  ];

  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <div className="container-custom py-10 min-h-[60vh]">
      {/* Tiêu đề trang */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-themeBorder/40 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest mb-2">
            <Tv className="w-4 h-4" />
            <span>Phim Truyền Hình / {currentTab.label}</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-text">
            PHIM <span className="text-gold">TRUYỀN HÌNH</span>
          </h1>
          <p className="text-muted text-sm mt-2 max-w-2xl">{currentTab.desc}</p>
        </div>

        {/* Danh sách tab danh mục */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sharp border transition-all duration-300 ${
                  isActive
                    ? "bg-gold text-background border-gold shadow-lg shadow-gold/25"
                    : "bg-surface border-themeBorder text-muted hover:border-gold/40 hover:text-text"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid danh sách phim bộ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {Array.from({ length: 12 }).map((_, idx) => (
          <Link
            key={idx}
            to={`/tv/${idx + 200}`}
            className="group relative bg-surface border border-themeBorder rounded-sharp overflow-hidden transition-all duration-300 hover:border-gold hover:-translate-y-1"
          >
            <div className="aspect-[2/3] w-full bg-themeBorder relative overflow-hidden flex items-center justify-center">
              <Tv className="w-10 h-10 text-muted opacity-30 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              
              <span className="absolute top-2 right-2 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-sharp bg-black/60 backdrop-blur-sm border border-white/10 text-gold">
                Phim bộ
              </span>
            </div>
            
            <div className="p-3">
              <h3 className="font-bold text-xs text-text truncate group-hover:text-gold transition-colors">
                Series Truyền Hình #{idx + 1}
              </h3>
              <div className="flex items-center justify-between mt-2 text-[10px] text-muted">
                <span>Mùa 1 (2026)</span>
                <div className="flex items-center gap-0.5 text-gold">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  <span>8.8</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TvPage;
