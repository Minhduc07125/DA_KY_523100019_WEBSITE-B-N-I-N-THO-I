// ======================================================
// PHONE STORE - MAIN JAVASCRIPT
// ======================================================



// ======================================================
// 1. LẤY CÁC PHẦN TỬ HTML
// ======================================================

// Tìm kiếm
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


// Danh sách sản phẩm
const productList = document.getElementById("product-list");

const productCards = Array.from(
    document.querySelectorAll(".product-card")
);


// Nút sản phẩm
const addToCartButtons = document.querySelectorAll(
    ".add-cart-button"
);

const detailButtons = document.querySelectorAll(
    ".detail-button"
);

const compareButtons = document.querySelectorAll(
    ".compare-button"
);


// Bộ lọc
const filterButtons = document.querySelectorAll(
    ".filter-button"
);


// Sắp xếp
const sortProducts = document.getElementById(
    "sort-products"
);



// ======================================================
// GIỎ HÀNG
// ======================================================

const cartButton = document.getElementById("cart-button");
const cartCount = document.getElementById("cart-count");

const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

const checkoutButton = document.getElementById(
    "checkout-button"
);



// ======================================================
// FORM ĐẶT HÀNG
// ======================================================

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
// MODAL CHI TIẾT SẢN PHẨM
// ======================================================

const productDetailModal = document.getElementById(
    "product-detail-modal"
);

const closeProductDetail = document.getElementById(
    "close-product-detail"
);

const detailImage = document.getElementById(
    "detail-image"
);

const detailBrand = document.getElementById(
    "detail-brand"
);

const detailName = document.getElementById(
    "detail-name"
);

const detailPrice = document.getElementById(
    "detail-price"
);

const detailStorage = document.getElementById(
    "detail-storage"
);

const detailRam = document.getElementById(
    "detail-ram"
);

const detailScreen = document.getElementById(
    "detail-screen"
);

const detailCamera = document.getElementById(
    "detail-camera"
);

const detailColor = document.getElementById(
    "detail-color"
);

const detailAddCart = document.getElementById(
    "detail-add-cart"
);



// ======================================================
// SO SÁNH SẢN PHẨM
// ======================================================

const compareBar = document.getElementById(
    "compare-bar"
);

const compareCount = document.getElementById(
    "compare-count"
);

const clearCompareButton = document.getElementById(
    "clear-compare"
);

const openCompareButton = document.getElementById(
    "open-compare"
);

const compareModal = document.getElementById(
    "compare-modal"
);

const closeCompare = document.getElementById(
    "close-compare"
);

const compareTableHead = document.getElementById(
    "compare-table-head"
);

const compareTableBody = document.getElementById(
    "compare-table-body"
);



// ======================================================
// 2. BIẾN DỮ LIỆU
// ======================================================

let cart = [];

let selectedBrand = "all";

// Sản phẩm đang mở trong modal chi tiết
let selectedProductCard = null;

// Danh sách sản phẩm đang được chọn để so sánh
let compareProducts = [];



// ======================================================
// 3. HÀM ĐỊNH DẠNG GIÁ
// ======================================================

function formatPrice(price) {

    return Number(price).toLocaleString("vi-VN") + "đ";

}



// ======================================================
// 4. TÌM KIẾM + LỌC THEO HÃNG
// ======================================================

function filterProducts() {

    const keyword = searchInput.value
        .toLowerCase()
        .trim();


    productCards.forEach((card) => {

        const productName = card
            .querySelector("h3")
            .textContent
            .toLowerCase();


        const productBrand =
            card.dataset.brand;


        const matchesSearch =
            productName.includes(keyword);


        const matchesBrand =
            selectedBrand === "all" ||
            productBrand === selectedBrand;


        if (matchesSearch && matchesBrand) {

            card.style.display = "flex";

        } else {

            card.style.display = "none";

        }

    });

}



// ======================================================
// 5. TÌM KIẾM
// ======================================================

searchButton.addEventListener(
    "click",
    filterProducts
);


// Nhấn Enter để tìm kiếm
searchInput.addEventListener(
    "keyup",
    (event) => {

        if (event.key === "Enter") {

            filterProducts();

        }

    }
);


