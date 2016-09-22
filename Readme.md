
# browserify-markdown

  Browserify transform for markdown files

## Usage

### CLI

```sh
browserify -t [ browserify-markdown ] test/test.js
```

### Example

```js
var str = require('./chapter-1.md');
document.body.appendChild(str);
```

## Installation

```bash
npm install browserify-markdown
```

## License

MIT
