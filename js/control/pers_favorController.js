/**
 * Created by prince on 2015/2/9.
 */
/** @namespace fl.goods_image_url */
/** @namespace data.datas.favorites_list */


$(function(){
    var key = getKey('key');
    if (!isLogin()){
        location.href = WapSiteUrl+'/tmp/login.html';
    } else {
        $.ajax({
            type:'GET',
            url:ApiUrl+'/index.php?act=member_favorites&op=favorites_list',
            data:{key:key},
            dataType:'json',
            success:function(data){
                console.log(data);
                var fl = data.datas.favorites_list;
                var favor_l = [];
                $.each(fl, function(i,l){
                    favor_l.push({
                        f_name: l.goods_name,
                        f_img: l.goods_image_url,
                        f_price: l.goods_price,
                        f_id: l.goods_id
                    })
                });

                var cont ={content:favor_l};console.log(cont);
                var template = $('#favorTemplate').html();
                var compiledTemplate = Handlebars.compile(template);
                var renderTemplate = compiledTemplate(cont);
                $('#favor_tables').append(renderTemplate);


                var favor = document.getElementById('favor_list');
                var cells = favor.children;
                var selectLabels = document.getElementsByClassName('checkbox-cells');
                var selectInputs = document.getElementsByClassName('check');
                var checkAllInputs = document.getElementsByClassName('check-all');


                $('#edit_btn').click(function(){
                    for(var i=0;i< selectLabels.length;i++){
                        if(selectLabels[i].style.display == 'none'){
                            selectLabels[i].style.display = 'block';
                        }else{
                            selectLabels[i].style.display = 'none';
                        }
                    }
                });

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
                    }
                }


            }
        })
    }


});

