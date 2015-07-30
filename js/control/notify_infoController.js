/**
 * Created by mithenji on 15/4/20.
 */
$(function() {
    /** @namespace v.message_update_time */
    /** @namespace result.datas.msg_list */
    /** @namespace v.from_member_name */
    /** @namespace v.message_title */
    /** @namespace v.message_body */

    var key =getKey('key');
    initNotify_u();
    initNotify_s();

    function initNotify_u() {
        var message_id = getUrlParam("message_id");
        $.ajax({
            type: 'POST',
            url: ApiUrl + '/index.php?act=member_message&op=message',
            data: {key: key, message_id: message_id},
            dataType: "json",
            success: function (data) {
                console.log(data);
                var m = data.datas.msg_list;
                if(!m === false){
                    var message_detail = m.map(function (v) {
                        return {
                            'user_name': v.from_member_name,
                            'message_title': v.message_title,
                            'message_cont': v.message_body,
                            'message_desc': 'noti-user-detail.html?message_id=' + message_id,
                            'update_time': (new Date(+v.message_update_time * 1000)).toLocaleDateString().split('/').join('-')
                        };
                    });
                }else{
                    $('#notify_user').addClass('notify-none');
                }

                var notify_user = {content: message_detail};
                var template = Handlebars.compile($('#notify_u').html());
                $('#notify_user').html(template(notify_user));
            }
        });
    }

    function initNotify_s() {
        var message_id = getUrlParam("message_id");
        $.ajax({
            type:'POST',
            url:ApiUrl+'/index.php?act=member_message&op=systemmsg',
            data:{key:key,message_id:message_id},
            dataType:"json",
            success: function(data){
                console.log(data);
                var s = data.datas.msg_list;
                if(!s === false){
                    var message_detail_s = s.map(function (i){
                        return{
                            'message_title': i.message_title,
                            'message_cont': i.message_body,
                            'message_desc': 'notification-detail.html?message_id=' +message_id,
                            'update_time': (new Date(+i.message_update_time*1000)).toLocaleDateString().split('/').join('-')
                        };
                    });
                }else{
                    $('#notify_system').addClass('notify-none')
                }

                var notify_system = {content:message_detail_s};
                var template = Handlebars.compile($('#notify_s').html());
                $('#notify_system').html(template(notify_system));
            }
        })
    }
})