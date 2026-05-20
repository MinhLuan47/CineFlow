import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Calendar, Clock } from "lucide-react";
import { Container, SectionHeader, Card } from "../../components";

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
    <Container py="none" className="py-10 text-left max-w-4xl">
      <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted hover:text-gold mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
      </Link>

      <SectionHeader
        title={
          <>
            Blog <span className="text-gold">Điện Ảnh</span>
          </>
        }
        subtitle="Tin tức điện ảnh mới nhất, phân tích phim sâu sắc và xu hướng rạp phim tại gia."
        className="border-b border-themeBorder/40 pb-6 mb-8 gap-2"
      />

      <div className="flex flex-col gap-8">
        {posts.map((post, idx) => (
          <Card key={idx} variant="glass" className="hover:border-gold/30 transition-all flex flex-col gap-4">
            <h3 className="font-display font-bold text-lg md:text-xl text-text hover:text-gold transition-colors cursor-pointer">
              {post.title}
            </h3>
            <p className="text-xs text-muted leading-relaxed">{post.summary}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-muted/80 border-t border-themeBorder/20 pt-4 mt-2">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-gold" /> {post.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
};
