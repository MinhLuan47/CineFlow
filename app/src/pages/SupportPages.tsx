import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  HelpCircle, Shield, FileText, Mail, Phone, MapPin, 
  Tv, Smartphone, Laptop, Gamepad2, Tablet, ArrowLeft,
  Search, BookOpen, Send, Sparkles, Clock, Calendar, User
} from "lucide-react";

/**
 * -------------------------------------------------------------
 * 1. HELP CENTER PAGE - TRUNG TÂM TRỢ GIÚP
 * -------------------------------------------------------------
 */
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

/**
 * -------------------------------------------------------------
 * 2. FAQ PAGE - CÂU HỎI THƯỜNG GẶP
 * -------------------------------------------------------------
 */
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

/**
 * -------------------------------------------------------------
 * 3. TERMS OF USE - ĐIỀU KHOẢN SỬ DỤNG
 * -------------------------------------------------------------
 */
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

/**
 * -------------------------------------------------------------
 * 4. PRIVACY POLICY - CHÍNH SÁCH BẢO MẬT
 * -------------------------------------------------------------
 */
export const PrivacyPage: React.FC = () => {
  return (
    <div className="container-custom py-10 text-left max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted hover:text-gold mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
      </Link>

      <div className="border-b border-themeBorder/40 pb-6 mb-8">
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-text uppercase">
          Chính Sách <span className="text-gold">Bảo Mật</span>
        </h1>
        <p className="text-muted text-sm mt-2">Quyền riêng tư của bạn là ưu tiên hàng đầu của chúng tôi.</p>
      </div>

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
    </div>
  );
};

/**
 * -------------------------------------------------------------
 * 5. CONTACT - LIÊN HỆ QUẢNG CÁO
 * -------------------------------------------------------------
 */
export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", msg: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.msg) {
      setSubmitted(true);
    }
  };

  return (
    <div className="container-custom py-10 text-left max-w-4xl">
      <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted hover:text-gold mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
      </Link>

      <div className="border-b border-themeBorder/40 pb-6 mb-8">
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-text uppercase">
          Liên Hệ <span className="text-gold">Hợp Tác</span>
        </h1>
        <p className="text-muted text-sm mt-2">Hợp tác quảng cáo, bảo trợ truyền thông hoặc giải đáp kỹ thuật.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Form liên hệ */}
        <div>
          {submitted ? (
            <div className="p-8 bg-surface/20 border border-gold/20 rounded-sharp text-center">
              <Sparkles className="w-10 h-10 text-gold mx-auto mb-4" />
              <h3 className="font-display font-bold text-lg text-text">Gửi liên hệ thành công!</h3>
              <p className="text-xs text-muted mt-2">Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted">Họ và tên</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-surface border border-themeBorder/60 focus:border-gold rounded-sharp px-4 py-2.5 text-xs text-text focus:outline-none transition-all"
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted">Địa chỉ email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-surface border border-themeBorder/60 focus:border-gold rounded-sharp px-4 py-2.5 text-xs text-text focus:outline-none transition-all"
                  placeholder="email@example.com"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted">Nội dung tin nhắn</label>
                <textarea
                  rows={4}
                  required
                  value={formData.msg}
                  onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                  className="bg-surface border border-themeBorder/60 focus:border-gold rounded-sharp px-4 py-2.5 text-xs text-text focus:outline-none transition-all resize-none"
                  placeholder="Hãy viết tin nhắn của bạn tại đây..."
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-3 bg-gold hover:bg-gold-hover text-background text-xs font-black uppercase tracking-wider rounded-sharp flex items-center justify-center gap-1.5 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Gửi thông tin</span>
              </button>
            </form>
          )}
        </div>

        {/* Thông tin liên hệ trực tiếp */}
        <div className="flex flex-col gap-8 justify-center">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-surface/50 border border-themeBorder rounded-sharp flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="font-display font-bold text-xs uppercase text-text">Địa chỉ email</h4>
              <p className="text-xs text-muted mt-1">support@cineflow.vn</p>
              <p className="text-[10px] text-muted/65 mt-0.5">Phản hồi trong vòng 24 giờ</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-surface/50 border border-themeBorder rounded-sharp flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="font-display font-bold text-xs uppercase text-text">Điện thoại đường dây nóng</h4>
              <p className="text-xs text-muted mt-1">+84 (024) 123-4567</p>
              <p className="text-[10px] text-muted/65 mt-0.5">Thứ 2 - Thứ 6 (8:00 - 17:30)</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-surface/50 border border-themeBorder rounded-sharp flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="font-display font-bold text-xs uppercase text-text">Trụ sở chính</h4>
              <p className="text-xs text-muted mt-1">Tòa nhà CineFlow, Cầu Giấy, Hà Nội, Việt Nam</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * -------------------------------------------------------------
 * 6. DEVICES - THIẾT BỊ TƯƠNG THÍCH
 * -------------------------------------------------------------
 */
