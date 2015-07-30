//
//function GetQueryString(name){
//	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
//	var r = window.location.search.substr(1).match(reg);
//	if (r!=null) return unescape(r[2]); return null;
//}

//js获取URL的参数的方法(getQueryString)
/**
 * @return {null}
 */

//js获取URL的参数的方法
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

function addcookie(name,value,expireHours){
	var cookieString=name+"="+escape(value)+"; path=/";//判断是否设置过期时间
	if(expireHours>0){
		var date=new Date();
		date.setTime(date.getTime+expireHours*3600*1000);
		cookieString=cookieString+"; expire="+date.toGMTString();
	}
	document.cookie=cookieString;
}

function getcookie(name){
	var strcookie=document.cookie;
	var arrcookie=strcookie.split("; ");
	for(var i=0;i<arrcookie.length;i++){
	var arr=arrcookie[i].split("=");
	if(arr[0]==name)return arr[1];
	}
	return "";
}

function delCookie(name){ //删除cookie
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getcookie(name);
	if(cval!=null) document.cookie= name + "="+cval+"; path=/;expires="+exp.toGMTString();
}

function checklogin(state){
	if(state == 0){
		location.href = WapSiteUrl+'/tmpl/member/login.html';
		return false;
	}else {
		return true;
	}
}

function contains(arr, str) {
    var i = arr.length;
    while (i--) {
           if (arr[i] === str) {
           return true;
           }   
    }   
    return false;
}

function geturlstring(){
	var url = window.document.location.href.toString();
	var u = url.split("?");
	if(typeof(u[1]) == "string"){
        u = u[1].split("&");
        var get = {};
        for(var i in u){
            var j = u[i].split("=");
            get[j[0]] = j[1];
            if(j[0] == 'key'){
            	addcookie('key',j[1]);
            }
            if(j[0] == 'username'){
            	addcookie('username',j[1]);
            }
        }
        return get;
    } else {
        return '';
    }
}