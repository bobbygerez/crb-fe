<template>
	<div class="q-pa-sm">
		<p class="q-headline">All Holdings</p>
	<holdings></holdings>
	</div>
</template>

<script type="text/javascript">
	import holdings from 'components/data-table/holdings.vue'
	export default {
		created(){
			this.$store.dispatch('GET_HOLDINGS')
			this.$store.dispatch('GET_COUNTRIES')
		},
		components: {
			holdings
		}
	}
	
</script>