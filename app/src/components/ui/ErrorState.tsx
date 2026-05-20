import React from "react";
import { ShieldAlert, RefreshCw } from "lucide-react";
import { Button } from "./Button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  variant?: "blocking" | "banner";
}

/**
 * Thành phần ErrorState chuẩn hóa hiển thị cảnh báo lỗi dữ liệu.
 * - Chế độ "banner": Dành cho trường hợp lỗi không nghiêm trọng, đã kích hoạt dữ liệu dự phòng ngoại tuyến.
 * - Chế độ "blocking": Dành cho lỗi nghiêm trọng làm trống giao diện cần nút tải lại dữ liệu rõ ràng.
 */
export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Không thể kết nối tới máy chủ API. Vui lòng kiểm tra lại kết nối mạng của bạn.",
  onRetry,
  variant = "banner"
}) => {
  if (variant === "banner") {
    return (
      <div className="w-full mb-8 px-5 py-3.5 bg-red-950/20 border border-red-500/20 text-red-400 text-xs rounded-sharp flex items-center justify-between gap-4 animate-fade-in">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping flex-shrink-0" />
          <span>Đang hiển thị dữ liệu ngoại tuyến (Fake Data) do mất kết nối máy chủ.</span>
        </div>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="ghost"
            size="sm"
            className="text-red-300 hover:text-red-200 underline decoration-dotted flex-shrink-0 h-auto p-0 hover:bg-transparent normal-case font-normal"
            icon={<RefreshCw className="w-3 h-3" />}
          >
            Thử lại
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full py-16 px-6 text-center border border-red-500/10 bg-red-950/5 flex flex-col items-center justify-center gap-4 rounded-sharp">
      <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 rounded-sharp">
        <ShieldAlert className="w-6 h-6" />
      </div>
      <div className="max-w-md">
        <h4 className="font-display font-bold text-base text-text mb-1">Mất kết nối máy chủ</h4>
        <p className="text-xs text-muted leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          className="mt-2 text-primary border-primary/20 hover:border-primary/60 hover:bg-primary/5 text-xs"
          icon={<RefreshCw className="w-3.5 h-3.5 animate-pulse" />}
        >
          Tải lại dữ liệu
        </Button>
      )}
    </div>
  );
};
export default ErrorState;
