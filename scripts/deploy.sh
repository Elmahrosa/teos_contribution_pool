#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Variables
FRONTEND_DIR="../frontend"
BACKEND_DIR="../backend"
HEROKU_APP_NAME="your-heroku-app-name"  # Replace with your Heroku app name
VERCEL_PROJECT_NAME="your-vercel-project-name"  # Replace with your Vercel project name

# Deploy Backend to Heroku
echo "Deploying backend to Heroku..."
cd $BACKEND_DIR

# Ensure the latest code is pushed to Heroku
git add .
git commit -m "Deploying backend"
git push heroku main

echo "Backend deployed successfully!"

# Deploy Frontend to Vercel
echo "Deploying frontend to Vercel..."
cd $FRONTEND_DIR

# Build the frontend
npm run build

# Deploy to Vercel
vercel --prod --confirm --name $VERCEL_PROJECT_NAME

echo "Frontend deployed successfully!"

# Return to the original directory
cd ../../scripts

echo "Deployment completed successfully!"
