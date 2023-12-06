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


let searchBTN = document.querySelector('[search]')
let display2 = document.querySelector('[notFound]')

// adding an event listener to the searchBTN with the search function
searchBTN.addEventListener('click', function(event){
    event.preventDefault();
    let searchWord = document.querySelector('[searchInput]').value.toLowerCase();
    let searchedItem = products.filter(item => item.name.toLowerCase().includes(searchWord));
    let productNotFound = 'Product Not Found'
    
    if (searchWord.length > 0) {
        // Update the display with the searched products
        display.innerHTML = searchedItem.map(function (item, index) {
            return `
                <div id="card" class="col-md-4 my-4">
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
    } else {
        // this will display when if the conditions are not met
        console.log(productNotFound);
        display2.innerHTML = productNotFound;
    }
});
