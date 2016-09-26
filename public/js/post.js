/**
 * Created by lidy on 2016/9/26.
 */
define(function (require, exports, module) {
        $ = require('jquery');
        module.exports = {
                init: function () {
                        $('#postForm').submit(function () {
                                var html = ue.getContent();
                                var text = $(html).text();
                                text = text.length > 100 ? text.substring(0, 200) : text;
                                $('#description').val(text);
                        })
                }
        }
});