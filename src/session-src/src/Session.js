/**
 * @author Vijay Anand
 */

import scriptLoader from './ScriptLoader'
import DataManagers from './managers/DataManagers.js'

/**
 * the main plugin session. This can enter the node modules as
 * well as the host
 *
 */
class Session {

    _managers = new DataManagers()

    constructor() {
        //super()

        this.init()
    }

    /**
     * init - session
     *
     */
    init() {
        // init before everything so I can intercept console.log
        this._managers.init()
        this.log('session is initing...')
        // load jsx file dynamically
        this.log('loading the main jsx file')
        // scriptLoader.loadJSX('main.jsx')

        // some testing
		// this.test()
		// this.exportTraceText();
		// this.initialValidate();
        // var fs = require('fs-extra')
		//console.log(fs)
        this.log('session is inited')
    }

	exportTraceText(){				
		scriptLoader.evalScript('exportTraceText').then((res) => {
			// alert(res);
			// this.log('result is ' + res)
			// var csInterface = new CSInterface();
			// var extensionMyDoc = csInterface.getSystemPath(SystemPath.MY_DOCUMENTS);						
			// const path = require('path');
			// var filename = path.resolve(extensionMyDoc, 'traceText.png');
			// const recognize = require('tesseractocr')

			// async function main() {
			// 	const text = await recognize(`${__dirname}/traceText.png`)
			// 	console.log('Yay! Text recognized:', text)
			// 	alert(text);
			// }

			// main();
				
		})
	}

	initialValidate(){
		scriptLoader.evalScript('initValidate').then((res) => {			
			var result = JSON.parse(res);			
			
			// if(result.error!==undefined) return;			
			// alert(result.prodType);
		});
	}

	


    /**
     * get data managers
     *
     * @return {type}  description
     */
    get managers() {
        return this._managers
    }

    /**
     * scriptLoader - get the script loader
     *
     */
    scriptLoader() {
        return scriptLoader
    }

    /**
     * test - let's test things
     *
     */
    test() {		
        var obj = {
            name: 'Vijay'
        }

        scriptLoader.evalScript('test_host', obj).then((res) => {
            this.log('result is ' + res)
        })
    }

    /**
     * invoke the plugin
     *
     * @param  {{textures:boolean, masks:boolean, info: boolean, flatten:boolean}} options for plugin
     *
     * @return {object} describes how well the execution of plugin was
     */
    invokePlugin(options) {
        const { folderPath, isFlattenChecked,
                isInfoChecked, isInspectVisibleChecked,
                isMasksChecked, isTexturesChecked,
                isMeaningfulNamesChecked, isHierarchicalChecked} = options

        // i reparse everything to detect failures
        const pluginData = {
            destinationFolder: folderPath,
            exportInfoJson: isInfoChecked,
            inspectOnlyVisibleLayers: isInspectVisibleChecked,
            exportMasks: isMasksChecked,
            exportTextures: isTexturesChecked,
            flatten: !isHierarchicalChecked,
            namePrefix: isMeaningfulNamesChecked ? 'layer' : undefined
        }

        var that = this

        return new Promise((resolve, reject) => {

            scriptLoader.evalScript('invoke_document_worker', pluginData)
                        .then((res) => {
                            resolve(JSON.parse(res))
                        })
                        .catch(err => {
                            reject(err)
                        })

        })

    }

    /**
     * log some info with session prefix
     *
     * @param  {string} val what to log
     */
    log(val) {
        console.log(`${this.name} ${val}`)
    }

    get name() {
        return 'Session:: '
    }

}

var session = new Session()

export default session
