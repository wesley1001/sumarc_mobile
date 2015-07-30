/**
 * Created by prince on 2015/2/2.
 */

requestData();

function requestData(){

    function count(o){
        var t = typeof o;
        if(t == 'string'){
            return o.length;
        }else if(t == 'object'){
            var n = 0;
            for(var i in o){n++;}
            return n;
        }
        return false;
    }


    var key = getKey('key');

    if (!isLogin()){
        location.href = WapSiteUrl+'/tmp/login.html';
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data:{key:key},
            url: ApiUrl + '/index.php?act=member_index',
            success: function (data) {
                var pers = data.datas.member_info;
                var pers_cont = {avator_img: pers.avator};

                var c = {hd_info:pers_cont};
                var template = $('#mallTemplate').html();
                var compiledTemplate = Handlebars.compile(template);
                var renderTemplate = compiledTemplate(c);

                $('#mall_center').append(renderTemplate);
            }
        });
    };

    $.ajax({
        type: 'GET',
        dataType: 'json',
        data:{key:key},
        url: ApiUrl + '/index.php?act=member_favorites&op=favorites_list',
        success: function (data) {
            console.log(data);
            var f_num = data.datas.favorites_list
            console.log(f_num);

            $('#favorites_num').append('(' + count(f_num) + ')')
        }
    });

    $.ajax({
        type: 'GET',
        dataType: 'json',
        data:{key:key},
        url: ApiUrl + '/index.php?act=member_refund_return',
        success: function (data) {
            console.log(data);
            var refund_num = data.datas.list
            console.log(refund_num);

            $('#refund_num').append('(' + count(refund_num) + ')')
        }
    });

}