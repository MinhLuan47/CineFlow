import type { Movie } from "../types/movie";

/**
 * Danh sách phim mẫu chất lượng cao cho CineFlow.
 * Sử dụng hình ảnh từ Unsplash đại diện cho các tác phẩm điện ảnh thực tế.
 */
export const SAMPLE_MOVIES: Movie[] = [
  {
    id: "1",
    title: "Chrono Drift",
    description: "Một nhà vật lý thiên văn khám phá ra lỗ hổng thời gian trong tâm một hố đen nhân tạo, buộc anh phải chọn giữa việc cứu gia đình hay bảo vệ dòng chảy lịch sử.",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1600&auto=format&fit=crop&q=80",
    rating: 8.9,
    releaseYear: 2026,
    duration: "2h 32m",
    genres: ["Sci-Fi", "Drama", "Mystery"],
    isFeatured: true
  },
  {
    id: "2",
    title: "Midnight Neon",
    description: "Tại thành phố Neo-Tokyo phủ đầy mưa rào và ánh đèn neon, một thám tử điều tra các vụ mất tích bí ẩn liên quan đến dịch vụ lưu trữ ký ức số hóa.",
    posterUrl: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=500&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80",
    rating: 8.4,
    releaseYear: 2025,
    duration: "1h 58m",
    genres: ["Cyberpunk", "Action", "Thriller"]
  },
  {
    id: "3",
    title: "The Golden Era",
    description: "Cuộc hành trình tìm lại ánh hào quang của một huyền thoại nhạc Jazz những năm 1950 trong thời kỳ giao thoa của âm nhạc hiện đại.",
    posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1600&auto=format&fit=crop&q=80",
    rating: 9.1,
    releaseYear: 2024,
    duration: "2h 10m",
    genres: ["Music", "Drama", "Biography"]
  },
  {
    id: "4",
    title: "Shadow Syndicate",
    description: "Một cựu điệp viên phải đối mặt với tổ chức cũ của mình trong cuộc chiến giành quyền kiểm soát mạng lưới vệ tinh quân sự.",
    posterUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&auto=format&fit=crop&q=80",
    rating: 7.8,
    releaseYear: 2025,
    duration: "2h 05m",
    genres: ["Action", "Crime", "Suspense"]
  }
];
