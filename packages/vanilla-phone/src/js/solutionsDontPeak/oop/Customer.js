import { DEFAULT_BALANCE } from '../constants'

export default class Customer {
	constructor(balance = DEFAULT_BALANCE) {
		this.balance = balance
		this.balanceDisplay = document.getElementById('')
		this.balanceInput = document.getElementById('')
		this.balanceSubmit = document.getElementById('')

		this.init()
	}

	init() {
		this.balanceSubmit.addEventListener('click', () => {
			this.balance = this.balanceInput.value
		})
	}

	updateBalance = ({ name, price }) => {
		const node = document.createElement('div')

		if (this.balance > price) {
			this.balance = this.balance - price
			node.innerHTML = `Added ${name} to your cart <br /> --- Remaining Balance: ${this.balance}`
		} else {
			node.innerHTML = `You can't afford ${name}`
		}

		this.balanceDisplay.appendChild(node)
	}
}
