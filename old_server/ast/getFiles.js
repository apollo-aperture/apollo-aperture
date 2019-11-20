/*
* This file works with the server to process a file.
* This file may not be necessary because it only returns a promise based on invoking traverseFiles on the file
* which is passed in as an argument to fileToTraverse
*/
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const traverseFiles = require('./traverseFiles');

const getFile = {
  fileToTraverse: function (file) {
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

// OLD CODE
/*const pathName = path.join(__dirname, '..', 'samples', 'todo', 'App.js');
fs.readFile(pathName, 'utf8', (err, file) => {
  console.log('read from file', file);
});*/
// glob('../samples/todo/?(App.js)', astInit);

/*getFile.fileToTraverse = function(file) {
  console.log(file);
  // traverseFiles(file)
  //   .then(data => {
  //     console.log(data);
  //   });
};*/


/*function astInit(err, files) {
  files.forEach(file => {
    traverseFiles(file)
      .then(data => {
        console.log(data);
      })
  });
}*/

module.exports = getFile;