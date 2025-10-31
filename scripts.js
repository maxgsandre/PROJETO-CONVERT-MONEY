// Configuração de moedas
const CURRENCIES = {
    'BRL': {
        name: 'Real Brasileiro',
        symbol: 'R$',
        code: 'BRL',
        flag: './img/brasil 2.png',
        locale: 'pt-BR',
        apiCode: 'BRL',
        emoji: '🇧🇷'
    },
    'USD': {
        name: 'Dólar Americano',
        symbol: 'U$',
        code: 'USD',
        flag: './img/usa.png',
        locale: 'en-US',
        apiCode: 'USD',
        emoji: '🇺🇸'
    },
    'EUR': {
        name: 'Euro',
        symbol: '€',
        code: 'EUR',
        flag: './img/euro.png',
        locale: 'pt-PT',
        apiCode: 'EUR',
        emoji: '🇪🇺'
    },
    'GBP': {
        name: 'Libra Esterlina',
        symbol: '£',
        code: 'GBP',
        flag: null,
        locale: 'en-GB',
        apiCode: 'GBP',
        emoji: '🇬🇧'
    },
    'JPY': {
        name: 'Iene Japonês',
        symbol: '¥',
        code: 'JPY',
        flag: null,
        locale: 'ja-JP',
        apiCode: 'JPY',
        emoji: '🇯🇵'
    },
    'CNY': {
        name: 'Yuan Chinês',
        symbol: '¥',
        code: 'CNY',
        flag: null,
        locale: 'zh-CN',
        apiCode: 'CNY',
        emoji: '🇨🇳'
    },
    'ARS': {
        name: 'Peso Argentino',
        symbol: '$',
        code: 'ARS',
        flag: null,
        locale: 'es-AR',
        apiCode: 'ARS',
        emoji: '🇦🇷'
    },
    'CAD': {
        name: 'Dólar Canadense',
        symbol: 'C$',
        code: 'CAD',
        flag: null,
        locale: 'en-CA',
        apiCode: 'CAD',
        emoji: '🇨🇦'
    },
    'AUD': {
        name: 'Dólar Australiano',
        symbol: 'A$',
        code: 'AUD',
        flag: null,
        locale: 'en-AU',
        apiCode: 'AUD',
        emoji: '🇦🇺'
    },
    'CHF': {
        name: 'Franco Suíço',
        symbol: 'Fr',
        code: 'CHF',
        flag: null,
        locale: 'de-CH',
        apiCode: 'CHF',
        emoji: '🇨🇭'
    },
    'MXN': {
        name: 'Peso Mexicano',
        symbol: '$',
        code: 'MXN',
        flag: null,
        locale: 'es-MX',
        apiCode: 'MXN',
        emoji: '🇲🇽'
    },
    'INR': {
        name: 'Rúpia Indiana',
        symbol: '₹',
        code: 'INR',
        flag: null,
        locale: 'en-IN',
        apiCode: 'INR',
        emoji: '🇮🇳'
    },
    'RUB': {
        name: 'Rublo Russo',
        symbol: '₽',
        code: 'RUB',
        flag: null,
        locale: 'ru-RU',
        apiCode: 'RUB',
        emoji: '🇷🇺'
    },
    'ZAR': {
        name: 'Rand Sul-Africano',
        symbol: 'R',
        code: 'ZAR',
        flag: null,
        locale: 'en-ZA',
        apiCode: 'ZAR',
        emoji: '🇿🇦'
    },
    'KRW': {
        name: 'Won Sul-Coreano',
        symbol: '₩',
        code: 'KRW',
        flag: null,
        locale: 'ko-KR',
        apiCode: 'KRW',
        emoji: '🇰🇷'
    },
    'TRY': {
        name: 'Lira Turca',
        symbol: '₺',
        code: 'TRY',
        flag: null,
        locale: 'tr-TR',
        apiCode: 'TRY',
        emoji: '🇹🇷'
    },
    'NZD': {
        name: 'Dólar Neozelandês',
        symbol: 'NZ$',
        code: 'NZD',
        flag: null,
        locale: 'en-NZ',
        apiCode: 'NZD',
        emoji: '🇳🇿'
    },
    'SGD': {
        name: 'Dólar de Singapura',
        symbol: 'S$',
        code: 'SGD',
        flag: null,
        locale: 'en-SG',
        apiCode: 'SGD',
        emoji: '🇸🇬'
    },
    'HKD': {
        name: 'Dólar de Hong Kong',
        symbol: 'HK$',
        code: 'HKD',
        flag: null,
        locale: 'zh-HK',
        apiCode: 'HKD',
        emoji: '🇭🇰'
    },
    'NOK': {
        name: 'Coroa Norueguesa',
        symbol: 'kr',
        code: 'NOK',
        flag: null,
        locale: 'no-NO',
        apiCode: 'NOK',
        emoji: '🇳🇴'
    },
    'SEK': {
        name: 'Coroa Sueca',
        symbol: 'kr',
        code: 'SEK',
        flag: null,
        locale: 'sv-SE',
        apiCode: 'SEK',
        emoji: '🇸🇪'
    },
    'DKK': {
        name: 'Coroa Dinamarquesa',
        symbol: 'kr',
        code: 'DKK',
        flag: null,
        locale: 'da-DK',
        apiCode: 'DKK',
        emoji: '🇩🇰'
    },
    'PLN': {
        name: 'Zloty Polonês',
        symbol: 'zł',
        code: 'PLN',
        flag: null,
        locale: 'pl-PL',
        apiCode: 'PLN',
        emoji: '🇵🇱'
    },
    'BTC': {
        name: 'Bitcoin',
        symbol: '₿',
        code: 'BTC',
        flag: './img/btc.png',
        locale: 'en-US',
        apiCode: 'BTC',
        emoji: '₿'
    }
};

