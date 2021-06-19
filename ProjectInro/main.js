const app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        brand: 'Vue Mastery',
        description: 'A good socks for developers',
        altText: 'A pair of socks',
        inventory: 2,
        selectedVariant: 0,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: './green-socks.png',
                variantQuantity: 0,
                variantOnSale: true

            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: './blue-socks.png',
                variantQuantity: 10,
                variantOnSale: false
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
        updateProduct(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        onSale() {
            return this.variants[this.selectedVariant].variantOnSale
        }
    }
})
