$.noConflict();

jQuery(document).ready(function($) {
  var actualCategory, allgemeinPOST, anleitungPOST, jx, loadMorePosts, markAsActiveCategory, more, pflegeberichtPOST, postDBFile, posts, produkttestPOST;
  jx = $('#jqajaxhere');
  more = $('#loadmoreScript');
  allgemeinPOST = $('#allgemeinPOST');
  produkttestPOST = $('#produkttestPOST');
  pflegeberichtPOST = $('#pflegeberichtPOST');
  anleitungPOST = $('#anleitungPOST');
  actualCategory = null;
  posts = null;
  postDBFile = 'test.json';
  markAsActiveCategory = function(category) {
    return $.each($('#catSwitch span'), function() {
      if ($(this).data('category') === category) {
        $(this).addClass('activeCat');
      } else {
        $(this).removeClass('activeCat');
      }
    });
  };
  loadMorePosts = function(category, end) {
    var inc, start;
    if (end == null) {
      end = 5;
    }
    start = jx.find('li').length;
    markAsActiveCategory(category);
    if (actualCategory !== category) {
      actualCategory = category;
      start = 0;
      jx.html(' ');
    }
    inc = 0;
    return $.each(posts[category], function(key, val) {
      if (key >= start && inc < end) {
        jx.append($(val.card).fadeIn('slow'));
        inc++;
      }
    });
  };
  $.getJSON(postDBFile, function(data) {
    posts = data;
    allgemeinPOST.on('click', function() {
      return loadMorePosts('allgemein');
    });
    anleitungPOST.on('click', function() {
      return loadMorePosts('anleitungen');
    });
    pflegeberichtPOST.on('click', function() {
      return loadMorePosts('pflegeberichte');
    });
    produkttestPOST.on('click', function() {
      return loadMorePosts('produkttest');
    });
  });
});