// Cache de taxas de câmbio
const EXCHANGE_CACHE = {
    rates: null,
    timestamp: null,
    TTL: 5 * 60 * 1000 // 5 minutos em milissegundos
};

// Estado da aplicação
const AppState = {
    fromCurrency: 'BRL',
    toCurrency: 'USD',
    isLoading: false,
    lastError: null
};

// Elementos DOM
const elements = {
    button: document.getElementById('convert-button'),
    invertButton: document.getElementById('invert-button'),
    selectFrom: document.getElementById('currency-from-select'),
    selectTo: document.getElementById('currency-to-select'),
    searchFrom: document.getElementById('currency-from-search'),
    searchTo: document.getElementById('currency-to-search'),
    inputAmount: document.getElementById('input-real'),
    realValueText: document.getElementById('real-value-text'),
    currencyValueText: document.getElementById('currency-value-text'),
    currencyNameFrom: document.getElementById('currency-name-from'),
    currencyImgFrom: document.getElementById('currency-img-from'),
    currencyNameTo: document.getElementById('currency-name-to'),
    currencyImgTo: document.getElementById('currency-img-to'),
    historyList: document.getElementById('history-list'),
    clearHistoryBtn: document.getElementById('clear-history'),
    copyButton: document.getElementById('copy-button'),
    exchangeRateInfo: document.getElementById('exchange-rate-info'),
    exchangeRateText: document.getElementById('exchange-rate-text'),
    lastUpdateText: document.getElementById('last-update-text')
};

// Utilitários
const utils = {
    // Formatar valor monetário baseado na moeda
    formatCurrency(value, currencyCode) {
        const currency = CURRENCIES[currencyCode];
        if (!currency) return value.toString();
        
        return new Intl.NumberFormat(currency.locale, {
            style: 'currency',
            currency: currency.code
        }).format(value);
    },

    // Validar valor de entrada
    validateAmount(value) {
        const numValue = parseFloat(value);
        return !isNaN(numValue) && numValue > 0;
    },

    // Limpar valor de entrada (remover caracteres não numéricos exceto ponto e vírgula)
    cleanInput(value) {
        return value.replace(/[^\d.,]/g, '').replace(',', '.');
    },

    // Debounce para otimizar chamadas
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Verificar se cache está válido
    isCacheValid() {
        if (!EXCHANGE_CACHE.rates || !EXCHANGE_CACHE.timestamp) {
            return false;
        }
        return (Date.now() - EXCHANGE_CACHE.timestamp) < EXCHANGE_CACHE.TTL;
    }
};

