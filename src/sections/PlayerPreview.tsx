import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { VideoPlayer, EpisodeList } from "../components";
import type { Episode } from "../components/EpisodeList";

/**
 * Phần "Trải Nghiệm Xem Phim Mượt Mà" (Premium Player Preview Section) sau khi Refactor.
 * - Được rút gọn tối đa bằng cách chia tách mã nguồn thành các thành phần con:
 *   - `<VideoPlayer />`: Quản lý logic trình phát, các nút điều khiển, phụ đề và chất lượng phim.
 *   - `<EpisodeList />`: Hiển thị danh sách tập phim và truyền tải sự kiện nhấp chọn.
 * - Lưu trữ trạng thái tập phim đang chạy (`activeEpisode`) ở cấp cha để đồng bộ hóa hai thành phần.
 */
export const PlayerPreview: React.FC = () => {
  // Trạng thái tập phim đang hoạt động được chia sẻ chung
  const [activeEpisode, setActiveEpisode] = useState<number>(1);

  // Danh sách các tập phim giả lập phục vụ trình diễn
  const episodes: Episode[] = [
    { id: 1, title: "Sự Khởi Đầu Kịch Tính", duration: "45 phút", thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=150&q=80" },
    { id: 2, title: "Liên Minh Bóng Tối", duration: "48 phút", thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=150&q=80" },
    { id: 3, title: "Bí Mật Dưới Lòng Đất", duration: "42 phút", thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=150&q=80" },
    { id: 4, title: "Trận Chiến Cuối Cùng", duration: "55 phút", thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=150&q=80" },
  ];

  // Hàm chuyển qua tập phim tiếp theo khi click nút Next trong player
  const handleNextEpisode = () => {
    setActiveEpisode((prev) => (prev < episodes.length ? prev + 1 : 1));
  };

  return (
    <section className="container-custom py-16 md:py-24 relative z-20 border-t border-themeBorder/40">
      
      {/* Tiêu đề Section (Section Header) */}
      <div className="flex flex-col gap-2 mb-12 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold text-xs uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-gold animate-pulse" />
          <span>Công nghệ trình phát thế hệ mới</span>
        </div>
        <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight uppercase text-text">
          Trải Nghiệm Xem Mượt Mà
        </h2>
        <p className="text-muted text-sm md:text-base">
          Trình phát tối giản không quảng cáo, tích hợp phụ đề đa ngôn ngữ, tùy chọn chất lượng gốc và chuyển tập nhanh chóng.
        </p>
      </div>

      {/* 
        Khung lưới phân chia 2 khu vực chính:
        - Trình phát video độc lập (Trái)
        - Danh sách tập phim (Phải)
      */}
      <div className="flex flex-col lg:flex-row items-stretch gap-6">
        
        {/* Cấu phần Trình phát Video tùy chỉnh */}
        <VideoPlayer 
          activeEpisode={activeEpisode}
          onNextEpisode={handleNextEpisode}
        />

        {/* Cấu phần Bảng chọn Danh sách tập phim */}
        <EpisodeList 
          episodes={episodes}
          activeEpisode={activeEpisode}
          onEpisodeSelect={setActiveEpisode}
        />

      </div>

    </section>
  );
};