// Tìm ngay khi nhập
searchInput.addEventListener(
    "input",
    filterProducts
);



// ======================================================
// 6. LỌC THEO HÃNG
// ======================================================

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        selectedBrand =
            button.dataset.brand;


        // Bỏ active tất cả
        filterButtons.forEach((btn) => {

            btn.classList.remove("active");

        });


        // Active nút hiện tại
        button.classList.add("active");


        filterProducts();

    });

});



// ======================================================
// 7. SẮP XẾP SẢN PHẨM
// ======================================================

sortProducts.addEventListener("change", () => {

    const sortValue =
        sortProducts.value;


    const sortedProducts =
        [...productCards];


    // Giá thấp -> cao
    if (sortValue === "price-asc") {

        sortedProducts.sort((a, b) => {

            return (
                Number(a.dataset.price) -
                Number(b.dataset.price)
            );

        });

    }


    // Giá cao -> thấp
    else if (sortValue === "price-desc") {

        sortedProducts.sort((a, b) => {

            return (
                Number(b.dataset.price) -
                Number(a.dataset.price)
            );

        });

    }


    // Trở lại thứ tự mặc định
    else {

        sortedProducts.sort((a, b) => {

            return (
                productCards.indexOf(a) -
                productCards.indexOf(b)
            );

        });

    }


    // Đưa lại vào HTML
    sortedProducts.forEach((product) => {

        productList.appendChild(product);

    });


    // Giữ nguyên bộ lọc
    filterProducts();

});



// ======================================================
// 8. LẤY THÔNG TIN SẢN PHẨM
// ======================================================

function getProductInfo(productCard) {

    const name = productCard
        .querySelector("h3")
        .textContent
        .trim();


    const image = productCard
        .querySelector(".product-image img")
        .getAttribute("src");


    const brand = productCard
        .querySelector(".product-brand")
        .textContent
        .trim();


    const price =
        Number(productCard.dataset.price);


    const storage =
        productCard.dataset.storage || "Đang cập nhật";


    const ram =
        productCard.dataset.ram || "Đang cập nhật";


    const screen =
        productCard.dataset.screen || "Đang cập nhật";


    const camera =
        productCard.dataset.camera || "Đang cập nhật";


    const color =
        productCard.dataset.color || "Đang cập nhật";


    return {

        name,
        image,
        brand,
        price,
        storage,
        ram,
        screen,
        camera,
        color

    };

}



// ======================================================
// 9. MỞ CHI TIẾT SẢN PHẨM
// ======================================================

detailButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard = button.closest(
            ".product-card"
        );


        selectedProductCard =
            productCard;


        const product =
            getProductInfo(productCard);


        // Đưa dữ liệu vào modal
        detailImage.src =
            product.image;

        detailImage.alt =
            product.name;

        detailBrand.textContent =
            product.brand;

        detailName.textContent =
            product.name;

        detailPrice.textContent =
            formatPrice(product.price);

        detailStorage.textContent =
            product.storage;

        detailRam.textContent =
            product.ram;

        detailScreen.textContent =
            product.screen;

        detailCamera.textContent =
            product.camera;

        detailColor.textContent =
            product.color;


        // Hiện modal
        productDetailModal.style.display =
            "block";


        // Không cho trang phía sau cuộn
        document.body.style.overflow =
            "hidden";

    });

});



// ======================================================
// 10. ĐÓNG CHI TIẾT SẢN PHẨM
// ======================================================

function closeDetailModal() {

    productDetailModal.style.display =
        "none";

    document.body.style.overflow =
        "";

}


closeProductDetail.addEventListener(
    "click",
    closeDetailModal
);



// ======================================================
// 11. HÀM THÊM SẢN PHẨM VÀO GIỎ
// ======================================================

function addProductToCart(productCard) {

    const product =
        getProductInfo(productCard);


    // Kiểm tra sản phẩm đã có chưa
    const existingProduct = cart.find(

        (item) =>
            item.name === product.name

    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    renderCart();

}



// ======================================================
// 12. THÊM GIỎ TỪ CARD
// ======================================================

addToCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard = button.closest(
            ".product-card"
        );


        addProductToCart(productCard);


        // Hiệu ứng nút
        const originalText =
            button.textContent;


        button.textContent =
            "✓ Đã thêm";


        button.disabled =
            true;


        setTimeout(() => {

            button.textContent =
                originalText;

            button.disabled =
                false;

        }, 700);

    });

});



