$(document).ready(function(){

	$('html').removeClass('no-js');

	var source   = '<div class="site">
      <h3>{{title}}</h3>
      <p>via <a href="{{url}}">{{url}}</a></p>
      <p>{{description}}</p>
      <p><em>{{tags}}</em></p>
      <p>votes:{{votes}}</p>
      <p>more:<a href="{{url}}">{{slug}}</a></p>
      </div>';
  var siteCard = Handlebars.compile(source);

  $.getJSON('data.json',function(d){
  	//console.log(d);
    $dump = $('#dump');
    for (var i=0; i<d.length; i++){
    	var context = d[i];
    	var slug = context.title.toLowerCase().replace(/[^\w]/gi,'-');
    	context.slug = slug;
			var html = siteCard(context);
			$dump.append(html);
    }
  });

});