/* Copyright 2012-2013 David Pearson.
 * Copyright 2014 Rob Myers
 *
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
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
