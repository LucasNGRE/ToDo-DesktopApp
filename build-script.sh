#!/bin/bash

# Vérifie si on est sur macOS ou Windows
if [[ "$RUNNER_OS" == "macOS" ]]; then
    echo "✅ Running on macOS"
    # Actions spécifiques pour macOS ici
    if [ -z "$GH_TOKEN" ]; then
        echo "❌ GH_TOKEN is NOT set!"
        exit 1
    else
        echo "✅ GH_TOKEN is set."
    fi
elif [[ "$RUNNER_OS" == "Windows" ]]; then
    echo "✅ Running on Windows"
    # Actions spécifiques pour Windows ici
    if [ -z "$GH_TOKEN" ]; then
        echo "❌ GH_TOKEN is NOT set!"
        exit 1
    else
        echo "✅ GH_TOKEN is set."
    fi
else
    echo "❌ Unknown OS"
    exit 1
fi

# Lancer la construction de l'application
echo "⚙️ Building application..."
npm run build
