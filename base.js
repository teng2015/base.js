/* author:758915145@qq.com
 * 最近修改：2016/3/03
 * 更新内容：
 * 2016/3/02：取消使用eval方法
 */
isMobile = (a = navigator.userAgent.toLowerCase()) && (a.match(/ipad/i) == "ipad" || a.match(/iphone os/i) == "iphone os" || a.match(/midp/i) == "midp" || a.match(/rv:1.2.3.4/i) == "rv:1.2.3.4" || a.match(/ucweb/i) == "ucweb" || a.match(/android/i) == "android" || a.match(/windows ce/i) == "windows ce" || a.match(/windows mobile/i) == "windows mobile"), IE6 = !-[1, ] && !window.XMLHttpRequest, IE7 = navigator.userAgent.indexOf("MSIE 7.0") > 0, base = {
	getEle: function(a, b) {
		if (!(IE6 || IE7)) {
			return b ? b.querySelectorAll(a) : document.querySelectorAll(a)
		} else {
			if (a.indexOf("#") == 0) {
				return document.getElementById(a.split("#")[1])
			} else {
				b ? c = b.getElementsByTagName("*") : c = document.getElementsByTagName("*");
				d = [], e = [];
				for (i = 0; i < c.length; i++) {
					e = c[i].className.split(" ");
					for (j = 0; j < e.length; j++) {
						if (e[j] == a.split(".")[1]) {
							d.push(c[i])
						}
					}
				}
				return d
			}
		}
	},
	getStyle: function(a, b) {
		return a.currentStyle ? a.currentStyle[b] : a.ownerDocument.defaultView.getComputedStyle(a, null)[b]
	},
	animate: function(a, s, e, d, g ) {
		g == undefined ? g = "easeOutQuad" : null;
		clearInterval(a.s);
		f = s == "opacity" ? "" : "px";
		a.d = d, a.b = parseFloat($.getStyle(a, s)), a.c = e - a.b, a.u = a.d / 20, a.s = setInterval(function() {
			a.u == 0 ? (a.style[s]=e+f) && clearInterval(a.s) : a.style[s]=easing[g](0,a.d-(a.u--*20),a.b,a.c,a.d)+f
		}, 20)
	},
	nextAll: function(a, b) {
		c = a.nextSibling;
		c = c != null && c.nodeName == "#text" ? c.nextSibling : c;
		if (c != null) {
			b.push(c);
			base.nextAll(c, b)
		} else {
			return
		}
	},
	prevAll: function(a, b) {
		c = a.previousSibling;
		c = c != null && c.nodeName == "#text" ? c.previousSibling : c;
		if (c != null) {
			b.push(c);
			base.prevAll(c, b)
		} else {
			return
		}
	},
	ajax: function(a) {
		function createXHR() {
			if (IE6) {
				b = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp", ];
				for (i = 0; i < b.length; i++) {
					try {
						return new ActiveXObject(b[i])
					} catch (e) {}
				}
			} else {
				return new XMLHttpRequest()
			}
		}
		function params(d) {
			c = [];
			for (i in d) {
				c.push(encodeURIComponent(i) + "=" + encodeURIComponent(d[i]))
			}
			return c.join("&")
		}
		x = createXHR();
		a.url = a.url;
		a.data = params(a.data);
		if (a.method === "get") {
			a.url += a.url.indexOf("?") == "-1" ? "?" + a.data : "&" + a.data
		}
		if (a.async === true) {
			x.onreadystatechange = function() {
				if (x.readyState == 4) {
					callBack()
				}
			}
		}
		x.open(a.method, a.url, a.async);
		if (a.method === "post") {
			x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			x.send(a.data)
		} else {
			x.send(null)
		}
		if (a.async === false) {
			callBack()
		}
		function callBack() {
			if (x.status == 200) {
				a.success(x.responseText)
			} else {
				a.Error("获取数据失败，错误代号为：" + x.status + "错误信息为：" + x.statusText)
			}
		}
	}
}, easing = {
	easeOutQuad: function(x, t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b
	}
};
typeof $ == "undefined" ? $ = base : console.log("$符号冲突");