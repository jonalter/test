// put this in an app.js and watch it fly!
var win = Ti.UI.createWindow({ backgroundColor: '#fff' });

var views = [];
for (var i = 0; i < 10; i++) {
    views.push(Ti.UI.createImageView({
        image: 'KS_nav_ui.png',
        top: 0, left: 0,
        width: 100,
        height: 50
    }));
}

win.add(Ti.UI.createScrollableView({
    views: views,
    top: 0, right: 0, bottom: 0, left: 0
}));

win.open();