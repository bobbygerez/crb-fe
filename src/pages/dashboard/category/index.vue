<template>
<div class="q-ma-md">
    <div class="row">
        <div class="col-4">
            <span>{{ allCategories }}</span>
        </div>
    </div>
</div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  data () {
    return {
      selectedCategories: []
    }
  },
  methods: {
    ...mapActions('categories', ['setCategory', 'setCategories']),
    getCategory () {
      this.$axios.get(`/dashboard_categories/${this.$route.params.id}/edit/?id=${this.$route.params.id}`)
        .then(res => {
          this.setCategory(res.data.category)
          this.setCategories(res.data.categories)
        })
    }
  },
  computed: {
    ...mapState('categories', ['category']),
    allCategories () {
      var res = []
      const cb = (e) => {
        res.push({
          id: e.id,
          label: e.name
        })
        e.all_children && e.all_children.forEach(cb)
      }
      this.$store.getters['categories/categories'].forEach(cb)
      return res
    },
    children () {
      var res = []
      const cb = (e) => {
        res.push({
          id: e.id,
          label: e.name
        })
        e.all_children && e.all_children.forEach(cb)
      }
      this.$store.getters['categories/category'].forEach(cb)
      return res
    }
  },
  mounted () {
    this.getCategory()
  }
}
</script>
