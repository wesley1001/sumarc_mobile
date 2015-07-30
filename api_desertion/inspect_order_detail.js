$(function(){
	var key = getcookie('key');
	if(key==''){
		var urlarray = geturlstring();
		if(urlarray['key']){
			key = urlarray['key'];
		}else{
			window.location.href = WapSiteUrl+'/tmpl/member/login.html';
		}
	}

	//初始化验房订单
	function initInspectDetailPage(){
		var order_id = GetQueryString("order_id");
		$.ajax({
			type:'post',
			url:ApiUrl+"/index.php?act=member_inspect_order&op=row&order_id="+order_id,	
			data:{key:key},
			dataType:'json',
			success:function(result){
				checklogin(result.login);//检测是否登录了
				var data = result.datas;
				data.WapSiteUrl = WapSiteUrl;//页面地址
				data.ApiUrl = ApiUrl;
				data.key = getcookie('key');
				template.helper('$getLocalTime', function (nS) {
					return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');  
				});
				var html = template.render('inspect-order-detail-tmpl', data);
				$("#inspect-order-detail").html(html);

			}
		});
	}
	//初始化页面
	initInspectDetailPage();

});