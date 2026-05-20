# CineFlow - Nền Tảng Khám Phá & Trải Nghiệm Điện Ảnh Đỉnh Cao

CineFlow là một ứng dụng web cao cấp dành cho những người yêu thích điện ảnh, cung cấp trải nghiệm duyệt phim, tra cứu thông tin chi tiết và phát trực tuyến các nội dung giới thiệu (trailer) chất lượng cao. Dự án được tích hợp trực tiếp với API TMDB (qua một tầng máy chủ Proxy bảo mật) mang lại dữ liệu thời gian thực chân thực nhất.

Giao diện của CineFlow được thiết kế theo phong cách tối tối giản, sang trọng (Cinematic Dark Mode), kết hợp các hiệu ứng kính mờ (Glassmorphism), dải màu chuyển tiếp tinh tế (Gradients) và các vi hoạt ảnh mượt mà từ Framer Motion để kiến tạo một trải nghiệm thị giác vô song.

---

## 🚀 Tính Năng Nổi Bật

- **Duyệt Phim Điện Ảnh & Truyền Hình**: Khám phá danh sách phim cập nhật liên tục theo các danh mục: Xu hướng (Trending), Phổ biến (Popular), Đang chiếu (Now Playing/On the Air), Sắp chiếu (Upcoming), và Đánh giá cao (Top Rated).
- **Trình Phát Trailer Giả Lập UHD 4K**: Xem trực tiếp trailer chính thức thông qua iframe YouTube được thiết kế khung ảnh kính mờ tinh tế, tích hợp sẵn cảnh báo bản quyền chuyên nghiệp và bộ chọn tập phim dài tập tự động.
- **Trang Khám Phá Chi Tiết**: Cung cấp thông tin đầy đủ về phim bao gồm điểm đánh giá IMDb, thời lượng, thể loại, tóm tắt nội dung cốt truyện, dàn diễn viên chính (Cast Grid) dạng chân dung tròn nghệ thuật, các video liên quan và lưới đề xuất phim tương tự.
- **Tìm Kiếm Đa Mục Tiêu Động**: Bộ tìm kiếm tức thời tích hợp debounce 400ms và form submit ngay lập tức, hỗ trợ phân loại bộ lọc (Tất cả, Phim Lẻ, Phim Bộ, Diễn Viên) kèm chỉ số đếm số lượng kết quả.
- **Khám Phá Theo Thể Loại**: Hệ thống phân loại thể loại tuyệt đẹp với các biểu tượng đặc thù, hiệu ứng hover phát sáng đặc trưng (Crimson glow cho Movies và Gold glow cho TV Series), cùng bộ lọc sắp xếp nâng cao (Phổ biến nhất, Đánh giá cao, Mới nhất, Cũ nhất).
- **Tủ Phim Cá Nhân (Watchlist) & Lịch Sử Đã Xem**: Quản lý lưu trữ cục bộ phía Client thông qua `localStorage` với các hook chuyên biệt. Lịch sử xem phim tự động ghi nhận khi truy cập trình phát và giới hạn tối đa 50 phần tử mới nhất.
- **Trung Tâm Dịch Vụ Khách Hàng**: Các trang hỗ trợ và dịch vụ đầy đủ thông tin (Help Center, FAQ tương tác động, Thiết bị tương thích, Điều khoản dịch vụ, Chính sách bảo mật, Liên hệ hợp tác, Blog phân tích điện ảnh).

---

## 🛠️ Công Nghệ Sử Dụng

### Frontend (`/app`)
- **Core Framework**: React 18 & TypeScript
- **Build Tool**: Vite (cấu hình tối ưu HMR)
- **Styling**: Tailwind CSS & Custom CSS (phong cách tối sang trọng Cinematic)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Định Tuyến**: React Router Dom v6

### Backend (`/server`)
- **Platform**: Node.js & Express
- **API Integration**: TMDB Proxy API (ẩn khóa bảo mật, tích hợp cache kết quả tạm thời để giảm thiểu số cuộc gọi API dư thừa và tăng tốc độ tải)

---

## 📂 Cấu Trúc Thư Mục Dự Án

```text
CineFlow/
├── app/                        # Mã nguồn Frontend (React + Vite + TS)
│   ├── src/
│   │   ├── components/         # Các component chung của ứng dụng
│   │   │   ├── ui/             # Bộ UI Primitives tái sử dụng (Card, Container, Button...)
│   │   │   └── ...             # Các component nghiệp vụ (Hero, MediaCard...)
│   │   ├── config/             # Cấu hình tĩnh (Genre Styles...)
│   │   ├── hooks/              # Custom React Hooks kết nối API TMDB và LocalStorage
│   │   ├── layouts/            # Bố cục giao diện chung (AppLayout, MarketingLayout)
│   │   ├── lib/                # Thư viện tiện ích (cn helper)
│   │   ├── pages/              # Các trang giao diện chính
│   │   │   └── support/        # Các trang tĩnh hỗ trợ dịch vụ
│   │   ├── routes/             # Cấu hình định tuyến (AppRoutes)
│   │   ├── sections/           # Các phần nội dung lớn trên trang chủ
│   │   └── utils/              # Các hàm bổ trợ xử lý dữ liệu và Cache
│   ├── index.html
│   ├── tailwind.config.js
│   └── tsconfig.json
├── server/                     # Mã nguồn Backend Proxy (Express.js)
│   ├── index.js                # Điểm khởi chạy Server Proxy
│   └── package.json
└── docs/                       # Tài liệu hướng dẫn lập trình & Quy chuẩn coding
```

