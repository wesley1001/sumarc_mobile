/**
 * Created by prince on 2014/10/20.
 */
$(function(){
    var urlarray;
    var key = getcookie('key');
    if (key !=='') {
    } else {
        urlarray = geturlstring();
        if (urlarray['key']) {
            key = urlarray['key'];
        } else {
            location.href = 'login.html';
        }
    }

    function account_info(){
        $.ajax({
            type:'post',
            url:ApiUrl+"/index.php?act=member_index&op=member_info",
            data:{key:key},
            dataType:'json',
            success:function(user_info){
                checklogin(user_info.login);
                if(user_info.datas == null){
                    return false;
                }
                $("#user-name").html(user_info.datas.member_name);
                $("#user-truename").html(user_info.datas.member_truename);
                $("#user-sex").html(user_info.datas.member_sex);
                $("#user-email").html(user_info.datas.member_email);
                $("#user-mobile").html(user_info.datas.member_mobile);
                $("#user-qq").html(user_info.datas.member_qq);
                $("#user-ww").html(user_info.datas.member_ww);
                $("#user-birthday").html(user_info.datas.member_birthday);
                $("#user-areainfo").html(user_info.datas.member_areainfo);
                $("#user-avator").attr( 'src',user_info.datas.avator);
                    return false
            }
        });
    }
    account_info();
});