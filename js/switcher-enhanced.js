
(function ($) {
	"use strict";

	// Function to extract color name from path (e.g., "color-yellow.css" -> "yellow")
	function extractColorFromPath(path) {
		var match = path.match(/color-(\w+)\.css/);
		return match ? match[1] : null;
	}

	// Function to get correct path based on current page location
	function getCorrectColorPath(colorName) {
		// Get the current color switcher element to determine the path structure
		var colorSwitcher = document.getElementById('color-switcher');
		if (colorSwitcher) {
			var currentHref = colorSwitcher.getAttribute('href');
			// Check if we're in a subdirectory (path starts with ../)
			if (currentHref.startsWith('../')) {
				return '../css/color-' + colorName + '.css';
			} else {
				return 'css/color-' + colorName + '.css';
			}
		}
		return 'css/color-' + colorName + '.css'; // default
	}

	// Function to load saved color theme
	function loadSavedColorTheme() {
		var savedColorName = localStorage.getItem('portfolioColorName');

		// If no saved color, check what's currently set in HTML and save it as default
		if (!savedColorName) {
			var colorSwitcher = document.getElementById('color-switcher');
			if (colorSwitcher) {
				var currentHref = colorSwitcher.getAttribute('href');
				var defaultColor = extractColorFromPath(currentHref);
				if (defaultColor) {
					localStorage.setItem('portfolioColorName', defaultColor);
					savedColorName = defaultColor;
				}
			}
		}

		if (savedColorName) {
			// Get the correct path for the current page location
			var correctPath = getCorrectColorPath(savedColorName);

			// Apply the saved color theme immediately
			var colorSwitcher = document.getElementById('color-switcher');
			if (colorSwitcher) {
				colorSwitcher.setAttribute('href', correctPath);
			}

			// Mark the corresponding color as active in the switcher (after DOM is ready)
			if (typeof $ !== 'undefined') {
				$('#styles-switcher ul li').removeClass('active');
				$('#styles-switcher ul li.' + savedColorName).addClass('active');
			}
		}
	}

	// Function to save color theme (only save the color name, not the full path)
	function saveColorTheme(path, colorClass) {
		// Extract color name from path or use the class name
		var colorName = extractColorFromPath(path) || colorClass;
		localStorage.setItem('portfolioColorName', colorName);
	}

	// Load saved color theme IMMEDIATELY when script loads (before DOM ready)
	loadSavedColorTheme();

	// Also load on DOM ready to update the switcher UI
	$(document).ready(function () {
		loadSavedColorTheme();
	});

	// Switcher toggle functionality
	$(".switcher-toggle").on('click', function () {
		var div = $("#styles-switcher.left");
		var divright = $("#styles-switcher.right");

		if (divright.css("right") === "-202px") {
			$(divright).animate({ right: "0px" }, 300).addClass("shadow");
		} else {
			$(divright).animate({ right: "-202px" }, 300).removeClass("shadow");
		}

		if (div.css("left") === "-202px") {
			$(div).animate({ left: "0px" }, 300).addClass("shadow");
		} else {
			$(div).animate({ left: "-202px" }, 300).removeClass("shadow");
		}
	});

	// Color selection functionality with persistence
	$('#styles-switcher ul li').on('click', function () {
		var path = $(this).data('path');
		var colorClass = $(this).attr('class').replace('active', '').trim();

		// Apply the color theme
		$('#color-switcher').attr('href', path);

		// Update active state
		$(this).parent().find("li").removeClass("active");
		$(this).addClass("active");

		// Save the selection to localStorage (only color name)
		saveColorTheme(path, colorClass);
	});

})(jQuery);