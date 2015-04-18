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


  $('#site-submit').click(function(e){
  	e.preventDefault();

  	var formData = {
  		'title' : $('#site-title').val(),
  		'url' : $('#site-url').val(),
  		'description' : $('#site-description').val(),
  		'tags' : $('#site-tags').val(),
  		'timestamp' : formatDate(),
  		'page' : window.location.href
  	}

  	console.log(formData);

  	$.ajax({
  		type : 'POST',
  		data : formData,
  		url : 'http://api.thejobist.com/sites/add/',
  	}).always(function(d){
  		console.log(d);
  	});

  });

});

function formatDate(dateObj) {
	if(!dateObj){dateObj = new Date();}

	var year = dateObj.getFullYear();
	var month = dateObj.getMonth() + 1;
	if (month == 13) { month = 1;}
	var day = dateObj.getDate();

	var datePart = year.toString() + '-' + month.toString() + '-' + day.toString();

	var hours = dateObj.getHours();
	var mins = dateObj.getMinutes();
	if (mins < 10) { mins = '0' + mins.toString();}

	var timePart = hours.toString() + ':' + mins.toString();

	return datePart + ' ' + timePart;

}