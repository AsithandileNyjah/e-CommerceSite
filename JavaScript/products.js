// empty array to push products that have been added to cart to

let cart = []

// setting where to display my products

let display = document.querySelector('[main]')

// get products from the array in the admin page of products

let products = JSON.parse(localStorage.getItem('products'))

// call the products to display

display.innerHTML = products.map(function(item, index){
    return `
        <div id="card" class="container-fluid">
            <div class="card" style="width: 15rem;">
            <img id="cardImg" src=${item.url} class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text" style="height: 10rem">${item.description}</p>
            <a class="btn btn-success">R${item.price}</a>
            <a href="#" value='${index}' class="btn btn-primary" addToCart>Add to Cart</a>
            </div>
            </div>
        </div>
    `
}).join('')

// function to add products to cart
function addToCart(index){
    cart.push(products[index])
    localStorage.setItem('cart', JSON.stringify(cart))
}
display.addEventListener('click', function(){
    if(event.target.hasAttribute('addToCart')){
        addToCart(event.target.value)
    }
})

let sortBtn = document.querySelector('[sort]')
sortBtn.textContent = 'Sort by Price';
sortBtn.addEventListener('click', function () {
    sortProductsByPrice();
});

// Append the sort button to the display element
display.appendChild(sortBtn);

// Function to sort products by price
function sortProductsByPrice() {
    // Use if statements to sort products by price (lowest to highest)
    products.sort(function (a, b) {
        if (a.price < b.price) {
            return -1;
        } else if (a.price > b.price) {
            return 1;
        } else {
            return 0;
        }
    });

    // Update the display with the sorted products
    display.innerHTML = products.map(function (item, index) {
        return `
            <div id="card" class="container-fluid">
                <div class="card" style="width: 15rem;">
                <img id="cardImg" src=${item.url} class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text" style="height: 10rem">${item.description}</p>
                <a class="btn btn-success">R${item.price}</a>
                <a href="#" value='${index}' class="btn btn-primary" addToCart>Add to Cart</a>
                </div>
                </div>
            </div>
        `;
    }).join('');
}

let searchBTN = document.querySelector('[search]');
let searchWords = document.querySelector('[searchInput]');

searchBTN.addEventListener('click', function () {
    let searchTerm = searchWords.value.toLowerCase();
    searchProducts(searchTerm);
});

// Function to search products based on the search term
function searchProducts(searchTerm) {
    // Use switch cases for different search criteria
    switch (avocado) {
        case 'vanilla':
            filterAndDisplayProducts('Vanilla Body Butter');
            break;
        case 'citrus':
            filterAndDisplayProducts('Citrus Body Butter');
            break;
        case 'avocado':
            filterAndDisplayProducts('Avocado Body Butter');
            break;
        default:
            // If no specific case matches, display all products
            displayProducts(products);
    }
}

// Function to filter and display products based on the given name
function filterAndDisplayProducts(productName) {
    const filteredProducts = products.filter(item => item.name.toLowerCase().includes(productName));
    displayProducts(filteredProducts);
}

// Function to display products on the page
function displayProducts(productsToDisplay) {
    display.innerHTML = productsToDisplay.map(function (item, index) {
        return `
            <div id="card" class="container-fluid">
                <div class="card" style="width: 15rem;">
                <img id="cardImg" src=${item.url} class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text" style="height: 10rem">${item.description}</p>
                <a class="btn btn-success">R${item.price}</a>
                <a href="#" value='${index}' class="btn btn-primary" addToCart>Add to Cart</a>
                </div>
                </div>
            </div>
        `;
    }).join('');
}
