import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Sparkles, Mail, Phone, MapPin } from "lucide-react";
import { Button, Container, SectionHeader, Card } from "../../components";

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
    <Container py="none" className="py-10 text-left max-w-4xl">
      <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted hover:text-gold mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
      </Link>

      <SectionHeader
        title={
          <>
            Liên Hệ <span className="text-gold">Hợp Tác</span>
          </>
        }
        subtitle="Hợp tác quảng cáo, bảo trợ truyền thông hoặc giải đáp kỹ thuật."
        className="border-b border-themeBorder/40 pb-6 mb-8 gap-2"
      />

      <div className="grid md:grid-cols-2 gap-10">
        {/* Form liên hệ */}
        <div>
          {submitted ? (
            <Card variant="glass" className="p-8 text-center">
              <Sparkles className="w-10 h-10 text-gold mx-auto mb-4" />
              <h3 className="font-display font-bold text-lg text-text">Gửi liên hệ thành công!</h3>
              <p className="text-xs text-muted mt-2">Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.</p>
            </Card>
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

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="mt-2 w-full bg-gold hover:bg-gold-hover text-background hover:text-background text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-none border-none"
                icon={<Send className="w-4 h-4" />}
              >
                Gửi thông tin
              </Button>
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
    </Container>
  );
};
