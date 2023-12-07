// empty array for products, will accept the products from constructor function
let products = []

// Constructor function to create my products
function Product(name, description, price, url){
    this.name = name
    this.description = description
    this.price = price
    this.quantity = 1
    this.url = url
}

// Creating products from the constructor function Product
let product1 = new Product('Vanilla Body Butter', 'Vannilla body butter made from vanilla extract with a hint of rosemary', 375, 'https://i.postimg.cc/8PmdZ6QM/Whats-App-Image-2023-12-04-at-10-18-39-removebg-preview.png')

let product2 = new Product('Avocado Body Butter', 'Avocado body butter, infused with jasmine scent, avocado oil and shea butter. Perfect for dry skin', 425, 'https://i.postimg.cc/t4mxcdrZ/Whats-App-Image-2023-12-04-at-10-18-40-removebg-preview.png')

let product3 = new Product('Lavender Bath Salts', 'Made with lavender extract, sweet almond extract, corse sea salt and lavender essential oils. Perfect for night time relaxation bath.', 225, 'https://i.postimg.cc/RC3bpGXf/Whats-App-Image-2023-12-04-at-10-18-41-removebg-preview.png')

let product4 = new Product('Body Oil', 'Made with Jojoba, sweet almond oil, grapeseed oil and vitamin E oil. Rich in antioxidants and anti-inflammatory properties leaving your skin nourished and revitalised.', 275, 'https://i.postimg.cc/DZ6YVYRd/Whats-App-Image-2023-12-04-at-10-18-42-1-removebg-preview.png')

let product5 = new Product('Citrus Bath Salts', 'Citrus bath salts made from lemon and orange extract, infused with orange essential oil with anti-inflammatory properties and antiseptic properties that help with the healing of would', 415,  'https://i.postimg.cc/NfN0psMp/Whats-App-Image-2023-12-04-at-10-18-42-2-removebg-preview.png')

// pushing products to the empty array products
products.push(product1, product2, product3, product4, product5)

// set products in local storay

localStorage.setItem('products', JSON.stringify(products))

// readying the table to display the products

let display = document.querySelector('table')

// using a function to call the products to the table

function show (){
    let items = products.map(function(item, index){
        console.log(item);
        console.log(index);
        return `
        <tr class="table">
            <td id="line">${index+1}</td>
            <td id="line">${item.name}</td>
            <td id="line">R${item.price}</td>
            <td id="line">${item.description}</td>
            <td id="line">${item.quantity}</td>
            <td id="line"> <img class="tableImg" src=${item.url}/> </td>
            <td id="line"><!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" onclick="editProduct(${index})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              Edit
            </button>
            
            <!-- Modal -->
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Product</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                  <div>
                  <p> <input type="text" placeholder="Name" productName> Name</p>
                  <p> <input type="text" placeholder="Price" productPrice> Price</p>
                  <p> <input type="text" placeholder="Description" productDescription> description</p>
                  <p> <input type="text" placeholder="Image URL" productImage> Image URL</p>
              </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary"  saveChanges>Save Changes</button>
                  </div>
                </div>
              </div>
            </div></td>
            <td id="line"><button value='${index}' class="delBTN">Delete</button></td>
        </tr>
        `
    })
    display.innerHTML = items.join('');
    let loader = document.getElementById("spinner");
    if(items.length > 0){
        loader.style.display = "none";
    } else if (items.length === 0) {
        loader.style.display = "flex";
    }
}
show()

// store items in the local storage so you can get them from there

function storedProducts(){
    localStorage.setItem('products',JSON.stringify(products))
    // get the products from the local storage
    products = JSON.parse(localStorage.getItem('products'))
}

// function to delete items in the admin page
function delt(position){
    products.splice(position, 1)
}
display.addEventListener('click', function(){
    if(event.target.classList.contains('delBTN')){
        delt(event.target.value)
        storedProducts()
        show()
    }
})

// creating a function that will accept values from input to push into the array of products

let addNewBTN = document.querySelector('[addItems]')
addNewBTN.addEventListener('click', createProduct);
addNewBTN.addEventListener('click', clear)

function createProduct() {
    let name = document.querySelector('[namePro]').value;
    let description = document.querySelector('[description]').value;
    let price = parseInt(document.querySelector('[price]').value);
    let quantity = 1
    let url = document.querySelector('[image]').value;

    // this will create a new product from the values it accepts from the input
    let newProduct = new Product(name, description, price, url);

    // pushing the products into the array products and calling the function to store them in the local storage and the function show to display them
    products.push(newProduct);
    storedProducts();
    show();
}
function clear (){
    let name = document.querySelector('[namePro]').value = '';
    let price = document.querySelector('[price]').value = '';
    let description = document.querySelector('[description]').value = '';
    let url = document.querySelector('[image]').value = '';
}


let selectedProduct;

function editProduct(index) {
    selectedProduct = products[index];

    // Populate modal with product details
    document.querySelector('[productName]').value = selectedProduct.name;
    document.querySelector('[productPrice]').value = selectedProduct.price;
    document.querySelector('[productDescription]').value = selectedProduct.description;
    document.querySelector('[productQuantity]').value = selectedProduct.quantity;
    document.querySelector('[productImage]').value = selectedProduct.url;
}

let saveChangesBTN = document.querySelector('[saveChanges]');

saveChangesBTN.addEventListener('click', updateChanges)

function updateChanges() {
    selectedProduct.name = document.querySelector('[productName]').value;
    selectedProduct.price = parseInt(document.querySelector('[productPrice]').value);
    selectedProduct.description = document.querySelector('[productDescription]').value;
    selectedProduct.quantity = parseInt(document.querySelector('[productQuantity]').value);
    selectedProduct.url = document.querySelector('[productImage]').value;

    // Close the modal after updating changes
    let modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    modal.hide();

    // Update the displayed products
    show();
}