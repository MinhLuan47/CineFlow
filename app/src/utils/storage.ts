import type { NormalizedMovie, NormalizedTvSeries } from "../types/api";

// Khóa lưu trữ cục bộ cho Watchlist và Lịch sử xem
const WATCHLIST_KEY = "cineflow:watchlist";
const HISTORY_KEY = "cineflow:history";

export type StorageItem = (NormalizedMovie | NormalizedTvSeries) & {
  addedAt?: number;
  watchedAt?: number;
};

/**
 * Tiện ích quản lý lưu trữ LocalStorage cho Watchlist và Lịch sử xem của CineFlow.
 */
export const storage = {
  // ==========================================
  // WATCHLIST (Danh sách yêu thích)
  // ==========================================

  /**
   * Lấy toàn bộ danh sách watchlist
   */
  getWatchlist(): StorageItem[] {
    try {
      const data = localStorage.getItem(WATCHLIST_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data) as StorageItem[];
      // Sắp xếp theo thứ tự mới thêm lên đầu
      return parsed.sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));
    } catch (e) {
      console.error("Lỗi khi đọc Watchlist từ localStorage:", e);
      return [];
    }
  },

  /**
   * Thêm một phim lẻ hoặc phim bộ vào watchlist
   */
  addToWatchlist(item: NormalizedMovie | NormalizedTvSeries): void {
    try {
      const list = this.getWatchlist();
      if (list.some((existing) => existing.id === item.id)) {
        return; // Đã tồn tại trong danh sách
      }
      const newItem: StorageItem = {
        ...item,
        addedAt: Date.now()
      };
      list.push(newItem);
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
    } catch (e) {
      console.error("Lỗi khi thêm vào Watchlist:", e);
    }
  },

  /**
   * Xóa một phim lẻ hoặc phim bộ khỏi watchlist
   */
  removeFromWatchlist(id: string): void {
    try {
      const list = this.getWatchlist();
      const filtered = list.filter((item) => item.id !== id);
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error("Lỗi khi xóa khỏi Watchlist:", e);
    }
  },

  /**
   * Kiểm tra xem phim đã có trong watchlist chưa
   */
  isInWatchlist(id: string): boolean {
    const list = this.getWatchlist();
    return list.some((item) => item.id === id);
  },

  /**
   * Xóa sạch toàn bộ watchlist
   */
  clearWatchlist(): void {
    try {
      localStorage.removeItem(WATCHLIST_KEY);
    } catch (e) {
      console.error("Lỗi khi xóa sạch Watchlist:", e);
    }
  },

  // ==========================================
  // WATCH HISTORY (Lịch sử xem phim)
  // ==========================================

  /**
   * Lấy toàn bộ lịch sử xem
   */
  getHistory(): StorageItem[] {
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data) as StorageItem[];
      // Sắp xếp theo thứ tự mới xem gần nhất lên đầu
      return parsed.sort((a, b) => (b.watchedAt || 0) - (a.watchedAt || 0));
    } catch (e) {
      console.error("Lỗi khi đọc lịch sử xem từ localStorage:", e);
      return [];
    }
  },

  /**
   * Thêm một phim lẻ hoặc phim bộ vào lịch sử xem
   */
  addToHistory(item: NormalizedMovie | NormalizedTvSeries): void {
    try {
      let list = this.getHistory();
      // Nếu đã tồn tại trong lịch sử, loại bỏ phần tử cũ để đưa phần tử mới xem lên đầu
      list = list.filter((existing) => existing.id !== item.id);
      
      const newItem: StorageItem = {
        ...item,
        watchedAt: Date.now()
      };
      list.unshift(newItem); // Thêm lên đầu danh sách

      // Giới hạn lịch sử xem tối đa 50 phim để tránh đầy bộ nhớ localStorage
      if (list.length > 50) {
        list = list.slice(0, 50);
      }
      
      localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
    } catch (e) {
      console.error("Lỗi khi thêm vào lịch sử xem:", e);
    }
  },

  /**
   * Xóa một phim lẻ hoặc phim bộ khỏi lịch sử xem
   */
  removeFromHistory(id: string): void {
    try {
      const list = this.getHistory();
      const filtered = list.filter((item) => item.id !== id);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error("Lỗi khi xóa khỏi lịch sử xem:", e);
    }
  },

  /**
   * Xóa sạch toàn bộ lịch sử xem
   */
  clearHistory(): void {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (e) {
      console.error("Lỗi khi xóa sạch lịch sử xem:", e);
    }
  }
};
