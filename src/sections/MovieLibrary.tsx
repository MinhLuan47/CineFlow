import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Library, Sparkles, Film, Tv, PlaySquare, X } from "lucide-react";
import { MovieCard } from "../components/MovieCard";
import { SAMPLE_MOVIES } from "../data/movies";

// Cấu trúc một Tab trong thư viện
interface LibraryTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Phần "Khám Phá Thư Viện Phim" (Movie Library Preview Section).
 * Tính năng chính:
 * - Tiêu đề phụ và chính Việt hóa: "Khám Phá Thư Viện Điện Ảnh", "Hội tụ phim điện ảnh mới, phim bộ, anime và truyền hình...".
 * - Thanh tìm kiếm giả lập (Search Input UI Mockup) có thể tìm kiếm thực tế trực quan.
 * - Hệ thống Tabs điều hướng: Mới Ra Mắt, Phim Điện Ảnh, Phim Bộ, Anime, Chương Trình TV.
 * - Lưới hiển thị 6 thẻ phim (MovieCard) co giãn mượt mà.
 * - Hoạt ảnh chuyển đổi mượt mà giữa các Tab nhờ Framer Motion layout.
 */
export const MovieLibrary: React.FC = () => {
  // Trạng thái tab đang hoạt động
  const [activeTab, setActiveTab] = useState<string>("new-releases");
  // Trạng thái tìm kiếm phim
  const [searchQuery, setSearchQuery] = useState<string>("");

  const tabs: LibraryTab[] = [
    { id: "new-releases", label: "Mới Ra Mắt", icon: Sparkles },
    { id: "movies", label: "Phim Điện Ảnh", icon: Film },
    { id: "series", label: "Phim Bộ", icon: Tv },
    { id: "anime", label: "Anime & Hoạt Hình", icon: PlaySquare },
    { id: "tv-shows", label: "Chương Trình TV", icon: Library },
  ];

  // Logic lọc phim phân chia theo các danh mục thực tế
  const getFilteredMovies = () => {
    // Bước 1: Lọc theo Tab trước
    let list = [...SAMPLE_MOVIES];
    
    if (activeTab === "new-releases") {
      // Phim phát hành năm 2025 và 2026
      list = list.filter((m) => m.year >= 2025);
    } else if (activeTab === "movies") {
      // Loại trừ thể loại Anime, Hoạt Hình, Tài Liệu để lấy phim điện ảnh thuần
      list = list.filter((m) => !m.genre.includes("Anime") && !m.genre.includes("Hoạt Hình") && !m.genre.includes("Tài Liệu"));
    } else if (activeTab === "series") {
      // Phim bộ (Giả lập bằng các phim có thời lượng từ 1h50m đến 2h10m hoặc thể loại Hình Sự)
      list = list.filter((m) => m.genre.includes("Hình Sự") || m.genre.includes("Tâm Lý"));
    } else if (activeTab === "anime") {
      // Phim Hoạt hình và Anime
      list = list.filter((m) => m.genre.includes("Anime") || m.genre.includes("Hoạt Hình"));
    } else if (activeTab === "tv-shows") {
      // Phim Tài liệu và Khám phá vũ trụ
      list = list.filter((m) => m.genre.includes("Tài Liệu") || m.genre.includes("Vũ Trụ"));
    }

    // Bước 2: Lọc theo từ khóa tìm kiếm (nếu có)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.originalTitle.toLowerCase().includes(query) ||
          m.genre.some((g) => g.toLowerCase().includes(query))
      );
    }

    // Giới hạn hiển thị 6 thẻ phim như yêu cầu
    return list.slice(0, 6);
  };

  const displayedMovies = getFilteredMovies();

  // Hoạt ảnh xuất hiện
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
    <section className="container-custom py-16 md:py-24 relative z-20 border-t border-themeBorder/40">
      
      {/* 
        Tiêu đề Section (Section Header)
        Tích hợp biểu tượng Thư viện (Library)
      */}
      <div className="flex flex-col gap-2 mb-12 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold text-xs uppercase tracking-widest">
          <Library className="w-4 h-4 text-gold" />
          <span>Kho tài nguyên vô hạn</span>
        </div>
        <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight uppercase text-text">
          Thư Viện Điện Ảnh
        </h2>
        <p className="text-muted text-sm md:text-base">
          Hội tụ phim điện ảnh mới nhất, phim bộ độc quyền, anime sống động tại một nơi duy nhất.
        </p>
      </div>

      {/* 
        Thanh Điều khiển (Control Bar): Bộ chọn Tabs + Thanh tìm kiếm UI Mockup
        Thiết kế tối giản kính mờ, dàn trải linh hoạt.
      */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-6 border-b border-themeBorder/40">
        
        {/* Nhóm Tabs chuyển mục */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  // Không reset search để lọc kết quả kết hợp
                }}
                className={`relative px-4 py-2.5 text-xs font-black tracking-wider uppercase flex items-center gap-2 transition-all duration-300 rounded-sharp border flex-shrink-0 ${
                  isActive
                    ? "bg-primary border-primary text-text shadow-lg shadow-primary/10"
                    : "bg-surface/30 hover:bg-surface border-themeBorder text-muted hover:text-text"
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 
          Thanh tìm kiếm giả lập (Search Input UI Mockup)
          Sử dụng nền kính mờ dẹt 1px chuyển sắc, hỗ trợ xoá từ khoá nhanh.
        */}
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

      {/* 
        Lưới phim Thư Viện hiển thị tối đa 6 thẻ phim (Grid 6 Columns on Desktop)
        - Desktop siêu rộng: 6 cột (lg:grid-cols-6) bày trí trong 1 hàng cực đẹp.
        - Tablet/Desktop nhỏ: 3 cột (md:grid-cols-3) thành 2 hàng.
        - Mobile: 2 cột (grid-cols-2) thành 3 hàng.
      */}
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
              layout // Đồng bộ chuyển động trượt vị trí khi chuyển tab
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

      {/* Thông báo nếu danh mục/tìm kiếm không có phim */}
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

    </section>
  );
};
