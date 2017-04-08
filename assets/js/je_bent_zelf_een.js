var elements = {
	h1: document.getElementById('je_bent_zelf_een_h1'),
	input: document.getElementById('je_bent_zelf_een_input')
}

elements.input.value = window.location.href
elements.input.placeholder = window.location.href

buildInsult(getUrlValues(window.location.href))

var audio = new Audio('assets/audio/bdt.mp3');
audio.play();


function getUrlValues() {
	var objects = []
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		var val = ''
		if (typeof hashes[i].split('=')[1] !== 'undefined') {
			val = hashes[i].split('=')[1].replace(/%20/g, " ");
		} else {
			val = "woord"
			elements.input.value = window.location.href + '?q=woord'
		}
		obj = {
			value: val
		}

		objects.push(obj)
	}
	return objects;
}

function buildInsult(values) {
	var message = ''

	for (var i = 0; i < values.length; i++) {
		if (i == 0) {
			message += 'Je bent zelf een '
		} else if (i == values.length - 1) {
			message += ' en een '
		} else if (i !== values.length) {
			message += ", een "
		}

		message += values[i].value
	}
	message += '!'

	elements.h1.innerHTML += message
}

elements.input.addEventListener("keyup", function(e) {
	e.preventDefault();
	if (e.keyCode == 13) {
		window.location = e.target.value
	}
})