// Gerenciamento de taxas de câmbio
const exchangeRates = {
    // Buscar taxas da AwesomeAPI (prioridade para moedas principais)
    async fetchRatesFromAwesomeAPI() {
        // Moedas principais disponíveis na AwesomeAPI
        const awesomeAPICurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'ARS', 'CAD', 'AUD', 'CHF', 'MXN', 'INR', 'RUB', 'BTC'];
        const pairs = awesomeAPICurrencies.map(code => `${code}-BRL`).join(',');
        
        const response = await fetch(
            `https://economia.awesomeapi.com.br/last/${pairs}`
        );

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        const rates = {};
        
        awesomeAPICurrencies.forEach(code => {
            const pairKey = `${code}BRL`;
            const apiData = data[pairKey] || data[`${code}-BRL`];
            if (apiData) {
                rates[pairKey] = parseFloat(apiData.high || apiData.bid || apiData.ask || 0);
            }
        });

        return rates;
    },

    // Buscar taxas usando ExchangeRate-API (fallback para moedas não disponíveis na AwesomeAPI)
    async fetchRatesFromExchangeRateAPI() {
        // API gratuita que não precisa de chave para uso básico
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/BRL');
        
        if (!response.ok) {
            throw new Error(`Erro na API alternativa: ${response.status}`);
        }

        const data = await response.json();
        const rates = {};
        
        // Converter de rates[moeda] para rates[moedaBRL]
        Object.keys(CURRENCIES).forEach(code => {
            if (code !== 'BRL' && data.rates && data.rates[code]) {
                // A API retorna BRL -> Moeda, precisamos inverter para Moeda -> BRL
                rates[`${code}BRL`] = 1 / data.rates[code];
            }
        });

        return rates;
    },

    // Buscar taxas da API (com fallback)
    async fetchRates() {
        try {
            // Verificar cache primeiro
            if (utils.isCacheValid()) {
                return EXCHANGE_CACHE.rates;
            }

            let rates = {};

            // Tentar AwesomeAPI primeiro (melhor para moedas principais)
            try {
                const awesomeRates = await this.fetchRatesFromAwesomeAPI();
                rates = { ...rates, ...awesomeRates };
                console.log('Taxas da AwesomeAPI carregadas');
            } catch (error) {
                console.warn('Erro ao buscar da AwesomeAPI, tentando alternativa...', error);
            }

            // Buscar moedas faltantes da ExchangeRate-API
            const currencyCodes = Object.keys(CURRENCIES).filter(code => code !== 'BRL');
            const missingCurrencies = currencyCodes.filter(code => !rates[`${code}BRL`] || rates[`${code}BRL`] === 0);

            if (missingCurrencies.length > 0) {
                try {
                    const exchangeRatesData = await this.fetchRatesFromExchangeRateAPI();
                    
                    // Preencher apenas as moedas que faltam
                    missingCurrencies.forEach(code => {
                        if (exchangeRatesData[`${code}BRL`]) {
                            rates[`${code}BRL`] = exchangeRatesData[`${code}BRL`];
                        }
                    });
                    console.log('Taxas faltantes carregadas da ExchangeRate-API');
                } catch (error) {
                    console.warn('Erro ao buscar da ExchangeRate-API:', error);
                }
            }

            // Verificar se temos pelo menos algumas taxas
            const validRates = Object.values(rates).filter(rate => rate > 0);
            if (validRates.length === 0) {
                throw new Error('Nenhuma taxa de câmbio disponível');
            }

            // Salvar no cache
            EXCHANGE_CACHE.rates = rates;
            EXCHANGE_CACHE.timestamp = Date.now();

            return rates;
        } catch (error) {
            console.error('Erro ao buscar taxas:', error);
            
            // Tentar usar cache mesmo que expirado em caso de erro
            if (EXCHANGE_CACHE.rates) {
                console.warn('Usando cache expirado devido a erro na API');
                return EXCHANGE_CACHE.rates;
            }
            
            throw error;
        }
    },

    // Calcular conversão entre duas moedas
    calculateConversion(amount, fromCurrency, toCurrency, rates) {
        if (fromCurrency === toCurrency) {
            return amount;
        }

        // Todas as conversões passam pelo Real (BRL) como moeda intermediária
        let amountInBRL;

        // Converter moeda origem para BRL
        if (fromCurrency === 'BRL') {
            amountInBRL = amount;
        } else {
            const rateKey = `${fromCurrency}BRL`;
            const rate = rates[rateKey];
            
            if (!rate || rate === 0) {
                throw new Error(`Taxa de câmbio não disponível para ${fromCurrency}`);
            }
            
            amountInBRL = amount * rate;
        }

        // Converter BRL para moeda destino
        if (toCurrency === 'BRL') {
            return amountInBRL;
        } else {
            const rateKey = `${toCurrency}BRL`;
            const rate = rates[rateKey];
            
            if (!rate || rate === 0) {
                throw new Error(`Taxa de câmbio não disponível para ${toCurrency}`);
            }
            
            return amountInBRL / rate;
        }
    }
};

