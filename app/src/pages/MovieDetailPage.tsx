import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Star, Heart, Calendar, Clock, ArrowLeft, Check, Film, Sparkles } from 'lucide-react';
import {
    useMovieDetail,
    useMovieVideos,
    useMovieCredits,
    useMovieRecommendations,
    useSimilarMovies,
} from '../hooks/useMovieDetail';
import { MovieCard, LoadingState, ErrorState, CastGrid, TrailerModal, Button, Badge, Container } from '../components';
import { useWatchlist } from '../hooks/useWatchlist';
import { mapNormalizedToMovie } from '../utils/movieMapper';

/**
 * MovieDetailPage - Trang thông tin chi tiết phim điện ảnh (Cinematic Detail Page)
 */
export const MovieDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const movieId = id || '';

    // 1. Gọi các custom hooks để tải dữ liệu song song từ TMDB Proxy Backend
    const { data: movie, loading: detailLoading, error: detailError, refetch: refetchDetail } = useMovieDetail(movieId);
    const { data: videos } = useMovieVideos(movieId);
    const { data: cast, loading: castLoading } = useMovieCredits(movieId);
    const { data: recommendations, loading: recsLoading } = useMovieRecommendations(movieId);
    const { data: similar, loading: similarLoading } = useSimilarMovies(movieId);

    // Trạng thái mở/đóng Modal Trailer YouTube
    const [isTrailerOpen, setIsTrailerOpen] = useState<boolean>(false);

    // Quản lý trạng thái yêu thích (Watchlist) sử dụng custom hook
    const { addToWatchlist, removeFromWatchlist, isInWatchlist: checkWatchlist } = useWatchlist();
    const isInWatchlist = checkWatchlist(movie?.id || '');

    // Cuộn lên đầu trang mỗi khi ID phim thay đổi (người dùng bấm phim gợi ý)
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [movieId]);

    // Thêm/Xóa phim khỏi danh sách yêu thích
    const handleToggleWatchlist = () => {
        if (!movie) return;
        if (isInWatchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie);
        }
    };

    // Tìm video YouTube đầu tiên được đánh dấu là Trailer, hoặc video bất kỳ trên YouTube
    const trailerVideo = useMemo(() => {
        if (!videos || videos.length === 0) return null;
        return (
            videos.find((v) => v.isTrailer && v.site.toLowerCase() === 'youtube') ||
            videos.find((v) => v.site.toLowerCase() === 'youtube') ||
            null
        );
    }, [videos]);

    const handleOpenTrailer = () => {
        if (trailerVideo && trailerVideo.key) {
            setIsTrailerOpen(true);
        } else {
            alert('Rất tiếc! Hiện tại chưa cập nhật video Trailer trực tuyến cho bộ phim này.');
        }
    };

    // Hàm gom tất cả trạng thái tải để hiển thị khung xương (Skeleton) tổng quát
    const isPageLoading = detailLoading && !movie;

    if (isPageLoading) {
        return <MovieDetailSkeleton />;
    }

    if (detailError || !movie) {
        return (
            <Container py="none" className="py-24 min-h-[70vh] flex flex-col items-center justify-center">
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
            </Container>
        );
    }

    // Định dạng thời lượng phim: ví dụ 135 phút -> 2h 15m
    const formattedRuntime = movie.runtime
        ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
        : 'Đang cập nhật';

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
                    src={
                        movie.backdropUrl ||
                        'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1600&auto=format&fit=crop&q=80'
                    }
                    alt={movie.title}
                    className="w-full h-full object-cover object-top scale-105 filter brightness-[0.7] contrast-[1.05]"
                />
            </div>

            {/* 2. Khối thông tin trung tâm đè lên Backdrop */}
            <Container py="none" className="relative z-20 -mt-40 md:-mt-64 px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                    {/* A. Poster của phim */}
                    <div className="w-52 md:w-72 aspect-[2/3] bg-surface border border-white/5 rounded-sharp overflow-hidden flex-shrink-0 shadow-2xl relative group mx-auto lg:mx-0">
                        <img
                            src={
                                movie.posterUrl ||
                                'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80'
                            }
                            alt={movie.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Lớp phủ hover hiển thị nút play nhanh */}
                        <div
                            onClick={handleOpenTrailer}
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                        >
                            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-primary/35">
                                <Play className="w-6 h-6 text-text fill-text ml-0.5" />
                            </div>
                        </div>
                    </div>

                    {/* B. Thông tin chi tiết */}
                    <div className="flex-1 text-center lg:text-left">
                        {/* Hàng nhỏ trên cùng */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-4">
                            <Badge variant="gold" size="sm">
                                Độc Quyền
                            </Badge>
                            {movie.releaseDate && (
                                <div className="flex items-center gap-1.5 text-xs text-muted font-bold">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span>{new Date(movie.releaseDate).getFullYear()}</span>
                                </div>
                            )}
                            {formattedRuntime && (
                                <div className="flex items-center gap-1.5 text-xs text-muted font-bold">
                                    <Clock className="w-4 h-4" />
                                    <span>{formattedRuntime}</span>
                                </div>
                            )}
                        </div>

                        {/* Tiêu đề & Tagline */}
                        <h1 className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl tracking-tight text-text mb-4 uppercase leading-[1.1]">
                            {movie.title}
                        </h1>
                        {movie.tagline && (
                            <p className="text-sm md:text-base text-gold font-medium italic mb-6 leading-relaxed">
                                "{movie.tagline}"
                            </p>
                        )}

                        {/* Điểm số đánh giá & Thể loại */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
                            <div className="flex items-center gap-1.5 bg-surface border border-themeBorder px-3 py-1.5 rounded-sharp">
                                <Star className="w-4 h-4 text-gold fill-gold" />
                                <span className="text-sm font-black text-text">
                                    {movie.voteAverage?.toFixed(1) || '0.0'}
                                </span>
                                <span className="text-xs text-muted font-semibold">/10</span>
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                {movie.genres?.map((genre, index) => (
                                    <Badge key={index} variant="glass" size="sm">
                                        {genre}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Nội dung tóm tắt (Overview) */}
                        <div className="mb-8 max-w-3xl">
                            <h3 className="font-display font-bold text-xs uppercase tracking-widest text-text mb-3">
                                Tóm tắt nội dung
                            </h3>
                            <p className="text-xs md:text-sm text-muted leading-relaxed text-justify">
                                {movie.overview ||
                                    'Hiện tại chưa có tóm tắt chi tiết cho bộ phim này. Vui lòng quay lại sau.'}
                            </p>
                        </div>

                        {/* Cột các Nút hành động */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <Link to={`/watch/movie/${movie.id}`}>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="px-8 bg-primary hover:bg-primary-hover text-text border-none shadow-xl shadow-primary/10"
                                    icon={<Play className="w-4 h-4 fill-current" />}
                                >
                                    Xem Ngay
                                </Button>
                            </Link>

                            {trailerVideo && (
                                <Button
                                    onClick={handleOpenTrailer}
                                    variant="outline"
                                    size="lg"
                                    className="px-6 border-themeBorder text-muted hover:text-text hover:bg-surface/50"
                                    icon={<Film className="w-4 h-4" />}
                                >
                                    Trailer
                                </Button>
                            )}

                            <Button
                                onClick={handleToggleWatchlist}
                                variant={isInWatchlist ? 'secondary' : 'outline'}
                                size="lg"
                                className={`px-5 ${
                                    isInWatchlist
                                        ? 'bg-gold/10 hover:bg-gold/15 border-gold/30 text-gold'
                                        : 'border-themeBorder text-muted hover:text-text hover:bg-surface/50'
                                }`}
                                icon={isInWatchlist ? <Check className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                            >
                                {isInWatchlist ? 'Đã thích' : 'Yêu Thích'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* C. Lưới diễn viên chính (Cast Preview) */}
                <CastGrid cast={cast} loading={castLoading} />

                {/* D. Danh sách phim gợi ý đề xuất (Recommendations) */}
                <div className="mt-20 pt-12 border-t border-themeBorder/20">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-gold" />
                            <h3 className="text-xs font-black uppercase tracking-widest text-text">
                                Có Thể Bạn Sẽ Thích
                            </h3>
                        </div>
                    </div>
                    {recsLoading ? (
                        <LoadingState
                            variant="skeleton"
                            skeletonCount={5}
                            gridClass="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
                        />
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
                        <LoadingState
                            variant="skeleton"
                            skeletonCount={5}
                            gridClass="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
                        />
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
            </Container>

            {/* 3. Modal xem Trailer Youtube */}
            <TrailerModal
                isOpen={isTrailerOpen}
                onClose={() => setIsTrailerOpen(false)}
                videoKey={trailerVideo?.key}
                title={movie.title}
            />
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
            <Container py="none" className="relative z-20 -mt-36 px-8 flex flex-col lg:flex-row gap-12">
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
            </Container>
        </div>
    );
};

export default MovieDetailPage;
