import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Play, Star, Heart, Calendar, Clock, ArrowLeft, X, Check, Users, Film, Sparkles } from "lucide-react";
import {
  useMovieDetail,
  useMovieVideos,
  useMovieCredits,
  useMovieRecommendations,
  useSimilarMovies
} from "../hooks/useMovieDetail";
import { MovieCard, LoadingState, ErrorState } from "../components";
import type { Movie } from "../types/movie";
import type { NormalizedMovie } from "../types/api";

/**
 * Hàm hỗ trợ chuyển đổi dữ liệu phim đã chuẩn hóa (NormalizedMovie)
 * sang định dạng hiển thị cũ (Movie) để sử dụng với component MovieCard.
 */
const mapNormalizedToMovie = (normalized: NormalizedMovie): Movie => {
  return {
    id: normalized.id,
    title: normalized.title,
    originalTitle: normalized.originalTitle,
    poster: normalized.posterUrl || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80",
    backdrop: normalized.backdropUrl || "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1600&auto=format&fit=crop&q=80",
    year: normalized.year || 2026,
    genre: normalized.genres.length > 0 ? normalized.genres : ["Đang cập nhật"],
    rating: normalized.voteAverage,
    duration: normalized.runtime ? `${Math.floor(normalized.runtime / 60)}h ${normalized.runtime % 60}m` : "2h 00m",
    quality: normalized.quality || "FHD",
    subtitle: normalized.subtitleLanguages.length > 0 ? normalized.subtitleLanguages[0] : "Vietsub",
    description: normalized.overview || "Chưa có tóm tắt nội dung.",
    views: normalized.voteCount * 123
  };
};

/**
 * MovieDetailPage - Trang thông tin chi tiết phim điện ảnh (Cinematic Detail Page)
 */
