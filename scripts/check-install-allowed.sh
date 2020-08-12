#!/bin/bash

if [[ -z "$IS_SLY_SETUP" ]]; then
  echo -e "\n\tDon't run install here. Do it in root of the repo. Please check README files for more info.\n\n"
  exit 1
fi
