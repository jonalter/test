/**
 * Create a "container" window. This will house all of our high level UI elements
 */
var container = Ti.UI.createWindow({
    backgroundColor: 'yellow'
});

/**
 * Add some stuff to the top of the container. This will be visible everywhere in the app
 */
container.add(Ti.UI.createButton({
    title: 'Settings',
    top: 0, left: 0,
    height: 60, width: 100
}));
container.add(Ti.UI.createImageView({
    url: 'http://www.google.com/images/logos/ps_logo2.png',
    top: 0,
    height: 60, width: 100
}));

/**
 * Now create our tab group, which will contain various windows.
 */
var tabGroupOuter = Ti.UI.createTabGroup({
    top: 60
});
tabGroupOuter.addTab(Ti.UI.createTab({
    title: 'One',
    window: Ti.UI.createWindow({
        title: 'One',
        backgroundColor: 'red',
        navBarHidden: true
    })
}));
tabGroupOuter.addTab(Ti.UI.createTab({
    title: 'Two',
    window: Ti.UI.createWindow({
        title: 'Two',
        backgroundColor: 'blue',
        navBarHidden: true
    })
}));

/**
 * Add the tab group to the window
 */
container.add(tabGroupOuter);
/**
 * Force the tab group to open itself (this is necessary), and then open the container window
 */
tabGroupOuter.open();
container.open();