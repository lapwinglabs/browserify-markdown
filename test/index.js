var Browserify = require('browserify');
var markdown = require('../');

Browserify(__dirname + '/test.md')
  .transform(markdown())
  .bundle()
  .pipe(process.stdout);
