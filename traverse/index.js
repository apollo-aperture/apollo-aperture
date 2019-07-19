const glob = require('glob');
const fs = require('fs');
// create an object to contain the mapping
// accept an input of a file folder location
// use glob to get the files
// for each file, create a map
// return a json object of the mapping

const globPath = '../samples/spacex/src/**/*.js';

// load the selected directory
function globAction(err, files) {
  if (err) {
    return err;
  }
  files.forEach(el => {
    console.log(el);
  });
}

glob(globPath, globAction);
// const app = 'foo';
//
// module.exports = function init() {
//   return app;
// };
