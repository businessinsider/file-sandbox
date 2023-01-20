#!/bin/sh
cd ../../../fenrir

for folder in client server shared
do
  git ls-tree -r master $folder --name-only
done