# file-sandbox

A place to put random files that can be hosted and shared both internally and externally.

## Auto-deploy

Files added to this repo on the `main` branch will be automatically synced up to an S3 bucket that can be accessed here: https://experience-file-sandbox.s3.amazonaws.com/

The workflow that runs the auto-deploy can be found here: https://github.com/businessinsider/file-sandbox/blob/main/.github/workflows/s3-deploy.yaml
