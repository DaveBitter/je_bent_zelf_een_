(function() {
	var app = {
		elements: {
			h1: document.getElementById('je_bent_zelf_een_h1'),
			input: document.getElementById('je_bent_zelf_een_input')
		},
		media: {
			bdt: new Audio('assets/audio/bdt.mp3')
		},
		values: [],
		url: window.location.href,
		listen: function() {
			submitEvent(this.elements.input)
		},
		init: function() {
			app.listen()
			replaceInputValues(this.elements.input)
			this.values = getUrlValues(this.url)
			buildInsult(this.values, this.elements.h1)
			playAudio(this.media.bdt)
		}
	}

	function playAudio(audio) {
		audio.play()
	}

	function getUrlValues() {
		var objects = []
		var hashes = app.url.slice(app.url.indexOf('?') + 1).split('&')
		console.log(hashes)
		for (var i = 0; i < hashes.length; i++) {
			var val = ''
			if (typeof hashes[i].split('=')[1] !== 'undefined') {
				val = iNeedSpace(hashes[i].split('=')[1])
			} else {
				val = "woord"
				app.elements.input.value = app.url + '?q=woord'
			}
			obj = {
				value: val
			}

			objects.push(obj)
		}
		return objects;
	}

	function buildInsult(values, h1) {
		var message = ''

		values.forEach(function(value, i) {
			switch (i) {
				case i = 0:
					message += 'Je bent zelf een '
					message += value.value
					break
				case i = values.length - 1:
					message += ' en een '
					message += value.value
					break
				default:
					message += ", een "
					message += value.value
			}
		})

		message += '!'

		h1.innerHTML += message
	}

	function replaceInputValues(input) {
		input.value = app.url
		input.placeholder = app.url
	}

	function iNeedSpace(string) {
		return string.replace(/%20/g, " ")
	}

	function submitEvent(input) {
		input.addEventListener("keyup", function(e) {
			e.preventDefault()
			if (e.keyCode == 13) {
				window.location = e.target.value
			}
		})
	}
	app.init()
})()