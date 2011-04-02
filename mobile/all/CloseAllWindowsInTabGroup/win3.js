var win = Ti.UI.currentWindow;
win.title='win3';

var oldWindow = win.oldWindow;
oldWindow.push(win);

var button = Ti.UI.createButton({
	title:'go to win4.js',
	height:50,
	width:200,
	top:20
});
win.add(button);
button.addEventListener('click',function(){
	var otheWin = Ti.UI.createWindow({
		url:'win4.js',
		oldWindow:oldWindow
	});
	Ti.UI.currentTab.open(otheWin)
});