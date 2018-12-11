import createStore from './Store'
import Customer from './Customer'

export default function run() {
	const customer = new Customer()
	const store = createStore(customer)
}

run()
