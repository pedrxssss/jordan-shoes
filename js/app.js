const backBtn = document.querySelector(".back")
const productDetailsSection = document.querySelector(".products-details")
const productsSection = document.querySelector(".products")
const headerBanner = document.querySelector(".header-banner")
const details = document.querySelector(".freight")

/* Cart */
const cardBtn = document.querySelector(".shopping-cart div .icon")
const homeBtn = document.querySelector(".home-link")
const cartSection = document.querySelector(".cart")

/* Add to Cart */
const cart = []
const addToCartBtn = document.querySelector(".add-to-market-btn")

const price = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
})

const hiddenBtn = () => {
    backBtn.style.display = "none"
    productDetailsSection.style.display = "none"
}
hiddenBtn()

const getProdutcs = async () => {
    const response = await fetch("js/products.json")
    const data = await response.json()
    return data
}

const cardGenerate = async () => {
    const products = await getProdutcs()
    products.map((product) => {
        let card = document.createElement("div")

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

        const productsList = document.querySelector(".products-list")
        productsList.appendChild(card)

        fillCard(card, products)
    })
}
cardGenerate()

const fillCard = (card, products) => {
    card.addEventListener("click", (e) => {
        productsSection.style.display = "none"
        productDetailsSection.style.display = "grid"
        backBtn.style.display = "block"

        const cardClicked = e.currentTarget
        const productId = cardClicked.id
        const productClicked = products.find(
            (product) => product.id == productId
        )

        fillProductData(productClicked)
    })
}

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

backBtn.addEventListener("click", () => {
    hiddenBtn()
    productsSection.style.display = "flex"

    resetSelection(radios)
})

details.addEventListener("toggle", () => {
    const summary = document.querySelector("summary")
    summary.classList.toggle("expand-more")
    summary.classList.toggle("expand-less")
})

cardBtn.addEventListener("click", () => {
    cartSection.style.display = "block"
    productDetailsSection.style.display = "none"
    productsSection.style.display = "none"
    headerBanner.style.display = "none"
})

homeBtn.addEventListener("click", (event) => {
    event.preventDefault()
    headerBanner.style.display = "flex"
    productsSection.style.display = "flex"
    cartSection.style.display = "none"
    productDetailsSection.style.display = "none"
    hiddenBtn()
})

/* Add to cart */
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
    
    hiddenBtn()
    cartSection.style.display = "block"
    headerBanner.style.display = "none"

    console.log(cart)

})

/* Checking Labels */
const radios = document.querySelectorAll('input[type="radio"')
radios.forEach((radio) => {
    radio.addEventListener("change", () => {
        const label = document.querySelector(`label[for="${radio.id}"]`)
        label.classList.add("selected")
        console.log(label)

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

const resetSelection = (radios) => {
    radios.forEach((radio) => {
        radios.forEach((radioAtual) => {
            if (radioAtual != radio) {
                const otherLabel = document.querySelector(
                    `label[for="${radioAtual.id}"]`
                )
                otherLabel.classList.remove("selected")
            }
        })
    })
}