// ======================================================
// 13. THÊM GIỎ TỪ MODAL CHI TIẾT
// ======================================================

detailAddCart.addEventListener("click", () => {

    if (!selectedProductCard) {

        return;

    }


    addProductToCart(
        selectedProductCard
    );


    const originalText =
        detailAddCart.textContent;


    detailAddCart.textContent =
        "✓ Đã thêm vào giỏ";


    detailAddCart.disabled =
        true;


    setTimeout(() => {

        detailAddCart.textContent =
            originalText;

        detailAddCart.disabled =
            false;

    }, 800);

});



// ======================================================
// 14. SO SÁNH - CẬP NHẬT THANH SO SÁNH
// ======================================================

function updateCompareBar() {

    const total =
        compareProducts.length;


    compareCount.textContent =
        `Đã chọn ${total}/3 sản phẩm`;


    // Chưa chọn sản phẩm nào -> ẩn thanh so sánh
    if (total === 0) {

        compareBar.classList.remove("show");

    } else {

        compareBar.classList.add("show");

    }


    // Phải chọn ít nhất 2 sản phẩm mới so sánh được
    openCompareButton.disabled =
        total < 2;


    // Cập nhật trạng thái nút trên từng card
    productCards.forEach((card) => {

        const button =
            card.querySelector(".compare-button");


        if (!button) {

            return;

        }


        const isSelected =
            compareProducts.includes(card);


        if (isSelected) {

            button.classList.add("selected");

            button.textContent =
                "✓ Đã chọn";

        } else {

            button.classList.remove("selected");

            button.textContent =
                "⚖️ So sánh";

        }

    });

}



// ======================================================
// 15. SO SÁNH - CHỌN SẢN PHẨM
// ======================================================

compareButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard =
            button.closest(".product-card");


        const selectedIndex =
            compareProducts.indexOf(productCard);


        // Nếu đã chọn -> bấm lại để bỏ chọn
        if (selectedIndex !== -1) {

            compareProducts.splice(
                selectedIndex,
                1
            );

            updateCompareBar();

            return;

        }


        // Tối đa 3 sản phẩm
        if (compareProducts.length >= 3) {

            alert(
                "Bạn chỉ có thể so sánh tối đa 3 sản phẩm!"
            );

            return;

        }


        // Thêm sản phẩm vào danh sách so sánh
        compareProducts.push(
            productCard
        );


        updateCompareBar();

    });

});



// ======================================================
// 16. SO SÁNH - XÓA TẤT CẢ
// ======================================================

clearCompareButton.addEventListener(
    "click",
    () => {

        compareProducts = [];

        updateCompareBar();

        closeCompareModal();

    }
);



// ======================================================
// 17. SO SÁNH - TẠO BẢNG
// ======================================================

function renderCompareTable() {

    const products =
        compareProducts.map(
            (card) => getProductInfo(card)
        );


    // ==================================================
    // PHẦN ĐẦU BẢNG
    // ==================================================

    compareTableHead.innerHTML = "";


    const headerRow =
        document.createElement("tr");


    const featureHeader =
        document.createElement("th");


    featureHeader.textContent =
        "Thông số";


    headerRow.appendChild(
        featureHeader
    );


    products.forEach((product) => {

        const productHeader =
            document.createElement("th");


        productHeader.innerHTML = `

            <div class="compare-product">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <strong>
                    ${product.name}
                </strong>

                <span>
                    ${product.brand}
                </span>

            </div>

        `;


        headerRow.appendChild(
            productHeader
        );

    });


    compareTableHead.appendChild(
        headerRow
    );



    // ==================================================
    // CÁC THÔNG SỐ CẦN SO SÁNH
    // ==================================================

    const specifications = [

        {
            label: "💰 Giá",
            key: "price"
        },

        {
            label: "💾 Bộ nhớ",
            key: "storage"
        },

        {
            label: "⚡ RAM",
            key: "ram"
        },

        {
            label: "📱 Màn hình",
            key: "screen"
        },

        {
            label: "📷 Camera",
            key: "camera"
        },

        {
            label: "🎨 Màu sắc",
            key: "color"
        }

    ];


    compareTableBody.innerHTML =
        "";


    specifications.forEach(
        (specification) => {

            const row =
                document.createElement("tr");


            const labelCell =
                document.createElement("th");


            labelCell.textContent =
                specification.label;


            row.appendChild(
                labelCell
            );


            products.forEach((product) => {

                const valueCell =
                    document.createElement("td");


                if (
                    specification.key ===
                    "price"
                ) {

                    valueCell.textContent =
                        formatPrice(
                            product.price
                        );

                } else {

                    valueCell.textContent =
                        product[
                            specification.key
                        ];

                }


                row.appendChild(
                    valueCell
                );

            });


            compareTableBody.appendChild(
                row
            );

        }
    );

}



