/**
 * @author Vijay Anand
 */
 
/**
 * load jsx scripts dynamically
 */
class ScriptLoader {
    EvalScript_ErrMessage = "EvalScript error."

    constructor() {
        this.cs = new CSInterface()
    }

    get cs() {
        return this._cs
    }

    set cs(val) {
        this._cs = val
    }

    /**
     * loadJSX - load a jsx file dynamically, this
     * will also load all of it's includes which is desirable
     *
     * @param  {type} fileName the file name
     * @return {type}          description
     */
    loadJSX(fileName) {
        var cs = this.cs
        var extensionRoot = cs.getSystemPath(SystemPath.EXTENSION) + "/host/";

        cs.evalScript('$.evalFile("' + extensionRoot + fileName + '")');
    }

    /**
     * evalScript - evaluate a JSX script
     *
     * @param  {type} functionName the string name of the function to invoke
     * @param  {type} params the params object
     * @return {Promise} a promise
     */
    evalScript(functionName, params) {
        var params_string = params ? JSON.stringify(params) : ''
        var eval_string = `${functionName}('${params_string}')`
        var that = this

        return new Promise((resolve, reject) => {

            var callback = function(eval_res) {
                // console.log('weird' + eval_res)
                if(typeof eval_res === 'string') {
                    // console.log(eval_res)
                    if(eval_res.toLowerCase().indexOf('error') != -1) {
                        that.log('err eval')
                        reject(that.createScriptError(eval_res))

                        return
                    }
                }

                that.log('success eval')

                resolve(eval_res)

                return
            }

            that.cs.evalScript(eval_string, callback)
        })

    }

    createScriptError(reason, data) {
        return {reason, data}
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
        return 'ScriptLoader:: '
	}
	
	variantNameChange(variantObj){		
		scriptLoader.evalScript('variantChange',variantObj);
	}

	sizeChange(variantObj){		
		scriptLoader.evalScript('sizeChange',variantObj);
	}

	measureChange(variantObj){		
		scriptLoader.evalScript('measureChange',variantObj);
	}

	showColorPicker(flag){
		scriptLoader.evalScript('_showColorPicker',flag).then((color) => {			
			var result = JSON.parse(color);
			if(flag.type==="variantBC") document.getElementById("id_variantBC").style.backgroundColor="#"+result.hexValue;
			if(flag.type==="variantFC") document.getElementById("id_variantFC").style.backgroundColor="#"+result.hexValue;
			if(flag.type==="sizeBC") document.getElementById("id_sizeBC").style.backgroundColor="#"+result.hexValue;
			if(flag.type==="sizeFC") document.getElementById("id_sizeFC").style.backgroundColor="#"+result.hexValue;			
		});		
	}

}

var scriptLoader = new ScriptLoader()

export default scriptLoader
