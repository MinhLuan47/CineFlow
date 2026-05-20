import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Container, SectionHeader, Card, Button } from "../../components";

export const HelpCenterPage: React.FC = () => {
  const categories = [
    { title: "Bắt đầu sử dụng", desc: "Hướng dẫn đăng ký tài khoản, chọn gói dịch vụ và xem phim lần đầu." },
    { title: "Tài khoản & Thanh toán", desc: "Quản lý thông tin cá nhân, phương thức thanh toán và lịch sử gia hạn." },
    { title: "Khắc phục sự cố", desc: "Giải quyết các lỗi kết nối, đứng hình, giật lag hoặc lỗi âm thanh." },
    { title: "Thiết bị tương thích", desc: "Cách cài đặt ứng dụng CineFlow trên các dòng thiết bị khác nhau." }
  ];

  return (
    <Container py="none" className="py-10 text-left max-w-4xl">
      <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted hover:text-gold mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Quay lại trang chủ
      </Link>
      
      <SectionHeader
        title={
          <>
            Trung Tâm <span className="text-gold">Trợ Giúp</span>
          </>
        }
        subtitle="Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7 để mang lại trải nghiệm xem phim hoàn hảo nhất."
        className="border-b border-themeBorder/40 pb-6 mb-8 gap-2"
      />

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {categories.map((cat, idx) => (
          <Card key={idx} variant="glass" className="hover:border-gold/30 transition-all">
            <h3 className="font-display font-bold text-lg text-text mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gold" />
              {cat.title}
            </h3>
            <p className="text-xs text-muted leading-relaxed">{cat.desc}</p>
          </Card>
        ))}
      </div>

      <Card variant="gradient" className="p-8">
        <h3 className="font-display font-bold text-lg text-text mb-3">Bạn vẫn không tìm thấy câu trả lời?</h3>
        <p className="text-xs text-muted mb-6 leading-relaxed">
          Hãy liên hệ trực tiếp với bộ phận chăm sóc khách hàng của chúng tôi để được giải đáp thắc mắc kịp thời.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/support/contact">
            <Button variant="primary" size="md" className="bg-gold hover:bg-gold-hover text-background hover:text-background border-none shadow-none">
              Liên hệ hỗ trợ
            </Button>
          </Link>
          <Link to="/support/faq">
            <Button variant="outline" size="md" className="border-themeBorder/80 hover:border-gold/40 text-text hover:text-gold">
              Xem FAQ
            </Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
};
