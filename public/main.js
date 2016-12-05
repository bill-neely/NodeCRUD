window.addEventListener("load", init);

function init() {
	var update = document.getElementById('update')
	update.addEventListener('click', function() {
		fetch('quotes', {
			method: 'put', 
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				'name': 'Darth Vadar',
				'quote': 'I find your lack of faith disturbing.'
			})
		})
		.then(res => {
			if (res.ok) return res.json()
		})
		.then(data => {
			console.log(data)
			window.location.reload(true)
		})
	})
}

