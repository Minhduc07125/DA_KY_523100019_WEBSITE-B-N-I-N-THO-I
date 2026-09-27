// ======================================================
// PHONE STORE - MAIN JAVASCRIPT
// ======================================================


// ======================================================
// 1. LẤY CÁC PHẦN TỬ HTML
// ======================================================

// Tìm kiếm
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Sản phẩm
const productList = document.getElementById("product-list");

// Lấy thành mảng để có thể sắp xếp
const productCards = Array.from(
    document.querySelectorAll(".product-card")
);

// Nút thêm giỏ
const addToCartButtons = document.querySelectorAll(
    ".product-card > button"
);

// Bộ lọc hãng
const filterButtons = document.querySelectorAll(
    ".filter-button"
);

// Sắp xếp
const sortProducts = document.getElementById(
    "sort-products"
);

// Giỏ hàng
const cartButton = document.getElementById("cart-button");
const cartCount = document.getElementById("cart-count");

const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

const checkoutButton = document.getElementById(
    "checkout-button"
);

// Form đặt hàng
const checkoutModal = document.getElementById(
    "checkout-modal"
);

const closeCheckout = document.getElementById(
    "close-checkout"
);

const checkoutForm = document.getElementById(
    "checkout-form"
);


// ======================================================
// 2. DỮ LIỆU GIỎ HÀNG
// ======================================================

let cart = [];

// Hãng đang được chọn
let selectedBrand = "all";


// ======================================================
// 3. TÌM KIẾM + LỌC THEO HÃNG
// ======================================================

function filterProducts() {

    // Từ khóa người dùng nhập
    const keyword = searchInput.value
        .toLowerCase()
        .trim();


    productCards.forEach((card) => {

        // Tên sản phẩm
        const productName = card
            .querySelector("h3")
            .textContent
            .toLowerCase();


        // Hãng
        const productBrand = card.dataset.brand;


        // Kiểm tra tên
        const matchesSearch =
            productName.includes(keyword);


        // Kiểm tra hãng
        const matchesBrand =
            selectedBrand === "all" ||
            productBrand === selectedBrand;


        // Chỉ hiện khi thỏa cả hai điều kiện
        if (matchesSearch && matchesBrand) {

            card.style.display = "flex";

        } else {

            card.style.display = "none";

        }

    });

}


// ======================================================
// 4. NÚT TÌM KIẾM
// ======================================================

searchButton.addEventListener("click", filterProducts);


// Nhấn Enter để tìm
searchInput.addEventListener("keyup", (event) => {

    if (event.key === "Enter") {

        filterProducts();

    }

});


// Tìm ngay khi người dùng nhập chữ
searchInput.addEventListener("input", filterProducts);


// ======================================================
// 5. LỌC THEO HÃNG
// ======================================================

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Lấy hãng từ data-brand
        selectedBrand = button.dataset.brand;


        // Xóa active khỏi tất cả nút
        filterButtons.forEach((btn) => {

            btn.classList.remove("active");

        });


        // Thêm active cho nút vừa bấm
        button.classList.add("active");


        // Lọc sản phẩm
        filterProducts();

    });

});


// ======================================================
// 6. SẮP XẾP THEO GIÁ
// ======================================================

sortProducts.addEventListener("change", () => {

    const sortValue = sortProducts.value;


    // Tạo bản sao mảng sản phẩm
    const sortedProducts = [...productCards];


    // Giá thấp đến cao
    if (sortValue === "price-asc") {

        sortedProducts.sort((a, b) => {

            return (
                Number(a.dataset.price) -
                Number(b.dataset.price)
            );

        });

    }


    // Giá cao đến thấp
    else if (sortValue === "price-desc") {

        sortedProducts.sort((a, b) => {

            return (
                Number(b.dataset.price) -
                Number(a.dataset.price)
            );

        });

    }


    // Mặc định
    else {

        sortedProducts.sort((a, b) => {

            return (
                productCards.indexOf(a) -
                productCards.indexOf(b)
            );

        });

    }


    // Đưa lại sản phẩm vào HTML theo thứ tự mới
    sortedProducts.forEach((product) => {

        productList.appendChild(product);

    });


    // Giữ nguyên điều kiện lọc hiện tại
    filterProducts();

});


