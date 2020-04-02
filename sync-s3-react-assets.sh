#!/usr/bin/env bash

SCRIPT=$(readlink -f "$0")
DIR=$(dirname "$SCRIPT")

aws s3 sync $DIR/public/images s3://seniorly/uploads/react-assets 
