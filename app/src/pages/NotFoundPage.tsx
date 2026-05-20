import React from "react";
import { Link } from "react-router-dom";
import { Home, AlertOctagon } from "lucide-react";
import { Container, Badge, Button } from "../components";

/**
 * NotFoundPage - Trang báo lỗi 404 khi đường dẫn không tồn tại.
 */
export const NotFoundPage: React.FC = () => {
  return (
    <Container py="none" className="py-20 min-h-[70vh] flex flex-col items-center justify-center text-center">
      {/* Biểu tượng lỗi */}
      <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mb-8 relative animate-pulse">
        <AlertOctagon className="w-10 h-10 text-primary" />
        <div className="absolute inset-0 bg-primary/5 rounded-full scale-125 -z-10 blur-sm" />
      </div>

      {/* Mã lỗi */}
      <Badge variant="primary" size="sm" className="mb-4">
        Lỗi 404
      </Badge>

      {/* Thông tin thông báo */}
      <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-text mb-6">
        KHÔNG TÌM THẤY <br />
        <span className="text-primary">TRANG YÊU CẦU</span>
      </h1>
      
      <p className="text-muted text-sm md:text-base max-w-md mb-10 leading-relaxed">
        Đường dẫn bạn truy cập không tồn tại hoặc đã bị gỡ bỏ khỏi hệ thống rạp phim trực tuyến của CineFlow.
      </p>

      {/* Nút quay lại trang chủ */}
      <Link to="/">
        <Button
          variant="primary"
          size="md"
          icon={<Home className="w-4 h-4" />}
        >
          Quay lại trang chủ
        </Button>
      </Link>
    </Container>
  );
};

export default NotFoundPage;
