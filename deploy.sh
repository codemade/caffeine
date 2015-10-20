#!/bin/bash
set -o errexit -o nounset # exit with nonzero exit code if anything fails, unset variables not allowed

# build javascript bundle
npm run build-js
# build css
npm run build-css

rev=$(git rev-parse --short HEAD) # get short hash of last commit (used in commit message later)

# clear and re-create the out directory
rm -rf out || exit 0;
mkdir out;

# copy index.html and dist folder to out directory
cp index.html out
cp -r dist out/dist
cp -r assets out/assets
cp -r libs out/libs

# go to the out directory and create a *new* Git repo
cd out
git init

git remote add upstream "https://github.com/codemade/caffeine.git"
git fetch upstream
git reset upstream/gh-pages

# touch everything, so that git considers all of our local copies fresh
touch .

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy to GitHub Pages".
git add -A .
git commit -m "Deploy to github-pages at commit ${rev}."

# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet upstream HEAD:gh-pages
