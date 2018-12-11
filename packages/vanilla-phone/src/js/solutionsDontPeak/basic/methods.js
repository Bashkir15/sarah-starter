import { formatPrice } from '../helpers'

const calculateInsufficientFunds = (balance, price) => {
	return formatPrice(price - balance)
}

export function calculateRemainingBalance(balance, stock, tax) {
	const nodeText = stock.reduce((acc, curr) => {
		const { name, price } = curr
		if (balance > price) {
			balance = balance - (price * tax)
			return `${acc} <p>Added ${name} to your cart <br /> ---- Remining Balance ${balance}</p>`
		}
		return `${acc} You can't afford ${name}. You are ${calculateInsufficientFunds(balance, price)} short`
	}, '')
	const node = document.createElement('div')
	node.innerHTML = nodeText
	return node
}

export function displayStock(stock) {
	const containerText = stock.reduce((acc, curr) => {
		const { name, price } = curr
		return `${acc} <li> ${formatPrice(price)} -- ${name} </li>`
	}, 'Items we have for sale <br />')
	const container = document.createElement('div')
	container.innerHTML = containerText
	return container
}
