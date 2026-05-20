import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Play, Star, Heart, Calendar, Clock, ArrowLeft, Check, Users, Film, Sparkles, Tv } from "lucide-react";
import {
  useTvDetail,
  useTvCredits,
  useTvRecommendations,
  useTvSimilar
} from "../hooks/useTvDetail";
import { MediaCard, LoadingState, ErrorState } from "../components";

/**
 * TvDetailPage - Trang hiển thị chi tiết phim truyền hình dài tập (TV Series Detail Page).
 */
export const TvDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tvId = id || "";

  // 1. Tải toàn bộ dữ liệu phim bộ song song từ API proxy
  const { data: tvShow, loading: detailLoading, error: detailError, refetch: refetchDetail } = useTvDetail(tvId);
  const { data: cast, loading: castLoading } = useTvCredits(tvId);
  const { data: recommendations, loading: recsLoading } = useTvRecommendations(tvId);
  const { data: similar, loading: similarLoading } = useTvSimilar(tvId);

  // Trạng thái Watchlist trong localStorage
  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false);

  // Cuộn lên đầu trang mỗi khi xem phim bộ khác
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [tvId]);

  // Kiểm tra trạng thái thích trong localStorage
  useEffect(() => {
    if (!tvId) return;
    try {
      const watchlist = JSON.parse(localStorage.getItem("cineflow_watchlist") || "[]");
      setIsInWatchlist(watchlist.some((item: any) => String(item.id) === String(tvId)));
    } catch (e) {
      console.error("Lỗi khi đọc Watchlist từ localStorage:", e);
    }
  }, [tvId]);

  // Thêm/Xóa phim khỏi danh sách yêu thích
  const handleToggleWatchlist = () => {
    if (!tvShow) return;
    try {
      const watchlist = JSON.parse(localStorage.getItem("cineflow_watchlist") || "[]");
      let updatedWatchlist;
      
      if (isInWatchlist) {
        updatedWatchlist = watchlist.filter((item: any) => String(item.id) !== String(tvId));
      } else {
        updatedWatchlist = [
          ...watchlist,
          {
            id: tvShow.id,
            title: tvShow.name,
            originalTitle: tvShow.originalName,
            posterUrl: tvShow.posterUrl,
            voteAverage: tvShow.voteAverage,
            year: tvShow.year,
            genres: tvShow.genres,
            mediaType: "tv"
          }
        ];
      }
      
      localStorage.setItem("cineflow_watchlist", JSON.stringify(updatedWatchlist));
      setIsInWatchlist(!isInWatchlist);
    } catch (e) {
      console.error("Lỗi cập nhật Watchlist:", e);
    }
  };

  const isPageLoading = detailLoading && !tvShow;

  if (isPageLoading) {
    return <TvDetailSkeleton />;
  }

  if (detailError || !tvShow) {
    return (
      <div className="container-custom py-24 min-h-[70vh] flex flex-col items-center justify-center">
        <ErrorState
          variant="blocking"
          message={`Không thể tải thông tin chi tiết cho phim bộ mã số: #${tvId}. Vui lòng kiểm tra lại kết nối mạng hoặc quay lại trang chủ.`}
          onRetry={refetchDetail}
        />
        <Link
          to="/tv"
          className="mt-6 px-6 py-2.5 bg-surface hover:bg-themeBorder border border-themeBorder text-xs font-bold uppercase tracking-wider rounded-sharp text-text transition-colors duration-300"
        >
          Quay lại danh sách Phim bộ
        </Link>
      </div>
    );
  }

  // Chuẩn hóa trạng thái hiển thị của phim bộ
  const getStatusLabel = (status: string | null) => {
    if (!status) return "Đang cập nhật";
    switch (status.toLowerCase()) {
      case "returning series":
        return "Đang phát sóng tiếp";
      case "ended":
        return "Đã hoàn thành";
      case "canceled":
        return "Đã hủy";
      case "in production":
        return "Đang sản xuất";
      case "pilot":
        return "Tập thí điểm";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-background text-left relative overflow-hidden">
      {/* 1. Backdrop Hero Banner */}
      <div className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden">
        {/* Lớp phủ chuyển màu bảo vệ văn bản */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-black/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent z-10" />

        {/* Nút quay lại danh sách */}
        <Link
          to="/tv"
          className="absolute top-6 left-6 md:left-12 z-20 flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-sharp text-[10px] md:text-xs font-bold uppercase tracking-wider text-text hover:bg-gold hover:border-gold hover:text-background transition-all duration-300 shadow-xl"
        >
          <ArrowLeft className="w-4 h-4 text-gold" />
          <span>Danh sách phim bộ</span>
        </Link>

        {/* Backdrop Image */}
        <img
          src={tvShow.backdropUrl || "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1600&auto=format&fit=crop&q=80"}
          alt={tvShow.name}
          className="w-full h-full object-cover object-top scale-105 filter brightness-[0.7] contrast-[1.05]"
        />
      </div>

      {/* 2. Khối thông tin trung tâm */}
      <div className="container-custom relative z-20 -mt-40 md:-mt-64 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* A. Poster hiển thị hình ảnh */}
          <div className="w-52 md:w-72 aspect-[2/3] bg-surface border border-white/5 rounded-sharp overflow-hidden flex-shrink-0 shadow-2xl relative group mx-auto lg:mx-0">
            <img
              src={tvShow.posterUrl || "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=600&auto=format&fit=crop&q=80"}
              alt={tvShow.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            {/* Lớp phủ hover hiển thị nút play chuyển sang watch page */}
            <Link 
              to={`/watch/tv/${tvShow.id}`}
              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
            >
              <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-gold/35">
                <Play className="w-6 h-6 text-background fill-current ml-1" />
              </div>
            </Link>
          </div>

          {/* B. Chi tiết thông tin văn bản */}
          <div className="flex-1 text-center lg:text-left lg:pt-16">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-4">
              <span className="bg-gold/10 border border-gold/20 text-gold text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sharp">
                {getStatusLabel(tvShow.status)}
              </span>
              <span className="bg-surface border border-themeBorder text-muted text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sharp">
                FHD
              </span>
              <span className="bg-surface border border-themeBorder text-muted text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sharp">
                Vietsub
              </span>
            </div>

            {/* Tên phim & Tên gốc */}
            <h1 className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl tracking-tight text-text leading-none">
              {tvShow.name}
            </h1>
            <h2 className="text-sm md:text-lg text-muted font-medium mt-2 italic">
              {tvShow.originalName} {tvShow.year ? `(${tvShow.year})` : ""}
            </h2>

            {/* Các thông số đặc thù của TV Show */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6 text-xs text-muted font-bold">
              {/* Điểm IMDb */}
              <div className="flex items-center gap-1 bg-gold/10 border border-gold/20 text-gold px-2.5 py-1 rounded-sharp">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{tvShow.voteAverage ? tvShow.voteAverage.toFixed(1) : "0.0"} IMDb</span>
              </div>
              
              <span className="text-muted/60">{tvShow.voteCount ? tvShow.voteCount.toLocaleString() : "0"} lượt vote</span>
              <span>•</span>

              {/* Ngày phát sóng đầu tiên */}
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span>Khởi chiếu: {tvShow.firstAirDate || "Chưa rõ"}</span>
              </div>
              <span>•</span>

              {/* Thời lượng mỗi tập */}
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>{tvShow.episodeRunTime ? `${tvShow.episodeRunTime} phút/tập` : "Đang cập nhật"}</span>
              </div>
            </div>

            {/* Thông số mùa và tập */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-3 text-xs font-black uppercase text-gold/90 tracking-wide">
              {tvShow.numberOfSeasons && (
                <span>Số Mùa: {tvShow.numberOfSeasons} Mùa</span>
              )}
              {tvShow.numberOfSeasons && tvShow.numberOfEpisodes && <span>|</span>}
              {tvShow.numberOfEpisodes && (
                <span>Tổng Số Tập: {tvShow.numberOfEpisodes} Tập</span>
              )}
            </div>

            {/* Thể loại */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-4">
              {tvShow.genres.map((genreName, idx) => (
                <span
                  key={idx}
                  className="text-xs font-bold bg-surface/50 border border-themeBorder/60 px-3 py-1 rounded-sharp text-text hover:border-gold/45 transition-colors"
                >
                  {genreName}
                </span>
              ))}
            </div>

            {/* Mô tả cốt truyện */}
            <div className="mt-8">
              <h3 className="text-xs font-black uppercase tracking-wider text-gold mb-2">Tóm tắt nội dung</h3>
              <p className="text-sm md:text-base text-muted leading-relaxed max-w-3xl font-medium">
                {tvShow.overview || "Nội dung tóm tắt của bộ phim truyền hình này hiện đang được cập nhật..."}
              </p>
            </div>

            {/* Các nút hành động */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-8">
              {/* Nút Xem Phim */}
              <Link
                to={`/watch/tv/${tvShow.id}`}
                className="flex items-center gap-2 px-7 py-3.5 bg-gold hover:bg-gold/90 text-background text-xs font-black uppercase tracking-wider rounded-sharp shadow-xl shadow-gold/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Xem Phim</span>
              </Link>
              
              {/* Nút Trailer chuyển hướng sang trang xem phim */}
              <Link
                to={`/watch/tv/${tvShow.id}`}
                className="flex items-center gap-2 px-5 py-3.5 bg-surface hover:bg-themeBorder border border-themeBorder text-text text-xs font-black uppercase tracking-wider rounded-sharp transition-all duration-300"
              >
                <Film className="w-4 h-4 text-gold" />
                <span>Xem Trailer</span>
              </Link>

              {/* Nút yêu thích */}
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
                    <Heart className="w-4 h-4 text-gold" />
                    <span>Yêu Thích</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* C. Danh sách Mùa phim (Seasons) dựng tự động */}
        {tvShow.numberOfSeasons && tvShow.numberOfSeasons > 0 && (
          <div className="mt-16 pt-12 border-t border-themeBorder/20">
            <div className="flex items-center gap-2 mb-6">
              <Tv className="w-4 h-4 text-gold" />
              <h3 className="text-xs font-black uppercase tracking-widest text-text">Danh Sách Mùa Phim</h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {Array.from({ length: tvShow.numberOfSeasons }).map((_, idx) => {
                const seasonNum = idx + 1;
                return (
                  <Link
                    key={seasonNum}
                    to={`/watch/tv/${tvShow.id}`}
                    className="group relative bg-surface border border-themeBorder hover:border-gold hover:-translate-y-1 rounded-sharp p-4 transition-all duration-300 text-center"
                  >
                    <div className="aspect-[2/3] bg-themeBorder rounded-sharp mb-3 overflow-hidden relative">
                      {tvShow.posterUrl ? (
                        <img
                          src={tvShow.posterUrl}
                          alt={`Mùa ${seasonNum}`}
                          className="w-full h-full object-cover brightness-[0.8] group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted">Mùa {seasonNum}</div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-8 h-8 text-gold fill-current" />
                      </div>
                    </div>
                    <h4 className="font-bold text-xs text-text group-hover:text-gold transition-colors">
                      Mùa {seasonNum}
                    </h4>
                    <span className="text-[10px] text-muted">
                      {tvShow.numberOfEpisodes 
                        ? `${Math.ceil(tvShow.numberOfEpisodes / (tvShow.numberOfSeasons || 1))} tập` 
                        : "Đang cập nhật"}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* D. Dàn Diễn Viên Chính (Cast Preview) */}
        <div className="mt-16 pt-12 border-t border-themeBorder/20">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-4 h-4 text-gold" />
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

        {/* E. Danh sách gợi ý phim bộ (Recommendations) */}
        <div className="mt-20 pt-12 border-t border-themeBorder/20">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-4 h-4 text-gold" />
            <h3 className="text-xs font-black uppercase tracking-widest text-text">Có Thể Bạn Sẽ Thích</h3>
          </div>
          {recsLoading ? (
            <LoadingState variant="skeleton" skeletonCount={5} gridClass="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6" />
          ) : recommendations && recommendations.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {recommendations.slice(0, 6).map((item) => (
                <div key={item.id} className="hover:-translate-y-1 transition-transform duration-300">
                  <MediaCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted">Chưa có đề xuất phù hợp cho phim này bộ này.</p>
          )}
        </div>

        {/* F. Phim bộ Tương Tự (Similar TV Series) */}
        <div className="mt-20 pt-12 border-t border-themeBorder/20">
          <div className="flex items-center gap-2 mb-8">
            <Film className="w-4 h-4 text-gold" />
            <h3 className="text-xs font-black uppercase tracking-widest text-text">Phim Bộ Tương Tự</h3>
          </div>
          {similarLoading ? (
            <LoadingState variant="skeleton" skeletonCount={5} gridClass="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6" />
          ) : similar && similar.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {similar.slice(0, 6).map((item) => (
                <div key={item.id} className="hover:-translate-y-1 transition-transform duration-300">
                  <MediaCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted">Chưa tìm thấy phim truyền hình tương tự.</p>
          )}
        </div>

      </div>
    </div>
  );
};

/**
 * Khung xương hiển thị khi đang tải chi tiết TV series
 */
const TvDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen pb-20 bg-background text-left animate-pulse">
      <div className="relative w-full h-[50vh] bg-surface/30" />
      <div className="container-custom relative z-20 -mt-36 px-8 flex flex-col lg:flex-row gap-12">
        <div className="w-52 md:w-72 aspect-[2/3] bg-surface border border-themeBorder/40 rounded-sharp flex-shrink-0" />
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

export default TvDetailPage;
