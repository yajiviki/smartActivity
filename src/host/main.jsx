//@include "./JSON.jsx"
//@include "./helper.jsx"

function test_host(obj_string) {
	res = JSON.parse(obj_string);
	return 'hola from extendscript ' + res.name
}

function exportTraceText() {
	// alert("Hello from ExtendScript");
	// alert(app.documents.length);
	if (app.documents.length == 0) { alert("No document in use"); return; }
	if (app.activeDocument.componentChannels.length !== app.activeDocument.channels.length) {
		var docRef = activeDocument;
		var flagImage = activeDocument.path.fsName;
		var theCopy = app.activeDocument.duplicate("textDoc", true);
		activeDocument = theCopy;
		theCopy.selection.load(theCopy.channels.getByName("Alpha 1"), SelectionType.REPLACE, false);
		theCopy.crop(theCopy.selection.bounds);
		var savePath = new File(flagImage + "/traceText.png");
		var saveOpts = {
			quality: 100,
			interlaced: false,
			transparency: true,
			PNG8: false
		};
		exportFile("PNG", savePath, saveOpts, true);
		theCopy.close(SaveOptions.DONOTSAVECHANGES);
		activeDocument = docRef;
		return decodeURI(savePath);
	}
}

// initValidate();

function initValidate() {
	var tempObj = {};
	var actWidth, actHeight;
	var dx = dy = null;
	if (documents.length > 0) {
		if (activeDocument.componentChannels.length !== app.activeDocument.channels.length) tempObj.selectionFrom = "Mask"
		else if (activeDocument.pathItems.length > 0) tempObj.selectionFrom = "Path";
		else { alert("Path/Mask missing in the Document"); tempObj.error = "Error"; return tempObj; }

		makeSelection(tempObj.selectionFrom);
		var SB = activeDocument.selection.bounds;
		// activeDocument.selection.deselect();
		var selWidth = SB[2].value - SB[0].value;
		var selHeight = SB[3].value - SB[1].value;
		if (selWidth >= selHeight) { tempObj.prodType = "Width", actWidth = 950, actHeight = 760 };
		if (selWidth <= selHeight) { tempObj.prodType = "Height", actWidth = 760, actHeight = 950 };

		activeDocument.crop(activeDocument.selection.bounds);
		activeDocument.resizeImage(null, null, 300, ResampleMethod.NONE);
		if (selWidth >= selHeight) {
			activeDocument.resizeImage(new UnitValue(actWidth, 'Px'), null, 300, ResampleMethod.BICUBIC);
			activeDocument.resizeCanvas(new UnitValue(1000, 'Px'), new UnitValue(760, 'Px'), AnchorPosition.MIDDLECENTER);
			dy = 0;
		}
		else {
			activeDocument.resizeImage(null, new UnitValue(actHeight, 'Px'), 300, ResampleMethod.BICUBIC);
			activeDocument.resizeCanvas(new UnitValue(760, 'Px'), new UnitValue(1000, 'Px'), AnchorPosition.MIDDLECENTER);
			dy = 10;
		}

		activeDocument.backgroundLayer.duplicate().name = "Product";
		activeDocument.activeLayer = activeDocument.layers.getByName("Product");
		makeSelection(tempObj.selectionFrom);
		applyLayerMask();
		var docRef = activeDocument;
		var templateReference = new File($.fileName).path + "/resources/generic_template.psd";

		var templateDoc = app.open(new File(templateReference));
		var theCopy = templateDoc.duplicate("MRHI Template");
		templateDoc.close(SaveOptions.DONOTSAVECHANGES);
		activeDocument = theCopy;
		if (tempObj.prodType === "Height") {
			theCopy.layers.getByName("Vertical strip").visible = true;
			theCopy.layers.getByName("Horizontal strip").visible = false;
		} else {
			theCopy.layers.getByName("Vertical strip").visible = false;
			theCopy.layers.getByName("Horizontal strip").visible = true;
		}

		activeDocument = docRef;
		docRef.layers[0].duplicate(theCopy);
		activeDocument = theCopy;
		var productLayer = theCopy.layers.getByName("Product");
		productLayer.move(theCopy.backgroundLayer, ElementPlacement.PLACEBEFORE);
		productLayer.translate(dx, dy);

		return JSON.stringify(tempObj);
	}
}

