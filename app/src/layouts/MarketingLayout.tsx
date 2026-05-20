import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, ScrollToTop } from "../components";

/**
 * MarketingLayout dành riêng cho các trang tiếp thị hoặc trang chủ của CineFlow.
 */
export const MarketingLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background text-text overflow-hidden selection:bg-primary selection:text-text flex flex-col">
      {/* Lớp phủ nhiễu hạt phim */}
      <div className="film-grain" />

      {/* Hiệu ứng hào quang chiếu rạp */}
      <div className="absolute top-0 left-0 right-0 h-[1000px] pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] rounded-full glow-crimson opacity-50" />
        <div className="absolute top-[10%] right-[-15%] w-[50%] h-[70%] rounded-full glow-gold opacity-20" />
        <div className="absolute top-[50%] left-[20%] w-[70%] h-[50%] rounded-full glow-ember opacity-15" />
        <div className="absolute inset-0 light-leak opacity-35" />
      </div>

      <Header />

      <main className="relative z-10 w-full flex-grow pt-20">
        <Outlet />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MarketingLayout;
