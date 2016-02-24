$(document).ready(function(){
	
	var postworkshop = $.getJSON('json/postworkshop.json', function(data){
		var reviews = $.map(data, function(row){
				row.stars = [];
				for(var i = 0; i < row.satisfaction; i++){
					row.stars[i] = i;
				}
				return row;
			});
		var sections = [
			{file:'js/templates/header.handlebars', div: '#header', context: {}}, 
			{file:'js/templates/footer.handlebars', div: '#footer', context: {}},
			{file:'js/templates/nav.handlebars', div: '#nav', context: {}} ,
			{file:'js/templates/review.handlebars', div: '#productReview', context: reviews}
		];
	
		$.each(sections, function(index, value){
			//Gets mustache file
			$.get(value.file, function(data){
				var compiledTemplate = Handlebars.compile(data);
				var html = compiledTemplate(value.context);
				//Places mustache file in correct location
				$(value.div).html(html);
			});
		});
	});
});

