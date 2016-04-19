# express-console-warning

Express middleware for [console-warning](https://github.com/tanhauhau/console-warning).

## Installation

*v1.x*

```bash
npm install --save express-console-warning@1.x
```

*v2.x*

```bash
npm install --save express-console-warning@2.x
```

## Usage

*v1.x*

```javascript
var express = require('express');
var interceptor = require('express-console-warning');
var app = express();

app.use(interceptor);
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './index.html'));
});
```

*v2.x*

```javascript
var express = require('express');
var hiringAtConsole = require('express-console-warning');
var app = express();

app.use(hiringAtConsole.LOG('We\'re hiring http://hiring.me')
                       .text('Come Join Us', {color: 'blue'})
                       .build());

// or

app.use(hiringAtConsole.default()); //fallback to v1.x
```
## Explanation

*v1.x*

What this middleware will do is to inject `<script src="https://cdn.rawgit.com/tanhauhau/console-warning/master/warning.min.js" type="text/javascript"></script>` into any reply that delivers html page. So the script will run and log a warning sign in your console.

*v2.x*

What this middleware will do is inject a `<script>` tag with `console-warning` script into your html document `<body>`. It won't pollute your global namespace, so you don't have to worry about it.

**Documentation**

`var konsole = require('express-console-warning');`

* `konsole.default()` - Print out the same message as for *v1.x*

The following method is chainable and must call `.build()` in the end:

* `konsole.log(text)` - Log a normal text to console
* `konsole.LOG(text)` - Log a big text to console
* `konsole.warn(text)` - Warn a normal text to console
* `konsole.WARN(text)` - Warn a big text to console, with red background and yello font
* `konsole.image(url, scale)` - Print image to console
* `konsole.text(text, attr)` - Log a text with specified attributes to console.
	* Available attributes: `background`,`color`,`fontSize`, use it as you would for css styling



## License

The MIT License (MIT)

Copyright (c) 2016 Tan Li Hau

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
