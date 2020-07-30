#!/bin/bash

BASEDIR=$(dirname "$0")
TEMPLATE="$BASEDIR/../.templates/packages"
PACKAGES="$BASEDIR/../packages"
RED='\033[0;31m'
GREEN='\033[0;32m'

read -p "Enter the package name: " name

if [ -z "$name" ]; then
  echo -e "${RED}A name is required to create new package!"
  exit 1
fi

if [ ! -d "$TEMPLATE" ]; then
  echo -e "${RED}Packages template not found! looking in $TEMPLATE"
  exit 1
fi

if [ ! -d "$PACKAGES" ]; then
  echo -e "${RED}Packages folder not found!"
  exit 1
fi

if [ -d "$PACKAGES/$name" ]; then
  echo -e "${RED}Package $name already exists!"
  exit 1
fi

cp -a "$TEMPLATE/." "$PACKAGES/$name"

for file in $(find -E "$PACKAGES/$name" -iregex ".*\.template"); do
  path=$(realpath "$file")
  npath=$(echo $path | sed 's/\(.*\).template/\1/')
  sed -e "s/\${name}/$name/" "$path" > "$npath"
  rm "$path"
done

echo -e "${GREEN}Package created successfully! Go to $(realpath $PACKAGES/$name) to start modifying."
