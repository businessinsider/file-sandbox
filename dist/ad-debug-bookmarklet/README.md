# Insider Ads Debug Bookmarklet

You can access the bookmarklet here: https://experience-file-sandbox.s3.amazonaws.com/ad-debug-bookmarklet/adDebugBookmarklet.js

```
/* Bookmarklet code to minify */
const lookup=document.createElement('script'),
  cb=Math.floor(Math.random()*10000000000);
lookup.src=`//experience-file-sandbox.s3.amazonaws.com/ad-debug-bookmarklet/adDebugBookmarklet.js?${cb}`;
const node=document.getElementsByTagName('script')[0];
node.parentNode.insertBefore(lookup,node);

```

### Bookmarklet-ified version of the above

```
javascript:void%20function(){const%20a=document.createElement(%22script%22),b=Math.floor(1e10*Math.random());a.src=`//experience-file-sandbox.s3.amazonaws.com/ad-debug-bookmarklet/adDebugBookmarklet.js%3F${b}`;const%20c=document.getElementsByTagName(%22script%22)[0];c.parentNode.insertBefore(a,c)}();
```