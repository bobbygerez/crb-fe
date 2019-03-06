<template>
 <span>
  <all-products></all-products>
  <q-page-sticky position="bottom" :offset="$q.theme === 'mat' ? [16, 16] : [16, 16]" v-bind="$attrs">
        <transition appear enter-active-class="animated fadeInUpBig" leave-active-class="animated fadeOutDownBig" size="lg">
            <q-pagination class="bg-red-1" size="md" v-model="page" color="negative" :min="1" :max="products.last_page" :max-pages="6" boundary-links />
        </transition>
    </q-page-sticky>
    <q-ajax-bar
      ref="bar"
      position="bottom"
      color="accent"
      size="10px"
      skip-hijack
    />
 </span>
</template>
<script>
import allProducts from 'components/products/all'
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  name: 'categoryProducts',
  meta () {
    return {
      title: this.category ? this.category.name : ''
    }
  },
  components: {
    allProducts
  },
  computed: {
    ...mapState('categories', ['category']),
    ...mapState('products', ['products']),
    page: {
      get () {
        return this.$store.getters['users/page']
      },
      set (val) {
        this.setPage(val)
      }
    }
  },
  methods: {
    ...mapActions('categories', ['setCategory']),
    ...mapActions('products', ['setProducts']),
    ...mapActions('users', ['setPage']),
    ...mapActions('global', ['setBreadCrumbs']),
    getProducts () {
      this.$refs.bar.start()
      this.$axios.get(`/category_products?catId=${this.$route.params.id}&page=${this.page}&perPage=30`)
        .then(res => {
          this.$refs.bar.stop()
          this.setProducts(res.data.products)
          this.setCategory(res.data.category)
        })
      let breadCrumbs = this.$router.currentRoute.path.split('/')
      breadCrumbs.shift()
      breadCrumbs.splice(-2, 1)
      this.setBreadCrumbs(breadCrumbs)
    }
  },
  mounted () {
    this.getProducts()
  },
  watch: {
    '$route' (to, from) {
      this.getProducts()
    },
    'page' (val) {
      this.getProducts()
    }
  }
}
</script>
