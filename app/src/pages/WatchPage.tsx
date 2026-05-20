import React, { useMemo, useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { ArrowLeft, Film, Share2, Info } from "lucide-react";
import {
  useMovieDetail,
  useMovieVideos,
  useMovieRecommendations,
  useSimilarMovies
} from "../hooks/useMovieDetail";
import {
  useTvDetail,
  useTvVideos,
  useTvRecommendations,
  useTvSimilar
} from "../hooks/useTvDetail";
import { 
  ErrorState, 
  WatchEpisodeSelector, 
  RelatedMediaSidebar, 
  WatchMediaInfo,
  Button
} from "../components";
import { useWatchHistory } from "../hooks/useWatchHistory";

/**
 * WatchPage - Trang chiếu trailer phim lẻ và phim bộ chuẩn CineFlow.
 */
export const WatchPage: React.FC = () => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const location = useLocation();

  // Xác định xem đường dẫn hiện tại là phim bộ (TV Show) hay phim lẻ (Movie)
  const isTv = type === "tv" || location.pathname.includes("/watch/tv/");
  const activeId = id || "";

  // 1. Khai báo toàn bộ các Hooks ở mức cao nhất theo quy tắc React Hooks
  // Các hooks sẽ tự động bỏ qua việc tải dữ liệu nếu ID truyền vào là chuỗi rỗng
  const { data: movie, loading: movieLoading, error: movieError, refetch: refetchMovie } = useMovieDetail(isTv ? "" : activeId);
  const { data: movieVideos } = useMovieVideos(isTv ? "" : activeId);
  const { data: movieRecs } = useMovieRecommendations(isTv ? "" : activeId);
  const { data: movieSimilar } = useSimilarMovies(isTv ? "" : activeId);

  const { data: tvShow, loading: tvLoading, error: tvError, refetch: refetchTv } = useTvDetail(isTv ? activeId : "");
  const { data: tvVideos } = useTvVideos(isTv ? activeId : "");
  const { data: tvRecs } = useTvRecommendations(isTv ? activeId : "");
  const { data: tvSimilar } = useTvSimilar(isTv ? activeId : "");

  // Trạng thái tập phim đang chọn (dành riêng cho Phim Bộ)
  const [activeEpisode, setActiveEpisode] = useState<number>(1);

  // Cuộn lên đầu trang khi thay đổi phim chiếu tiếp
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setActiveEpisode(1);
  }, [activeId, isTv]);

  // Nhất quán dữ liệu hiển thị hiện hành dựa trên loại phương tiện
  const activeItem = isTv ? tvShow : movie;
  const activeVideos = isTv ? tvVideos : movieVideos;
  const activeRecs = isTv ? tvRecs : movieRecs;
  const activeSimilar = isTv ? tvSimilar : movieSimilar;
  const activeLoading = isTv ? tvLoading : movieLoading;
  const activeError = isTv ? tvError : movieError;
  const refetchActive = isTv ? refetchTv : refetchMovie;

  const { addToHistory } = useWatchHistory();

  // Tự động lưu vào lịch sử xem khi phim được tải thành công
  useEffect(() => {
    if (activeItem) {
      addToHistory(activeItem);
    }
  }, [activeItem, addToHistory]);

  const typeLabel = isTv ? "Phim Bộ" : "Phim Lẻ";

  // Tìm kiếm video Trailer chính thức trên YouTube từ TMDB Videos
  const trailerVideo = useMemo(() => {
    if (!activeVideos || activeVideos.length === 0) return null;
    return (
      activeVideos.find((v) => v.isTrailer && v.site.toLowerCase() === "youtube") ||
      activeVideos.find((v) => v.site.toLowerCase() === "youtube") ||
      null
    );
  }, [activeVideos]);

  // Kết hợp và lọc danh sách phim liên quan đề xuất (tránh trùng lặp)
  const relatedList = useMemo(() => {
    const combined = [...(activeRecs || []), ...(activeSimilar || [])];
    const unique = combined.filter((item, index, self) => 
      self.findIndex(t => t.id === item.id) === index
    );
    return unique.slice(0, 6);
  }, [activeRecs, activeSimilar]);

  // Xử lý loading và hiển thị khung xương (Skeleton)
  if (activeLoading && !activeItem) {
    return (
      <div className="container-custom py-12 min-h-[85vh] text-left">
        <div className="mb-6 h-4 bg-surface w-36 rounded animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="w-full aspect-video bg-surface rounded-sharp animate-pulse mb-6" />
            <div className="h-8 bg-surface w-3/4 rounded animate-pulse mb-3" />
            <div className="h-4 bg-surface w-1/2 rounded animate-pulse mb-6" />
            <div className="h-20 bg-surface w-full rounded animate-pulse" />
          </div>
          <div className="space-y-6">
            <div className="h-[300px] bg-surface rounded-sharp animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Hiển thị lỗi blocking nếu không tìm thấy phim
  if (activeError || !activeItem) {
    return (
      <div className="container-custom py-24 min-h-[70vh] flex flex-col items-center justify-center">
        <ErrorState
          variant="blocking"
          message={`Không thể tải chương trình phát cho nội dung này (ID: #${activeId}). Vui lòng kiểm tra lại kết nối mạng.`}
          onRetry={refetchActive}
        />
        <Link
          to="/"
          className="mt-6 px-6 py-2.5 bg-surface hover:bg-themeBorder border border-themeBorder text-xs font-bold uppercase tracking-wider rounded-sharp text-text transition-colors duration-300"
        >
          Quay lại Trang Chủ
        </Link>
      </div>
    );
  }

  // Định dạng thời lượng
  const formattedRuntime = !isTv && (activeItem as any).runtime
    ? `${Math.floor((activeItem as any).runtime / 60)}h ${(activeItem as any).runtime % 60}m`
    : isTv && (activeItem as any).episodeRunTime
    ? `${(activeItem as any).episodeRunTime} phút`
    : "Đang cập nhật";

  return (
    <div className="container-custom py-8 text-left">
      {/* Nút quay lại trang thông tin chi tiết */}
      <div className="mb-6">
        <Link 
          to={isTv ? `/tv/${activeItem.id}` : `/movie/${activeItem.id}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-gold transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 text-gold" />
          <span>Quay lại chi tiết phim</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CỘT CHÍNH: Trình phát phim và Thông tin chi tiết */}
        <div className="lg:col-span-2">
          
          {/* Trình phát Video Iframe YouTube / Empty State */}
          <div className="relative aspect-video w-full bg-black border border-themeBorder/60 rounded-sharp overflow-hidden flex items-center justify-center group shadow-2xl">
            {trailerVideo && trailerVideo.key ? (
              /* Embed Iframe YouTube an toàn */
              <iframe
                src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
                title={`${isTv ? (activeItem as any).name : (activeItem as any).title} Trailer`}
                className="w-full h-full border-0 absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              /* Giao diện Empty State nghệ thuật nếu không có Trailer */
              <>
                <div className="absolute inset-0 filter blur-xl brightness-50 opacity-40 scale-110">
                  <img
                    src={activeItem.backdropUrl || "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=80"}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />
                <div className="flex flex-col items-center gap-4 text-center z-10 p-6 max-w-md">
                  <div className="w-16 h-16 bg-surface/60 border border-themeBorder/40 rounded-full flex items-center justify-center">
                    <Film className="w-8 h-8 text-gold" />
                  </div>
                  <h2 className="text-lg font-bold text-text">Trailer đang được cập nhật</h2>
                  <p className="text-xs text-muted leading-relaxed">
                    Rất tiếc! Hiện tại chưa có bản phát hành Trailer chính thức từ hãng phim cho tác phẩm này. Chúng tôi sẽ tự động hiển thị ngay khi TMDB cập nhật.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Tiêu đề & Thông tin nhanh bên dưới trình phát */}
          <WatchMediaInfo
            activeItem={activeItem}
            isTv={isTv}
            typeLabel={typeLabel}
            formattedRuntime={formattedRuntime}
          />
        </div>

        {/* CỘT BÊN PHẢI (SIDE PANEL): Tập phim & Đề xuất */}
        <div className="space-y-6">
          
          {/* A. Dành riêng cho Phim Bộ: Danh sách Tập phim giả lập */}
          {isTv && (
            <WatchEpisodeSelector
              numberOfEpisodes={(activeItem as any).numberOfEpisodes}
              activeEpisode={activeEpisode}
              onEpisodeChange={setActiveEpisode}
            />
          )}

          {/* B. Đề xuất phim chiếu tiếp */}
          <RelatedMediaSidebar relatedList={relatedList} isTv={isTv} />

          {/* C. Các hành động hỗ trợ phụ */}
          <div className="flex gap-3">
            <Button 
              onClick={() => alert("Đã sao chép liên kết xem phim vào Clipboard!")}
              variant="secondary"
              size="sm"
              className="flex-1 bg-surface hover:bg-themeBorder border border-themeBorder text-xs font-bold text-text"
              icon={<Share2 className="w-4 h-4 text-gold" />}
            >
              Chia sẻ
            </Button>
            <Button 
              onClick={() => alert("Cảm ơn bạn đã phản hồi! Lỗi đã được gửi tới quản trị viên.")}
              variant="secondary"
              size="sm"
              className="flex-1 bg-surface hover:bg-themeBorder border border-themeBorder text-xs font-bold text-text"
              icon={<Info className="w-4 h-4 text-gold" />}
            >
              Báo lỗi
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WatchPage;
