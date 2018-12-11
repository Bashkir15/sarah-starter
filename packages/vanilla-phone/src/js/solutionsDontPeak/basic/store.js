import { DEFAULT_BALANCE, DEFAULT_STOCK, DEFAULT_TAX } from '../constants'
import { calculateRemainingBalance, displayStock } from './methods'

export default function createStore(balance = DEFAULT_BALANCE, stock = DEFAULT_STOCK, tax = DEFAULT_TAX) {
	const submitBalance= document.getElementById('store-balance-submit')
	const stockDisplay = document.getElementById('store-stock-display')
	const purchaseButton = document.getElementById('store-purchase-all')
	
	purchaseButton.addEventListener('click', () => {
		purchaseItems(balance, stock, tax)
	})
	submitBalance.addEventListener('click', () => {
		const value = document.getElementById('store-balance-input').value
		balance = Number(value)
	})

	const storeStock = displayStock(stock)
	stockDisplay.appendChild(storeStock)
}

function purchaseItems(balance, stock, tax) {
	const container = document.getElementById('store-transaction-history')
	const transactionHistory = calculateRemainingBalance(balance, stock, tax)
	container.appendChild(transactionHistory)
}
