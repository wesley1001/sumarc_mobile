$(function (){
	var key,
		html,
		tmpl,
		render,
		urlarray;
	var memberHtml = '<a class="btn mr5" href="'+WapSiteUrl+'/tmpl/member/member.html?act=member" > 个人中心</a>';
    var act = GetQueryString("act");
    if(act && act == "member"){
        memberHtml = '<a class="btn mr5" id="logoutbtn" href="javascript:void(0);">注销账号</a>';
    }
	tmpl = '<div class="footer">'
	+ '<div class="footer-top">'
	+ '<div>' + memberHtml + '</div></div><div class=\"footer-content\"></div></div>';
	render = template.compile(tmpl);
	html = render();
	$("#footer").html(html);
    //回到顶部
    $(".gotop").click(function (){
        $(window).scrollTop(0);
    });
    key = getcookie('key');
    if(key == null){
		urlarray = geturlstring();
		if(urlarray['key']){
			key = urlarray['key'];
		}
	}
	$('#logoutbtn').click(function(){
		var username = getcookie('username');
		var key = getcookie('key');
		if(key==''){
			var urlarray = geturlstring();
			if(urlarray['key']){
				key = urlarray['key'];
			}
		}
		var client = 'wap';
		$.ajax({
			type:'post',
			url:ApiUrl+'/index.php?act=logout',
			data:{username:username,key:key,client:client},
			success:function(result){
				if(result){
					delCookie('username');
					delCookie('key');
					location.href = WapSiteUrl+'/tmpl/member/login.html';
				}
			}
		});
	});
});