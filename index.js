/**
 * Module Dependencies
 */

var highlight = require('highlight.js')
var Remarkable = require('remarkable')
var extname = require('path').extname
var s2j = require('string-to-js')
var through = require('through')

/**
 * Export `markdown`
 */

module.exports = markdown

/**
 * Default regexp
 */

var rtype = /^(md|markdown)$/

/**
 * Mappings between remarkable and highlight.js
 */

var language = {
  'js': 'javascript',
  'html': 'xml',
  'shell': 'bash'
}

/**
 * Highlight configuration
 */

highlight.configure({
  tabReplace: '  '
})

/**
 * Default remarkable configuration
 */

var md = new Remarkable({
  html:         true,        // Enable HTML tags in source
  xhtmlOut:     true,        // Use '/' to close single tags (<br />)
  breaks:       true,        // Convert '\n' in paragraphs into <br>
  langPrefix: 'lang ',       // CSS language prefix for fenced blocks
  highlight: function (code, lang) {
    // differences between remarkable and highlight.js
    lang = (language[lang]) ? language[lang] : lang

    // Let's not let syntax highlighting kill anything
    try {
      return lang
        ? highlight.highlight(lang, code).value
        : highlight.highlightAuto(code).value
    } catch(e) {}

    return ''
  }
})

/**
 * Initialize `transform`
 *
 * @param {Object} opts
 */

function markdown (file, opts) {
  if (opts) md.set(opts)
  var type = extension(file)
  if (!rtype.test(type)) return through()

  var data = ''
  return through(write, end)

  // write
  function write (buf) {
    data += buf
  }

  // end
  function end () {
    try {
      var src = s2j(md.render(data))
    } catch (e) {
      this.emit('error', e)
      return
    }

    this.queue(src)
    this.queue(null)
  }
}

/**
 * Get the file extension
 *
 * @param {String} file
 * @return {String}
 */

function extension (file) {
  return extname(file).slice(1)
}
