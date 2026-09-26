// ==========================
// LẤY CÁC PHẦN TỬ HTML
// ==========================

const addToCartButtons = document.querySelectorAll(".product-card button");
const cartCount = document.getElementById("cart-count");

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const productCards = document.querySelectorAll(".product-card");

const cartButton = document.getElementById("cart-button");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");


// ==========================
// DỮ LIỆU GIỎ HÀNG
// ==========================

let cart = [];


// ==========================
// CHỨC NĂNG TÌM KIẾM
// ==========================

function searchProducts() {
    const keyword = searchInput.value.toLowerCase().trim();

    productCards.forEach((card) => {
        const productName = card
            .querySelector("h3")
            .textContent
            .toLowerCase();

        if (productName.includes(keyword)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}


// Bấm nút Tìm kiếm
searchButton.addEventListener("click", searchProducts);


// Nhấn Enter để tìm kiếm
searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchProducts();
    }
});


// ==========================
// MỞ / ĐÓNG GIỎ HÀNG
// ==========================

// Bấm "Giỏ hàng" để mở
cartButton.addEventListener("click", () => {
    cartModal.style.display = "block";
});


// Bấm dấu X để đóng
closeCart.addEventListener("click", () => {
    cartModal.style.display = "none";
});


// Bấm vùng tối bên ngoài để đóng
window.addEventListener("click", (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});


// ==========================
// LẤY GIÁ SẢN PHẨM
// ==========================

function getProductPrice(productCard) {
    const priceText = productCard.querySelector(".price").textContent;

    return Number(priceText.replace(/\D/g, ""));
}


// ==========================
// THÊM SẢN PHẨM VÀO GIỎ
// ==========================

addToCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard = button.closest(".product-card");

        const productName =
            productCard.querySelector("h3").textContent;

        const productPrice =
            getProductPrice(productCard);


        // Kiểm tra sản phẩm đã có trong giỏ chưa
        const existingProduct = cart.find(
            (product) => product.name === productName
        );


        // Nếu đã có → tăng số lượng
        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            // Nếu chưa có → thêm sản phẩm mới
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }


        renderCart();
    });
});


// ==========================
// HIỂN THỊ GIỎ HÀNG
// ==========================

function renderCart() {

    cartItems.innerHTML = "";


    // Nếu giỏ hàng trống
    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Giỏ hàng đang trống.</p>";

    } else {

        // Hiển thị từng sản phẩm
        cart.forEach((product, index) => {

            const item = document.createElement("div");

            item.innerHTML = `
                <div class="cart-item">

                    <span class="cart-product-name">
                        ${product.name}
                    </span>

                    <div class="quantity-control">

                        <button
                            onclick="decreaseQuantity(${index})">
                            −
                        </button>

                        <span>
                            ${product.quantity}
                        </span>

                        <button
                            onclick="increaseQuantity(${index})">
                            +
                        </button>

                    </div>

                    <strong>
                        ${(product.price * product.quantity)
                            .toLocaleString("vi-VN")}đ
                    </strong>

                    <button
                        class="remove-button"
                        onclick="removeFromCart(${index})">
                        Xóa
                    </button>

                </div>
            `;

            cartItems.appendChild(item);
        });
    }


    // ==========================
    // TÍNH TỔNG SỐ LƯỢNG
    // ==========================

    const totalQuantity = cart.reduce(
        (sum, product) => {
            return sum + product.quantity;
        },
        0
    );

    cartCount.textContent = totalQuantity;


    // ==========================
    // TÍNH TỔNG TIỀN
    // ==========================

    const total = cart.reduce(
        (sum, product) => {

            return sum +
                product.price * product.quantity;

        },
        0
    );


    cartTotal.textContent =
        total.toLocaleString("vi-VN") + "đ";
}


// ==========================
// TĂNG SỐ LƯỢNG
// ==========================

function increaseQuantity(index) {

    cart[index].quantity++;

    renderCart();
}


// ==========================
// GIẢM SỐ LƯỢNG
// ==========================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        // Nếu còn 1 mà bấm trừ
        // thì xóa sản phẩm khỏi giỏ
        cart.splice(index, 1);
    }

    renderCart();
}


// ==========================
// XÓA SẢN PHẨM
// ==========================

function removeFromCart(index) {

    cart.splice(index, 1);

    renderCart();
}


// ==========================
// HIỂN THỊ GIỎ BAN ĐẦU
// ==========================

renderCart();