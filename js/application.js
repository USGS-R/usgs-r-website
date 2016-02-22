$(document).ready(function(){
	
	var template = function(){
		$.each(files, function(index, value){
			//Gets mustache file
			$.get(value, function(data){
				var compiledTemplate = Handlebars.compile(data);
				var html = compiledTemplate({});
				//Places mustache file in correct location
				$(divs[index]).html(html);
			});
		});
	};
	
	var files = ['js/templates/header.handlebars', 'js/templates/footer.handlebars', 'js/templates/nav.handlebars'];

	var divs = ['#header', '#footer', '#nav'];
	
	template();

});