---

## 🎨 Kiến Trúc UI Primitives (Hệ Thống Thành Phần Dùng Chung)

Để giữ mã nguồn sạch sẽ, tuân thủ nguyên lý Đơn nhiệm (Single Responsibility Principle) và duy trì sự nhất quán về thiết kế tối màu cao cấp, dự án áp dụng bộ UI Primitives dùng chung tại `src/components/ui/`:

1. **`Container`**: Quản lý độ rộng tối đa và căn lề đệm của nội dung trang đồng bộ.
2. **`SectionHeader`**: Quản lý phần tiêu đề đoạn, phụ đề và các liên kết/hành động phụ kèm theo.
3. **`Card`**: Lớp vỏ thẻ dạng kính mờ (Glassmorphic) với 3 biến thể `default`, `glass` và `gradient`.
4. **`Button`**: Các biến thể nút hành động (`primary`, `secondary`, `outline`, `ghost`, `danger`, `icon`) tích hợp Framer Motion click/hover.
5. **`Badge`**: Các nhãn đánh dấu phân loại phim, chất lượng phim (HD/4K) và nhãn IMDb.
6. **Shared States**: Các thành phần hiển thị trạng thái chuẩn hóa: `LoadingState` (quay vòng/khung xương), `ErrorState` (thông báo lỗi và thử lại), `EmptyState` (thông báo không tìm thấy kết quả), `Pagination` (bộ phân trang đồng bộ URL), và `Tabs` (bộ chuyển đổi nội dung linh hoạt).

*Lưu ý quan trọng*: Để duy trì tính sạch sẽ của mã nguồn, tất cả các tệp tin component/trang giao diện đều được kiểm soát nghiêm ngặt và không vượt quá **200 dòng code**. Các logic hoặc component con quá lớn đều được tách biệt rõ ràng.

---

## 💻 Hướng Dẫn Cài Đặt & Chạy Dự Án

### Yêu Cầu Hệ Thống
- Đã cài đặt **Node.js** (Phiên bản v18 trở lên được khuyến nghị)
- Đã cài đặt công cụ quản lý gói **npm** hoặc **yarn**

### Bước 1: Khởi động Backend Server
1. Di chuyển vào thư mục máy chủ:
   ```bash
   cd server
   ```
2. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```
3. Tạo tệp tin `.env` từ tệp tin mẫu và cấu hình khóa API TMDB của bạn:
   ```env
   PORT=4000
   TMDB_API_KEY=your_tmdb_api_key_here
   ```
4. Khởi chạy máy chủ ở chế độ phát triển:
   ```bash
   npm run dev
   ```
   *Máy chủ sẽ chạy tại địa chỉ:* `http://localhost:4000`

### Bước 2: Khởi động Frontend Client
1. Mở một cửa sổ dòng lệnh mới và di chuyển vào thư mục ứng dụng:
   ```bash
   cd app
   ```
2. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```
3. Khởi chạy dev server của Vite:
   ```bash
   npm run dev
   ```
   *Ứng dụng client sẽ khả dụng tại:* `http://localhost:5173` (hoặc cổng tiếp theo trống).

---

## 📦 Biên Dịch Cho Production

Để kiểm tra tính hợp lệ về kiểu tĩnh (TypeScript) và đóng gói mã nguồn tối ưu cho môi trường Production:

1. Di chuyển vào thư mục `/app`:
   ```bash
   cd app
   ```
2. Chạy lệnh xây dựng dự án:
   ```bash
   npm run build
   ```
   *Thư mục kết xuất `dist/` chứa mã nguồn đã tối ưu và thu nhỏ kích thước sẽ sẵn sàng để triển khai lên các dịch vụ như Vercel, Netlify hoặc Hosting tĩnh.*

---

## 📜 Quy Quy Chuẩn Lập Trình (Coding Standards)

Mọi lập trình viên đóng góp cho kho mã nguồn này bắt buộc phải đọc và tuân thủ tài liệu hướng dẫn quy chuẩn lập trình tại:
👉 **[Frontend Coding Standards](file:///d:/web/CineFlow/docs/frontend-coding-standards.md)**

Các nguyên tắc cốt lõi bao gồm:
- Giới hạn file tối đa 200 dòng code.
- Sử dụng TypeScript nghiêm ngặt, tuyệt đối cấm dùng `any`.
- Chú thích code giải thích nghiệp vụ bằng **Tiếng Việt**.
- Không gọi API TMDB trực tiếp từ Client, bắt buộc đi qua `/api` của Backend proxy.
- Áp dụng triệt để bộ UI Primitives và Shared States thay vì viết mã Tailwind trùng lặp.
