<template>
  <q-card inline class="q-ma-sm" style="width: 265px">
    <q-card-media>
      <img :src="item.item.images[0].path">
    </q-card-media>
    <q-card-title class="relative-position">
      <q-btn fab color="primary" icon="shopping_cart" class="absolute" style="top: 0; right: 8px; transform: translateY(-50%);" />

      <div class="ellipsis">{{ item.item.name }}</div>
      <q-rating slot="subtitle" v-model="stars" :max="5" />
      <div class="row items-center text-faded q-caption">
        <q-icon name="place" /> {{ item.province.provDesc }}
      </div>
    </q-card-title>
    <q-card-main>
      <p>{{ item.item.amount |currency('₱') }}</p>
      <p class="text-faded">{{ item.item.short_desc }}</p>
    </q-card-main>
    <q-card-separator />
    <q-card-actions>
      <q-btn flat icon="favorite" color="red" label="wishlist" />
      <q-btn flat icon="more" color="positive" label="more" />
    </q-card-actions>
  </q-card>
</template>
<script type="text/javascript"></script>
<script>
export default {
  props: ['item'],
  data () {
    return {
      stars: 3,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
}
</script>

<style lang="stylus">
.card-examples {
  .q-card {
    width: 300px;
  }

  .bigger {
    width: 450px;
    max-width: 90vw;
  }

  @media (max-width: $breakpoint-xs-max) {
    .q-card {
      width: 100%;
    }
  }
}
</style>
