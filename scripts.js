const Modal = {
    open() {
        // Abrir modal
        // Adicionar a class active ao modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')

    },
    close() {
        // fechar o modal
        // remover a class active do modal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    },
}


const transactions = [{
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021',
},
{
    id: 2,
    description: 'Website',
    amount: 50000,
    date: '23/01/2021',
},
{
    id: 3,
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021',
},
]


const transaction = {
    all: transactions,
    add(transaction) {
        transaction.all.push(transaction)

        App.reload()
    },
    incomes() {
        let income = 0;
        transactions.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount;
            }
        })
        return income;

    },
    expenses() {
        let expense = 0;
        transactions.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            }
        })
        return expense;

    },
    total() {
        return transaction.incomes() + transaction.expenses();

    },
}
  

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {
        const CSSClass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)
        const HTML = `                 
            <td class="description">${transaction.description}</td>
            <td class="$(CSSClass)">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação">
            </td>
        `
        return HTML
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    },
}


const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    },
}


const App = {
    init() {
        transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })
        DOM.updateBalance()
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}


transactions.forEach(function (transaction) {
    DOM.addTransaction(transaction)
})


DOM.updateBalance()