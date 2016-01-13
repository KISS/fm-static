/***************  
	Image Sliders
****************/

$(document).ready(function($) {  
	var slideCount = $('#slider ul li').length;
	var slideWidth = $('#slider ul li').width();
	var slideHeight = $('#slider ul li').height();
	var sliderUlWidth = slideCount * slideWidth;
	
	$('#slider').css({ width: slideWidth, height: slideHeight });
	
	// $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
	
    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    }

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    }

	// case study slider arrows
	$('a.mod-spotlight__slider-arrow-left').click(function(e) {
		e.preventDefault();
	    moveLeft();
	});
	$('a.mod-spotlight__slider-arrow-right').click(function(e) {
		e.preventDefault();
	    moveRight();
	});

	// general slider arrows
	$('a.mod-showcase__slider-arrow-left').click(function(e) {
		e.preventDefault();
	    moveLeft();
	});
	$('a.mod-showcase__slider-arrow-right').click(function(e) {
		e.preventDefault();
	    moveRight();
	});
});



/***************  
	Nav
****************/

// Menu toggle //
$('.nav__toggle').click(function(x) {

    if( $( '.header-container' ).hasClass( 'nav-open' ) ) {
    	$( 'body' ).removeClass('no-scroll overlay');
    	$( '.header-container' ).removeClass('nav-open');
		$( '.nav-items--inner' ).removeClass('nav-items--inner--selected');
    } else {
    	$( 'body' ).addClass('no-scroll overlay');
    	$( '.header-container' ).addClass('nav-open');
		$( '.nav-items--inner' ).removeClass('nav-items--inner--selected');
	}
});

// Nav scroll // 
$(window).on('scroll', function(e){
	var headerContainer = $('.page-container');
	var navToggle = $('.nav__toggle');
	var fixedNav = $('.header-container');
	var fixedNavPosition = fixedNav.offset().top + 1;
	var screenTop = headerContainer.offset().top;
	var query = Modernizr.mq('(min-width: 1024px)');

	if($(fixedNav).scrollTop() < fixedNavPosition) {
		fixedNav.addClass('header-container--on-scroll');
	} 
	if($(window).scrollTop() <= screenTop) {
		fixedNav.removeClass('header-container--on-scroll');
	}

	e.preventDefault();
    e.stopPropagation();
	return false;
});


// Nav Open // 
$('.nav-items--section').click(function(x) {
	if($('.nav-items--inner').find('ul.inner-nav__content').length !==0 ) {
		console.log("baam");
		return true;
	}
	if($(this).find('ul.nav-items--inner').length !==0 ) {
		x.preventDefault();
		if( $( '.header-container' ).hasClass( 'nav-open' ) ){
			$( '.header-container__nav' ).addClass('nav-open--selection');
			$( 'body' ).addClass('no-scroll overlay');
		} else {
			$( '.header-container__nav' ).removeClass('nav-open--selection');
			$( 'body' ).removeClass('no-scroll overlay');
		}
		x.stopPropagation();
	} else  {
		return true;
	}
});


// DESKTOP ONLY
var query = Modernizr.mq('(min-width: 1024px)');
if (query) {	

	//Body clicked desktop
	$('body').click(function() {
		$( 'body' ).removeClass('no-scroll overlay');
		$( '.header-container__nav' ).removeClass('nav-open--selection');
		$( '.nav-items--inner' ).removeClass('nav-items--inner--selected');

		if( $('.header-container').hasClass('header-container--on-scroll') ) {
			$('.nav-items').css('display', 'none');
			$('.header-container').removeClass('nav-open');
		}
	});

	$('.page-container').click(function(e) {
	    e.stopPropagation();
	});

	// Nav Open // 
	$('.nav-items--section').click(function(x) {
		if($(this).find('li.nav-items--inner').length !==0 ) {
				$( '.header-container__nav' ).addClass('nav-open--selection');
				$( 'body' ).addClass('no-scroll overlay');
				
				$('body').click(function() {
					$( 'body' ).removeClass('no-scroll overlay');
					$( '.header-container__nav' ).removeClass('nav-open--selection');
					$( '.nav-items--inner' ).removeClass('nav-items--inner--selected');
				});

				x.stopPropagation();
			}
	});

	// Nav Scroll // 
	$(window).on('scroll', function(e){
		var headerContainer = $('.page-container');
		var navToggle = $('.nav__toggle');
		var fixedNav = $('.header-container');
		var fixedNavPosition = fixedNav.offset().top + 1;
		var screenTop = headerContainer.offset().top;
		// shift from initial start
		if($(fixedNav).scrollTop() < fixedNavPosition) {
			fixedNav.addClass('header-container--on-scroll');
			$('.nav-items').css('display', 'none');
			$('body').removeAttr('class');
				
				// Nav toggle
				$('.nav__toggle').click(function() {
					if($( '.header-container' ).hasClass( 'nav-open')){
						$('.nav-items').css('display', 'block');
					}

					if(!$('.header-container').hasClass( 'nav-open')){
						$('.nav-items').css('display', 'none');
					}
				});
			}
		// back to initial start
		if($(window).scrollTop() <= screenTop) {
			fixedNav.removeClass('header-container--on-scroll');
			$('.nav-items').css('display', 'block');
		}

		e.preventDefault();
	    e.stopPropagation();
		return false;
	});		
}


// MOBILE sub nav
$('.inner-nav__header').click(function(e) {
	e.preventDefault();
	$('.nav-items--inner').removeClass('nav-items--inner--selected');
});


