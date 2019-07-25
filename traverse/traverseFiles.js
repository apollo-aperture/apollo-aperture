const glob = require('glob');
const fs = require('fs');
// create an object to contain the mapping
// accept an input of a file folder location
// use glob to get the files
// for each file, create a map
// return a json object of the mapping

// const globPath = '../samples/spacex/src/**/*.js';

// load the selected directory
function traverseFiles(directory) {
  return new Promise((resolve, reject) => {
    glob(directory, (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
}

module.exports = traverseFiles;
