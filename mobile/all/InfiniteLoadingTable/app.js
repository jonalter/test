/**
 * We're going to create an infinite loading table view. Whenever you get close to the bottom, we'll load more rows.
 */
var win = Ti.UI.createWindow({ backgroundColor: '#fff' });
var isAndroid = Ti.Platform.osname === 'android';

/**
 * Create our UI elements.
 */
var table = Ti.UI.createTableView({ top: 0, right: 0, bottom: 0, left: 0 });
var rows = [];
win.add(table);

/**
 * Handle where we are in our data, and define how to load more data.
 */
var lastRow = 0, loadData = true;
setTimeout(function checkSync() {
    // has someone asked us to load data?
    if (loadData == false) {
        // no, return and we'll check again later
        setTimeout(checkSync, 200);
        return;
    }
    Ti.API.warn('LOAD DATA TRIGGERED!');
    // simulate an asynchronous HTTP request loading data after 500 ms
    setTimeout(function() {
        // we got our data; push some new rows
        for (var i = lastRow, c = lastRow + 20; i < c; i++) {
            rows.push({ title: 'Row ' + i });
        }
        lastRow = c;
        // and push this into our table.
        table.setData(rows);
        // now we're done; reset the loadData flag and start the interval up again
        loadData = false;
        setTimeout(checkSync, 200);
        Ti.API.warn('DATA LOADED!');
    }, 500);
}, 200);

table.addEventListener('scroll', function(evt) {
    // If we're on android: our total number of rows is less than the first visible row plus the total number of visible
    // rows plus 3 buffer rows, we need to load more rows!
    // ---OR---
    // If we're on ios: how far we're scrolled down + the size of our visible area + 100 pixels of buffer space
    // is greater than the total height of our table, we need to load more rows!
    if (isAndroid && (evt.totalItemCount < evt.firstVisibleItem + evt.visibleItemCount + 3)
            || (!isAndroid && (evt.contentOffset.y + evt.size.height + 100 > evt.contentSize.height))) {
        // tell our interval (above) to load more rows
        loadData = true;
    }

});

/**
 * That's it, we just need to open the window! Hope you enjoyed this.
 */
win.open();