const glob = require('glob');
// const globPath = '../samples/spacex/src/**/*.js';

// load the selected directory and create an array of file names
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
