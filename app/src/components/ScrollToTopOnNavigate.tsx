import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Component tự động cuộn màn hình lên đầu trang (0, 0) mỗi khi người dùng chuyển hướng route.
 * Rất hữu ích đối với ứng dụng SPA sử dụng React Router.
 */
export const ScrollToTopOnNavigate: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuộn lên đầu trang lập tức không dùng hiệu ứng mượt (instant) để tránh cảm giác trễ
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
