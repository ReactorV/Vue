Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img :src="image" :alt="altText">
            </div>

            <div class="product-info">
                <h1>{{title}}</h1>
                <p>{{ description }}</p>
                <p v-if="inventory > 10">In Stock</p>
                <p v-else-if="inventory < 10 && inventory > 0">Almost sold out!</p>
                <p v-else>Out of Stock</p>
                <span v-if="onSale">On Sale!</span>
                <span>Shipping: {{ shipping }}</span>

                <product-details :details="details"></product-details>
              
                <p>Sizes:</p>
                <ul>
                    <li v-for="size in sizes">
                        {{ size }}
                    </li>
                </ul>

                <div v-for="(variant, index) in variants"
                     :key="variant.variantId"
                     class="color-box"
                     :style="{ backgroundColor: variant.variantColor }"
                     @mouseover="updateProduct(index)"
                >
                </div>

                <div class="cart">
                    Cart ({{ cart }})
                </div>

                <button
                    v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
                >
                    Add to cart
                </button>
                <button v-on:click="deleteFromCart">Remove from cart</button>

            </div>
        </div>
    `,
    data() {
        return {
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
        }
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
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }

            return "4.99$"
        }
    }
})

Vue.component('product-details', {
    props: {
        details: []
    },
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
})

const app = new Vue({
    el: '#app',
    data: {
        premium: false
    }
})
