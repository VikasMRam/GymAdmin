'use strict';

const fs = require('fs');
const path = require('path');
const Svgo = require('svgo');

fs.readdirSync(__dirname).forEach(filename => {
  if (!filename.match(/\.svg$/)) return;

  const name = filename.substr(0, filename.length - 4);

  fs.readFile(filename, 'utf8', function(err, data) {
    console.log(name);
    const svgo = new Svgo({
      plugins: [{
        cleanupIDs: {
          prefix: name + '-',
        },
      }],
    });

    if (err) {
      throw err;
    }

    svgo.optimize(data, { path: filename }).then((result) => {
      fs.writeFile(filename, result.data, (err) => {
        if (err) {
          throw err;
        }
      });
    });
  });
});
