import React from "react";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  onReset?: () => void;
  resetText?: string;
}

/**
 * Thành phần EmptyState chuẩn hóa giao diện khi danh sách trống hoặc bộ lọc không khớp dữ liệu.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  message = "Không tìm thấy bộ phim nào phù hợp với danh mục hoặc từ khóa của bạn.",
  onReset,
  resetText = "Đặt lại bộ lọc"
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20 px-6 text-center border border-dashed border-themeBorder/60 rounded-sharp">
      <div className="w-10 h-10 bg-themeBorder/30 border border-themeBorder/65 flex items-center justify-center text-muted mb-4 rounded-sharp">
        <FolderOpen className="w-5 h-5 opacity-70" />
      </div>
      <p className="text-muted text-sm max-w-sm leading-relaxed">{message}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-6 text-xs text-primary font-black uppercase tracking-wider underline hover:text-primary-dark transition-colors"
        >
          {resetText}
        </button>
      )}
    </div>
  );
};
export default EmptyState;
