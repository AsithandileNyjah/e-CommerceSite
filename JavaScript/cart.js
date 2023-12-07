let cart = JSON.parse(localStorage.getItem('cart'));
let addedToCart = document.querySelector('[cart]');

addedToCart.innerHTML += cart.map((item, index) => {
    return `
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px;">${index + 1}</td>
            <td style="padding: 10px;">${item.name}</td>
            <td style="padding: 10px;">${item.description}</td>
            <td style="padding: 10px;">${item.quantity}</td>
            <td style="padding: 10px;">R${item.price}</td>
            <td style="padding: 10px;"><button type="button" class="delBTN" data-index="${index}">Delete</button></td>
          </tr>
    `;
}).join('');

function storeProducts() {
    localStorage.setItem('cart', JSON.stringify(cart));
    // get the products from the cart array in the local storage
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

// function to delete items in the cart
function del(position) {
    cart.splice(position, 1);
}

// Assuming addedToCart is a container element that holds the cart items
addedToCart.addEventListener('click', function (event) {
    let target = event.target;

    if (target.classList.contains('delBTN')) {
        const index = target.getAttribute('data-index');
        del(index);
        storeProducts();
        updateCartDisplay();
    }
});

function updateCartDisplay() {
    addedToCart.innerHTML = cart.map((item, index) => {
        return `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px;">${index + 1}</td>
                <td style="padding: 10px;">${item.name}</td>
                <td style="padding: 10px;">${item.description}</td>
                <td style="padding: 10px;">${item.quantity}</td>
                <td style="padding: 10px;">R${item.price}</td>
                <td style="padding: 10px;"><button type="button" class="delBTN" data-index="${index}">Delete</button></td>
            </tr>
        `;
    }).join('');
}

function duplicatesRemove(cart, newItem) {
    let existingItemIndex = cart.findIndex((item) => item.name === newItem.name);

    if (existingItemIndex !== -1) {
        // Duplicate found, update the quantity
        cart[existingItemIndex].quantity += newItem.quantity;
    } else {
        // If no duplicate found, add the new item to the cart
        cart.push(newItem);
    }
}


// Function to calculate the total price of items in the cart
function calculateTotalPrice() {
    let total = 0;
    cart.forEach(function (item) {
        total += item.price ;
    });
    return total;
}

// Display the price
let totalPriceDisplay = document.querySelector('[totalPrice]');
totalPriceDisplay.textContent = `R${calculateTotalPrice()}`;


// checkout button function

let checkoutBTN = document.querySelector('[checkout]')

checkoutBTN.addEventListener('click', checkout)

function checkout(){
    if(cart.length ===0){
        alert('Your Cart Is Empty')
    } else {
        alert('Thank you for shopping with Naturally Kissed!')
    }
}
