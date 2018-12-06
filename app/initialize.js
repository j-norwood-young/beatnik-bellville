// require('waypoints/lib/noframework.waypoints.min');
require("stickybits/dist/jquery.stickybits.js");

var parts = 5;

// Takes care of slow loading
function setHeight(el, itteration) {
	itteration = itteration || 0;
	if (itteration === 10) return;
	var height = $(el).find(".scroller-img-0").height();
	// console.log(el, itteration, height);
	if (height === 0) {
		setTimeout(function() {
			setHeight(el, itteration + 1);
		}, 100);
	} else {
		el.css("height", height * (parts + 1));
	}
}

function init() {
	console.log("init");
	var scrollers = $(".scroller");
	scrollers.each(function(scroller) {
		var scroller = $(this);
		setHeight(scroller);
	});
}

$(function() {
	init();
	$(window).on("resize", init);
	var scrollers = $(".scroller");
	$(document).on("scroll", e => {
		var scrollTop = $(document).scrollTop();
		scrollers.each(function() {
			var scroller = $(this);
			var height = scroller.height();
			var part_heights = height / 5;
			var offsetTop = scroller[0].offsetTop;
			var offsetBottom = scroller.height() + offsetTop;
			// console.log(scrollTop, offsetTop, offsetBottom);
			if ((scrollTop > offsetTop) && (scrollTop < offsetBottom) && (offsetTop !==0)) {
				for (var x = 1; x < parts; x++) {
					var top = (part_heights * x) + offsetTop;
					var bottom = (part_heights * (x + 1)) + offsetTop;
					var alpha = (scrollTop - top) / (bottom - top);
					if (alpha < 0) alpha = 0;
					if (alpha > 1) alpha = 1;
					// console.log(x, scrollTop, top, bottom, (scrollTop - top), (bottom - top), alpha ); //1
					$(".scroller-img-" + x).css("opacity", alpha);
				}
			} else if (scrollTop < offsetTop) {
				for (var x = 1; x < parts; x++) {
					scroller.find(".scroller-img-" + x).css("opacity", 0);
				}
			}  else if (scrollTop > offsetBottom) {
				for (var x = 1; x < parts; x++) {
					scroller.find(".scroller-img-" + x).css("opacity", 1);
				}
			}
		})
	})

});
