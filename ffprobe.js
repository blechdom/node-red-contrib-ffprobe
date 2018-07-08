module.exports = function(RED) {
    "use strict";

    var probe = require('ffprobe'),
        ffprobeStatic = require('ffprobe-static');

    function ffprobe(n) {
        RED.nodes.createNode(this,n);
        var node = this;
        this.prefix = n.prefix || '';
        
        this.on("input",function(msg) {
            var full_path = this.prefix + msg.payload;
            console.log("ffprobe path: " + full_path);
            probe(full_path, { path: ffprobeStatic.path }, function(err, info) {
                if(err) {
                    
                    console.log("ffprobe error: " + err);
                    return;
                }
                node.send({payload: info.streams[0]});
            });
              
                



        });

    }
    RED.nodes.registerType("ffprobe", ffprobe);
}