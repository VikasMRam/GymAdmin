#!/bin/bash

if [ -z $SLACK_NOTIFICATION_API_KEY ]; then
  echo "Missing Slack API key. Tip: Configure SLACK_DEPLOY_NOTIFICATION_API_KEY env variable"
  exit 1
fi

TIMESTAMP=$(date +%s)
TEXT_COLOR="#708090"
POSITIONAL=()

while [[ $# -gt 0 ]]
do
key="$1"

case $key in
  -c|--color)
  TEXT_COLOR="$2"
  shift # past argument
  shift # past value
  ;;
  -t|--title)
  MSG_TITLE="$2"
  shift # past argument
  shift # past value
  ;;
  -tl|--titlelink)
  MSG_TITLE_LINK="$2"
  shift # past argument
  shift # past value
  ;;
  -m|--message)
  MSG_BODY="$2"
  shift # past argument
  shift # past value
  ;;
  *)    # unknown option
  POSITIONAL+=("$1") # save it in an array for later
  shift # past argument
  ;;
esac
done

JSON_PAYLOAD_TMPL='{"attachments": [{"color": "%s", "title": "%s", "title_link": "%s", "text": "%s", "ts": "%s"}]}'
JSON_PAYLOAD=$(printf "$JSON_PAYLOAD_TMPL" "$TEXT_COLOR" "$MSG_TITLE" "$MSG_TITLE_LINK" "$MSG_BODY" "$TIMESTAMP")

curl -X POST -H 'Content-type: application/json' \
  --data "$JSON_PAYLOAD" --fail \
  "https://hooks.slack.com/services/$SLACK_NOTIFICATION_API_KEY"
