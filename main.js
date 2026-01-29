const themeSwitch = document.getElementById('checkbox');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

themeSwitch.addEventListener('change', switchTheme, false);

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        themeSwitch.checked = true;
    }
}

class LottoNumbers extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set numbers(numbers) {
        this.shadowRoot.innerHTML = `
            <style>
                .lotto-numbers {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }

                .number {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: var(--secondary-color, #f0f0f0);
                    color: var(--font-color, #333);
                    margin: 0 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 24px;
                    font-weight: bold;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
            </style>
            <div class="lotto-numbers">
                ${numbers.map(number => `<div class="number">${number}</div>`).join('')}
            </div>
        `;
    }
}

customElements.define('lotto-numbers', LottoNumbers);

const generateBtn = document.getElementById('generate-btn');
const lottoNumbers = document.querySelector('lotto-numbers');
const historyList = document.getElementById('history-list');

const history = [];

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    lottoNumbers.numbers = sortedNumbers;

    history.push(sortedNumbers);
    updateHistory();
}

function updateHistory() {
    historyList.innerHTML = history.map(numbers => `<li>${numbers.join(', ')}</li>`).join('');
}

generateBtn.addEventListener('click', generateNumbers);
