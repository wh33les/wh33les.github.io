# This script automates the process of publishing changes to my app.  # Run it while in the learning-react directory.

# Build the project
npm run build

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
