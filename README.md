# Website Starter Kit
The Website Starter Kit includes a complete dev environment using Gulp, Sass, and BrowserSync.

## Version
1.0.0

## Install Dependencies
```
npm install
```

## Libraries Used
* Gulp 4
* BrowserSync
* JQuery
* Scss
* Font Awesome

## Run Dev Server
```
npm start
```

## Coding
All files can be added, edited, and maintained from the dev folder. When a file is saved gulp will copy, compile, compress and minify before adding them to the build folder where they are ready for deployment.

##### Images
Images can be added to the dev/img folder.  
Running cmd `gulp img` will apply lossless compression and place them in the build/img folder.  
*Lossless compression only provides a minimal file size reduction  - recommend tinypng.com for max compression*

## Deployment
When you are ready to deploy, all compiled, minified, and compressed files are in the /build folder. Use an FTP such as FileZilla and transfer all the contents from the build folder to your web host.

## License
This project is licensed under the MIT License.