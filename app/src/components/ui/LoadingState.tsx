import React from "react";
import { Loader2 } from "lucide-react";
import { MovieCardSkeleton } from "./MovieCardSkeleton";

interface LoadingStateProps {
  variant?: "spinner" | "skeleton";
  skeletonCount?: number;
  gridClass?: string;
}

/**
 * Thành phần LoadingState chuẩn hóa trạng thái chờ phản hồi API.
 * - Chế độ "spinner": Hiện vòng tròn quay truyền thống cho panel nhỏ hoặc thanh menu.
 * - Chế độ "skeleton": Hiện khung xương giả lập shimmer khớp tỷ lệ poster phim.
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  variant = "skeleton",
  skeletonCount = 6,
  gridClass
}) => {
  if (variant === "spinner") {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center gap-3 text-muted">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="text-xs tracking-widest font-black uppercase text-muted/65 animate-pulse">
          Đang tải dữ liệu...
        </span>
      </div>
    );
  }

  return <MovieCardSkeleton count={skeletonCount} gridClass={gridClass} />;
};
export default LoadingState;
