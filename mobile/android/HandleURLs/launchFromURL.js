var activity = Ti.Android.currentActivity;
var win = Ti.UI.currentWindow;

activity.addEventListener("create", function(e) {
    win.add(Ti.UI.createButton({title: 'Our app was launched when you typed appcelerator.com!'}));
});