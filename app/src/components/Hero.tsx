import { AnimatePresence, motion } from 'framer-motion';
import { Compass, Flame, Play, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button } from '../components';
import { fallbackMovies } from '../data/movies';
import type { Movie } from '../types/movie';

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
                <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 48, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                        duration: 1.15,
                        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                        delay: 0.35,
                    }}
                    className="lg:col-span-5 relative w-full max-w-[390px] md:max-w-[460px] mx-auto z-20 group"
                >
                    <div className="relative w-full h-[430px] md:h-[560px] flex items-center justify-center select-none mt-12 lg:mt-0">
                        {/* Ambient cinematic glow */}
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/20 blur-[90px]" />
                            <div className="absolute right-2 top-20 h-[220px] w-[220px] rounded-full bg-red-500/15 blur-[80px]" />
                            <div className="absolute left-0 bottom-10 h-[220px] w-[220px] rounded-full bg-cyan-400/10 blur-[80px]" />
                        </div>

                        {/* Decorative rings */}
                        <div className="absolute inset-x-8 top-16 h-[320px] rounded-full border border-white/10 rotate-[-12deg] opacity-60" />
                        <div className="absolute inset-x-12 top-24 h-[280px] rounded-full border border-amber-300/10 rotate-[10deg] opacity-70" />

                        {/* Ảnh giữa - background poster */}
                        <motion.div
                            animate={{ y: [-6, 6, -6], rotate: [-3, -1, -3] }}
                            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute top-[3%] w-[210px] md:w-[290px] lg:w-[330px] aspect-[2/3] overflow-hidden rounded-[28px] border border-white/20 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.55)] z-10 backdrop-blur-sm"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=900&auto=format&fit=crop&q=90"
                                alt="Space"
                                className="h-full w-full object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-white/10" />
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/15" />

                            <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">Cosmic Cut</p>
                                <p className="mt-1 text-lg font-semibold text-white">Deep Space</p>
                            </div>
                        </motion.div>

                        {/* Ảnh trái */}
                        <motion.div
                            animate={{ y: [0, -12, 0], rotate: [-12, -15, -12] }}
                            whileHover={{ scale: 1.08, rotate: -8, y: -18 }}
                            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute left-[1%] md:left-[3%] lg:left-[-4%] top-[22%] w-[185px] md:w-[255px] lg:w-[300px] aspect-[3/4] overflow-hidden rounded-[26px] border border-white/25 bg-white/10 shadow-[0_35px_80px_rgba(0,0,0,0.75)] z-30 backdrop-blur-md"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=900&auto=format&fit=crop&q=90"
                                alt="Controller"
                                className="h-full w-full object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-white/10" />
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/20" />

                            <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/80 backdrop-blur-md">
                                Gaming
                            </div>

                            <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-xl font-bold text-white drop-shadow">Play Mode</p>
                                <p className="mt-1 line-clamp-2 text-xs text-white/65">
                                    Interactive cinematic experience
                                </p>
                            </div>
                        </motion.div>

                        {/* Ảnh phải */}
                        <motion.div
                            animate={{ y: [-12, 0, -12], rotate: [10, 13, 10] }}
                            whileHover={{ scale: 1.08, rotate: 7, y: -18 }}
                            transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute right-[1%] md:right-[3%] lg:right-[-4%] top-[27%] w-[185px] md:w-[255px] lg:w-[300px] aspect-[3/4] overflow-hidden rounded-[26px] border border-white/25 bg-white/10 shadow-[0_35px_80px_rgba(0,0,0,0.75)] z-30 backdrop-blur-md"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900&auto=format&fit=crop&q=90"
                                alt="Cinema"
                                className="h-full w-full object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-white/10" />
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/20" />

                            <div className="absolute right-4 top-4 rounded-full border border-amber-300/30 bg-amber-400/15 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-amber-100 backdrop-blur-md">
                                Cinema
                            </div>

                            <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-xl font-bold text-white drop-shadow">Movie Night</p>
                                <p className="mt-1 line-clamp-2 text-xs text-white/65">
                                    Curated scenes, trailers and stories
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
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
                            <button
                                onClick={() => setIsPlaying(false)}
                                className="mt-4 px-6 py-2.5 border border-primary bg-primary/15 hover:bg-primary/25 text-primary text-xs font-black uppercase tracking-widest transition-colors rounded-sharp"
                            >
                                Đóng phát thử
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
