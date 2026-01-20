#!/bin/bash
set -e

echo "🚀 Starting K1RA application..."
echo "Installing serve..."
npm install -g serve
echo "✅ Serve installed"

echo "📁 Serving dist folder on port 3000..."
exec serve -s dist -l 3000
