var likeButton = $("#likeButton"),
	likeUrl = location.pathname;

likeButton.on('click', function(e) {
	e.preventDefault();
	indexlikeUrl = likeUrl.indexOf("/",1);
	slicelikeUrl = likeUrl.slice(indexlikeUrl + 1, likeUrl.length - 1);
	console.log(slicelikeUrl);
	ajaxData = {
		'likedUrl': slicelikeUrl
	};
	$.ajax({
        type: 'POST',
        url: '/like.php',
        data: ajaxData,
        dataType: 'json',
        success: function(data) {
        	alert("clicked");

        }
    });
});
ajaxDataCounter = {
	'getCounter':true
}
$.ajax({
	type: 'POST',
	url: '/like.php',
	data: ajaxDataCounter,
	dataType: 'json',
	success: function(data) {
		if(!data.error) {
			likeButton.append(data.counter);
		}
	}
});