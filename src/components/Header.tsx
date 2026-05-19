import React, { useState, useEffect } from "react";
import { Menu, X, Film, Compass, Tv, Play, LogIn, CreditCard } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * Thành phần Header (Thanh điều hướng) của CineFlow.
 * Tính năng:
 * - Sticky top (găm trên cùng).
 * - Trong suốt khi ở trên cùng, chuyển sang nền mờ tối (backdrop-blur) khi cuộn xuống.
 * - Hỗ trợ đầy đủ menu cho điện thoại (responsive hamburger menu).
 * - Ngôn ngữ hiển thị: Tiếng Việt.
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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Danh sách các liên kết điều hướng tiếng Việt
  const navLinks = [
    { name: "Trang chủ", href: "#", icon: Compass },
    { name: "Phim điện ảnh", href: "#", icon: Film },
    { name: "Phim bộ", href: "#", icon: Tv },
    { name: "Hoạt hình", href: "#", icon: Compass },
    { name: "Bảng giá", href: "#", icon: CreditCard },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-themeBorder py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        
        {/* Logo CineFlow phong cách cinematic */}
        <a href="/" className="flex items-center gap-2 group z-50">
          <Film className="w-8 h-8 text-primary group-hover:text-gold transition-colors duration-300" />
          <span className="font-display font-extrabold text-2xl tracking-tighter uppercase text-text">
            CINE<span className="text-primary group-hover:text-gold transition-colors duration-300">FLOW</span>
          </span>
        </a>

        {/* Menu điều hướng chính trên Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="text-muted hover:text-primary transition-colors flex items-center gap-1.5 py-2 relative group"
              >
                <Icon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                <span>{link.name}</span>
                {/* Thanh kẻ dưới chân link hover tạo cảm giác điện ảnh sắc nét */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            );
          })}
        </nav>

        {/* Cụm nút hành động bên phải (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-muted hover:text-text px-4 py-2 text-sm font-semibold transition-colors">
            <LogIn className="w-4 h-4" />
            <span>Đăng nhập</span>
          </button>
          
          <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-text px-5 py-2.5 text-sm font-bold tracking-wide uppercase transition-all duration-300 rounded-sharp shadow-lg shadow-primary/20 hover:scale-105 active:scale-95">
            <Play className="w-4 h-4 fill-current" />
            <span>Xem ngay</span>
          </button>
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
        <div className="fixed inset-0 bg-background/95 backdrop-blur-lg z-40 md:hidden flex flex-col justify-center px-8 py-20 gap-8 animate-fade-in">
          <nav className="flex flex-col gap-6 text-xl font-bold tracking-wide">
            {navLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 text-muted hover:text-primary transition-colors py-2 border-b border-themeBorder/40"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <Icon className="w-5 h-5 text-primary" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex flex-col gap-4 mt-8">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 border border-themeBorder bg-surface hover:bg-themeBorder py-3.5 text-base font-bold tracking-wide transition-all rounded-sharp"
            >
              <LogIn className="w-5 h-5" />
              <span>Đăng nhập thành viên</span>
            </button>
            
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-text py-4 text-base font-bold tracking-wide uppercase transition-all rounded-sharp shadow-lg shadow-primary/20"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Xem ngay</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
