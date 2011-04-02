var tabGroup = Titanium.UI.createTabGroup();
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff',
	url:'win1.js'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
	backgroundColor:'blue'
});

var tab2 = Titanium.UI.createTab({  
    title:'Tab 2',
    window:win2
});


tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  

tabGroup.open();