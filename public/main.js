window.addEventListener("load", init);

function init() {
	prepUpdate();
	prepDelete();
}

function prepUpdate() {
	var update = document.getElementById('update')
	update.addEventListener('click', function() {
		fetch('quotes', {
			method: 'put', 
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				'name': 'Darth Vadar',
				'quote': 'I find your lack of faith disturbing.' + current()
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

function prepDelete() {
	var del = document.getElementById('delete')
	del.addEventListener('click', function() {
		fetch('quotes', {
			method: 'delete', 
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				'name': 'Darth Vadar',
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

function current() {
	n = new Date();
	return  " - at " + 
		(n.getMonth() + 1) + "/" + 
		n.getDate() + "/" + 
		n.getFullYear() + "@" + 
		n.getHours() + ":" + 
		n.getMinutes() + ":" + 
		n.getSeconds();
}

