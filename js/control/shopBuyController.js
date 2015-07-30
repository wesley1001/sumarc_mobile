/**
 * Created by prince on 2015/2/10.
 */
/** @namespace data.datas.address_info */


$(function(){
    var cart_id,data;
    var key = getKey('key');
    var cart = getUrlParam('ifcart');

    if (cart == 1) {
        cart_id = getUrlParam('cart_id');
        data = {key: key, ifcart: 1, cart_id: cart_id};
    } else {
        var goods_id = getUrlParam('goods_id');
        var number = getUrlParam('buynum');
        cart_id = goods_id + '|' + number;
        data = {key: key, cart_id: cart_id};
    }

    $.ajax({
        url: ApiUrl + '/index.php?act=member_buy&op=buy_step1',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (data) {
            console.log(data);
            if (typeof(data.error ) != 'undefined') {
                location.href = WapSiteUrl;}

            var store_item = [];
            var commodity_list = [];
            var address_info = data.datas.address_info;
            var list = data.datas.store_cart_list;

            $.each(list, function(i,c){
                store_item.push(c);
            });

            console.log(store_item);
            var mun = [];
           $.each(list, function(item,index){
                mun.push(count(index.goods_list));
            });

           var num_of_cases = mun.reduce(function(prev, cur, index, array){
               return prev + cur;
           });

           $('.num_of_cases').text(num_of_cases);

           var total_price = [];

            $.each(list, function (item, index) {
                total_price.push( Number(index.store_goods_total));
            });

            var amount = total_price.reduce(function(prev, cur, index, array){
                return prev + cur;
            });

            $('.amount').append(amount.toFixed(2));

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

            var cont = {address_cont:address_info,store_item:store_item};
            var template = $('#ordersTemplate').html();
            var compiledTemplate = Handlebars.compile(template);
            var renderTemplate = compiledTemplate(cont);

            $('#or_list_submit').append(renderTemplate);

            $('#address_link').on('touchend',function(){
                location.href = '../address_control/ads_select.html'
            });

            $('.future-time').on('click',function(){
                var deliver_time = $(this).parent('.choose-time').data('deliverTime');
                var future = Date.parse(deliver_time);
                var nowTemp = new Date();

                //var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

                var checkin = $(this).datepicker({
                    theme:'warning',
                    onRender: function(date) {
                        return date.valueOf() < future.valueOf() ? 'am-disabled' : '';
                    }
                }).on('changeDate.datepicker.amui', function(ev) {
                        if (ev.date.valueOf() > checkout.date.valueOf()) {
                            var newDate = new Date(ev.date);
                            newDate.setDate(newDate.getDate() + 1);
                            checkout.setValue(newDate);
                        }
                        checkin.close();
                    }).data('amui.datepicker');

                var checkout = $(this).datepicker({
                    onRender: function(date) {
                        return date.valueOf() <= checkin.date.valueOf() ? 'am-disabled' : '';
                    }
                }).on('changeDate.datepicker.amui', function(ev) {
                    checkout.close();
                }).data('amui.datepicker');
            });

        }
    });

});



