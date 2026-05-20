import React from "react";
import { MovieCard } from "../MovieCard";

interface MovieCardSkeletonProps {
  count?: number;
  gridClass?: string;
}

/**
 * Thành phần vẽ Khung xương tải dữ liệu (Skeleton Shimmer) cho danh sách thẻ phim.
 * @param count Số lượng thẻ xương cần vẽ
 * @param gridClass Lớp cấu trúc lưới CSS (Ví dụ: grid grid-cols-2 sm:grid-cols-3)
 */
export const MovieCardSkeleton: React.FC<MovieCardSkeletonProps> = ({ 
  count = 4, 
  gridClass = "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10" 
}) => {
  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={`movie-skeleton-${idx}`} className="w-full">
          <MovieCard loading={true} />
        </div>
      ))}
    </div>
  );
};
export default MovieCardSkeleton;
