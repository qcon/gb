// $.noConflict();
//   jQuery(document).ready(function($) {
//     jx = $('#jqajaxhere');
//     more = $('#loadmoreScript');
//     var posts = [];
//
//     $.getJSON('pflegeberichte.json', function(data) {
//       console.log('postjsin');
//       $.each(data, function(key, val) {
//         posts.push(val);
//       });
//       loadMorePosts(0, 5);
//     });
//
//
//     loadMorePosts = function (start, end) {
//         var inc = 0;
//         $.each(posts, function(key, val) {
//           if(key >= start && inc < end) {
//             jx.append($(val.card).fadeIn('slow'))
//             inc++;
//           }
//         });
//     }
//     more.on('click', function() {
//       loadMorePosts(jx.find('li').length, 5);
//     });
//
//
//
//   });








// $.noConflict();
//
//
// jQuery(document).ready ($) ->
//   jx = $('#jqajaxhere')
//   more = $('#loadmoreScript')
//   posts = []
//   postDBFile = 'pflegeberichte.json'
//
//   loadMorePosts = (start, end) ->
//     inc = 0
//     $.each posts, (key, val) ->
//       if key >= start and inc < end
//         jx.append $(val.card).fadeIn 'slow'
//         inc++
//         return
//     return
//
//    $.getJSON postDBFile, (data) ->
//       $.each data, (key, val) ->
//         posts.push val
//       loadMorePosts 0, 5
//       more.on 'click', ->
//         loadMorePosts jx.find('li').length, 5
//         return
//       return
//   return









$.noConflict();

jQuery(document).ready(function($) {
  var jx, loadMorePosts, more, postDBFile, posts;
  jx = $('#jqajaxhere');
  more = $('#loadmoreScript');
  posts = [];
  postDBFile = 'pflegeberichte.json';
  loadMorePosts = function(start, end) {
    var inc;
    inc = 0;
    $.each(posts, function(key, val) {
      if (key >= start && inc < end) {
        setTimeout(function () {
          jx.append($(val.card).delay('50').addClass('fullScale'))
        }, inc*200);
        inc++;
      }
    });
  };
  $.getJSON(postDBFile, function(data) {
    $.each(data, function(key, val) {
      return posts.push(val);
    });
    loadMorePosts(0, 5);
    more.on('click', function() {
      loadMorePosts(jx.find('li').length, 5);
    });
  });
});