// Gerenciamento da UI
const ui = {
    // Atualizar estado de loading
    setLoading(isLoading) {
        AppState.isLoading = isLoading;
        if (elements.button) {
            elements.button.disabled = isLoading;
            elements.button.textContent = isLoading ? 'Convertendo...' : 'Converter';
        }
    },

    // Mostrar erro na tela
    showError(message) {
        if (!message) return;
        
        // Remover mensagens anteriores
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Criar mensagem de erro
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.setAttribute('role', 'alert');
        
        // Inserir antes do botão
        if (elements.button && elements.button.parentNode) {
            elements.button.parentNode.insertBefore(errorDiv, elements.button);
        }

        // Remover após 5 segundos
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    },

    // Atualizar informações das moedas na UI
    updateCurrencyDisplay() {
        const updateCurrencyElement = (currency, imgElement, emojiElement) => {
            if (!currency || !imgElement) return;
            
            // Remover emoji anterior se existir
            const existingEmoji = imgElement.parentElement.querySelector('.currency-emoji');
            if (existingEmoji) {
                existingEmoji.remove();
            }
            
            if (currency.flag) {
                // Usar imagem se disponível
                imgElement.src = currency.flag;
                imgElement.style.display = 'block';
                imgElement.alt = `${currency.emoji || ''} ${currency.name}`;
            } else if (currency.emoji) {
                // Usar emoji se não houver imagem
                imgElement.style.display = 'none';
                const emojiSpan = document.createElement('span');
                emojiSpan.className = 'currency-emoji';
                emojiSpan.textContent = currency.emoji;
                imgElement.parentElement.insertBefore(emojiSpan, imgElement);
            }
        };

        const fromCurrency = CURRENCIES[AppState.fromCurrency];
        const toCurrency = CURRENCIES[AppState.toCurrency];

        if (fromCurrency) {
            if (elements.currencyNameFrom) {
                elements.currencyNameFrom.textContent = fromCurrency.name;
            }
            updateCurrencyElement(fromCurrency, elements.currencyImgFrom);
        }

        if (toCurrency) {
            if (elements.currencyNameTo) {
                elements.currencyNameTo.textContent = toCurrency.name;
            }
            updateCurrencyElement(toCurrency, elements.currencyImgTo);
        }
    },

    // Atualizar valores convertidos na tela
    updateConvertedValues(originalAmount, convertedAmount, exchangeRate = null) {
        if (elements.realValueText) {
            elements.realValueText.textContent = utils.formatCurrency(
                originalAmount, 
                AppState.fromCurrency
            );
        }
        if (elements.currencyValueText) {
            elements.currencyValueText.textContent = utils.formatCurrency(
                convertedAmount, 
                AppState.toCurrency
            );
        }

        // Mostrar botão copiar
        if (elements.copyButton && convertedAmount > 0) {
            elements.copyButton.style.display = 'inline-flex';
        }

        // Atualizar taxa de câmbio
        if (exchangeRate && elements.exchangeRateInfo && elements.exchangeRateText) {
            const fromCurrency = CURRENCIES[AppState.fromCurrency];
            const toCurrency = CURRENCIES[AppState.toCurrency];
            
            if (fromCurrency && toCurrency) {
                const rateFormatted = exchangeRate.toFixed(4);
                elements.exchangeRateText.textContent = 
                    `1 ${fromCurrency.symbol} ${fromCurrency.code} = ${rateFormatted} ${toCurrency.code}`;
                elements.exchangeRateInfo.style.display = 'block';
            }
        }

        // Atualizar indicador de última atualização
        if (EXCHANGE_CACHE.timestamp && elements.lastUpdateText) {
            const updateDate = new Date(EXCHANGE_CACHE.timestamp);
            const timeStr = updateDate.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
            });
            elements.lastUpdateText.textContent = `Atualizado às ${timeStr}`;
        }
    },

    // Copiar valor para clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            
            // Feedback visual
            if (elements.copyButton) {
                const originalText = elements.copyButton.innerHTML;
                elements.copyButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg> Copiado!';
                elements.copyButton.style.background = '#4CAF50';
                
                setTimeout(() => {
                    elements.copyButton.innerHTML = originalText;
                    elements.copyButton.style.background = '';
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao copiar:', error);
            ui.showError('Erro ao copiar valor. Tente novamente.');
        }
    }
};

