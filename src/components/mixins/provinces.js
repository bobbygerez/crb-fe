export default {
	
	preFetch({ store }){
		axios.get('http://localhost/estoreapi/public/api/get-provinces')
		.then(function(res){
	        store.dispatch('provinces', res.data.provinces)
	    })
	}
	
}