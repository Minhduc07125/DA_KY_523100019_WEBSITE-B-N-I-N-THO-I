# PHÂN TÍCH YÊU CẦU NGHIỆP VỤ, DỮ LIỆU VÀ RÀNG BUỘC HỆ THỐNG

## 1. Giới thiệu

### 1.1. Tên đề tài

**Website bán điện thoại và phụ kiện**

### 1.2. Mục tiêu hệ thống

Xây dựng Website bán điện thoại và phụ kiện nhằm hỗ trợ khách hàng tìm kiếm, xem thông tin, so sánh và đặt mua sản phẩm trực tuyến.

Hệ thống đồng thời hỗ trợ nhân viên bán hàng và quản trị viên trong việc quản lý sản phẩm, tồn kho, đơn hàng và người dùng.

---

## 2. Đối tượng sử dụng

Hệ thống gồm ba nhóm người dùng chính:

### 2.1. Khách hàng

Khách hàng có thể:

- Đăng ký tài khoản.
- Đăng nhập hệ thống.
- Xem danh sách sản phẩm.
- Tìm kiếm sản phẩm.
- Lọc sản phẩm theo hãng.
- Sắp xếp sản phẩm theo giá.
- Xem chi tiết sản phẩm.
- So sánh các sản phẩm.
- Thêm sản phẩm vào giỏ hàng.
- Cập nhật số lượng sản phẩm trong giỏ hàng.
- Xóa sản phẩm khỏi giỏ hàng.
- Đặt hàng.
- Lựa chọn phương thức thanh toán.
- Theo dõi trạng thái đơn hàng.

### 2.2. Nhân viên bán hàng

Nhân viên bán hàng có thể:

- Đăng nhập hệ thống.
- Xem danh sách đơn hàng.
- Xem chi tiết đơn hàng.
- Xác nhận đơn hàng.
- Cập nhật trạng thái đơn hàng.
- Quản lý thông tin sản phẩm theo quyền được cấp.
- Kiểm tra số lượng tồn kho.

### 2.3. Quản trị viên

Quản trị viên có quyền quản lý toàn bộ hệ thống:

- Quản lý người dùng.
- Quản lý sản phẩm.
- Quản lý hãng sản xuất.
- Quản lý biến thể sản phẩm.
- Quản lý giá bán.
- Quản lý tồn kho.
- Quản lý đơn hàng.
- Theo dõi hoạt động của hệ thống.

---

# 3. Phân tích yêu cầu nghiệp vụ

## 3.1. Quản lý tài khoản

Người dùng có thể đăng ký tài khoản bằng các thông tin:

- Họ và tên.
- Email.
- Số điện thoại.
- Mật khẩu.
- Xác nhận mật khẩu.

Hệ thống phải kiểm tra dữ liệu hợp lệ trước khi tạo tài khoản.

Email hoặc số điện thoại không được trùng với tài khoản đã tồn tại trong hệ thống.

Khi đăng nhập, hệ thống kiểm tra thông tin tài khoản và xác định quyền truy cập của người dùng.

---

## 3.2. Xem và tìm kiếm sản phẩm

Khách hàng có thể xem danh sách điện thoại và phụ kiện hiện có trên Website.

Hệ thống hỗ trợ:

- Tìm kiếm sản phẩm theo tên.
- Lọc sản phẩm theo hãng.
- Sắp xếp theo giá tăng dần.
- Sắp xếp theo giá giảm dần.

Ví dụ các hãng sản phẩm:

- Apple.
- Samsung.
- Xiaomi.

---

## 3.3. Xem chi tiết sản phẩm

Khách hàng có thể xem thông tin chi tiết của sản phẩm bao gồm:

- Tên sản phẩm.
- Hãng sản xuất.
- Giá bán.
- Bộ nhớ.
- RAM.
- Kích thước màn hình.
- Camera.
- Màu sắc.
- Hình ảnh sản phẩm.
- Tình trạng sản phẩm.

---

## 3.4. So sánh sản phẩm

Khách hàng có thể lựa chọn các sản phẩm để thực hiện so sánh.

Bảng so sánh hiển thị các thông tin như:

- Giá.
- Bộ nhớ.
- RAM.
- Màn hình.
- Camera.
- Màu sắc.

Chức năng này giúp khách hàng dễ dàng nhận biết sự khác nhau giữa các sản phẩm.

---

## 3.5. Quản lý giỏ hàng

Khách hàng có thể thêm sản phẩm vào giỏ hàng.

Trong giỏ hàng, khách hàng có thể:

- Xem danh sách sản phẩm.
- Thay đổi số lượng.
- Xóa sản phẩm.
- Xem tổng số lượng sản phẩm.
- Xem tổng tiền đơn hàng.

Số lượng sản phẩm đặt mua không được vượt quá số lượng tồn kho.

---

## 3.6. Đặt hàng

Sau khi kiểm tra giỏ hàng, khách hàng có thể tiến hành đặt hàng.

Thông tin đặt hàng gồm:

