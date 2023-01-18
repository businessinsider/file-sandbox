# file-sandbox

A place to put random files that can be hosted and shared both internally and externally.

## Auto-deploy of `/dist`

Files added to the `./dist` folder in this repo on the `main` branch will be automatically synced up to an S3 bucket that can be accessed here: https://experience-file-sandbox.s3.amazonaws.com/

The workflow that runs the auto-deploy can be found here: 
https://github.com/businessinsider/file-sandbox/actions/workflows/s3-deploy.yaml

If your project requires a local build, you should set it up in the `./src` folder and have your build process copy built files into the same-named folder in `./dist`