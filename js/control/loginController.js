/**
 * Created by prince on 2015/2/3.
 */


$('#login-submit').on('click',function(){
   return loginSubmit();
});

function inputBlur() {
    $('#mobile').blur();
    $('#password').blur();
}

function isMobile(str) {
    var reg = /^[1][34578]\d{9}$/;
    return reg.test(str);
}



function loginSubmit() {

    var username = $('#mobile').val();
    var pwd = $('#password').val();
    var client = 'wap';
    var referUrl = document.referrer;   //上级网址
    var key = getKey();                 //获取key

    $.ajax({
        type: 'POST',
        url: '/mobile/index.php?act=login',
        data: {username: username, password:pwd, client:client},
        dataType:'json',
        success: function (data) {
            if(!data.datas.error) {
                if(typeof(data.datas.key) == 'undefined'){
                    return false;
                    //return true;
                }else{
                    setCurrentUser(data.datas.key, data.datas.username);
                    location.href = referUrl;
                }
            }
        }
    });

    //if (!isMobile(username)) {
    //    alert('手机号码为空或有误，请重新输入');
    //} else {
    //
    //}
}