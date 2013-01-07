## Various Tools for Identi.ca + Node.js ##

I wanted to get [@NFLScoreBot](http://twitter.com/nflscorebot) working with [identi.ca](http://identi.ca). Unfortunately, there's no pre-rolled library, so I kind of hacked this together for use with the excellent [ntwitter](https://github.com/AvianFlu/ntwitter).

This is pretty much a collection of random code that I found useful. Your mileage may vary.

### Setup ###

Run `npm install` and you're golden.

### Using the identi.ca API ###

*If you need to generate tokens, see [below](https://github.com/dpearson/node-identi.ca#generating-access-tokens)*

It's fairly easy to get started; just plug your keys and secrets into the following code:

    var identica=require("identica");
    var i=identica({consumer_key:"CONSUMER_KEY", consumer_secret:"CONSUMER_SECRET", access_token_key:"ACCESS_TOKEN_KEY", access_token_secret:"ACCESS_TOKEN_SECRET"});

In the above snippet, `i` is an instance of the `twitter` object from [ntwitter](https://github.com/AvianFlu/ntwitter). To get started, there is some information on the REST API interface [in the ntwitter README](https://github.com/AvianFlu/ntwitter#rest-api); for a more detailed listing of the available functions, have a look [at the source](https://github.com/AvianFlu/ntwitter/blob/master/lib/twitter.js#L450).

### Generating access tokens ###

First, you need to [create](http://identi.ca/settings/oauthapps/new) an application (or use an [existing](http://identi.ca/settings/oauthapps) one).

Then, you can use the `getaccesstoken.js` script from this repository to grab the necessary token and secret. Just run the script, supplying your consumer key and secret as command line arguments, like:

		node getaccesstoken.js CONSUMER_KEY CONSUMER_SECRET

When run, a browser window should pop up and ask you to log in to identi.ca and approve the application. Do what it says and wait a moment, and your access token and secret should be displayed in the same browser window.

### What works with identi.ca + ntwitter ###

Everything supported by the [Twitter-compatible API](http://status.net/wiki/Twitter-compatible_API) should work. However, only the following have been explicitly tested:

 * Authentication
 * Posting status updates
 * Getting public, user, mentions, and home timelines
 * Searching

### What doesn't work ###

 * Stream-related functions
 * retweetedToMe and retweetedByMe

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