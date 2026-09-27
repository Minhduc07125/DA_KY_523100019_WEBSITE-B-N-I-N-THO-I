# THIẾT KẾ KIẾN TRÚC HỆ THỐNG

## WEBSITE BÁN ĐIỆN THOẠI VÀ PHỤ KIỆN

---

## 1. Thông tin chung

- **Tên đề tài:** Website bán điện thoại và phụ kiện
- **Sinh viên:** Nguyễn Minh Đức
- **MSSV:** 523100019
- **Lớp:** 5231000A
- **Giảng viên hướng dẫn:** Nguyễn Thị Mười Phương
- **Giai đoạn:** CP3 - Thiết kế hệ thống

---

# 2. Mục đích thiết kế kiến trúc

Tài liệu này mô tả kiến trúc tổng thể của Website bán điện thoại và phụ kiện.

Kiến trúc hệ thống được thiết kế nhằm:

- Phân chia rõ ràng giao diện, xử lý nghiệp vụ và dữ liệu.
- Hỗ trợ việc phát triển và bảo trì hệ thống.
- Giảm sự phụ thuộc giữa các thành phần.
- Hỗ trợ mở rộng chức năng trong tương lai.
- Đảm bảo dữ liệu được quản lý tập trung.
- Tạo cơ sở cho việc triển khai Back-end và cơ sở dữ liệu ở các giai đoạn tiếp theo.

---

# 3. Kiến trúc tổng thể

Hệ thống dự kiến sử dụng mô hình kiến trúc 3 lớp:

1. Presentation Layer - Lớp giao diện.
2. Business Logic Layer - Lớp xử lý nghiệp vụ.
3. Data Access Layer - Lớp truy cập dữ liệu.

Mô hình tổng quát:

```text
┌─────────────────────────────────────┐
│             NGƯỜI DÙNG              │
│                                     │
│  Khách hàng | Nhân viên | Admin     │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│        PRESENTATION LAYER           │
│                                     │
│     HTML / CSS / JavaScript / EJS   │
│                                     │
│  - Trang chủ                        │
│  - Danh sách sản phẩm               │
│  - Chi tiết sản phẩm                │
│  - Giỏ hàng                         │
│  - Đăng ký / Đăng nhập              │
│  - Quản trị                         │
└──────────────────┬──────────────────┘
                   │ HTTP Request
                   ▼
┌─────────────────────────────────────┐
│       BUSINESS LOGIC LAYER          │
│                                     │
│        Node.js / Express.js         │
│                                     │
│  - Xử lý tài khoản                  │
│  - Xử lý sản phẩm                   │
│  - Xử lý giỏ hàng                   │
│  - Xử lý đơn hàng                   │
│  - Xử lý tồn kho                    │
│  - Kiểm tra quyền truy cập          │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│          DATA ACCESS LAYER          │
│                                     │
│               SQLite                │
│                                     │
│  - Người dùng                       │
│  - Hãng sản xuất                    │
│  - Sản phẩm                         │
│  - Biến thể                         │
│  - Giỏ hàng                         │
│  - Đơn hàng                         │
│  - Tồn kho                          │
│  - Bảo hành                         │
└─────────────────────────────────────┘
```

---

# 4. Lớp giao diện - Presentation Layer

Presentation Layer là thành phần trực tiếp tương tác với người sử dụng.

Công nghệ dự kiến:

- HTML5
- CSS3
- JavaScript
- EJS
- Responsive Web Design

## 4.1. Giao diện khách hàng

Khách hàng có thể sử dụng các giao diện:

- Trang chủ.
- Danh sách sản phẩm.
- Danh sách sản phẩm theo hãng.
- Tìm kiếm sản phẩm.
- Lọc và sắp xếp sản phẩm.
- Chi tiết sản phẩm.
- So sánh sản phẩm.
- Giỏ hàng.
- Đặt hàng.
- Theo dõi đơn hàng.
- Đăng ký.
- Đăng nhập.

## 4.2. Giao diện nhân viên bán hàng

Nhân viên bán hàng dự kiến có các giao diện:

- Danh sách đơn hàng.
- Chi tiết đơn hàng.
- Cập nhật trạng thái đơn hàng.
- Theo dõi sản phẩm.
- Theo dõi tồn kho.

## 4.3. Giao diện quản trị viên

Quản trị viên dự kiến có các giao diện:

- Dashboard quản trị.
- Quản lý người dùng.
- Quản lý hãng sản xuất.
- Quản lý sản phẩm.
- Quản lý biến thể sản phẩm.
- Quản lý tồn kho.
- Quản lý đơn hàng.
- Quản lý bảo hành.

