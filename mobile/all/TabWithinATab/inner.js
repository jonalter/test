var containingWindow = Ti.UI.currentWindow;

var tabGroupInner = Ti.UI.createTabGroup();
tabGroupInner.addTab(Ti.UI.createTab({
    window: Ti.UI.createWindow({
        backgroundColor: 'blue'
    })
}));
tabGroupInner.open();