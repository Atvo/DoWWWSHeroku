$(document).ready(function () {

	$( "#questionForm" ).on( "submit", function( event ) {
	  event.preventDefault();

	  var serialized =  $( this ).serialize();
	  var url_str = "new_question/";
	  $.post(url_str,
		{
			serialized: serialized
		},
		function(data,status){
			var message = data;
			alert("Question sent!");
			location.reload(forceGet=true);
		});
	});

	$( ".answerForm" ).on( "submit", function( event ) {
	  event.preventDefault();

	  var serialized =  $( this ).serialize();
	  var url_str = "reply_question/";
	  console.log(serialized);
	  $.post(url_str,
		{
			serialized: serialized
		},
		function(data,status){
			var message = data;
			alert("Reply sent!");
			location.reload(forceGet=true);
		});
	});

	$( "#buyForm" ).on( "submit", function( event ) {
	  event.preventDefault();

	  var serialized =  $( this ).serialize();
	  var url_str = "buy/";
	  $.post(url_str,
		{
			serialized: serialized
		},
		function(data,status){
			var message = data;
			alert("Unfortunately you cannot buy the product at the moment. Please leave your request through the contact form and we will get in touch when the mats are available. Thank you!");
			location.reload(forceGet=true);
		});
	});

});