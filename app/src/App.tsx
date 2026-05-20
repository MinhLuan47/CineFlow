import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

/**
 * Trang App chính - Thiết lập cấu hình React Router DOM để điều hướng toàn bộ ứng dụng CineFlow.
 */
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
