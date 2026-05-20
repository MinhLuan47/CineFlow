import { AnimatePresence, motion } from 'framer-motion';
import { Compass, Flame, Play, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button } from '../components';
import { fallbackMovies } from '../data/movies';
import type { Movie } from '../types/movie';
import { HeroImageCluster } from './HeroImageCluster';

/**
 * Thành phần Hero điện ảnh chuyên nghiệp cho CineFlow.
 * - Sử dụng các thành phần UI chung: Button, Badge.
 */
export const Hero: React.FC = () => {
    const featuredMovie: Movie = fallbackMovies[0];

    const [isPlaying, setIsPlaying] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        },
    };

    return (
        <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden py-20 lg:py-0">
            <div className="absolute inset-0 bg-background z-0">
                <div className="absolute inset-0 opacity-20 filter blur-sm">
                    <img src={featuredMovie.backdrop} alt="Backdrop" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />

                <div className="absolute top-[10%] left-[-10%] w-[50%] h-[60%] rounded-full glow-crimson opacity-40 blur-3xl pointer-events-none" />
                <div className="absolute bottom-[20%] right-[-10%] w-[45%] h-[50%] rounded-full glow-gold opacity-15 blur-3xl pointer-events-none" />
            </div>

            <div className="container-custom relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[85vh]">
                {/* Cột bên trái: Tiêu đề, badges, mô tả và nút bấm */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left pt-8 lg:pt-0"
                >
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-6"
                    >
                        <Badge
                            variant="primary"
                            size="md"
                            className="flex items-center gap-1 bg-primary/10 border border-primary/40 text-primary"
                        >
                            <Flame className="w-3 h-3 text-gold" />
                            HOT
                        </Badge>
                        <Badge variant="outline" size="md" className="bg-surface/80">
                            Ultra HD 4K
                        </Badge>
                        <Badge variant="outline" size="md" className="bg-surface/80">
                            Vietsub
                        </Badge>
                        <Badge variant="gold" size="md" className="bg-gold/10 border-gold/40 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Không quảng cáo
                        </Badge>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] mb-6 uppercase text-text"
                    >
                        Tìm kiếm những bộ phim <br />
                        bạn yêu thích, <span className="text-primary text-glow-red">mọi lúc mọi nơi.</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-muted text-base md:text-lg leading-relaxed max-w-xl mb-10"
                    >
                        CineFlow mang đến trải nghiệm phát trực tuyến đỉnh cao với hàng ngàn phim bom tấn chiếu rạp,
                        phim bộ độc quyền, anime sống động và các chương trình truyền hình hấp dẫn. Tất cả đều không
                        giới hạn với chất lượng 4K HDR siêu thực.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                    >
                        <Link to="/watch/movie/823464" className="w-full sm:w-auto">
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full"
                                icon={<Play className="w-4.5 h-4.5 fill-current" />}
                            >
                                Bắt đầu xem
                            </Button>
                        </Link>

                        <Link to="/movies" className="w-full sm:w-auto">
                            <Button
                                variant="secondary"
                                size="lg"
                                className="w-full bg-surface/30 backdrop-blur-sm"
                                icon={<Compass className="w-4.5 h-4.5" />}
                            >
                                Khám phá thư viện
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Cột bên phải: Thẻ preview phim */}
                <HeroImageCluster />
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-55 flex items-center justify-center p-4 backdrop-blur-md"
                    >
                        <div className="relative max-w-4xl w-full aspect-video bg-background border border-themeBorder rounded-sharp shadow-2xl flex flex-col items-center justify-center p-8 text-center gap-6">
                            <div className="w-16 h-16 bg-primary/10 border border-primary text-primary flex items-center justify-center rounded-full animate-bounce">
                                <Play className="w-8 h-8 fill-current ml-1" />
                            </div>
                            <h3 className="font-display font-extrabold text-2xl uppercase tracking-wider">
                                Đang khởi chạy luồng truyền phát...
                            </h3>
                            <p className="text-muted text-sm max-w-md">
                                Bản phát thử (Trailer) bộ phim{' '}
                                <span className="text-text font-bold">{featuredMovie.title}</span> đang được giải mã.
                                Chức năng trình chiếu video thực tế sẽ được tích hợp trong giai đoạn tích hợp trình
                                phát.
                            </p>
                            <Button
                                onClick={() => setIsPlaying(false)}
                                variant="danger"
                                size="sm"
                                className="mt-4 bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30 hover:border-primary/50 text-xs font-black uppercase tracking-widest shadow-none"
                            >
                                Đóng phát thử
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
