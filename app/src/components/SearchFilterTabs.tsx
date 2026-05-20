import React from "react";
import { Search, Film, Tv, Users } from "lucide-react";
import { Button, Badge } from "./ui";

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
          <Button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            variant={isActive ? "primary" : "secondary"}
            size="sm"
            className={isActive ? "shadow-lg shadow-primary/25 border-primary" : "border-themeBorder text-muted hover:border-primary/40 hover:text-text bg-surface"}
            icon={<Icon className="w-3.5 h-3.5" />}
          >
            <span>{tab.label}</span>
            <Badge
              variant={isActive ? "glass" : "muted"}
              size="sm"
              className={`text-[10px] px-1.5 py-0.5 font-black border-none ${
                isActive ? "bg-black/40 text-text" : "bg-themeBorder text-muted"
              }`}
            >
              {tab.count}
            </Badge>
          </Button>
        );
      })}
    </div>
  );
};
