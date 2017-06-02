let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require("fs");
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let userinfo = require("./../data-storage/userinfo.json");
//let cookieParser = require('cookie-parser');

//tools
function Utility(){};
Utility.prototype = {
    isArray : function(obj){
        return Object.prototype.toString.call(obj) === '[object Array]';
    },
    contain : function(arr,el){
        if( !this.isArray(arr) ) return console.error("The first parameter does not belong to Array!");
        for (index in arr){
            if( arr[index] === el) return  {"contain":true,"location":index} ;
        };
        return {contain:false,location:null} ;
    }
};
let utility = new Utility();

function fillZero(variable,digit){
    var variable = Number(variable);
    var digit  = Number(digit) || 10 ;
    if(digit !== 10 && digit !== 100 && digit !== 1000) return console.warn("输入的digit参数类型不正确！");
    var digit_length = String(digit).length; 
    var variable_length = String(variable).length;

    if(variable < digit){
        for(let m = 0 ; m < (digit_length - variable_length) ; m++ ){
            variable = '0'+ variable ;
        };
        return variable; 
    }else{
        return variable;
    };
};

//homepage
router.get('/', function(req, res) {
	res.render('index/index');
});

//detail

fs.readdir(__dirname + './../views/detail/',function(err,files){  //__dirname为当前目录，后可接相对地址
    if(err) return console.error(err);

    for(let j = 1 ; j <= files.length ;j++){
        j = fillZero(j);
        router.get('/detail/' + j, function(req, res) {
            fs.readFile("./data-storage/detail_data.json","utf8",function(error,data){
                if(error) return console.error(error);
                
                let detail_data = JSON.parse(data);
                res.render('detail/' + j, { detailID : j ,comments : detail_data[j]["comments"]});
            });        
            
        });
    };
})



 

//comment
router.post('/detail/comment', urlencodedParser,function(req, res) {
    let detailMark = req.body.detailMark;
    let username = req.body.username;
    let commentCont = req.body.commentCont;
    let new_comment = {
        "username" : username,
        "comment"  : commentCont
    };

    if( detailMark && username && commentCont ){
        fs.readFile("./data-storage/detail_data.json","utf8",function(error,data){
            if(error) return console.error(error);
            
            let detail_data = JSON.parse(data);

            detail_data[detailMark]["comments"].unshift(new_comment);

            fs.writeFile("./data-storage/detail_data.json",JSON.stringify(detail_data),function(error){
                if(error) return console.error(error);
                res.send("success");
            });
        });
    };
});

//entry
router.get('/entry', function(req, res) {
  res.render('entry/entry');
});

router.post('/entry/ent',urlencodedParser, function(req, res) {
	if (!req.body) return res.sendStatus(400);

    let username = req.body.username;
    let password = req.body.password;

    fs.readFile("./data-storage/userinfo.json","utf8",function (error,data){
     	if(error) return console.error(error);

     	let userinfo_data = JSON.parse(data);
     	let username_set = [];
     	let username_val_set = [];

        //check username
     	for(let i = 0 ; i < userinfo_data.length ; i++){
     		username_set.push(userinfo_data[i].username);
            username_val_set.push(userinfo_data[i].pwd);
     	};
        if(utility.contain(username_set,username)["contain"]){
            if(username_val_set[utility.contain(username_set,username)["location"]] === password){
                //登录成功
                console.log("登录成功！");
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

    let username = req.body.username;
    let password = req.body.password;

  	fs.readFile("./data-storage/userinfo.json","utf8",function (error,data){
     	if(error) return console.error(error);

     	let userinfo_data = JSON.parse(data);
     	let username_set = [];
        let uid = fillZero(userinfo_data.length + 1,1000);

     	//check username
     	for(let i = 0 ; i < userinfo_data.length ; i++){
     		username_set.push(userinfo_data[i].username);
     	};

     	if(utility.contain(username_set,username)["contain"]){
     		res.render('register/register');
     	}else{
	     	//write userinfo.json
	     	userinfo_data.push({"username":username,"pwd":password,"uid":uid,join_date : new Date()});
	     	fs.writeFile("./data-storage/userinfo.json",JSON.stringify(userinfo_data),function(error){
	     		if(error) return console.error(error);
                
                res.cookie("username",username,{ maxAge:7*24*60*60*1000, path:"/"});
                res.redirect('/')
	     	});
     	};
	});
});

module.exports = router;
