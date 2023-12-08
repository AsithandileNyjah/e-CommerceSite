let cart = JSON.parse(localStorage.getItem('cart'));
let addedToCart = document.querySelector('[cart]');

addedToCart.innerHTML += cart.map((item, index) => {
    return `
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px;">${index + 1}</td>
            <td style="padding: 10px;">${item.name}</td>
            <td style="padding: 10px;">${item.description}</td>
            <td style="padding: 10px; width: 100px" quantityInput><input style="width:20px" type='text' placeholder="${item.quantity}"> <button style="width:50px" onclick="calculateTotalPrice(${index})" class="totalBTN" totalBTN >Enter</button></td>
            <td style="padding: 10px;">R${item.price} per</td>
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
        calculateTotalPrice()
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
                <td style="padding: 10px;"><input type='number' placeholder="${item.quantity}"></td>
                <td style="padding: 10px;">R${item.price}</td>
                <td style="padding: 10px;"><button type="button" class="delBTN" data-index="${index}">Delete</button></td>
            </tr>
        `;
    }).join('');
}

// Select the HTML element with the attribute 'totalBTN' and assign it to the variable 'totalBTN'
let totalBTN = document.querySelector('[totalBTN]')

let quantityInputs = document.querySelectorAll('[quantityInput] input');

// setting my price display to display the price total after it has been calculated
let totalPriceDisplay = document.querySelector('[totalPrice]');

// Add an event listener to the 'totalBTN' element, so when it is clicked, the 'calculateTotalPrice' function runs
totalBTN.addEventListener('click', calculateTotalPrice);

// Create the 'calculateTotalPrice' function
function calculateTotalPrice() {
    // Initialize a variable 'total' to store the calculated total price, when the cart is empty, zero will be displayed
    let total = 0;

    // Loop through cart for each item to
    cart.forEach(function (item, index) {
        // Get the quantity input value for the current item and convert it to an integer. If conversion fails, default to 1.
        let quantity = parseInt(quantityInputs[index].value) || 1;

        // Add the product of item price and quantity to the total
        total += item.price * quantity;
    });

    // Update the displayed total price on the webpage
    totalPriceDisplay.textContent = `R${total}`;

    // Return the calculated total (though it's not currently used elsewhere in your code)
    return total;
}

// Display the total price
totalPriceDisplay.textContent = `R${calculateTotalPrice()}`;


// checkout button function

document.addEventListener('DOMContentLoaded', function () {
    // Declaring the checkout button and the html attributes to target it, adding the event listener to run the function when clicked
    let checkoutBTN = document.querySelector('[checkout]')
    checkoutBTN.addEventListener('click', checkout)

    function checkout() {
        // conditional statement to alert the user when they checkout
        if (cart.length === 0) {
            alert('Your Cart Is Empty') //it will say this when the cart is empty
        } else {
            alert('Thank you for shopping with Naturally Kissed!') //it will say this when the cart has items when checking out
        }
    }
});