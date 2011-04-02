var win = Ti.UI.createWindow({ backgroundColor: '#fff' });

/**
 * Adds "swipe" event support to Android, and adds swipe up and down to iOS.
 * @param view The view that should be made swipeable.
 * @param allowVertical Whether or not vertical swipes (up and down) are allowed; default is false.
 * @param tolerance How much further you need to go in a particular direction before swipe is fired; default is 2.
 */
function makeSwipeable(view, allowVertical, tolerance) {
    tolerance = tolerance || 2;
    var start;
    view.addEventListener('touchstart', function(evt) {
        start = evt;
    });
    view.addEventListener('touchend', function (end) {
        var dx = end.x - start.x, dy = end.y - start.y;
        var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        // only trigger if dragged further than 50 pixels
        if (dist < 50) {
            return;
        }
        var isVertical = Math.abs(dx / dy) < 1 / tolerance;
        var isHorizontal = Math.abs(dy / dx) < 1 / tolerance;
        // only trigger if dragged in a particular direction
        if (!isVertical && !isHorizontal) {
            return;
        }
        // disallow vertical swipe, depending on the setting
        if (!allowVertical && isVertical) {
            return;
        }
        // now fire the event off so regular 'swipe' handlers can use this!
        end.direction = isHorizontal ? ((dx < 0) ? 'left' : 'right') : ((dy < 0) ? 'up' : 'down');
        end.type = 'swipe';
        view.fireEvent('swipe', end);
    });
}

/**
 * Now call the function on our window, and we'll enable vertical swipes while we're at it.
 */
makeSwipeable(win, true);

/**
 * Now add a regular event listener for "swipe". It will work cross platform!
 */
win.addEventListener('swipe', function(evt) {
    alert('Swiped ' + evt.direction + '!');
});


win.add(Ti.UI.createLabel({
    text: 'Welcome to the Swipe for Android workaround + vertical swipes!', textAlign: 'center',
    touchEnabled: false
}));

win.open();