// ======================================================
// 7. MỞ GIỎ HÀNG
// ======================================================

cartButton.addEventListener("click", () => {

    cartModal.style.display = "block";

});


// ======================================================
// 8. ĐÓNG GIỎ HÀNG
// ======================================================

closeCart.addEventListener("click", () => {

    cartModal.style.display = "none";

});


// ======================================================
// 9. LẤY GIÁ SẢN PHẨM
// ======================================================

function getProductPrice(productCard) {

    // Ưu tiên lấy từ data-price
    const dataPrice = productCard.dataset.price;


    if (dataPrice) {

        return Number(dataPrice);

    }


    // Nếu không có data-price thì đọc từ HTML
    const priceText = productCard
        .querySelector(".price")
        .textContent;


    return Number(
        priceText.replace(/\D/g, "")
    );

}


// ======================================================
// 10. THÊM VÀO GIỎ HÀNG
// ======================================================

addToCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard = button.closest(
            ".product-card"
        );


        const productName = productCard
            .querySelector("h3")
            .textContent
            .trim();


        const productPrice =
            getProductPrice(productCard);


        // Tìm sản phẩm trong giỏ
        const existingProduct = cart.find(

            (product) =>
                product.name === productName

        );


        // Nếu đã tồn tại
        if (existingProduct) {

            existingProduct.quantity++;

        }

        // Nếu chưa có
        else {

            cart.push({

                name: productName,
                price: productPrice,
                quantity: 1

            });

        }


        // Cập nhật giỏ hàng
        renderCart();


        // Hiệu ứng nút
        const originalText = button.textContent;

        button.textContent = "✓ Đã thêm";

        button.disabled = true;


        setTimeout(() => {

            button.textContent = originalText;

            button.disabled = false;

        }, 700);

    });

});


// ======================================================
// 11. HIỂN THỊ GIỎ HÀNG
// ======================================================

