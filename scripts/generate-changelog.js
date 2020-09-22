const stdio = require('stdio')
const fetch = require('node-fetch')
const fs = require('fs')

const args = stdio.getopt({
  repo: { key: 'r', args: 1, description: 'Repository name' },
  token: { key: 't', args: 1, description: 'API token' },
  input: { key: 'i', args: 1, description: 'Input file location containing existing markdown' },
  output: { key: 'o', args: 1, description: 'Output file location' },
})

fetch(`https://api.github.com/repos/${args.repo}/releases`, {
  headers: {
    authorization: `token ${args.token}`,
  },
})
  .then(res => res.json())
  .then(data => {
    let output = '';

    // read from an existing input file (if available)
    if (args.input && fs.existsSync(args.input)) {
      output = fs.readFileSync(args.input, 'utf8');
    }

    fs.writeFileSync(
      args.output || './CHANGELOG.md',
      data
        // exclude draft releases
        .filter(v => !v.draft)

        // include only the latest entry if reading from an input file
        .filter((v, i) => {
          if (output.length && i === 0) {
            return true
          }

          return !output.length
        })
        .reduce(
          (acc, v, i) => `
            ${!output.length ? acc : ''}
            ## [${v.tag_name}](${v.html_url}) (${v.published_at.split('T')[0]})
            ${v.body}
            ${(i < data.length - 1 && '---') || ''}
            ${output.length ? acc : ''}
          `,
          output
        )
        .trim()
        .replace(/^\s+/gm, '')
    )
  })
