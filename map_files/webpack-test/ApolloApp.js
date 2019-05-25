var glob = require("glob");
//const fs = require('fs');

glob("**/*.js", function (er, files) {
 if(er) console.log("can't find")
 else console.log(files);
})

// console.log("AA")