// ======================================================
// 18. SO SÁNH - MỞ MODAL
// ======================================================

openCompareButton.addEventListener(
    "click",
    () => {

        if (compareProducts.length < 2) {

            alert(
                "Hãy chọn ít nhất 2 sản phẩm để so sánh!"
            );

            return;

        }


        renderCompareTable();


        // Đóng các modal khác nếu đang mở
        productDetailModal.style.display =
            "none";

        cartModal.style.display =
            "none";

        checkoutModal.style.display =
            "none";


        compareModal.style.display =
            "block";


        document.body.style.overflow =
            "hidden";

    }
);



// ======================================================
// 19. SO SÁNH - ĐÓNG MODAL
// ======================================================

function closeCompareModal() {

    compareModal.style.display =
        "none";

    document.body.style.overflow =
        "";

}


closeCompare.addEventListener(
    "click",
    closeCompareModal
);



// ======================================================
// 20. MỞ GIỎ HÀNG
// ======================================================

cartButton.addEventListener("click", () => {

    // Đóng modal chi tiết nếu đang mở
    productDetailModal.style.display =
        "none";


    // Đóng modal so sánh nếu đang mở
    compareModal.style.display =
        "none";


    cartModal.style.display =
        "block";


    document.body.style.overflow =
        "hidden";

});



// ======================================================
// 21. ĐÓNG GIỎ HÀNG
// ======================================================

function closeCartModal() {

    cartModal.style.display =
        "none";

    document.body.style.overflow =
        "";

}


closeCart.addEventListener(
    "click",
    closeCartModal
);



// ======================================================
// 22. HIỂN THỊ GIỎ HÀNG
// ======================================================

