
		
var Tesseract = require('tesseract.js')
var filename = extensionMyDoc+'/traceText.png'

Tesseract.recognize(filename)
.progress(function  (p) { console.log('progress', p)  })
.catch(err => console.error(err))
.then(function (result) {
	alert(result.text)
	process.exit(0)
})