function run() {
	const storeStock = document.getElementById('store-stock-display')
	const transactionHistory = document.getElementById('store-transaction-history')

	// Example of create Element, setting it's content and appending it to dom
	const node = document.createElement('div')
	node.innerHTML = '<p>Hello!</p>'
	storeStock.appendChild(node)
}

run()
