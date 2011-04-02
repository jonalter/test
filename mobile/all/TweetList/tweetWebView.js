(function() {
    // This fires a Ti event whenever a link is clicked.
    var a = document.getElementsByTagName("a");
    for (var i = 0,l = a.length; i < l; i++) {
        var h = a[i].attributes["href"];
        h.value = "javascript:Ti.App.fireEvent('linkClicked', { href: '" + h.value + "' })";
    }
})();