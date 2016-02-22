$(document).ready(function(){
	
	var sections = [
		{file:'js/templates/header.handlebars', div: '#header'}, 
		{file:'js/templates/footer.handlebars', div: '#footer'},
		{file:'js/templates/nav.handlebars', div: '#nav'} 
	];
	
		$.each(sections, function(index, value){
			//Gets mustache file
			$.get(value.file, function(data){
				var compiledTemplate = Handlebars.compile(data);
				var html = compiledTemplate({});
				//Places mustache file in correct location
				$(value.div).html(html);
			});
		});
});

