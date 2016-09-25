/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens and enables tab
 * support for dropdown menus.
 */
define(function (require, exports, module) {
        module.exports = {
                init: function () {
                        $ = require('jquery');
                        $.ajax({
                                url: '/api/getNavInfo',
                                dataType: 'json',
                                success: function (data) {
                                        var list = '<li><a href="/u/' + data.name + '/' + data.time.day + '/' + data.title + '">' + data.title + '</a>';
                                        $('#recent-posts-2').find('ul').html(list);
                                }
                        })
                }
        }
});