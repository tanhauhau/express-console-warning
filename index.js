var cheerio     = require('cheerio'),
    interceptor = require('express-interceptor');

var warningInterceptor = interceptor(function(req, res){
    return {
        isInterceptable: function(){
            return /text\/html/.test(res.get('Content-Type'));
        },
        intercept: function(body, send) {
            var $document = cheerio.load(body);
            $document('body').append('<script src="https://cdn.rawgit.com/tanhauhau/console-warning/v1.0/warning.min.js" type="text/javascript"></script>');
            send($document.html());
        }
    };
});
module.exports = warningInterceptor;
