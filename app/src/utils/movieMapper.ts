import type { Movie } from "../types/movie";
import type { NormalizedMovie, NormalizedTvSeries } from "../types/api";

/**
 * Hàm hỗ trợ chuyển đổi dữ liệu tìm kiếm Phim điện ảnh / Phim truyền hình đã chuẩn hóa
 * sang định dạng hiển thị cũ (Movie) để sử dụng với component MovieCard.
 */
export const mapNormalizedToMovie = (
  normalized: NormalizedMovie | NormalizedTvSeries
): Movie => {
  const isMovie = normalized.mediaType === "movie" || !("name" in normalized);
  
  if (isMovie) {
    const movieItem = normalized as NormalizedMovie;
    return {
      id: movieItem.id,
      title: movieItem.title,
      originalTitle: movieItem.originalTitle,
      poster:
        movieItem.posterUrl ||
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80",
      backdrop:
        movieItem.backdropUrl ||
        "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1600&auto=format&fit=crop&q=80",
      year: movieItem.year || 2026,
      genre: movieItem.genres.length > 0 ? movieItem.genres : ["Đang cập nhật"],
      rating: movieItem.voteAverage,
      duration: movieItem.runtime
        ? `${Math.floor(movieItem.runtime / 60)}h ${movieItem.runtime % 60}m`
        : "2h 00m",
      quality: movieItem.quality || "FHD",
      subtitle:
        movieItem.subtitleLanguages && movieItem.subtitleLanguages.length > 0
          ? movieItem.subtitleLanguages[0]
          : "Vietsub",
      description: movieItem.overview || "Chưa có tóm tắt nội dung.",
      views: movieItem.voteCount * 123,
    };
  } else {
    const tvItem = normalized as NormalizedTvSeries;
    return {
      id: tvItem.id,
      title: tvItem.name,
      originalTitle: tvItem.originalName,
      poster:
        tvItem.posterUrl ||
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80",
      backdrop:
        tvItem.backdropUrl ||
        "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1600&auto=format&fit=crop&q=80",
      year: tvItem.year || 2026,
      genre: tvItem.genres.length > 0 ? tvItem.genres : ["Đang cập nhật"],
      rating: tvItem.voteAverage,
      duration: "Đang cập nhật",
      quality: "FHD",
      subtitle: "Vietsub",
      description: tvItem.overview || "Chưa có tóm tắt nội dung.",
      views: tvItem.voteCount * 123,
    };
  }
};
