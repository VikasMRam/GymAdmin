#!/usr/bin/env bash

DIR=$(dirname "$0")

aws s3 sync $DIR/public/images s3://seniorly/uploads/react-assets 
