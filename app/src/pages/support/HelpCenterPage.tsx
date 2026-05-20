import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";

export const HelpCenterPage: React.FC = () => {
  const categories = [
    { title: "Bắt đầu sử dụng", desc: "Hướng dẫn đăng ký tài khoản, chọn gói dịch vụ và xem phim lần đầu." },
    { title: "Tài khoản & Thanh toán", desc: "Quản lý thông tin cá nhân, phương thức thanh toán và lịch sử gia hạn." },
    { title: "Khắc phục sự cố", desc: "Giải quyết các lỗi kết nối, đứng hình, giật lag hoặc lỗi âm thanh." },
    { title: "Thiết bị tương thích", desc: "Cách cài đặt ứng dụng CineFlow trên các dòng thiết bị khác nhau." }
  ];

  return (
    <div className="container-custom py-10 text-left max-w-4xl">
      <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted hover:text-gold mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Quay lại trang chủ
      </Link>
      
      <div className="border-b border-themeBorder/40 pb-6 mb-8">
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-text uppercase">
          Trung Tâm <span className="text-gold">Trợ Giúp</span>
        </h1>
        <p className="text-muted text-sm mt-2">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7 để mang lại trải nghiệm xem phim hoàn hảo nhất.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {categories.map((cat, idx) => (
          <div key={idx} className="p-6 bg-surface/20 border border-themeBorder/40 hover:border-gold/30 rounded-sharp transition-all">
            <h3 className="font-display font-bold text-lg text-text mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gold" />
              {cat.title}
            </h3>
            <p className="text-xs text-muted leading-relaxed">{cat.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-8 border border-themeBorder/40 bg-surface/10 rounded-sharp">
        <h3 className="font-display font-bold text-lg text-text mb-3">Bạn vẫn không tìm thấy câu trả lời?</h3>
        <p className="text-xs text-muted mb-6 leading-relaxed">
          Hãy liên hệ trực tiếp với bộ phận chăm sóc khách hàng của chúng tôi để được giải đáp thắc mắc kịp thời.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/support/contact" className="px-5 py-2.5 bg-gold hover:bg-gold-hover text-background text-xs font-black uppercase tracking-wider rounded-sharp transition-all">
            Liên hệ hỗ trợ
          </Link>
          <Link to="/support/faq" className="px-5 py-2.5 border border-themeBorder/80 hover:border-gold/40 text-text hover:text-gold text-xs font-black uppercase tracking-wider rounded-sharp transition-all">
            Xem FAQ
          </Link>
        </div>
      </div>
    </div>
  );
};
