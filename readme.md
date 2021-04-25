## Smart Activity
### Smart Activity with React, Material-UI, Native Node modules, Webpack, Babel and ExtendScript

this Smart Activity extension creator bootstraps for creating Adobe CC extensions easily with
modern web technologies and with native node.js modules for session logic
and with support for extendscript (host app). It is built in a semi opinionated
way so you can focus on writing your great extensions.

#### how to build
first run `npm  install`, then choose  
- `npm run build:dev` / `npm run build:prod` - will build into `./dist` folder
- `npm run deploy:dev` / `npm run deploy:prod` - will deploy `./dist` folder into the extension folder.
if in dev mode, it will create a **symbolic link**, otherwise it will copy the entire folder.
- `npm run archive` will create a self signed certificate and sign a **ZXP** package ready to publish
- `npm run release:dev` / `npm run release:prod` - will build, deploy and archive (in production)

the output is a `./dist` extension folder
```
dist
    com.package.name/
        index.html
        .debug
        CSXS/
            manifest.xml
        icons/
            favicon.ico    
        node_modules/
        host/
            index.js
        client-dist/
            bundle.js
            main.css
        session-dist/
            bundle.js
        host/
        libs/
            CSInterface.js
```
#### How to install
- for dev mode with chrome debugging, simply `npm run release:dev`
- for prod mode with **zxp** signed package, simply `npm run release:prod`, to install the zxp package,
i advise the following resource:
    - http://install.anastasiy.com/
    - http://zxpinstaller.com/
    - https://github.com/Adobe-CEP/Getting-Started-guides/tree/master/Package%20Distribute%20Install
    - http://uberplugins.cc/help/how-to-install-photoshop-extension/
