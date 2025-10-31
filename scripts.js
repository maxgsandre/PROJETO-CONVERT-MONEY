// Configuração de moedas
const CURRENCIES = {
    'BRL': {
        name: 'Real Brasileiro',
        symbol: 'R$',
        code: 'BRL',
        flag: './img/brasil 2.png',
        locale: 'pt-BR',
        apiCode: 'BRL'
    },
    'USD': {
        name: 'Dólar Americano',
        symbol: 'U$',
        code: 'USD',
        flag: './img/usa.png',
        locale: 'en-US',
        apiCode: 'USD'
    },
    'EUR': {
        name: 'Euro',
        symbol: '€',
        code: 'EUR',
        flag: './img/euro.png',
        locale: 'pt-PT',
        apiCode: 'EUR'
    },
    'BTC': {
        name: 'Bitcoin',
        symbol: '₿',
        code: 'BTC',
        flag: './img/btc.png',
        locale: 'en-US',
        apiCode: 'BTC'
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
    inputAmount: document.getElementById('input-real'),
    realValueText: document.getElementById('real-value-text'),
    currencyValueText: document.getElementById('currency-value-text'),
    currencyNameFrom: document.getElementById('currency-name-from'),
    currencyImgFrom: document.getElementById('currency-img-from'),
    currencyNameTo: document.getElementById('currency-name-to'),
    currencyImgTo: document.getElementById('currency-img-to'),
    historyList: document.getElementById('history-list'),
    clearHistoryBtn: document.getElementById('clear-history')
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
    // Buscar taxas da API
    async fetchRates() {
        try {
            // Verificar cache primeiro
            if (utils.isCacheValid()) {
                return EXCHANGE_CACHE.rates;
            }

            const response = await fetch(
                "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,EUR-USD,BTC-BRL,BTC-USD,BTC-EUR"
            );

            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status}`);
            }

            const data = await response.json();
            
            // Processar dados da API
            const rates = {
                USDBRL: parseFloat(data.USDBRL?.high || data.USDBRL?.bid || 0),
                EURBRL: parseFloat(data.EURBRL?.high || data.EURBRL?.bid || 0),
                EURUSD: parseFloat(data.EURUSD?.high || data.EURUSD?.bid || 0),
                BTCBRL: parseFloat(data.BTCBRL?.high || data.BTCBRL?.bid || 0),
                BTCUSD: parseFloat(data.BTCUSD?.high || data.BTCUSD?.bid || 0),
                BTCEUR: parseFloat(data.BTCEUR?.high || data.BTCEUR?.bid || 0)
            };

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
        } else if (fromCurrency === 'USD') {
            amountInBRL = amount * rates.USDBRL;
        } else if (fromCurrency === 'EUR') {
            amountInBRL = amount * rates.EURBRL;
        } else if (fromCurrency === 'BTC') {
            amountInBRL = amount * rates.BTCBRL;
        } else {
            throw new Error(`Moeda de origem não suportada: ${fromCurrency}`);
        }

        // Converter BRL para moeda destino
        if (toCurrency === 'BRL') {
            return amountInBRL;
        } else if (toCurrency === 'USD') {
            return amountInBRL / rates.USDBRL;
        } else if (toCurrency === 'EUR') {
            return amountInBRL / rates.EURBRL;
        } else if (toCurrency === 'BTC') {
            return amountInBRL / rates.BTCBRL;
        } else {
            throw new Error(`Moeda de destino não suportada: ${toCurrency}`);
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
        const fromCurrency = CURRENCIES[AppState.fromCurrency];
        const toCurrency = CURRENCIES[AppState.toCurrency];

        if (fromCurrency) {
            if (elements.currencyNameFrom) {
                elements.currencyNameFrom.textContent = fromCurrency.name;
            }
            if (elements.currencyImgFrom) {
                elements.currencyImgFrom.src = fromCurrency.flag;
                elements.currencyImgFrom.alt = `Bandeira ${fromCurrency.name}`;
            }
        }

        if (toCurrency) {
            if (elements.currencyNameTo) {
                elements.currencyNameTo.textContent = toCurrency.name;
            }
            if (elements.currencyImgTo) {
                elements.currencyImgTo.src = toCurrency.flag;
                elements.currencyImgTo.alt = `Bandeira ${toCurrency.name}`;
            }
        }
    },

    // Atualizar valores convertidos na tela
    updateConvertedValues(originalAmount, convertedAmount) {
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
        
        const optionFrom = document.createElement('option');
        optionFrom.value = code;
        optionFrom.textContent = `${currency.symbol} ${currency.name}`;
        if (code === AppState.fromCurrency) {
            optionFrom.selected = true;
        }
        fromSelect.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = code;
        optionTo.textContent = `${currency.symbol} ${currency.name}`;
        if (code === AppState.toCurrency) {
            optionTo.selected = true;
        }
        toSelect.appendChild(optionTo);
    });
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

        // Atualizar UI
        ui.updateConvertedValues(amount, convertedValue);

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
    }
    if (elements.selectTo) {
        elements.selectTo.addEventListener('change', changeCurrency);
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

    // Renderizar histórico inicial
    history.render();
}

// Aguardar DOM carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