export const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id || "";

  // 1. Gọi các custom hooks để tải dữ liệu song song từ TMDB Proxy Backend
  const { data: movie, loading: detailLoading, error: detailError, refetch: refetchDetail } = useMovieDetail(movieId);
  const { data: videos } = useMovieVideos(movieId);
  const { data: cast, loading: castLoading } = useMovieCredits(movieId);
  const { data: recommendations, loading: recsLoading } = useMovieRecommendations(movieId);
  const { data: similar, loading: similarLoading } = useSimilarMovies(movieId);

  // Trạng thái mở/đóng Modal Trailer YouTube
  const [isTrailerOpen, setIsTrailerOpen] = useState<boolean>(false);
  
  // Trạng thái yêu thích (Watchlist) sử dụng localStorage
  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false);

  // Cuộn lên đầu trang mỗi khi ID phim thay đổi (người dùng bấm phim gợi ý)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [movieId]);

  // Kiểm tra xem phim đã có trong danh sách yêu thích (Watchlist) chưa
  useEffect(() => {
    if (!movieId) return;
    try {
      const watchlist = JSON.parse(localStorage.getItem("cineflow_watchlist") || "[]");
      setIsInWatchlist(watchlist.some((item: any) => String(item.id) === String(movieId)));
    } catch (e) {
      console.error("Lỗi khi đọc Watchlist từ localStorage:", e);
    }
  }, [movieId]);

  // Thêm/Xóa phim khỏi danh sách yêu thích
  const handleToggleWatchlist = () => {
    if (!movie) return;
    try {
      const watchlist = JSON.parse(localStorage.getItem("cineflow_watchlist") || "[]");
      let updatedWatchlist;
      
      if (isInWatchlist) {
        // Xóa phim khỏi Watchlist
        updatedWatchlist = watchlist.filter((item: any) => String(item.id) !== String(movieId));
      } else {
        // Thêm phim vào Watchlist
        updatedWatchlist = [
          ...watchlist,
          {
            id: movie.id,
            title: movie.title,
            originalTitle: movie.originalTitle,
            posterUrl: movie.posterUrl,
            voteAverage: movie.voteAverage,
            year: movie.year,
            genres: movie.genres,
            mediaType: "movie"
          }
        ];
      }
      
      localStorage.setItem("cineflow_watchlist", JSON.stringify(updatedWatchlist));
      setIsInWatchlist(!isInWatchlist);
    } catch (e) {
      console.error("Lỗi cập nhật Watchlist:", e);
    }
  };

  // Tìm video YouTube đầu tiên được đánh dấu là Trailer, hoặc video bất kỳ trên YouTube
  const trailerVideo = useMemo(() => {
    if (!videos || videos.length === 0) return null;
    return (
      videos.find((v) => v.isTrailer && v.site.toLowerCase() === "youtube") ||
      videos.find((v) => v.site.toLowerCase() === "youtube") ||
      null
    );
  }, [videos]);

  const handleOpenTrailer = () => {
    if (trailerVideo && trailerVideo.key) {
      setIsTrailerOpen(true);
    } else {
      alert("Rất tiếc! Hiện tại chưa cập nhật video Trailer trực tuyến cho bộ phim này.");
    }
  };

  // Hàm gom tất cả trạng thái tải để hiển thị khung xương (Skeleton) tổng quát
  const isPageLoading = detailLoading && !movie;

  if (isPageLoading) {
    return <MovieDetailSkeleton />;
  }

  if (detailError || !movie) {
    return (
      <div className="container-custom py-24 min-h-[70vh] flex flex-col items-center justify-center">
        <ErrorState
          variant="blocking"
          message={`Không thể tìm thấy thông tin chi tiết cho bộ phim với mã số: #${movieId}. Vui lòng thử lại sau hoặc quay lại Trang chủ.`}
          onRetry={refetchDetail}
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

  // Định dạng thời lượng phim: ví dụ 135 phút -> 2h 15m
  const formattedRuntime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "Đang cập nhật";

  return (
    <div className="min-h-screen pb-20 bg-background text-left relative overflow-hidden">
      {/* 1. Backdrop Hero (Ảnh nền lớn phủ bóng mờ nghệ thuật) */}
      <div className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden">
        {/* Lớp phủ chuyển màu chuyển sắc (Gradients overlay) */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-black/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent z-10" />

        {/* Nút quay lại trang chủ / trang phim */}
        <Link
          to="/movies"
          className="absolute top-6 left-6 md:left-12 z-20 flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-sharp text-[10px] md:text-xs font-bold uppercase tracking-wider text-text hover:bg-primary hover:border-primary transition-all duration-300 shadow-xl"
        >
          <ArrowLeft className="w-4 h-4 text-gold" />
          <span>Danh sách phim</span>
        </Link>

        {/* Ảnh nền */}
        <img
          src={movie.backdropUrl || "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1600&auto=format&fit=crop&q=80"}
          alt={movie.title}
          className="w-full h-full object-cover object-top scale-105 filter brightness-[0.7] contrast-[1.05]"
        />
      </div>

      {/* 2. Khối thông tin trung tâm đè lên Backdrop */}
      <div className="container-custom relative z-20 -mt-40 md:-mt-64 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* A. Poster của phim */}
          <div className="w-52 md:w-72 aspect-[2/3] bg-surface border border-white/5 rounded-sharp overflow-hidden flex-shrink-0 shadow-2xl relative group mx-auto lg:mx-0">
            <img
              src={movie.posterUrl || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80"}
              alt={movie.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            {/* Lớp phủ hover hiển thị nút play nhanh */}
            <div 
              onClick={handleOpenTrailer}
              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
            >
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-primary/35">
                <Play className="w-6 h-6 text-text fill-current ml-1" />
              </div>
            </div>
          </div>

          {/* B. Toàn bộ thông tin văn bản */}
          <div className="flex-1 text-center lg:text-left lg:pt-16">
            {/* Gắn thẻ chất lượng và nhãn phụ đề */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-4">
              <span className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sharp">
                {movie.quality}
              </span>
              {movie.subtitleLanguages.map((sub, idx) => (
                <span key={idx} className="bg-surface border border-themeBorder text-muted text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sharp">
                  {sub}
                </span>
              ))}
            </div>

            {/* Tiêu đề chính & Tiêu đề gốc */}
            <h1 className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl tracking-tight text-text leading-none">
              {movie.title}
            </h1>
            <h2 className="text-sm md:text-lg text-muted font-medium mt-2 italic">
              {movie.originalTitle} {movie.year ? `(${movie.year})` : ""}
            </h2>

            {/* Các thẻ thông số (Rating, Year, Duration) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6 text-xs text-muted font-bold">
              {/* Điểm IMDb */}
              <div className="flex items-center gap-1 bg-gold/10 border border-gold/20 text-gold px-2.5 py-1 rounded-sharp">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{movie.voteAverage.toFixed(1)} IMDb</span>
              </div>
              
              {/* Số lượt đánh giá */}
              <span className="text-muted/60">{movie.voteCount.toLocaleString()} lượt vote</span>
              <span>•</span>

              {/* Năm phát hành */}
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>{movie.releaseDate || "Chưa rõ"}</span>
              </div>
              <span>•</span>

              {/* Thời lượng */}
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>{formattedRuntime}</span>
              </div>
            </div>

            {/* Thể loại phim */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-4">
              {movie.genres.map((genreName, idx) => (
                <span
                  key={idx}
                  className="text-xs font-bold bg-surface/50 border border-themeBorder/60 px-3 py-1 rounded-sharp text-text hover:border-primary/45 transition-colors"
                >
                  {genreName}
                </span>
              ))}
            </div>

            {/* Tóm tắt cốt truyện */}
            <div className="mt-8">
              <h3 className="text-xs font-black uppercase tracking-wider text-primary mb-2">Tóm tắt nội dung</h3>
              <p className="text-sm md:text-base text-muted leading-relaxed max-w-3xl font-medium">
                {movie.overview || "Nội dung tóm tắt của bộ phim này hiện đang được cập nhật..."}
              </p>
            </div>

            {/* Các nút hành động chính */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-8">
              {/* Nút Xem Phim */}
              <Link
                to={`/watch/movie/${movie.id}`}
                className="flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary/90 text-text text-xs font-black uppercase tracking-wider rounded-sharp shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Xem Ngay</span>
              </Link>
              
              {/* Nút Xem Trailer */}
              <button
                onClick={handleOpenTrailer}
                className="flex items-center gap-2 px-5 py-3.5 bg-surface hover:bg-themeBorder border border-themeBorder text-text text-xs font-black uppercase tracking-wider rounded-sharp transition-all duration-300"
              >
                <Film className="w-4 h-4 text-gold" />
                <span>Xem Trailer</span>
              </button>

              {/* Nút thêm vào danh sách phát (Watchlist) */}
              <button
                onClick={handleToggleWatchlist}
                className={`flex items-center gap-2 px-5 py-3.5 border text-xs font-black uppercase tracking-wider rounded-sharp transition-all duration-300 ${
                  isInWatchlist
                    ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/40"
                    : "bg-surface hover:bg-themeBorder border-themeBorder text-text"
                }`}
              >
                {isInWatchlist ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Đã thích</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 text-primary" />
                    <span>Yêu Thích</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* C. Lưới diễn viên chính (Cast Preview) */}
        <div className="mt-16 pt-12 border-t border-themeBorder/20">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-black uppercase tracking-widest text-text">Dàn Diễn Viên Chính</h3>
          </div>
          
          {castLoading ? (
            <div className="flex gap-4 overflow-x-auto pb-4">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="flex flex-col items-center gap-2 w-24 flex-shrink-0 animate-pulse">
                  <div className="w-16 h-16 bg-surface rounded-full border border-themeBorder/50" />
                  <div className="h-3 bg-surface w-12 rounded" />
                </div>
              ))}
            </div>
          ) : cast && cast.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
              {cast.slice(0, 8).map((actor) => (
                <div key={actor.id} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-surface border border-themeBorder/40 shadow-lg mb-3 transform group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={actor.profileUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"}
                      alt={actor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-bold text-text truncate w-full">{actor.name}</span>
                  <span className="text-[10px] text-muted truncate w-full mt-0.5">{actor.character}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted">Thông tin diễn viên đang được cập nhật.</p>
          )}
        </div>

        {/* D. Danh sách phim gợi ý đề xuất (Recommendations) */}
        <div className="mt-20 pt-12 border-t border-themeBorder/20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <h3 className="text-xs font-black uppercase tracking-widest text-text">Có Thể Bạn Sẽ Thích</h3>
            </div>
          </div>
          {recsLoading ? (
            <LoadingState variant="skeleton" skeletonCount={5} gridClass="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6" />
          ) : recommendations && recommendations.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {recommendations.slice(0, 6).map((item) => (
                <Link key={item.id} to={`/movie/${item.id}`} className="block">
                  <MovieCard movie={mapNormalizedToMovie(item)} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted">Chưa có đề xuất phù hợp cho phim này.</p>
          )}
        </div>

        {/* E. Danh sách phim tương tự (Similar Movies) */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-black uppercase tracking-widest text-text">Phim Tương Tự</h3>
            </div>
          </div>
          {similarLoading ? (
            <LoadingState variant="skeleton" skeletonCount={5} gridClass="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6" />
          ) : similar && similar.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {similar.slice(0, 6).map((item) => (
                <Link key={item.id} to={`/movie/${item.id}`} className="block">
                  <MovieCard movie={mapNormalizedToMovie(item)} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted">Chưa tìm thấy phim tương tự.</p>
          )}
        </div>

      </div>

      {/* 3. Modal xem Trailer Youtube */}
      {isTrailerOpen && trailerVideo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[999] flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-4xl aspect-video bg-black border border-white/10 rounded-sharp overflow-hidden shadow-2xl">
            {/* Nút đóng modal */}
            <button
              onClick={() => setIsTrailerOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-primary hover:text-text rounded-sharp text-muted transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1`}
              title={`${movie.title} Trailer`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Khung xương hiển thị khi đang tải dữ liệu (Skeleton Loader)
 */
const MovieDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen pb-20 bg-background text-left animate-pulse">
      {/* Backdrop Skeleton */}
      <div className="relative w-full h-[50vh] bg-surface/30" />
      
      {/* Content Skeleton */}
      <div className="container-custom relative z-20 -mt-36 px-8 flex flex-col lg:flex-row gap-12">
        {/* Poster Skeleton */}
        <div className="w-52 md:w-72 aspect-[2/3] bg-surface border border-themeBorder/40 rounded-sharp flex-shrink-0" />
        
        {/* Detail Info Skeleton */}
        <div className="flex-1 lg:pt-16 space-y-4">
          <div className="h-4 bg-surface w-24 rounded" />
          <div className="h-10 bg-surface w-3/4 rounded" />
          <div className="h-6 bg-surface w-1/2 rounded" />
          <div className="flex gap-4">
            <div className="h-4 bg-surface w-16 rounded" />
            <div className="h-4 bg-surface w-24 rounded" />
            <div className="h-4 bg-surface w-16 rounded" />
          </div>
          <div className="h-20 bg-surface w-full rounded" />
          <div className="flex gap-3">
            <div className="h-10 bg-surface w-28 rounded" />
            <div className="h-10 bg-surface w-28 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
