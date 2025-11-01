#!/bin/bash

echo "========================================"
echo "Tata Capital Loan Chatbot Setup"
echo "========================================"
echo ""

echo "Step 1: Installing Server Dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "Error installing server dependencies!"
    exit 1
fi
echo "Server dependencies installed successfully!"
echo ""

echo "Step 2: Installing Client Dependencies..."
cd ../client
npm install
if [ $? -ne 0 ]; then
    echo "Error installing client dependencies!"
    exit 1
fi
echo "Client dependencies installed successfully!"
echo ""

echo "Step 3: Setting up environment files..."
cd ..
if [ ! -f "server/.env" ]; then
    echo "Creating server .env file..."
    cp server/.env.example server/.env 2>/dev/null
    if [ -f "server/.env" ]; then
        echo "Server .env created! Please update with your MongoDB URI and JWT Secret."
    fi
fi

if [ ! -f "client/.env" ]; then
    echo "Creating client .env file..."
    cp client/.env.example client/.env 2>/dev/null
    if [ -f "client/.env" ]; then
        echo "Client .env created!"
    fi
fi
echo ""

echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Next Steps:"
echo "1. Update server/.env with your MongoDB URI and JWT Secret"
echo "2. Run: cd server && node utils/seedDatabase.js (to seed dummy data)"
echo "3. Start Backend: cd server && npm start"
echo "4. Start Frontend: cd client && npm run dev"
echo ""
echo "For detailed instructions, see README.md"
echo ""
