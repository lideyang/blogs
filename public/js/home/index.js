/**
 * Created by lidy on 2016/9/13.
 */
define(function (require, exports, module) {
        var $ = require('jquery');
        require('jquery.waypoints');

        require('owl.carousel');
        module.exports = {
                init: function () {
                        $('.dynpost').css('opacity', 0);
                        var waypoints = $('.dynpost').waypoint({
                                handler: function (direction) {
                                        $(this.element).addClass('fadeInUp')

                                        $(this.element).css({
                                                'opacity': "1"
                                        });
                                },
                                offset: '80%'
                        });

                        $(".featured-posts").owlCarousel({
                                navigation: true, // Show next and prev buttons
                                slideSpeed: 300,
                                singleItem: true,
                                autoHeight: true,
                                pagination: true,
                                navigation: false,
                                addClassActive: true,
                                rewindNav: false,
                        });
                }
        }
});