// Popular selects com moedas disponíveis
function populateCurrencySelects() {
    const fromSelect = elements.selectFrom;
    const toSelect = elements.selectTo;

    if (!fromSelect || !toSelect) return;

    // Limpar selects
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';

    // Popular com moedas
    Object.keys(CURRENCIES).forEach(code => {
        const currency = CURRENCIES[code];
        const displayText = `${currency.symbol} ${currency.name} (${code})`;
        
        const optionFrom = document.createElement('option');
        optionFrom.value = code;
        optionFrom.textContent = displayText;
        optionFrom.dataset.name = currency.name.toLowerCase();
        optionFrom.dataset.code = code.toLowerCase();
        optionFrom.dataset.symbol = currency.symbol.toLowerCase();
        if (code === AppState.fromCurrency) {
            optionFrom.selected = true;
        }
        fromSelect.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = code;
        optionTo.textContent = displayText;
        optionTo.dataset.name = currency.name.toLowerCase();
        optionTo.dataset.code = code.toLowerCase();
        optionTo.dataset.symbol = currency.symbol.toLowerCase();
        if (code === AppState.toCurrency) {
            optionTo.selected = true;
        }
        toSelect.appendChild(optionTo);
    });
}

// Filtrar moedas por busca
function filterCurrencies(searchInput, selectElement) {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const options = selectElement.querySelectorAll('option');

    options.forEach(option => {
        const name = option.dataset.name || '';
        const code = option.dataset.code || '';
        const symbol = option.dataset.symbol || '';
        
        const matches = !searchTerm || 
            name.includes(searchTerm) || 
            code.includes(searchTerm) || 
            symbol.includes(searchTerm);
        
        option.style.display = matches ? 'block' : 'none';
    });

    // Atualizar tamanho do select baseado em opções visíveis
    const visibleOptions = Array.from(options).filter(opt => opt.style.display !== 'none');
    if (visibleOptions.length > 0 && !searchTerm) {
        selectElement.size = 1;
    } else if (visibleOptions.length > 0) {
        selectElement.size = Math.min(visibleOptions.length, 8);
    }
}

