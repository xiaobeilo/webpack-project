// Prevent mocha from interpreting CSS @import files
require('ignore-styles').default(['.less', '.css']);
require('jsdom-global')()
window.Date = Date