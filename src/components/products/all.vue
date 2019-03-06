<template>
<div>
    <div class="row">
        <div class="col-12">
            <div class="row">
                <div class="col-6">
                    <q-breadcrumbs class="q-ma-md">
                        <template v-slot:separator>
                            <q-icon size="1.5em" name="chevron_right" color="primary" />
                        </template>
                        <q-breadcrumbs-el icon="home" to="/" />
                        <q-breadcrumbs-el :to="`/${breadCrumb}`" v-for="(breadCrumb, k) in breadCrumbs" :key="k">
                            {{ breadCrumb.replace('-', ' ') | capitalize }}
                        </q-breadcrumbs-el>
                    </q-breadcrumbs>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-2 col-md-2 col-xs-6 col-sm-4" v-for="(product, k) in products.data" :key="k">
            <div onmouseover="this.style.boxShadow='0 0 10px #888888'; this.style.cursor='pointer';" onmouseout="this.style.boxShadow=''; this.style.cursor='auto';" class="q-ml-sm" @click="productNav(product)">
                <q-card class="my-card q-mt-sm q-pa-sm">
                    <img :src="product.images[0].path"  align="center">
                    <div class="text-subtitle1" align="center">{{ product.name | truncate(15) }}</div>
                    <div class="text-subtitle1 text-negative text-weight-medium" align="center">{{ product.price | currency('₱') }}</div>
                    <span class="text-grey-13">Before </span> <span style="text-decoration:line-through;" class="text-grey-13"> {{ product.price | currency('₱') }}</span>
                    &nbsp;
                    <span>-{{ product.discount}}%</span>
                    <q-rating size="20px" v-model="stars" :max="5" />
                </q-card>

            </div>
        </div>
    </div>

    <q-page-scroller expand position="bottom-right" :scroll-offset="150" :offset="[10, 15]">
        <q-btn icon="keyboard_arrow_up" round color="negative"></q-btn>
    </q-page-scroller>
</div>
</template>

<style>
</style>

<script>
import {
  mapState
} from 'vuex'
export default {
  name: 'allProducts',
  data () {
    return {
      stars: 3,
      shadowCard: ''
    }
  },
  methods: {
    productNav (product) {
      console.log(product)
      this.$router.push({
        path: `/products/${product.category_slug_name}/${product.optimus_id}/${product.slug_name}`
      })
    }
  },
  computed: {
    ...mapState('products', ['products']),
    ...mapState('global', ['breadCrumbs'])
  }
}
</script>
