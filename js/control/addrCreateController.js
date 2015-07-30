/**
 * Created by mithenji on 15/4/13.
 */
/** @namespace data.datas.area_list */


$(function () {
    var key = getKey('key');
    $('select').selected({
        btnWidth: '200px',
        btnSize: 'sm',
        maxHeight: '50vh'
    });
    var province = function () {
        $.ajax({
            type: 'POST',
            url: ApiUrl + '/index.php?act=member_address&op=area_list',
            data: {key: key},
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var area_list = data.datas.area_list;
                var cont = {area_cont: area_list};
                var compiledTemplate = Handlebars.compile($('#provTemplate').html());
                var renderTemplate = compiledTemplate(cont);
                var provContent = $('#province').children('select');
                $('#province').append(renderTemplate);
                city();
            }
        });
    };
    var city = function () {
        var city_id = $('select[name="prov"]').val();
        $.ajax({
            type: 'POST',
            url: ApiUrl + '/index.php?act=member_address&op=area_list',
            data: {key: key, area_id: city_id},
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var city_list = data.datas.area_list;
                var cont = {city_cont: city_list};
                var compiledTemplate = Handlebars.compile($('#cityTemplate').html());
                var renderTemplate = compiledTemplate(cont);
                var cityContent = $('#city').children('select');
                if (cityContent.length == '1') {
                    cityContent[0].remove();
                    $('#city').append(renderTemplate);
                } else {
                    $('#city').append(renderTemplate);
                }
                distric();
            }
        });
    };
    var distric = function () {
        var city_id = $('select[name="city"]').val();
        $.ajax({
            type: 'POST',
            url: ApiUrl + '/index.php?act=member_address&op=area_list',
            data: {key: key, area_id: city_id},
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var city_list = data.datas.area_list;
                var cont = {city_cont: city_list};
                var compiledTemplate = Handlebars.compile($('#cityTemplate').html());
                var renderTemplate = compiledTemplate(cont);
                var cityContent = $('#district').children('select');
                if (cityContent.length == '1') {
                    cityContent[0].remove();
                    $('#district').append(renderTemplate);
                } else {
                    $('#district').append(renderTemplate);
                }
            }
        });
    };
    //保存并提交收货地址
    $('#finish').on('click', function () {
        var true_name = $('input[name=true_name]').val();
        var mob_phone = $('input[name=mob_phone]').val();
        var city_id = $('select[name=city]').val();
        var area_id = $('select[name=town]').val();
        var address = $('input[name=address]').val();
        var prov_index = $('select[name=prov]')[0].selectedIndex;
        var city_index = $('select[name=city]')[0].selectedIndex;
        var town_index = $('select[name=town]')[0].selectedIndex;
        var area_info = $('select[name=prov]')[0].options[prov_index].innerHTML + '-' + $('select[name=city]')[0].options[city_index].innerHTML + '-' + $('select[name=town]')[0].options[town_index].innerHTML;
        //ajax 提交收货地址
        $.ajax({
            type: 'POST',
            url: ApiUrl + '/index.php?act=member_address&op=address_add',
            data: {
                key: key, true_name: true_name, mob_phone: mob_phone,
                city_id: city_id, area_id: area_id, address: address, area_info: area_info
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data) {
                    location.href = 'ads_create.html'
                }
            }
        })
    });

    $(function () {
        districtSelect();
        var districtSelect = function () {
            province();
            $('#province').on('change', function () {
                city();
            });
            $('#city').on('change', function () {
                distric();
            });
        };
    });
});
