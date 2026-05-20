import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { PlayerControls } from "./PlayerControls";

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

      {/* Nút điều khiển trình phát */}
      <PlayerControls
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNextEpisode={onNextEpisode}
        volume={volume}
        onVolumeChange={(val) => {
          setVolume(val);
          setIsMuted(false);
        }}
        isMuted={isMuted}
        onToggleMuted={() => setIsMuted(!isMuted)}
        playedProgress={playedProgress}
        playedSeconds={playedSeconds}
        duration={duration}
        onSeek={handleSeek}
        subtitlesEnabled={subtitlesEnabled}
        onToggleSubtitles={() => setSubtitlesEnabled(!subtitlesEnabled)}
        selectedQuality={selectedQuality}
        onSelectQuality={(q) => {
          setSelectedQuality(q);
          setIsQualityOpen(false);
        }}
        isQualityOpen={isQualityOpen}
        onToggleQualityMenu={() => setIsQualityOpen(!isQualityOpen)}
        onToggleFullscreen={toggleFullscreen}
        showControls={showControls}
        qualities={qualities}
      />

      {/* Phụ đề giả lập */}
      {isPlaying && subtitlesEnabled && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-1.5 text-xs text-text border border-themeBorder/40 select-none pointer-events-none rounded-sharp text-center font-medium max-w-md">
          [Tập {activeEpisode} - Phụ đề Tiếng Việt tự động bởi CineFlow]
        </div>
      )}

    </div>
  );
};
