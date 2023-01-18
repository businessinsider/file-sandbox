# Google Ad Manager PPID Deletion Tool

When users request their data to be deleted on the site, we have to make a request to delete the Google PPID as documented here: https://support.google.com/admanager/answer/2880055?hl=en#PPID%20Deletion

This form accepts a Permutive ID and populates a magic button that when clicked, triggers a request to delete that user's PPID from Google Ad Manager.

You can pass a user's Permutive ID (PPID) to the form by manually copying and pasting it into the form, or you can add it to the URL to automatically populate the form, e.g. https://experience-file-sandbox.s3.amazonaws.com/delete-ppid-google/index.html?ppid=6bdd185d-74d5-434b-9b37-c200d06ba9d1

## Building locally

In this directory, run:

```
$ npm i
# npm run build
```

This will copy needed files to the `./dist` folder, where they should be committed and pushed to deploy.
