Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 0;

var win = Ti.UI.createWindow({backgroundColor: '#fff'});
var label = Ti.UI.createLabel();
win.add(label);
win.open();

function reportPosition(e) {
    if (!e.success || e.error) {
        label.text = 'error: ' + JSON.stringify(e.error);
    }
    else {
        var accuracy = e.coords.accuracy;
        var timestamp = e.coords.timestamp;
        label.text = 'geo time: ' + new Date(timestamp) + ', accuracy: ' + accuracy;
    }
}

// this fires once
Titanium.Geolocation.getCurrentPosition(reportPosition);
// this fires whenever the distance filter is surpassed
Titanium.Geolocation.addEventListener('location', reportPosition);