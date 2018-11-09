export default {
	
	created(){
		let data = this
		this.$axios.get(process.env.API + '/holdings?page='+this.page+'&perPage='+this.perPage)
		.then(function(res){
	       data.$store.dispatch('holdings', res.data.holdings);
	    })
	},
	computed:{

		page(){

			return this.$store.getters.page
		},
		perPage(){

			return this.$store.getters.perPage
		}
	}
	
}