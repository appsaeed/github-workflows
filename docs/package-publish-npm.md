# Publish npm package using GitHub action

```yml
name: Publish package

on:

  workflow_dispatch:
  
  # The workflow will trigger when git pushes in the main branch
  push:
    branches:
      - main
  # The workflow will trigger when you create a release from GitHub 
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
