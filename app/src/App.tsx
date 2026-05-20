import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ScrollToTopOnNavigate } from "./components";

/**
 * Trang App chính - Thiết lập cấu hình React Router DOM để điều hướng toàn bộ ứng dụng CineFlow.
 */
function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnNavigate />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
