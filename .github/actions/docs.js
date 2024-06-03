import fs from 'fs';
import path from 'path';
import { unSlash } from 'utilies/url';

const files = [
    '/docs/ftp-deploy.md',
    '/docs/github-pages.md',
    '/docs/package-publish.md',
    '/docs/package-publish-github.md',
    '/docs/release.md',
];

const content = files.map(file => {
    try {
        const file_path = path.join(process.cwd(), unSlash(file));
        const data = fs.readFileSync(file_path, 'utf-8');
        const tilte = data.match(/#.*/).join('').replace('# ', '').trim();
        return {
            path: unSlash((file_path).replace(process.cwd(), '')),
            tilte,
            data
        }
    } catch (error) {
        console.log('Error read file: ', error.message)
        return null;
    }
}).filter(Boolean);



const titles = content.filter(i => i?.tilte && i?.path)
    .map(data => `[${data.tilte}](${data.path}) <br>`)
    .filter(Boolean)
    .join('\n');

const description = content.map(item => item?.data)
    .filter(Boolean)
    .join('\n');

const documentions = 
`# Use github workflows

This repository provides a testing and useing ground for GitHub Actions and workflows, complete with helpful guidance.

# Summary
${titles}

${description}
`


fs.writeFile('README.md', documentions, 'utf-8', function(err){

    if (err) {
        console.error(`Error wrting file:`, err);
        return;
    };

    console.log(`complete!`);
});

