<template>
<q-page class="docs-input row ">
    <div class="col-5">
        <div class="q-pa-md">
            <q-carousel swipeable animated v-model="slide" thumbnails infinite>
                <q-carousel-slide :name="k+1" :img-src="image.path" v-for="(image, k) in product.images" :key="k" />
            </q-carousel>
        </div>

    </div>
    <div class="col-4">
        <p class="text-h5 q-mt-md">{{ product.name }}</p>
        <q-rating size="20px" v-model="stars" :max="5" class="q-ma-sm" /> 17 ratings
        <p>Brand: Sample Brand</p>
        <q-separator />
        <p class="text-h4 text-negative q-mt-md">{{ product.price | currency('₱') }}</p>
        <span class="text-grey-13">Before </span>
        <span style="text-decoration:line-through;" class="text-grey-13"> {{ product.price | currency('₱') }}</span>
        &nbsp;<span>-{{ product.discount}}%</span>
        <div style="max-width: 120px" class="q-mt-md">
            <q-input bottom-slots v-model="qty" counter maxlength="2" :dense="dense">
                <template v-slot:prepend>
                    <q-btn round dense flat icon="remove" class="text-grey" @click="subQty" />
                </template>

                <template v-slot:hint>
                    Add Quantity
                </template>

                <template v-slot:append>
                    <q-btn round dense flat icon="add" class="text-grey" @click="addQty" />
                </template>
            </q-input>
        </div>
        <br />
        <q-btn icon="shopping_cart" color="secondary" label="Add to Cart" @click="addCart" />

    </div>
    <div class="col-3 q-mt-md">
        Delivery Options
    </div>
    <div class="col-12">
        <q-separator />
        <div class="q-pa-sm">
            <p>{{ product.desc }} </p>
        </div>
    </div>
    <q-ajax-bar ref="bar" position="bottom" color="accent" size="10px" skip-hijack />
</q-page>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  data () {
    return {
      slide: 1,
      stars: 3,
      dense: false
    }
  },
  computed: {
    ...mapState('products', ['product']),
    qty: {
      get () {
        let qty = this.$store.getters['global/qty']
        if (isNaN(qty)) {
          return 1
        } else {
          return qty
        }
      },
      set (val) {
        if (isNaN(val) || val === '') {
          this.setQty(1)
        } else {
          this.setQty(val)
        }
      }
    }
  },
  methods: {
    ...mapActions('products', ['setProduct']),
    ...mapActions('global', ['setQty', 'setCart']),
    getProduct () {
      this.$refs.bar.start()
      this.$axios.get(`/products/${this.$route.params.id}?id=${this.$route.params.id}`)
        .then(res => {
          this.$refs.bar.stop()
          this.setProduct(res.data.product)
        })
    },
    addQty () {
      if (this.qty < 0) {
        this.qty = 1
      } else {
        this.qty += 1
      }
    },
    subQty () {
      if (this.qty < 1) {
        this.qty = 1
      } else {
        this.qty -= 1
      }
    },
    addCart () {
      this.setCart({
        product: this.product,
        qty: this.qty
      })
      this.$q.notify({
        message: `${this.qty} ${this.product.name} added in your cart.`,
        color: 'positive',
        icon: 'check'
      })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
