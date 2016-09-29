/**
 * Created by lidy on 2016/9/14.
 */
define(function (require, exports, module) {
        var $ = require('jquery');
        var canvasW, canvasH, r, c;
        var can = document.getElementById('waveCanvas');
        var cxt = can.getContext('2d');
        var $parent = $(can).parent();
        var self = this;
        var resize = function () {
                canvasH = $parent.height();
                canvasW = $parent.width();
                can.setAttribute("width", Math.round(canvasW));
                can.setAttribute("height", Math.round(canvasH));
                can.style.width = canvasW + "px";
                can.style.height = canvasH + "px";
                r = can.height - can.height / 2.7;
                c = can.height / 7.5;
                cxt.strokeStyle = "#fff";
                cxt.fillStyle = '#fff';
                cxt.clearRect(0, 0, canvasW, canvasH);
        }
        module.exports = {
                wave: function (obj) {
                        resize();
                        $(window).resize(function () {
                                resize();
                        });
                        var devicePixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1
                        var diff = 100;
                        var speed = 4;
                        var double = 50;
                        var direction = 'up';
                        var direction2 = 'down';
                        var d = 340;
                        var u = 2 * Math.PI / d;
                        var g = 10;
                        var h = .41;
                        var p = 2.5;
                        var A = function () {
                                var e = new Date;
                                return c / 2 * Math.abs(e.getSeconds() + e.getMilliseconds() / 1e3 - 30) / 30;
                        }
                        var s = new m;

                        function m() {
                                this.amp = 10 + 12 * Math.random(),
                                        this.freq = .0044,
                                        this.phase = 2 + 2 * Math.random(),
                                        this.offset = 2 + 4 * Math.random(),
                                canvasW / devicePixelRatio < 680 && (this.amp = 2 + 6 * Math.random(),
                                        this.freq = .018,
                                        this.phase = 1 + 2 * Math.random(),
                                        this.offset = 1 + 2 * Math.random()),
                                        this.point = function (e) {
                                                return r - A() + this.offset + this.amp * Math.sin(this.freq * e + this.phase + u * g);
                                        }
                        }

                        function draw() {
                                cxt.clearRect(0, 0, canvasW, canvasH);
                                cxt.beginPath();
                                for (var e = 0; e < canvasW + 2; e++) {
                                        //console.log((s.point(e) * p + s.point(e)) * h + '--e:' + e);
                                        cxt.lineTo(e, (s.point(e) * p + s.point(e)) * h);
                                        //cxt.lineTo(e, 275);
                                }
                                g = (g - 1) % d;
                                cxt.lineTo(canvasW, canvasH);
                                cxt.lineTo(0, canvasH);
                                cxt.closePath();
                                cxt.stroke();
                                cxt.fill();
                        }

                        // draw();
                        var FPS = 60;
                        var interval = 1000 / FPS >> 0;
                        var timer = setInterval(draw, interval);
                },
                navigation: function () {
                        //侧边栏
                        $.ajax({
                                url: '/api/getNavInfo',
                                dataType: 'json',
                                success: function (data) {
                                        var list = '';
                                        var lastTimeArr = data;//选择三个最后的时间
                                        for (var i in data) {
                                                var item = data[i];
                                                list += '<li><a href="/u/' + item.name + '/' + item.time.day + '/' + item.title + '">' + item.title + '</a>';
                                        }
                                        var temp;
                                        var len = lastTimeArr.length;
                                        for (var i = 0; i < len; i++) {
                                                var time = new Date(lastTimeArr[i].lastTime);
                                                for (var n = 0; n < len; n++) {
                                                        var time2 = new Date(lastTimeArr[n].lastTime);
                                                        if (time > time2) {
                                                                temp = lastTimeArr[n];
                                                                lastTimeArr[n] = lastTimeArr[i];
                                                                lastTimeArr[i] = temp;
                                                        }
                                                }
                                        }
                                        var lastStr = '';
                                        for (var i in lastTimeArr) {
                                                if (i > 2) {
                                                        break;
                                                }
                                                var item = lastTimeArr[i];
                                                lastStr += '<li class="recentcomments"><a href="/u/' + item.name + '/' + item.time.day + '/' + item.title + '">' + item.title + '</a>';
                                        }
                                        $('#recent-posts-2').find('ul').html(list);//最近文章
                                        $('#recentcomments').html(lastStr);//最近评论
                                }
                        })
                        $('.nav-switch').on('click', function () {
                                $('body').toggleClass('isOpen');
                                resize();
                        });
                }
        }
});
