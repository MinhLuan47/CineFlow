# Chuẩn Mực Lập Trình Frontend CineFlow (Frontend Coding Standards)

Tài liệu này định nghĩa các nguyên tắc và quy chuẩn viết mã nguồn (Coding Standards) phần Frontend của dự án **CineFlow**. Việc tuân thủ các quy tắc này là bắt buộc đối với mọi hoạt động cải tiến (refactor) hoặc thêm mới tính năng.

---

## 📌 Quy Tắc Thiết Kế Hệ Thống & Cấu Trúc Thành Phần

### 1. Giới hạn độ dài tệp tin thành phần (Component File Size Limit)
* Một tệp component hoặc page chỉ nên dài **tối đa 200 dòng** trong điều kiện thực tế.
* Khi tệp tin bắt đầu tiệm cận hoặc vượt quá 200 dòng, lập trình viên cần chủ động tách nhỏ thành các thành phần con dựa trên tính năng hoặc trách nhiệm cụ thể.

### 2. Vai trò của các tệp trang (Page Files Responsibility)
* Các tệp tin nằm trong `src/pages` chỉ làm nhiệm vụ **tổ hợp (composition)** các section/components và xử lý các vấn đề ở cấp độ route (như lấy tham số URL, khởi tạo API hook, quản lý trạng thái page-level).
* Tránh viết trực tiếp các khối giao diện UI lớn hoặc logic xử lý nghiệp vụ sâu bên trong tệp page.

### 3. Phân rã giao diện lớn (Deconstruct Large UI Blocks)
* Các khối giao diện phức tạp phải được chia nhỏ theo **trách nhiệm cụ thể (Single Responsibility Principle)**.
* Ví dụ:
  * Trình phát video (`VideoPlayer.tsx`) tách biệt bộ nút điều khiển (`PlayerControls.tsx`).
  * Trang xem phim (`WatchPage.tsx`) tách biệt danh sách tập (`WatchEpisodeSelector.tsx`) và danh sách đề xuất (`RelatedMediaSidebar.tsx`).

### 4. Vị trí phân bổ Component
* **Shared UI Primitives (Component dùng chung cấp thấp)**: Đặt tại `src/components/ui/` (ví dụ: `Button`, `Badge`, `SkeletonLoader`). Đây là các component không chứa logic nghiệp vụ đặc thù của dự án và có khả năng tái sử dụng tuyệt đối.
* **Domain-specific Components (Component đặc thù nghiệp vụ)**: Đặt tại `src/features/` hoặc `src/components/{movie,tv,media,genre}/` (ví dụ: `MovieCard`, `GlobalSearch`, `WatchMediaInfo`).

---

## 🔌 Xử Lý Dữ Liệu & API

### 5. Quản lý Hooks
* Toàn bộ custom hooks quản lý trạng thái, phản ứng giao diện, hoặc gọi dữ liệu phải được lưu trữ tập trung tại `src/hooks/`.
* Không khai báo custom hooks trực tiếp bên trong file component của page trừ khi cực kỳ đặc thù.

### 6. Tách biệt tầng API (API Separation)
* Các cuộc gọi mạng (network requests) chỉ được phép thực hiện bên trong thư mục `src/services/` và sau đó được bọc lại bằng các hooks tại `src/hooks/`.
* Components chỉ tương tác với dữ liệu thông qua các hooks này, không được trực tiếp gọi API bằng `fetch` hay `axios`.

### 7. Cấm gọi trực tiếp TMDB từ Frontend
* **Không được phép** thực hiện các cuộc gọi API trực tiếp tới máy chủ TMDB (`api.themoviedb.org`) từ mã nguồn Frontend.
* Tất cả các truy vấn dữ liệu phim bắt buộc phải đi qua **CineFlow Backend Proxy API** (ví dụ: `/api/movies/popular` hoặc `/api/tv/:id`) để đảm bảo bảo mật API Key, tối ưu hiệu năng và kiểm soát dữ liệu đầu ra.

---

## 🛡️ Quy Chuẩn TypeScript & Code Quality

### 8. Hạn chế tối đa kiểu dữ liệu `any`
* Không sử dụng `any` trừ khi đó là trường hợp cực kỳ bất khả kháng (ví dụ: dữ liệu động từ thư viện bên ngoài không có định nghĩa kiểu).
* Luôn khai báo interface/type rõ ràng cho tất cả các đối tượng dữ liệu.

### 9. Khai báo tường minh TypeScript Props
* Mọi component nhận đầu vào đều phải định nghĩa `Props` rõ ràng thông qua `interface` hoặc `type`.
* Khuyến khích sử dụng kiểu `React.FC<Props>` để đảm bảo tính nhất quán của kiểu trả về và cấu trúc React Component.

### 10. Tránh ô nhiễm thành phần (Component Pollution)
* Không lạm dụng việc tách nhỏ component quá mức (ví dụ: không tạo component riêng biệt chỉ để bọc một thẻ `div` hoặc một đoạn text ngắn không có tính tái sử dụng và không chứa logic phức tạp).
* Việc phân tách chỉ thực hiện khi file tiệm cận giới hạn độ dài hoặc thành phần đó có khả năng tái sử dụng.

---

## 📝 Chú Thích & Quy Trình Phát Triển

### 11. Quy chuẩn viết Chú thích (Comments)
* Các đoạn logic nghiệp vụ phức tạp, thuật toán hoặc giải pháp thay thế tạm thời (workarounds) cần được ghi chú rõ ràng.
* **Ngôn ngữ chú thích bắt buộc là Tiếng Việt** để toàn bộ đội ngũ lập trình viên trong dự án dễ dàng tiếp cận và nắm bắt nhanh chóng.

### 12. Bảo toàn giao diện người dùng (Zero Visual Changes on Refactor)
* Trong suốt quá trình cấu trúc lại mã nguồn (refactoring), **tuyệt đối không được thay đổi giao diện (UI) hoặc trải nghiệm người dùng (UX)**.
* Kết quả sau khi refactor phải hiển thị và hoạt động giống hệt 100% so với phiên bản trước đó.

---

## 🚀 Quy Trình Xác Minh & Đóng Gói (Build & Deploy Verification)

1. **Kiểm tra TypeScript**: Chạy `tsc -b` để xác minh tính đúng đắn của toàn bộ khai báo kiểu.
2. **Build Test**: Chạy `npm run build` để kiểm tra quy trình đóng gói của Vite và Rollup.
3. **Commit & Push**: Commit từng nhóm tính năng sau khi hoàn thành. Thông điệp commit bắt buộc phải sử dụng **Tiếng Việt có dấu** để ghi nhận rõ ràng tiến độ.
