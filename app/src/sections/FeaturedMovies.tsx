import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Clapperboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MovieCard, Button, SectionHeader, Container, LoadingState, ErrorState, EmptyState } from '../components';
import { useTrendingMovies } from '../hooks/useMovies';
import { mapNormalizedToMovie } from '../utils/movieMapper';

interface FilterCategory {
    id: string;
    label: string;
    genreName?: string;
}

/**
 * Phần "Phim Đề Cử Nổi Bật" (Featured Movies Section).
 * - Sử dụng các thành phần LoadingState, ErrorState và EmptyState chuẩn hóa.
 */
export const FeaturedMovies: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<string>('all');

    // Gọi API lấy danh sách phim xu hướng
    const { data: movies, loading, error, refetch } = useTrendingMovies();

    const categories: FilterCategory[] = [
        { id: 'all', label: 'Tất cả' },
        { id: 'action', label: 'Hành động', genreName: 'Hành động' },
        { id: 'scifi', label: 'Viễn tưởng', genreName: 'Viễn tưởng' },
        { id: 'romance', label: 'Lãng mạn', genreName: 'Lãng mạn' },
        { id: 'anime', label: 'Anime', genreName: 'Hoạt hình' },
        { id: 'thriller', label: 'Gây cấn', genreName: 'Gây cấn' },
    ];

    // Lọc phim theo thể loại hoạt động
    const displayMovies = useMemo(() => {
        if (!movies) return [];

        const filtered = movies.filter((movie) => {
            if (activeFilter === 'all') return true;
            const category = categories.find((c) => c.id === activeFilter);
            if (!category || !category.genreName) return true;

            return movie.genres.some((g) => g.toLowerCase().includes(category.genreName!.toLowerCase()));
        });

        return filtered.slice(0, 8);
    }, [movies, activeFilter]); // eslint-disable-line react-hooks/exhaustive-deps

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        },
    };

    return (
        <Container py="md">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
                <SectionHeader
                    accentIcon={<Clapperboard className="w-4 h-4 text-gold animate-pulse" />}
                    accentText="Phim đề cử xuất sắc"
                    title="Phim Nổi Bật"
                    subtitle="Tuyển chọn những tác phẩm điện ảnh xuất sắc nhất được cập nhật mỗi ngày."
                    className="mb-0"
                />

                {/* Bộ lọc ngang tùy chỉnh đẹp mắt với hiệu ứng thanh cuộn cao cấp
                <div className="flex items-center gap-4 overflow-x-auto py-2.5 custom-scrollbar-x -mx-4 lg:mx-0 max-w-full">
                    <div className="flex items-center gap-2 flex-nowrap pb-1">
                        {categories.map((category) => {
                            const isActive = activeFilter === category.id;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveFilter(category.id)}
                                    className={`flex-shrink-0 px-4 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-sharp transition-all duration-300 ${
                                        isActive
                                            ? 'bg-primary text-text shadow-lg shadow-primary/25 scale-[1.03]'
                                            : 'bg-surface hover:bg-themeBorder text-muted hover:text-text'
                                    }`}
                                >
                                    {category.label}
                                </button>
                            );
                        })}
                    </div>
                </div> */}
            </div>

            {/* Hiển thị lỗi nhỏ thân thiện từ ErrorState chuẩn hóa */}
            {error && <ErrorState onRetry={refetch} variant="banner" />}

            {/* Lưới Phim Responsive */}
            {loading ? (
                <LoadingState
                    variant="skeleton"
                    skeletonCount={8}
                    gridClass="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10"
                />
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10"
                >
                    <AnimatePresence mode="popLayout">
                        {displayMovies.map((movie) => {
                            const movieProp = mapNormalizedToMovie(movie);
                            return (
                                <motion.div
                                    key={movie.id}
                                    layout
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                                    className="w-full"
                                >
                                    <MovieCard movie={movieProp} />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* Hiển thị EmptyState chuẩn hóa */}
            {!loading && displayMovies.length === 0 && (
                <EmptyState
                    message="Chưa có phim đề cử thuộc thể loại này. Vui lòng chọn thể loại khác."
                    onReset={() => setActiveFilter('all')}
                    resetText="Quay lại tất cả"
                />
            )}

            {/* Nút xem tất cả phim */}
            <div className="flex justify-center mt-14 md:mt-18">
                <Link to="/movies">
                    <Button
                        variant="outline"
                        icon={
                            <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                        }
                        iconPosition="right"
                        className="group"
                    >
                        Xem tất cả phim
                    </Button>
                </Link>
            </div>
        </Container>
    );
};
