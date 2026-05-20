import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, HelpCircle } from "lucide-react";

export const FaqPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const faqs = [
    { q: "CineFlow có mất phí không?", a: "CineFlow là nền tảng xem trailer phim trực tuyến miễn phí cho MVP hiện tại. Trong tương lai, các gói dịch vụ chất lượng UHD sẽ được ra mắt." },
    { q: "Làm thế nào để thêm phim vào danh sách lưu trữ?", a: "Tại trang chi tiết phim lẻ hoặc phim bộ, bạn chỉ cần nhấn vào nút hình Trái Tim 'Yêu Thích'. Phim sẽ tự động xuất hiện tại Thư Viện Cá Nhân của bạn." },
    { q: "Tại sao trailer phim thỉnh thoảng bị đứng hình?", a: "Điều này thường do tốc độ mạng không ổn định hoặc độ phân giải quá cao. Hãy kiểm tra kết nối internet hoặc thử tải lại trang." },
    { q: "CineFlow hỗ trợ những thiết bị nào?", a: "Bạn có thể xem trên trình duyệt Web máy tính, điện thoại, máy tính bảng và các dòng Smart TV hỗ trợ trình duyệt web hiện đại." }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-custom py-10 text-left max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted hover:text-gold mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
      </Link>

      <div className="border-b border-themeBorder/40 pb-6 mb-8">
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-text uppercase">
          Câu Hỏi <span className="text-gold">Thường Gặp</span>
        </h1>
        <p className="text-muted text-sm mt-2">Tìm kiếm nhanh câu trả lời cho các câu hỏi phổ biến.</p>
      </div>

      {/* Ô tìm kiếm câu hỏi */}
      <div className="relative mb-10">
        <input
          type="text"
          placeholder="Nhập từ khóa tìm kiếm câu hỏi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-surface border border-themeBorder/60 focus:border-gold rounded-sharp py-3 pl-11 pr-4 text-sm text-text focus:outline-none transition-all placeholder:text-muted"
        />
        <Search className="w-5 h-5 text-muted absolute left-4 top-3.5" />
      </div>

      <div className="flex flex-col gap-6">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => (
            <div key={idx} className="p-6 bg-surface/10 border border-themeBorder/40 rounded-sharp">
              <h4 className="font-display font-bold text-sm text-gold flex items-start gap-2">
                <HelpCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-muted mt-3 leading-relaxed pl-6 border-l border-themeBorder/60">{faq.a}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-muted text-xs">Không tìm thấy câu hỏi phù hợp.</div>
        )}
      </div>
    </div>
  );
};
