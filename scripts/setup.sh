#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Variables
FRONTEND_DIR="../frontend"
BACKEND_DIR="../backend"

# Install Backend Dependencies
echo "Setting up backend..."
cd $BACKEND_DIR
npm install

# Install Frontend Dependencies
echo "Setting up frontend..."
cd $FRONTEND_DIR
npm install

# Set up MongoDB (if using a local instance)
echo "Setting up MongoDB..."
# You can add commands here to set up your MongoDB database if needed.
# For example, you might want to create a database or seed initial data.

# Return to the original directory
cd ../../scripts

echo "Setup completed successfully!"
