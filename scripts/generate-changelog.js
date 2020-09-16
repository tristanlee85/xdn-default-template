const data = require('../release-data.json');
const fs = require('fs');

fs.writeFileSync('./CHANGELOG.md', data.reduce((acc, v, i) =>
`${acc}
## [${v.tag_name}](${v.html_url}) (${v.published_at.split('T')[0]})
${v.body}
${i < data.length - 1 && '---' || ''}`, '').trim());