export const DevicesPage: React.FC = () => {
  const devices = [
    { icon: <Tv className="w-7 h-7" />, title: "Smart TV", spec: "Hỗ trợ WebOS, Tizen, Android TV qua trình duyệt web.", quality: "Độ phân giải lên tới 4K UHD" },
    { icon: <Smartphone className="w-7 h-7" />, title: "Điện thoại thông minh", spec: "Tương thích cao trên iOS và Android.", quality: "Chất lượng Full HD di động" },
    { icon: <Laptop className="w-7 h-7" />, title: "Máy tính xách tay / Desktop", spec: "Xem trực tiếp qua Chrome, Safari, Firefox.", quality: "Hỗ trợ HDR10 mượt mà" },
    { icon: <Gamepad2 className="w-7 h-7" />, title: "Máy chơi game console", spec: "Trải nghiệm trên Xbox Series X/S và PS5.", quality: "Âm thanh vòm Dolby Audio" },
    { icon: <Tablet className="w-7 h-7" />, title: "Máy tính bảng", spec: "Đồng bộ tối đa cho iPad và Galaxy Tab.", quality: "Tối ưu hóa màn hình cảm ứng" }
  ];

  return (
    <div className="container-custom py-10 text-left">
      <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted hover:text-gold mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
      </Link>

      <div className="border-b border-themeBorder/40 pb-6 mb-8">
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-text uppercase">
          Thiết Bị <span className="text-gold">Hỗ Trợ</span>
        </h1>
        <p className="text-muted text-sm mt-2">Danh sách các thiết bị tương thích để thưởng thức CineFlow.</p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {devices.map((dev, idx) => (
          <div key={idx} className="p-6 bg-surface/20 border border-themeBorder/40 hover:border-gold/30 rounded-sharp transition-all flex flex-col gap-4">
            <div className="w-12 h-12 bg-surface/50 border border-themeBorder/60 rounded-sharp flex items-center justify-center text-gold">
              {dev.icon}
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-text">{dev.title}</h3>
              <p className="text-xs text-muted mt-2 leading-relaxed">{dev.spec}</p>
              <span className="inline-block mt-3 text-[10px] font-bold text-gold uppercase tracking-wider">{dev.quality}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * -------------------------------------------------------------
 * 7. BLOG - BLOG ĐIỆN ẢNH
 * -------------------------------------------------------------
 */
export const BlogPage: React.FC = () => {
  const posts = [
    {
      title: "Hành trình sáng tạo vũ trụ điện ảnh kỳ vĩ của Christopher Nolan",
      summary: "Khám phá phong cách chỉ đạo tài ba, nghệ thuật dựng cảnh và việc hạn chế dùng kỹ xảo CGI trong các siêu phẩm như Interstellar, Inception và Oppenheimer.",
      date: "20/05/2026",
      readTime: "5 phút đọc",
      author: "Huy Nguyễn"
    },
    {
      title: "Giải mã sức hút khổng lồ của các tác phẩm Anime từ xưởng phim Ghibli",
      summary: "Nhìn lại lịch sử, triết lý nhân văn sâu sắc và nét vẽ tay truyền thống đặc trưng tạo nên thương hiệu của những kiệt tác kinh điển từ Miyazaki Hayao.",
      date: "18/05/2026",
      readTime: "4 phút đọc",
      author: "Mai Lê"
    },
    {
      title: "Xu hướng phát triển rạp chiếu phim tại gia năm 2026",
      summary: "Tổng hợp các thiết bị âm thanh vòm, máy chiếu 4K thế hệ mới và cách thiết lập phòng phim chuẩn rạp để có trải nghiệm điện ảnh hoàn hảo tại nhà.",
      date: "15/05/2026",
      readTime: "6 phút đọc",
      author: "Minh Tuấn"
    }
  ];

  return (
    <div className="container-custom py-10 text-left max-w-4xl">
      <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted hover:text-gold mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
      </Link>

      <div className="border-b border-themeBorder/40 pb-6 mb-8">
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-text uppercase">
          Blog <span className="text-gold">Điện Ảnh</span>
        </h1>
        <p className="text-muted text-sm mt-2">Tin tức điện ảnh mới nhất, phân tích phim sâu sắc và xu hướng rạp phim tại gia.</p>
      </div>

      <div className="flex flex-col gap-8">
        {posts.map((post, idx) => (
          <article key={idx} className="p-6 bg-surface/20 border border-themeBorder/40 hover:border-gold/30 rounded-sharp transition-all flex flex-col gap-4">
            <h3 className="font-display font-bold text-lg md:text-xl text-text hover:text-gold transition-colors cursor-pointer">
              {post.title}
            </h3>
            <p className="text-xs text-muted leading-relaxed">{post.summary}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-muted/80 border-t border-themeBorder/20 pt-4 mt-2">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-gold" /> {post.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
