const button = document.getElementById('convert-button');
const selectFrom = document.getElementById('currency-from-select');
const selectTo = document.getElementById('currency-to-select');

const convertValues = async () => {
    const inputAmount = parseFloat(document.getElementById('input-real').value);
    const realValueText = document.getElementById('real-value-text');
    const currencyValueText = document.getElementById('currency-value-text');

    if (isNaN(inputAmount) || inputAmount <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    // Fetching exchange rates
    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,EUR-USD").then(response => response.json());

    const DolarReal = parseFloat(data.USDBRL.high); // Dólar para Real
    const EuroReal = parseFloat(data.EURBRL.high); // Euro para Real
    const EuroDolar = parseFloat(data.EURUSD.high); // Euro para Dólar

    let convertedValue;

    // Adicionando lógica para todas as conversões
    if (selectFrom.value === 'R$ Real Brasileiro' && selectTo.value === 'U$ Dolar Americano') {
        convertedValue = inputAmount / DolarReal; // Real para Dólar
    } else if (selectFrom.value === 'R$ Real Brasileiro' && selectTo.value === '€ Euro') {
        convertedValue = inputAmount / EuroReal; // Real para Euro
    } else if (selectFrom.value === 'U$ Dolar Americano' && selectTo.value === 'R$ Real Brasileiro') {
        convertedValue = inputAmount * DolarReal; // Dólar para Real
    } else if (selectFrom.value === '€ Euro' && selectTo.value === 'R$ Real Brasileiro') {
        convertedValue = inputAmount * EuroReal; // Euro para Real
    } else if (selectFrom.value === 'U$ Dolar Americano' && selectTo.value === '€ Euro') {
        convertedValue = inputAmount / EuroDolar; // Dólar para Euro
    } else if (selectFrom.value === '€ Euro' && selectTo.value === 'U$ Dolar Americano') {
        convertedValue = inputAmount * EuroDolar; // Euro para Dólar
    } else {
        alert("Por favor, escolha moedas diferentes para conversão.");
        return;
    }

    // Atualizar os valores exibidos
    realValueText.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(inputAmount);
    currencyValueText.innerHTML = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(convertedValue);
};

const changeCurrency = () => {
    const currencyNameFrom = document.getElementById('currency-name-from');
    const currencyImgFrom = document.getElementById('currency-img-from');
    const currencyNameTo = document.getElementById('currency-name-to');
    const currencyImgTo = document.getElementById('currency-img-to');

    // Atualizar informações da moeda "de"
    if (selectFrom.value === 'R$ Real Brasileiro') {
        currencyNameFrom.innerHTML = 'Real';
        currencyImgFrom.src = './img/brasil 2.png';
    } else if (selectFrom.value === 'U$ Dolar Americano') {
        currencyNameFrom.innerHTML = 'Dólar Americano';
        currencyImgFrom.src = './img/usa.png';
    } else if (selectFrom.value === '€ Euro') {
        currencyNameFrom.innerHTML = 'Euro';
        currencyImgFrom.src = './img/euro.png';
    }

    // Atualizar informações da moeda "para"
    if (selectTo.value === 'R$ Real Brasileiro') {
        currencyNameTo.innerHTML = 'Real';
        currencyImgTo.src = './img/brasil 2.png';
    } else if (selectTo.value === 'U$ Dolar Americano') {
        currencyNameTo.innerHTML = 'Dólar Americano';
        currencyImgTo.src = './img/usa.png';
    } else if (selectTo.value === '€ Euro') {
        currencyNameTo.innerHTML = 'Euro';
        currencyImgTo.src = './img/euro.png';
    }
};

// Event listeners
button.addEventListener('click', convertValues);
selectFrom.addEventListener('change', changeCurrency);
selectTo.addEventListener('change', changeCurrency);