- Họ và tên khách hàng.
- Số điện thoại.
- Địa chỉ nhận hàng.
- Danh sách sản phẩm.
- Số lượng.
- Tổng tiền.
- Phương thức thanh toán.

Các phương thức thanh toán dự kiến:

- Thanh toán khi nhận hàng (COD).
- Chuyển khoản ngân hàng.

Sau khi đặt hàng thành công, hệ thống tạo đơn hàng và lưu thông tin đơn hàng.

---

## 3.7. Theo dõi đơn hàng

Đơn hàng phải có trạng thái xử lý rõ ràng.

Các trạng thái dự kiến:

1. Chờ xác nhận.
2. Đã xác nhận.
3. Đang chuẩn bị hàng.
4. Đang giao hàng.
5. Đã giao hàng.
6. Đã hủy.

Khách hàng có thể theo dõi trạng thái đơn hàng.

Nhân viên bán hàng hoặc quản trị viên có quyền cập nhật trạng thái đơn hàng.

---

## 3.8. Quản lý sản phẩm

Nhân viên hoặc quản trị viên có quyền phù hợp có thể:

- Thêm sản phẩm.
- Sửa thông tin sản phẩm.
- Xóa sản phẩm.
- Cập nhật giá.
- Cập nhật thông số kỹ thuật.
- Quản lý hình ảnh sản phẩm.
- Quản lý biến thể sản phẩm.

---

## 3.9. Quản lý tồn kho

Hệ thống lưu số lượng tồn kho cho từng biến thể sản phẩm.

Người quản lý có thể:

- Cập nhật số lượng tồn kho.
- Kiểm tra số lượng còn lại.
- Theo dõi tình trạng sản phẩm.

Khi đơn hàng được xác nhận, số lượng tồn kho tương ứng phải được cập nhật.

---

# 4. Dữ liệu chính của hệ thống

## 4.1. Người dùng

Thông tin chính:

- Mã người dùng.
- Họ tên.
- Email.
- Số điện thoại.
- Mật khẩu.
- Vai trò.
- Trạng thái tài khoản.

Vai trò có thể gồm:

- Khách hàng.
- Nhân viên bán hàng.
- Quản trị viên.

---

## 4.2. Hãng sản xuất

Thông tin:

- Mã hãng.
- Tên hãng.
- Mô tả.

Ví dụ:

- Apple.
- Samsung.
- Xiaomi.

---

## 4.3. Sản phẩm

Thông tin:

- Mã sản phẩm.
- Tên sản phẩm.
- Mã hãng.
- Mô tả.
- Thông số kỹ thuật.
- Hình ảnh.
- Trạng thái.

---

## 4.4. Biến thể sản phẩm

Một sản phẩm có thể có nhiều biến thể khác nhau.

Thông tin biến thể:

- Mã biến thể.
- Mã sản phẩm.
- Màu sắc.
- Dung lượng bộ nhớ.
- RAM.
- Giá bán.
- Số lượng tồn kho.

Ví dụ một điện thoại có thể có:

- 128GB.
- 256GB.
- 512GB.

và nhiều màu sắc khác nhau.

---

## 4.5. Giá bán

Thông tin:

- Mã biến thể sản phẩm.
- Giá bán hiện tại.
- Giá khuyến mãi nếu có.

Giá bán phải lớn hơn hoặc bằng 0.

---

## 4.6. Tồn kho

Thông tin:

- Mã biến thể.
- Số lượng tồn.
- Thời gian cập nhật.

Số lượng tồn kho không được nhỏ hơn 0.

---

## 4.7. Giỏ hàng

Thông tin:

- Mã giỏ hàng.
- Mã khách hàng.
- Danh sách sản phẩm.
- Số lượng từng sản phẩm.
- Thành tiền.

---

## 4.8. Đơn hàng

Thông tin:

- Mã đơn hàng.
- Mã khách hàng.
- Ngày đặt hàng.
- Địa chỉ nhận hàng.
- Số điện thoại nhận hàng.
- Tổng tiền.
- Phương thức thanh toán.
- Trạng thái đơn hàng.

---

## 4.9. Chi tiết đơn hàng

Thông tin:

- Mã đơn hàng.
- Mã biến thể sản phẩm.
- Số lượng.
- Đơn giá.
- Thành tiền.

---

## 4.10. Bảo hành

Thông tin:

- Mã bảo hành.
- Mã đơn hàng.
- Mã sản phẩm.
- Ngày bắt đầu bảo hành.
- Ngày kết thúc bảo hành.
- Trạng thái bảo hành.

---

# 5. Quan hệ giữa các dữ liệu

Các quan hệ chính trong hệ thống gồm:

- Một **hãng sản xuất** có thể có nhiều **sản phẩm**.
- Một **sản phẩm** thuộc một **hãng sản xuất**.
- Một **sản phẩm** có thể có nhiều **biến thể sản phẩm**.
- Một **biến thể** có giá bán và số lượng tồn kho riêng.
- Một **khách hàng** có một giỏ hàng đang sử dụng.
- Một **khách hàng** có thể tạo nhiều **đơn hàng**.
- Một **đơn hàng** có thể chứa nhiều sản phẩm.
- Một **sản phẩm** có thể xuất hiện trong nhiều đơn hàng.
- Chi tiết đơn hàng dùng để thể hiện sản phẩm, số lượng và đơn giá tại thời điểm đặt hàng.

