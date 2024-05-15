#!/bin/bash

#!/bin/bash

yalc help > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "yalc is not installed. Please install yalc before running this script. npm i -g yalc"
  exit 1
fi

cd ../sdk || { echo "Directory ./sdk does not exist."; exit 1; }

for dir in */; do
  if [ -d "$dir" ]; then
    echo "Entering directory: $dir"
    cd "$dir" || { echo "Failed to enter directory $dir"; exit 1; }

    echo "Building $dir..."
    yarn build:ts > /dev/null 2>&1
    echo "Pushing $dir to yalc..."
    yalc update > /dev/null 2>&1
    yalc publish > /dev/null 2>&1
    yalc push > /dev/null 2>&1
    printf "\n"

    if [ $? -ne 0 ]; then
      echo "yalc setup failed in directory $dir"
      exit 1
    fi

    cd ..
  fi
done

cd ..
cd ./sdk-playgrounds || { echo "Directory ./sdk-playgrounds does not exist."; exit 1; }

for dir in */; do
  if [ -d "$dir" ]; then
    echo "Entering directory: $dir"
    cd "$dir" || { echo "Failed to enter directory $dir"; exit 1; }
    echo "Updating yalc for $dir..."
    yalc update > /dev/null 2>&1
    yarn install > /dev/null 2>&1
    printf "\n"

    if [ $? -ne 0 ]; then
      echo "yalc update failed in directory $dir"
      exit 1
    fi

    cd ..
  fi
done

echo "Yalc setup completed for all sdk"
echo "Now you can just run \"yarn build\" inside sdk folder to build and push it to yalc"
