const button = document.getElementById('convert-button')
const select = document.getElementById('currency-select')


const convertValues = async () => {
    const inputReal = document.getElementById('input-real').value
    const realValueText = document.getElementById('real-value-text')
    const currencyValueText = document.getElementById('currency-value-text')

    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then( response => response.json())

    const dolar = data.USDBRL.high
    const euro = data.EURBRL.high
   

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