---

# 6. Ràng buộc nghiệp vụ

## 6.1. Ràng buộc sản phẩm

- Mỗi sản phẩm phải thuộc một hãng sản xuất.
- Tên sản phẩm không được để trống.
- Giá sản phẩm không được âm.
- Một sản phẩm có thể có nhiều màu sắc và dung lượng bộ nhớ.
- Mỗi biến thể có giá và số lượng tồn kho riêng.

---

## 6.2. Ràng buộc tồn kho

- Số lượng tồn kho không được nhỏ hơn 0.
- Không cho phép khách hàng đặt số lượng vượt quá tồn kho hiện tại.
- Khi đơn hàng được xác nhận, tồn kho phải được cập nhật tương ứng.

---

## 6.3. Ràng buộc người dùng

- Email phải đúng định dạng.
- Email không được trùng với tài khoản đã tồn tại.
- Số điện thoại phải hợp lệ.
- Người dùng phải nhập đúng thông tin đăng nhập.
- Người dùng chỉ được sử dụng chức năng phù hợp với quyền được cấp.

---

## 6.4. Ràng buộc giỏ hàng

- Số lượng sản phẩm trong giỏ hàng phải lớn hơn 0.
- Số lượng không được vượt quá tồn kho.
- Khi xóa hết sản phẩm, giỏ hàng trở về trạng thái trống.

---

## 6.5. Ràng buộc đơn hàng

- Đơn hàng phải có ít nhất một sản phẩm.
- Địa chỉ nhận hàng không được để trống.
- Số điện thoại nhận hàng không được để trống.
- Tổng tiền đơn hàng phải được tính từ các sản phẩm trong đơn hàng.
- Đơn hàng phải có trạng thái xử lý rõ ràng.
- Chỉ người có quyền mới được cập nhật trạng thái đơn hàng.

---

# 7. Yêu cầu phi chức năng

## 7.1. Giao diện

- Giao diện đơn giản, dễ sử dụng.
- Hiển thị tốt trên máy tính và thiết bị di động.
- Các chức năng chính phải dễ nhận biết.
- Thông tin sản phẩm phải được trình bày rõ ràng.

## 7.2. Hiệu năng

- Trang Web phải có thời gian phản hồi hợp lý.
- Tìm kiếm và lọc sản phẩm phải thực hiện nhanh.
- Hình ảnh sản phẩm cần được tối ưu để hạn chế thời gian tải trang.

## 7.3. Bảo mật

- Mật khẩu người dùng phải được bảo vệ khi hệ thống triển khai cơ sở dữ liệu và máy chủ.
- Người dùng chỉ được truy cập các chức năng đúng với vai trò được cấp.
- Các dữ liệu đầu vào cần được kiểm tra trước khi xử lý.

## 7.4. Khả năng mở rộng

Hệ thống cần có khả năng mở rộng thêm:

- Hãng điện thoại mới.
- Sản phẩm mới.
- Phụ kiện.
- Phương thức thanh toán.
- Chương trình khuyến mãi.
- Chức năng đánh giá sản phẩm.

---

# 8. Kết quả phân tích

Qua quá trình phân tích, hệ thống Website bán điện thoại và phụ kiện được xác định gồm ba nhóm tác nhân chính:

1. Khách hàng.
2. Nhân viên bán hàng.
3. Quản trị viên.

Các nghiệp vụ chính bao gồm:

- Đăng ký và đăng nhập.
- Xem, tìm kiếm, lọc và sắp xếp sản phẩm.
- Xem chi tiết sản phẩm.
- So sánh sản phẩm.
- Quản lý giỏ hàng.
- Đặt hàng.
- Theo dõi đơn hàng.
- Quản lý sản phẩm.
- Quản lý tồn kho.
- Quản lý đơn hàng.

Dữ liệu chính của hệ thống gồm người dùng, hãng sản xuất, sản phẩm, biến thể sản phẩm, giá bán, tồn kho, giỏ hàng, đơn hàng và bảo hành.

Các ràng buộc nghiệp vụ được xác định nhằm đảm bảo dữ liệu hợp lệ, kiểm soát số lượng tồn kho, trạng thái đơn hàng và quyền truy cập của từng loại người dùng.

---

# 9. Kết luận

Việc phân tích yêu cầu nghiệp vụ, dữ liệu và ràng buộc là cơ sở cho các bước thiết kế tiếp theo của Website bán điện thoại và phụ kiện.

Kết quả phân tích sẽ được sử dụng để xây dựng cơ sở dữ liệu, thiết kế giao diện, triển khai các chức năng nghiệp vụ và kiểm thử hệ thống trong các giai đoạn tiếp theo của đồ án.