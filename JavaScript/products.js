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

let sortBTN = document.querySelector('[sort]')

sortBTN.addEventListener('click', sort)

function sort (){
    let products = JSON.parse(localStorage.getItem('products'))
        price.sort(function(a, b){
            return
            b.price - a.price
        })
}

