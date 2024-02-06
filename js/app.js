const getProdutcs = async () => {
    const response = await fetch("js/products.json")
    const data = await response.json()
    return data
}

const cardGenerate = async () => {
    const products = await getProdutcs()
    products.map((product) => {
        let card = document.createElement("div")
        let price = product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })
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
            <span>${price}</span>
        `

        const productsList = document.querySelector(".products-list")
        productsList.appendChild(card)
    })
}

cardGenerate()