import { DEFAULT_STOCK, DEFAULT_TAX } from '../constants'
import { formatPrice } from'../helpers

class Store {
	constructor(currentCustomer = null, stock = DEFAULT_STOCK, tax = DEFAULT_TAX) {
		this.currentCustomer = currentCustomer
		this.stock = stock
		this.tax = tax

		this.stockDisplay = document.getElementById('store-stock-display')
		this.transactionHistory = document.getElementById('store-transaction-history')
		this.purchaseTrigger = document.getElementById('store-purchase-all')

		this.init()
	}

	init() {
		this.displayStock()
		this.purchaseTrigger.addEventListener('click', this.purchaseItems)
	}

	addCustomer = customer => {
		this.currentCustomer = customer
	}

	removeCustomer = () => {
		this.currentCustomer = null
	}

	purchaseItems = () => {
		this.stock.forEach(item => {
			const copy = { ...item }
			copy.price = copy.price * this.tax
			this.currentCustomer.updateBalance(copy)
		})
	}

	displayStock = () => {
		const nodeText = this.stock.reduce((acc, { name, price }) => {
			return `${acc} ${formatPrice(price)} ${name}`
		})
		const node = document.createElement('div')
		node.innerHTML = nodeText
		this.stockDisplay.appendChild(node)
	}
}

export default function createStore(customer, stock, tax) {
	return new Store(customer, stock, tax)
}
