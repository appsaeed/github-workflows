# Use github workflows

This repository provides a testing and useing ground for GitHub Actions and workflows, complete with helpful guidance.

# Summary
[Automiatic FTP Deploy using github action](docs/ftp-deploy.md) <br>
[Deploy to Github pages by github actions](docs/github-pages.md) <br>
[Publish Javascript Package both on NPM and Github package](docs/package-publish.md) <br>
[Publish npm package using github action](docs/package-publish-github.md) <br>
[Github action: tags and releases](docs/release.md) <br>

# Automiatic FTP Deploy using github action

Please visit for more information (https://github.com/marketplace/actions/ftp-deploy)

```yml
name: 🚀 Deploy to Server

on:
  push: 
    branches: 
        - main

jobs:
  your_job_name:
    name: 🎉 Deployment
    runs-on: ubuntu-latest
    steps:

    - name: 🚚 Get latest code
      uses: actions/checkout@v4

    - name: 📂 Sync files
      uses: SamKirkland/FTP-Deploy-Action@v4.3.5
      with:
        server: your_server_name
        username: mdpipubl
        password: ${{ secrets.FTP_PASSWORD }}
        server-dir: '/public_html/'
        exclude: |
          **/.git*
          **/.git*/**
          **/.github/**
          **/node_modules/**
          **/README.md
```

## Ready for Nodejs/Javascript project
```yml
    - name: Install Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20' # Specify your Node.js version here

    - name: Install NPM dependencies
      run: npm install

    - name: Build assets
      run: npm run build
```

## Ready composer for php project 
```yml
    - name: Install PHP and Composer
      uses: shivammathur/setup-php@v2
      with:
        php-version: '8.3' # Specify your PHP version here
        extensions: mbstring, xml, bcmath, gd, curl
        coverage: none

    - name: Install Composer dependencies
      run: composer install --no-interaction --prefer-dist --optimize-autoloader
```
# Deploy to Github pages by github actions 
```yml
# Simple workflow for deploying static content to GitHub Pages
name: Deploy static content to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Single deploy job since we're just deploying
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Set up Node js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
          
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

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
# Github action: tags and releases
```yml
on:
    push:
      tags:
        - 'v*' # Push events to matching v*, i.e. v1.0, v20.15.10  
jobs:
    build:
      name: Create Release
      runs-on: ubuntu-latest
      steps:
        - name: Checkout code
          uses: actions/checkout@v2
        - name: Create Release
          id: create_release
          uses: actions/create-release@v1
          env:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # This token is provided by Actions, you do not need to create your own token
          with:
            tag_name: ${{ github.ref }}
            release_name: Release ${{ github.ref }}
            body: |
              Changes in this Release
              - First Change
              - Second Change
            draft: false
            prerelease: false

```
