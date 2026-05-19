import React from "react";
import { motion } from "framer-motion";
import { 
  Flame, Heart, Smile, Ghost, Sparkles, Rocket, Compass, Film, Globe, History, Compass as GridIcon
} from "lucide-react";
import { SAMPLE_MOVIES } from "../data/movies";

// Cấu trúc một thẻ thể loại
interface GenreItem {
  id: string;
  name: string;
  searchKey: string; // Từ khóa tìm kiếm trong trường genre của phim
  baseCount: number;  // Số lượng phim cơ sở (cộng thêm số lượng động để hiển thị thực tế)
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Phần "Duyệt Theo Thể Loại" (Browse by Genre Section).
 * Tính năng chính:
 * - Tiêu đề phụ và chính tiếng Việt: "Duyệt Theo Thể Loại", "Tìm kiếm bộ phim hoàn hảo cho cảm xúc của bạn".
 * - Lưới các ô thể loại phim dạng kính mờ (Glassmorphism Cards).
 * - Hiệu ứng hover rực rỡ dải màu đỏ/cam (Red/Ember gradient) và nổi khối dịch chuyển nhẹ.
 * - Tính toán số lượng phim động kết hợp số liệu cơ sở để hiển thị chuyên nghiệp.
 * - Hoạt ảnh xuất hiện tuần tự (Stagger animation) khi cuộn chuột qua.
 */
export const BrowseGenres: React.FC = () => {
  
  // Danh sách các thể loại phim, ánh xạ biểu tượng tương ứng
  const genres: GenreItem[] = [
    { id: "action", name: "Hành Động", searchKey: "hành động", baseCount: 142, icon: Flame },
    { id: "scifi", name: "Viễn Tưởng", searchKey: "viễn tưởng", baseCount: 96, icon: Rocket },
    { id: "romance", name: "Lãng Mạn", searchKey: "lãng mạn", baseCount: 78, icon: Heart },
    { id: "horror", name: "Kinh Dị", searchKey: "kinh dị", baseCount: 64, icon: Ghost },
    { id: "anime", name: "Anime", searchKey: "anime", baseCount: 88, icon: Sparkles },
    { id: "adventure", name: "Phiêu Lưu", searchKey: "phiêu lưu", baseCount: 110, icon: Compass },
    { id: "comedy", name: "Hài Hước", searchKey: "hài hước", baseCount: 125, icon: Smile },
    { id: "drama", name: "Tâm Lý", searchKey: "tâm lý", baseCount: 154, icon: Film },
    { id: "documentary", name: "Phim Tài Liệu", searchKey: "tài liệu", baseCount: 45, icon: Globe },
    { id: "historical", name: "Cổ Trang / Lịch Sử", searchKey: "lịch sử", baseCount: 52, icon: History },
  ];

  // Hàm tính toán tổng số lượng phim hiển thị thực tế (Động + Tĩnh)
  const getMovieCount = (item: GenreItem) => {
    const dynamicCount = SAMPLE_MOVIES.filter((movie) => 
      movie.genre.some((g) => g.toLowerCase().includes(item.searchKey))
    ).length;
    return item.baseCount + dynamicCount;
  };

  // Cấu hình hoạt ảnh xuất hiện của lưới thể loại
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="container-custom py-16 md:py-20 relative z-20">
      
      {/* Tiêu đề phần (Section Header) */}
      <div className="flex flex-col gap-2 mb-12 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold text-xs uppercase tracking-widest">
          <GridIcon className="w-4 h-4 text-gold" />
          <span>Tìm kiếm theo cảm xúc</span>
        </div>
        <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight uppercase text-text">
          Duyệt Theo Thể Loại
        </h2>
        <p className="text-muted text-sm md:text-base">
          Tìm kiếm bộ phim hoàn hảo phù hợp với tâm trạng của bạn.
        </p>
      </div>

      {/* 
        Lưới Thể Loại (Genres Grid)
        - Desktop rộng: 5 cột (lg:grid-cols-5)
        - Desktop thường: 4 cột (md:grid-cols-4)
        - Tablet/Mobile trung bình: 3 cột (sm:grid-cols-3)
        - Mobile nhỏ: 2 cột (grid-cols-2)
      */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5"
      >
        {genres.map((genre) => {
          const GenreIcon = genre.icon;
          const totalMoviesCount = getMovieCount(genre);

          return (
            <motion.div
              key={genre.id}
              variants={itemVariants}
              className="group relative cursor-pointer"
            >
              {/* 
                Thẻ thể loại dạng kính mờ (Glassmorphism Card)
                Viền sắc cạnh 1px, thay đổi viền đỏ/cam khi di chuột.
              */}
              <div className="relative overflow-hidden bg-surface/30 backdrop-blur-md border border-themeBorder/60 p-6 md:p-8 flex flex-col items-center justify-center gap-4 text-center transition-all duration-300 hover:border-primary/50 hover:bg-surface/50 hover:-translate-y-1.5 rounded-sharp">
                
                {/* Lớp phủ vệt màu phát sáng đỏ/cam mờ ẩn dưới nền thẻ khi hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-ember/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Khung chứa Icon tròn tinh giản */}
                <div className="w-14 h-14 bg-background/50 border border-themeBorder flex items-center justify-center text-muted group-hover:text-primary group-hover:border-primary/40 group-hover:scale-110 transition-all duration-300 rounded-sharp">
                  <GenreIcon className="w-6 h-6 transition-transform" />
                </div>

                {/* Thông tin văn bản */}
                <div className="flex flex-col gap-1">
                  <span className="font-display font-extrabold text-sm text-text tracking-wide group-hover:text-primary transition-colors">
                    {genre.name}
                  </span>
                  <span className="text-[11px] text-muted/70 font-semibold uppercase tracking-wider">
                    {totalMoviesCount} tác phẩm
                  </span>
                </div>

                {/* Góc nhỏ trang trí (Styling detail) - 1px chấm sáng ở các góc khi hover */}
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 shadow-glow shadow-primary" />

              </div>
            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
};
