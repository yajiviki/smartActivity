const path = require('path')
const root = __dirname
const srcFolder = path.join(root, "src")
const destFolder = path.join(root, "dist")
const certPath = path.join(destFolder, "cert.p12")
module.exports = {
    extensionBundleId: 'com.smartactivity.sa',
    extensionBundleName: 'smartActivity',
    extensionBundleVersion: '1.0.1',
    cepVersion: '7.0',
    panelName: 'Smart Activity',
    width: '450',
    height: '665',
    root: root,
    sourceFolder: srcFolder,
    destinationFolder: destFolder,
    certificate : {
        customCert: {
            path: '',
            password: 'password'
        },
        selfSign: {
            country: 'UK',
            province: 'CA',
            org: 'org',
            name: 'name',
            password: 'Welc0me$',
            locality: 'locality',
            orgUnit: 'orgUnit',
            email: 'yajiv@email.com',
            output: certPath
        }

    }

}
