/* Copyright 2012-2013 David Pearson.
 * Copyright 2014 Rob Myers
 *
 * BSD License.
 */

var http=require("http");
var open=require("open");
var querystring=require("querystring");
var request=require("request");
var url=require("url");

if (process.argv.length<5) {
	console.log("USAGE: node getaccesstoken.js API_ROOT_URL CONSUMER_KEY CONSUMER_SECRET");
	return;
}

var apiRoot=process.argv[2];
var consumerKey=process.argv[3];
var consumerSecret=process.argv[4];

var callback="http://localhost:1234/";
var reqTokenURL=apiRoot+"/oauth/request_token";
var accessTokenURL=apiRoot+"/oauth/access_token";
var authURL=apiRoot+"/oauth/authorize";

var oauthToken="";
var oauthTokenSecret="";

var serverHasResponded=false;
var server=null;

request.post({url:reqTokenURL, oauth:{"callback":callback, "consumer_key":consumerKey, "consumer_secret":consumerSecret}}, function (e, res, retBody) {
	var body=querystring.parse(retBody);
	oauthToken=body["oauth_token"];
	oauthTokenSecret=body["oauth_token_secret"];

	open(authURL+"?oauth_token="+oauthToken);

	server=http.createServer(responseListener).listen(1234);
});

function responseListener (req, response) {
	if (serverHasResponded) {
		return;
	}

	serverHasResponded=true;

	var qs=querystring.parse(url.parse(req.url).query);
	var oauth={"consumer_key":consumerKey, "consumer_secret":consumerSecret, "token":oauthToken, "token_secret":oauthTokenSecret, "verifier":qs["oauth_verifier"]};

	request.post({url:accessTokenURL, oauth:oauth}, function (e, res, retBody) {
		var body=querystring.parse(retBody);

		response.writeHead(200, {"Content-Type":"text/html"});
		response.end("<head><title>Oauth Information</title></head><body>Consumer Key: "+consumerKey+"<br/>Consumer Secret: "+consumerSecret+"<br/><br/>Access Token: "+body["oauth_token"]+"<br/>Access Token Secret: "+body["oauth_token_secret"]+"</body>");
		server.close();
	});
}
