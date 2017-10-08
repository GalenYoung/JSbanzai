(function($) {
	let Cookie = window.tool.Cookie;

	if (Cookie.check('username')) {
		window.$('#submit').click(function(e) {
			var commentCont = $('#comment_box').val();
			var usersContBox = $('#users');
			var username = Cookie.read('username');

			e.preventDefault();

			$.ajax({
					url: '/detail/comment',
					type: 'POST',
					data: {
						detailMark: window.detailID,
						username: username,
					},
				})
				.done(function(data) {
					if (data === 'success') {
						usersContBox.prepend('<li><div class="user">' + username + ' </div><div class="user-cont"> ' + commentCont + ' </div></li>');
					}
				})
				.fail(function(err) {
					console.error(err);
				});
		});
	}
})(window.jQuery);