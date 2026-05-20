import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, History, Bookmark, ArrowRight } from "lucide-react";
import { useWatchlist } from "../hooks/useWatchlist";
import { useWatchHistory } from "../hooks/useWatchHistory";
import { MediaCard } from "../components";

/**
 * WatchlistPage - Trang hiển thị Danh sách lưu trữ (Watchlist) và Lịch sử xem phim (History).
 */
export const WatchlistPage: React.FC = () => {
  const { watchlist, removeFromWatchlist, clearWatchlist } = useWatchlist();
  const { history, removeFromHistory, clearHistory } = useWatchHistory();
  
  // Trạng thái tab đang hoạt động: 'watchlist' hoặc 'history'
  const [activeTab, setActiveTab] = useState<"watchlist" | "history">("watchlist");

  const isWatchlist = activeTab === "watchlist";
  const activeList = isWatchlist ? watchlist : history;

  return (
    <div className="container-custom py-10 min-h-[75vh] text-left">
      
      {/* Header trang */}
      <div className="border-b border-themeBorder/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-text">
            THƯ VIỆN <span className="text-gold">CÁ NHÂN</span>
          </h1>
          <p className="text-muted text-sm mt-2">
            Quản lý những bộ phim bạn đã lưu và lịch sử xem của mình trên trình duyệt này.
          </p>
        </div>

        {/* Nút Xóa tất cả */}
        {activeList.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm(isWatchlist ? "Bạn có chắc chắn muốn xóa toàn bộ danh sách lưu trữ?" : "Bạn có chắc chắn muốn xóa toàn bộ lịch sử xem?")) {
                isWatchlist ? clearWatchlist() : clearHistory();
              }
            }}
            className="self-start md:self-auto flex items-center gap-1.5 px-4 py-2 bg-background hover:bg-red-500/10 border border-themeBorder hover:border-red-500/30 text-xs font-bold uppercase tracking-wider text-muted hover:text-red-500 rounded-sharp transition-all duration-300"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isWatchlist ? "Xóa toàn bộ tủ phim" : "Xóa lịch sử xem"}</span>
          </button>
        )}
      </div>

      {/* Tab Switchers */}
      <div className="flex gap-4 border-b border-themeBorder/20 pb-4 mb-8">
        <button
          onClick={() => setActiveTab("watchlist")}
          className={`flex items-center gap-2 pb-2 text-sm font-black uppercase tracking-wider transition-colors relative ${
            isWatchlist ? "text-gold" : "text-muted hover:text-text"
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Tủ Phim Lưu Trữ ({watchlist.length})</span>
          {isWatchlist && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-2 pb-2 text-sm font-black uppercase tracking-wider transition-colors relative ${
            !isWatchlist ? "text-gold" : "text-muted hover:text-text"
          }`}
        >
          <History className="w-4 h-4" />
          <span>Lịch Sử Đã Xem ({history.length})</span>
          {!isWatchlist && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full" />
          )}
        </button>
      </div>

      {/* HIỂN THỊ DANH SÁCH */}
      {activeList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {activeList.map((item) => (
            <div
              key={item.id}
              className="flex flex-col bg-surface/20 border border-themeBorder/40 hover:border-gold/30 rounded-sharp p-2 transition-all duration-300 group shadow-lg"
            >
              {/* MediaCard Component hiện hành */}
              <div className="flex-1">
                <MediaCard item={item} />
              </div>

              {/* Nút Xóa từng phần tử khỏi danh sách */}
              <button
                onClick={() => isWatchlist ? removeFromWatchlist(item.id) : removeFromHistory(item.id)}
                className="w-full mt-3 flex items-center justify-center gap-1 py-2 bg-background hover:bg-red-500/10 border border-themeBorder/60 hover:border-red-500/30 text-[10px] font-bold text-muted hover:text-red-500 rounded-sharp transition-colors duration-300"
                title={isWatchlist ? "Xóa khỏi danh sách lưu trữ" : "Xóa khỏi lịch sử xem"}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Loại bỏ</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* GIAO DIỆN EMPTY STATE */
        <div className="py-20 flex flex-col items-center justify-center border border-dashed border-themeBorder/40 rounded-sharp bg-surface/10 text-center max-w-2xl mx-auto my-6 px-6">
          <div className="w-16 h-16 bg-surface/60 border border-themeBorder/40 rounded-full flex items-center justify-center mb-5">
            {isWatchlist ? (
              <Bookmark className="w-7 h-7 text-gold" />
            ) : (
              <History className="w-7 h-7 text-gold" />
            )}
          </div>
          <h3 className="font-display font-bold text-lg text-text">
            {isWatchlist ? "Tủ phim lưu trữ của bạn đang trống" : "Lịch sử xem của bạn chưa có thông tin"}
          </h3>
          <p className="text-xs text-muted max-w-sm mt-2 leading-relaxed">
            {isWatchlist
              ? "Hãy thêm các tác phẩm yêu thích để theo dõi tiện lợi hơn tại đây."
              : "Các bộ phim bạn đã click vào xem trailer sẽ tự động được ghi nhận tại đây."}
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-hover text-background text-xs font-black uppercase tracking-wider rounded-sharp transition-all"
          >
            <span>Khám phá phim ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
