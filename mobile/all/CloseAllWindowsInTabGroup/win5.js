var win = Ti.UI.currentWindow;
win.title='win5';

var oldWindow = win.oldWindow;
oldWindow.push(win);

var button = Ti.UI.createButton({
	title:'go to win6.js',
	height:50,
	width:200,
	top:20
});
win.add(button);
button.addEventListener('click',function(){
	var otheWin = Ti.UI.createWindow({
		url:'win6.js',
		oldWindow:oldWindow
	});
	Ti.UI.currentTab.open(otheWin)
});