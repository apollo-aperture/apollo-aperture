const traverseFiles = require('../traverse/traverseFiles');

describe('traverse index test', () => {
  it('returns an array', () => {
    const sampleDir = '../samples/spacex/src/**/*.js';
    const result = traverseFiles(sampleDir);
    console.log(result);
  });
});