function renderCart() {

    cartItems.innerHTML = "";


    // Giỏ trống
    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div style="
                text-align: center;
                padding: 30px 10px;
                color: #777;
            ">

                <div style="
                    font-size: 45px;
                    margin-bottom: 8px;
                ">
                    🛒
                </div>

                <p>
                    Giỏ hàng đang trống.
                </p>

            </div>

        `;

    }


    // Có sản phẩm
    else {

        cart.forEach(
            (product, index) => {

                const item =
                    document.createElement("div");


                item.className =
                    "cart-item";


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

                        ${formatPrice(
                            product.price *
                            product.quantity
                        )}

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

            }
        );

    }


    // Tổng số lượng
    const totalQuantity =
        cart.reduce(
            (sum, product) => {

                return (
                    sum +
                    product.quantity
                );

            },
            0
        );


    cartCount.textContent =
        totalQuantity;


    // Tổng tiền
    const totalPrice =
        cart.reduce(
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
        formatPrice(totalPrice);

}



// ======================================================
// 23. TĂNG SỐ LƯỢNG
// ======================================================

function increaseQuantity(index) {

    if (!cart[index]) {

        return;

    }


    cart[index].quantity++;


    renderCart();

}



// ======================================================
// 24. GIẢM SỐ LƯỢNG
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
// 25. XÓA SẢN PHẨM
// ======================================================

function removeFromCart(index) {

    if (!cart[index]) {

        return;

    }


    cart.splice(index, 1);


    renderCart();

}



// ======================================================
// 26. ĐẶT HÀNG
// ======================================================

checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {

        alert(
            "Giỏ hàng đang trống.\n" +
            "Hãy thêm sản phẩm trước khi đặt hàng!"
        );

        return;

    }


    cartModal.style.display =
        "none";


    checkoutModal.style.display =
        "block";


    document.body.style.overflow =
        "hidden";

});



// ======================================================
// 27. ĐÓNG FORM ĐẶT HÀNG
// ======================================================

function closeCheckoutModal() {

    checkoutModal.style.display =
        "none";


    document.body.style.overflow =
        "";

}


closeCheckout.addEventListener(
    "click",
    closeCheckoutModal
);



// ======================================================
// 28. CLICK RA NGOÀI MODAL
// ======================================================

window.addEventListener(
    "click",
    (event) => {


        // Chi tiết
        if (
            event.target ===
            productDetailModal
        ) {

            closeDetailModal();

        }


        // So sánh
        if (
            event.target ===
            compareModal
        ) {

            closeCompareModal();

        }


        // Giỏ hàng
        if (
            event.target ===
            cartModal
        ) {

            closeCartModal();

        }


        // Checkout
        if (
            event.target ===
            checkoutModal
        ) {

            closeCheckoutModal();

        }

    }
);



// ======================================================
// 29. PHÍM ESC ĐÓNG MODAL
// ======================================================

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {

            return;

        }


        if (
            productDetailModal.style.display ===
            "block"
        ) {

            closeDetailModal();

        }


        if (
            compareModal.style.display ===
            "block"
        ) {

            closeCompareModal();

        }


        if (
            cartModal.style.display ===
            "block"
        ) {

            closeCartModal();

        }


        if (
            checkoutModal.style.display ===
            "block"
        ) {

            closeCheckoutModal();

        }

    }
);



// ======================================================
// 30. XÁC NHẬN ĐẶT HÀNG
// ======================================================

checkoutForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        // ==================================================
        // LẤY THÔNG TIN
        // ==================================================

        const customerName =
            document
                .getElementById(
                    "customer-name"
                )
                .value
                .trim();


        const customerPhone =
            document
                .getElementById(
                    "customer-phone"
                )
                .value
                .trim();


        const customerAddress =
            document
                .getElementById(
                    "customer-address"
                )
                .value
                .trim();


        const paymentMethod =
            document
                .getElementById(
                    "payment-method"
                )
                .value;


        // ==================================================
        // KIỂM TRA RỖNG
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
        // ==================================================

        const phoneRegex =
            /^0\d{9}$/;


        if (
            !phoneRegex.test(
                customerPhone
            )
        ) {

            alert(
                "Số điện thoại không hợp lệ!\n" +
                "Số điện thoại phải gồm 10 chữ số " +
                "và bắt đầu bằng số 0."
            );

            return;

        }


        // ==================================================
        // TÍNH TỔNG
        // ==================================================

        const totalPrice =
            cart.reduce(
                (sum, product) => {

                    return (
                        sum +
                        product.price *
                        product.quantity
                    );

                },
                0
            );


        const totalQuantity =
            cart.reduce(
                (sum, product) => {

                    return (
                        sum +
                        product.quantity
                    );

                },
                0
            );


        // ==================================================
        // PHƯƠNG THỨC THANH TOÁN
        // ==================================================

        let paymentText = "";


        if (
            paymentMethod === "cod"
        ) {

            paymentText =
                "Thanh toán khi nhận hàng (COD)";

        }


        else if (
            paymentMethod === "bank"
        ) {

            paymentText =
                "Chuyển khoản ngân hàng";

        }


        // ==================================================
        // THÔNG BÁO
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
            formatPrice(totalPrice) +

            "\n\nCảm ơn bạn đã mua hàng tại Phone Store!"

        );


        // ==================================================
        // RESET SAU KHI ĐẶT
        // ==================================================

        cart = [];


        renderCart();


        checkoutForm.reset();


        checkoutModal.style.display =
            "none";


        document.body.style.overflow =
            "";

    }
);



// ======================================================
// 31. KHỞI TẠO WEBSITE
// ======================================================

renderCart();

filterProducts();

updateCompareBar();