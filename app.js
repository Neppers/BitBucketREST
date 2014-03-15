var express = require('express'),
    http = require('http'),
    httpProxy = require('http-proxy');

var lastfmProxy = httpProxy.createServer({
    target: 'https://bitbucket.org/'
}).listen(3002, function() {
    console.log('Proxy listening on 3002');
});

var options = {
    hostname: 'localhost',
    port: '3002',
    path: '/api/2.0/repositories/nickprice/gp-grunt',
    auth: '###:###' // It's a secret!
}

http.createServer().listen(3001, function() {
    var buffer;

    var req = http.get(options, function(res) {
        res.on('data', function(c) {
            buffer += c;
            console.log(buffer);
        });
    });

    req.on('error', function(e) {
        console.log('Error: ' + e.message);
    });
    console.log('Server listening on 3001');
});