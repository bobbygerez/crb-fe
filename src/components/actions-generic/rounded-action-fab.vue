<template>
  <q-page-sticky
    position="bottom"
    :offset="$q.theme === 'mat' ? [16, 16] : [16, 16]"
    v-bind="$attrs"
  >
    <transition
      appear
      enter-active-class="animated fadeInUpBig"
      leave-active-class="animated fadeOutDownBig"
    >
      <q-btn
        v-show="show"
        v-bind="$attrs"
        :rounded="rounded"
        :color="color"
        :icon="icon"
        @click="$emit('fab-click')"
      />
    </transition>
  </q-page-sticky>
</template>

<script>
export default {
  name: 'rounded-action-fab',
  inheritAttrs: false,
  props: {
    show: {
      type: Boolean,
      default: () => true
    },
    icon: {
      type: String,
      default: 'mdi-plus'
    },
    color: {
      type: String,
      default: 'primary'
    },
    rounded: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style>
</style>
