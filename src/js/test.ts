class Cart {
	private static instance = null;
	private products = [];

	private constructor () {}

	public static getInstance (): Cart {
		if (null === Cart.instance) {
			Cart.instance = new Cart ();
		}
		return Cart.instance;
	}

	add (id: number): void {
		this.products.push (id);
	}

	remove (id: number): void {
		this.products = this.products.filter (product => id !== product);
	}

	getAll (): Array<number> {
		return this.products;
	}

	findById (id: number) {
		return this.products.filter (product => id === product);
	}
}

const cart = Cart.getInstance ();

cart.add (1);
cart.add (3);
cart.add (4);

cart.remove (3);

console.log (cart.getAll ());