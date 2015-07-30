/**
 * Created by prince on 2015/2/9.
 */
$(function(){
    var key = getKey('key');

    if (!isLogin()){
        location.href = WapSiteUrl+'/tmp/login.html';
    } else {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            data: {key: key},
            url: ApiUrl + '/index.php?act=member_index&op=member_info',
            success: function (data) {
                console.log(data);
                var i = data.datas;
                var list_info = {
                    name: i.member_name,
                    t_name: i.member_truename,
                    e_mail: i.member_email,
                    tel_phone: i.member_mobile,
                    qq: i.member_qq,
                    ww: i.member_ww,
                    b_day: i.member_birthday,
                    area: i.member_areainfo,
                    sex: (function(){
                        switch(i.member_sex){
                            case '1':return '男';
                            break;
                            case '2':return '女';
                            break;
                         }
                    })

                };

                var cont = {content:list_info};
                var template = $('#myInfoTemplate').html();
                var compiledTemplate = Handlebars.compile(template);
                var renderTemplate = compiledTemplate(cont);

                $('#info_list').append(renderTemplate);
            }
        });
    }
});


