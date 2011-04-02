var win = Ti.UI.currentWindow;
win.modal = true;

win.add(Ti.UI.createLabel({
    text: 'Hello, world!'
}));