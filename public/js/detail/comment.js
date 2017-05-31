if(SAL_cookie.check("username")){
	$("#submit").click(function(e){
		var comment_cont = $("#comment_box").val();
		var users_cont_box = $("#users");
		var username = SAL_cookie.read("username");

		e.preventDefault();
		$.ajax({
			url: '/detail/comment',
			type: 'POST',
			data: {
				detailMark : window.detailID,
				username   : username,
				commentCont: comment_cont
			},
		})
		.done(function(data) {
			if(data === "success"){
				users_cont_box.prepend('<li><div class="user">'+ username +' </div><div class="user-cont"> ' + comment_cont + ' </div></li>');
			}
		})
		.fail(function(err) {
			console.error(err);
		});
	});
};

	