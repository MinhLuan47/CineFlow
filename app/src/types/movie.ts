/**
 * Kiểu dữ liệu chuẩn cho một bộ phim trong ứng dụng CineFlow.
 * Định dạng ngôn ngữ: Tiếng Việt làm chủ đạo, hỗ trợ đầy đủ các trường hiển thị nâng cao.
 */
export interface Movie {
  id: string;
  title: string;              // Tên phim tiếng Việt (ví dụ: "Kẻ Kiến Tạo")
  originalTitle: string;      // Tên phim gốc bằng tiếng Anh/ngôn ngữ gốc (ví dụ: "The Creator")
  poster: string;             // Đường dẫn ảnh poster đứng (tỷ lệ 2:3) từ unsplash/picsum
  backdrop: string;           // Đường dẫn ảnh nền ngang (tỷ lệ 16:9) làm background banner
  year: number;               // Năm phát hành (ví dụ: 2026)
  genre: string[];            // Danh sách thể loại phim (ví dụ: ["Hành động", "Viễn tưởng"])
  rating: number;             // Điểm đánh giá trung bình (ví dụ: 8.7)
  duration: string;           // Thời lượng phim (ví dụ: "2h 15m")
  quality: string;            // Chất lượng phim (ví dụ: "4K", "FHD", "HD")
  subtitle: string;           // Loại phụ đề/lồng tiếng (ví dụ: "Vietsub", "Thuyết minh")
  description: string;        // Tóm tắt nội dung phim
  views: number;              // Lượt xem của phim
  isFeatured?: boolean;       // Đánh dấu phim nổi bật trên trang Hero (tuỳ chọn)
}
