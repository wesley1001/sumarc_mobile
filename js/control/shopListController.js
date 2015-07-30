/**
 * Created by prince on 2015/2/4.
 */

$(function () {
    $.AMUI.FastClick.attach(document.body);
    var key = getKey('key');
    if (!isLogin()) {
        location.href = WapSiteUrl + '/tmp/login.html';
    } else {
        initCartList();
        function initCartList() {
            $.ajax({
                url: ApiUrl + '/index.php?act=member_cart&op=cart_list',
                type: 'POST',
                dataType: 'json',
                data: {key: key},
                success: function (data) {
                    console.log(data);
                    if (!data.datas.error) {
                        var cartCont = [];
                        var storeID = [];
                        var cart = data.datas.cart_list;
                        data.datas.WapSiteUrl = WapSiteUrl;
                        if (!cart.length == '0') {
                            for (var c = 0; c < cart.length; c++) {
                                cartCont.push({
                                    c_price: cart[c].goods_price,
                                    c_name: cart[c].goods_name,
                                    c_img: cart[c].goods_image_url,
                                    c_store: cart[c].store_name,
                                    c_num: cart[c].goods_num,
                                    c_sum: cart[c].goods_sum,
                                    c_id: cart[c].cart_id,
                                    g_id: cart[c].goods_id,
                                    s_id: cart[c].store_id,
                                    btnID: 'Key_' + cart[c].cart_id
                                });
                                storeID.push({s_id: cart[c].store_id});
                            }
                            ;
                        } else {
                            if (cart.length == '0') {
                                $('.am-alert').addClass('am-block');
                                console.log('meiyoulu');
                            }
                        }
                        var cartData = {cartCont: cartCont}
                        var template = $('#cartTemplate').html();
                        var compiledTemplate = Handlebars.compile(template);
                        var renderTemplate = compiledTemplate(cartData);
                        $('#cart_cont').append(renderTemplate);

                        //$('#cart_cont','#foot').checkBo();

                        $('button.edit-tool').click(function () {
                            var _this = $(this);
                            var el_node = _this.parents('.cart-list-hd');
                            var el_toggle = $(el_node).siblings().find('#orders_tool');
                            $(el_toggle).toggle(function () {
                                    el_toggle.removeClass('none').addClass('show');
                                    $('.edit-tool').text('完成');
                                }, function () {
                                    el_toggle.removeClass('show').addClass('none');
                                    $('.edit-tool').text('编辑');
                                }
                            );
                        });

                        if (!document.getElementsByClassName) {
                            document.getElementsByClassName = function (cls) {
                                var ret = [];
                                var els = document.getElementsByTagName('*');
                                for (var i = 0, len = els.length; i < len; i++) {
                                    if (els[i].className.indexOf(cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls) >= 0) {
                                        ret.push(els[i]);
                                    }
                                }
                                return ret;
                            }
                        }
                        var table = document.getElementById('cart_cont');                   // 购物车表格
                        var tr = table.children;                                            // 列表单品元素
                        var selectInputs = document.getElementsByClassName('check');        // 所有勾选框
                        var checkAllInputs = document.getElementsByClassName('check-all')   // 全选框
                        var priceTotal = document.getElementById('price_total');            //总计
                        var selectedViewList = document.getElementById('selectedViewList'); //浮层已选商品列表容器
                        var selectedTotal = document.getElementById('selectedTotal');       //已选商品数目容器
                        var deleteAll = document.getElementById('deleteAll');               // 删除全部按钮
                        var selected = document.getElementById('selected');                 //已选商品

                        // 更新总数和总价格，已选浮层
                        function getTotal() {
                            var seleted = 0;
                            var price = 0;
                            var HTMLstr = '';
                            for (var i = 0, len = tr.length; i < len; i++) {
                                if (tr[i].getElementsByTagName('input')[0].checked) {
                                    seleted += parseInt(tr[i].getElementsByTagName('input')[1].value);
                                    price += parseFloat(tr[i].getElementsByClassName('current-total')[0].innerText);
                                    //HTMLstr += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src+ '"><span class="del" index="' + i + '">取消选择</span></div>'
                                }
                                //else {
                                //    tr[i].className = '';
                                //}
                            }
                            priceTotal.innerHTML = price.toFixed(2);
                            //selectedTotal.innerHTML = seleted;
                            //selectedViewList.innerHTML = HTMLstr;
                            //if (seleted == 0) {
                            //    foot.className = 'foot';
                            //}
                        }

                        // 点击选择框
                        for (var v = 0; v < selectInputs.length; v++) {
                            selectInputs[v].onclick = function () {
                                if (this.className.indexOf('check-all') >= 0) { //如果是全选，则吧所有的选择框选中
                                    for (var j = 0; j < selectInputs.length; j++) {
                                        selectInputs[j].checked = this.checked;
                                    }
                                }
                                if (!this.checked) {                            //只要有一个未勾选，则取消全选框的选中状态
                                    for (var i = 0; i < checkAllInputs.length; i++) {
                                        checkAllInputs[i].checked = false;
                                    }
                                }
                                getTotal();//选完更新总计
                            }
                        }
                        // 计算单行价格
                        function getSubtotal(tr) {
                            var cart_id = tr.dataset.cartId;
                            var price = tr.getElementsByClassName('current-price')[0].dataset.currentPrice;  //单价
                            var subtotal = tr.getElementsByClassName('current-num')[0];                      //小计td
                            var countInput = tr.getElementsByTagName('input')[1].value;                      //数目input
                            var span = tr.getElementsByTagName('span')[6];                                   //-号
                            $.ajax({
                                type: 'POST',
                                dataType: 'json',
                                url: ApiUrl + '/index.php?act=member_cart&op=cart_edit_quantity',
                                data: {key: key, cart_id: cart_id, quantity: countInput},
                                success: function (data) {
                                    console.log(data)
                                    subtotal = (parseInt(countInput) * parseFloat(price)).toFixed(2);
                                    subtotal.toString();                                 //写入HTML
                                    tr.getElementsByClassName('current-total')[0].innerHTML = subtotal;
                                    getTotal();
                                }
                            });
                            //如果数目只有一个，把-号去掉
                            if (countInput == 1) {
                                span.innerHTML = '';
                            } else {
                                span.innerHTML = '-';
                            }
                        }

                        //已选商品弹层中的取消选择按钮
                        //selectedViewList.onclick = function (e) {
                        //    var e = e || window.event;
                        //    var el = e.srcElement;
                        //    if (el.className=='del') {
                        //        var input =  tr[el.getAttribute('index')].getElementsByTagName('input')[0]
                        //        input.checked = false;
                        //        input.onclick();
                        //    }
                        //}
                        //为每行元素添加事件
                        for (var i = 0; i < tr.length; i++) {
                            tr[i].onclick = function (e) {                                          //将点击事件绑定到tr元素
                                var e = e || window.event;
                                var el = e.target || e.srcElement;                                  //通过事件对象的target属性获取触发元素
                                var cls = el.className;                                             //触发元素的class
                                var countInout = this.getElementsByTagName('input')[2];             //数目input
                                var num = this.getElementsByClassName('current-num')[0];
                                var value = parseInt(countInout.value);                             //数目
                                //通过判断触发元素的class确定用户点击了哪个元素
                                switch (cls) {
                                    case 'btn-add':     //点击了加号
                                        countInout.value = value + 1;
                                        num.value = value + 1;
                                        getSubtotal(this);
                                        break;
                                    case 'btn-minus':  //点击了减号
                                        if (value > 1) {
                                            countInout.value = value - 1;
                                            num.value = value - 1;
                                            getSubtotal(this);
                                        }
                                        break;
                                    case 'delete am-btn am-btn-magenta':  //点击了删除
                                        var conf = confirm('确定删除此商品吗？');
                                        if (conf) {
                                            delCart(this);
                                        }
                                        break;
                                }

                            }
                            // 给数目输入框绑定keyup事件
                            //tr[i].getElementsByTagName('input')[2].onkeyup = function () {
                            //    var val = parseInt(this.value);
                            //    if (isNaN(val) || val <= 0) {
                            //        val = 1;
                            //    }
                            //    if (this.value != val) {
                            //        this.value = val;
                            //    }
                            //    getSubtotal(this.parentNode.parentNode.parentNode.parentNode.parentNode); //更新小计
                            //    getTotal(); //更新总数
                            //}
                        }
                        //删除购物车delCart
                        function delCart(tr) {
                            var cart_id = tr.dataset.cartId;
                            $.ajax({
                                type: 'POST',
                                dataType: 'json',
                                data: {key: key, cart_id: cart_id},
                                url: ApiUrl + '/index.php?act=member_cart&op=cart_del',
                                success: function (data) {
                                    console.log(data);
                                    if (data.datas === '1') {
                                        var tr_parent = tr.parentNode;
                                        tr_parent.removeChild(tr);
                                        getTotal();
                                        if (tr_parent.children.length == '0') {
                                            $('.am-alert').css('display', 'block');
                                            $('#total_price').text('0.00');
                                            console.log('meiyoulu');
                                        }
                                    }
                                }
                            });
                        }

                        // 默认全选
                        checkAllInputs[0].checked = true;
                        checkAllInputs[0].onclick();
                    } else {
                        alert(result.datas.error);
                    }
                }
            });
        }
    }
    ;
})

