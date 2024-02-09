/* Cart */
const homeBtn = document.querySelector(".home-link")
const cardBtn = document.querySelector(".shopping-cart div .icon")
const numItems = document.querySelector(".items")

/* Add to Cart */
const addToCartBtn = document.querySelector(".add-to-market-btn")
const cart = []
const cartSection = document.querySelector(".cart")
const tableBody = document.querySelector(".cart tbody")

/* Variables */
const headerBanner = document.querySelector(".header-banner")
const productsSection = document.querySelector(".products")
const productsList = document.querySelector(".products-list")
const backBtn = document.querySelector(".back")
const productDetailsSection = document.querySelector(".products-details")
const spanId = (document.querySelector(".details span").style.display = "none")
const details = document.querySelector(".freight")

//Update cart and items function
const updateCartAndItems = () => {
    tableBody.textContent = ""

    cart.forEach((product) => {
        tableBody.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td class='size-column'>${product.size}</td>
                <td class='price-column'>${product.price}</td>
                <td class='delete-column'>
                    <span class='material-symbols-outlined' data-id='${product.id}'>Delete</span>
                </td>
            </tr>
        `
    })

    const total = cart.reduce((accumulatedValue, item) => {
        return accumulatedValue + cleanRealFormat(item.price)
    }, 0)

    document.querySelector(".total-column").innerHTML = price.format(total)

    updateItemsDisplay()
    setupDeleteButtons()
}

const cleanRealFormat = (value) => {
    return parseFloat(
        value.replace("R$&nbsp;", "").replace(".", "").replace(",", ".")
    )
}

//Update the exibition of items number
numItems.style.display = "none"
const updateItemsDisplay = () => {
    numItems.style.display = cart.length > 0 ? "block" : "none"
    numItems.textContent = cart.length
}

//Buton action of delete items from cart
const setupDeleteButtons = () => {
    const deleteButton = document.querySelectorAll(".delete-column span")
    deleteButton.forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id")
            const position = cart.findIndex((item) => item.id == id)
            cart.splice(position, 1)

            updateCartAndItems(cart)
        })
    })
    updateItemsDisplay()
}

//Function relationated at navegations and funcionality
const price = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
})

const getProdutcs = async () => {
    const response = await fetch("js/products.json")
    const data = await response.json()
    return data
}

const loadProductsAndGenerateCard = async () => {
    try {
        const products = await getProdutcs()
        products.forEach((product) => {
            if (isValidProduct(product)) {
                const card = createCardProduct(product)
                productsList.appendChild(card)
                fillCard(card, product)
            } else {
                console.error(
                    "O objeto product está incompleto ou ausente de propriedades necessárias."
                )
            }
        })
    } catch (error) {
        console.error("Erro ao obter produtos", error)
    }
}

const createCardProduct = (product) => {
    const card = document.createElement("div")
    card.id = product.id
    card.classList.add("products-card")
    card.innerHTML = `
            <figure>
                <img
                    src="images/${product.image}"
                    alt="${product.product_name}"
                />
            </figure>
            <div>
                <h4>${product.product_name}</h4>
                <h5>${product.product_model}</h5>
            </div>
            <span>${price.format(product.price)}</span>
        `
    return card
}

const isValidProduct = (product) => {
    return (
        product.id &&
        product.product_name &&
        product.product_model &&
        product.price
    )
}

//Fill in product cards
const fillCard = (card, product) => {
    card.addEventListener("click", (e) => {
        productsSection.style.display = "none"
        productDetailsSection.style.display = "grid"
        backBtn.style.display = "block"

        fillProductData(product)
    })
}

//Fill in product details and data
const fillProductData = (product) => {
    const images = document.querySelectorAll(
        ".products-details-images figure img"
    )
    const imagesArr = Array.from(images)
    imagesArr.map((image) => {
        image.src = `./images/${product.image}`
    })

    document.querySelector(".details .id").innerHTML = product.id
    document.querySelector(".details h4").innerHTML = product.product_name
    document.querySelector(".details h5").innerHTML = product.product_model
    document.querySelector(".details .price").innerHTML = price.format(
        product.price
    )
}

//Hidden button and product details section
const hiddenBtnAndDetailsSection = () => {
    backBtn.style.display = "none"
    productDetailsSection.style.display = "none"
}
hiddenBtnAndDetailsSection()

//Add arrow image to summary
details.addEventListener("toggle", () => {
    const summary = document.querySelector("summary")
    summary.classList.toggle("expand-more")
    summary.classList.toggle("expand-less")
})

//Event Listeners Config
backBtn.addEventListener("click", () => {
    productsSection.style.display = "flex"
    hiddenBtnAndDetailsSection()
    resetSelection(radios)
})

//Hidden sections to appear the cart with products
cardBtn.addEventListener("click", () => {
    cartSection.style.display = "block"
    productDetailsSection.style.display = "none"
    productsSection.style.display = "none"
    headerBanner.style.display = "none"
})

//Back from cart to main page
homeBtn.addEventListener("click", (event) => {
    event.preventDefault()
    headerBanner.style.display = "flex"
    productsSection.style.display = "flex"
    cartSection.style.display = "none"
    productDetailsSection.style.display = "none"
    hiddenBtnAndDetailsSection()
    resetSelection(radios)
})

//Select Product to add to cart
addToCartBtn.addEventListener("click", () => {
    const product = {
        id: document.querySelector(".details .id").innerHTML,
        name: document.querySelector(".details h4").innerHTML,
        model: document.querySelector(".details h5").innerHTML,
        price: document.querySelector(".details .price").innerHTML,
        size: document.querySelector('input[type="radio"][name="size"]:checked')
            .value,
    }

    cart.push(product)

    hiddenBtnAndDetailsSection()
    cartSection.style.display = "block"
    headerBanner.style.display = "none"

    updateCartAndItems()
})

//Checking labels
const radios = document.querySelectorAll('input[type="radio"')
radios.forEach((radio) => {
    radio.addEventListener("change", () => {
        const label = document.querySelector(`label[for="${radio.id}"]`)
        label.classList.add("selected")

        radios.forEach((radioAtual) => {
            if (radioAtual !== radio) {
                const otherLabel = document.querySelector(
                    `label[for="${radioAtual.id}"]`
                )
                otherLabel.classList.remove("selected")
            }
        })
    })
})

//Functions that clean the input radio selections
const resetSelection = (radios) => {
    radios.forEach((radio) => {
        const otherLabel = document.querySelector(`label[for="${radio.id}"]`)
        otherLabel.classList.remove("selected")
    })
}

//Start app
loadProductsAndGenerateCard()
updateItemsDisplay()
