// open a heavyweight window
var win = Titanium.UI.createWindow({ backgroundColor: '#fff', fullscreen: true });
win.add(Ti.UI.createLabel({ text: 'Press your hardware menu button!' }));
win.open();

// keep a pointer to the current activity
var currentActivity = win.activity;

// and make an options menu
currentActivity.onCreateOptionsMenu = function(e) {
    e.menu.add({ title: 'Open Dialog' }).addEventListener("click", function() {
        var intent = Ti.Android.createIntent({
            url: 'loginModalWindow.js'
        });
        intent.putExtra('modal', true);
        currentActivity.startActivity(intent);
    });
};