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

addedToCart.addEventListener('click', function(event) {
    if (event.target.classList.contains('delBTN')) {
        let index = event.target.getAttribute('data-index');
        del(index);
        storeProducts();
        // Update the display after deleting
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
});

function duplicatesRemove(cart, newItem) {
    let existingItemIndex = cart.findIndex(item => item.name === newItem.name);

    if (existingItemIndex !== -1) {
        // Duplicate found, update the quantity
        cart[existingItemIndex].quantity += newItem.quantity;
    } else {
        // If no duplicate found, add the new item to the cart
        cart.push(newItem);
    }
}