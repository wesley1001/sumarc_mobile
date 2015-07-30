$(function (){
     // 图片轮播
    //function picSwipe(){
    //  var elem = $("#banner-view")[0];
    //  window.mySwipe = Swipe(elem, {
    //    continuous: true,
    //    // disableScroll: true,
    //    stopPropagation: true,
    //    callback: function(index, element) {
    //      $(".pds-cursize").html(index+1);
    //    }
    //  });
    //}
    var goods_id = getUrlParam("goods_id");
    //渲染页面
    $.ajax({
       url:ApiUrl+"/index.php?act=goods&op=goods_detail",
       type:"get",
       data:{goods_id:goods_id},
       dataType:"json",
       success:function(result){
           console.log(result);
           var goods_map_spec;
           var html;
           var data = result.datas;
          if(!data.error){
            //商品图片格式化数据
            if(data.goods_image){
              var goods_image = data.goods_image.split(",");
              data.goods_image = goods_image;
            }else{
               data.goods_image = [];
            }
            //商品规格格式化数据
            if(data.goods_info.spec_name){
              goods_map_spec = $.map(data.goods_info.spec_name,function(v,i){
                var goods_specs = {};
                goods_specs["goods_spec_id"] = i;
                goods_specs['goods_spec_name']=v;
                if(data.goods_info.spec_value){
	                $.map(data.goods_info.spec_value,function(vv,vi){
	                    if(i == vi){
	                      goods_specs['goods_spec_value'] = $.map(vv,function (vvv,vvi){
	                        var specs_value = {};
	                        specs_value["specs_value_id"] = vvi;
	                        specs_value["specs_value_name"] = vvv;
	                        return specs_value;
	                      });
	                    }
	                  });
	                  return goods_specs;               	
                }else{
                	data.goods_info.spec_value = [];
                }
              });
              data.goods_map_spec = goods_map_spec;
            }else {
              data.goods_map_spec = [];
            }
            //渲染模板
            html = template.render('product_detail', data);
            $("#product_detail_wp").html(html);
            //图片轮播
            //picSwipe();
              $(function() {
                  $('.am-slider').flexslider({
                      touch:true,
                      easing: "swing",
                      keyboard:true,
                      directionNav: false,
                      multiplekeyboard:true,
                      direction: "horizontal"
                  });
              });
            //商品描述
            $(".pddcp-arrow").click(function (){
              $(this).parents(".pddcp-one-wp").toggleClass("current");
            });
            //活动描述
              $(".btn-act").on('click',function(){
                  $(this).parents(".pddc-active").toggleClass("toggle");
              });
            //规格属性
            var myData = {};
            myData["spec_list"] = data.spec_list;
            $(".pddc-stock a").click(function (){
              var self = this;
              arrowClick(self,myData);
            });
            //购买数量，减
            $(".minus-wp").click(function (){
               var buynum = parseInt($(".buy-num").val());
               if(buynum >1){
                  $(".buy-num").val(parseInt(buynum-1));
               }
            });

            //购买数量加
            $(".add-wp").click(function (){
               var buynum = parseInt($(".buy-num").val());
               if(buynum < data.goods_info.goods_storage){
                  $(".buy-num").val(parseInt(buynum+1));
               }
            });

            //收藏
            $(".pd-collect").click(function (){
                var key = getcookie('key');//登录标记
                if(key==''){
        			var urlarray = geturlstring();
        			if(urlarray['key']){
        				key = urlarray['key'];
        			}
        		}
                if(key==''){
                  window.location.href = WapSiteUrl+'/tpl/member/login.html';
                }else {
                  $.ajax({
                    url:ApiUrl+"/index.php?act=member_favorites&op=favorites_add",
                    type:"post",
                    dataType:"json",
                    data:{goods_id:goods_id,key:key},
                    success:function (fData){
                     if(checklogin(fData.login)){
                        if(!fData.datas.error){
                          $.sDialog({
                            skin:"green",
                            content:"收藏成功！",
                            okBtn:false,
                            cancelBtn:false
                          });
                        }else{
                          $.sDialog({
                            skin:"red",
                            content:fData.datas.error,
                            okBtn:false,
                            cancelBtn:false
                          });
                        }
                      }
                    }
                  });
                }
            });
            //加入购物车
            $("#add_cart").click(function (){
              var key = getcookie('key');//登录标记
            if(key==''){
      			var urlarray = geturlstring();
      			if(urlarray['key']){
      				key = urlarray['key'];
      			}
      		}
               if(key==''){
                  window.location.href = WapSiteUrl+'/tpl/member/login.html';
               }else{
                  var quantity = parseInt($(".buy-num").val());
                  $.ajax({
                     url:ApiUrl+"/index.php?act=member_cart&op=cart_add",
                     data:{key:key,goods_id:goods_id,quantity:quantity},
                     type:"post",
                     success:function (result){
                        var rData = $.parseJSON(result);
                        if(checklogin(rData.login)){
                          if(!rData.datas.error){
                             $.sDialog({
                                skin:"block",
                                content:"添加购物车成功！",
                                "okBtnText": "再逛逛",
                                "cancelBtnText": "去购物车",
                                okFn:function (){},
                                cancelFn:function (){
                                  window.location.href = WapSiteUrl+'/tpl/cart_list.html';
                                }
                              });
                          }else{
                            $.sDialog({
                              skin:"red",
                              content:rData.datas.error,
                              okBtn:false,
                              cancelBtn:false
                            });
                          }
                        }
                     }
                  })
               }
            });

            //立即购买
            $("#gotBuy").click(function (){
               var key = getcookie('key');//登录标记
            if(key==''){
       			var urlarray = geturlstring();
       			if(urlarray['key']){
       				key = urlarray['key'];
       			}
       		}
               if(key==''){
                  window.location.href = WapSiteUrl+'/tpl/member/login.html';
               }else{
            	  var json = {};
            	  var buynum = $('.buy-num').val();
            	  json.key = key;
            	  json.cart_id = goods_id+'|'+buynum;
            	  $.ajax({
            		  type:'post',
            		  url:ApiUrl+'/index.php?act=member_buy&op=buy_step',
            		  data:json,
            		  dataType:'json',
            		  success:function(result){
            			  if(typeof(result.datas.error) == 'undefined'){
            				  location.href = WapSiteUrl+'/tpl/order/buy_step.html?goods_id='+goods_id+'&buynum='+buynum;
            			  }else{
                              $.sDialog({
                                  skin:"red",
                                  content:result.datas.error,
                                  okBtn:false,
                                  cancelBtn:false
                                });            				  
            			  }
            		  }
            	  });             	  
               }
            });
          }else {
            var html = data.error;
            $("#product_detail_wp").html(html);
          }
          //验证购买数量是不是数字
          $("#buynum").blur(buyNumer);
          AddView();
       }
       

    });
  //点击商品规格，获取新的商品
  function arrowClick(self,myData){
    $(self).addClass("current").siblings().removeClass("current");
    //拼接属性
    var curEle = $(".pddc-stock-spec").find("a.current");
    var curSpec = [];
    $.each(curEle,function (i,v){
      curSpec.push($(v).attr("specs_value_id"));
    });
    var spec_string = curSpec.sort().join("|");
    //获取商品ID
    var spec_goods_id = myData.spec_list[spec_string];
    window.location.href = "product_detail.html?goods_id="+spec_goods_id;
  }
  
  function AddView(){//增加浏览记录
	  var goods_info = getcookie('goods');
	  var goods_id = getUrlParam('goods_id');
	  if(goods_id<1){
		  return false;
	  }

	  if(goods_info==''){
		  goods_info+=goods_id; 
	  }else{

		  var goodsarr = goods_info.split('@');
		  if(contains(goodsarr,goods_id)){
			  return false;
		  }
		  if(goodsarr.length<5){
			  goods_info+='@'+goods_id;
		  }else{
			  goodsarr.splice(0,1);
			  goodsarr.push(goods_id);
			  goods_info = goodsarr.join('@');
		  }
	  }

	  addcookie('goods',goods_info);
	  return false;
  }
  
  function contains(arr, str) {//检测goods_id是否存入
	    var i = arr.length;
	    while (i--) {
	           if (arr[i] === str) {
	           return true;
	           }   
	    }   
	    return false;
	}
  $.sValid.init({
        rules:{
            buynum:"digits"
        },
        messages:{
            buynum:"请输入正确的数字"
        },
        callback:function (eId,eMsg,eRules){
            if(eId.length >0){
                var errorHtml = "";
                $.map(eMsg,function (idx,item){
                    errorHtml += "<p>"+idx+"</p>";
                });
                $.sDialog({
                    skin:"red",
                    content:errorHtml,
                    okBtn:false,
                    cancelBtn:false
                });
            }
        }  
    });
  //检测商品数目是否为正整数
  function buyNumer(){
    $.sValid();
  }
});