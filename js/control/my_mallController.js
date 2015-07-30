/**
 * Created by prince on 2015/3/4.
 */
/** @namespace c.extend_order_goods */
/** @namespace c.order_amount */

$(function () {
    var key = getKey('key');
    if (!isLogin()) {
        location.href = WapSiteUrl + '/tmp/login.html';
    } else {
        $.ajax({
            type: 'GET',
            url: ApiUrl + '/index.php?act=member_order&op=order_list',
            data: {key: key},
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var order_item = [];
                var and_receive = [];
                var and_comment = [];
                var non_payMent = [];
                var commodity_list = [];
                var list = data.datas.order_group_list;
                $(list).each(function (item, index) {
                    $(index.order_list).map(function (i, c) {
                        return order_item.push({
                            if_cancel: c.if_cancel,
                            if_receive: c.if_receive,
                            state_desc: c.state_desc,
                            store_name: c.store_name,
                            shipping_fee: c.shipping_fee,
                            orders_amount: c.order_amount,
                            orders_cont: c.extend_order_goods,
                            order_state: (function () {
                                switch (c.order_state) {
                                    case "0" :
                                        return "已取消";
                                        break;
                                    case "10" :
                                        return "未支付";
                                        break;
                                    case "20" :
                                        return "已支付";
                                        break;
                                    case "30" :
                                        return "已发货";
                                        break;
                                    case "40" :
                                        return "交易成功";
                                        break;
                                }
                            })()
                        })
                    });
                });

                $(list).each(function (item, index) {
                    $(index.order_list).each(function (i, c) {
                        switch (c.order_state) {
                            case "10" :
                                return non_payMent.push({
                                    if_cancel: c.if_cancel,
                                    if_receive: c.if_receive,
                                    state_desc: c.state_desc,
                                    store_name: c.store_name,
                                    shipping_fee: c.shipping_fee,
                                    orders_amount: c.order_amount,
                                    orders_cont: c.extend_order_goods,
                                    order_state: (function () {
                                        switch (c.order_state) {
                                            case "0" :
                                                return "已取消";
                                                break;
                                            case "10" :
                                                return "未支付";
                                                break;
                                            case "20" :
                                                return "已支付";
                                                break;
                                            case "30" :
                                                return "已发货";
                                                break;
                                            case "40" :
                                                return "交易成功";
                                                break;
                                        }
                                    })()
                                });
                                break;
                            case "20" :
                                return  and_receive.push({
                                if_cancel: c.if_cancel,
                                if_receive: c.if_receive,
                                state_desc: c.state_desc,
                                store_name: c.store_name,
                                shipping_fee: c.shipping_fee,
                                orders_amount: c.order_amount,
                                orders_cont: c.extend_order_goods,
                                order_state: (function () {
                                    switch (c.order_state) {
                                        case "0" :
                                            return "已取消";
                                            break;
                                        case "10" :
                                            return "未支付";
                                            break;
                                        case "20" :
                                            return "已支付";
                                            break;
                                        case "30" :
                                            return "已发货";
                                            break;
                                        case "40" :
                                            return "交易成功";
                                            break;
                                    }
                                })()
                            });
                                break;
                            case "40" :
                                return  and_comment.push({
                                    if_cancel: c.if_cancel,
                                    if_receive: c.if_receive,
                                    state_desc: c.state_desc,
                                    store_name: c.store_name,
                                    shipping_fee: c.shipping_fee,
                                    orders_amount: c.order_amount,
                                    orders_cont: c.extend_order_goods,
                                    order_state: (function () {
                                        switch (c.order_state) {
                                            case "0" :
                                                return "已取消";
                                                break;
                                            case "10" :
                                                return "未支付";
                                                break;
                                            case "20" :
                                                return "已支付";
                                                break;
                                            case "30" :
                                                return "已发货";
                                                break;
                                            case "40" :
                                                return "交易成功";
                                                break;
                                        }
                                    })()
                                });
                                break;
                        }
                    })
                });


                console.log(order_item,non_payMent,and_receive,and_comment);

                var cont = {
                    content:order_item,
                    receive:and_receive,
                    non_payMent:non_payMent,
                    comment:and_comment
                };

                console.log(cont);
                var allTemplate = $('#allTemplate').html();
                var compiledAllTemplate = Handlebars.compile(allTemplate);
                $('#item_all').append(compiledAllTemplate(cont));

                var r_template = $('#receiveTemplate').html();
                var r_compiledTemplate = Handlebars.compile(r_template);
                $('#item_receive').append(r_compiledTemplate(cont));

                var pay_template = $('#payTemplate').html();
                var pay_compiledTemplate = Handlebars.compile(pay_template);
                $('#item_pay').append(pay_compiledTemplate(cont));

                var c_template = $('#commentTemplate').html();
                var c_compiledTemplate = Handlebars.compile(c_template);
                $('#item_comment').append(c_compiledTemplate(cont));

                $(order_item).each(function(a,c){
                    if(!(c.if_receive && c.if_cancel)){$('.cart-list-foot').remove()}
                });
            }
        })
    }
});
