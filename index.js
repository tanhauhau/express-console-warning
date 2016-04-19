var    cheerio  = require('cheerio'),
    interceptor = require('express-interceptor'),
         printf = require("sprintf-js").sprintf,
             fs = require('fs'),
           path = require('path');

var scriptToInject = "";
var konsole = {
    image: function(url, scale){
        scale = scale || 1;
        scriptToInject = scriptToInject + printf(".image('%s', %f)", url, scale);
        return konsole;
    },
    log: function(text){
        scriptToInject = scriptToInject + printf(".log('%s')", cleanText(text));
        return konsole;
    },
    warn: function(text){
        scriptToInject = scriptToInject + printf(".warn('%s')", cleanText(text));
        return konsole;
    },
    LOG: function(text){
        scriptToInject = scriptToInject + printf(".LOG('%s')", cleanText(text));
        return konsole;
    },
    WARN: function(text){
        scriptToInject = scriptToInject + printf(".WARN('%s')", cleanText(text));
        return konsole;
    },
    text: function(text, attr){
        scriptToInject = scriptToInject + printf(".text('%s', %j)", cleanText(text), attr);
        return konsole;
    },
    default: function(){
        return konsole.image('https://cdn.rawgit.com/tanhauhau/console-warning/master/warning.png?raw=true', 1)
                      .LOG('This is a browser feature intended for developers. If someone told you to copy-paste something here it is a scam.')
                      .WARN('Do not try anything in the console.')
                      .build();
    },
    build: function(){
        scriptToInject = '<script>' + fs.readFileSync(path.join(__dirname, 'console.js')) + scriptToInject + ';</script>';
        return interceptor(function(req, res){
            return {
                isInterceptable: function(){
                    return /text\/html/.test(res.get('Content-Type'));
                },
                intercept: function(body, send) {
                    var $document = cheerio.load(body);
                    $document('body').append(scriptToInject);
                    send($document.html());
                }
            };
        });
    },
};

function cleanText(text){
    return text.replace(/'/g, '\\\'').replace(/"/g, '\\\"');
}

module.exports = konsole;
