import { Compass, Film, LogIn, Menu, Play, Tv, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Button } from './Button';
import { GlobalSearch } from './GlobalSearch';

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
                <GlobalSearch variant="desktop" />

                {/* Cụm nút hành động bên phải (Desktop) */}
                <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                    <Link to="/watch/movie/823464">
                        <Button variant="primary" size="sm" icon={<Play className="w-4 h-4 fill-current" />}>
                            Xem ngay
                        </Button>
                    </Link>
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
                    <GlobalSearch variant="mobile" onResultClick={() => setIsMobileMenuOpen(false)} />

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

                        <Link to="/watch/movie/823464" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                            <Button
                                variant="primary"
                                size="md"
                                className="w-full"
                                icon={<Play className="w-5 h-5 fill-current" />}
                            >
                                Xem ngay
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};
