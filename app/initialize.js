require('waypoints/lib/noframework.waypoints.min');
require("stickybits/dist/jquery.stickybits.js");

$(function() {
	console.log("Make stick");
	$('.stick-container').stickybits({useStickyClasses: true});
});
