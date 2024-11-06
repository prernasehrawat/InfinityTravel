#!/bin/bash

# Update package index
sudo apt-get update

# Install prerequisites
sudo apt-get install -y curl software-properties-common

# Install Node.js (LTS version) via NodeSource
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install build tools
sudo apt-get install -y build-essential

# Install SQLite
sudo apt-get install -y sqlite3


# Initialize npm project
npm init -y

# Install Express and sqlite3 (for future use)
npm install express sqlite3

# Install nodemon for development (optional)
npm install --save-dev nodemon

# Install packages
npm install cors

npm install uuid

npm install jsonwebtoken

echo "Setup complete. You can start the server by running:"
echo "node server.js"

