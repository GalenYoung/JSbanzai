let $ = window.jQuery;
let Cookie = window.tool.Cookie;
let login = {
	getDoms: function() {
		this.doms = {
			unlogin: $('#unlogin'),
			login: $('#login'),
			username: $('#username')
		};
	},
	checkLogin: function() {
		if (Cookie.check('username')) {
			let usernameValue = Cookie.read('username');
			let doms = this.doms;
			doms.unlogin.css('display', 'none');
			doms.login.css('display', 'block');
			doms.username.text(usernameValue);
		}
	},
	init: function() {
		this.getDoms();
		this.checkLogin();
	}
};

$(function() {
	login.init();
});