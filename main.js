import "./style.css"

var canvas = document.getElementById("c")
// Check for canvas support
if (canvas.getContext) {
	// Initialization
	function init(image) {
		canvas.width = image.naturalWidth
		canvas.height = image.naturalHeight
		ctx.drawImage(image, 0, 0)
	}

	const grayscale = function () {
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		var data = imageData.data
		for (let i = 0; i < data.length; i += 4) {
			let gray = (data[i] + data[i + 1] + data[i + 2]) / 3
			data[i] = gray
			data[i + 1] = gray
			data[i + 2] = gray
		}
		ctx.putImageData(imageData, 0, 0)
	}

	// [ G, R, B, A ]
	const swapRedAndGreen = function () {
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		var data = imageData.data
		for (let i = 0; i < data.length; i += 4) {
			;[data[i], data[i + 1]] = [data[i + 1], data[i]]
		}
		ctx.putImageData(imageData, 0, 0)
	}

	// [ R, B, G, A ]
	const swapBlueAndGreen = function () {
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		var data = imageData.data
		for (let i = 0; i < data.length; i += 4) {
			;[data[i], data[i + 1], data[i + 2], data[i + 3]] = [data[i], data[i + 1], data[i + 2], data[i + 3]] 
		}
		ctx.putImageData(imageData, 0, 0)
	}

	const invert = function () {
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		var data = imageData.data
		for (let i = 0; i < data.length; i += 4) {
			data[i] = 255 - data[i]
			data[i + 1] = 255 - data[i + 1]
			data[i + 2] = 255 - data[i + 2]
		}
		ctx.putImageData(imageData, 0, 0)
	}
	var ctx = canvas.getContext("2d")
	var img = new Image()
	img.src = "./us.png"
	img.onload = function () {
		init(this)
	}
	document.getElementById("grayscaleBtn").addEventListener("click", grayscale)
	document.getElementById("invertBtn").addEventListener("click", invert)
	document.getElementById("swapBlueAndGreen").addEventListener("click", swapBlueAndGreen)
	document.getElementById("swapRedAndGreen").addEventListener("click", swapRedAndGreen)
	document.getElementById("resetBtn").addEventListener("click", function () {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.drawImage(img, 0, 0)
	})
}
