/**
 * Created by prince on 2015/5/11.
 */
/** @namespace data.adv_list */
/** @namespace v.menu_url */
/** @namespace v.menu_img */
/** @namespace v.menu_title */
/** @namespace v.floor_url */
/** @namespace v.floor_img */
/** @namespace v.floor_title */



/*******************读取家具、建材、家居数据*********************/

$(function(){
    function mainPageInit() { 
		   function load(cate_id,id){
				$.ajax({
					url:"/mobile/index.php?act=goods&op=goods_list&gc_id="+cate_id+"",
					type:'GET',
					dataType:'json',
					key:'',
					//Date:'curpage='+1,
					success:function(result){
						var data=result.datas.goods_list,
							html="";
						for(var e=0; e < data.length; e++){
							var goodsname=data[e].goods_name,
								goodsurl=data[e].goods_image_url,
								goodsprice=data[e].goods_marketprice,
								goodsnum=data[e].goods_salenum,
								goodsid=data[e].goods_id;
							html+="<div class='blockLeft'><a href='tmp/commodity/c_details.html?goods_id="+goodsid+"'><img src='"+goodsurl+"' /><div class='post-info'><p class='hot-info'>"+goodsname+"</p><p class='count-num ov'><span class='fleft'>￥"+goodsprice+"</span><i class='buy fright'>已售:"+goodsnum+"件</i></p></div></a></div>";
						}
						$("#"+id+"").append(html);
						/*refreshList(html);*/
						
					}
			
				});
			}
			load(4,"furniture");
			load(54,"building");
			load(95,"home");
		
			function allPic(){
				$.ajax({
					//url:"/mobile/index.php?act=goods&op=goods_list&page=200&key="+seInput,
					url:"/mobile/index.php?act=goods&op=goods_list",
					type:'GET',
					dataType:'json',
					curpage:curpage,
					success:function(result){
						var data=result.datas.goods_list,
							html="";
						for(var e=0; e < data.length; e++){
							var goodsname=data[e].goods_name,
								goodsurl=data[e].goods_image_url,
								goodsprice=data[e].goods_marketprice,
								goodsnum=data[e].goods_salenum,
								//goodsid=data[e].goodsid;
								goodsid=data[e].goods_id;
							html+="<div class='blockLeft'><a href='tmp/commodity/c_details.html?goods_id="+goodsid+"'><img src='"+goodsurl+"' /><div class='post-info'><p class='hot-info'>"+goodsname+"</p><p class='count-num ov'><span class='fleft'>￥"+goodsprice+"</span><i class='buy fright'>已售:"+goodsnum+"件</i></p></div></a></div>";
						}
						$("#allpic").append(html);
						refreshList(html);
						
						}
				   
				});
				/******************************** /读取全部图片***************************************/
			}
			
			var curpage = curpage;
			function refreshList(e){
				var $_onGoodslazybox=$('.goods-warp').children('.on');
				//var i=0;
				$_onGoodslazybox.find(".blockLeft").each(function(i){
				$_onGoodslazybox.find(".outDiv").append(e);
						
					//i++;
					
				});
				curpage++;
			
			}   
			//绑定事件,当滚动条滚到底部的时候触发
			$(window).scroll(function () {
				if ($(document).scrollTop() >= $(document).height() - $(window).height()){
					allPic();
					
				
				}
			});
			/*下拉加载结束*/
			
		
		
        $.ajax({
            url: "/mobile/index.php?act=index",
            type:'GET',
            dataType:'json',
            success:function(result){
                var data=result.datas,
                    html="";
                for(var i =0; i < data.adv_list.length;i++){ 
                    var url = data.adv_list[i].image,
                        keyword = data.adv_list[i].keyword;
                        html+="<div class='wrap'><a href='javascript:;'><img src='"+url+"' /></a></div>"
                }
                $("#advimg").append(html);
                /*读取轮播图片*/
                
                var slider =
                Swipe(document.getElementById('slider'), {
                    auto: 3000,
                    continuous: true,
                    callback: function(pos) {

                      var i = bullets.length;
                      while (i--) {
                        bullets[i].className = ' ';
                      }
                      bullets[pos].className = 'on';

                    }
                  });
                var bullets = document.getElementById('position').getElementsByTagName('li');
                /*轮播效果结束*/
                
            }
        });
        /******************************** /读取轮播图片***************************************/

          $.ajax({
            url:"/mobile/index.php?act=goods&op=goods_list&page=30",
            type:'GET',
            dataType:'json',
            success:function(result){
                var data=result.datas.goods_list,
                    html="",
                    divhtml="";
                    //var divi=(data.length)/6;
                    //for(var x=0; x<divi; x++){
                    for(var uli=0; uli < data.length; uli++){
                        var picname=data[uli].goods_name;
                        var piccount=data[uli].goods_marketprice;
                        var picurl=data[uli].goods_image_url;
                        var goodsid=data[uli].goods_id;
                        if(uli%6==0){
                           html+="<div class='wrap'><ul class='clearfix'>";
                            
                        }  
                        html+="<li><a href='tmp/commodity/c_details.html?goods_id="+goodsid+"'><div class='prepic'><img src='"+picurl+"' /></div><p class='preinfo'>"+picname+"</p><p class='count ov'><i>折扣价:</i><span>￥"+parseInt(piccount)+"</span></p></a></li>";
                        if(uli%6==5){
                            html += "</ul></div>";
                        }
                    }
                    //html && (divhtml+="<div class='touchslider-item'><ul class='clearfix touchslider-ul'>"+html+"</ul></div>");
                    $("#touchslider-box").append(html);
                
                /*读取今日特惠商品图片*/
                
                    var slider =
                    Swipe(document.getElementById('slider-goods'), {
                        auto: 3000,
                        continuous: true,
                        callback: function(pos) {

                          var i = bullets2.length;
                          while (i--) {
                            bullets2[i].className = ' ';
                          }
                          bullets2[pos].className = 'on';

                        }
                      });
                    var bullets2 = document.getElementById('position-goods').getElementsByTagName('li');
                    /*今日特惠商品图片*/
                }
            
            });
            /******************************** /读取今日特惠商品图片***************************************/
        
            
				
			    	
        
    }
		
	
    mainPageInit();
});
