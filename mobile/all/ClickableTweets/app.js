/**
 * Define our parser class. It takes in some text, and then you can call "linkifyURLs", or one of the other methods,
 * and then call "getHTML" to get the fully parsed text back as HTML!
 * @param text that you want parsed
 */
function Parser(text) {

    var html = text;

    var urlRegex = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
    var hashTagRegex = /#([^ ]+)/gi;

    this.linkifyURLs = function() {
        html = html.replace(urlRegex, '<a href="$1">$1</a>');
    };
    this.linkifyHashTags = function() {
        html = html.replace(hashTagRegex, '<a href="http://twitter.com/#!/search?q=%23$1">#$1</a>');
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

/*
 * Now we'll make our UI that uses the parser.
 */

// this is our sample tweet; a real app might load this in from a DB or from a Twitter API call
// let's show it to the user!
var tweet = 'Release Candidate for Titanium Mobile 1.6.0: http://bit.ly/i0pJ3S #appcelerator #appTitan';

// make a window and a web view
var win = Ti.UI.createWindow({ backgroundColor: '#fff' });
var web = Ti.UI.createWebView();
win.add(web);
win.open();

// parse the tweet and set it as the HTML for the web view
var parser = new Parser(tweet);
parser.linkifyURLs();
parser.linkifyHashTags();
web.html = baseHTMLStart + parser.getHTML() + baseHTMLEnd;