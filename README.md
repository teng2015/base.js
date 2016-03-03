# base.js
一般网站的话，我用这个base.js来代替jQuery，base.js才几K大，不过够用了~

功能如下：

//判断是否是手机端(true或false)
isMobile

//selector:比如'.mf'或'#mf',parent:想要获取元素共同的父级(一个元素)
$.getEle(selector,parent)

//obj:元素(以下的obj都是元素),s:样式名
$.getStyle(obj,s)

//s:样式名,e:目标值,d:总耗时(毫秒),g:效果名
$.animate(obj,s,e,d,g)

//arr:将获得的元素放进该数组
$.nextAll(obj,arr)

//arr:将获得的元素放进该数组
$.prevAll(obj,arr)

//略,这部分是抄网上的
$.ajax(
{
"method" : "post",
		"url" : "demo.php",
		"data" : {
			"name" : "gaga",
			"age" : 10000000,
			"num" : "12346&598"
		},
		"success" :function(data){
			alert(data);
		},
		"Error" :function(text){
			alert(text);
		},
		"async" : false
}
)