// DESKTOP sub nav
// franchises
$('.outer-nav__franchises').on('click', function(e) {
	e.preventDefault();
	$('#inner-nav__franchises').addClass('nav-items--inner--selected');
	$('.nav-items--outer').removeClass('nav-items--outer--selected');
	$('.outer-nav__franchises').addClass('nav-items--outer--selected');

	$('#inner-nav__platforms').removeClass('nav-items--inner--selected');
	$('#inner-nav__advertising').removeClass('nav-items--inner--selected');
	$('#inner-nav__contactus').removeClass('nav-items--inner--selected');
	$('#inner-nav__subscribe').removeClass('nav-items--inner--selected');

	$('.nav__toggle').click(function(){
		$( '.header-container__nav' ).removeClass('nav-open--selection');
	});
});
// platforms
$('.outer-nav__platforms').on('click', function(e) {
	e.preventDefault();
	$('#inner-nav__platforms').addClass('nav-items--inner--selected');
	$('.nav-items--outer').removeClass('nav-items--outer--selected');
	$('.outer-nav__platforms').addClass('nav-items--outer--selected');

	$('#inner-nav__franchises').removeClass('nav-items--inner--selected');
	$('#inner-nav__advertising').removeClass('nav-items--inner--selected');
	$('#inner-nav__contactus').removeClass('nav-items--inner--selected');
	$('#inner-nav__subscribe').removeClass('nav-items--inner--selected');

	$( '#inner-nav__platforms-more__items' ).hide();

	if (query) { $( '#inner-nav__platforms-more__items' ).show(); }

	$('.inner-nav__platforms-more--open').click(function(p) {
	    p.preventDefault();
		$('#inner-nav__platforms-more__items').css('display', 'block');
		$(".inner-nav__platforms-more--open").hide();

		$('.nav__toggle').click(function() {
			$('#inner-nav__platforms-more__items').css('display', 'none');
			$(".inner-nav__platforms-more--open").show();
		});
	});       

	$('#inner-nav__platforms-more--close').click(function(y) {
		y.preventDefault();
		$('#inner-nav__platforms-more__items').css('display', 'none');
		$(".inner-nav__platforms-more--open").show();
	});

	$('.nav__toggle').click(function(){
		$( '.header-container__nav' ).removeClass('nav-open--selection');
	});
});
// advertising
$('.outer-nav__advertising').on('click', function(e) {
	e.preventDefault();
	$('#inner-nav__advertising').addClass('nav-items--inner--selected');
	$('.nav-items--outer').removeClass('nav-items--outer--selected');
	$('.outer-nav__advertising').addClass('nav-items--outer--selected');

	$('#inner-nav__franchises').removeClass('nav-items--inner--selected');
	$('#inner-nav__platforms').removeClass('nav-items--inner--selected');
	$('#inner-nav__contactus').removeClass('nav-items--inner--selected');
	$('#inner-nav__subscribe').removeClass('nav-items--inner--selected');

	$('.nav__toggle').click(function(){
		$( '.header-container__nav' ).removeClass('nav-open--selection');
	});
});
// contact us
$('.outer-nav__contactus').on('click', function(e) {
	e.preventDefault();
	$('#inner-nav__contactus').addClass('nav-items--inner--selected');
	$('.nav-items--outer').removeClass('nav-items--outer--selected');
	$('.outer-nav__contactus').addClass('nav-items--outer--selected');

	$('#inner-nav__franchises').removeClass('nav-items--inner--selected');
	$('#inner-nav__platforms').removeClass('nav-items--inner--selected');
	$('#inner-nav__advertising').removeClass('nav-items--inner--selected');
	$('#inner-nav__subscribe').removeClass('nav-items--inner--selected');

	$('.nav__toggle').click(function(){
		$( '.header-container__nav' ).removeClass('nav-open--selection');
	});
});
// subscribe
$('.outer-nav__subscribe').on('click', function(e) {
	e.preventDefault();
	$('#inner-nav__subscribe').addClass('nav-items--inner--selected');
	$('.nav-items--outer').removeClass('nav-items--outer--selected');
	$('.outer-nav__subscribe').addClass('nav-items--outer--selected');

	$('#inner-nav__franchises').removeClass('nav-items--inner--selected');
	$('#inner-nav__platforms').removeClass('nav-items--inner--selected');
	$('#inner-nav__advertising').removeClass('nav-items--inner--selected');
	$('#inner-nav__contactus').removeClass('nav-items--inner--selected');

	$('.nav__toggle').click(function(){
		$( '.header-container__nav' ).removeClass('nav-open--selection');
	});
});



/***************  
	Pages
****************/

// Across all Platforms: page sub-nav
$(".across-platforms__header--1").on('click', function(e) {
	e.preventDefault();
	$(".across-platforms__items-2, .across-platforms__items-3, .across-platforms__items-4").hide();
   	$('.across-platforms__items-1').show();
   	e.stopPropagation();
});
$(".across-platforms__header--2").on('click', function(e) {
	e.preventDefault();
	$(".across-platforms__items-1, .across-platforms__items-3, .across-platforms__items-4").hide();
    $('.across-platforms__items-2').show();
    e.stopPropagation();
});
$(".across-platforms__header--3").on('click', function(e) {
	e.preventDefault();
    $(".across-platforms__items-1, .across-platforms__items-2, .across-platforms__items-4").hide();
    $('.across-platforms__items-3').show();
    e.stopPropagation();
});
$(".across-platforms__header--4").on('click', function(e) {
  	e.preventDefault();
    $(".across-platforms__items-1, .across-platforms__items-2, .across-platforms__items-3").hide();
    $('.across-platforms__items-4').show();
    e.stopPropagation();
});