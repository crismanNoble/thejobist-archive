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

  if($('#dump').length > 0) {
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
  }

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

  var adminRow = '<tr data-who="{{index}}">
  <td>{{index}}</td>
	<td>{{title}}<br/><input type="text" value="{{title}}" data-key="title" placeholder="title" class="js-typeable"/></td>
	<td>{{url}}<br/><input type="text" value="{{url}}" data-key="url" placeholder="url" class="js-typeable"/><a href="{{url}}" target="_blank">see it</a></td>
	<td>{{description}}<br/><input type="text" value="{{description}}" data-key="url" placeholder="description" class="js-typeable"/></td>
	<td>{{tags}}<br/><input type="text" value="{{description}}" data-key="url" placeholder="description" class="js-typeable"/></td>
	<td>{{added}}</td>
	<td>{{upvotes}}<br/><input type="text" value="{{upvotes}}" data-key="upvotes" placeholder="upvotes" class="js-typeable"/></td>
	<td>{{approved}}<br/><input type="text" value="{{approved}}" data-key="approved" placeholder="approved (0 or 1)" class="js-typeable"/></td>
	<td><button data-action="remove" class="js-clickable">delete</button></td>
  </tr>';

  var adminRowTemplate = Handlebars.compile(adminRow);

  if($('#js-admin_everything').length > 0) {
  	var $table = $('#js-admin_everything');
  	$.getJSON('http://api.thejobist.com/sites/all/',function(d){
  		for (var i=0; i<d.length; i++){
  			var html = adminRowTemplate(d[i]);
				$table.append(html);
  		}
  		bindAdminEvents();
  	});

  	function bindAdminEvents(){
	  	$('.js-clickable').click(function(e){
	  		e.preventDefault();
	  		var who = findParent($(this));
	  		console.log(who);
	  		if($(this).data('action') == 'remove') {
	  			//probaly want confirmation here
	  			$.ajax({
	  				method : 'GET',
	  				data : {'id': who},
	  				url : 'http://api.thejobist.com/sites/remove/'
	  			}).success(function(d){
	  				console.log(d);
	  			});
	  		}

	  	});

	  	$('.js-typeable').blur(function(e){
	  		e.preventDefault();
	  		var who = findParent($(this));
	  		console.log('typed');
	  		console.log(who);
	  		var what = $(this).data('key');
	  		var newVal = $(this).val();
	  		$.ajax({
	  				method : 'POST',
	  				data : {'id': who,'what':what,'howmuch':newVal},
	  				url : 'http://api.thejobist.com/sites/update/'
	  			}).success(function(d){
	  				console.log(d);
	  			});
	  	});
  	}


  }

});

function findParent(who){
	return $(who).parent().parent().data('who');
}

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