## Various Tools for Identi.ca + Node.js ##

I wanted to get [@NFLScoreBot](http://twitter.com/nflscorebot) working with [identi.ca](http://identi.ca). Unfortunately, there's no pre-rolled library, so I kind of hacked this together for use with the excellent [ntwitter](https://github.com/AvianFlu/ntwitter).

This is pretty much a collection of random code that I found useful. Your mileage may vary.

### Setup ###

Run `npm install` and you're golden.

### Generating access tokens ###

First, you need to [create](http://identi.ca/settings/oauthapps/new) an application (or use an [existing](http://identi.ca/settings/oauthapps) one).

Then, you can use the `getaccesstoken.js` script from this repository to grab the necessary token and secret. Just run the script, supplying your consumer key and secret as command line arguments, like:

		node getaccesstoken.js CONSUMER_KEY CONSUMER_SECRET

When run, a browser window should pop up and ask you to log in to identi.ca and approve the application. Do what it says and wait a moment, and your access token and secret should be displayed in the same browser window.

### Using identi.ca with ntwitter ###

While ntwitter supports (I use the term loosely; it isn't actually advertised anywhere) proxies and third-party services, it's not the most graceful at doing so. There are basically two ways to get it working:

1. Given an already-created `Twitter` instance `twit`, the following code'll do the trick:

		twit.options["request_token_url"]="https://identi.ca/api/oauth/request_token";
		twit.options["access_token_url"]="https://identi.ca/api/oauth/access_token";
		twit.options["authenticate_url"]="https://identi.ca/api/oauth/authorize";
		twit.options["authorize_url"]="https://identi.ca/api/oauth/authorize";
		twit.options["rest_base"]="https://identi.ca/api";
		twit.options["search_base"]="http://identi.ca/api";

2. If you're willing to keep a copy of the ntwitter source in your app, you can edit the URLs in ntwitter/lib/keys.js.

### What works with identi.ca + ntwitter ###

Everything supported by the [Twitter-compatible API](http://status.net/wiki/Twitter-compatible_API) should work. However, only authentication and posting status updates (including status updates with locations) has been explicitly tested.

*Note: identi.ca, as far as I can tell, does not support the streaming APIs.*

### TODO ###

 * Better error handling in getaccesstoken.js
 * Comprehensively test ntwitter for identi.ca compatibility.

### Third Party Code ###

This code makes use of [node-open](https://github.com/jjrdn/node-open), which is Copyright 2012 Jay Jordan, and [request](https://github.com/mikeal/request), which is Copyright 2012 Mikeal Rogers.

### Legal ###

	Copyright (c) 2012, David Pearson
	All rights reserved.
	
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.