/**
 * Created by mithenji on 15/4/16.
 */
$(function(){

    var key = getKey('key');
    /** @namespace item.refund_state */
    /** @namespace item.refund_amount */
    /** @namespace item.order_sn */
    /** @namespace item.reason_id */
    /** @namespace item.store_name */

    function initPageRefunds() {
        $.ajax({
            type: 'post',
            url: ApiUrl + "/index.php?act=member_refund_return",
            data: {key: key},
            dataType: "json",
            success: function (data) {
                console.log(data);
                var refunds_content = data.datas.list.map(function (v) {
                    return {
                        'store_name': v.store_name,
                        'goods_name': v.goods_name,
                        'goods_num': v.goods_num,
                        'refund_sn': v.refund_sn,
                        'order_sn': v.order_sn,
                        'reason_info': v.reason_info,
                        'order_number': v.order_sn,
                        'goods_price': v.refund_amount,
                        'buyer_message': v.buyer_message,
                        'goods_img': '/data/upload/shop/common/' + v.goods_image,
                        'add_time': (new Date(+v.add_time * 1000)).toLocaleDateString().split('/').join('-'),
                        'service_state': (function () {
                            switch (v.refund_state) {
                                case "1" :
                                    return "处理中";
                                    break;
                                case "2" :
                                    return "待管理员处理";
                                    break;
                                case "3" :
                                    return "已完成";
                                    break;
                            }
                        })(),
                        'refunds_desc': (function () {
                            switch (v.refund_type) {
                                case "1" :
                                    return 'refund-detail.html?refund_id=' + v.refund_id;
                                    break;
                                case "2" :
                                    return 'returns-detail.html?refund_id=' + v.refund_id;
                                    break;
                            }
                        })()
                    }
                });

                var refunds_list = {content:refunds_content};
                var template = Handlebars.compile($('#refunds-template').html());
                $('#refunds-list').html(template(refunds_list));
            }
        })
    }
    initPageRefunds();
});