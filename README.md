#gnusocial

GNU social Twitter compatible API Client for node

A trivial fork of Tolga Tezel's "Twit".

Supports only the **REST** API.

#Installing

```
npm install gnusocial
```

##Usage:

```javascript
var GNUsocial = require('gnusocial');

var s = new GNUsocial({
    api_url:              '...' 
  , consumer_key:         '...'
  , consumer_secret:      '...'
  , access_token:         '...'
  , access_token_secret:  '...'
});

//
//  dent 'hello world!'
//
s.post('statuses/update', { status: 'hello world!' }, function(err, reply) {
  //  ...
});

## Further reading and sources

For further usage, see Twit's documentation (but ignore the streaming):

https://github.com/ttezel/twit/

For getaccesstoken.js see:

https://github.com/dpearson/node-identi.ca/

-------

## License (except for getaccesstoken.js)

(The MIT License)

Copyright (c) by Tolga Tezel <tolgatezel11@gmail.com>
Copyright (c) 2014 by Rob Myers <rob@robmyers.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
