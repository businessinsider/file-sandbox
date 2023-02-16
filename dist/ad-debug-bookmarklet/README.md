# Insider Ads Debug Bookmarklet

```
const lookup=document.createElement('script'),
  cb=Math.floor(Math.random()*10000000000);
lookup.src=`//localhost:9999/ad-debug-bookmarklet/adDebugBookmarklet.js?${cb}`;
const node=document.getElementsByTagName('script')[0];
node.parentNode.insertBefore(lookup,node);

```