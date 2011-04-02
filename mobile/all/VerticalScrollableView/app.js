var win = Ti.UI.createWindow({ backgroundColor: '#fff' });

var rotate = Ti.UI.create2DMatrix().rotate(90);
var counterRotate = rotate.rotate(-180);

var scrollView = Titanium.UI.createScrollableView({
    views:[
        Titanium.UI.createImageView({ image:'default_app_logo.png', transform: counterRotate }),
        Titanium.UI.createImageView({ image:'KS_nav_ui.png', transform: counterRotate }),
        Titanium.UI.createImageView({ image:'KS_nav_views.png', transform: counterRotate })
    ],
    showPagingControl:true,
    width: 480,
    height: 320,
    transform: rotate
});

win.add(scrollView);

win.open();