---

# 5. Lớp xử lý nghiệp vụ - Business Logic Layer

Business Logic Layer chịu trách nhiệm tiếp nhận yêu cầu từ giao diện và xử lý nghiệp vụ của hệ thống.

Công nghệ dự kiến:

- Node.js
- Express.js

Các nhóm xử lý chính bao gồm:

## 5.1. Xử lý tài khoản

- Đăng ký tài khoản.
- Đăng nhập.
- Kiểm tra thông tin đăng nhập.
- Kiểm tra dữ liệu đầu vào.
- Xác định vai trò người dùng.
- Phân quyền truy cập.

Các vai trò gồm:

- Khách hàng.
- Nhân viên bán hàng.
- Quản trị viên.

---

## 5.2. Xử lý sản phẩm

Bao gồm:

- Lấy danh sách sản phẩm.
- Tìm kiếm sản phẩm.
- Lọc sản phẩm.
- Sắp xếp sản phẩm.
- Xem chi tiết sản phẩm.
- So sánh sản phẩm.
- Thêm sản phẩm.
- Cập nhật sản phẩm.
- Xóa sản phẩm.

---

## 5.3. Xử lý giỏ hàng

Bao gồm:

- Thêm sản phẩm vào giỏ.
- Xóa sản phẩm khỏi giỏ.
- Thay đổi số lượng.
- Kiểm tra số lượng tồn kho.
- Tính tổng tiền.
- Chuẩn bị dữ liệu đặt hàng.

---

## 5.4. Xử lý đơn hàng

Bao gồm:

- Tạo đơn hàng.
- Tạo chi tiết đơn hàng.
- Kiểm tra thông tin khách hàng.
- Kiểm tra tồn kho.
- Tính tổng giá trị đơn hàng.
- Cập nhật trạng thái đơn hàng.
- Cho phép khách hàng theo dõi đơn hàng.

Trạng thái đơn hàng dự kiến:

1. Chờ xác nhận.
2. Đã xác nhận.
3. Đang chuẩn bị hàng.
4. Đang giao hàng.
5. Đã giao hàng.
6. Đã hủy.

---

## 5.5. Xử lý tồn kho

Bao gồm:

- Kiểm tra số lượng tồn kho.
- Cập nhật số lượng tồn.
- Không cho phép đặt vượt quá số lượng hiện có.
- Giảm tồn kho khi đơn hàng được xử lý theo quy tắc nghiệp vụ.
- Hỗ trợ nhân viên hoặc quản trị viên kiểm tra tồn kho.

---

# 6. Lớp truy cập dữ liệu - Data Access Layer

Data Access Layer chịu trách nhiệm giao tiếp giữa ứng dụng và cơ sở dữ liệu.

Hệ quản trị cơ sở dữ liệu dự kiến:

**SQLite**

Dữ liệu chính bao gồm:

- Người dùng.
- Hãng sản xuất.
- Sản phẩm.
- Biến thể sản phẩm.
- Giá bán.
- Tồn kho.
- Giỏ hàng.
- Chi tiết giỏ hàng.
- Đơn hàng.
- Chi tiết đơn hàng.
- Bảo hành.

Thiết kế chi tiết cơ sở dữ liệu và sơ đồ ERD được thực hiện trong Issue #8 của CP3.

---

# 7. Luồng xử lý Request/Response

Luồng xử lý cơ bản:

```text
Người dùng
    │
    ▼
Giao diện Website
    │
    │ HTTP Request
    ▼
Express Router
    │
    ▼
Controller
    │
    ▼
Xử lý nghiệp vụ
    │
    ▼
Truy cập SQLite
    │
    ▼
Kết quả dữ liệu
    │
    ▼
Controller
    │
    ▼
Response / EJS / JSON
    │
    ▼
Giao diện Website
    │
    ▼
Người dùng
```

Ví dụ khi khách hàng xem sản phẩm:

```text
Khách hàng
     │
     ▼
Yêu cầu xem sản phẩm
     │
     ▼
GET /products
     │
     ▼
Product Controller
     │
     ▼
Truy vấn dữ liệu sản phẩm
     │
     ▼
SQLite
     │
     ▼
Danh sách sản phẩm
     │
     ▼
Render giao diện
     │
     ▼
Khách hàng
```

---

# 8. Thiết kế theo mô hình MVC

Hệ thống dự kiến áp dụng mô hình MVC.

MVC gồm:

- Model
- View
- Controller

## 8.1. Model

Model chịu trách nhiệm làm việc với dữ liệu.

Ví dụ:

```text
User
Product
ProductVariant
Cart
Order
Inventory
Warranty
```

