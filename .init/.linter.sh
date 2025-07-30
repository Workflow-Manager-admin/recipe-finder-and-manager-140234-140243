#!/bin/bash
cd /home/kavia/workspace/code-generation/recipe-finder-and-manager-140234-140243/frontend_react
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

