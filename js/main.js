// Lấy tất cả nút "Thêm vào giỏ"
const addToCartButtons = document.querySelectorAll(".product-card button");

// Gắn sự kiện click cho từng nút
addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const productCard = button.closest(".product-card");
        const productName = productCard.querySelector("h3").textContent;

        alert(`Đã thêm ${productName} vào giỏ hàng!`);
    });
});