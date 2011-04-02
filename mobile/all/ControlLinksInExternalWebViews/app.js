var win = Ti.UI.createWindow({ backgroundColor: '#fff' });

var web = Ti.UI.createWebView({
    url: 'http://www.appcelerator.com/'
});

var linkJS = 'document.titaniumLinkQueue = [];'
        + '(function(){'
            + 'var links = document.getElementsByTagName("a");'
            + 'for(var i = 0, l = links.length; i < l; i++) {'
                + 'var h = links[i].attributes["href"];'
                + 'h.value = "javascript:document.titaniumLinkQueue.push(\'" + h.value + "\');"'
            + '}'
        + '})();';

web.addEventListener('load', function() {
    web.evalJS(linkJS);
    // and 3 times a second, check to see if any links have been clicked
    setInterval(pollClickedLinks, 333);
});

function pollClickedLinks() {
    var link = web.evalJS('document.titaniumLinkQueue && document.titaniumLinkQueue.pop();');
    if (link) {
        Ti.App.fireEvent('linkClicked', { href: link });
    }
}

Ti.App.addEventListener('linkClicked', function(evt) {
    alert('You clicked: ' + evt.href);
});

win.add(web);

win.open();
