var win = Ti.UI.createWindow({ backgroundColor: '#fff' });
win.add(Ti.UI.createLabel({ text: 'Look for the notification! It should be there now.' }));
win.open();

Titanium.Android.NotificationManager.notify(
        0, // <-- this is an ID that we can use to clear the notification later
        Ti.Android.createNotification({
            contentTitle: 'Cheese, Gromit!',
            contentText: 'Swiss',
            tickerText: 'Our app made a notification!',
            contentIntent: Titanium.Android.createPendingIntent({
                intent: Titanium.Android.createIntent({
                    url: 'app.js'
                })
            })
        }));