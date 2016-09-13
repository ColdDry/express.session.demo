const express = require('express');
const session = require('express-session');
const storeRedis = require('connect-redis')(session);
var app = express();

app.listen(1991, function () {
    console.log('server is starting on 1991');
});

app.use(session({
    store: new storeRedis({ ttl: 1000 * 60 * 60 * 24 * 365, logErrors: true }),
    secret: '這裡是安全隨機字串喔！', // 使用 128 個字元的隨機字串
}));

app.get('/', function (req, res) {
    console.info(req.query.name);
    if (req.session.name) {
        req.session.name = req.query.name;
        res.send('Name:' + req.session.name);
    } else {
        req.session.name = 'nobody';
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 365;
        res.send("請在網址後加上？name=你取的名字");
    }
    console.log(req.session);
});