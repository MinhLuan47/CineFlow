/**
 * Định nghĩa kiểu dữ liệu cho một bộ phim trong hệ thống CineFlow.
 */
export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;       // Đường dẫn ảnh poster đứng (tỷ lệ khoảng 2:3)
  backdropUrl: string;     // Đường dẫn ảnh nền ngang làm background banner
  rating: number;          // Điểm đánh giá (ví dụ: 8.5)
  releaseYear: number;     // Năm phát hành
  duration: string;        // Thời lượng phim (ví dụ: "2h 15m")
  genres: string[];        // Danh sách thể loại (ví dụ: ["Action", "Sci-Fi"])
  isFeatured?: boolean;    // Đánh dấu là phim nổi bật chính trên trang Hero
}
