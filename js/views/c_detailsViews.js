/**
 * Created by prince on 2015/2/4.
 */


var goods_id = getUrlParam("goods_id");
$.ajax({
    url: ApiUrl + "/index.php?act=goods&op=goods_detail",
    type: "GET",
    data: {goods_id: goods_id},
    dataType: "json",
    success: function (data) {
        var c_info = data.datas.goods_info;
        $('.storage_num').append(parseInt(c_info.goods_storage));

        //立即购买数量 增减
        $(".buy-minus").click(function () {
            var cartnum = parseInt($("#buyNum").val());
            if (cartnum > 1) {
                $("#buyNum").val(parseInt(cartnum - 1));
            }
        });

        $(".buy-add").click(function () {
            var cartnum = parseInt($("#buyNum").val());
            if (cartnum < c_info.goods_storage) {
                $("#buyNum").val(parseInt(cartnum + 1));
            }
        });

        //加入购物车 增减
        $(".cart-minus").click(function () {
            var buynum = parseInt($("#cartNum").val());
            if (buynum > 1) {
                $("#cartNum").val(parseInt(buynum - 1));
            }
        });
        $(".cart-add").click(function () {
            var buynum = parseInt($("#cartNum").val());
            if (buynum < c_info.goods_storage) {
                $("#cartNum").val(parseInt(buynum + 1));
            }
        });
    }
});
//添加收藏
function addCollect() {
    var goods_id = parseInt(getUrlParam("goods_id"));
    var key = getKey('key');
    if (!isLogin()) {
        location.href = WapSiteUrl + '/tmp/login.html';
    } else {
        $.ajax({
            url: ApiUrl + '/index.php?act=member_favorites&op=favorites_add',
            type: 'GET',
            dataType: 'json',
            data: {goods_id: goods_id, key: key},
            success: function (data) {
                if (!data.datas.error) {
                    $('#succeedCollect').modal();
                } else {$('#addCollect').modal()}
            }
        });
    }
}
//添加到购物车
function addCart() {
    $('#addCart').modal({
        relatedTarget: this,
        onConfirm: function () {
            var goods_id = parseInt(getUrlParam("goods_id"));
            var key = getKey('key');
            if (!isLogin()) {
                location.href = WapSiteUrl + '/tmp/login.html';
            } else {
                var quantity = parseInt($("#cartNum").val());
                $.ajax({
                    type: 'POST',
                    url: ApiUrl + '/index.php?act=member_cart&op=cart_add',
                    data: {key: key, goods_id: goods_id, quantity: quantity},
                    success: function (data) {
                        console.log(data);
                        var rData = $.parseJSON(data);
                        if (!rData.datas.error) {
                            $('#myCart').modal({
                                relatedTarget: this,
                                onConfirm: function (){
                                    location.href = WapSiteUrl + '/tmp/commodity/cart_list.html'
                                },
                                onCancel: function() {
                                    location.href = WapSiteUrl + '/tmp/product_list.html'
                                }
                            });
                        } else {
                            $('.am-alert').alert();
                        }
                    }
                })
            }
        }
    });
}
//立即购买
function buyNow() {
    $('#buyNow').modal({
        relatedTarget: this,
        onConfirm: function () {
            var key = getKey('key');
            var goods_id = parseInt(getUrlParam("goods_id"));
            if (!isLogin()) {
                location.href = WapSiteUrl + '/tmp/login.html';
            } else {
                var json = {};
                var buynum = $('#buyNum').val();
                json.key = key;
                json.cart_id = goods_id + '|' + buynum;
                $.ajax({
                    url: ApiUrl + '/index.php?act=member_buy&op=buy_step1',
                    type: 'POST',
                    data: json,
                    dataType: 'json',
                    success: function (data) {
                        if (typeof(data.datas.error) == 'undefined') {
                            location.href = WapSiteUrl + '/tmp/orders/or_submit.html?goods_id=' + goods_id + '&buynum=' + buynum;
                        } else {
                            alert('下单出错啦！！！')
                        }
                    }
                });
            }
        }
    })
}
//$(function(){
//    var $confirm = $('#addCart');
//    var $confirmBtn = $confirm.find('[data-am-modal-confirm]');
//    var $cancelBtn = $confirm.find('[data-am-modal-cancel]');
//    $confirmBtn.off('click.confirm.modal.amui').on('click', function() {
//        var goods_id = parseInt(getUrlParam("goods_id")) ;
//        var key = getKey('key');
//
//        if (!isLogin()){
//            location.href = WapSiteUrl+'/tmp/login.html';
//        } else {
//            var quantity = parseInt($("#buyNum").val());
//            $.ajax({
//                type:'POST',
//                url:ApiUrl+'/index.php?act=member_cart&op=cart_add',
//                data:{key:key,goods_id:goods_id,quantity:quantity},
//                success:function (data){
//                    var rData = $.parseJSON(data);
//                    if(!rData.datas.error){
//                        $('#myCart').modal();
//                    }else{
//                        $('#myCart').modal();
//                    }
//                }
//            })
//        }
//    });
//
//    //     $cancelBtn.off('click.cancel.modal.amui').on('click', function() {
//    //    // do something
//    //    });
//    //
//    //    onCancel: function(e){
//    //
//    //    }
//})
//$("#add_cart").click(function (){
//    var key = getcookie('key');//登录标记
//    if(key==''){
//        var urlarray = geturlstring();
//        if(urlarray['key']){
//            key = urlarray['key'];
//        }
//    }
//    if(key==''){
//        window.location.href = WapSiteUrl+'/tpl/member/login.html';
//    }else{
//
//    }
//});