import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import { Container, SectionHeader } from "../../components";

export const PrivacyPage: React.FC = () => {
  return (
    <Container py="none" className="py-10 text-left max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted hover:text-gold mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
      </Link>

      <SectionHeader
        title={
          <>
            Chính Sách <span className="text-gold">Bảo Mật</span>
          </>
        }
        subtitle="Quyền riêng tư của bạn là ưu tiên hàng đầu của chúng tôi."
        className="border-b border-themeBorder/40 pb-6 mb-8 gap-2"
      />

      <div className="prose prose-invert text-xs text-muted leading-relaxed space-y-6">
        <section>
          <h3 className="font-display font-bold text-sm text-text mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-gold" /> 1. Thu thập dữ liệu
          </h3>
          <p>CineFlow không yêu cầu đăng nhập đối với phiên bản hiện tại. Mọi dữ liệu lưu trữ yêu thích (Watchlist) và lịch sử xem đều được lưu cục bộ trên bộ nhớ trình duyệt trình duyệt của bạn (localStorage). Chúng tôi không thu thập thông tin này lên máy chủ.</p>
        </section>

        <section>
          <h3 className="font-display font-bold text-sm text-text mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-gold" /> 2. Cookie và lưu trữ trình duyệt
          </h3>
          <p>Chúng tôi sử dụng localStorage để tối ưu hiệu suất tải dữ liệu thể loại và duy trì tủ phim cá nhân của bạn. Không sử dụng các cookie theo dõi quảng cáo từ bên thứ ba.</p>
        </section>

        <section>
          <h3 className="font-display font-bold text-sm text-text mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-gold" /> 3. Thay đổi chính sách
          </h3>
          <p>Chính sách bảo mật này có thể thay đổi tùy thuộc vào quá trình phát triển tính năng của ứng dụng. Mọi cập nhật sẽ được hiển thị ngay tại trang này.</p>
        </section>
      </div>
    </Container>
  );
};
