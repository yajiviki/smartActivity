//@include "./JSON.jsx"

// alert(JSON.stringify(a))

var cTID = function (s) { return app.charIDToTypeID(s); };
var sTID = function (s) { return app.stringIDToTypeID(s); };

var desc0 = new ActionDescriptor();
var desc1 = new ActionDescriptor();
var desc2 = new ActionDescriptor();
var desc3 = new ActionDescriptor();
var ref0 = new ActionReference();

function applyLayerMask() {
	(desc_01 = new ActionDescriptor()).putClass(charIDToTypeID("Nw  "), charIDToTypeID("Chnl"));
	(ref_01 = new ActionReference()).putEnumerated(charIDToTypeID("Chnl"), charIDToTypeID("Chnl"), charIDToTypeID("Msk "));
	desc_01.putReference(charIDToTypeID("At  "), ref_01);
	desc_01.putEnumerated(charIDToTypeID("Usng"), charIDToTypeID("UsrM"), charIDToTypeID("RvlS"));
	executeAction(charIDToTypeID("Mk  "), desc_01, DialogModes.NO);
}

function selectCmpCHN() {
	(ref2 = new ActionReference()).putEnumerated(charIDToTypeID("Chnl"), charIDToTypeID("Chnl"), charIDToTypeID("RGB "));
	(desc8 = new ActionDescriptor()).putReference(charIDToTypeID("null"), ref2);
	desc8.putBoolean(charIDToTypeID("MkVs"), false);
	executeAction(charIDToTypeID("slct"), desc8, DialogModes.NO);
}

// export File as PNG

function exportFile(fileType, destPath, fileAttributes) {
	var doc = app.activeDocument;
	var saveOpts = new ExportOptionsSaveForWeb();

	fileType = typeof fileType === "string" ? fileType : "JPG";
	destPath = typeof destPath === "object" ? destPath : new File(doc.fullName);
	fileAttributes = typeof fileAttributes === "object" ? fileAttributes : undefined;

	switch (true) {
		case /png/i.test(fileType):
			saveOpts.format = SaveDocumentType.PNG;
			if (fileAttributes !== undefined) {
				saveOpts.quality = fileAttributes[0] || fileAttributes.quality;
				saveOpts.interlaced = fileAttributes[1] || fileAttributes.interlaced;
				saveOpts.transparency = fileAttributes[2] || fileAttributes.transparency;
				saveOpts.PNG8 = fileAttributes[3] || fileAttributes.PNG8;
			} else {
				saveOpts.quality = 100;
				saveOpts.interlaced = false;
				saveOpts.transparency = true;
				saveOpts.PNG8 = true;
			}
			break;
		case /jpg/i.test(fileType):
		case /jpeg/i.test(fileType):
			saveOpts.format = SaveDocumentType.JPEG;
			saveOpts.quality = fileAttributes.quality || 100;
			break;
	}

	doc.exportDocument(destPath, ExportType.SAVEFORWEB, saveOpts);
}