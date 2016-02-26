$(document).ready(function(){
	var scheduleData, reviews;
	$.when(
		$.getJSON('json/scheduledtrainings.json', function(data){
			scheduleData = data;
		}),
		$.getJSON('json/postworkshop.json', function(data){
			//Creates loop to find stars for reviews
			reviews = $.map(data, function(row){
				row.stars = [];
				for(var i = 0; i < row.satisfaction; i++){
					row.stars[i] = i;
				}
				return row;
			});
	}))
		.then(function(){
		
			var sections = [
				{file:'js/templates/header.handlebars', div: '#header', context: {}}, 
				{file:'js/templates/footer.handlebars', div: '#footer', context: {}},
				{file:'js/templates/nav.handlebars', div: '#nav', context: {}} ,
				{file:'js/templates/review.handlebars', div: '#productReview', context: reviews},
				{file:'js/templates/schedule.handlebars', div: '#trainingSchedule', context: scheduleData}
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

