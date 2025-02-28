# This script automates the process of publishing changes to my app.  # Run it while in the learning-react directory.

# Build the project
npm run build

# Ensure the build output is available before proceeding
if (-Not (Test-Path ".\build")) {
    Write-Host "Build failed or build directory missing."
    exit 1
}

# Delete the old build files 
Remove-Item -Path ".\static" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".\sounds" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".\asset-manifest.json" -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".\index.html" -Force -ErrorAction SilentlyContinue

# Move the contents of the build folder to the learning-react directory
Move-Item -Path ".\build\*" -Destination "." -Force

# Go up two directories
cd ..\..

# Push changes to the repository
git add --all
git commit -m "Updated the learning-react app."
git push

# Go back to the learning-react directory
cd "Projects/learning-react"

# Deploy the changes
npm run deploy
