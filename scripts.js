const button = document.getElementById('convert-button')
const select = document.getElementById('currency-select')

const dolar = 5.31
const euro = 5.62


const convertValues = () => {
    const inputReal = document.getElementById('input-real').value
    const realValueText = document.getElementById('real-value-text')
    const currencyValueText = document.getElementById('currency-value-text')

    realValueText.innerHTML = new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    }).format(inputReal)

    if(select.value === 'U$ Dolar Americano') {
        currencyValueText.innerHTML = new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: 'USD' 
        }).format(inputReal / dolar)
    }

    if(select.value === '€ Euro') {
    currencyValueText.innerHTML = new Intl.NumberFormat('de-DE', { 
        style: 'currency', 
        currency: 'EUR' 
    }).format(inputReal / euro)
    }
}

changeCurrency = () => {
    const currencyName = document.getElementById('currency-name')
    const currencyImg = document.getElementById ('currency-img')

    if(select.value === 'U$ Dolar Americano'){
        currencyName.innerHTML = 'Dolar Americano'
        currencyImg.src = './img/usa.png'
    }

    if(select.value === '€ Euro'){
        currencyName.innerHTML = 'Euro'
        currencyImg.src = './img/euro.png'
    }
    
    convertValues()
}

button.addEventListener('click', convertValues)
select.addEventListener('change', changeCurrency)