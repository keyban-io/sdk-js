#!/bin/bash

# Define the directory to archive
SOURCE_DIR="demo-app"
# Define the name of the destination archive
DEST_ARCHIVE="demo-app.zip"
# Define the destination directory for the archive
DEST_DIR="$HOME/Downloads"

# Use the zip command to create the archive excluding the node_modules directory
zip -r $DEST_ARCHIVE $SOURCE_DIR -x "$SOURCE_DIR/node_modules/*"

# Move the archive to the destination directory
mv $DEST_ARCHIVE $DEST_DIR

# Display a confirmation message
echo "The archive $DEST_ARCHIVE has been created and moved to $DEST_DIR."
