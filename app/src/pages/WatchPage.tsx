import React, { useMemo, useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Play, ArrowLeft, Tv, Film, Star, Share2, Info, Calendar, Clock, AlertCircle } from "lucide-react";
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
import { ErrorState } from "../components";

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
          <div className="mt-6">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sharp ${
                isTv ? "bg-gold/10 border border-gold/20 text-gold" : "bg-primary/10 border border-primary/20 text-primary"
              }`}>
                {typeLabel}
              </span>
              <span className="text-xs text-muted">ID: #{activeItem.id}</span>
            </div>
            
            <h1 className="font-display font-extrabold text-2xl md:text-4xl mt-3 text-text leading-tight">
              {isTv ? (activeItem as any).name : (activeItem as any).title}
            </h1>
            <h2 className="text-sm text-muted font-medium italic mt-1.5">
              {isTv ? (activeItem as any).originalName : (activeItem as any).originalTitle} {activeItem.year ? `(${activeItem.year})` : ""}
            </h2>
            
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 md:gap-x-6 mt-5 text-xs text-muted border-b border-themeBorder/20 pb-6 font-bold">
              <div className="flex items-center gap-1 text-gold bg-gold/15 border border-gold/20 px-2 py-0.5 rounded-sharp">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-text">{activeItem.voteAverage ? activeItem.voteAverage.toFixed(1) : "0.0"} IMDb</span>
              </div>
              <span className="text-muted/50">•</span>
              
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span>{isTv ? (activeItem as any).firstAirDate : (activeItem as any).releaseDate}</span>
              </div>
              <span className="text-muted/50">•</span>

              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>{formattedRuntime}</span>
              </div>
            </div>

            {/* Thể loại */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              {activeItem.genres.map((genreName, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-bold bg-surface border border-themeBorder/60 px-2.5 py-0.5 rounded-sharp text-text"
                >
                  {genreName}
                </span>
              ))}
            </div>

            {/* Mô tả cốt truyện */}
            <div className="mt-8">
              <h3 className="text-xs font-black uppercase text-gold tracking-widest mb-2">Tóm tắt nội dung</h3>
              <p className="text-sm md:text-base text-muted leading-relaxed font-medium">
                {activeItem.overview || "Nội dung tóm tắt hiện đang được cập nhật..."}
              </p>
            </div>

            {/* Cảnh báo mô phỏng */}
            <div className="mt-8 p-4 bg-surface border border-themeBorder/40 rounded-sharp flex gap-3 items-start">
              <AlertCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-text uppercase tracking-wide">Lưu ý mô phỏng trình phát</h4>
                <p className="text-[11px] text-muted leading-relaxed mt-1">
                  Trang chiếu phim đang chạy ở chế độ nhúng Trailer bản quyền chính thức từ TMDB. CineFlow cam kết tuân thủ nghiêm ngặt bản quyền số, không lưu trữ hoặc truyền phát lậu phim thương mại có bản quyền.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CỘT BÊN PHẢI (SIDE PANEL): Tập phim & Đề xuất */}
        <div className="space-y-6">
          
          {/* A. Dành riêng cho Phim Bộ: Danh sách Tập phim giả lập */}
          {isTv && (
            <div className="border border-themeBorder bg-surface p-6 rounded-sharp text-left shadow-xl">
              <h2 className="font-display font-bold text-base text-text mb-4 flex items-center gap-2">
                <Tv className="w-5 h-5 text-gold" />
                <span>Danh sách tập phim</span>
              </h2>

              {/* Tính toán hiển thị số lượng tập từ dữ liệu thực tế */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-1">
                {Array.from({ length: Math.min((activeItem as any).numberOfEpisodes || 12, 24) }).map((_, idx) => {
                  const epNum = idx + 1;
                  const isActive = activeEpisode === epNum;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveEpisode(epNum)}
                      className={`h-9 text-xs font-bold rounded-sharp border transition-all ${
                        isActive
                          ? "bg-gold border-gold text-background shadow-lg shadow-gold/15"
                          : "bg-background border-themeBorder text-text hover:border-gold/60"
                      }`}
                    >
                      Tập {epNum}
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-4 text-[10px] text-muted italic text-center">
                Mô phỏng phát sóng Mùa 1 - Tập {activeEpisode}
              </div>
            </div>
          )}

          {/* B. Đề xuất phim chiếu tiếp */}
          <div className="border border-themeBorder bg-surface p-6 rounded-sharp text-left shadow-xl">
            <h2 className="font-display font-bold text-base text-text mb-5 flex items-center gap-2">
              <Film className="w-5 h-5 text-gold" />
              <span>Nội dung tương tự</span>
            </h2>

            {relatedList && relatedList.length > 0 ? (
              <div className="space-y-4">
                {relatedList.map((item) => (
                  <Link
                    key={item.id}
                    to={`/watch/${isTv ? "tv" : "movie"}/${item.id}`}
                    className="flex gap-3 p-2 hover:bg-background/80 border border-transparent hover:border-themeBorder rounded-sharp transition-all group"
                  >
                    {/* Poster nhỏ */}
                    <div className="w-16 aspect-[2/3] bg-themeBorder rounded-sharp overflow-hidden flex-shrink-0 relative">
                      <img
                        src={item.posterUrl || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=120&auto=format&fit=crop&q=80"}
                        alt={isTv ? (item as any).name : (item as any).title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-4 h-4 text-gold fill-current" />
                      </div>
                    </div>

                    {/* Chi tiết text nhỏ */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <h4 className="text-xs font-bold text-text truncate group-hover:text-gold transition-colors">
                        {isTv ? (item as any).name : (item as any).title}
                      </h4>
                      <span className="text-[10px] text-muted block mt-1">
                        {item.year || "2026"} • {isTv ? "Phim Bộ" : "Phim Lẻ"}
                      </span>
                      <div className="flex items-center gap-1 text-gold text-[10px] font-black mt-2">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{item.voteAverage ? item.voteAverage.toFixed(1) : "0.0"}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted">Hiện chưa có phim đề cử tương tự.</p>
            )}
          </div>

          {/* C. Các hành động hỗ trợ phụ */}
          <div className="flex gap-3">
            <button 
              onClick={() => alert("Đã sao chép liên kết xem phim vào Clipboard!")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-surface hover:bg-themeBorder border border-themeBorder rounded-sharp text-xs font-bold text-text transition-all"
            >
              <Share2 className="w-4 h-4 text-gold" />
              <span>Chia sẻ</span>
            </button>
            <button 
              onClick={() => alert("Cảm ơn bạn đã phản hồi! Lỗi đã được gửi tới quản trị viên.")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-surface hover:bg-themeBorder border border-themeBorder rounded-sharp text-xs font-bold text-text transition-all"
            >
              <Info className="w-4 h-4 text-gold" />
              <span>Báo lỗi</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WatchPage;
