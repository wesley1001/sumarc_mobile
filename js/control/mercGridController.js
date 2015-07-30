/**
 * Created by prince on 2015/1/28.
 */

requestData();

function requestData() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: ApiUrl + '/index.php?act=goods_class',
        success: function (data) {
            console.log(data);
            var c_url = [];
            var c_name = [];
            var c_cont = data.datas.class_list;
            data.datas.WapSiteUrl = WapSiteUrl;
            for (var i = 0; i < c_cont.length; i++) {
                c_name.push({'item': c_cont[i].gc_name});
                c_url = {'item': WapSiteUrl + '/tmp/commodity/c_list.html'};
                //c_url.push({'item': WapSiteUrl + '/tmp/product_list.html?gc_id=' + c_cont[i].gc_id});
            }

            var ctyData = {c_name: c_name, c_url: c_url};
            var template = $('#categroyTemplate').html();
            var compiledTemplate = Handlebars.compile(template);
            var renderTemplate = compiledTemplate(ctyData);

            $('#c_tabs').append(renderTemplate);

            $('#categroy_tabs').tabs();
            $('#side_nav li:first-child').addClass('am-active');
        }
    });
}

//        function fmt(data) {
//          if (data instanceof Array) {
//            var fmtList = [];
//            for (var i = 0, l = data.length; i < l; i++) {
//              fmtList.push({'item': data[i]});
//            }
//
//            return fmtList;
//          } else {
//            return '';
//          }
//        }
//        fmt(c_name);

//  function render() {
//    var template = $('#categroyTemplate').html();
//    var compiledTemplate = Handlebars.compile(template);
//    var renderTemplate = compiledTemplate({ctyData: c_name});
//
//    $$('#c-tabs').append(renderTemplate);
//  };