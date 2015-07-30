/**
 * Created by mithenji on 15/4/21.
 */
$(function(){
    /** @namespace item.refund_state */
    /** @namespace item.refund_amount */
    /** @namespace item.order_sn */
    /** @namespace item.reason_id */
    /** @namespace item.store_name */
    /** @namespace v.refund_type */

    var key = getKey('key');
    initPageRefunds();

    function initPageRefunds() {
        $.ajax({
            type: 'POST',
            url: ApiUrl + '/index.php?act=member_inform',
            data: {key: key},
            dataType: "json",
            success: function (data) {
                var v = data.datas;console.log(data);

                var violation_content = v.list.map(function (v) {
                    return {
                        'store_name': v.inform_store_name,
                        'goods_name': v.inform_goods_name,
                        'violation_content': v.inform_content,
                        'violation_type': v.inform_subject_type_name,
                        'violation_theme': v.inform_subject_content,
                        'violation_img': '/data/upload/shop/common/' + v.inform_pic1,
                        'violation_desc':'violation-detail.html?inform_id=' + v.inform_id,
                        'violation_dateTime': (new Date(+v.inform_handle_datetime * 1000)).toLocaleDateString().split('/').join('-'),
                        'violation_state': (function () {
                            switch (v.inform_state) {
                                case "1" :
                                    return "未处理";
                                    break;
                                case "2" :
                                    return "已处理";
                                    break;
                            }
                        })()
                    }
                });

                var violation_list = {content:violation_content};
                var template = Handlebars.compile($('#violation-template').html());
                $('#violation-list').html(template(violation_list));
            }
        })
    }
});