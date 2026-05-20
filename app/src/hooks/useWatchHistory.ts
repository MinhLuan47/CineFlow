import { useState, useEffect, useCallback } from "react";
import { storage } from "../utils/storage";
import type { StorageItem } from "../utils/storage";
import type { NormalizedMovie, NormalizedTvSeries } from "../types/api";

/**
 * Custom Hook useWatchHistory - Quản lý Lịch sử xem phim ở phía Client qua localStorage.
 */
export const useWatchHistory = () => {
  const [history, setHistory] = useState<StorageItem[]>([]);

  // Tải danh sách lịch sử khi Mount component
  useEffect(() => {
    setHistory(storage.getHistory());
  }, []);

  /**
   * Thêm một phim lẻ hoặc phim bộ đã xem vào lịch sử xem
   */
  const addToHistory = useCallback((item: NormalizedMovie | NormalizedTvSeries) => {
    storage.addToHistory(item);
    setHistory(storage.getHistory());
  }, []);

  /**
   * Xóa một phim lẻ hoặc phim bộ khỏi lịch sử xem
   */
  const removeFromHistory = useCallback((id: string) => {
    storage.removeFromHistory(id);
    setHistory(storage.getHistory());
  }, []);

  /**
   * Xóa sạch toàn bộ lịch sử xem phim
   */
  const clearHistory = useCallback(() => {
    storage.clearHistory();
    setHistory([]);
  }, []);

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory
  };
};
