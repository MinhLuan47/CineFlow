import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

export const TermsPage: React.FC = () => {
  return (
    <div className="container-custom py-10 text-left max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted hover:text-gold mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
      </Link>

      <div className="border-b border-themeBorder/40 pb-6 mb-8">
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-text uppercase">
          Điều Khoản <span className="text-gold">Sử Dụng</span>
        </h1>
        <p className="text-muted text-sm mt-2">Cập nhật lần cuối: Tháng 5 năm 2026.</p>
      </div>

      <div className="prose prose-invert text-xs text-muted leading-relaxed space-y-6">
        <section>
          <h3 className="font-display font-bold text-sm text-text mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gold" /> 1. Chấp thuận điều khoản
          </h3>
          <p>Bằng việc truy cập và sử dụng dịch vụ CineFlow, bạn đồng ý tuân thủ toàn bộ các điều khoản và quy định tại đây. Nếu không đồng ý với bất kỳ điều khoản nào, vui lòng dừng sử dụng dịch vụ.</p>
        </section>

        <section>
          <h3 className="font-display font-bold text-sm text-text mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gold" /> 2. Sở hữu trí tuệ
          </h3>
          <p>Mọi nội dung bao gồm trailer, poster, hình ảnh, văn bản và thiết kế đồ họa đều thuộc bản quyền của CineFlow hoặc các đối tác TMDB cung cấp. Nghiêm cấm mọi hành vi sao chép trái phép hoặc phát hành lại vì mục đích thương mại.</p>
        </section>

        <section>
          <h3 className="font-display font-bold text-sm text-text mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gold" /> 3. Giới hạn trách nhiệm
          </h3>
          <p>CineFlow chỉ cung cấp thông tin và trình phát trailer phim công cộng. Chúng tôi không lưu trữ, phát trực tiếp các bộ phim có bản quyền một cách bất hợp pháp. Các liên kết video được dẫn từ máy chủ Youtube công khai.</p>
        </section>
      </div>
    </div>
  );
};