// Função principal de conversão
async function convertValues() {
    // Limpar erro anterior
    ui.showError(null);
    AppState.lastError = null;

    // Validar entrada
    const inputValue = elements.inputAmount?.value;
    if (!inputValue || inputValue.trim() === '') {
        ui.showError('Por favor, insira um valor para converter.');
        return;
    }

    const cleanedValue = utils.cleanInput(inputValue);
    if (!utils.validateAmount(cleanedValue)) {
        ui.showError('Por favor, insira um valor numérico válido maior que zero.');
        return;
    }

    const amount = parseFloat(cleanedValue);

    // Verificar se moedas são diferentes
    if (AppState.fromCurrency === AppState.toCurrency) {
        ui.showError('Por favor, selecione moedas diferentes para conversão.');
        return;
    }

    try {
        // Mostrar loading
        ui.setLoading(true);

        // Buscar taxas
        const rates = await exchangeRates.fetchRates();

        // Calcular conversão
        const convertedValue = exchangeRates.calculateConversion(
            amount,
            AppState.fromCurrency,
            AppState.toCurrency,
            rates
        );

        // Calcular taxa de câmbio (1 unidade da moeda origem = X unidades da moeda destino)
        const exchangeRate = exchangeRates.calculateConversion(
            1,
            AppState.fromCurrency,
            AppState.toCurrency,
            rates
        );

        // Atualizar UI
        ui.updateConvertedValues(amount, convertedValue, exchangeRate);

        // Salvar no histórico
        history.saveToHistory(amount, convertedValue);

    } catch (error) {
        console.error('Erro na conversão:', error);
        const errorMessage = error.message || 'Erro ao converter valores. Por favor, tente novamente.';
        ui.showError(errorMessage);
        AppState.lastError = error;
    } finally {
        ui.setLoading(false);
    }
}

// Atualizar moedas quando seleção mudar
function changeCurrency() {
    const fromValue = elements.selectFrom?.value;
    const toValue = elements.selectTo?.value;

    if (fromValue) {
        AppState.fromCurrency = fromValue;
    }
    if (toValue) {
        AppState.toCurrency = toValue;
    }

    ui.updateCurrencyDisplay();
    
    // Se houver valor no input, converter automaticamente
    const inputValue = elements.inputAmount?.value;
    if (inputValue && utils.validateAmount(utils.cleanInput(inputValue))) {
        const debouncedConvert = utils.debounce(convertValues, 500);
        debouncedConvert();
    }
}

// Função para inverter moedas
function invertCurrencies() {
    const temp = AppState.fromCurrency;
    AppState.fromCurrency = AppState.toCurrency;
    AppState.toCurrency = temp;

    if (elements.selectFrom && elements.selectTo) {
        elements.selectFrom.value = AppState.fromCurrency;
        elements.selectTo.value = AppState.toCurrency;
    }

    changeCurrency();
}

// Gerenciamento de histórico
const history = {
    // Carregar histórico do localStorage
    loadHistory() {
        try {
            const stored = localStorage.getItem('convertHistory');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Erro ao carregar histórico:', error);
            return [];
        }
    },

    // Salvar histórico no localStorage
    saveHistory(historyArray) {
        try {
            localStorage.setItem('convertHistory', JSON.stringify(historyArray));
        } catch (error) {
            console.error('Erro ao salvar histórico:', error);
        }
    },

    // Adicionar conversão ao histórico
    saveToHistory(originalAmount, convertedAmount) {
        const historyArray = this.loadHistory();
        const entry = {
            from: AppState.fromCurrency,
            to: AppState.toCurrency,
            amount: originalAmount,
            converted: convertedAmount,
            timestamp: new Date().toISOString()
        };

        historyArray.unshift(entry);
        
        // Limitar a 20 conversões mais recentes
        if (historyArray.length > 20) {
            historyArray.pop();
        }

        this.saveHistory(historyArray);
        this.render();
    },

    // Limpar histórico
    clear() {
        if (confirm('Deseja realmente limpar o histórico?')) {
            this.saveHistory([]);
            this.render();
        }
    },

    // Renderizar histórico na tela
    render() {
        if (!elements.historyList) return;

        const historyArray = this.loadHistory();
        elements.historyList.innerHTML = '';

        if (historyArray.length === 0) {
            const emptyMsg = document.createElement('p');
            emptyMsg.className = 'history-empty';
            emptyMsg.textContent = 'Nenhuma conversão realizada ainda.';
            elements.historyList.appendChild(emptyMsg);
            return;
        }

        historyArray.forEach(entry => {
            const item = document.createElement('div');
            item.className = 'history-item';
            
            const fromCurrency = CURRENCIES[entry.from];
            const toCurrency = CURRENCIES[entry.to];
            
            const date = new Date(entry.timestamp);
            const timeStr = date.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });

            item.innerHTML = `
                <div class="history-item-content">
                    <div class="history-item-main">
                        <span class="history-amount">${utils.formatCurrency(entry.amount, entry.from)}</span>
                        <span class="history-arrow">→</span>
                        <span class="history-amount">${utils.formatCurrency(entry.converted, entry.to)}</span>
                    </div>
                    <div class="history-item-meta">
                        <span class="history-currencies">${fromCurrency?.symbol || entry.from} → ${toCurrency?.symbol || entry.to}</span>
                        <span class="history-time">${timeStr}</span>
                    </div>
                </div>
            `;

            elements.historyList.appendChild(item);
        });
    }
};

