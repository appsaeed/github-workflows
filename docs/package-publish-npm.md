# Publish npm package using github action

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
```