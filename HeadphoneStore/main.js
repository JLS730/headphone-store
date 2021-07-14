let carts = document.querySelectorAll('.add-cart')

// Product information
let products = [
    {
        name: 'Headphone #1',
        tag: 'headphone1',
        price: 249.99,
        inCart: 0
    },
    {
        name: 'Headphone #2',
        tag: 'headphone2',
        price: 129.99,
        inCart: 0
    },
    {
        name: 'Headphone #3',
        tag: 'headphone3',
        price: 149.99,
        inCart: 0
    },
    {
        name: 'Headphone #4',
        tag: 'headphone4',
        price: 199.99,
        inCart: 0
    },
    {
        name: 'Headphone #5',
        tag: 'headphone5',
        price: 399.99,
        inCart: 0
    },
    {
        name: 'Headphone #6',
        tag: 'headphone6',
        price: 299.99,
        inCart: 0
    },
]

// Adding click events to the all 'Add to Cart' buttons
for(let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i])
        totalCost(products[i])
    })
}

// Update shopping cart number on page load
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers
    }
}

// Creating local storage for number of items in cart
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers')

    productNumbers = parseInt(productNumbers)

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.cart span').textContent = productNumbers + 1
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart span').textContent = 1
    }

    setItems(product)
}

// Sets product info and quantity in local storage
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)

    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }

        }

        cartItems[product.tag].inCart += 1
    } else {
        product.inCart = 1
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems))
}

// Calculate total cost of items
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost')

    if(cartCost != null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem('totalCost', product.price + cartCost)
    } else {
        localStorage.setItem('totalCost', product.price)
    }
}

//
function displayCart() {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    
    let productContainer = document.querySelector('.products')
    let cartCost = localStorage.getItem('totalCost')

    console.log(typeof cartCost)

    if(cartItems && productContainer) {
        productContainer.innerHTML = ''
        Object.values(cartItems).map( item => {
            productContainer.innerHTML += `
                <div class="product">
                    <ion-icon name="close-circle"></ion-icon>
                    <img src="./images/${item.tag}.jpg">
                    <span>${item.name}</span>
                </div>
                <div class="price">$${item.price}</div>
                <div class="quantity">
                    <ion-icon class="decrease" name="caret-back-circle-outline"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon class="increase" name="caret-forward-circle-outline"></ion-icon>
                </div>
                <div class="total">
                    $${item.inCart * item.price}
                </div>
            `
        })

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost}
                </h4>
            </div>
        `
    }
}

onLoadCartNumbers()
displayCart()