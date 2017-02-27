login = {
	getDoms:function(){
		this.doms = {
			unlogin : $('#unlogin'),
			login	: $('#login'),
			username: $("#username")
		}
	},
	checkLogin:function(){
		if(SAL_cookie.check("username")){
			var doms = this.doms ;
			doms.unlogin.css('display', 'none');
			doms.login.css('display', 'block');

			var username_value = SAL_cookie.read("username");
			doms.username.text(username_value);
		}
	},
	init:function(){
		this.getDoms();
		this.checkLogin();
	}
};

$(function(){
	login.init();
});