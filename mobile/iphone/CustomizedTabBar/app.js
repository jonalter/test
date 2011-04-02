/**
 * Override a tab group's tab bar on iOS.
 *
 * NOTE: Call this function on a tabGroup AFTER you have added all of your tabs to it! We'll look at the tabs that exist
 * to generate the overriding tab bar view. If your tabs change, call this function again and we'll update the display.
 *
 * @param tabGroup The tab group to override
 * @param backgroundOptions The options for the background view; use properties like backgroundColor, or backgroundImage.
 * @param selectedOptions The options for a selected tab button.
 * @param deselectedOptions The options for a deselected tab button.
 */
function overrideTabs(tabGroup, backgroundOptions, selectedOptions, deselectedOptions) {

    // are we restyling the tab groups?
    if (tabGroup.overrideTabs) {
        tabGroup.remove(tabGroup.overrideTabs);
    }

    // a bunch of our options need to default to 0 for everything to position correctly; we'll do it en mass:
    deselectedOptions.top = deselectedOptions.bottom = selectedOptions.top = selectedOptions.bottom = backgroundOptions.left
            = backgroundOptions.right = backgroundOptions.bottom = 0;

    // create the overriding tab bar using the passed in background options
    backgroundOptions.height = 50;
    var background = Ti.UI.createView(backgroundOptions);

    // and create our individual tab buttons
    var activeTab = null, increment = 100 / tabGroup.tabs.length;
    deselectedOptions.width = selectedOptions.width = String(increment) + '%';
    for (var i = 0, l = tabGroup.tabs.length; i < l; i++) {
        (function(i) {
            var tab = tabGroup.tabs[i];
            selectedOptions.left = deselectedOptions.left = String(increment * i) + '%';

            // set the title of the button to be the title of the tab
            selectedOptions.title = deselectedOptions.title = tab.title;

            tab.selected = Ti.UI.createButton(selectedOptions);
            tab.deselected = Ti.UI.createButton(deselectedOptions);
            tab.deselected.addEventListener('click', function() {
                if (activeTab) {
                    activeTab.selected.visible = false;
                }
                tab.selected.visible = true;
                activeTab = tab;
                tabGroup.setActiveTab(i);
            });
            tab.selected.visible = false;
            background.add(tab.deselected);
            background.add(tab.selected);
        })(i);
    }

    tabGroup.add(background);
    tabGroup.overrideTabs = background;

    // "click" the first tab to get things started
    tabGroup.tabs[0].deselected.fireEvent('click');
}

/*
 The rest is a typical new project -- a tab group with three tabs.
 */

var tabGroup = Ti.UI.createTabGroup();
tabGroup.addTab(Ti.UI.createTab({
    title: 'Tab 1',
    window: Ti.UI.createWindow({ title: 'Tab 1', backgroundColor: '#fff' })
}));
tabGroup.addTab(Ti.UI.createTab({
    title: 'Tab 2',
    window: Ti.UI.createWindow({ title: 'Tab 2', backgroundColor: '#fff' })
}));
tabGroup.addTab(Ti.UI.createTab({
    title: 'Tab 3',
    window: Ti.UI.createWindow({ title: 'Tab 3', backgroundColor: '#fff' })
}));

/*
 Now call our overrideTabs function!
 */
overrideTabs(
    tabGroup,
    { backgroundColor: '#f00' },
    { backgroundColor: '#999', color: '#000', style: 0 },
    { backgroundColor: '#333', color: '#888', style: 0 }
);

tabGroup.open();