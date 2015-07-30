/**
 * Created by prince on 2015/1/26.
 */

var SiteUrl = '';
var ApiUrl = '/mobile';
var WapSiteUrl = '/wap';
var $CONFIG = null;
init();
function init() {
    if (!$CONFIG) {
        $CONFIG = {};
        $CONFIG.currentUser = {};
        if (localStorage.getItem('username')) {
            $CONFIG.currentUser = JSON.parse(localStorage.getItem('username'));
        }
        if (localStorage.getItem('key')) {
            $CONFIG.currentUser.key = localStorage.getItem('key');
        }
    }
}
function getCurrentUser() {
    return $CONFIG.currentUser;
}
function getKey() {
    var m = parseUrlQuery(window.location.href || '');
    return m.key || localStorage.getItem('key');
}
function setCurrentUser(key, username) {
    $CONFIG.currentUser = username;
    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('key', key);
}
function removeCurrentUser() {
    $CONFIG.currentUser = {};
    localStorage.removeItem('username');
    localStorage.removeItem('key');
}
function isLogin() {
    if ($CONFIG.currentUser && localStorage.getItem('key')) {
        return true;
    } else {
        //return true;
        return false;
    }
}
function logout() {
    $('#logout_confirm').modal({
        relatedTarget: this,
        onConfirm: function (options) {
            removeCurrentUser();
            location.href = WapSiteUrl
        },
    });
}
// 获取URL的参数的方法
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) {return decodeURI(r[2]);} else {return null}
    ; //返回参数值
}
// DOM Library Utilites
parseUrlQuery = function (url) {
    var query = {}, i, params, param;
    if (url.indexOf('?') >= 0) url = url.split('?')[1];
    else return query;
    params = url.split('&');
    for (i = 0; i < params.length; i++) {
        param = params[i].split('=');
        query[param[0]] = param[1];
    }
    return query;
};

//function checkUpdate() {
//    khApp.modal({
//        title: '当前版本',
//        text: window.appParams.version,
//        buttons: [{
//            text: '检测更新',
//            onClick: function () {
//                khApp.alert('您当前的版本已经是最新');
//            }
//        }, {
//            text: '返回'
//        }]
//    });
//}

//function addcookie(name, value, expireHours) {
//    var cookieString = name + "=" + escape(value) + "; path=/";//判断是否设置过期时间
//    if (expireHours > 0) {
//        var date = new Date();
//        date.setTime(date.getTime + expireHours * 3600 * 1000);
//        cookieString = cookieString + "; expire=" + date.toGMTString();
//    }
//    document.cookie = cookieString;
//}
//function getcookie(name) {
//    var strcookie = document.cookie;
//    var arrcookie = strcookie.split("; ");
//    for (var i = 0; i < arrcookie.length; i++) {
//        var arr = arrcookie[i].split("=");
//        if (arr[0] == name)return arr[1];
//    }
//    return "";
//}
//function delCookie(name) { //删除cookie
//    var exp = new Date();
//    exp.setTime(exp.getTime() - 1);
//    var cval = getcookie(name);
//    if (cval != null) document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
//}
//function checklogin(state) {
//    if (state == 0) {
//        location.href = WapSiteUrl + '/tmpl/member/login.html';
//        return false;
//    } else {
//        return true;
//    }
//}
//function contains(arr, str) {
//    var i = arr.length;
//    while (i--) {
//        if (arr[i] === str) {
//            return true;
//        }
//    }
//    return false;
//}

