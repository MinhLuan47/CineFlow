import { Layout, Hero } from "./components";
import { FeaturedMovies, BrowseGenres, MovieLibrary, PlayerPreview, TopRanking, FAQ } from "./sections";
import { Monitor, Smartphone, Sparkles, Flame, ShieldAlert } from "lucide-react";

/**
 * Trang App chính - Thiết lập khung bố cục landing page cơ bản (Base Layout Shell).
 * Phiên bản này tải phần Hero điện ảnh, phần Phim Nổi bật, phần Thể loại phim, phần Thư viện điện ảnh, trình phát phim trải nghiệm, bảng xếp hạng phim thịnh hành, câu hỏi thường gặp FAQ và hiển thị các khối tính năng cơ bản của CineFlow.
 */
function App() {
  return (
    <Layout>
      {/* 
        Thành phần Hero hiển thị phim nổi bật nhất.
        Thực hiện theo lối thiết kế "Massive Typographic & Depth Overlay" với hiệu ứng 3D lơ lửng,
        tích hợp Badges chất lượng cao và giao diện kính mờ Glassmorphism.
      */}
      <Hero />

      {/* 
        Thành phần Phim đề cử nổi bật (Featured Movies)
        Hiển thị lưới phim đa dạng thể loại cùng bộ lọc ngang mượt mà.
      */}
      <FeaturedMovies />

      {/* 
        Thành phần Duyệt theo thể loại (Browse by Genre)
        Hiển thị lưới các thể loại phim đa dạng phong cách kính mờ (Glassmorphism).
      */}
      <BrowseGenres />

      {/* 
        Thành phần Thư viện Điện ảnh (Movie Library Preview)
        Hiển thị kho phim điện ảnh đa danh mục có tích hợp tìm kiếm động giả lập.
      */}
      <MovieLibrary />

      {/* 
        Thành phần Trình phát video trải nghiệm (Player Preview)
        Hiển thị trình phát phim cao cấp tùy chỉnh bộ điều khiển kính mờ và danh sách tập.
      */}
      <PlayerPreview />

      {/* 
        Thành phần Bảng xếp hạng phim tuần này (Top Ranking)
        Hiển thị danh sách Top 10 bộ phim được xem nhiều nhất tuần qua.
      */}
      <TopRanking />

      {/* 
        Thành phần Câu hỏi thường gặp (FAQ)
        Cung cấp các câu trả lời ngắn gọn về nền tảng thông qua cấu trúc Accordion.
      */}
      <FAQ />
      {/* 
        Khối Banner Thông Báo (Alert Banner)
        Thiết kế tối giản viền sắc nét chỉ 1px đỏ thẫm để thu hút sự chú ý nhẹ nhàng.
      */}
      <section className="container-custom py-8">
        <div className="border border-primary/20 bg-primary/5 px-6 py-4 flex flex-col sm:flex-row items-center gap-4 rounded-sharp">
          <ShieldAlert className="w-6 h-6 text-primary flex-shrink-0" />
          <p className="text-sm text-muted text-center sm:text-left">
            <span className="text-text font-bold">Lưu ý:</span> Trang web hiện đang trong giai đoạn cấu hình giao diện rạp phim. Các phần trình chiếu Trailer và Danh sách phim sẽ sớm được kích hoạt ở giai đoạn tiếp theo.
          </p>
        </div>
      </section>

      {/* 
        Phần giới thiệu dịch vụ cơ bản (Feature/Intro Placeholders)
        Sử dụng cấu trúc lưới bất đối xứng nhẹ hoặc lưới 3 cột tiêu chuẩn để kiểm chứng responsive.
      */}
      <section className="container-custom py-16 md:py-24">
        
        {/* Tiêu đề phần giới thiệu sử dụng Font Outfit cá tính */}
        <div className="max-w-3xl mb-16 text-center md:text-left">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-3">
            <Flame className="w-4 h-4 text-gold animate-pulse" />
            <span>Trải nghiệm rạp phim tại nhà</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight leading-tight mb-6">
            MỘT TÀI KHOẢN.<br />
            <span className="text-primary">MỌI THƯỚC PHIM</span> ĐỈNH CAO.
          </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed">
            Khám phá hàng nghìn tác phẩm điện ảnh xuất sắc từ khắp nơi trên thế giới với chất lượng hình ảnh sống động chưa từng có. Tương thích mọi thiết bị của bạn.
          </p>
        </div>

        {/* Lưới các tính năng nổi bật (Responsive Cards Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tính năng 1: Thiết bị tương thích */}
          <div className="border border-themeBorder bg-surface p-8 transition-all duration-300 hover:border-primary group rounded-sharp">
            <div className="w-12 h-12 bg-background border border-themeBorder flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors rounded-sharp">
              <Monitor className="w-6 h-6 text-primary group-hover:text-gold transition-colors duration-300" />
            </div>
            <h3 className="font-display font-bold text-lg text-text mb-3">Xem trên Smart TV</h3>
            <p className="text-sm text-muted leading-relaxed">
              Ứng dụng tối ưu cho Apple TV, Android TV, LG WebOS, Samsung Tizen giúp bạn thưởng thức trọn vẹn thước phim trên màn hình lớn.
            </p>
          </div>

          {/* Tính năng 2: Trải nghiệm di động */}
          <div className="border border-themeBorder bg-surface p-8 transition-all duration-300 hover:border-primary group rounded-sharp">
            <div className="w-12 h-12 bg-background border border-themeBorder flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors rounded-sharp">
              <Smartphone className="w-6 h-6 text-primary group-hover:text-gold transition-colors duration-300" />
            </div>
            <h3 className="font-display font-bold text-lg text-text mb-3">Xem trên di động</h3>
            <p className="text-sm text-muted leading-relaxed">
              Tải ứng dụng CineFlow cho iOS và Android để xem ngoại tuyến khi đi tàu xe. Tự động đồng bộ tiến trình phát phim thông minh.
            </p>
          </div>

          {/* Tính năng 3: Công nghệ đỉnh cao */}
          <div className="border border-themeBorder bg-surface p-8 transition-all duration-300 hover:border-primary group rounded-sharp">
            <div className="w-12 h-12 bg-background border border-themeBorder flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors rounded-sharp">
              <Sparkles className="w-6 h-6 text-primary group-hover:text-gold transition-colors duration-300" />
            </div>
            <h3 className="font-display font-bold text-lg text-text mb-3">Chất lượng rạp chiếu</h3>
            <p className="text-sm text-muted leading-relaxed">
              Tích hợp công nghệ âm thanh vòm Dolby Atmos và chất lượng hình ảnh Ultra HD 4K HDR mang rạp chiếu phim chuyên nghiệp về phòng ngủ.
            </p>
          </div>

        </div>

      </section>

      {/* 
        Khung đăng ký trải nghiệm nhanh (Mini CTA Block)
        Thiết kế dạng khối nền dẹt tinh giản góc cạnh 2px.
      */}
      <section className="container-custom pb-24">
        <div className="relative border border-themeBorder bg-surface/50 p-8 md:p-12 overflow-hidden rounded-sharp">
          {/* Quầng sáng cam mờ ảo trong thẻ */}
          <div className="absolute right-[-10%] top-[-20%] w-[40%] h-[150%] rounded-full bg-ember/5 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-xl">
            <h3 className="font-display font-bold text-2xl md:text-3xl text-text mb-4">Sẵn sàng trải nghiệm điện ảnh chân thực?</h3>
            <p className="text-sm text-muted mb-8 leading-relaxed">
              Đăng ký nhận thông tin ra mắt và trải nghiệm dùng thử miễn phí 7 ngày gói VIP Premium ngay khi hệ thống CineFlow đi vào hoạt động chính thức.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="bg-background border border-themeBorder text-sm text-text placeholder:text-muted/50 px-4 py-3 w-full focus:outline-none focus:border-primary rounded-sharp"
              />
              <button className="bg-primary hover:bg-primary-dark text-text text-sm font-bold tracking-wider uppercase px-6 py-3 transition-colors flex-shrink-0 rounded-sharp">
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default App;
