# CineFlow Backend API Proxy 🎬

CineFlow Backend là một API proxy được xây dựng bằng **Node.js, Express và TypeScript**, đóng vai trò là lớp trung gian (gateway) kết nối với hệ thống **The Movie Database (TMDB) API**.

Server này giải quyết các bài toán chính:
- **Bảo mật**: Ẩn giấu `TMDB_ACCESS_TOKEN` ở phía máy chủ, bảo vệ thông tin xác thực khỏi client-side.
- **Chuẩn hóa dữ liệu**: Lọc bỏ các trường thông tin thừa của TMDB, trả về định dạng JSON tinh gọn và đồng nhất cho Frontend CineFlow.
- **Tối ưu hóa hiệu năng & Tiết kiệm lượt gọi API**: Tích hợp lớp Cache lưu trữ trên bộ nhớ (In-memory Cache) sử dụng `node-cache` với các chính sách hết hạn (TTL) linh hoạt cho từng loại dữ liệu.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

- **Ngôn ngữ chính**: TypeScript
- **Framework**: Express.js
- **Yêu cầu HTTP**: Axios (với cấu hình Interceptor xử lý lỗi)
- **Kiểm duyệt dữ liệu đầu vào**: Zod
- **Quản lý Cache**: node-cache
- **Bảo mật & Logging**: Helmet, CORS, Morgan
- **Môi trường chạy**: dotenv, ts-node-dev (chạy live-reload lúc phát triển)

---

## 📂 Cấu trúc thư mục (Folder Structure)

```text
server/
├── src/
│   ├── config/          # Cấu hình biến môi trường và thiết lập TMDB Client
│   ├── controllers/     # Điều hướng luồng nghiệp vụ, kiểm duyệt tham số qua Zod
│   ├── middlewares/     # Middleware xử lý lỗi toàn cục, 404 Not Found, CORS, v.v.
│   ├── normalizers/     # Chuẩn hóa dữ liệu thô từ TMDB thành dạng chuẩn CineFlow
│   ├── routes/          # Định tuyến các endpoints phân chia theo danh mục
│   ├── services/        # Logic nghiệp vụ, gọi dữ liệu từ TMDB, áp dụng Cache
│   ├── types/           # Định nghĩa các kiểu dữ liệu TypeScript (raw & normalized)
│   ├── utils/           # Helper trợ giúp: tạo cache key, phản hồi API, async handler
│   ├── app.ts           # Khởi tạo và liên kết các middleware của ứng dụng Express
│   └── server.ts        # Entry point khởi chạy server HTTP tại cổng cấu hình
├── .env.example         # Tệp cấu hình mẫu các biến môi trường
├── package.json         # Danh sách thư viện phụ thuộc và scripts chạy dự án
└── tsconfig.json        # Cấu hình biên dịch TypeScript
```

---

## ⚙️ Biến môi trường (Environment Variables)

Sao chép tệp `.env.example` thành `.env` tại thư mục gốc `/server` và điền đầy đủ các thông tin:

| Tên biến môi trường | Giá trị mặc định | Mô tả chi tiết |
| :--- | :--- | :--- |
| `PORT` | `4000` | Cổng HTTP mà server Express sẽ lắng nghe |
| `NODE_ENV` | `development` | Chế độ chạy ứng dụng (`development` hoặc `production`) |
| `CLIENT_URL` | `http://localhost:5173` | URL Frontend được phép gọi API (dùng cho cấu hình CORS) |
| `TMDB_BASE_URL` | `https://api.themoviedb.org/3` | URL cơ sở để gọi API TMDB phiên bản v3 |
| `TMDB_IMAGE_BASE_URL` | `https://image.tmdb.org/t/p` | URL cơ sở để tạo link ảnh (poster, backdrop, profile) |
| `TMDB_ACCESS_TOKEN` | `your_token_here` | Mã xác thực TMDB Read Access Token (API v4 Auth) |
| `CACHE_TTL_SECONDS` | `21600` | Thời gian sống mặc định của bộ nhớ cache (mặc định 6 tiếng) |

---

## 🔑 Hướng dẫn lấy TMDB Read Access Token

