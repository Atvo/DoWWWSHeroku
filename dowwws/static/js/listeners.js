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
			alert("Unfortunately you cannot buy the product at the moment. Please leave your request through the question form and we will get in touch when the mats are available. Thank you!");
			location.reload(forceGet=true);
		});
	});

	$( ".popUpImage" ).on( "click", function( event ) {
		var imageCopy = $(this).clone();
	    height = this.naturalHeight;
	    width = this.naturalWidth;
	    windowWidth = $(window).width();
	    windowHeight = $(window).height();
	    var x = windowWidth / 2 - width / 2;
	    var y = windowHeight / 2 - height / 2;
	    imageCopy.bPopup({
	        positionStyle: 'fixed',
	        position: [x, y],
	    });
	})

});