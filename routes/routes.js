let express = require('express');
let router = express.Router();
let fs = require('fs');
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({
    extended: false
});

//tools
function fillZero(variable) {
    return variable < 10 ? '0' + variable : String(variable);
}

//homepage
router.get('/', function(req, res) {
    res.render('index/index');
});

//detail
let detailLegnth = 2;
for (let j = 1; j <= detailLegnth; j++) {
    j = fillZero(j);

    router.get('/detail/' + j, function(req, res) {
        fs.readFile('./data-storage/detail_data.json', 'utf8', function(error, data) {
            if (error) return console.error(error);

            let detailData = JSON.parse(data);
            res.render('detail/' + j, {
                detailID: j,
                detailComments: JSON.stringify(detailData[j].comments)
            });
        });
    });
}

//comment
router.post('/detail/comment', urlencodedParser, function(req, res) {
    let detailMark = req.body.detailMark;
    let username = req.body.username;
    let commentCont = req.body.commentCont;
    let newComment = {
        'username': username,
        'comment': commentCont
    };

    if (detailMark && username && commentCont) {
        fs.readFile('./data-storage/detail_data.json', 'utf8', function(error, data) {
            if (error) return console.error(error);

            let detailData = JSON.parse(data);

            detailData[detailMark]['comments'].unshift(newComment);

            fs.writeFile('./data-storage/detail_data.json', JSON.stringify(detailData), function(error) {
                if (error) return console.error(error);
                res.send('success');
            });
        });
    }
});

//entry
router.get('/entry', function(req, res) {
    res.render('entry/entry');
});

router.post('/entry/ent', urlencodedParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);

    let username = req.body.username;
    let password = req.body.password;

    fs.readFile('./data-storage/userinfo.json', 'utf8', function(error, data) {
        if (error) return console.error(error);

        let userinfoData = JSON.parse(data);
        let usernameSet = [];
        let usernameValSet = [];

        //check username
        for (let i = 0; i < userinfoData.length; i++) {
            usernameSet.push(userinfoData[i].username);
            usernameValSet.push(userinfoData[i].pwd);
        }
        if (window.tool.arrayContain(usernameSet, username)['contain']) {
            if (usernameValSet[window.tool.arrayContain(usernameSet, username)['location']] === password) {
                //登录成功
                console.log('登录成功！');
                res.cookie('username', username, {
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    path: '/'
                });
                res.redirect('/');
            } else {
                //密码不正确
                console.log('密码不正确');
                res.render('entry/entry');
            }
        } else {
            //用户名不存在
            console.log('用户名不存在');
            res.render('entry/entry');
        }
    });
});

//register
router.get('/register', function(req, res) {
    res.render('register/register');
});

router.post('/register/reg', urlencodedParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);

    let username = req.body.username;
    let password = req.body.password;

    fs.readFile('./data-storage/userinfo.json', 'utf8', function(error, data) {
        if (error) return console.error(error);

        let userinfoData = JSON.parse(data);
        let usernameSet = [];
        //check username
        for (let i = 0; i < userinfoData.length; i++) {
            usernameSet.push(userinfoData[i].username);
        }

        if (window.tool.arrayContain(usernameSet, username)['contain']) {
            res.render('register/register');
        } else {
            //write userinfo.json
            userinfoData.push({
                'username': username,
                'pwd': password
            });
            fs.writeFile('./data-storage/userinfo.json', JSON.stringify(userinfoData), function(error) {
                if (error) return console.error(error);
                //res.render('index/index',{'is_login':true,'username':username});
                res.cookie('username', username, {
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    path: '/'
                });
                res.redirect('/');
            });
        }
    });


});

module.exports = router;