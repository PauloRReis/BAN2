#!/bin/bash

MONGO_DB="universidade"

for json_file in mongo/*.json; do
  collection_name=$(basename "$json_file" .json)

  mongoimport --host localhost --db "$MONGO_DB" --collection "$collection_name" --file "mongo/$collection_name.json"
done
