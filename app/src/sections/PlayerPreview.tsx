import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { VideoPlayer, EpisodeList, Container, SectionHeader } from "../components";
import type { Episode } from "../components/EpisodeList";

/**
 * Phần "Trải Nghiệm Xem Phim Mượt Mà" (Premium Player Preview Section).
 * - Sử dụng Container và SectionHeader để quản lý cấu trúc tiêu đề và khoảng cách thống nhất.
 */
export const PlayerPreview: React.FC = () => {
  const [activeEpisode, setActiveEpisode] = useState<number>(1);

  const episodes: Episode[] = [
    { id: 1, title: "Sự Khởi Đầu Kịch Tính", duration: "45 phút", thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=150&q=80" },
    { id: 2, title: "Liên Minh Bóng Tối", duration: "48 phút", thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=150&q=80" },
    { id: 3, title: "Bí Mật Dưới Lòng Đất", duration: "42 phút", thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=150&q=80" },
    { id: 4, title: "Trận Chiến Cuối Cùng", duration: "55 phút", thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=150&q=80" },
  ];

  const handleNextEpisode = () => {
    setActiveEpisode((prev) => (prev < episodes.length ? prev + 1 : 1));
  };

  return (
    <Container py="md" borderTop>
      <SectionHeader
        accentIcon={<Sparkles className="w-4 h-4 text-gold animate-pulse" />}
        accentText="Công nghệ trình phát thế hệ mới"
        title="Trải Nghiệm Xem Mượt Mà"
        subtitle="Trình phát tối giản không quảng cáo, tích hợp phụ đề đa ngôn ngữ, tùy chọn chất lượng gốc và chuyển tập nhanh chóng."
      />

      <div className="flex flex-col lg:flex-row items-stretch gap-6">
        <VideoPlayer 
          activeEpisode={activeEpisode}
          onNextEpisode={handleNextEpisode}
        />

        <EpisodeList 
          episodes={episodes}
          activeEpisode={activeEpisode}
          onEpisodeSelect={setActiveEpisode}
        />
      </div>
    </Container>
  );
};
