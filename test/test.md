# Browserify Markdown

Browserify plugin for markdown files

```bash
npm install browserify-markdown
```

## Usage

```js example
var Browserify = require('browserify');
var markdown = require('../');

Browserify(__dirname + '/test.md')
  .transform(markdown())
  .bundle()
  .pipe(process.stdout);
```

---
