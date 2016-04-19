(function(console) {
    var colorRegex = /^((\#(([0-9A-Fa-f]{6})|([0-9A-Fa-f]{3})))|(\w+))$/;
    var sizeRegex = /^((large(r)?)|(small(er)?)|((x{1,2})\-(large|small))|(medium)|(\d+px))$/;

    var konsole = {
        image: function(url, scale, cb) {
        	scale = scale || 1;
        	var img = new Image();
        	img.onload = function() {
                var width = this.width * scale;
                var height = this.height * scale;
        		console.log("%c+", "font-size: 1px; padding: " + Math.floor(height/2) + "px " + Math.floor(width/2) + "px; line-height: " + height + "px; background: url(" + url + "); background-size: " + width + "px " + height + "px; color: transparent;");
                cb();
        	};

        	img.src = url;
        },
        log: function(text){
            console.log(text);
        },
        warn: function(text){
            console.warn(text);
        },
        LOG: function(text) {
            console.log("%c" + text, "font-size: x-large");
        },
        WARN: function(text) {
            console.warn("%c" + text, "background: red; color: yellow; font-size: x-large");
        },
        text: function(text, attr){
            attr = attr || {};
            if(!colorRegex.test(attr.background))   attr.background = 'white';
            if(!colorRegex.test(attr.color))        attr.color = 'black';
            if(!sizeRegex.test(attr.fontSize))      attr.fontSize = '12px';
            console.log("%c" + text, "background: " + attr.background + "; color: " + attr.color + "; font-size: " + attr.fontSize);
        }
    };
    var queue = [];
    function push(fn){
        queue.push(fn);
        if(queue.length === 1){ //the first ever
            exec();
        }
    }
    function pop(){
        queue.shift();
        if(queue.length > 0){
            exec();
        }
    }
    function exec(){
        var fn = queue[0];
        if(!!fn.async){
            fn.arg.push(pop);
            fn.fn.apply({}, fn.arg);
        }else{
            fn.fn.apply({}, fn.arg);
            pop();
        }
    }
    return k = {
        image: function(url, scale){
            push({fn: konsole.image, arg: [url, scale], async: true});
            return k;
        },
        log: function(text){
            push({fn: konsole.log, arg: [text]});
            return k;
        },
        warn: function(text){
            push({fn: konsole.warn, arg: [text]});
            return k;
        },
        LOG: function(text){
            push({fn: konsole.LOG, arg: [text]});
            return k;
        },
        WARN: function(text){
            push({fn: konsole.WARN, arg: [text]});
            return k;
        },
        text: function(text, attr){
            push({fn: konsole.text, arg: [text, attr]});
            return k;
        },
    }
    return k;
})(console)
