import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import MarketingLayout from "../layouts/MarketingLayout";
import HomePage from "../pages/HomePage";
import MoviesPage from "../pages/MoviesPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import SearchPage from "../pages/SearchPage";
import GenresPage from "../pages/GenresPage";
import GenreDetailPage from "../pages/GenreDetailPage";
import TvPage from "../pages/TvPage";
import TvDetailPage from "../pages/TvDetailPage";
import WatchPage from "../pages/WatchPage";
import WatchlistPage from "../pages/WatchlistPage";
import NotFoundPage from "../pages/NotFoundPage";

/**
 * AppRoutes - Định nghĩa tất cả các tuyến đường (routes) trong ứng dụng CineFlow.
 */
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Nhóm giao diện tiếp thị cho trang chủ */}
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* Nhóm giao diện chính của ứng dụng phim */}
      <Route element={<AppLayout />}>
        {/* Phân loại phim điện ảnh */}
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:category" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />

        {/* Phim truyền hình dài tập */}
        <Route path="/tv" element={<TvPage />} />
        <Route path="/tv/:id" element={<TvDetailPage />} />

        {/* Tìm kiếm */}
        <Route path="/search" element={<SearchPage />} />

        {/* Thể loại */}
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/genre/:type/:id" element={<GenreDetailPage />} />

        {/* Trình phát phim lẻ và phim bộ */}
        <Route path="/watch/movie/:id" element={<WatchPage />} />
        <Route path="/watch/tv/:id" element={<WatchPage />} />
        {/* Tuyến đường dự phòng hỗ trợ lấy cả type từ param */}
        <Route path="/watch/:type/:id" element={<WatchPage />} />

        {/* Watchlist cá nhân */}
        <Route path="/watchlist" element={<WatchlistPage />} />

        {/* Trang báo lỗi 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
