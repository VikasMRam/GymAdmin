#!/bin/sh

curl -X POST -H 'Content-type: application/json' \
--data '{"text":"$1"}' \
 "https://hooks.slack.com/services/$SLACK_STAGING_DEPLOY_NOTIFICATION_API_KEY"
