var canvas = document.getElementById("c")
if (canvas.getContext) {
	function init(image) {
		canvas.width = image.naturalWidth
		canvas.height = image.naturalHeight
		ctx.drawImage(image, 0, 0)
	}

	const grayscaleMedian = function () {
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		var data = imageData.data

		for (let i = 0; i < data.length; i += 4) {
			let gray = (data[i] + data[i + 1] + data[i + 2]) / 3
			data[i] = gray
			data[i + 1] = gray
			data[i + 2] = gray
		}
		writeImageToCanvas(imageData)
	}

	const grayscaleFormula = function () {
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		var data = imageData.data

		for (let i = 0; i < data.length; i += 4) {
			let gray = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]
			data[i] = gray
			data[i + 1] = gray
			data[i + 2] = gray
		}

		writeImageToCanvas(imageData)
	}
	const BW = function () {
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		var data = imageData.data

		for (let i = 0; i < data.length; i += 4) {
			if (data[i] + data[i + 1] + data[i + 2] < 765 / 2) {
				data[i] = 0
				data[i + 1] = 0
				data[i + 2] = 0
			} else {
				data[i] = 255
				data[i + 1] = 255
				data[i + 2] = 255
			}
		}

		writeImageToCanvas(imageData)
	}

	// [ G, R, B, A ]
	const swapRedAndGreen = function () {
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		var data = imageData.data
		for (let i = 0; i < data.length; i += 4) {
			data[i + 1] = data[i] // R -> G
			data[i] = data[i + 1] // G -> R
			data[i + 2] = data[i + 2] // B
			data[i + 3] = data[i + 3] // A
		}
		writeImageToCanvas(imageData)
	}

	// [ R, B, G, A ]
	const swapBlueAndGreen = function () {
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		var data = imageData.data
		for (let i = 0; i < data.length; i += 4) {
			data[i] = data[i] // R
			data[i + 1] = data[i + 2] // G -> B
			data[i + 2] = data[i + 1] // B -> G
			data[i + 3] = data[i + 3] // A
		}
		writeImageToCanvas(imageData)
	}

	const halfGreen = function () {
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		var data = imageData.data

		const height = canvas.height
		const width = canvas.width

		var tr = new Array(width).fill().map(() => Array(height))
		var tg = new Array(width).fill().map(() => Array(height))
		var tb = new Array(width).fill().map(() => Array(height))
		var ta = new Array(width).fill().map(() => Array(height))

		// copie des valeurs
		for (var y = 0; y < height; y++) {
			for (var x = 0; x < width; x++) {
				tr[x][y] = data[x * 4 + y * (width * 4) + 0]
				tg[x][y] = data[x * 4 + y * (width * 4) + 1]
				tb[x][y] = data[x * 4 + y * (width * 4) + 2]
				ta[x][y] = data[x * 4 + y * (width * 4) + 3]
			}
		}

		// TRAITEMENT / APPLICATION D'UN FILTRE
		// mise en rouge de la moitier gauche
		for (var y = 0; y < height / 2; y++) {
			for (var x = 0; x < width; x++) {
				// console.log(x% 10)
				// tr[x][y] = 0
				tg[x][y] = x % 10 == 0 ? 255 : tg[x][y]
				// tb[x][y] = 255
				ta[x][y] = 255
			}
		}

		// RETOUR EN 1D POUR AFFICHER LES MODIFICATIONS
		// 4 tab 2D (r,g,b,a) -> 1 tab 1D POUR METTRE A JOUR L'IMAGE
		for (var y = 0; y < height; y++) {
			for (var x = 0; x < width; x++) {
				data[x * 4 + y * (width * 4) + 0] = tr[x][y]
				data[x * 4 + y * (width * 4) + 1] = tg[x][y]
				data[x * 4 + y * (width * 4) + 2] = tb[x][y]
				data[x * 4 + y * (width * 4) + 3] = ta[x][y]
			}
		}

		// for (let i = 0; i < data.length / 2; i += 4) {
		// 	data[i] = 0 // R
		// 	data[i + 1] = 255 // G -> B
		// 	data[i + 2] = 0 // B -> G
		// 	// data[i + 3] = data[i + 3] // A
		// }
		writeImageToCanvas(imageData)
	}

	const invert = function () {
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		var data = imageData.data
		for (let i = 0; i < data.length; i += 4) {
			data[i] = 255 - data[i]
			data[i + 1] = 255 - data[i + 1]
			data[i + 2] = 255 - data[i + 2]
		}
		writeImageToCanvas(imageData)
	}
	const addBrightness = function () {
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		var data = imageData.data
		for (let i = 0; i < data.length; i += 4) {
			data[i] = data[i] + 50
			data[i + 1] = data[i + 1] + 50
			data[i + 2] = data[i + 2] + 50
		}
		writeImageToCanvas(imageData)
	}
	const reduceBrightness = function () {
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		var data = imageData.data
		for (let i = 0; i < data.length; i += 4) {
			data[i] = data[i] - 50
			data[i + 1] = data[i + 1] - 50
			data[i + 2] = data[i + 2] - 50
		}
		writeImageToCanvas(imageData)
	}

	const RBGNoise = function () {
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		var data = imageData.data
		for (let i = 0; i < data.length; i += 4) {
			data[i] = data[i] + Math.floor(Math.random() * 255)
			data[i + 1] = data[i + 1] + Math.floor(Math.random() * 255)
			data[i + 2] = data[i + 2] + Math.floor(Math.random() * 255)
			data[i + 3] = data[i + 3] + Math.floor(Math.random() * 255)
		}
		writeImageToCanvas(imageData)
	}

	// function convolute (imgd, ){

	// }

	function writeImageToCanvas(imageData) {
		ctx.putImageData(imageData, 0, 0)
		setPalette(imageData)
	}

	function samplepalette2(numberofcolors, imgd) {
		let idx
		const palette = []
		const ni = Math.ceil(Math.sqrt(numberofcolors))
		const nj = Math.ceil(numberofcolors / ni)
		const vx = imgd.width / (ni + 1)
		const vy = imgd.height / (nj + 1)
		for (let j = 0; j < nj; j += 1) {
			for (let i = 0; i < ni; i += 1) {
				if (palette.length === numberofcolors) {
					break
				} else {
					idx = Math.floor((j + 1) * vy * imgd.width + (i + 1) * vx) * 4
					palette.push({
						r: imgd.data[idx],
						g: imgd.data[idx + 1],
						b: imgd.data[idx + 2],
						a: imgd.data[idx + 3],
					})
				}
			}
		}

		return palette
	}

	function setPalette(imgd) {
		let palette = samplepalette2(4, imgd)
		const squares = document.querySelectorAll(".palette-container div")

		squares.forEach((square, index) => {
			square.style.backgroundColor = `rgba(${palette[index].r}, ${palette[index].g}, ${palette[index].b}, ${palette[index].a})`
		})
		console.log(palette)
	}

	var ctx = canvas.getContext("2d")
	var img = new Image()
	img.src = "./us.png"
	img.onload = function () {
		init(this)
	}
	document.getElementById("BW").addEventListener("click", BW)
	document.getElementById("grayscaleMedian").addEventListener("click", grayscaleMedian)
	document.getElementById("grayscaleFormula").addEventListener("click", grayscaleFormula)
	document.getElementById("invertBtn").addEventListener("click", invert)
	document.getElementById("RBGNoise").addEventListener("click", RBGNoise)
	document.getElementById("addBrightness").addEventListener("click", addBrightness)
	document.getElementById("reduceBrightness").addEventListener("click", reduceBrightness)
	document.getElementById("swapBlueAndGreen").addEventListener("click", swapBlueAndGreen)
	document.getElementById("swapRedAndGreen").addEventListener("click", swapRedAndGreen)
	document.getElementById("halfGreen").addEventListener("click", halfGreen)
	document.getElementById("resetBtn").addEventListener("click", function () {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.drawImage(img, 0, 0)
	})
}
