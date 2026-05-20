import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, 
  SkipForward, Settings
} from "lucide-react";

// Ép kiểu ReactPlayer thành any để tránh lỗi định nghĩa JSX namespace trong React 19
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Player = ReactPlayer as any;

interface VideoPlayerProps {
  activeEpisode: number;
  onNextEpisode: () => void;
}

/**
 * Thành phần Trình phát Video tùy chỉnh (Custom Video Player).
 * - Sử dụng `react-player` kết hợp hệ thống nút điều khiển custom cao cấp.
 * - Tự động phát khi đổi tập phim.
 * - Có khả năng bật/tắt phụ đề, chỉnh âm lượng, chọn chất lượng và xem toàn màn hình.
 */
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  activeEpisode,
  onNextEpisode,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playedProgress, setPlayedProgress] = useState<number>(0);
  const [playedSeconds, setPlayedSeconds] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [selectedQuality, setSelectedQuality] = useState<string>("1080p");
  const [isQualityOpen, setIsQualityOpen] = useState<boolean>(false);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const qualities = ["720p", "1080p", "4K UHD"];

  // Khi người dùng chuyển tập từ danh sách ngoài, tự động phát tập mới
  useEffect(() => {
    setIsPlaying(true);
  }, [activeEpisode]);

  // Xử lý ẩn hiện bộ điều khiển khi rê chuột vào video
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

  // Định dạng thời gian video
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Cập nhật tiến trình chạy video
  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setPlayedProgress(state.played);
    setPlayedSeconds(state.playedSeconds);
  };

  // Tua video
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    setPlayedProgress(seekTo);
    playerRef.current?.seekTo(seekTo, "fraction");
  };

  // Kích hoạt toàn màn hình
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
    <div 
      id="cineflow-player-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="relative flex-grow aspect-video bg-black border border-themeBorder overflow-hidden group/player rounded-sharp shadow-2xl"
    >
      {/* ReactPlayer sử dụng link video hoạt cảnh nền */}
      <Player
        ref={playerRef}
        url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        width="100%"
        height="100%"
        playing={isPlaying}
        volume={isMuted ? 0 : volume}
        controls={false}
        loop={true}
        onProgress={handleProgress}
        onDuration={(d: number) => setDuration(d)}
        style={{ pointerEvents: "none" }}
      />

      {/* Lớp phủ chuyển màu bảo vệ các nút điều khiển */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`} />

      {/* Nút Play khổng lồ ở trung tâm */}
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

      {/* Bộ điều khiển thanh dưới */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-3 transition-transform duration-300 z-30 ${showControls ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0 pointer-events-none"}`}>
        
        {/* Progress Bar */}
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

        {/* Các nút chức năng dưới */}
        <div className="flex items-center justify-between text-text text-xs">
          
          <div className="flex items-center gap-4">
            {/* Phát / Tạm dừng */}
            <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-primary transition-colors">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            {/* Chuyển tập */}
            <button onClick={onNextEpisode} className="hover:text-primary transition-colors" title="Tập tiếp theo">
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Điều chỉnh âm thanh */}
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

            {/* Thời lượng */}
            <div className="font-mono text-muted text-[11px] font-bold">
              <span>{formatTime(playedSeconds)}</span>
              <span className="mx-1">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Phụ đề */}
            <button 
              onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
              className={`transition-colors relative ${subtitlesEnabled ? "text-primary" : "text-muted hover:text-text"}`}
              title="Bật/tắt Phụ đề"
            >
              <Subtitles className="w-4 h-4" />
              {subtitlesEnabled && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />}
            </button>

            {/* Chất lượng phim */}
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

      {/* Phụ đề giả lập */}
      {isPlaying && subtitlesEnabled && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-1.5 text-xs text-text border border-themeBorder/40 select-none pointer-events-none rounded-sharp text-center font-medium max-w-md">
          [Tập {activeEpisode} - Phụ đề Tiếng Việt tự động bởi CineFlow]
        </div>
      )}

    </div>
  );
};
