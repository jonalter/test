// create our web view
var win = Ti.UI.createWindow({ backgroundColor: "#fff" });
var web = Ti.UI.createWebView({ url: "http://chicago.craigslist.org/" });

// inject our css when the web view finishes loading (because we need to inject into the head element)
web.addEventListener('load', function () {
    // first, specify the CSS file that we should load
    var cssFileName = 'styles.css';
    // read in the contents
    var cssFromFile = Ti.Filesystem.getFile(cssFileName);
    // clean the contents so we can put them in a JS string
    var contents = String(cssFromFile.read())
        .split('\r').join('')
        .split('\n').join(' ')
        .split('"').join('\\"');
    // and run the JavaScript to inject the CSS by setting the URL of the web view
    // (hint: try running "javascript:alert('Hello, world!');" in your own browser to see what happens
    web.url =
        'javascript:(function evilGenius(){'
            + 'var s=document.createElement("style");'
            + 's.setAttribute("type","text/css");'
            + 's.innerHTML="' + contents + '";'
            + 'document.getElementsByTagName("head")[0].appendChild(s);'
        + '})();';
    // note that we don't use web.evalJS() -- it relies on Ti being injected in the DOM already but we're
    // running this on an external URL, so it won't have Ti injected! web.url is the same method evalJS uses
});

// show the web view
win.add(web);
win.open();