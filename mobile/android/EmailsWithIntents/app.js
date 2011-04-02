var win = Ti.UI.createWindow({ backgroundColor: '#fff' });
var button = Ti.UI.createButton({ title: 'Share' });
win.add(button);
win.open();

button.addEventListener('click', function() {
    var intent = Ti.Android.createIntent({
        action: Ti.Android.ACTION_SEND,
        type: 'text/plain'
    });
    intent.putExtra(Ti.Android.EXTRA_SUBJECT, 'My subject!');
    intent.putExtra(Ti.Android.EXTRA_TEXT, 'My text!');
    try {
        Ti.Android.currentActivity.startActivity(intent);
    } catch (ex) {
        /* Handle Exception if no suitable apps installed */
        Ti.UI.createNotification({ message : 'No sharing apps installed!' }).show();
    }
});