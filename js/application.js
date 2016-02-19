$(document).ready(function(){
	
	var headerTemplate = $.get('js/templates/header.handlebars', function(data){
		var compiledTemplate = Handlebars.compile(data);
		var html = compiledTemplate({});
		$('#header').html(html);
	});
	
	var footerTemplate = $.get('js/templates/footer.handlebars', function(data){
		var compiledTemplate = Handlebars.compile(data);
		var html = compiledTemplate({});
		$('#footer').html(html);
	});
	
	var navTemplate = $.get('js/templates/nav.handlebars', function(data){
		var compiledTemplate = Handlebars.compile(data);
		var html = compiledTemplate({});
		$('#nav').html(html);
	});
	
});