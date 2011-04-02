var win = Ti.UI.createWindow({ backgroundColor: '#fff' });

var html = '<html><body>'
        + '<a href="http://pedro.com">Pedro</a> '
        + '<a href="http://is.com">is</a> '
        + '<a href="http://a.com">a</a> '
        + '<a href="http://balla.com">balla!</a>.'
        + '</body></html>';

var web = Ti.UI.createWebView({
    html: html
});

var linkJS = '(function(){var a=document.getElementsByTagName("a");'
        + 'for(var i=0,l=a.length;i<l;i++){'
        + 'h=a[i].attributes["href"];'
        + 'h.value="javascript:Ti.App.fireEvent(\'linkClicked\',{href:\'" + h.value + "\'})"'
        + '}'
        + '})();';

Ti.App.addEventListener('linkClicked', function(evt) {
    alert('You clicked: ' + evt.href);
});
web.addEventListener('load', function() {
    web.evalJS(linkJS);
});

win.add(web);

win.open();