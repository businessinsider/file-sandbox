# Usage: 
# to test the sync in dryrun mode
# sh -x deploy.sh true
#
# to deploy to s3
# sh -x deploy.sh

DRYRUN=${1:-false}

if [ "$DRYRUN" == "false" ]; then
  aws s3 sync dist/. s3://experience-file-sandbox/ \
    --exclude '*.DS_Store' \
    --exclude '*.git*' \
    --exclude '*.md' \
    --exclude '*.sh' \
    --delete
else 
  aws s3 sync dist/. s3://experience-file-sandbox/ \
    --exclude '*.DS_Store' \
    --exclude '*.git*' \
    --exclude '*.md' \
    --exclude '*.sh' \
    --dryrun \
    --delete
fi