import React from 'react';
import { Hero, Container, Card } from '../components';
import { FeaturedMovies, BrowseGenres, MovieLibrary, TopRanking, FAQ, FinalCTA } from '../sections';
import { Monitor, Smartphone, Sparkles, Flame, ShieldAlert } from 'lucide-react';

/**
 * HomePage - Trang chủ chính thức hiển thị toàn bộ thông tin giới thiệu rạp phim của CineFlow.
 */
export const HomePage: React.FC = () => {
    return (
        <>
            {/* Hero điện ảnh hiển thị phim nổi bật */}
            <Hero />

            {/* Phim đề cử xuất sắc */}
            <FeaturedMovies />

            {/* Duyệt theo thể loại */}
            <BrowseGenres />

            {/* Thư viện Điện ảnh (Movie Library Preview) */}
            <MovieLibrary />

            {/* Trình phát video trải nghiệm (Player Preview) */}
            {/* <PlayerPreview /> */}

            {/* Bảng xếp hạng phim tuần này */}
            <TopRanking />

            {/* Câu hỏi thường gặp */}
            <FAQ />

            {/* Khối Banner Thông Báo */}
            <Container py="sm" as="section">
                <div className="border border-primary/20 bg-primary/5 px-6 py-4 flex flex-col sm:flex-row items-center gap-4 rounded-sharp">
                    <ShieldAlert className="w-6 h-6 text-primary flex-shrink-0" />
                    <p className="text-sm text-muted text-center sm:text-left">
                        <span className="text-text font-bold">Lưu ý:</span> Trang web hiện đang trong giai đoạn cấu hình
                        giao diện rạp phim. Các phần trình chiếu Trailer và Danh sách phim sẽ sớm được kích hoạt ở giai
                        đoạn tiếp theo.
                    </p>
                </div>
            </Container>

            {/* Giới thiệu tính năng tương thích thiết bị */}
            <Container py="md" as="section">
                <div className="max-w-3xl mb-16 text-center md:text-left">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-3">
                        <Flame className="w-4 h-4 text-gold animate-pulse" />
                        <span>Trải nghiệm rạp phim tại nhà</span>
                    </div>
                    <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight leading-tight mb-6">
                        MỘT TÀI KHOẢN.
                        <br />
                        <span className="text-primary">MỌI THƯỚC PHIM</span> ĐỈNH CAO.
                    </h1>
                    <p className="text-muted text-base md:text-lg leading-relaxed">
                        Khám phá hàng nghìn tác phẩm điện ảnh xuất sắc từ khắp nơi trên thế giới với chất lượng hình ảnh
                        sống động chưa từng có. Tương thích mọi thiết bị của bạn.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-8 hover:border-primary transition-all duration-300 group">
                        <div className="w-12 h-12 bg-background border border-themeBorder flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors rounded-sharp">
                            <Monitor className="w-6 h-6 text-primary group-hover:text-gold transition-colors duration-300" />
                        </div>
                        <h3 className="font-display font-bold text-lg text-text mb-3">Xem trên Smart TV</h3>
                        <p className="text-sm text-muted leading-relaxed">
                            Ứng dụng tối ưu cho Apple TV, Android TV, LG WebOS, Samsung Tizen giúp bạn thưởng thức trọn
                            vẹn thước phim trên màn hình lớn.
                        </p>
                    </Card>

                    <Card className="p-8 hover:border-primary transition-all duration-300 group">
                        <div className="w-12 h-12 bg-background border border-themeBorder flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors rounded-sharp">
                            <Smartphone className="w-6 h-6 text-primary group-hover:text-gold transition-colors duration-300" />
                        </div>
                        <h3 className="font-display font-bold text-lg text-text mb-3">Xem trên di động</h3>
                        <p className="text-sm text-muted leading-relaxed">
                            Tải ứng dụng CineFlow cho iOS và Android để xem ngoại tuyến khi đi tàu xe. Tự động đồng bộ
                            tiến trình phát phim thông minh.
                        </p>
                    </Card>

                    <Card className="p-8 hover:border-primary transition-all duration-300 group">
                        <div className="w-12 h-12 bg-background border border-themeBorder flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors rounded-sharp">
                            <Sparkles className="w-6 h-6 text-primary group-hover:text-gold transition-colors duration-300" />
                        </div>
                        <h3 className="font-display font-bold text-lg text-text mb-3">Chất lượng rạp chiếu</h3>
                        <p className="text-sm text-muted leading-relaxed">
                            Tích hợp công nghệ âm thanh vòm Dolby Atmos và chất lượng hình ảnh Ultra HD 4K HDR mang rạp
                            chiếu phim chuyên nghiệp về phòng ngủ.
                        </p>
                    </Card>
                </div>
            </Container>

            {/* Kêu gọi hành động cuối trang */}
            <FinalCTA />
        </>
    );
};

export default HomePage;
