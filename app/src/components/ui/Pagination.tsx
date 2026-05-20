import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { cn } from "../../lib/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: "primary" | "gold";
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  variant = "primary",
  className,
}) => {
  const [inputVal, setInputVal] = useState<string>(currentPage.toString());

  // Đồng bộ giá trị input khi trang hiện tại thay đổi từ bên ngoài
  useEffect(() => {
    setInputVal(currentPage.toString());
  }, [currentPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const submitPage = () => {
    const pageNum = parseInt(inputVal, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
    } else {
      // Reset về trang hiện tại nếu nhập sai phạm vi
      setInputVal(currentPage.toString());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitPage();
    }
  };

  if (totalPages <= 1) return null;

  const isGold = variant === "gold";
  const activeTextClass = isGold ? "text-gold" : "text-primary";
  const focusBorderClass = isGold ? "focus-within:border-gold/50" : "focus-within:border-primary/50";
  const inputBorderFocusClass = isGold ? "focus:border-gold" : "focus:border-primary";
  const buttonBgClass = isGold ? "bg-gold/10 hover:bg-gold/20" : "bg-primary/10 hover:bg-primary/20";
  const buttonBorderClass = isGold ? "border-gold/30" : "border-primary/30";
  const buttonTextClass = isGold ? "text-gold" : "text-primary";

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-12 pt-6 border-t border-themeBorder/20 w-full",
        className
      )}
    >
      {/* Các nút bấm Chuyển Trang */}
      <div className="flex items-center gap-3">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          variant="outline"
          size="sm"
          animate={false}
          icon={<ChevronLeft className="w-3.5 h-3.5" />}
        >
          Trước
        </Button>

        <span className="text-xs font-bold text-muted min-w-[80px] text-center">
          Trang <span className={activeTextClass}>{currentPage}</span> / {totalPages}
        </span>

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          variant="outline"
          size="sm"
          animate={false}
          icon={<ChevronRight className="w-3.5 h-3.5" />}
          iconPosition="right"
        >
          Sau
        </Button>
      </div>

      {/* Input nhảy trang nhanh */}
      <div
        className={cn(
          "flex items-center gap-2 bg-surface/50 border border-themeBorder rounded-sharp px-3 py-1.5 transition-colors",
          focusBorderClass
        )}
      >
        <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Đi đến:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={inputVal}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={submitPage}
          className={cn(
            "w-12 bg-transparent text-center text-xs font-bold text-text focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-b border-themeBorder pb-0.5 transition-colors",
            inputBorderFocusClass
          )}
        />
        <button
          onClick={submitPage}
          className={cn(
            "px-2 py-0.5 border text-[10px] font-extrabold uppercase rounded-sharp transition-colors",
            buttonBgClass,
            buttonBorderClass,
            buttonTextClass
          )}
        >
          Chuyển
        </button>
      </div>
    </div>
  );
};
