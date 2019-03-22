<template>
    <div class="row">
        <div class="col-12">
            <p class="text-h5 q-ma-sm">
            <q-icon :name="icon" color="grey" />{{ title }}</p>
        </div>
        <div class="col-4">
            <q-input outlined v-model="accessRight.name" label="Name" class="q-ma-sm" />
        </div>
        <div class="col-12">
            <q-input type="textarea" outlined v-model="accessRight.description" label="Description" class="q-ma-sm" />
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
  props: ['accessRight', 'title', 'icon']
}
</script>
