const data = require('../release-data.json');

console.log(data.reduce((acc, v, i) =>
`${acc}
${v.body}
${i < data.length - 1 && '---' || ''}`, '').trim());
