var 
	postsToLoad    = $(".post--list").children().length,
	buttonLoadMore = $(".loadmore"),
	loaded         = postsToLoad,
	maxPostsReload = 5;

buttonLoadMore.on('click', function(e) {
	//disable href
	e.preventDefault();

	//load content into var data
	
	getDataDB = $(this).data("db");
	loadMorePosts(getDataDB);
});

loadMorePosts = function(args) {
	args = args || '';
	$.get('/scrollDB' + args + '.html', function(data) {

		for( var i = 0; i < maxPostsReload; i++ ) {
			//loop through data and find next post-link
			tempData = $(data).find(".post--list li")[loaded];
			loaded++;

			if( !tempData ) {
				//no more posts, so hide the button
				buttonLoadMore.fadeOut("fast");
				return;

			}
			//append the new post to the list
			$(tempData).appendTo(".post--list");
	 	}
	});
}