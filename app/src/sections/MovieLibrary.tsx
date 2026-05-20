import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Library, Sparkles, Film, Tv, PlaySquare, X } from "lucide-react";
import { MovieCard, Button, SectionHeader, Container } from "../components";
import { SAMPLE_MOVIES } from "../data/movies";

interface LibraryTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Phần "Khám Phá Thư Viện Phim" (Movie Library Preview Section).
 * - Sử dụng Container, SectionHeader, Button và MovieCard dùng chung.
 */
export const MovieLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("new-releases");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const tabs: LibraryTab[] = [
    { id: "new-releases", label: "Mới Ra Mắt", icon: Sparkles },
    { id: "movies", label: "Phim Điện Ảnh", icon: Film },
    { id: "series", label: "Phim Bộ", icon: Tv },
    { id: "anime", label: "Anime & Hoạt Hình", icon: PlaySquare },
    { id: "tv-shows", label: "Chương Trình TV", icon: Library },
  ];

  const getFilteredMovies = () => {
    let list = [...SAMPLE_MOVIES];
    
    if (activeTab === "new-releases") {
      list = list.filter((m) => m.year >= 2025);
    } else if (activeTab === "movies") {
      list = list.filter((m) => !m.genre.includes("Anime") && !m.genre.includes("Hoạt Hình") && !m.genre.includes("Tài Liệu"));
    } else if (activeTab === "series") {
      list = list.filter((m) => m.genre.includes("Hình Sự") || m.genre.includes("Tâm Lý"));
    } else if (activeTab === "anime") {
      list = list.filter((m) => m.genre.includes("Anime") || m.genre.includes("Hoạt Hình"));
    } else if (activeTab === "tv-shows") {
      list = list.filter((m) => m.genre.includes("Tài Liệu") || m.genre.includes("Vũ Trụ"));
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.originalTitle.toLowerCase().includes(query) ||
          m.genre.some((g) => g.toLowerCase().includes(query))
      );
    }

    return list.slice(0, 6);
  };

  const displayedMovies = getFilteredMovies();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <Container py="md" borderTop>
      <SectionHeader
        accentIcon={<Library className="w-4 h-4 text-gold" />}
        accentText="Kho tài nguyên vô hạn"
        title="Thư Viện Điện Ảnh"
        subtitle="Hội tụ phim điện ảnh mới nhất, phim bộ độc quyền, anime sống động tại một nơi duy nhất."
      />

      {/* Thanh Điều khiển (Control Bar) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-6 border-b border-themeBorder/40">
        
        {/* Nhóm Tabs chuyển mục */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0">
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

        {/* Thanh tìm kiếm giả lập */}
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

      {/* Lưới phim */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {displayedMovies.map((movie) => (
            <motion.div
              key={`${activeTab}-${movie.id}`}
              layout
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
              className="w-full"
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {displayedMovies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-themeBorder/60 rounded-sharp">
          <p className="text-muted text-sm max-w-xs">
            Không tìm thấy phim nào khớp với từ khoá <span className="text-text font-bold">"{searchQuery}"</span> hoặc trong danh mục đã chọn.
          </p>
          <button 
            onClick={() => {
              setSearchQuery("");
              setActiveTab("new-releases");
            }}
            className="mt-6 text-xs text-primary font-black uppercase tracking-wider underline hover:text-primary-dark transition-colors"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}
    </Container>
  );
};