Model thực hiện các thao tác như:

- Truy vấn dữ liệu.
- Thêm dữ liệu.
- Cập nhật dữ liệu.
- Xóa dữ liệu.

---

## 8.2. View

View chịu trách nhiệm hiển thị giao diện cho người dùng.

Công nghệ dự kiến:

```text
EJS
HTML
CSS
JavaScript
```

Ví dụ:

```text
Trang chủ
Danh sách sản phẩm
Chi tiết sản phẩm
Giỏ hàng
Đăng nhập
Đăng ký
Quản trị
```

---

## 8.3. Controller

Controller nhận request từ người dùng, gọi Model để xử lý dữ liệu và trả kết quả về View.

Ví dụ:

```text
AuthController
ProductController
CartController
OrderController
AdminController
```

---

# 9. Thiết kế Router

Express Router được sử dụng để quản lý các đường dẫn của hệ thống.

Một số nhóm route dự kiến:

## 9.1. Trang chính

```text
GET /
```

Hiển thị trang chủ.

---

## 9.2. Sản phẩm

```text
GET /products
GET /products/:id
GET /products/search
```

---

## 9.3. Tài khoản

```text
GET  /login
POST /login

GET  /register
POST /register

POST /logout
```

---

## 9.4. Giỏ hàng

```text
GET    /cart
POST   /cart
PUT    /cart/:id
DELETE /cart/:id
```

---

## 9.5. Đơn hàng

```text
POST /orders
GET  /orders
GET  /orders/:id
```

---

## 9.6. Quản trị

```text
GET    /admin/products
POST   /admin/products
PUT    /admin/products/:id
DELETE /admin/products/:id

GET /admin/orders
PUT /admin/orders/:id/status
```

Các API cụ thể sẽ được thiết kế chi tiết trong Issue #9.

---

# 10. Thiết kế phân quyền

Hệ thống có 3 nhóm quyền chính.

| Chức năng | Khách hàng | Nhân viên | Quản trị viên |
|---|:---:|:---:|:---:|
| Xem sản phẩm | ✓ | ✓ | ✓ |
| Tìm kiếm sản phẩm | ✓ | ✓ | ✓ |
| So sánh sản phẩm | ✓ | ✓ | ✓ |
| Quản lý giỏ hàng | ✓ |  |  |
| Đặt hàng | ✓ |  |  |
| Theo dõi đơn hàng cá nhân | ✓ |  |  |
| Xem danh sách đơn hàng |  | ✓ | ✓ |
| Cập nhật trạng thái đơn |  | ✓ | ✓ |
| Quản lý sản phẩm |  | Theo quyền | ✓ |
| Quản lý tồn kho |  | Theo quyền | ✓ |
| Quản lý người dùng |  |  | ✓ |
| Quản lý hệ thống |  |  | ✓ |

---

# 11. Cấu trúc thư mục dự kiến

Khi triển khai Back-end, cấu trúc dự án dự kiến được mở rộng như sau:

```text
website_ban_dien_thoai/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── cartController.js
│   ├── orderController.js
│   └── adminController.js
│
├── models/
│   ├── userModel.js
│   ├── productModel.js
│   ├── cartModel.js
│   └── orderModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   └── adminRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── views/
│   ├── index.ejs
│   ├── products/
│   ├── cart/
│   ├── orders/
│   └── admin/
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── docs/
│   ├── phan-tich-yeu-cau.md
│   └── thiet-ke-kien-truc-he-thong.md
│
├── database/
│   └── store.db
│
├── app.js
├── package.json
└── README.md
```

Đây là cấu trúc **dự kiến** cho giai đoạn phát triển Back-end, chưa phải toàn bộ cấu trúc đã được triển khai ở thời điểm CP3.

---

# 12. Luồng đăng ký tài khoản

Luồng đăng ký dự kiến:

```text
Người dùng
    │
    ▼
Nhập thông tin
    │
    ▼
Kiểm tra dữ liệu
    │
    ├── Không hợp lệ → Thông báo lỗi
    │
    ▼
Kiểm tra Email/SĐT
    │
    ├── Đã tồn tại → Thông báo tài khoản tồn tại
    │
    ▼
Tạo tài khoản
    │
    ▼
Thông báo thành công
    │
    ▼
Chuyển đến đăng nhập
```

---

# 13. Luồng đăng nhập

```text
Người dùng
    │
    ▼
Nhập Email/SĐT + Mật khẩu
    │
    ▼
Kiểm tra thông tin
    │
    ├── Sai → Thông báo lỗi
    │
    ▼
Xác định vai trò
    │
    ├── Khách hàng → Trang khách hàng
    │
    ├── Nhân viên → Trang nhân viên
    │
    └── Admin → Trang quản trị
```

