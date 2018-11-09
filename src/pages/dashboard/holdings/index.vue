<template>
	<div class="q-pa-sm">
		<p class="q-headline">All Holdings</p>
	<holdings></holdings>
	</div>
</template>

<script type="text/javascript">
	import holdings from 'components/data-table/holdings.vue'
	import fetchHoldings from 'components/mixins/holdings.js'
	import fetchCountries from 'components/mixins/countries.js'

	export default {
		mixins: [fetchHoldings, fetchCountries],
		components: {
			holdings
		}
	}
	
</script>