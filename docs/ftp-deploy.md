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