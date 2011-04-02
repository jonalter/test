var currentTab = Ti.UI.currentTab;
var button = Ti.UI.createButton({ title: 'open inner tab group' });
button.addEventListener('click', function() {
    var win = Ti.UI.createWindow({
        url: 'inner.js',
        title: 'inner.js'
    });
    currentTab.open(win);
});
Ti.UI.currentWindow.add(button);