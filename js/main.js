
/* =========================================================
   PHONE MDZ - MAIN JAVASCRIPT
   WEBSITE BÁN ĐIỆN THOẠI VÀ PHỤ KIỆN
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // 1. LẤY CÁC PHẦN TỬ HTML
    // =====================================================

    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    const productList = document.getElementById("product-list");
    const productCards = Array.from(
        document.querySelectorAll(".product-card")
    );

    const filterButtons = document.querySelectorAll(".filter-button");
    const sortProducts = document.getElementById("sort-products");

    const cartButton = document.getElementById("cart-button");
    const cartCount = document.getElementById("cart-count");
    const cartModal = document.getElementById("cart-modal");
    const closeCart = document.getElementById("close-cart");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutButton = document.getElementById("checkout-button");

    const checkoutModal = document.getElementById("checkout-modal");
    const closeCheckout = document.getElementById("close-checkout");
    const checkoutForm = document.getElementById("checkout-form");

    const productDetailModal = document.getElementById(
        "product-detail-modal"
    );

    const closeProductDetail = document.getElementById(
        "close-product-detail"
    );

    const detailImage = document.getElementById("detail-image");
    const detailBrand = document.getElementById("detail-brand");
    const detailName = document.getElementById("detail-name");
    const detailPrice = document.getElementById("detail-price");
    const detailStorage = document.getElementById("detail-storage");
    const detailRam = document.getElementById("detail-ram");
    const detailScreen = document.getElementById("detail-screen");
    const detailCamera = document.getElementById("detail-camera");
    const detailColor = document.getElementById("detail-color");
    const detailAddCart = document.getElementById("detail-add-cart");

    const compareBar = document.getElementById("compare-bar");
    const compareCount = document.getElementById("compare-count");
    const clearCompareButton = document.getElementById("clear-compare");
    const openCompareButton = document.getElementById("open-compare");
    const compareModal = document.getElementById("compare-modal");
    const closeCompare = document.getElementById("close-compare");
    const compareTableHead = document.getElementById(
        "compare-table-head"
    );
    const compareTableBody = document.getElementById(
        "compare-table-body"
    );

    // =====================================================
    // 2. CẤU HÌNH VÀ BIẾN DỮ LIỆU
    // =====================================================

    const CART_KEY = "phone_mdz_cart_v1";
    const ORDERS_KEY = "phone_mdz_demo_orders_v1";
    const MAX_COMPARE = 3;

    let cart = [];
    let selectedBrand = "all";
    let selectedProductCard = null;
    let compareProducts = [];

    // =====================================================
    // 3. CÁC HÀM HỖ TRỢ
    // =====================================================

    function formatPrice(price) {
        return Number(price).toLocaleString("vi-VN") + "đ";
    }

    function safeReadStorage(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (error) {
            console.warn("Không đọc được dữ liệu:", error);
            return fallback;
        }
    }

    function saveCart() {
        try {
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
        } catch (error) {
            console.warn("Không lưu được giỏ hàng:", error);
        }
    }

    function loadCart() {
        const savedCart = safeReadStorage(CART_KEY, []);

        if (!Array.isArray(savedCart)) {
            return [];
        }

        // Chỉ lấy những sản phẩm có trong danh sách HTML hiện tại.
        const validProducts = productCards.map(getProductInfo);

        return savedCart
            .filter(item => {
                const product = validProducts.find(
                    p => p.name === item.name
                );

                return product &&
                    Number.isInteger(Number(item.quantity)) &&
                    Number(item.quantity) > 0;
            })
            .map(item => {
                const product = validProducts.find(
                    p => p.name === item.name
                );

                return {
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: Math.min(Number(item.quantity), 99)
                };
            });
    }

    function showMessage(message) {
        alert(message);
    }

    function getProductInfo(card) {
        return {
            name: card.querySelector("h3").textContent.trim(),
            image: card.querySelector(".product-image img")
                .getAttribute("src"),

            brand: card.querySelector(".product-brand")
                .textContent.trim(),

            price: Number(card.dataset.price),
            storage: card.dataset.storage || "Đang cập nhật",
            ram: card.dataset.ram || "Đang cập nhật",
            screen: card.dataset.screen || "Đang cập nhật",
            camera: card.dataset.camera || "Đang cập nhật",
            color: card.dataset.color || "Đang cập nhật"
        };
    }

    function calculateCartTotal() {
        return cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    }

    function calculateCartQuantity() {
        return cart.reduce(
            (sum, item) => sum + item.quantity,
            0
        );
    }

    function syncBodyScroll() {
        const modals = [
            productDetailModal,
            compareModal,
            cartModal,
            checkoutModal
        ];

        const hasOpenModal = modals.some(
            modal => modal && modal.style.display === "block"
        );

        document.body.style.overflow = hasOpenModal ? "hidden" : "";
    }

    function openModal(modal) {
        if (!modal) return;

        [
            productDetailModal,
            compareModal,
            cartModal,
            checkoutModal
        ].forEach(item => {
            if (item) item.style.display = "none";
        });

        modal.style.display = "block";
        syncBodyScroll();
    }

    function hideModal(modal) {
        if (!modal) return;

        modal.style.display = "none";
        syncBodyScroll();
    }

    function flashButton(button, message) {
        const originalText = button.textContent;

        button.textContent = message;
        button.disabled = true;

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 750);
    }

    // =====================================================
    // 4. TÌM KIẾM VÀ LỌC SẢN PHẨM
    // =====================================================

    function filterProducts() {
        const keyword = (searchInput?.value || "")
            .toLocaleLowerCase("vi-VN")
            .trim();

        let visibleCount = 0;

        productCards.forEach(card => {
            const product = getProductInfo(card);

            const matchSearch = product.name
                .toLocaleLowerCase("vi-VN")
                .includes(keyword);

            const matchBrand =
                selectedBrand === "all" ||
                card.dataset.brand === selectedBrand;

            const visible = matchSearch && matchBrand;

            card.style.display = visible ? "flex" : "none";

            if (visible) visibleCount++;
        });

        let emptyMessage = document.getElementById("empty-products");

        if (!emptyMessage) {
            emptyMessage = document.createElement("p");
            emptyMessage.id = "empty-products";
            emptyMessage.style.cssText = `
                display: none;
                text-align: center;
                padding: 25px;
                color: #777;
                background: white;
                border-radius: 10px;
                margin-top: 15px;
            `;

            productList.insertAdjacentElement(
                "afterend",
                emptyMessage
            );
        }

        emptyMessage.textContent =
            "Không tìm thấy sản phẩm phù hợp.";

        emptyMessage.style.display =
            visibleCount === 0 ? "block" : "none";
    }

    searchButton?.addEventListener("click", filterProducts);
    searchInput?.addEventListener("input", filterProducts);

    searchInput?.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            filterProducts();
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedBrand = button.dataset.brand || "all";

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");
            filterProducts();
        });
    });

    // =====================================================
    // 5. SẮP XẾP GIÁ
    // =====================================================

    sortProducts?.addEventListener("change", () => {
        const value = sortProducts.value;
        const sorted = [...productCards];

        if (value === "price-asc") {
            sorted.sort(
                (a, b) => Number(a.dataset.price) -
                    Number(b.dataset.price)
            );
        } else if (value === "price-desc") {
            sorted.sort(
                (a, b) => Number(b.dataset.price) -
                    Number(a.dataset.price)
            );
        } else {
            sorted.sort(
                (a, b) => productCards.indexOf(a) -
                    productCards.indexOf(b)
            );
        }

        sorted.forEach(card => productList.appendChild(card));
        filterProducts();
    });

    // =====================================================
    // 6. CHI TIẾT SẢN PHẨM
    // =====================================================

    function showProductDetail(card) {
        selectedProductCard = card;
        const product = getProductInfo(card);

        detailImage.src = product.image;
        detailImage.alt = product.name;

        detailBrand.textContent = product.brand;
        detailName.textContent = product.name;
        detailPrice.textContent = formatPrice(product.price);

        detailStorage.textContent = product.storage;
        detailRam.textContent = product.ram;
        detailScreen.textContent = product.screen;
        detailCamera.textContent = product.camera;
        detailColor.textContent = product.color;

        openModal(productDetailModal);
    }

    document.querySelectorAll(".detail-button").forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".product-card");
            if (card) showProductDetail(card);
        });
    });

    closeProductDetail?.addEventListener("click", () => {
        hideModal(productDetailModal);
    });

    // =====================================================
    // 7. THÊM VÀO GIỎ HÀNG
    // =====================================================

    function addProductToCart(card) {
        const product = getProductInfo(card);

        const existing = cart.find(
            item => item.name === product.name
        );

        if (existing) {
            if (existing.quantity >= 99) {
                showMessage("Số lượng tối đa là 99 sản phẩm.");
                return false;
            }

            existing.quantity++;
        } else {
            cart.push({
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        renderCart();
        return true;
    }

    document.querySelectorAll(".add-cart-button").forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".product-card");

            if (card && addProductToCart(card)) {
                flashButton(button, "✓ Đã thêm");
            }
        });
    });

    detailAddCart?.addEventListener("click", () => {
        if (!selectedProductCard) return;

        if (addProductToCart(selectedProductCard)) {
            flashButton(detailAddCart, "✓ Đã thêm vào giỏ");
        }
    });

    // =====================================================
    // 8. HIỂN THỊ GIỎ HÀNG
    // =====================================================

    function renderCart() {
        cartItems.innerHTML = "";

        if (cart.length === 0) {
            const empty = document.createElement("div");

            empty.style.cssText = `
                text-align: center;
                padding: 30px 10px;
                color: #777;
            `;

            empty.textContent = "🛒 Giỏ hàng đang trống.";

            cartItems.appendChild(empty);
        } else {
            cart.forEach((product, index) => {
                const item = document.createElement("div");
                item.className = "cart-item";

                const name = document.createElement("span");
                name.className = "cart-product-name";
                name.textContent = product.name;

                const controls = document.createElement("div");
                controls.className = "quantity-control";

                const minus = document.createElement("button");
                minus.type = "button";
                minus.textContent = "−";
                minus.title = "Giảm số lượng";
                minus.addEventListener("click", () => {
                    decreaseQuantity(index);
                });

                const quantity = document.createElement("span");
                quantity.textContent = product.quantity;

                const plus = document.createElement("button");
                plus.type = "button";
                plus.textContent = "+";
                plus.title = "Tăng số lượng";
                plus.addEventListener("click", () => {
                    increaseQuantity(index);
                });

                controls.append(minus, quantity, plus);

                const price = document.createElement("strong");
                price.textContent = formatPrice(
                    product.price * product.quantity
                );

                const remove = document.createElement("button");
                remove.type = "button";
                remove.className = "remove-button";
                remove.textContent = "Xóa";

                remove.addEventListener("click", () => {
                    removeFromCart(index);
                });

                item.append(name, controls, price, remove);
                cartItems.appendChild(item);
            });
        }

        cartCount.textContent = calculateCartQuantity();
        cartTotal.textContent = formatPrice(calculateCartTotal());

        if (checkoutButton) {
            checkoutButton.disabled = cart.length === 0;
        }

        saveCart();
    }

    function increaseQuantity(index) {
        if (!cart[index]) return;

        if (cart[index].quantity >= 99) {
            showMessage("Chỉ được chọn tối đa 99 sản phẩm.");
            return;
        }

        cart[index].quantity++;
        renderCart();
    }

    function decreaseQuantity(index) {
        if (!cart[index]) return;

        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }

        renderCart();
    }

    function removeFromCart(index) {
        if (!cart[index]) return;

        cart.splice(index, 1);
        renderCart();
    }

    // =====================================================
    // 9. MỞ GIỎ HÀNG
    // =====================================================

    cartButton?.addEventListener("click", () => {
        renderCart();
        openModal(cartModal);
    });

    closeCart?.addEventListener("click", () => {
        hideModal(cartModal);
    });

    // =====================================================
    // 10. CHỌN SẢN PHẨM SO SÁNH
    // =====================================================

    function updateCompareBar() {
        const total = compareProducts.length;

        compareCount.textContent =
            `Đã chọn ${total}/${MAX_COMPARE} sản phẩm`;

        compareBar.classList.toggle("show", total > 0);

        openCompareButton.disabled = total < 2;

        productCards.forEach(card => {
            const button = card.querySelector(".compare-button");

            if (!button) return;

            const selected = compareProducts.includes(card);

            button.classList.toggle("selected", selected);
            button.textContent = selected
                ? "✓ Đã chọn"
                : "⚖️ So sánh";
        });
    }

    document.querySelectorAll(".compare-button").forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".product-card");

            if (!card) return;

            const index = compareProducts.indexOf(card);

            if (index !== -1) {
                compareProducts.splice(index, 1);
                updateCompareBar();
                return;
            }

            if (compareProducts.length >= MAX_COMPARE) {
                showMessage(
                    `Chỉ có thể so sánh tối đa ${MAX_COMPARE} sản phẩm!`
                );
                return;
            }

            compareProducts.push(card);
            updateCompareBar();
        });
    });

    clearCompareButton?.addEventListener("click", () => {
        compareProducts = [];
        updateCompareBar();
        hideModal(compareModal);
    });

    // =====================================================
    // 11. TẠO BẢNG SO SÁNH
    // =====================================================

    function renderCompareTable() {
        const products = compareProducts.map(getProductInfo);

        compareTableHead.innerHTML = "";
        compareTableBody.innerHTML = "";

        const headerRow = document.createElement("tr");

        const featureHeader = document.createElement("th");
        featureHeader.textContent = "Thông số";
        headerRow.appendChild(featureHeader);

        products.forEach(product => {
            const th = document.createElement("th");

            const box = document.createElement("div");
            box.className = "compare-product";

            const img = document.createElement("img");
            img.src = product.image;
            img.alt = product.name;

            const strong = document.createElement("strong");
            strong.textContent = product.name;

            const brand = document.createElement("span");
            brand.textContent = product.brand;

            box.append(img, strong, brand);
            th.appendChild(box);
            headerRow.appendChild(th);
        });

        compareTableHead.appendChild(headerRow);

        const specifications = [
            { label: "💰 Giá", key: "price" },
            { label: "💾 Bộ nhớ", key: "storage" },
            { label: "⚡ RAM", key: "ram" },
            { label: "📱 Màn hình", key: "screen" },
            { label: "📷 Camera", key: "camera" },
            { label: "🎨 Màu sắc", key: "color" }
        ];

        specifications.forEach(spec => {
            const row = document.createElement("tr");

            const labelCell = document.createElement("th");
            labelCell.textContent = spec.label;
            row.appendChild(labelCell);

            products.forEach(product => {
                const td = document.createElement("td");

                td.textContent = spec.key === "price"
                    ? formatPrice(product.price)
                    : product[spec.key];

                row.appendChild(td);
            });

            compareTableBody.appendChild(row);
        });
    }

    openCompareButton?.addEventListener("click", () => {
        if (compareProducts.length < 2) {
            showMessage("Cần chọn ít nhất 2 sản phẩm.");
            return;
        }

        renderCompareTable();
        openModal(compareModal);
    });

    closeCompare?.addEventListener("click", () => {
        hideModal(compareModal);
    });

    // =====================================================
    // 12. THANH TOÁN
    // =====================================================

    checkoutButton?.addEventListener("click", () => {
        if (cart.length === 0) {
            showMessage("Giỏ hàng đang trống!");
            return;
        }

        openModal(checkoutModal);
    });

    closeCheckout?.addEventListener("click", () => {
        hideModal(checkoutModal);
    });

    // =====================================================
    // 13. TẠO MÃ ĐƠN HÀNG DEMO
    // =====================================================

    function createOrderCode() {
        const date = new Date();

        const timestamp = [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0"),
            String(date.getHours()).padStart(2, "0"),
            String(date.getMinutes()).padStart(2, "0"),
            String(date.getSeconds()).padStart(2, "0")
        ].join("");

        const random = Math.random()
            .toString(36)
            .slice(2, 8)
            .toUpperCase();

        return `MDZ${timestamp}${random}`;
    }

    // =====================================================
    // 14. XÁC NHẬN ĐẶT HÀNG DEMO
    // =====================================================

    checkoutForm?.addEventListener("submit", event => {
        event.preventDefault();

        if (cart.length === 0) {
            showMessage("Giỏ hàng đang trống!");
            return;
        }

        const customerName = document
            .getElementById("customer-name")
            .value.trim();

        const customerPhone = document
            .getElementById("customer-phone")
            .value.trim();

        const customerAddress = document
            .getElementById("customer-address")
            .value.trim();

        const paymentMethod = document
            .getElementById("payment-method")
            .value;

        if (
            !customerName ||
            !customerPhone ||
            !customerAddress ||
            !paymentMethod
        ) {
            showMessage("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (customerName.length < 2) {
            showMessage("Họ tên phải có ít nhất 2 ký tự.");
            return;
        }

        const phoneRegex = /^0\d{9}$/;

        if (!phoneRegex.test(customerPhone)) {
            showMessage(
                "Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0."
            );
            return;
        }

        const validPayments = ["cod", "bank"];

        if (!validPayments.includes(paymentMethod)) {
            showMessage("Phương thức thanh toán không hợp lệ.");
            return;
        }

        const paymentText = paymentMethod === "cod"
            ? "Thanh toán khi nhận hàng (COD)"
            : "Chuyển khoản ngân hàng (mô phỏng)";

        const order = {
            orderCode: createOrderCode(),
            customerName,
            customerPhone,
            customerAddress,
            paymentMethod,
            paymentText,
            items: cart.map(item => ({ ...item })),
            totalQuantity: calculateCartQuantity(),
            total: calculateCartTotal(),
            status: "Chờ xác nhận",
            createdAt: new Date().toISOString(),
            source: "html-demo"
        };

        // Lưu đơn hàng trên chính trình duyệt đang dùng.
        // Không gửi lên backend hoặc gửi email thật.

        const orders = safeReadStorage(ORDERS_KEY, []);

        const orderHistory = Array.isArray(orders) ? orders : [];
        orderHistory.push(order);

        try {
            localStorage.setItem(
                ORDERS_KEY,
                JSON.stringify(orderHistory)
            );
        } catch (error) {
            console.error("Không lưu được đơn hàng:", error);

            showMessage(
                "Không thể lưu đơn hàng trên trình duyệt. " +
                "Vui lòng kiểm tra bộ nhớ và thử lại."
            );

            return;
        }

        showMessage(
            "🎉 ĐẶT HÀNG DEMO THÀNH CÔNG!\n\n" +
            "Mã đơn: " + order.orderCode +
            "\nKhách hàng: " + customerName +
            "\nSố điện thoại: " + customerPhone +
            "\nĐịa chỉ: " + customerAddress +
            "\nThanh toán: " + paymentText +
            "\nSố lượng: " + order.totalQuantity +
            "\nTổng tiền: " + formatPrice(order.total) +
            "\nTrạng thái: " + order.status +
            "\n\nĐơn được lưu trên trình duyệt này, " +
            "chưa gửi đến hệ thống quản lý PHONE MDZ."
        );

        cart = [];
        renderCart();
        checkoutForm.reset();
        hideModal(checkoutModal);
    });

    // =====================================================
    // 15. ĐÓNG MODAL KHI CLICK RA NGOÀI
    // =====================================================

    [
        productDetailModal,
        compareModal,
        cartModal,
        checkoutModal
    ].forEach(modal => {
        if (!modal) return;

        modal.addEventListener("click", event => {
            if (event.target === modal) {
                hideModal(modal);
            }
        });
    });

    // =====================================================
    // 16. ĐÓNG MODAL BẰNG ESC
    // =====================================================

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;

        [
            productDetailModal,
            compareModal,
            cartModal,
            checkoutModal
        ].forEach(modal => {
            if (modal && modal.style.display === "block") {
                hideModal(modal);
            }
        });
    });

    // Hỗ trợ phím Enter khi nút đóng là thẻ span.
    [
        closeProductDetail,
        closeCompare,
        closeCart,
        closeCheckout
    ].forEach(button => {
        if (!button) return;

        button.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                button.click();
            }
        });
    });

    // =====================================================
    // 17. KHỞI TẠO WEBSITE
    // =====================================================

    cart = loadCart();

    renderCart();
    filterProducts();
    updateCompareBar();

    
    // =====================================================
    // ĐỒNG BỘ TÀI KHOẢN VỚI SQLITE QUA API
    // =====================================================

    async function loadCurrentUser() {
        const loginLink = document.getElementById("login-link");
        const registerLink = document.getElementById("register-link");
        const userInfo = document.getElementById("user-info");
        const userName = document.getElementById("user-name");
        const accountLink = document.getElementById("account-link");
        const logoutForm = document.getElementById("logout-form");

        // Chỉ chạy khi các phần tử tài khoản đã tồn tại.
        if (
            !loginLink || !registerLink || !userInfo ||
            !userName || !accountLink || !logoutForm
        ) {
            return;
        }

        try {
            const response = await fetch("/api/me", {
                credentials: "same-origin",
                cache: "no-store"
            });

            if (!response.ok) {
                throw new Error("Không lấy được thông tin tài khoản.");
            }

            const data = await response.json();

            if (data.loggedIn && data.user) {
                loginLink.style.display = "none";
                registerLink.style.display = "none";

                userInfo.style.display = "inline";
                userName.textContent = data.user.fullName;

                accountLink.style.display = "inline-block";
                logoutForm.style.display = "inline-block";
            } else {
                loginLink.style.display = "inline-block";
                registerLink.style.display = "inline-block";

                userInfo.style.display = "none";
                userName.textContent = "";
                accountLink.style.display = "none";
                logoutForm.style.display = "none";
            }
        } catch (error) {
            console.error("Không thể đồng bộ tài khoản:", error);
        }
    }

    loadCurrentUser();

    console.log(
        "PHONE MDZ: Trang bán điện thoại đã khởi tạo thành công."
    );

});
