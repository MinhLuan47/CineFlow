import React from "react";
import { Search, Film, Tv, Users } from "lucide-react";

interface SearchFilterTabsProps {
  filter: "all" | "movie" | "tv" | "person";
  setFilter: (filter: "all" | "movie" | "tv" | "person") => void;
  counts: {
    all: number;
    movie: number;
    tv: number;
    person: number;
  };
}

export const SearchFilterTabs: React.FC<SearchFilterTabsProps> = ({
  filter,
  setFilter,
  counts,
}) => {
  const tabs = [
    { id: "all" as const, label: "Tất cả", icon: Search, count: counts.all },
    { id: "movie" as const, label: "Phim lẻ", icon: Film, count: counts.movie },
    { id: "tv" as const, label: "Phim bộ", icon: Tv, count: counts.tv },
    { id: "person" as const, label: "Diễn viên", icon: Users, count: counts.person },
  ];

  return (
    <div className="flex flex-wrap gap-2 border-b border-themeBorder/40 pb-4 mb-8">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = filter === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sharp border transition-all duration-300 ${
              isActive
                ? "bg-primary text-text border-primary shadow-lg shadow-primary/25"
                : "bg-surface border-themeBorder text-muted hover:border-primary/40 hover:text-text"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                isActive ? "bg-black/40 text-text" : "bg-themeBorder text-muted"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
