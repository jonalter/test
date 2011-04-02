var win = Ti.UI.currentWindow;
win.title='win2';

var oldWindow = [];
oldWindow.push(win);
var button = Ti.UI.createButton({
	title:'go to win3.js',
	height:50,
	width:200,
	top:20
});
win.add(button);
button.addEventListener('click',function(){
	var otheWin = Ti.UI.createWindow({
		url:'win3.js',
		oldWindow:oldWindow
	});
	Ti.UI.currentTab.open(otheWin)
});