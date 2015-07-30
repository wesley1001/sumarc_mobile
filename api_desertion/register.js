$("#getcode").click(function(){
		//验证手机号
		var num = $("#phone").val();
		var regPartton=/1[3-8]+\d{9}/;
		if(regPartton.test(num)){
			//alert('ok');	手机号通过
			$.ajax({
				type: "GET",
				url: "/shop/index.php?act=login&op=check_phone&column=ok",
				data: "phone="+num,
				success: function(b){
					if(b == "true"){
						$.ajax({
							type: "POST",
							url: "http://sumarc.com/shop/index.php?act=seccode&op=sendsm",
							data: "num="+num,
							success: function(datas){
								var msg =  jQuery.parseJSON(datas).state;
								if(msg == 'ok'){//已发送
									alert('验证码已发送,请在1小时内输入验证码,过期作废');
								}else if(msg == '1'){//距上次发送验证码未够一小时不能发送验证码
									alert('距上次发送验证码未够一小时不能发送验证码!');
								}else if(msg == 'failed')alert('发送错误!请核对手机号码');
							}
						});
					}else if(b == "false"){
						alert('该号码已注册,如有疑问请联系管理员');
					}else{
						alert('发送失败');
					}
				}
			});
			
		}else{
			//alert('no');	手机号非法
			alert('输入正确的手机号');
		}
	});
$(function(){
	
	
	$.sValid.init({//注册验证
        rules:{
        	username:"required",
        	phone:"required",
        	captcha:"required"
//            userpwd:"required",            
//            password_confirm:"required",
//            email:{
//            	required:true,
//            	email:true
//            }
        },
        messages:{
            username:"用户名必须填写！",
            phone:"手机号码必填",
            captcha:"手机验证码必填"
//            userpwd:"密码必填!", 
//            password_confirm:"确认密码必填!",
//            email:{
//            	required:"邮件必填!",
//            	email:"邮件格式不正确"           	
//            }
        },
        callback:function (eId,eMsg,eRules){
            if(eId.length >0){
                var errorHtml = "";
                $.map(eMsg,function (idx,item){
                    errorHtml += "<p>"+idx+"</p>";
                });
                $(".error-tips").html(errorHtml).show();
            }else{
                $(".error-tips").html("").hide();
            }
        }  
    });
	
	$('#loginbtn').click(function(){	
		var username = $("input[name=username]").val();
//		var pwd = $("input[name=pwd]").val();
//		var password_confirm = $("input[name=password_confirm]").val();
//		var email = $("input[name=email]").val();
		var client = $("input[name=client]").val();
		var phone = $("input[name=phone]").val();
		var captcha = $("input[name=captcha]").val();
		
		if($.sValid()){
			$.ajax({
				type:'post',
				url:ApiUrl+"/index.php?act=login&op=register",	
//				data:{username:username,password:pwd,password_confirm:password_confirm,email:email,client:client},
				data:{username:username,phone:phone,captcha:captcha,client:client},
				dataType:'json',
				success:function(result){
					if(!result.datas.error){
						if(typeof(result.datas.key)=='undefined'){
							return false;
						}else{
//							addcookie('username',result.datas.username);
//							addcookie('key',result.datas.key);
//							location.href = WapSiteUrl+'/tmpl/member/member.html';
							location.href = WapSiteUrl+'/tmpl/member/login.html';
						}
						$(".error-tips").hide();
					}else{
						$(".error-tips").html(result.datas.error).show();
					}
				}
			});
		}
	});
});