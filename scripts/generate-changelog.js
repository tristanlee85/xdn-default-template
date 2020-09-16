var stdio = require('stdio');
var ops = stdio.getopt({
    'data': {key: 'd', args: 1, required: true, description: 'Release details as JSON'},
});

console.log(ops);
