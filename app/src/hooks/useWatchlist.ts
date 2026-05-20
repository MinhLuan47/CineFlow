import { useState, useEffect, useCallback } from "react";
import { storage } from "../utils/storage";
import type { StorageItem } from "../utils/storage";
import type { NormalizedMovie, NormalizedTvSeries } from "../types/api";

/**
 * Custom Hook useWatchlist - Quản lý Danh sách lưu trữ yêu thích ở phía Client qua localStorage.
 */
export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<StorageItem[]>([]);

  // Tải danh sách lưu trữ khi Mount component
  useEffect(() => {
    setWatchlist(storage.getWatchlist());
  }, []);

  /**
   * Thêm một phim lẻ hoặc phim bộ vào danh sách lưu trữ
   */
  const addToWatchlist = useCallback((item: NormalizedMovie | NormalizedTvSeries) => {
    storage.addToWatchlist(item);
    setWatchlist(storage.getWatchlist());
  }, []);

  /**
   * Xóa phim lẻ hoặc phim bộ khỏi danh sách lưu trữ
   */
  const removeFromWatchlist = useCallback((id: string) => {
    storage.removeFromWatchlist(id);
    setWatchlist(storage.getWatchlist());
  }, []);

  /**
   * Xóa sạch toàn bộ danh sách lưu trữ
   */
  const clearWatchlist = useCallback(() => {
    storage.clearWatchlist();
    setWatchlist([]);
  }, []);

  /**
   * Kiểm tra xem một phim lẻ/phim bộ đã nằm trong watchlist chưa
   */
  const isInWatchlist = useCallback((id: string) => {
    return storage.isInWatchlist(id);
  }, []);

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    clearWatchlist,
    isInWatchlist
  };
};