Để lấy mã Token gọi API TMDB, bạn thực hiện theo các bước sau:
1. Đăng ký tài khoản trên trang chủ [The Movie Database (TMDB)](https://www.themoviedb.org/).
2. Sau khi đăng nhập, nhấn vào ảnh đại diện cá nhân ở góc trên bên phải và chọn **Settings** (Cài đặt).
3. Nhấp vào mục **API** ở thanh menu bên trái.
4. Nhấp vào nút **Create** (Tạo mới) để yêu cầu cấp một API Key mới (điền các thông tin mô tả dự án cá nhân nếu được yêu cầu).
5. Sau khi tạo thành công, cuộn xuống phần **API Read Access Token (v4 auth)**.
6. Sao chép chuỗi mã Token dài này và dán vào biến `TMDB_ACCESS_TOKEN` trong tệp `.env`.

> [!WARNING]
> Tuyệt đối không đẩy tệp `.env` chứa mã API Key này lên GitHub hoặc các nền tảng chia sẻ mã nguồn công khai để tránh bị đánh cắp tài khoản gọi API.

---

## 🚀 Hướng dẫn vận hành (Commands)

### Cài đặt thư viện
```bash
npm install
```

### Chạy ứng dụng trong chế độ Development (Live Reload)
```bash
npm run dev
```

### Kiểm tra kiểu dữ liệu TypeScript (Type check)
```bash
npm run typecheck
```

### Biên dịch mã nguồn sang Javascript (Build production)
```bash
npm run build
```

### Chạy mã nguồn đã biên dịch (Start production)
```bash
npm run start
```

---

## 📚 Danh sách API Endpoints & Chính sách Cache

Các API phản hồi luôn có cấu trúc thống nhất:
- **Thành công**: `{ success: true, message: "...", data: ..., meta: { cached: boolean, ... } }`
- **Thất bại**: `{ success: false, message: "...", error: { code: "...", details: ... } }`

### 1. Endpoint chung & Tiện ích
| HTTP Method | Route | Tham số Query | Mô tả | Chính sách Cache |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Không có | Kiểm tra trạng thái hoạt động của server | Không cache |
| `GET` | `/api/cache/stats` | Không có | Lấy thông tin thống kê số lượng cache đang lưu trữ | Không cache |

### 2. Endpoints Phim điện ảnh (Movies)
Tất cả các route chấp nhận tham số query: `page` (mặc định 1), `language` (`en-US` hoặc `vi-VN`), `region` (mặc định `US`).

| HTTP Method | Route | Mô tả | Chính sách Cache |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/movies/trending` | Danh sách phim xu hướng trong ngày | 6 tiếng (`21600`s) |
| `GET` | `/api/movies/popular` | Danh sách phim phổ biến | 12 tiếng (`43200`s) |
| `GET` | `/api/movies/now-playing`| Danh sách phim đang chiếu tại rạp | 6 tiếng (`21600`s) |
| `GET` | `/api/movies/top-rated` | Danh sách phim điểm cao nhất | 24 tiếng (`86400`s) |
| `GET` | `/api/movies/upcoming` | Danh sách phim sắp chiếu | 24 tiếng (`86400`s) |
| `GET` | `/api/movies/:id` | Chi tiết một bộ phim điện ảnh | 24 tiếng (`86400`s) |
| `GET` | `/api/movies/:id/videos` | Các video trailer liên quan | 24 tiếng (`86400`s) |
| `GET` | `/api/movies/:id/credits`| Danh sách diễn viên tham gia | 7 ngày (`604800`s) |
| `GET` | `/api/movies/:id/recommendations` | Danh sách phim gợi ý đề xuất | 12 tiếng (`43200`s) |
| `GET` | `/api/movies/:id/similar` | Danh sách phim tương tự | 12 tiếng (`43200`s) |

### 3. Endpoints Phim truyền hình (TV Series)
Tất cả các route chấp nhận tham số query: `page` (mặc định 1), `language` (`en-US` hoặc `vi-VN`), `region` (mặc định `US`).

| HTTP Method | Route | Mô tả | Chính sách Cache |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tv/trending` | Danh sách phim truyền hình xu hướng | 6 tiếng (`21600`s) |
| `GET` | `/api/tv/popular` | Danh sách phim truyền hình phổ biến | 12 tiếng (`43200`s) |
| `GET` | `/api/tv/top-rated` | Danh sách phim truyền hình đánh giá cao | 24 tiếng (`86400`s) |
| `GET` | `/api/tv/on-the-air` | Danh sách phim truyền hình đang chiếu | 6 tiếng (`21600`s) |
| `GET` | `/api/tv/:id` | Chi tiết phim truyền hình | 24 tiếng (`86400`s) |
| `GET` | `/api/tv/:id/videos` | Các video liên quan | 24 tiếng (`86400`s) |
| `GET` | `/api/tv/:id/credits` | Danh sách diễn viên | 7 ngày (`604800`s) |
| `GET` | `/api/tv/:id/recommendations` | Các phim truyền hình gợi ý đề xuất | 12 tiếng (`43200`s) |
| `GET` | `/api/tv/:id/similar` | Các phim truyền hình tương tự | 12 tiếng (`43200`s) |

### 4. Thể loại phim (Genres)
| HTTP Method | Route | Tham số Query | Mô tả | Chính sách Cache |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/genres/movie` | `language` | Danh sách thể loại phim điện ảnh | 7 ngày (`604800`s) |
| `GET` | `/api/genres/tv` | `language` | Danh sách thể loại phim truyền hình | 7 ngày (`604800`s) |

### 5. Công cụ tìm kiếm (Search)
| HTTP Method | Route | Tham số Query | Mô tả | Chính sách Cache |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/search/multi` | `query` (bắt buộc), `page`, `language` | Tìm kiếm đa mục tiêu (Movie, TV, Person) | 30 phút (`1800`s) |
| `GET` | `/api/search/movie` | `query` (bắt buộc), `page`, `language`, `region` | Tìm kiếm phim điện ảnh | 30 phút (`1800`s) |
| `GET` | `/api/search/tv` | `query` (bắt buộc), `page`, `language`, `region` | Tìm kiếm phim truyền hình | 30 phút (`1800`s) |

---

## 🔍 Danh sách URLs để kiểm thử thủ công (Testing Checklist)

Để thực hiện kiểm tra hoạt động của dự án, bạn khởi chạy server phát triển và click/gọi thử các link dưới đây:

- [✔️] Trạng thái dịch vụ: [http://localhost:4000/api/health](http://localhost:4000/api/health)
- [✔️] Phim điện ảnh thịnh hành: [http://localhost:4000/api/movies/trending](http://localhost:4000/api/movies/trending)
- [✔️] Phim điện ảnh phổ biến: [http://localhost:4000/api/movies/popular](http://localhost:4000/api/movies/popular)
- [✔️] Phim điện ảnh đang chiếu rạp: [http://localhost:4000/api/movies/now-playing](http://localhost:4000/api/movies/now-playing)
- [✔️] Phim điện ảnh đánh giá cao: [http://localhost:4000/api/movies/top-rated](http://localhost:4000/api/movies/top-rated)
- [✔️] Phim điện ảnh sắp chiếu rạp: [http://localhost:4000/api/movies/upcoming](http://localhost:4000/api/movies/upcoming)
- [✔️] Chi tiết phim điện ảnh (Fight Club): [http://localhost:4000/api/movies/550](http://localhost:4000/api/movies/550)
- [✔️] Danh sách Video phim (Fight Club): [http://localhost:4000/api/movies/550/videos](http://localhost:4000/api/movies/550/videos)
- [✔️] Dàn diễn viên phim (Fight Club): [http://localhost:4000/api/movies/550/credits](http://localhost:4000/api/movies/550/credits)
- [✔️] Tìm kiếm phim chiếu rạp ("batman"): [http://localhost:4000/api/search/movie?query=batman](http://localhost:4000/api/search/movie?query=batman)
- [✔️] Tìm kiếm đa mục tiêu ("avatar"): [http://localhost:4000/api/search/multi?query=avatar](http://localhost:4000/api/search/multi?query=avatar)
- [✔️] Danh mục thể loại phim chiếu rạp: [http://localhost:4000/api/genres/movie](http://localhost:4000/api/genres/movie)
- [✔️] Phim truyền hình phổ biến nhất: [http://localhost:4000/api/tv/popular](http://localhost:4000/api/tv/popular)

---

## 💾 Cơ chế Caching hoạt động thế nào?

Server sử dụng hàm helper `getOrSetCache(key, fetcher, ttlSeconds)`:
1. Từ URL của request và các tham số query truyền lên, server sẽ tạo ra một khóa cache duy nhất bằng cách sắp xếp các cặp khóa/trị để đảm bảo thứ tự tham số không làm thay đổi cache key.
2. Nếu cache đã tồn tại bản ghi tương ứng với khóa key, server sẽ phản hồi trực tiếp dữ liệu này ra client kèm cờ `"meta": { "cached": true }`.
3. Nếu chưa có, server sẽ kết nối tới TMDB API, nhận dữ liệu gốc, lưu vào cache cục bộ theo thời lượng TTL chỉ định, sau đó trả về client kèm cờ `"meta": { "cached": false }`.

---

## 📣 Ghi chú Bản quyền & Attribution

> ⚠️ **TMDB Attribution Note**
> "This product uses the TMDB API but is not endorsed or certified by TMDB."
> *(Sản phẩm này sử dụng dịch vụ API của TMDB nhưng không được chứng thực hoặc xác nhận bởi TMDB).*
