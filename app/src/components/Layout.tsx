import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Thành phần Layout chính cho CineFlow.
 * Tính năng:
 * - Tích hợp Header (sticky) và Footer riêng biệt.
 * - Thêm hiệu ứng nhiễu hạt phim toàn cục (Film Grain).
 * - Bố trí đèn rạp phim huyền ảo (glow-crimson, glow-gold, glow-ember) tạo chiều sâu điện ảnh.
 * - padding-top (pt-20) cho khung nội dung chính để tránh bị che khuất bởi thanh điều hướng cố định.
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-background text-text overflow-hidden selection:bg-primary selection:text-text flex flex-col">
      
      {/* Lớp phủ nhiễu hạt phim cổ điển */}
      <div className="film-grain" />

      {/* 
        Hào quang đèn chiếu rạp bóng (Theatrical Lighting Glows)
        Sử dụng kỹ thuật radial gradient kết hợp làm mờ và light leak tạo độ ảo diệu.
      */}
      <div className="absolute top-0 left-0 right-0 h-[1000px] pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] rounded-full glow-crimson opacity-50" />
        <div className="absolute top-[10%] right-[-15%] w-[50%] h-[70%] rounded-full glow-gold opacity-20" />
        <div className="absolute top-[50%] left-[20%] w-[70%] h-[50%] rounded-full glow-ember opacity-15" />
        <div className="absolute inset-0 light-leak opacity-35" />
      </div>

      {/* Thành phần Header (Thanh điều hướng cố định) */}
      <Header />

      {/* 
        Khung nội dung chính của ứng dụng
        Sử dụng pt-20 (80px) để bù lại khoảng trống do Header dùng 'fixed'.
        Khung flex-grow đẩy Footer xuống đáy trang khi nội dung ngắn.
      */}
      <main className="relative z-10 w-full flex-grow pt-20">
        {children}
      </main>

      {/* Thành phần Chân trang (Footer) */}
      <Footer />

      {/* Nút cuộn lên đầu trang lơ lửng ở góc dưới bên phải */}
      <ScrollToTop />
    </div>
  );
};
