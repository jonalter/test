var win = Ti.UI.currentWindow;
win.title='win1';

var button = Ti.UI.createButton({
	title:'go to win2.js',
	height:50,
	width:200,
	top:20
});
win.add(button);
button.addEventListener('click',function(){
	var otheWin = Ti.UI.createWindow({
		url:'win2.js'
	});
	Ti.UI.currentTab.open(otheWin)
});