/**
 * Created by prince on 2015/3/19.
 */

$(function(){

    var key = getKey('key');

    GetData();

    function GetData(){
        $.ajax({
            url:ApiUrl+"/index.php?act=member_address&op=address_list",
            type:"GET",
            data:{key:key},
            dataType:"json",
            success:function(data) {
                console.log(data);

                var ads_list = data.datas.address_list;

                var cont = {address_cont:ads_list};
                var template = $('#selectTemplate').html();
                var compiledTemplate = Handlebars.compile(template);
                var renderTemplate = compiledTemplate(cont);

                $('#ads_list').append(renderTemplate);

                $('input').iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'
                });

                $('.del-address').on('click',function(){
                    var _this = $(this);
                    var ads_id = _this.siblings('.address-ic').data('addressId');
                    $('#my_address').modal({
                        relatedTarget: this,
                        onConfirm: function(options) {
                            $.ajax({
                                url:ApiUrl+'/index.php?act=member_address&op=address_del',
                                type:'POST',
                                data:{key:key,address_id:ads_id},
                                dataType:'json',
                                success:function(data){
                                    console.log(data);
                                    _this.parents('.default-address').remove();
                                }
                            })
                        }
                    });

                })
            }
        });
    }
});