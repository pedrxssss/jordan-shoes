//Function relationated at navegations and funcionality
export const price = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
})

export const cleanRealFormat = (value) => {
    return parseFloat(
        value.replace("R$&nbsp;", "").replace(".", "").replace(",", ".")
    )
}