import React from "react";
import { Search, X } from "lucide-react";
import { Button } from "./Button";

export interface LibraryTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface LibraryFilterBarProps {
  tabs: LibraryTab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const LibraryFilterBar: React.FC<LibraryFilterBarProps> = ({
  tabs,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-6 border-b border-themeBorder/40">
      {/* Nhóm Tabs chuyển mục */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 px-4 lg:mx-0 lg:px-0 -mx-4 custom-scrollbar-x">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={isActive ? "primary" : "secondary"}
              size="sm"
              className="flex-shrink-0"
              icon={<TabIcon className="w-3.5 h-3.5" />}
            >
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Thanh tìm kiếm */}
      <div className="relative w-full lg:max-w-xs xl:max-w-sm flex-shrink-0">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/60 pointer-events-none">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm phim, thể loại hoặc năm sản xuất..."
          className="w-full bg-surface border border-themeBorder/80 text-xs text-text placeholder:text-muted/50 pl-10 pr-9 py-3 focus:outline-none focus:border-primary focus:bg-card transition-all rounded-sharp"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text p-0.5 hover:bg-themeBorder/40 transition-colors rounded-full"
            aria-label="Xoá tìm kiếm"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
