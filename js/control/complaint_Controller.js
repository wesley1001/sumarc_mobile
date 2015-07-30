/**
 * Created by mithenji on 15/4/21.
 */

/** 我不说话 就静静地看着你们 */
/** @namespace item.complain_state */
/** @namespace item.complain_datetime */
/** @namespace v.accused_name */
/** @namespace v.complain_id */
/** @namespace result.datas.goods_list */
/** @namespace v.order_goods_id */

$(function () {
    var key = getKey('key');

    initPage();
    function initPage() {
        var refund_id = getUrlParam('refund_id');
        $.ajax({
            type: 'POST',
            url: ApiUrl + '/index.php?act=member_complain',
            data: {key: key},
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var g = data.datas.goods_list;
//					var orderContent = result.datas.list[0]['order_goods_id'];
//					var o = g[orderContent];
//					console.log(o);
                var tradeList = data.datas.list.map(function (v) {
                    var goods = g[v.order_goods_id];
                    return {
                        'store_name': v.accused_name,
                        'goods_num': goods.goods_num,
                        'goods_name': goods.goods_name,
                        'goods_price': goods.goods_price,
                        'goods_img': '/data/upload/shop/common/' + goods.goods_image,
                        'complain_content': v.complain_content,
                        'complain_subject_content': v.complain_subject_content,
                        'complain_desc': 'trade-complaintDetail.html?complain_id=' + v.complain_id,
                        'add_time': (new Date(+v.complain_datetime * 1000)).toLocaleDateString().split('/').join('-'),
                        'service_state': (function () {
                            switch (v.complain_state) {
                                case "10" :
                                    return "新投诉";
                                    break;
                                case "20" :
                                    return "投诉通过转给被投诉的人";
                                    break;
                                case "30" :
                                    return "被投诉人已申诉";
                                    break;
                                case "40" :
                                    return "提交仲裁";
                                    break;
                                case "99" :
                                    return "已关闭";
                                    break;
                            }
                        })()

                    };
                });

                var complainList = {content: tradeList};
                var template = Handlebars.compile($('#trade-list').html());
                $('#list-container').html(template(complainList));
            }
        })
    }
});