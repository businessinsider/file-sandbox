aws s3 sync dist/. s3://experience-file-sandbox/ \
  --exclude '*.DS_Store' \
  --exclude '*.git*' \
  --exclude '*.md' \
  --exclude '*.sh' \
  --delete \
  --dryrun