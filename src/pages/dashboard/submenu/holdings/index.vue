<template>
	<div class="q-pa-sm">
		<p class="q-headline">All Holdings</p>
	<holdings></holdings>
	</div>
</template>

<script type="text/javascript">
	import holdings from 'components/data-table/holdings.vue'
	export default {
		computed: {
			page(){
				return this.$store.getters.page
			},
			perPage(){
				return this.$store.getters.perPage
			}
		},
		created(){
			let data = this
			this.$axios.get(process.env.API + '/holdings?page='+this.page+'&perPage='+this.perPage, {
          		headers: { Authorization: `Bearer ${this.$store.getters.token}`, "Content-Type": 'application/x-www-form-urlencoded', Accept: 'application/json'}
        	})
					.then(function(res){
				       data.$store.dispatch('holdings', res.data.holdings);
				    })
			this.$store.dispatch('GET_COUNTRIES')
		},
		components: {
			holdings
		}
	}
	
</script>