import { Compass, Film, Loader2, LogIn, Menu, Play, Search, Star, Tv, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import { cn } from '../lib/utils';
import type { NormalizedMovie, NormalizedTvSeries } from '../types/api';
import { Button } from './Button';

/**
 * Thành phần Header (Thanh điều hướng) của CineFlow.
 * Nâng cấp: Tích hợp công cụ tìm kiếm toàn cục sử dụng useSearch Hook kết nối với API `/search/multi`.
 * Trạng thái giao diện:
 * - Dropdown kết quả thông minh trên Desktop tự động ẩn khi click bên ngoài.
 * - Danh sách hiển thị trực quan hỗ trợ phân biệt Phim lẻ (Movie) & Phim bộ (TV Series).
 * - Hiển thị trạng thái Loading và thông báo rỗng.
 */
export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Trạng thái điều hướng tìm kiếm
    const { query, setQuery, results, loading, clearSearch } = useSearch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Theo dõi hành vi cuộn chuột để thay đổi trạng thái nền của Header
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Tự động đóng dropdown kết quả tìm kiếm trên Desktop khi click chuột ra ngoài vùng tìm kiếm
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Danh sách các liên kết điều hướng tiếng Việt
    const navLinks = [
        { name: 'Phim điện ảnh', href: '/movies', icon: Film },
        { name: 'Phim bộ', href: '/tv', icon: Tv },
        { name: 'Thể loại', href: '/genres', icon: Compass },
    ];

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full',
                isScrolled
                    ? 'bg-background/90 backdrop-blur-md border-b border-themeBorder py-4'
                    : 'bg-transparent py-6',
            )}
        >
            <div className="container-custom flex items-center justify-between gap-4">
                {/* Logo CineFlow phong cách cinematic */}
                <Link to="/" className="flex items-center gap-2 group z-50 flex-shrink-0">
                    <Film className="w-8 h-8 text-primary group-hover:text-gold transition-colors duration-300" />
                    <span className="font-display font-extrabold text-2xl tracking-tighter uppercase text-text">
                        CINE
                        <span className="text-primary group-hover:text-gold transition-colors duration-300">FLOW</span>
                    </span>
                </Link>

                {/* Menu điều hướng chính trên Desktop */}
                <nav className="hidden lg:flex items-center gap-6 text-sm font-medium tracking-wide">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-muted hover:text-primary transition-colors flex items-center gap-1.5 py-2 relative group"
                            >
                                <Icon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                                <span>{link.name}</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                            </Link>
                        );
                    })}
                </nav>

                {/* Cụm Tìm kiếm Toàn cục (Global Search) trên Desktop */}
                <div ref={searchRef} className="hidden md:block relative w-48 lg:w-64 xl:w-72 z-50">
                    <div className="relative">
                        <span className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-muted/60 ">
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            ) : (
                                <Search className="w-4 h-4 border-primary" />
                            )}
                        </span>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setIsDropdownOpen(true);
                            }}
                            onFocus={() => setIsDropdownOpen(true)}
                            placeholder="Tìm kiếm phim..."
                            className="w-full  border border-themeBorder/80 text-xs text-text placeholder:text-muted/50 pl-9 pr-8 py-2.5 focus:outline-none focus:border-primary bg-card transition-all rounded-sharp backdrop-blur-md"
                        />
                        {query && (
                            <button
                                onClick={() => {
                                    clearSearch();
                                    setIsDropdownOpen(false);
                                }}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-text p-0.5 hover:bg-themeBorder/40 transition-colors rounded-full"
                                aria-label="Xoá tìm kiếm"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    {/* Panel kết quả tìm kiếm dạng Dropdown */}
                    {isDropdownOpen && query.trim().length >= 2 && (
                        <div className="absolute top-full right-0 left-0 mt-2 bg-background/95 backdrop-blur-xl border border-themeBorder rounded-sharp shadow-2xl p-2 max-h-96 overflow-y-auto z-50 scrollbar-thin">
                            {loading && results.length === 0 && (
                                <div className="py-8 flex flex-col items-center justify-center text-muted gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                                    <span className="text-[11px]">Đang tìm kiếm...</span>
                                </div>
                            )}

                            {!loading && results.length === 0 && (
                                <div className="py-8 text-center text-muted text-xs">
                                    Không tìm thấy phim nào cho "{query}"
                                </div>
                            )}

                            {results.map((item) => {
                                const isMovie = item.mediaType === 'movie';
                                const isTv = item.mediaType === 'tv';
                                const isPerson = item.mediaType === 'person';
                                const title = isMovie ? item.title : item.name;
                                const originalTitle = isMovie ? item.originalTitle : item.originalName;
                                const poster = isPerson
                                    ? item.profileUrl ||
                                      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
                                    : (item as NormalizedMovie | NormalizedTvSeries).posterUrl ||
                                      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&auto=format&fit=crop&q=80';
                                const rating = isPerson
                                    ? 0
                                    : (item as NormalizedMovie | NormalizedTvSeries).voteAverage;
                                const year = isPerson ? null : (item as NormalizedMovie | NormalizedTvSeries).year;

                                const detailLink = isMovie ? `/movie/${item.id}` : `/tv/${item.id}`;

                                return (
                                    <Link
                                        key={item.id}
                                        to={isPerson ? '#' : detailLink}
                                        className="flex items-center gap-3 p-2 hover:bg-surface border-b border-themeBorder/20 last:border-0 rounded-sharp cursor-pointer group transition-colors duration-200"
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            clearSearch();
                                        }}
                                    >
                                        {/* Poster nhỏ */}
                                        <div className="w-8 h-11 bg-themeBorder rounded-sharp overflow-hidden flex-shrink-0 relative border border-themeBorder/40">
                                            <img
                                                src={poster}
                                                alt={title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        {/* Chi tiết phim */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xs font-bold text-text group-hover:text-primary transition-colors line-clamp-1">
                                                {title}
                                            </h4>
                                            <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-muted">
                                                <span className="line-clamp-1 max-w-[110px]">{originalTitle}</span>
                                                <span>•</span>
                                                <span>{year}</span>
                                            </div>
                                        </div>
                                        {/* Rating và Loại phim */}
                                        <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                                            {!isPerson && (
                                                <div className="flex items-center gap-0.5 text-[10px] font-black text-gold">
                                                    <Star className="w-2.5 h-2.5 fill-current" />
                                                    <span>{rating.toFixed(1)}</span>
                                                </div>
                                            )}
                                            <span
                                                className={`text-[8px] font-black uppercase tracking-wider px-1 py-0.5 rounded-sharp ${
                                                    isMovie
                                                        ? 'bg-primary/20 text-primary border border-primary/20'
                                                        : isTv
                                                          ? 'bg-gold/20 text-gold border border-gold/20'
                                                          : 'bg-surface border border-themeBorder/40 text-muted'
                                                }`}
                                            >
                                                {isMovie ? 'Phim lẻ' : isTv ? 'Phim bộ' : 'Diễn viên'}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Cụm nút hành động bên phải (Desktop) */}
                <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                    <Button variant="secondary" size="sm" icon={<LogIn className="w-4 h-4" />}>
                        Đăng nhập
                    </Button>

                    <Button variant="primary" size="sm" icon={<Play className="w-4 h-4 fill-current" />}>
                        Xem ngay
                    </Button>
                </div>

                {/* Nút Hamburger cho thiết bị di động */}
                <button
                    className="md:hidden p-2 text-muted hover:text-text focus:outline-none z-50"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Menu di động (Mobile Slide Down/Fade) */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-background/95 backdrop-blur-lg z-40 md:hidden flex flex-col px-6 py-20 overflow-y-auto gap-6 animate-fade-in">
                    {/* Thanh tìm kiếm trên Mobile */}
                    <div className="relative mt-4">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/60">
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            ) : (
                                <Search className="w-4 h-4" />
                            )}
                        </span>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Tìm kiếm phim..."
                            className="w-full bg-surface border border-themeBorder/80 text-xs text-text placeholder:text-muted/50 pl-10 pr-9 py-3 focus:outline-none focus:border-primary focus:bg-card transition-all rounded-sharp"
                        />
                        {query && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text p-0.5"
                                aria-label="Xoá tìm kiếm"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Danh sách kết quả tìm kiếm trên Mobile */}
                    {query.trim().length >= 2 && (
                        <div className="bg-surface/50 border border-themeBorder/40 rounded-sharp p-2 max-h-60 overflow-y-auto">
                            {loading && results.length === 0 && (
                                <div className="py-6 flex items-center justify-center text-muted gap-2 text-xs">
                                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                    <span>Đang tìm kiếm...</span>
                                </div>
                            )}

                            {!loading && results.length === 0 && (
                                <div className="py-6 text-center text-muted text-xs">Không tìm thấy kết quả nào.</div>
                            )}

                            {results.map((item) => {
                                const isMovie = item.mediaType === 'movie';
                                const isTv = item.mediaType === 'tv';
                                const isPerson = item.mediaType === 'person';
                                const title = isMovie ? item.title : item.name;
                                const originalTitle = isMovie ? item.originalTitle : item.originalName;
                                const poster = isPerson
                                    ? item.profileUrl ||
                                      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
                                    : (item as NormalizedMovie | NormalizedTvSeries).posterUrl ||
                                      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&auto=format&fit=crop&q=80';

                                const detailLink = isMovie ? `/movie/${item.id}` : `/tv/${item.id}`;

                                return (
                                    <Link
                                        key={item.id}
                                        to={isPerson ? '#' : detailLink}
                                        className="flex items-center gap-3 p-2 border-b border-themeBorder/20 last:border-0 rounded-sharp cursor-pointer hover:bg-surface/80"
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            clearSearch();
                                        }}
                                    >
                                        <div className="w-7 h-10 bg-themeBorder rounded-sharp overflow-hidden flex-shrink-0">
                                            <img src={poster} alt={title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xs font-bold text-text truncate">{title}</h4>
                                            <span className="text-[10px] text-muted truncate block">
                                                {originalTitle}{' '}
                                                {!isPerson &&
                                                    `(${(item as NormalizedMovie | NormalizedTvSeries).year})`}
                                            </span>
                                        </div>
                                        <span className="text-[8px] font-black uppercase text-gold bg-gold/10 px-1 py-0.5 rounded-sharp">
                                            {isMovie ? 'Phim lẻ' : isTv ? 'Phim bộ' : 'Diễn viên'}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    )}

                    <nav className="flex flex-col gap-4 text-base font-bold tracking-wide mt-4">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-4 text-muted hover:text-primary transition-colors py-2.5 border-b border-themeBorder/20"
                                >
                                    <Icon className="w-5 h-5 text-primary" />
                                    <span>{link.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex flex-col gap-3 mt-4">
                        <Button
                            variant="secondary"
                            size="md"
                            className="w-full"
                            icon={<LogIn className="w-5 h-5" />}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Đăng nhập thành viên
                        </Button>

                        <Button
                            variant="primary"
                            size="md"
                            className="w-full"
                            icon={<Play className="w-5 h-5 fill-current" />}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Xem ngay
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
};
