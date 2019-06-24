const glob = require('glob');
const fs = require('fs');
const path = require('path');
const traverseFiles = require('./traverseFiles');

/*const pathName = path.join(__dirname, '..', 'samples', 'todo', 'App.js');
fs.readFile(pathName, 'utf8', (err, file) => {
  console.log('read from file', file);
});*/
// glob('../samples/todo/?(App.js)', astInit);

const getFile = {
  fileToUpload: function (file) {
    // console.log(file);
    return new Promise((resolve, reject) => {
      traverseFiles(file)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

/*getFile.fileToUpload = function(file) {
  console.log(file);
  // traverseFiles(file)
  //   .then(data => {
  //     console.log(data);
  //   });
};*/

function astInit(err, files) {
  files.forEach(file => {
    traverseFiles(file)
      .then(data => {
        console.log(data);
      })
  });
}

module.exports = getFile;