// ===== COFFEE SHOP WEBSITE JAVASCRIPT =====

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const menuOptions = document.querySelectorAll('.menu-option');
const selectedMenuElement = document.getElementById('selectedMenu');
const itemPriceElement = document.getElementById('itemPrice');
const displayQuantityElement = document.getElementById('displayQuantity');
const totalPriceElement = document.getElementById('totalPrice');
const quantityInput = document.getElementById('quantity');
const orderForm = document.getElementById('orderForm');
const scrollTopBtn = document.createElement('div');

// Order state
let selectedMenu = '';
let selectedPrice = 0;

// ===== MOBILE MENU TOGGLE =====
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ===== MENU SELECTION =====
function handleMenuSelection(option) {
    // Remove selected class from all options
    menuOptions.forEach(opt => opt.classList.remove('selected'));
    
    // Add selected class to clicked option
    option.classList.add('selected');
    
    // Get selected menu and price
    const radioInput = option.querySelector('input[type="radio"]');
    radioInput.checked = true;
    selectedMenu = radioInput.value;
    selectedPrice = parseInt(option.getAttribute('data-price'));
    
    // Update order summary
    updateOrderSummary();
}

// Add click event to menu options
menuOptions.forEach(option => {
    option.addEventListener('click', () => handleMenuSelection(option));
});

// ===== ORDER QUANTITY HANDLING =====
function updateOrderSummary() {
    const quantity = parseInt(quantityInput.value) || 1;
    
    // Validate quantity
    if (quantity < 1) {
        quantityInput.value = 1;
        return updateOrderSummary();
    }
    
    // Update display
    selectedMenuElement.textContent = selectedMenu || '-';
    itemPriceElement.textContent = selectedPrice.toLocaleString('id-ID') || '0';
    displayQuantityElement.textContent = quantity;
    
    // Calculate and display total
    const totalPrice = selectedPrice * quantity;
    totalPriceElement.textContent = totalPrice.toLocaleString('id-ID') || '0';
}

// Update order summary when quantity changes
quantityInput.addEventListener('input', updateOrderSummary);

// ===== FORM SUBMISSION =====
function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const notes = document.getElementById('notes').value.trim();
    const quantity = parseInt(quantityInput.value) || 1;
    
    // Validation
    if (!name || !phone || !address) {
        alert('Harap lengkapi semua data yang diperlukan!');
        return;
    }
    
    if (!selectedMenu) {
        alert('Silakan