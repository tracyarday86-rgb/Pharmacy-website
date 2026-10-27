const categoryButtons = [...document.querySelectorAll(".category-chip")];
const productCards = [...document.querySelectorAll(".product-card")];
const searchInput = document.querySelector("#product-search");
const noResults = document.querySelector("#no-results");
const basketCount = document.querySelector(".basket-count");
const basketButton = document.querySelector(".basket-button");
const toast = document.querySelector("#toast");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

let activeCategory = "all";
let basketItems = 0;
let toastTimer;

function filterProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  productCards.forEach((card) => {
    const matchesCategory = activeCategory === "all" || card.dataset.category === activeCategory;
    const matchesSearch = card.dataset.name.includes(searchTerm);
    const visible = matchesCategory && matchesSearch;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  noResults.hidden = visibleCount > 0;
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    categoryButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    filterProducts();
  });
});

searchInput.addEventListener("input", filterProducts);

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

document.querySelectorAll(".quick-add").forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.closest(".product-card").querySelector("h3").textContent;
    basketItems += 1;
    basketCount.textContent = String(basketItems);
    basketButton.setAttribute("aria-label", `Shopping basket, ${basketItems} ${basketItems === 1 ? "item" : "items"}`);
    showToast(`${productName} added to your basket`);
  });
});

basketButton.addEventListener("click", () => {
  showToast(basketItems === 0 ? "Your basket is ready for something good." : `${basketItems} ${basketItems === 1 ? "item" : "items"} in your basket`);
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  primaryNav.classList.toggle("open", !isOpen);
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    primaryNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  });
});
