# Insider Ads Debug Bookmarklet

You can access the bookmarklet here: https://experience-file-sandbox.s3.amazonaws.com/ad-debug-bookmarklet/adDebugBookmarklet.js

```
/* Bookmarklet code to minify */
const lookup=document.createElement('script'),
  cb=Math.floor(Math.random()*10000000000);
lookup.src=`//localhost:9999/ad-debug-bookmarklet/adDebugBookmarklet.js?${cb}`;
const node=document.getElementsByTagName('script')[0];
node.parentNode.insertBefore(lookup,node);

```

javascript:(function()%7Bvar lookup%3Ddocument.createElement(%27script%27),cb%3DMath.floor(Math.random()*10000000000)%3Blookup.src%3D%27//experience-file-sandbox.s3.amazonaws.com/ad-debug-bookmarklet/adDebugBookmarklet.js%3F%27%2Bcb%3Bvar node%3Ddocument.getElementsByTagName(%27script%27)%5B0%5D%3Bnode.parentNode.insertBefore(lookup,node)%3B%7D)()%3B