---

# 14. Luồng đặt hàng

```text
Khách hàng
    │
    ▼
Chọn sản phẩm
    │
    ▼
Thêm vào giỏ hàng
    │
    ▼
Kiểm tra giỏ hàng
    │
    ▼
Nhập thông tin nhận hàng
    │
    ▼
Chọn phương thức thanh toán
    │
    ▼
Kiểm tra tồn kho
    │
    ├── Không đủ → Thông báo
    │
    ▼
Tạo đơn hàng
    │
    ▼
Tạo chi tiết đơn hàng
    │
    ▼
Cập nhật dữ liệu liên quan
    │
    ▼
Thông báo đặt hàng thành công
```

---

# 15. Yêu cầu phi chức năng

Ngoài các chức năng nghiệp vụ, hệ thống cần đáp ứng một số yêu cầu phi chức năng.

## 15.1. Khả năng sử dụng

- Giao diện rõ ràng.
- Dễ thao tác.
- Các chức năng chính dễ tìm thấy.
- Responsive trên các kích thước màn hình phổ biến.

## 15.2. Hiệu năng

- Hạn chế truy vấn dữ liệu không cần thiết.
- Tối ưu kích thước hình ảnh sản phẩm.
- Phản hồi các thao tác thông thường trong thời gian hợp lý.

## 15.3. Bảo mật

- Kiểm tra dữ liệu đầu vào.
- Không lưu mật khẩu dưới dạng văn bản thuần khi triển khai hệ thống thực tế.
- Kiểm tra đăng nhập trước khi truy cập chức năng yêu cầu xác thực.
- Kiểm tra quyền trước khi thực hiện chức năng quản trị.
- Không cho phép người dùng thông thường truy cập chức năng Admin.

## 15.4. Khả năng bảo trì

- Phân chia mã nguồn theo chức năng.
- Sử dụng cấu trúc MVC.
- Đặt tên file và biến rõ ràng.
- Quản lý phiên bản bằng Git/GitHub.

---

# 16. Khả năng mở rộng

Kiến trúc được thiết kế để có thể bổ sung trong tương lai:

- Thanh toán trực tuyến.
- Mã giảm giá.
- Đánh giá sản phẩm.
- Danh sách yêu thích.
- Thông báo trạng thái đơn hàng.
- Báo cáo doanh thu.
- Thống kê sản phẩm bán chạy.
- Quản lý chương trình khuyến mãi.
- Tích hợp dịch vụ giao hàng.

Các chức năng này không thuộc phạm vi bắt buộc của phiên bản hiện tại và chỉ là hướng mở rộng.

---

# 17. Mối liên hệ với các tài liệu khác

Tài liệu thiết kế kiến trúc được xây dựng dựa trên kết quả phân tích tại CP2.

Tài liệu phân tích yêu cầu:

```text
docs/phan-tich-yeu-cau.md
```

Sơ đồ Use Case:

```text
images/use-case-tongquan.png
```

Sơ đồ luồng Đăng ký / Đăng nhập:

```text
images/luong-dang-ky-dang-nhap.png
```

Thiết kế cơ sở dữ liệu sẽ được trình bày trong Issue #8.

Thiết kế API và UI/UX sơ bộ sẽ được trình bày trong Issue #9.

---

# 18. Kết quả thiết kế kiến trúc

Sau quá trình thiết kế, hệ thống được xác định theo kiến trúc:

```text
Client
   ↓
Presentation Layer
   ↓
Express Router
   ↓
Controller
   ↓
Business Logic
   ↓
Model / Data Access
   ↓
SQLite Database
```

Kiến trúc MVC kết hợp phân chia theo lớp giúp hệ thống có cấu trúc rõ ràng và tạo nền tảng cho các giai đoạn triển khai tiếp theo.

---

# 19. Kết luận

Kiến trúc Website bán điện thoại và phụ kiện được thiết kế theo hướng phân chia rõ trách nhiệm giữa giao diện, xử lý nghiệp vụ và dữ liệu.

Hệ thống dự kiến sử dụng Node.js và Express.js cho Back-end, EJS/HTML/CSS/JavaScript cho giao diện và SQLite cho cơ sở dữ liệu.

Thiết kế này là cơ sở để tiếp tục thực hiện:

- Thiết kế sơ đồ cơ sở dữ liệu ERD.
- Thiết kế API.
- Thiết kế giao diện UI/UX.
- Triển khai Back-end.
- Kết nối cơ sở dữ liệu.
- Kiểm thử hệ thống.