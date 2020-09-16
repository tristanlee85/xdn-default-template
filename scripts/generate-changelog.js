const data = require('../release-data.json');

console.log(data.map(((v, i) => `
  ${v.body}
  ${i < data.length && '---'}
`)));
