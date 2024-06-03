```yml
name: Generate README

on:
  push:
    branches:
      - main  # Specify the branch you want to trigger on

jobs:
  generate_readme:
    runs-on: ubuntu-latest

    steps:      
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Read content from file
      id: read_file
      uses: actions/github-script@v4
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        script: |
          const response = await github.repos.getContent({
            owner: 'appsaeed',
            repo: 'appsaeed',
            path: 'README.md', // Specify the path to your README.md file
          });
          const content = Buffer.from(response.data.content, 'base64').toString();
          console.log(content);
          return { file_content: content };
    
    - name: Generate README
      run: |
        echo "${{ steps.read_file.outputs.file_content }}" >> README.md
        
    - name: Commit and push changes
      run: |
        git config --global user.email "actions@github.com"
        git config --global user.name "GitHub Actions"
        git add README.md
        git commit -m "Automatically generated README"
        git push origin main
```