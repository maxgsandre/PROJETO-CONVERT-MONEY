# CodeClub Convert Money

![image](https://github.com/maxgsandre/PROJETO-CONVERT-MONEY/assets/115383243/e95ce8ef-19d0-4b56-93fa-abe84dea3ed9)

**CodeClub Convert Money** é uma aplicação web moderna e completa para converter valores monetários entre diferentes moedas. Esta aplicação utiliza dados em tempo real da API AwesomeAPI para fornecer taxas de câmbio precisas.

## ✨ Recursos

### 🔄 Conversão de Moedas
- **Conversão em tempo real** usando taxas de câmbio atualizadas
- **Suporte para 4 moedas**: Real Brasileiro (BRL), Dólar Americano (USD), Euro (EUR) e Bitcoin (BTC)
- **Conversão automática** enquanto você digita (com debounce para otimização)
- **Formatação dinâmica** baseada na moeda selecionada

### 🎯 Funcionalidades Principais
- **Botão inverter moedas**: Troque facilmente a moeda de origem e destino
- **Histórico de conversões**: Visualize suas últimas 20 conversões com data e hora
- **Cache inteligente**: Taxas de câmbio são cacheadas por 5 minutos para melhor performance
- **Tratamento robusto de erros**: Mensagens amigáveis e fallback automático
- **Interface responsiva**: Funciona perfeitamente em desktop, tablet e mobile

### 🎨 Interface Moderna
- **Modo escuro** com tema roxo vibrante
- **Animações suaves** para melhor experiência do usuário
- **Feedback visual** em todas as ações (loading, erros, sucessos)
- **Acessibilidade**: Suporte completo para screen readers e navegação por teclado

## 🚀 Pré-requisitos

- Navegador da web moderno (Chrome, Firefox, Safari, Edge)
- Conexão com internet (para buscar taxas de câmbio)

## 📖 Como Usar

1. Abra `index.html` em seu navegador
2. Selecione a moeda de **origem** no primeiro campo
3. Use o botão circular com setas para **inverter** as moedas (opcional)
4. Selecione a moeda de **destino** no segundo campo
5. Digite o valor a ser convertido (a conversão acontece automaticamente)
6. Ou clique no botão **"Converter"** para forçar uma nova conversão
7. Visualize o resultado formatado na seção abaixo
8. Acesse o **histórico** para ver conversões anteriores

### 💡 Dicas
- Você pode pressionar **Enter** no campo de valor para converter
- O histórico é salvo automaticamente no navegador (localStorage)
- Use o botão "Limpar histórico" para remover todas as conversões salvas
- As taxas são atualizadas automaticamente a cada 5 minutos

## 🛠️ Tecnologias Utilizadas

- **HTML5** com semântica e acessibilidade
- **CSS3** com animações e design responsivo
- **JavaScript (ES6+)** modular e organizado
- **AwesomeAPI** para taxas de câmbio em tempo real
- **localStorage** para persistência do histórico

## 📁 Estrutura do Projeto

```
PROJETO-CONVERT-MONEY/
├── index.html          # Estrutura HTML principal
├── scripts.js          # Lógica JavaScript modularizada
├── style.css           # Estilos e animações
├── README.md           # Documentação
└── img/                # Imagens das bandeiras e ícones
    ├── brasil 2.png
    ├── usa.png
    ├── euro.png
    └── btc.png
```

## 🔧 Melhorias Implementadas

### Código
- ✅ Modularização completa do JavaScript
- ✅ Estrutura de dados centralizada para moedas
- ✅ Tratamento robusto de erros com fallback
- ✅ Cache de taxas de câmbio (TTL de 5 minutos)
- ✅ Validação em tempo real de inputs

### UX/UI
- ✅ Botão para inverter moedas
- ✅ Conversão automática ao digitar
- ✅ Estado de loading visual
- ✅ Mensagens de erro amigáveis
- ✅ Animações suaves e feedback visual

### Funcionalidades
- ✅ Suporte para Bitcoin
- ✅ Histórico de conversões com localStorage
- ✅ Formatação dinâmica baseada na moeda
- ✅ Melhorias de acessibilidade (ARIA labels)

## 🤝 Como Contribuir

Sinta-se à vontade para abrir uma issue ou enviar um pull request para melhorias.

### Sugestões de Melhorias Futuras
- [ ] Gráficos de histórico de taxas
- [ ] Alertas personalizados de taxa de câmbio
- [ ] Suporte para mais moedas (GBP, JPY, CNY, etc)
- [ ] Modo offline com dados cacheados
- [ ] Exportar histórico (CSV/JSON)
- [ ] PWA (Progressive Web App)

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

---

**Desenvolvido como parte do curso CodeClub.**
