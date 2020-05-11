/* eslint-disable */
const fs = require('fs');
const path = require('path');

const { step } = require('estree-walk');
const {
  parseSync: parse,
  loadPartialConfig,
} = require('@babel/core');

const babelOptions = loadPartialConfig({
  sourceType: 'module',
  configFile: path.join(__dirname, '..', '.babelrc'),
}).options;

const walk = function (dir, predicate, done) {
  let results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, predicate, function (err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          if (predicate(file)) {
            results.push(file);
          }
          next();
        }
      });
    })();
  });
};

const dirname = path.resolve(__dirname, '..', 'src');

function isJs(filename) {
  return filename.match(/\.js$/)
    && filename.indexOf('/__mocks__/') === -1
    && filename.substring(filename.length - 10) !== 'stories.js'
    && filename.substring(filename.length - 7) !== 'test.js';
}

function isDir(filename) {
  try {
    const stat = fs.statSync(path.join(dirname, filename));
    return stat.isDirectory();
  } catch(e) {
    return false;
  }
}
function getName(filename) {
  if (!filename.match(/\.js$/)) {
    if (isDir(filename)) {
      return filename.replace(/\/$/, '') + '/index.js';
    } else {
      return filename.replace(/\/$/, '') + '.js';
    }
  }
  return filename;
}

function getImportNodes(node) {
  const nodes = [];

  // Collect nodes that import things
  for (const pending = [node]; pending.length;) {
    const select = pending.shift();

    if (
      // A `import`
      select.type === 'ImportDeclaration') {
      nodes.push(select.source.value);
    }
    if (  // A `require` call
      select.type === 'CallExpression' &&
      (select.callee.name === 'require' || select.callee.type === 'Import') &&
      select.arguments[0].type === 'StringLiteral'
    ) {
      nodes.push(select.arguments[0].value);
    }

    // Walk tree
    step(select, pending);
  }

  return nodes;
}

function getImportsFor(filename, fileMap) {
  const contents = fs.readFileSync(path.join(dirname, filename), { encoding: 'utf-8' });
  const node = parse(contents, babelOptions);
  const importNodes = getImportNodes(node);

  const results = {
    local: [],
    modules: [],
  };

  // console.log(filename, importNodes);
  for (let match of importNodes) {
    if (match.match(/\.png$|\.json$/)) {
      continue;
    }
    if (match.match(/^sly\//)) {
      const name = getName(match.substring(4));
      if (fileMap[name]) {
        fileMap[name].parents.push(filename);
      }
      results.local.push(name);
    } else if (match.match(/^\./)) {
      const filedirname = path.dirname(filename);
      const resolvedmatchname = path.normalize(path.join(filedirname, match));
      const name = getName(resolvedmatchname);
      if (fileMap[name]) {
        fileMap[name].parents.push(filename);
      }
      results.local.push(name);
    } else {
      results.modules.push(match);
    }
  }

  return results;
}

const re = new RegExp(process.argv[2]);
function filterArgRe(files) {
  return files.match(re);
}

const filterArgv = process.argv[2] ? filterArgRe : () => true;

walk(dirname, isJs, (err, results) => {
  if (err) throw err;

  const fileNames = results
    .map(file => file.substring(dirname.length + 1))
    .filter(filterArgv);

  const files = fileNames.map(file => ({
    name: getName(file),
    children: null,
    parents: [],
  }));

  const fileMap = {};
  files.forEach((file) => {
    fileMap[file.name] = file;
  });

  files.forEach((file) => {
    file.children = getImportsFor(file.name, fileMap);
  });

  console.log('files without parents');
  console.log(files
    .filter(file => !file.parents.length)
    .filter(file => file.name.indexOf('/') !== -1)
    .map(f => f.name));
});

