var win = Ti.UI.currentWindow;
win.title='win6';

var oldWindow = win.oldWindow;
oldWindow.push(win);

var button1 = Ti.UI.createButton({
	title:'go to root without animation',
	height:50,
	width:250,
	top:20
});

var button2 = Ti.UI.createButton({
	title:'go to root with animation',
	height:50,
	width:200,
	top:150
});
win.add(button1);
win.add(button2);
button1.addEventListener('click',function(){
	for(var i = 0; i<oldWindow.length;i++){
		oldWindow[i].close({animated:false});
	}
});
button2.addEventListener('click',function(){
	for(var i = 0; i<win.oldWindow.length;i++){
		oldWindow[i].close({animated:true});
	}
});