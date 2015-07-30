$(function() {
	$.ajax({
		url:ApiUrl+"/index.php?act=goods_class",
		type:'get',
		jsonp:'callback',
		dataType:'jsonp',
		success:function(result){
			var html;
			var data = result.datas;
			console.log(result);
			data.WapSiteUrl = WapSiteUrl;

			html = template.render('category-one', data);
			$("#categroy-cnt").html(html);
		}
	});
});