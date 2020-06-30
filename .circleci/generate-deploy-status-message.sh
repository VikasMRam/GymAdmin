#!/bin/bash

# replace ~ in path as shell won't automatically expand ~s
CURRENT_WORKING_DIRECTORY="${CIRCLE_WORKING_DIRECTORY//\~/$HOME}"

COMMIT_SHA_LINK=$CIRCLE_COMPARE_URL
if [ -z "$COMMIT_SHA_LINK" ]; then
  PR_ID=`git log -n 1 | grep 'Merge pull request' | sed -e 's/.*#\([0-9]\+\).*/\1/'`
  COMMIT_SHA_LINK="https://github.com/${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}/pull/${PR_ID}"
fi

GIT_COMMIT_DESC=$(git log --format=oneline --pretty=format:"Commit SHA: <$COMMIT_SHA_LINK|%H>%nAuthor: %an%nCommitted on: %cd%nCommit message: %s" -n 1 $CIRCLE_SHA1)
CURRENT_VERSION="unknown"
if [ -n "$VERSION" ]; then
  CURRENT_VERSION=$VERSION
fi
CURRENT_VERSION_DESC="Version: $CURRENT_VERSION"

printf "$CURRENT_VERSION_DESC\n$GIT_COMMIT_DESC"
