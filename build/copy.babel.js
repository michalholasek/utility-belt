import cpy from 'cpy';

const misc = [
  'test/browser/run.js',
  'test/browser/setup.js',
  'test/browser/index.html'
];

const vendor = [
  'node_modules/mocha/mocha.css',
  'node_modules/mocha/mocha.js',
  'node_modules/chai/chai.js'
];

cpy(misc, 'dist/public', (err) => {
    if (err) console.log(err.message);
});

cpy(vendor, 'dist/public/vendor', (err) => {
    if (err) console.log(err.message);
});
