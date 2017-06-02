var mongoose = require("mongoose");	
var Schema = mongoose.Schema;	
var userScheMa = new Schema({
	uname	: String,
	pwd		: String,
	uid		: Number
});	
exports.userinfo = mongoose.model('userinfo', userScheMa); //	与数据库中的userinfo集合关联