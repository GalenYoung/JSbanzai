$("#submit").click(function(e){
	e.preventDefault();
	var comment_cont = $("#comment_box").val();

	$.ajax({
		url: '/detail/comment',
		type: 'POST',
		dataType: 'json',
		data: {
			detailMark: 'value1',
			
			commentCont:comment_cont
		},
	})
	.done(function(data) {
		console.log("success");
	})
	.fail(function(err) {
		console.error(err);
	});
});

	