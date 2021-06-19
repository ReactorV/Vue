const app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        description: 'A good socks for developers',
        image: './green-socks.png',
        altText: 'A pair of socks',
        onSale: true,
        inStock: true,
        inventory: 2,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: './green-socks.png'
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: './blue-socks.png'
            }
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        cart: 0
    },
    methods: {
        addToCart () {
            this.cart += 1
        },
        deleteFromCart() {
            if (this.cart > 0) {
                this.cart -= 1
            }
        },
        updateProduct(product) {
            this.image = product
        }
    }
})
