# Publish Javascript Package both on NPM and Github package

```yml
name: Publish package

on:

  workflow_dispatch:
  
  # the workflow will triger when git push in main branche
  push:
    branches:
      - main
  # the workflow will triger when your create release from github 
  release:
    types: [published]

jobs:
  publish-npm:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # Setup .npmrc file to publish to npm
      - uses: actions/setup-node@v4
        with:
          node-version: "20.x"
          registry-url: "https://registry.npmjs.org"
      - run: npm run build
      - run: npm publish  --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
          # your npm token

  publish-github:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20.x"
          registry-url: https://npm.pkg.github.com/
          # scope: "@your_username"

      - run: npm config set registry https://npm.pkg.github.com
      - run: npm run build
      - run: |
          node <<EOF
          const fs = require('fs');
          const pkg = require('./package.json');
          const _content = { ...pkg, name: '@your_username/your_package_name' };
          fs.writeFile('package.json', JSON.stringify(_content), 'utf-8', (err) => {
              if (err) {
                  console.warn(err)
                  process.exit(0);
              };
          })
          EOF
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.your_github_token }} 
          # the token must have permission to read write package
```