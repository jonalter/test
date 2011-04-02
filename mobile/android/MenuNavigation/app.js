// this is your app.js
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// define our main window and open it. it will be an activity (navBarHidden: true), and will control our child window views
Titanium.UI.createWindow({
    navBarHidden: true,
    backgroundColor: '#fff',
    url: 'mainwindow.js',
    exitOnClose: true
}).open();