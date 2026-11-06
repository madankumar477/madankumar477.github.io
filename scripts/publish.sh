#!/usr/bin/env bash
# One-click publish: builds locally to catch errors, then pushes to GitHub.
# GitHub Actions rebuilds and the live site updates in ~1-2 minutes.
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build
git add -A
if git diff --cached --quiet; then
  echo "Nothing changed - live site is already up to date."
  exit 0
fi
git commit -q -m "${1:-Update portfolio ($(date '+%Y-%m-%d %H:%M'))}"
git push -q origin main
echo "Pushed. Live in ~1-2 min: https://madankumar477.github.io/"
