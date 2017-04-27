// Native
const fs = require('fs');
const path = require('path');

// Returns all images from this directory in a SYNC (blocking) way
module.exports = () => fs.readdirSync(__dirname).filter(file => path.extname(file) !== '.js');

// 😢 the code below (asynchronous) cannot be runned by Jest directly
// Returns a promise that resolve in all images from this directory
// (= read the directory and exclude the .js files)
// module.exports = new Promise(resolve => {
//   fs.readdir(__dirname, (err, files) => {
//     resolve(files.filter(file => path.extname(file) !== '.js'));
//   });
// });
