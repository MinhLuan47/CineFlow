import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, ScrollToTop } from "../components";

/**
 * AppLayout cung cấp khung bố cục chuẩn cho các trang trong CineFlow.
 * Tương tự như Layout cũ nhưng sử dụng Outlet của react-router-dom để render trang con.
 */
export const AppLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background text-text overflow-hidden selection:bg-primary selection:text-text flex flex-col">
      {/* Lớp phủ nhiễu hạt phim cổ điển */}
      <div className="film-grain" />

      {/* Hào quang đèn chiếu rạp bóng */}
      <div className="absolute top-0 left-0 right-0 h-[1000px] pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] rounded-full glow-crimson opacity-50" />
        <div className="absolute top-[10%] right-[-15%] w-[50%] h-[70%] rounded-full glow-gold opacity-20" />
        <div className="absolute top-[50%] left-[20%] w-[70%] h-[50%] rounded-full glow-ember opacity-15" />
        <div className="absolute inset-0 light-leak opacity-35" />
      </div>

      {/* Thanh điều hướng Header */}
      <Header />

      {/* Nội dung chính của trang */}
      <main className="relative z-10 w-full flex-grow pt-20">
        <Outlet />
      </main>

      {/* Chân trang Footer */}
      <Footer />

      {/* Nút cuộn lên đầu trang */}
      <ScrollToTop />
    </div>
  );
};

export default AppLayout;
