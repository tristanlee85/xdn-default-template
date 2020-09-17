const fetch = require('node-fetch')
const fs = require('fs');
const { parse } = require('path');

const [repo, token] = process.argv.slice(2);

if (!repo || !token) {
  throw 'API token or repository not present. Exiting.';
}

fetch(`https://api.github.com/repos/${repo}/releases`, {
  headers: {
    authorization: `token ${token}`
  }
})
  .then(res => res.json())
  .then(data => {
    fs.writeFileSync('./CHANGELOG.md', data.filter(v => !v.draft).reduce((acc, v, i) => `
      ${acc}
      ## [${v.tag_name}](${v.html_url}) (${v.published_at.split('T')[0]})
      ${v.body}
      ${i < data.length - 1 && '---' || ''}
    `, '').trim().replace(/^\s+/gm, ''));
  });
