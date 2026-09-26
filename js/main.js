// Lấy tất cả nút "Thêm vào giỏ"
const addToCartButtons = document.querySelectorAll(".product-card button");

// Lấy số lượng trên Giỏ hàng
const cartCount = document.getElementById("cart-count");

// Số sản phẩm ban đầu
let count = 0;

// Gắn sự kiện cho từng nút
addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const productCard = button.closest(".product-card");
        const productName = productCard.querySelector("h3").textContent;

        // Tăng số lượng giỏ hàng
        count++;
        cartCount.textContent = count;

        // Thông báo
        alert(`Đã thêm ${productName} vào giỏ hàng!`);
    });
});



// ==========================
// CHỨC NĂNG TÌM KIẾM
// ==========================

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const productCards = document.querySelectorAll(".product-card");

function searchProducts() {
    const keyword = searchInput.value.toLowerCase().trim();

    productCards.forEach((card) => {
        const productName = card.querySelector("h3").textContent.toLowerCase();

        if (productName.includes(keyword)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

searchButton.addEventListener("click", searchProducts);

searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchProducts();
    }
});