/**
 * Created by Lidy on 2016/11/21.
 */
const WaveCanvas = function (obj) {
    console.log(obj);
    var canvasW, canvasH, r, c;
    var can = document.getElementById(obj);
    var cxt = can.getContext('2d');
    var parent = can.parentElement;
    var resize = function () {
        canvasH = parent.offsetHeight;
        canvasW = parent.offsetWidth;
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
    window.onresize = function () {
        resize();
    }
    resize();
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
}
export {WaveCanvas};