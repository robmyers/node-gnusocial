/* Copyright 2013 David Pearson.
 *
 * BSD License.
 */

var ntwitter=require("ntwitter");

function identica (opts) {
	var twit=new ntwitter(opts);

	twit.options["request_token_url"]="https://identi.ca/api/oauth/request_token";
	twit.options["access_token_url"]="https://identi.ca/api/oauth/access_token";
	twit.options["authenticate_url"]="https://identi.ca/api/oauth/authorize";
	twit.options["authorize_url"]="https://identi.ca/api/oauth/authorize";
	twit.options["rest_base"]="https://identi.ca/api";
	twit.options["search_base"]="http://identi.ca/api";

	return twit;
}

module.exports=identica;