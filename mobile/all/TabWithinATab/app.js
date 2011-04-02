var tabGroupOuter = Ti.UI.createTabGroup();
tabGroupOuter.addTab(Ti.UI.createTab({
    title: 'app.js',
    window: Ti.UI.createWindow({
        title: 'app.js',
        url: 'middle.js',
        backgroundColor: 'red'
    })
}));
tabGroupOuter.open();