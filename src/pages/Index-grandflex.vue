<template>
  <div>
    <q-search inverted-light color="white" v-model="terms">
      <q-autocomplete @search="search" :max-results="2" @selected="selected" />
    </q-search>
    <q-page class="flex flex-center">
      <item-card v-for="(item, i) in items.data" :key="i" v-bind:item="item"></item-card>
    </q-page>
  </div>
</template>
<style>
</style>

<script>

// import auth from 'components/mixins/auth'
import itemCard from 'components/card/item'
// import axios from 'axios'
import countries from 'assets/autocomplete.json'
import { uid, filter } from 'quasar'

const icons = ['alarm', 'email', 'search', 'build', 'card_giftcard', 'perm_identity', 'receipt', 'schedule', 'speaker_phone', 'archive', 'weekend', 'battery_charging_full']
function getRandomIcon () {
  return icons[Math.floor(Math.random() * icons.length)]
}
function getRandomStamp () {
  if (Math.floor(Math.random() * 50) % 3 === 0) {
    return `${Math.floor(Math.random() * 10)} min`
  }
}
function getRandomSecondLabel () {
  if (Math.floor(Math.random() * 50) % 4 === 0) {
    return `UID: ${uid().substring(0, 8)}`
  }
}

function parseCountries () {
  return countries.map(country => {
    return {
      label: country,
      sublabel: getRandomSecondLabel(),
      icon: getRandomIcon(),
      stamp: getRandomStamp(),
      value: country
    }
  })
}

export default {
  name: 'PageIndex',
  data: () => ({
    dropdown: false,
    terms: '',
    terms2: '',
    terms3: '',
    countries: parseCountries(),
    chips1: ['Romania', 'Algeria'],
    chips2: ['Bahamas', 'Costa Rica']
  }),
  components: {
    itemCard
  },
  computed: {
    items () {
      return this.$store.getters.items
    }
  },
  methods: {
    splitClick () {
      this.$q.notify({
        position: 'right',
        message: 'Hey, why did you click on me?'
      })
    },
    showNotification () {
      this.$q.notify('Option selected & closed dropdown')
    },
    search (terms, done) {
      setTimeout(() => {
        done(filter(terms, { field: 'value', list: parseCountries() }))
      }, 1000)
    },
    selected (item) {
      this.$q.notify(`Selected suggestion "${item.label}"`)
    },
    duplicate (label) {
      this.$q.notify(`"${label}" already in list`)
    }
  }
}
</script>
