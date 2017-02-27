var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require("fs");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }); 
var userinfo = require("./../data-storage/userinfo.json");
//var cookieParser = require('cookie-parser');

//tools
Array.prototype.contains = function(el){
    for (index in this){
        if( this[index] === el) return  {"contain":true,"location":index} ;
    };
    return {contains:false,location:null} ;
};

//homepage
router.get('/', function(req, res) {
	res.render('index/index');
});

//detail
router.get('/detail/01', function(req, res) {
  res.render('detail/01');
});

//comment
router.post('/detail/comment', function(req, res) {
  
});

//entry
router.get('/entry', function(req, res) {
  res.render('entry/entry');
});

router.post('/entry/ent',urlencodedParser, function(req, res) {
	if (!req.body) return res.sendStatus(400);  
 
    var username = req.body.username;
    var password = req.body.password;	

    fs.readFile("./data-storage/userinfo.json","utf8",function (error,data){
     	if(error) return console.error(error); 

     	var userinfo_data = JSON.parse(data);
     	var username_set = [];
     	var username_val_set = [];
     	
        //check username
     	for(var i = 0 ; i < userinfo_data.length ; i++){
     		username_set.push(userinfo_data[i].username);
            username_val_set.push(userinfo_data[i].pwd);
     	};

        if(username_set.contains(username)["contain"]){
            if(username_val_set[username_set.contains(username)["location"]] === password){
                console.log("登录成功！");
                //登录成功
                res.cookie("username",username,{ maxAge:7*24*60*60*1000, path:"/"});
                res.redirect('/');
            }else{
                //密码不正确
                console.log("密码不正确");
                res.render('entry/entry');
            }
        }else{
            //用户名不存在
            console.log("用户名不存在");
            res.render('entry/entry');
        };
    });
});

//register
router.get('/register', function(req, res) {
  res.render('register/register');
});

router.post('/register/reg', urlencodedParser,function(req, res) {
	if (!req.body) return res.sendStatus(400);  
 
    var username = req.body.username;
    var password = req.body.password;

  	fs.readFile("./data-storage/userinfo.json","utf8",function (error,data){
     	if(error) return console.error(error); 

     	var userinfo_data = JSON.parse(data);
     	var username_set = [];
     	//check username
     	for(var i = 0 ; i < userinfo_data.length ; i++){
     		username_set.push(userinfo_data[i].username);
     	};
     	if(username_set.contains(username)["contain"]){
     		res.render('register/register');
     	}else{
	     	//write userinfo.json
	     	userinfo_data.push({"username":username,"pwd":password});
	     	fs.writeFile("./data-storage/userinfo.json",JSON.stringify(userinfo_data),function(error){
	     		if(error) return console.error(error);
	     	});	

	     	//res.render('index/index',{"is_login":true,"username":username});
	     	res.cookie("username",username,{ maxAge:7*24*60*60*1000, path:"/"});
	     	res.redirect('/')
     	};
	});

       
});

module.exports = router;