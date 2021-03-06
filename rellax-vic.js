(function (e, c) {
  "function" === typeof define && define.amd ? define([], c) : "object" === typeof module && module.exports ? (module.exports = c()) : (e.Rellax = c());
})(this, function () {
  var e = function (c, l) {
    var b = Object.create(e.prototype),
      g = 0,
      k = 0,
      d = [],
      p = !1,
      t =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (a) {
          setTimeout(a, 1e3 / 60);
        };
    b.options = { speed: -2, center: !1 };
    l &&
      Object.keys(l).forEach(function (a) {
        b.options[a] = l[a];
      });
    -10 > b.options.speed ? (b.options.speed = -10) : 10 < b.options.speed && (b.options.speed = 10);
    c || (c = ".rellax");
    if (document.getElementsByClassName(c.replace(".", ""))) b.elems = document.getElementsByClassName(c.replace(".", ""));
    else if (!1 !== document.querySelector(c)) b.elems = querySelector(c);
    else throw Error("The elements you're trying to select don't exist.");
    var u = function (a) {
        var h = a.getAttribute("data-rellax-percentage") || b.options.center ? document.body.scrollTop : 0,
          c = h + a.getBoundingClientRect().top,
          d = a.clientHeight || a.offsetHeight || a.scrollHeight,
          e = a.getAttribute("data-rellax-percentage") ? a.getAttribute("data-rellax-percentage") : (h - c + k) / (d + k);
        b.options.center && (e = 0.5);
        h = a.getAttribute("data-rellax-speed") ? m(a.getAttribute("data-rellax-speed"), 10) : b.options.speed;
        if (a.getAttribute("data-rellax-percentage") || b.options.center) h = a.getAttribute("data-rellax-speed") ? m(a.getAttribute("data-rellax-speed"), 5) : m(b.options.speed, 5);
        e = Math.round(100 * h * (1 - e));
        a = a.style.cssText;
        var f = "";
        if (0 <= a.indexOf("transform"))
          var f = a.indexOf("transform"),
            f = a.slice(f),
            g = f.indexOf(";"),
            f = g ? " " + f.slice(11, g).replace(/\s/g, "") : " " + f.slice(11).replace(/\s/g, "");
        return { base: e, top: c, height: d, speed: h, style: a, transform: f };
      },
      m = function (a, b) {
        return a < -b ? -b : a > b ? b : a;
      },
      q = function () {
        var a = g;
        g = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        return a != g ? !0 : !1;
      },
      r = function () {
        q() && !1 === p && n();
        t(r);
      },
      n = function () {
        for (var a = 0; a < b.elems.length; a++) {
          var c = " translate3d(0," + (Math.round(100 * d[a].speed * (1 - (g - d[a].top + k) / (d[a].height + k))) - d[a].base) + "px,0)" + d[a].transform;
          b.elems[a].style.cssText = d[a].style + "-webkit-transform:" + c + ";-moz-transform:" + c + ";transform:" + c + ";";
        }
      };
    b.destroy = function () {
      for (var a = 0; a < b.elems.length; a++) b.elems[a].style.cssText = d[a].style;
      p = !0;
    };
    (function () {
      k = window.innerHeight;
      q();
      for (var a = 0; a < b.elems.length; a++) {
        var c = u(b.elems[a]);
        d.push(c);
      }
      window.addEventListener("resize", function () {
        n();
      });
      r();
      n();
    })();
    return b;
  };
  return e;
});
