import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { motion, AnimatePresence } from "framer-motion";

// Ép kiểu ReactPlayer thành any để tránh lỗi định nghĩa JSX namespace trong React 19
const Player = ReactPlayer as any;
import { 
  Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, 
  Tv, Sparkles, SkipForward, Settings
} from "lucide-react";

interface Episode {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
}

/**
 * Phần "Trải Nghiệm Xem Phim Mượt Mà" (Premium Player Preview Section).
 * Tính năng chính:
 * - Trình phát video cao cấp tích hợp thư viện `react-player`.
 * - Tự thiết kế bộ điều khiển tùy chỉnh (Custom Controls UI Overlay) dạng kính mờ mượt mà:
 *   - Nút Phát/Tạm dừng ở tâm và thanh dưới.
 *   - Thanh tiến trình phát động (Progress bar) đồng bộ thời gian thực.
 *   - Điều khiển âm lượng (Tắt tiếng / Tăng giảm).
 *   - Bộ chọn chất lượng (720p / 1080p / 4K) & Bật tắt phụ đề.
 * - Danh sách tập phim (Episode List) bên phải tự động chuyển tập khi chọn.
 * - Đáp ứng responsive: Danh sách tập chuyển xuống dưới khi xem trên di động.
 */
export const PlayerPreview: React.FC = () => {
  // Các trạng thái tương tác của trình phát
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playedProgress, setPlayedProgress] = useState<number>(0);
  const [playedSeconds, setPlayedSeconds] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [activeEpisode, setActiveEpisode] = useState<number>(1);
  const [selectedQuality, setSelectedQuality] = useState<string>("1080p");
  const [isQualityOpen, setIsQualityOpen] = useState<boolean>(false);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(true);

  const playerRef = useRef<any>(null);
  const controlsTimeoutRef = useRef<any>(null);

  // Danh sách tập phim giả lập
  const episodes: Episode[] = [
    { id: 1, title: "Sự Khởi Đầu Kịch Tính", duration: "45 phút", thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=150&q=80" },
    { id: 2, title: "Liên Minh Bóng Tối", duration: "48 phút", thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=150&q=80" },
    { id: 3, title: "Bí Mật Dưới Lòng Đất", duration: "42 phút", thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=150&q=80" },
    { id: 4, title: "Trận Chiến Cuối Cùng", duration: "55 phút", thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=150&q=80" },
  ];

  // Danh sách chất lượng phim
  const qualities = ["720p", "1080p", "4K UHD"];

  // Xử lý ẩn hiện thanh điều khiển khi rê chuột qua khung video
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  // Định dạng hiển thị giây thành phút:giây (00:00)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Đồng bộ tiến trình phát của ReactPlayer
  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setPlayedProgress(state.played);
    setPlayedSeconds(state.playedSeconds);
  };

  // Tua nhanh video bằng cách kéo/click thanh tiến trình
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    setPlayedProgress(seekTo);
    playerRef.current?.seekTo(seekTo, "fraction");
  };

  // Bật/tắt chế độ toàn màn hình giả lập
  const toggleFullscreen = () => {
    const playerEl = document.getElementById("cineflow-player-wrapper");
    if (playerEl) {
      if (!document.fullscreenElement) {
        playerEl.requestFullscreen().catch((err) => {
          console.error("Lỗi fullscreen:", err);
        });
      } else {
        document.exitFullscreen();
      }
    }
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
        Khung Bố Cục chính: Trình phát (Trái) & Danh sách tập (Phải)
        Dàn trang flex co giãn mượt mà.
      */}
      <div className="flex flex-col lg:flex-row items-stretch gap-6">
        
        {/* 
          1. KHU VỰC TRÌNH PHÁT VIDEO CHÍNH 
          Có tỷ lệ aspect-video chuẩn điện ảnh.
        */}
        <div 
          id="cineflow-player-wrapper"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          className="relative flex-grow aspect-video bg-black border border-themeBorder overflow-hidden group/player rounded-sharp shadow-2xl"
        >
          {/* ReactPlayer sử dụng link video vũ trụ trừu tượng tuyệt đẹp làm nền */}
          <Player
            ref={playerRef}
            url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            width="100%"
            height="100%"
            playing={isPlaying}
            volume={isMuted ? 0 : volume}
            controls={false} // Tắt điều khiển gốc để dùng điều khiển tùy chỉnh của chúng ta
            loop={true}
            onProgress={handleProgress}
            onDuration={(d: number) => setDuration(d)}
            style={{ pointerEvents: "none" }} // Ngăn click chuột trực tiếp vào video
          />

          {/* Lớp phủ chuyển màu bảo vệ các nút điều khiển */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`} />

          {/* 
            NÚT PLAY Ở TÂM PLAYER (Center Play Button)
            Thiết kế vòng tròn kính mờ rực rỡ, biến mất khi đang phát và hiện lại khi rê chuột.
          */}
          <AnimatePresence>
            {(!isPlaying || showControls) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-primary/95 text-text flex items-center justify-center shadow-lg shadow-primary/30 hover:bg-primary transition-all duration-300 z-30"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-current" />
                ) : (
                  <Play className="w-7 h-7 fill-current ml-1" />
                )}
              </motion.button>
            )}
          </AnimatePresence>

          {/* 
            BỘ ĐIỀU KHIỂN TÙY CHỈNH PHÍA DƯỚI (Bottom Control Bar Overlay)
            Bật lên mượt mà dựa trên trạng thái tương tác.
          */}
          <div className={`absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-3 transition-transform duration-300 z-30 ${showControls ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0 pointer-events-none"}`}>
            
            {/* 
              Thanh tua tiến trình (Progress Bar Slider)
              Thiết kế kéo thả hiện đại.
            */}
            <div className="relative flex items-center group/progress w-full h-1">
              <input
                type="range"
                min={0}
                max={0.999999}
                step="any"
                value={playedProgress}
                onChange={handleSeek}
                className="absolute w-full h-1 bg-white/20 appearance-none cursor-pointer outline-none rounded-full accent-primary hover:h-1.5 transition-all"
                style={{
                  background: `linear-gradient(to right, #E50914 0%, #E50914 ${playedProgress * 100}%, rgba(255,255,255,0.2) ${playedProgress * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>

            {/* Các nút bấm điều khiển bên dưới */}
            <div className="flex items-center justify-between text-text text-xs">
              
              {/* Cụm điều khiển bên trái: Phát, Chuyển tập, Âm lượng, Thời gian */}
              <div className="flex items-center gap-4">
                
                {/* Nút phát/dừng nhỏ */}
                <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-primary transition-colors">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                {/* Nút chuyển tiếp tập phim */}
                <button 
                  onClick={() => {
                    const nextId = activeEpisode < episodes.length ? activeEpisode + 1 : 1;
                    setActiveEpisode(nextId);
                  }} 
                  className="hover:text-primary transition-colors"
                  title="Tập tiếp theo"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                {/* Cụm âm lượng */}
                <div className="flex items-center gap-2 group/volume">
                  <button onClick={() => setIsMuted(!isMuted)} className="hover:text-primary transition-colors">
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      setIsMuted(false);
                    }}
                    className="w-16 h-1 bg-white/30 appearance-none cursor-pointer outline-none rounded-full accent-primary opacity-0 group-hover/volume:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to right, #E50914 0%, #E50914 ${volume * 100}%, rgba(255,255,255,0.3) ${volume * 100}%, rgba(255,255,255,0.3) 100%)`
                    }}
                  />
                </div>

                {/* Bộ đếm thời gian */}
                <div className="font-mono text-muted text-[11px] font-bold">
                  <span>{formatTime(playedSeconds)}</span>
                  <span className="mx-1">/</span>
                  <span>{formatTime(duration)}</span>
                </div>

              </div>

              {/* Cụm điều khiển bên phải: Phụ đề, Chất lượng, Toàn màn hình */}
              <div className="flex items-center gap-4">
                
                {/* Nút Bật/tắt phụ đề */}
                <button 
                  onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                  className={`transition-colors relative ${subtitlesEnabled ? "text-primary" : "text-muted hover:text-text"}`}
                  title="Bật/tắt Phụ đề"
                >
                  <Subtitles className="w-4 h-4" />
                  {subtitlesEnabled && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />}
                </button>

                {/* Bộ chọn chất lượng (Quality Dropdown Selection) */}
                <div className="relative">
                  <button 
                    onClick={() => setIsQualityOpen(!isQualityOpen)}
                    className="flex items-center gap-1 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-wider bg-black/60 border border-themeBorder px-2 py-1 rounded-sharp"
                  >
                    <span>{selectedQuality}</span>
                    <Settings className="w-3 h-3" />
                  </button>

                  <AnimatePresence>
                    {isQualityOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full right-0 mb-2 bg-background border border-themeBorder rounded-sharp overflow-hidden py-1 w-20 shadow-xl z-40"
                      >
                        {qualities.map((q) => (
                          <button
                            key={q}
                            onClick={() => {
                              setSelectedQuality(q);
                              setIsQualityOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 text-[10px] font-bold uppercase transition-colors hover:bg-themeBorder ${selectedQuality === q ? "text-primary bg-primary/5" : "text-text"}`}
                          >
                            {q}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Toàn màn hình */}
                <button onClick={toggleFullscreen} className="hover:text-primary transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </button>

              </div>

            </div>

          </div>

          {/* Phụ đề giả lập (Mock Subtitle Overlay) */}
          {isPlaying && subtitlesEnabled && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-1.5 text-xs text-text border border-themeBorder/40 select-none pointer-events-none rounded-sharp text-center font-medium max-w-md">
              [Tập {activeEpisode} - Phụ đề Tiếng Việt tự động bởi CineFlow]
            </div>
          )}

        </div>

        {/* 
          2. BANEL DANH SÁCH TẬP PHIM (Right Episode Panel)
          Hiển thị danh sách các tập phim cho chế độ phim bộ.
          Tự động co giãn đồng bộ chiều cao trên Desktop, xếp chồng bên dưới trên Mobile.
        */}
        <div className="w-full lg:w-80 flex-shrink-0 bg-surface/30 border border-themeBorder p-4 flex flex-col gap-4 rounded-sharp">
          
          <div className="flex items-center justify-between border-b border-themeBorder pb-3">
            <div className="flex items-center gap-2 text-text font-bold text-sm">
              <Tv className="w-4 h-4 text-primary" />
              <span>Danh Sách Tập Phim</span>
            </div>
            <span className="text-[10px] bg-themeBorder text-muted px-2 py-0.5 rounded-sharp font-bold">
              {episodes.length} Tập
            </span>
          </div>

          {/* Lưới các tập phim dọc */}
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[300px] lg:max-h-none scrollbar-thin">
            {episodes.map((episode) => {
              const isActive = activeEpisode === episode.id;
              return (
                <button
                  key={episode.id}
                  onClick={() => {
                    setActiveEpisode(episode.id);
                    setIsPlaying(true); // Tự động phát khi chọn tập mới
                  }}
                  className={`flex items-center gap-3 w-full p-2 transition-all duration-300 rounded-sharp text-left border ${
                    isActive
                      ? "bg-primary/10 border-primary text-text shadow-[inset_0_0_15px_rgba(229,9,20,0.1)]"
                      : "bg-background/40 hover:bg-surface border-themeBorder text-muted hover:text-text"
                  }`}
                >
                  {/* Ảnh thu nhỏ tập phim giả lập */}
                  <div className="relative w-18 h-12 bg-black rounded-sharp overflow-hidden flex-shrink-0">
                    <img 
                      src={episode.thumbnail} 
                      alt={`Tập ${episode.id}`} 
                      className="w-full h-full object-cover opacity-60"
                    />
                    
                    {/* Trạng thái phát của tập */}
                    {isActive ? (
                      <div className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-primary flex items-center justify-center text-text animate-pulse">
                        <Pause className="w-3 h-3 fill-current" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-text opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-3 h-3 fill-current ml-0.5" />
                      </div>
                    )}
                  </div>

                  {/* Thông tin tập */}
                  <div className="flex flex-col gap-0.5 overflow-hidden">
                    <span className={`text-[11px] font-black uppercase tracking-wider ${isActive ? "text-primary" : "text-muted"}`}>
                      Tập {episode.id}
                    </span>
                    <span className="text-xs font-bold truncate text-text">
                      {episode.title}
                    </span>
                    <span className="text-[10px] text-muted/80">
                      Thời lượng: {episode.duration}
                    </span>
                  </div>

                </button>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
};
