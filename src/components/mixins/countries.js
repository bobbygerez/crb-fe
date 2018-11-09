
export default {
	
	created(){
		this.$axios.get(process.env.API + '/countries')
		.then(function(res){
			data.$store.dispatch('countries', res.data.countries);
	    })
	}
	
}