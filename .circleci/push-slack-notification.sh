#!/bin/sh

if [ -z $SLACK_STAGING_DEPLOY_NOTIFICATION_API_KEY ]; then
  echo "Missing Slack API key. Tip: Configure SLACK_STAGING_DEPLOY_NOTIFICATION_API_KEY env variable"
  exit 1
fi
TEXT_COLOR="#708090"
if [ -n $2 ]; then
  TEXT_COLOR=$2
fi

curl -X POST -H 'Content-type: application/json' \
--data "{\"attachments\": [{\"color\": \"$TEXT_COLOR\",\"text\":\"$1\"}]}" \
 "https://hooks.slack.com/services/$SLACK_STAGING_DEPLOY_NOTIFICATION_API_KEY"
