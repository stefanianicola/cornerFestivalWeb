$(document).ready(function(){

	// One Page Animation
	$('a.qa-anchorLink').on('click', function(){
	    $('html, body').animate({
	        scrollTop: (($( $(this).attr('href') ).offset().top) - 70)
	    }, 500);
	    return false;
	});

	// Slide Behavior
	$(".qa-slide").slick({
		lazyLoad: 'ondemand', // ondemand progressive anticipated
		infinite: false,
		autoplay: true,
  		autoplaySpeed: 2000,
  		dots: true,
  		arrows: false
	});

	// Open mobile menu
	$('.qa-burguer-icon').on('click', function (event) {
		$(this).next(".qa-menu").slideToggle();
		$('.qa-navigation').toggleClass('qa-active');
		event.stopPropagation();
	});

	// Tags and tooltips
	$('.qa-tag').on('click', function (event) {
		if($(event.currentTarget).hasClass('qa-active')){
			$(this).removeClass('qa-active');
		}else{
			$('.qa-tag').removeClass('qa-active');
			$(this).toggleClass('qa-active');
		}
		event.stopPropagation();
	});

	// Paralax animation
	var playScroll = function(){
		bodyScroll = jQuery(window).scrollTop();
		slideH = jQuery('.qa-slide').length > 0 ? jQuery('.qa-slide').outerHeight() : 0;
		usH = jQuery('#usPage').length > 0 ? jQuery('#usPage').outerHeight( true ) : 0;
		firstServiceH = jQuery('#qa-first-service').length > 0 ? jQuery('#qa-first-service').outerHeight( true ) : 0;
		secondServiceH = jQuery('#qa-second-service').length > 0 ? jQuery('#qa-first-service').outerHeight( true ) : 0;
		thirdServiceH = jQuery('#qa-third-service').length > 0 ? jQuery('#qa-first-service').outerHeight( true ) : 0;
		fourthServiceH = jQuery('#qa-fourth-service').length > 0 ? jQuery('#qa-first-service').outerHeight( true ) : 0;
		
		// items homepage animation
		if(bodyScroll > (slideH/2)) {
			jQuery('#usPage').addClass('qa-parallax-active');
		}else{
			//jQuery('#usPage').removeClass('qa-parallax-active');
		}

		if(bodyScroll > (slideH+(usH/2))) {
			jQuery('#qa-first-service').addClass('qa-parallax-active');
		}else{
			//jQuery('#qa-first-service').removeClass('qa-parallax-active');
		}

		if(bodyScroll > (slideH+usH+(firstServiceH/3))) {
			jQuery('#qa-second-service').addClass('qa-parallax-active');
		}else{
			//jQuery('#qa-second-service').removeClass('qa-parallax-active');
		}

		if(bodyScroll > (slideH+usH+firstServiceH+(secondServiceH/3))) {
			jQuery('#qa-third-service').addClass('qa-parallax-active');
		}else{
			//jQuery('#qa-third-service').removeClass('qa-parallax-active');
		}

		if(bodyScroll > (slideH+usH+firstServiceH+secondServiceH+(thirdServiceH/4))) {
			jQuery('#qa-fourth-service').addClass('qa-parallax-active');
		}else{
			//jQuery('#qa-fourth-service').removeClass('qa-parallax-active');
		}
	}

	$( window).scroll(function() {
		var winWidth = window.outerWidth;
		if (winWidth > 1024) {
			playScroll();
		}
	});

	// Get the modal
	var modal = $("#myModal");

	// Get the image and insert it inside the modal - use its "alt" text as a caption
	var captionText = $("#caption");

	$(".qa-container").on('click', '.modal-source', function(){
		console.log('aca');
	  modal.show();
	  modal.find('.modal-content').attr('src', $(this).attr('src'));
	  modal.find(captionText).html($(this).attr('alt'));
	})

	// When the user clicks on <span> (x), close the modal
	modal.find(".close").on('click', function(){
		modal.hide();
	})


});

/*----------------------------------------------------*/
/*  contact form Contact
------------------------------------------------------*/

$('form#contactForm button.send-form').click(function() {
  $('#image-loader').addClass('qa-active')
  var contactCompany = $('#contactForm #qa-company').val();
  var contactEmail = $('#contactForm #qa-email').val();
  var contactCheck = $('#contactForm #qa-check').is(":checked") ? 'Si' : 'No';
  var contactMessage = $('#contactForm #qa-message').val();

  var data = '&contactCompany=' + contactCompany + '&contactEmail=' + contactEmail + '&contactCheck=' + contactCheck + '&contactMessage=' + contactMessage;

  $.ajax({
    type: "POST",
    url: "inc/sendEmail.php",
    data: data,
    success: function(msg) {
        // Message was sent
        if (msg == 'OK') {
           $('#image-loader').removeClass('qa-active');
           $('#message-warning').hide();
           //$('#contactForm').fadeOut();
           $('#message-success').fadeIn();   
        }
        // There was an error
        else {
           $('#image-loader').removeClass('qa-active')
           $('#message-warning').html(msg);
           $('#message-warning').fadeIn();
        }

    }

  });
  
  return false;
});