/**
 * Created by prince on 2015/2/9.
 */


//去结算
function goSettlement() {
    var cartIdArr = [];//购物车ID
    var cartIdEl = $('.checked > input.check').parents('.am-list');
    $(cartIdEl).each(function (v) {
        cartIdArr.push($(this).data('cartId'))
    });
    for (var i = 0; i < cartIdEl.length; i++) {
        var cartId = $(cartIdEl[i]).data('cartId');
        var cartNum = $(cartIdEl[i]).find('.current-num').data('currentNum');
        var cartIdNum = cartId + "|" + cartNum;
        cartIdArr.push(cartIdNum);
    }
    var cart_id = cartIdArr.toString();
    window.location.href = WapSiteUrl + "/tmp/orders/or_submit.html?ifcart=1&cart_id=" + cart_id;
}

