/* author:758915145@qq.com
 * 最近修改：2016/3/03
 * 更新内容：
 * 2016/3/02：取消使用eval方法
 */
isMobile = (a = navigator.userAgent.toLowerCase()) && (a.match(/ipad/i) == "ipad" || a.match(/iphone os/i) == "iphone os" || a.match(/midp/i) == "midp" || a.match(/rv:1.2.3.4/i) == "rv:1.2.3.4" || a.match(/ucweb/i) == "ucweb" || a.match(/android/i) == "android" || a.match(/windows ce/i) == "windows ce" || a.match(/windows mobile/i) == "windows mobile"), IE6 = !-[1, ] && !window.XMLHttpRequest, IE7 = navigator.userAgent.indexOf("MSIE 7.0") > 0, base = {
	getEle: function(selector, parent) {
		if (!(IE6 || IE7)) {
			return parent ? parent.querySelectorAll(selector) : document.querySelectorAll(selector)
		} else {
			if (selector.indexOf("#") == 0) {
				return document.getElementById(selector.split("#")[1])
			} else {
				objArr =parent ?  parent.getElementsByTagName("*") : document.getElementsByTagName("*");
				result = [], classArr = [];
				for (i = 0; i < objArr.length; i++) {
					classArr = objArr[i].className.split(" ");
					for (j = 0; j < classArr.length; j++) {
						if (classArr[j] == selector.split(".")[1]) {
							result.push(objArr[i])
						}
					}
				}
				return result
			}
		}
	},
	getStyle: function(obj, styleName) {
		return obj.currentStyle ? obj.currentStyle[styleName] : obj.ownerDocument.defaultView.getComputedStyle(obj, null)[styleName]
	},
	animate: function(obj, styleName, endValue, time, effect ) {
		effect == undefined ? effect = "easeOutQuad" : null;
		clearInterval(obj.setInterval);
		px = styleName == "opacity" ? "" : "px";
		obj.time = time, obj.styleValue = parseFloat($.getStyle(obj, styleName)), obj.difference = endValue - obj.styleValue, obj.frequency = obj.time / 20, obj.setInterval = setInterval(function() {
			obj.frequency == 0 ?
			(obj.style[styleName]=endValue+px) && clearInterval(obj.setInterval) :
			obj.style[styleName]=easing[effect](0,obj.time-(obj.frequency--*20),obj.styleValue,obj.difference,obj.time)+px
		}, 20)
	},
	nextAll: function(obj, arr) {
		next = obj.nextSibling;
		next = next != null && next.nodeName == "#text" ? next.nextSibling : next;
		if (next != null) {
			arr.push(next);
			base.nextAll(next, arr)
		} else {
			return
		}
	},
	prevAll: function(obj, arr) {
		prev = obj.previousSibling;
		prev = prev != null && prev.nodeName == "#text" ? prev.previousSibling : prev;
		if (prev != null) {
			arr.push(prev);
			base.prevAll(prev, arr)
		} else {
			return
		}
	},
	ajax: function(obj) {
		function createXHR() {
			if (IE6) {
				version = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp", ];
				for (i = 0; i < version.length; i++) {
					try {
						return new ActiveXObject(version[i])
					} catch (e) {}
				}
			} else {
				return new XMLHttpRequest()
			}
		}
		function params(data) {
			c = [];
			for (i in data) {
				c.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]))
			}
			return c.join("&")
		}
		var xhr = createXHR();
		obj.url = obj.url;
		obj.data = params(obj.data);
		if (obj.method === "get") {
			obj.url += obj.url.indexOf("?") == "-1" ? "?" + obj.data : "&" + obj.data
		}
		if (obj.async === true) {
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					callBack()
				}
			}
		}
		xhr.open(obj.method, obj.url, obj.async);
		if (obj.method === "post") {
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send(obj.data)
		} else {
			xhr.send(null)
		}
		if (obj.async === false) {
			callBack()
		}
		function callBack() {
			if (xhr.status == 200) {
				obj.success(xhr.responseText)
			} else {
				obj.Error("获取数据失败，错误代号为：" + xhr.status + "错误信息为：" + xhr.statusText)
			}
		}
	}
}, easing = {
	easeOutQuad: function(x, t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b
	}
};
typeof $ == "undefined" ? $ = base : console.log("$符号冲突");