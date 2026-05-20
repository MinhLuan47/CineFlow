import React, { useCallback } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Film, Flame, Star, Calendar, Layers } from 'lucide-react';
import {
    getTrendingMovies,
    getPopularMovies,
    getNowPlayingMovies,
    getTopRatedMovies,
    getUpcomingMovies,
} from '../services/movieApi';
import { useMovies } from '../hooks/useMovies';
import { MovieCard, LoadingState, ErrorState, EmptyState, Pagination, SectionHeader, Container } from '../components';
import type { NormalizedMovie } from '../types/api';
import { mapNormalizedToMovie } from '../utils/movieMapper';

/**
 * MoviesPage - Trang khám phá và phân loại danh sách phim điện ảnh kết nối API.
 */
export const MoviesPage: React.FC = () => {
    const { category } = useParams<{ category?: string }>();
    const [searchParams, setSearchParams] = useSearchParams();

    // Đọc chỉ số trang hiện tại từ URL query params (?page=X)
    const page = parseInt(searchParams.get('page') || '1', 10);

    // Xác định thông tin danh mục hiện tại dựa trên param
    const activeCategory = category || 'trending';

    const categories = [
        { id: 'trending', label: 'Xu Hướng', icon: Flame, desc: 'Phim được xem nhiều và quan tâm nhất hôm nay.' },
        {
            id: 'popular',
            label: 'Phổ Biến',
            icon: Layers,
            desc: 'Những tác phẩm được yêu thích rộng rãi bởi khán giả.',
        },
        { id: 'now-playing', label: 'Đang Chiếu', icon: Film, desc: 'Phim điện ảnh mới đang chiếu tại rạp.' },
        {
            id: 'top-rated',
            label: 'Đánh Giá Cao',
            icon: Star,
            desc: 'Được chấm điểm cao nhất bởi giới phê bình và khán giả.',
        },
        {
            id: 'upcoming',
            label: 'Sắp Chiếu',
            icon: Calendar,
            desc: 'Các siêu phẩm hứa hẹn sẽ đổ bộ phòng vé trong thời gian tới.',
        },
    ];

    const currentCat = categories.find((c) => c.id === activeCategory) || categories[0];

    /**
     * Tạo fetcher động phản ứng với category và page thay đổi.
     * Tất cả yêu cầu đều sử dụng ngôn ngữ tiếng Việt (vi-VN) và khu vực Việt Nam (VN).
     */
    const fetcher = useCallback(() => {
        const queryParams = { page, language: 'vi-VN', region: 'VN' };
        switch (activeCategory) {
            case 'popular':
                return getPopularMovies(queryParams);
            case 'now-playing':
                return getNowPlayingMovies(queryParams);
            case 'top-rated':
                return getTopRatedMovies(queryParams);
            case 'upcoming':
                return getUpcomingMovies(queryParams);
            case 'trending':
            default:
                return getTrendingMovies(queryParams);
        }
    }, [activeCategory, page]);

    // Gọi hook useMovies lấy danh sách phim và thông tin phân trang (meta)
    const { data: movies, meta, loading, error, refetch } = useMovies<NormalizedMovie[]>(fetcher);

    // Xử lý chuyển đổi trang
    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: newPage.toString() });
        // Cuộn lên đầu trang mượt mà để người dùng xem kết quả mới
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const totalPages = meta?.totalPages || 1;

    return (
        <Container py="none" className="py-10 min-h-[60vh] text-left" as="div">
            {/* Tiêu đề trang */}
            <SectionHeader
                accentIcon={<currentCat.icon className="w-4 h-4 text-gold" />}
                accentText={`Phim Điện Ảnh / ${currentCat.label}`}
                title={
                    <>
                        PHIM <span className="text-primary">{currentCat.label.toUpperCase()}</span>
                    </>
                }
                description={currentCat.desc}
                action={
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => {
                            const IconComponent = cat.icon;
                            const isActive = cat.id === activeCategory;
                            return (
                                <Link
                                    key={cat.id}
                                    to={cat.id === 'trending' ? '/movies' : `/movies/${cat.id}`}
                                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sharp border transition-all duration-300 ${
                                        isActive
                                            ? 'bg-primary border-primary text-text shadow-lg shadow-primary/20'
                                            : 'bg-surface hover:bg-themeBorder border-themeBorder text-muted hover:text-text'
                                    }`}
                                >
                                    <IconComponent className="w-3.5 h-3.5" />
                                    <span>{cat.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                }
                className="border-b border-themeBorder/40 pb-6 mb-8 gap-4 mb-8"
            />

            {/* Hiển thị lỗi kết nối nếu API gặp vấn đề */}
            {error && <ErrorState onRetry={refetch} variant="banner" />}

            {/* Lưới Phim chính hoặc Khung xương tải dữ liệu */}
            {loading ? (
                <LoadingState
                    variant="skeleton"
                    skeletonCount={12}
                    gridClass="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
                />
            ) : (
                <>
                    {movies && movies.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {movies.map((item) => {
                                const movieProp = mapNormalizedToMovie(item);
                                return (
                                    <Link
                                        key={item.id}
                                        to={`/movie/${item.id}`}
                                        className="block hover:-translate-y-1 transition-transform duration-300"
                                    >
                                        <MovieCard movie={movieProp} />
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <EmptyState message={`Hiện chưa có bộ phim nào trong danh mục "${currentCat.label}".`} />
                    )}

                    {/* Phân trang (Pagination) */}
                    {movies && movies.length > 0 && (
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </Container>
    );
};

export default MoviesPage;
