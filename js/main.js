/*
==================================================================================
* Portfolio:  	 MHR RONY - Personal Portfolio
* Author: 	 Mhr Rony - (https://mhrrony.com)
* Company:       DevStation IT - (https://devstationit.com)
* Description:   Main Custom Script File
==================================================================================
* COPYRIGHT & LICENSE INFORMATION
==================================================================================
*
* © 2024-2026 Mhr Rony. All Rights Reserved.
*
* Portfolio Owner: Mhr Rony
* Personal Website: https://mhrrony.com
* Professional Email: mhrrony@gmail.com
* Company: DevStation IT
* Company Website: https://devstationit.com
*
* This portfolio and its source code are the intellectual property of Mhr Rony.
* Unauthorized copying, modification, distribution, or use of this code
* without explicit written permission from the author is strictly prohibited.
*
* For inquiries regarding licensing, collaboration, or usage rights,
* please contact: mhrrony@gmail.com
*
* Connect with me:
* - GitHub: https://github.com/MHR-RONY
* - LinkedIn: https://www.linkedin.com/in/mhrrony/
* - Portfolio: https://mhrrony.com
* - Company: https://devstationit.com
*
==================================================================================
*/

(function ($) {
	"use strict";

	// Preloader - Professional multi-stage loading
	var loaderHidden = false;

	// Stage 1: Hide loader when DOM is ready (HTML parsed, safe to interact)
	$(document).ready(function () {
		// Minimum display time for branding (800ms)
		setTimeout(function () {
			if (!loaderHidden) {
				$('.text-loader').fadeOut(300);
				$('.preloader').delay(100).fadeOut(400);
				loaderHidden = true;
			}
		}, 800);
	});

	// Stage 2: Ensure loader is hidden when all resources load
	$(window).on('load', function () {
		if (!loaderHidden) {
			$('.text-loader').fadeOut(300);
			$('.preloader').delay(100).fadeOut(400);
			loaderHidden = true;
		}
	});

	// Stage 3: Maximum wait time fallback (5 seconds) for slow connections
	setTimeout(function () {
		if (!loaderHidden) {
			$('.preloader').fadeOut(400);
			loaderHidden = true;
		}
	}, 5000);

	// Header Sticky
	$(window).on('scroll', function () {
		var stickytop = $('#header.sticky-top .bg-transparent');
		var stickytopslide = $('#header.sticky-top-slide');

		if ($(this).scrollTop() > 1) {
			stickytop.addClass("sticky-on-top");
			stickytop.find(".logo img").attr('src', stickytop.find('.logo img').data('sticky-logo'));
		}
		else {
			stickytop.removeClass("sticky-on-top");
			stickytop.find(".logo img").attr('src', stickytop.find('.logo img').data('default-logo'));
		}

		if ($(this).scrollTop() > 180) {
			stickytopslide.find(".primary-menu").addClass("sticky-on");
			stickytopslide.find(".logo img").attr('src', stickytopslide.find('.logo img').data('sticky-logo'));
		}
		else {
			stickytopslide.find(".primary-menu").removeClass("sticky-on");
			stickytopslide.find(".logo img").attr('src', stickytopslide.find('.logo img').data('default-logo'));
		}
	});

	// Sections Scroll
	$('.smooth-scroll').on('click', function () {
		event.preventDefault();
		var sectionTo = $(this).attr('href');
		$('html, body').stop().animate({
			scrollTop: $(sectionTo).offset().top - 50
		}, 1500, 'easeInOutExpo');
	});


	/*---------------------------------------------------
		Primary Menu
	----------------------------------------------------- */
	// Dropdown show on hover

	$('.primary-menu:not(.navbar-overlay):not(.navbar-expand-none) ul.navbar-nav li.dropdown').on("mouseover", function () {
		if ($(window).width() > 991) {
			$(this).find('> .dropdown-menu').stop().slideDown('fast');
			$(this).on('mouseleave', function () {
				$(this).find('> .dropdown-menu').stop().css('display', 'none');
			});

			// When dropdown going off to the out of the screen.
			$('.primary-menu ul.navbar-nav > li.dropdown > .dropdown-menu').each(function () {
				var menu = $('#header .primary-menu > div').offset();
				var dropdown = $(this).parent().offset();
				if ($("html").attr("dir") == 'rtl') {
					var rd = ($(window).width() - (dropdown.left + $(this).parent().outerWidth()));
					var i = (rd + $(this).outerWidth()) - (menu.left + $('#header .primary-menu > div').outerWidth());
				} else {
					var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#header .primary-menu > div').outerWidth());
				}
				if (i > 0) {
					if ($("html").attr("dir") == 'rtl') {
						$(this).css('margin-right', '-' + (i) + 'px');
					} else {
						$(this).css('margin-left', '-' + (i) + 'px');
					}
				}
			});
		}
	});

	$(function () {
		$(".dropdown li").on('mouseenter mouseleave', function (e) {
			if ($(window).width() > 991) {
				if ($('.dropdown-menu', this).length) {
					var elm = $('.dropdown-menu', this);
					var off = elm.offset();
					var l = off.left;
					var w = elm.width();
					var docW = $(window).width();
					var lr = ($(window).width() - (off.left + elm.outerWidth())); //offset right
					if ($("html").attr("dir") == 'rtl') {
						var isEntirelyVisible = (lr + w + 30 <= docW);
					} else {
						var isEntirelyVisible = (l + w + 30 <= docW);
					}
					if (!isEntirelyVisible) {
						$(elm).addClass('dropdown-menu-end');
						$(elm).parents('.dropdown:first').find('> a.dropdown-toggle > .arrow').addClass('arrow-end');
					} else {
						$(elm).removeClass('dropdown-menu-end');
						$(elm).parents('.dropdown:first').find('> a.dropdown-toggle > .arrow').removeClass('arrow-end');
					}
				}
			}
		});
	});

	// DropDown Arrow
	$('.primary-menu').find('a.dropdown-toggle').append($('<i />').addClass('arrow'));

	// Mobile Collapse Nav
	$('.primary-menu .dropdown-toggle[href="#"], .primary-menu .dropdown-toggle[href!="#"] .arrow').on('click', function (e) {
		if ($('nav').hasClass('navbar-overlay') && $('nav').hasClass('navbar-expand-none')) {
			var ww = 4000;
		} else {
			var ww = 991;
		}
		if ($(window).width() < (ww)) {
			e.preventDefault();
			var $parentli = $(this).closest('li');
			$parentli.siblings('li').find('.dropdown-menu:visible').slideUp();
			$parentli.find('> .dropdown-menu').stop().slideToggle();
			$parentli.siblings('li').find('a .arrow.show').toggleClass('show');
			$parentli.find('> a .arrow').toggleClass('show');
		}
	});

	// Mobile Menu
	$('.navbar-toggler').on('click', function () {
		$(this).toggleClass('show');
		$('#header.sticky-top-slide').find(".primary-menu").toggleClass("show");
	});
	$('.navbar-nav a:not(.dropdown-toggle)').on('click', function () {
		$('.navbar-collapse, .navbar-toggler').removeClass('show');
	});

	// Overlay Menu
	$('.navbar-overlay .collapse').on('show.bs.collapse hide.bs.collapse', function (e) {
		e.preventDefault();
	}),
		$('.navbar-overlay [data-bs-toggle="collapse"]').on('click', function (e) {
			e.preventDefault();
			$($(this).data('bs-target')).toggleClass('show');
		})

	/*---------------------------------
	   Carousel (Owl Carousel)
	----------------------------------- */
	$(".owl-carousel").each(function (index) {
		var a = $(this);
		$(this).owlCarousel({
			rtl: a.data('rtl'),
			autoplay: a.data('autoplay'),
			autoplayTimeout: a.data('autoplaytimeout'),
			smartSpeed: a.data('smartspeed'),
			slideTransition: a.data('slidetransition'),
			autoplayHoverPause: a.data('autoplayhoverpause'),
			loop: a.data('loop'),
			speed: a.data('speed'),
			nav: a.data('nav'),
			dots: a.data('dots'),
			center: a.data('center'),
			autoHeight: a.data('autoheight'),
			autoWidth: a.data('autowidth'),
			margin: a.data('margin'),
			stagePadding: a.data('stagepadding'),
			slideBy: a.data('slideby'),
			lazyLoad: a.data('lazyload'),
			//navText:['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			animateOut: a.data('animateout'),
			animateIn: a.data('animatein'),
			video: a.data('video'),
			items: a.data('items'),
			responsive: {
				0: { items: a.data('items-xs'), },
				576: { items: a.data('items-sm'), },
				768: { items: a.data('items-md'), },
				992: { items: a.data('items-lg'), }
			}
		});
	});

	/*------------------------------------
		Magnific Popup
	-------------------------------------- */
	// Image on Modal
	$('.popup-img').each(function () {
		$(this).magnificPopup({
			//delegate: '.popup-img:visible',
			type: "image",
			tLoading: '<div class="preloader"><div class="text-loader"><span>M</span><span>H</span><span>R</span><span class="space">&nbsp;</span><span>R</span><span>O</span><span>N</span><span>Y</span></div></div>',
			closeOnContentClick: !0,
			mainClass: "mfp-fade",
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0, 1]
			},
		});
	});

	// Ajax On Modal
	$('.popup-ajax').each(function () {
		$(this).magnificPopup({
			//delegate: '.popup-ajax:visible',
			type: "ajax",
			tLoading: '<div class="preloader"><div class="text-loader"><span>M</span><span>H</span><span>R</span><span class="space">&nbsp;</span><span>R</span><span>O</span><span>N</span><span>Y</span></div></div>',
			mainClass: "mfp-fade",
			closeBtnInside: true,
			midClick: true,
			gallery: {
				enabled: true,
			},
			callbacks: {
				ajaxContentAdded: function () {
					$(".owl-carousel").each(function (index) {
						var a = $(this);
						if ($("html").attr("dir") == 'rtl') {
							var rtlVal = true
						} else {
							var rtlVal = false
						}
						$(this).owlCarousel({
							rtl: rtlVal,
							autoplay: a.data('autoplay'),
							center: a.data('center'),
							autoplayTimeout: a.data('autoplaytimeout'),
							autoplayHoverPause: a.data('autoplayhoverpause'),
							loop: a.data('loop'),
							speed: a.data('speed'),
							nav: a.data('nav'),
							dots: a.data('dots'),
							autoHeight: a.data('autoheight'),
							autoWidth: a.data('autowidth'),
							margin: a.data('margin'),
							stagePadding: a.data('stagepadding'),
							slideBy: a.data('slideby'),
							lazyLoad: a.data('lazyload'),
							//navText:['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
							animateOut: a.data('animateOut'),
							animateIn: a.data('animateIn'),
							video: a.data('video'),
							items: a.data('items'),
							responsive: {
								0: { items: a.data('items-xs'), },
								576: { items: a.data('items-sm'), },
								768: { items: a.data('items-md'), },
								992: { items: a.data('items-lg'), }
							}
						});
					});
				}
			}
		});
	});

	// YouTube/Viemo Video & Gmaps
	$('.popup-youtube, .popup-vimeo, .popup-gmaps').each(function () {
		$(this).magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
		});
	});


	/*------------------------------------
		Isotope Portfolio Filter
	-------------------------------------- */
	$(window).on('load', function () {
		$(".portfolio-filter").each(function () {
			var e = $(this);
			e.imagesLoaded(function () {
				if ($("html").attr("dir") == 'rtl') {
					var rtlVal = false
				} else {
					var rtlVal = true;
				}
				var $grid = e.isotope({
					layoutMode: "masonry",
					originLeft: rtlVal
				});
				$(".portfolio-menu").find("a").on("click", function () {
					var filterValue = $(this).attr("data-filter");
					return $(".portfolio-menu").find("a").removeClass("active"), $(this).addClass("active"),
						$grid.isotope({
							filter: filterValue
						}), !1
				});
			});
		});
	});

	/*------------------------------------
		Counter
	-------------------------------------- */
	$(".counter").each(function () {
		$(this).appear(function () {
			$(this).countTo({
				speed: 1800,
			});
		});
	});


	/*------------------------------------
		Typed
	-------------------------------------- */

	$(".typed").each(function () {
		var typed = new Typed('.typed', {
			stringsElement: '.typed-strings',
			loop: true,
			typeSpeed: 100,
			backSpeed: 50,
			backDelay: 1500,
		});
	});

	/*------------------------------------
		WOW animation
	-------------------------------------- */

	$(".wow").each(function () {
		if ($(window).width() > 767) {
			var wow = new WOW({
				boxClass: 'wow',
				animateClass: 'animated',
				offset: 0,
				mobile: false,
				live: true
			});
			new WOW().init();
		}
	});

	/*------------------------------------
		Parallax Mouse Move
	-------------------------------------- */

	$("#scene").each(function () {
		var scene = document.getElementById('scene');
		var parallaxInstance = new Parallax(scene);
	});

	/*------------------------
	   tooltips
	-------------------------- */
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	})

	/*------------------------
	   Scroll to top
	-------------------------- */
	$(function () {
		$(window).on('scroll', function () {
			// Calculate scroll progress percentage
			var scrollTop = $(this).scrollTop();
			var docHeight = $(document).height();
			var winHeight = $(window).height();
			var scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

			// Update CSS variable for progress indicator
			$('#back-to-top').css('--progress', scrollPercent + '%');

			if (scrollTop > 400) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
	});
	$('#back-to-top').on("click", function () {
		$('html, body').animate({ scrollTop: 0 }, 'slow');
		return false;
	});

	/*------------------------
	   Contact Form
	-------------------------- */
	var form = $('#contact-form'); // contact form
	var submit = $('#submit-btn'); // submit button

	// form submit event
	form.on('submit', function (e) {
		e.preventDefault(); // prevent default form submit

		if (typeof $('#google-recaptcha-v3').val() != "undefined") {
			grecaptcha.ready(function () {
				var site_key = $('#google-recaptcha-v3').attr('src').split("render=")[1];
				grecaptcha.execute(site_key, { action: 'contact' }).then(function (token) {
					var gdata = form.serialize() + '&g-recaptcha-response=' + token;
					$.ajax({
						url: 'php/mail.php',  // form action url
						type: 'POST', 		  // form submit method get/post
						dataType: 'json', 	  // request type html/json/xml
						data: gdata, 		  // serialize form data
						beforeSend: function () {
							submit.attr("disabled", "disabled");
							var loadingText = '<span role="status" aria-hidden="true" class="spinner-border spinner-border-sm align-self-center me-2"></span>Sending.....'; // change submit button text
							if (submit.html() !== loadingText) {
								submit.data('original-text', submit.html());
								submit.html(loadingText);
							}
						},
						success: function (data) {
							submit.before(data.Message).fadeIn("slow"); // fade in response data
							submit.html(submit.data('original-text'));// reset submit button text
							submit.removeAttr("disabled", "disabled");
							if (data.response == 'success') {
								form.trigger('reset'); // reset form
							}
							setTimeout(function () {
								$('.alert-dismissible').fadeOut('slow', function () {
									$(this).remove();
								});
							}, 3000);
						},
						error: function (e) {
							console.log(e)
						}
					});
				});
			});
		} else {
			$.ajax({
				url: 'php/mail.php', // form action url
				type: 'POST', // form submit method get/post
				dataType: 'json', // request type html/json/xml
				data: form.serialize(), // serialize form data
				beforeSend: function () {
					submit.attr("disabled", "disabled");
					var loadingText = '<span role="status" aria-hidden="true" class="spinner-border spinner-border-sm align-self-center me-2"></span>Sending.....'; // change submit button text
					if (submit.html() !== loadingText) {
						submit.data('original-text', submit.html());
						submit.html(loadingText);
					}
				},
				success: function (data) {
					submit.before(data.Message).fadeIn("slow"); // fade in response data
					submit.html(submit.data('original-text'));// reset submit button text
					submit.removeAttr("disabled", "disabled");
					if (data.response == 'success') {
						form.trigger('reset'); // reset form
					}
					setTimeout(function () {
						$('.alert-dismissible').fadeOut('slow', function () {
							$(this).remove();
						});
					}, 3500);
					if (typeof $('#recaptcha-v2').val() != "undefined") {
						grecaptcha.reset(); // reset reCaptcha
					}
				},
				error: function (e) {
					console.log(e)
				}
			});
		}
	});

})(jQuery)