function variantChange(variantObj) {
	var Obj = JSON.parse(variantObj);
	var folderHV = (Obj.prodType === "Height") ? activeDocument.layerSets.getByName("Vertical strip") : activeDocument.layerSets.getByName("Horizontal strip");
	folderHV.layers.getByName("1 line text").textItem.kind = TextType.PARAGRAPHTEXT;
	folderHV.layers.getByName("1 line text").textItem.contents = Obj.text;
	if (Obj.len > 12 && Obj.prodType === "Height") folderHV.layers.getByName("1 line text").textItem.position = [795, 742];
	else if (Obj.len < 12 && Obj.prodType === "Height") folderHV.layers.getByName("1 line text").textItem.position = [847, 742];
	if (Obj.len > 12 && Obj.prodType === "Width") folderHV.layers.getByName("1 line text").textItem.position = [1, 840];
	else if (Obj.len < 12 && Obj.prodType === "Width") folderHV.layers.getByName("1 line text").textItem.position = [-2.31, 840];
	app.refresh();
}

function sizeChange(variantObj) {
	var Obj = JSON.parse(variantObj);
	activeDocument.layerSets.getByName("Base box text").layerSets.getByName("3 digits text").layers.getByName("value").textItem.contents = Obj.text;
	app.refresh();
}

function measureChange(variantObj) {
	var Obj = JSON.parse(variantObj);
	activeDocument.layerSets.getByName("Base box text").layerSets.getByName("3 digits text").layers.getByName("measure").textItem.contents = Obj.text;
	app.refresh();
}


function makeSelection(selectionFrom) {
	if (selectionFrom === "Mask") activeDocument.selection.load(activeDocument.channels[activeDocument.componentChannels.length], SelectionType.REPLACE, false);
	if (selectionFrom === "Path") activeDocument.pathItems[0].makeSelection(0.3, true, SelectionType.REPLACE);
}

// _showColorPicker({ flag: "", prodType: "Height" });
function _showColorPicker(colorObj) {
	var Obj = JSON.parse(colorObj);
	var folderHV = (Obj.prodType === "Height") ? activeDocument.layerSets.getByName("Vertical strip") : activeDocument.layerSets.getByName("Horizontal strip");
	var myColor = getColorpickerColor();
	if (myColor !== false) {
		newcolor = myColor.rgb.hexValue;
		if (newcolor === null) return; // dialog dismissed		
		if (Obj.flag === "Text") folderHV.layers.getByName("1 line text").textItem.color = myColor;
		else if (Obj.flag === "Text2") {
			if (Obj.type === "sizeFC") {
				activeDocument.activeLayer = activeDocument.layerSets.getByName("Base box text").layers.getByName("3 digits text");
				activeDocument.activeLayer.layers.getByName("value").textItem.color = myColor;
				activeDocument.activeLayer = activeDocument.layerSets.getByName("Base box text").layers.getByName("3 digits text");
				activeDocument.activeLayer.layers.getByName("measure").textItem.color = myColor;
			}
		}
		else {
			if (Obj.type === "variantBC") activeDocument.activeLayer = (Obj.prodType === "Height") ? folderHV.layers.getByName("Vertical background") : folderHV.layers.getByName("Horizontal background");
			if (Obj.type === "sizeBC") activeDocument.activeLayer = activeDocument.layers.getByName("Base box background");
			setColorFillvalue(myColor.rgb.hexValue);
		}
		activeDocument.activeLayer = activeDocument.layers.getByName("Product");
		app.refresh();
		// alert(JSON.stringify(myColor.rgb));
		return JSON.stringify(myColor.rgb);
	}
}

function getColorpickerColor() {
	if (app.showColorPicker()) return app.foregroundColor;
	else return false;
}

function setColorFillvalue(HexcolorValue) {
	(ref1 = new ActionReference()).putEnumerated(sTID("contentLayer"), cTID("Ordn"), cTID("Trgt"));
	(desc1 = new ActionDescriptor()).putReference(cTID("null"), ref1);
	(solidcolor = new SolidColor()).rgb.hexValue = HexcolorValue;
	(desc3 = new ActionDescriptor()).putDouble(cTID("Rd  "), solidcolor.rgb.red);
	desc3.putDouble(cTID("Grn "), solidcolor.rgb.green);
	desc3.putDouble(cTID("Bl  "), solidcolor.rgb.blue);
	(desc2 = new ActionDescriptor()).putObject(cTID("Clr "), cTID("RGBC"), desc3);
	desc1.putObject(cTID("T   "), sTID("solidColorLayer"), desc2);
	app.executeAction(cTID("setd"), desc1, DialogModes.NO);
}