const data = require('../release-data.json');
const fs = require('fs');

fs.writeFileSync('./CHANGELOG.md', data.reduce((acc, v, i) =>
`${acc}
${v.body}
${i < data.length - 1 && '---' || ''}`, '').trim());
