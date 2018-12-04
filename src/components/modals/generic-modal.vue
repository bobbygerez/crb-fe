<template>
  <q-modal
    ref="genericModal"
    :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    @hide="$emit('hide')"
    v-bind="$attrs"
    v-model="madel"
  >
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn
          flat
          round
          dense
          @click="$refs.genericModal.hide()"
        >
          <q-icon name="mdi-arrow-left" />
        </q-btn>
        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>
      </q-toolbar>
      <!-- Body will be appended here thru slot -->
      <slot />
    </q-modal-layout>
  </q-modal>
</template>

<script>

export default {
  computed: {
    madel: {
      get () {
        // get current props value
        return this.model
      },
      set () {
        // do nuffin
      }
    }
  },
  name: 'generic-modal',
  props: {
    params: [String, Object],
    title: String,
    model: [String, Boolean, Object]
  },
  methods: {
    show () {
      this.$refs.genericModal.show()
    },
    hide () {
      this.$refs.genericModal.hide()
    }
  }
}

</script>

<style>
</style>
