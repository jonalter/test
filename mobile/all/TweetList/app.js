/**
 * Define our parser class. It takes in some text, and then you can call "linkifyURLs", or one of the other methods,
 * and then call "getHTML" to get the fully parsed text back as HTML!
 * @param text that you want parsed
 */
function Parser(text) {

    var html = text;

    var urlRegex = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
    var hashTagRegex = /#([^ ]+)/gi;
    var mentionRegex = /@([^ ]+)/gi;

    this.linkifyAll = function() {
        this.linkifyURLs();
        this.linkifyHashTags();
        this.linkifyMentions();
    };

    this.linkifyURLs = function() {
        html = html.replace(urlRegex, '<a href="$1">$1</a>');
    };
    this.linkifyHashTags = function() {
        html = html.replace(hashTagRegex, '<a href="http://twitter.com/#!/search?q=%23$1">#$1</a>');
    };
    this.linkifyMentions = function() {
        html = html.replace(mentionRegex, '<a href="http://twitter.com/#!/search?q=%40$1">@$1</a>');
    };

    this.getHTML = function() {
        return html;
    };

}
/**
 * Define some styles and JavaScript to inject into the web view.
 */
var baseHTMLStart = '<html><head><link rel="stylesheet" type="text/css" href="tweetWebView.css" /></head><body>',
        baseHTMLEnd = '<script type="text/javascript" src="tweetWebView.js"></script></body></html>';

/**
 * Handle a link being clicked.
 */
Ti.App.addEventListener('linkClicked', function(evt) {
    alert('You clicked: ' + evt.href);
});

/**
 * Open a window with a scroll view.
 */
var win = Ti.UI.createWindow({
    backgroundImage: 'rotator-bg.png', backgroundColor: '#444'
});
var loading = Ti.UI.createActivityIndicator({
    top: 10,
	height: 50, width: 50,
    style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG
});
win.add(loading);
loading.show();

/**
 * Grab some Appcelerator related tweets from Twitter.
 */
var xhr = Ti.Network.createHTTPClient({
    onload: function() {
        loading.hide();
        try {
            var response = JSON.parse(this.responseData);
            if (response) {
                var items = response.results;
                var html = baseHTMLStart;
                for (var i = 0, l = items.length; i < l; i++) {

                    /**
                     * Extract the tweet's information.
                     */
                    var tweet = {
                        imageURL: items[i].profile_image_url, who: items[i].from_user,
                        text: items[i].text,
                        source: 'Twitter', sourceID: items[i].id,
                        url: 'http://twitter.com/#!/' + items[i].from_user + '/status/' + items[i].id,
                        when: new Date(items[i].created_at).getTime()
                    };

                    /**
                     * Make the tweet click-able and add it to the scroll view!
                     */
                    var parser = new Parser(tweet.text);
                    parser.linkifyAll();
                    html += '<div class="tweet">' + parser.getHTML() + '</div>';

                }
                html += baseHTMLEnd;
                win.add(Ti.UI.createWebView({ backgroundColor: 'transparent', html: html }));
            } else if (response.error) {
                alert(response.error);
            } else {
                alert('The server is temporarily unavailable; please check your internet connection, and try again.');
            }
        }
        catch(err) {
            alert(err);
        }
    },
    onerror: function(e) {
        loading.hide();
        alert(e);
    }
});
xhr.open('GET', 'http://search.twitter.com/search.json?q=%23appcelerator%20OR%20@appcelerator%20OR%20from%3Aappcelerator');
xhr.send();

/**
 * Open the window! We're done.
 */
win.open();