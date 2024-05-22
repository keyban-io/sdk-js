#!/bin/bash

# Run commitlint
npx commitlint --edit $1

# Capture the exit code
EXIT_CODE=$?

# If commitlint failed, print a warning but don't fail the commit
if [ $EXIT_CODE -ne 0 ]; then
  echo "WARNING: Commit message does not meet the conventional commit standards."
  echo "Please consider updating your commit message to follow the conventional commit guidelines."
fi

# Always exit with 0 to not block the commit
exit 0
