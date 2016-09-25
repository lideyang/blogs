jQuery(document).ready(function(){

	jQuery('.dynpost').css('opacity', 0);
		 
    var waypoints = jQuery('.dynpost').waypoint({
    handler: function(direction) {
        jQuery(this.element).addClass('fadeInUp')
        
        jQuery(this.element).css({
          'opacity' : "1"
        });
    },
    offset: '80%'
   });

	jQuery(".featured-posts").owlCarousel({
		navigation : true, // Show next and prev buttons
		slideSpeed : 300,
		singleItem:true,
		autoHeight : true,
		pagination:true,
		navigation:false,
		addClassActive: true,
		rewindNav:false,
	});

  	jQuery('.nav-switch').on('click', function() {
    jQuery('body').toggleClass('isOpen');
  });    





});