function renderCart() {

    // Xóa nội dung cũ
    cartItems.innerHTML = "";


    // Nếu giỏ hàng trống
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="
                text-align:center;
                color:#777;
                padding:25px 0;
            ">
                🛒 Giỏ hàng đang trống.
            </p>
        `;

    }

    // Nếu có sản phẩm
    else {

        cart.forEach((product, index) => {

            const item =
                document.createElement("div");


            item.className = "cart-item";


            item.innerHTML = `

                <span class="cart-product-name">
                    ${product.name}
                </span>


                <div class="quantity-control">

                    <button
                        type="button"
                        onclick="decreaseQuantity(${index})"
                        title="Giảm số lượng"
                    >
                        −
                    </button>


                    <span>
                        ${product.quantity}
                    </span>


                    <button
                        type="button"
                        onclick="increaseQuantity(${index})"
                        title="Tăng số lượng"
                    >
                        +
                    </button>

                </div>


                <strong>

                    ${(
                        product.price *
                        product.quantity
                    ).toLocaleString("vi-VN")}đ

                </strong>


                <button
                    type="button"
                    class="remove-button"
                    onclick="removeFromCart(${index})"
                >
                    Xóa
                </button>

            `;


            cartItems.appendChild(item);

        });

    }


    // ==================================================
    // TỔNG SỐ LƯỢNG
    // ==================================================

    const totalQuantity = cart.reduce(

        (sum, product) => {

            return sum + product.quantity;

        },

        0

    );


    cartCount.textContent = totalQuantity;


    // ==================================================
    // TỔNG TIỀN
    // ==================================================

    const totalPrice = cart.reduce(

        (sum, product) => {

            return (
                sum +
                product.price *
                product.quantity
            );

        },

        0

    );


    cartTotal.textContent =
        totalPrice.toLocaleString("vi-VN") + "đ";

}


// ======================================================
// 12. TĂNG SỐ LƯỢNG
// ======================================================

function increaseQuantity(index) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity++;


    renderCart();

}


// ======================================================
// 13. GIẢM SỐ LƯỢNG
// ======================================================

function decreaseQuantity(index) {

    if (!cart[index]) {
        return;
    }


    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    renderCart();

}


// ======================================================
// 14. XÓA SẢN PHẨM
// ======================================================

function removeFromCart(index) {

    if (!cart[index]) {
        return;
    }


    cart.splice(index, 1);


    renderCart();

}


// ======================================================
// 15. BẤM ĐẶT HÀNG
// ======================================================

checkoutButton.addEventListener("click", () => {

    // Không cho đặt nếu giỏ trống
    if (cart.length === 0) {

        alert(
            "Giỏ hàng đang trống.\nHãy thêm sản phẩm trước khi đặt hàng!"
        );

        return;

    }


    // Đóng giỏ
    cartModal.style.display = "none";


    // Mở form
    checkoutModal.style.display = "block";

});


// ======================================================
// 16. ĐÓNG FORM ĐẶT HÀNG
// ======================================================

closeCheckout.addEventListener("click", () => {

    checkoutModal.style.display = "none";

});


// ======================================================
// 17. CLICK RA NGOÀI MODAL ĐỂ ĐÓNG
// ======================================================

window.addEventListener("click", (event) => {

    if (event.target === cartModal) {

        cartModal.style.display = "none";

    }


    if (event.target === checkoutModal) {

        checkoutModal.style.display = "none";

    }

});


// ======================================================
// 18. XÁC NHẬN ĐẶT HÀNG
// ======================================================

checkoutForm.addEventListener("submit", (event) => {

    // Không reload trang
    event.preventDefault();


    // Lấy thông tin khách hàng
    const customerName = document
        .getElementById("customer-name")
        .value
        .trim();


    const customerPhone = document
        .getElementById("customer-phone")
        .value
        .trim();


    const customerAddress = document
        .getElementById("customer-address")
        .value
        .trim();


    const paymentMethod = document
        .getElementById("payment-method")
        .value;


    // ==================================================
    // KIỂM TRA THÔNG TIN
    // ==================================================

    if (
        customerName === "" ||
        customerPhone === "" ||
        customerAddress === "" ||
        paymentMethod === ""
    ) {

        alert(
            "Vui lòng nhập đầy đủ thông tin đặt hàng!"
        );

        return;

    }


    // ==================================================
    // KIỂM TRA SỐ ĐIỆN THOẠI
    // 10 chữ số và bắt đầu bằng 0
    // ==================================================

    const phoneRegex = /^0\d{9}$/;


    if (!phoneRegex.test(customerPhone)) {

        alert(
            "Số điện thoại không hợp lệ!\n" +
            "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0."
        );

        return;

    }


    // ==================================================
    // TÍNH TỔNG ĐƠN HÀNG
    // ==================================================

    const totalPrice = cart.reduce(

        (sum, product) => {

            return (
                sum +
                product.price *
                product.quantity
            );

        },

        0

    );


    const totalQuantity = cart.reduce(

        (sum, product) => {

            return sum + product.quantity;

        },

        0

    );


    // ==================================================
    // TÊN PHƯƠNG THỨC THANH TOÁN
    // ==================================================

    let paymentText = "";


    if (paymentMethod === "cod") {

        paymentText =
            "Thanh toán khi nhận hàng (COD)";

    }


    else if (paymentMethod === "bank") {

        paymentText =
            "Chuyển khoản ngân hàng";

    }


    // ==================================================
    // THÔNG BÁO THÀNH CÔNG
    // ==================================================

    alert(

        "🎉 ĐẶT HÀNG THÀNH CÔNG!\n\n" +

        "Khách hàng: " +
        customerName +

        "\nSố điện thoại: " +
        customerPhone +

        "\nĐịa chỉ: " +
        customerAddress +

        "\nThanh toán: " +
        paymentText +

        "\nSố lượng sản phẩm: " +
        totalQuantity +

        "\nTổng tiền: " +
        totalPrice.toLocaleString("vi-VN") +
        "đ" +

        "\n\nCảm ơn bạn đã mua hàng tại Phone Store!"

    );


    // ==================================================
    // XÓA GIỎ HÀNG SAU KHI ĐẶT
    // ==================================================

    cart = [];


    // Cập nhật giỏ
    renderCart();


    // Reset form
    checkoutForm.reset();


    // Đóng modal
    checkoutModal.style.display = "none";

});


// ======================================================
// 19. KHỞI TẠO WEBSITE
// ======================================================

// Hiển thị giỏ hàng ban đầu
renderCart();

// Hiển thị tất cả sản phẩm
filterProducts();