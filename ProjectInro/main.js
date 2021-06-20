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
                
                <div>
                    <button
                        v-on:click="addToCart"
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }"
                    >
                        Add to cart
                    </button>
                    <button 
                        v-on:click="removeFromCart"
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }"
                    >
                        Remove from cart
                    </button>
                </div>
                
                <div>
                    <h2>Reviews</h2>
                    <p v-if="!reviews.length">There are no reviews yet.</p>
                    <ul>
                        <li v-for="review in reviews">
                            <p>{{ review.name }}</p>
                            <p>Rating: {{ review.rating }}</p>
                            <p>{{ review.review }}</p>
                        </li>
                    </ul>
                 </div>
                
                <product-review @review-submitted="addReview"></product-review>

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
                    variantQuantity: 5,
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
            reviews: []
        }
    },
    methods: {
        addToCart () {
           this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">

           <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="name">
          </p>
          <p v-if="errorName" class="error">{{ errorName }}</p> 
          
          <p>
            <label for="review">Review:</label>      
            <textarea id="review" v-model="review"></textarea>
          </p>
          <p v-if="errorReview" class="error">{{ errorReview }}</p> 
          
          <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
              <option>5</option>
              <option>4</option>
              <option>3</option>
              <option>2</option>
              <option>1</option>
            </select>
          </p>
          <p v-if="errorRating" class="error">{{ errorRating }}</p>
          
          <p>“Would you recommend this product”</p>
              <div class="recommendations">
                <input type="radio" id="recommend" name="yes" value="true" v-model.boolean="isRecommended">
                <label for="recommend">Yes</label>
              </div>
              <div class="recommendations">
                 <input type="radio" id="notRecommend" name="no" value="" v-model.boolean="isRecommended">
                 <label for="notRecommend">No</label>
              </div>
              
          <p>
            <input type="submit" value="Submit">  
          </p>    
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            isRecommended: null,
            errors: [],
            errorName: "",
            errorRating: "",
            errorReview: ""
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    isRecommended: Boolean(this.isRecommended)
                }

                this.$emit('review-submitted', productReview)

                this.name = null,
                this.review = null,
                this.rating = null,
                this.isRecommended = null,
                this.errorName = "",
                this.errorReview = "",
                this.errorRating = ""
            } else {
                if (!this.name) this.errorName = "Name is required."
                if (!this.review) this.errorReview = "Review is required."
                if (!this.rating) this.errorRating = "Rating is required."
            }
        }
    }
})

const app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        addToCart(id) {
            this.cart.push(id)
        },
        removeFromCart(id) {
            const hasItem = this.cart.findIndex((itemId) => itemId === id)
            if (hasItem !== -1) {
                this.cart.splice(hasItem, 1)
            }
        }
    }
})
