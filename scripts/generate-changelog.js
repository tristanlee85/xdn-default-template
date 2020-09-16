const fs = require('fs');

if (!process.env.RELEASE_DATA) {
  throw 'RELEASE_DATA env var unavailable. Exiting.'
}

const data = JSON.parse(process.env.RELEASE_DATA);

fs.writeFileSync('./CHANGELOG.md', data.filter(v => !v.draft).reduce((acc, v, i) =>
`${acc}
## [${v.tag_name}](${v.html_url}) (${v.published_at.split('T')[0]})
${v.body}
${i < data.length - 1 && '---' || ''}`, '')
.trim());