// Inicialização
function init() {
    // Popular selects
    populateCurrencySelects();
    
    // Atualizar display inicial
    ui.updateCurrencyDisplay();

    // Event listeners
    if (elements.button) {
        elements.button.addEventListener('click', convertValues);
    }
    if (elements.invertButton) {
        elements.invertButton.addEventListener('click', invertCurrencies);
    }
    if (elements.selectFrom) {
        elements.selectFrom.addEventListener('change', changeCurrency);
        elements.selectFrom.addEventListener('blur', () => {
            if (elements.searchFrom) {
                elements.searchFrom.value = '';
                filterCurrencies(elements.searchFrom, elements.selectFrom);
            }
        });
    }
    if (elements.selectTo) {
        elements.selectTo.addEventListener('change', changeCurrency);
        elements.selectTo.addEventListener('blur', () => {
            if (elements.searchTo) {
                elements.searchTo.value = '';
                filterCurrencies(elements.searchTo, elements.selectTo);
            }
        });
    }

    // Busca de moedas
    if (elements.searchFrom && elements.selectFrom) {
        elements.searchFrom.addEventListener('input', () => {
            filterCurrencies(elements.searchFrom, elements.selectFrom);
        });
        elements.searchFrom.addEventListener('focus', () => {
            elements.selectFrom.size = Math.min(Object.keys(CURRENCIES).length, 8);
        });
    }
    if (elements.searchTo && elements.selectTo) {
        elements.searchTo.addEventListener('input', () => {
            filterCurrencies(elements.searchTo, elements.selectTo);
        });
        elements.searchTo.addEventListener('focus', () => {
            elements.selectTo.size = Math.min(Object.keys(CURRENCIES).length, 8);
        });
    }
    if (elements.inputAmount) {
        // Conversão automática enquanto digita (com debounce)
        elements.inputAmount.addEventListener('input', () => {
            const value = elements.inputAmount.value;
            if (value && utils.validateAmount(utils.cleanInput(value))) {
                const debouncedConvert = utils.debounce(convertValues, 800);
                debouncedConvert();
            } else {
                // Limpar valores se inválido
                if (elements.realValueText) elements.realValueText.textContent = '-';
                if (elements.currencyValueText) elements.currencyValueText.textContent = '-';
            }
        });

        // Permitir Enter para converter
        elements.inputAmount.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !AppState.isLoading) {
                convertValues();
            }
        });
    }

    // Event listener para limpar histórico
    if (elements.clearHistoryBtn) {
        elements.clearHistoryBtn.addEventListener('click', () => history.clear());
    }

    // Event listener para copiar resultado
    if (elements.copyButton) {
        elements.copyButton.addEventListener('click', async () => {
            const convertedText = elements.currencyValueText?.textContent;
            if (convertedText && convertedText !== '-') {
                await ui.copyToClipboard(convertedText);
            }
        });
    }

    // Renderizar histórico inicial
    history.render();
}

// Aguardar DOM carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
