refund:退款　return:退货

array('eq'=>'=','neq'=>'<>','gt'=>'>','egt'=>'>=','lt'=>'<','elt'=>'<=','notlike'=>'NOT LIKE','like'=>'LIKE','in'=>'IN','not in'=>'NOT IN');


ALTER TABLE `shopnc_navigation` ADD `p_id` INT(10) NOT NULL DEFAULT '0' COMMENT '父ID' AFTER `nav_id`;



[21] => D:\wamp\htdocs\shopnc\data\cache\nav.php


[21] => D:\wamp\htdocs\shopnc\data\model\cache.model.php




INSERT INTO `sumarc`.`sumarc_setting` (`name`, `value`) VALUES ('site_seller_state', '1');
ALTER TABLE `sumarc_member` ADD `member_phone` BIGINT(11) UNSIGNED NOT NULL COMMENT '注册手机' AFTER `member_id`;
ALTER TABLE `sumarc_member` CHANGE `member_email` `member_email` VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '会员邮箱';




//ERP登录
http://mysumarc.com/shop/index.php?act=seller_login&op=token_login&timestamp=1345678945&nonce=5&signature=536b246c0a5ba8bd66773fa43561aa5c548a77e5&seller_name=testphp



订单支付还要调试,尤其是尾款支付



1.前提：先要注册商城会员，才能申请入住；所以要把店主账号和店主卖家账号分离（店铺管理）
2.商家在建立分账号时，要先验证前台账号；这里要去掉验证
3.商家前往店铺链接
4.修改密码你也要重新开发页面


预存款管理 

店铺常用分类store_id关联

/trunk/admin/include/menu.php
/trunk/admin/control/cash_code.php
/trunk/admin/control/member.php
/trunk/admin/templates/default/cash_member_set.php
/trunk/admin/templates/default/cash_member_list.php
/trunk/admin/templates/default/cash_member_log.php
/trunk/admin/templates/default/member.auth.php

/trunk/wap/js/common.js
/trunk/data/model/buy.model.php
/trunk/data/model/order.model.php
/trunk/shop/control/control.php
/trunk/shop/control/member.php
/trunk/shop/control/login.php
/trunk/shop/control/member_security.php
/trunk/shop/control/buy.php
/trunk/shop/control/store_order.php
/trunk/shop/templates/default/buy/buy_goods_list.php
/trunk/shop/templates/default/buy/buy_step1.php
/trunk/shop/templates/default/member/member_order.show.php
/trunk/shop/templates/default/member/member_home.php
/trunk/shop/templates/default/member/member.cash_code.php
/trunk/shop/templates/default/member/member_authentication.php
/trunk/shop/templates/default/member/member_authentication_info.php
/trunk/shop/templates/default/seller/store_order.show.php


======================================================================================================




个人中心
index.php?act=member_index&op=member_info

"datas": {
        "member_name":用户名,
        "member_truename": 用户真实名字
        "member_sex": 用户性别
        "member_email": 用户邮箱
        "member_mobile": 用户手机
        "member_qq": 用户QQ
        "member_ww": 用户旺旺
        "member_birthday": 用户生日
        "member_areainfo": 用户地址区域
        "avator": 用户头像
    }

积分列表
index.php?act=member_points

"points_list": [
            {
                "pl_id":积分ID
                "pl_memberid": 积分所属用户ID
                "pl_membername": 用户名
                "pl_adminid": 管理员ID
                "pl_adminname": 管理员用户名
                "pl_points": 所得积分
                "pl_addtime": 得到积分时间戳
                "pl_desc": 所得积分描述
                "pl_stage": 所得积分类型
            }]
"member_points":用户积分




page=10&curpage=2


index.php?act=member_refund_return&op=member_return_list&key=8dadb1e0068b61e417cf50c224c6efc1

"list": [
            {
                "refund_id": "2",
                "order_id": "7",
                "order_sn": "6000000000000701",
                "refund_sn": "280102140722171526",
                "store_id": "2",
                "store_name": "涛涛之家",
                "buyer_id": "6",
                "buyer_name": "test",
                "goods_id": "240",
                "order_goods_id": "7",
                "goods_name": "经济适用床",
                "goods_num": "1",
                "refund_amount": "999.00",
                "goods_image": "2_04593642442479207.png",
                "order_goods_type": "1",
                "refund_type": "2",
                "seller_state": "2",
                "refund_state": "3",
                "return_type": "2",
                "order_lock": "2",
                "goods_state": "4",
                "add_time": "1406020526",
                "seller_time": "1406020571",
                "admin_time": "1406020638",
                "reason_id": "0",
                "reason_info": "其他",
                "pic_info": "a:1:{s:5:\"buyer\";a:1:{i:1;s:21:\"04593645267290277.jpg\";}}",
                "buyer_message": "买了不适用",
                "seller_message": "好",
                "admin_message": "体会突然",
                "express_id": "0",
                "invoice_no": "123456",
                "ship_time": "1406020594",
                "delay_time": "1406020594",
                "receive_time": "1406020612",
                "receive_message": "确认收货完成",
                "commis_rate": "1"
            }]

index.php?act=member_refund_return&op=member_refund_list&key=8dadb1e0068b61e417cf50c224c6efc1
 "list": [
            {
                "refund_id": "28",
                "order_id": "240",
                "order_sn": "1011CROR1410280001",
                "refund_sn": "382105141028112923",
                "store_id": "5",
                "store_name": "世邦家具店1",
                "buyer_id": "6",
                "buyer_name": "test",
                "goods_id": "0",
                "order_goods_id": "0",
                "goods_name": "订单商品全部退订金",
                "goods_num": "1",
                "refund_amount": "500.00",
                "goods_image": null,
                "order_goods_type": "1",
                "refund_type": "1",
                "seller_state": "2",
                "refund_state": "3",
                "return_type": "1",
                "order_lock": "2",
                "goods_state": "1",
                "add_time": "1414466963",
                "seller_time": "1414467008",
                "admin_time": "1414467789",
                "reason_id": "0",
                "reason_info": "取消订单，全部退订金",
                "pic_info": "a:1:{s:5:\"buyer\";a:0:{}}",
                "buyer_message": "退!",
                "seller_message": "好的!",
                "admin_message": "OK",
                "express_id": "0",
                "invoice_no": null,
                "ship_time": "0",
                "delay_time": "0",
                "receive_time": "0",
                "receive_message": null,
                "commis_rate": "0"
            }]


/index.php?act=member_refund_return&refund_id=29&op=member_refund_info&key=f8dfd21b659a6be9894bef5fc18ebe5e

"refund": {
            "refund_id": "29",
            "order_id": "241",
            "order_sn": "1011CROR1410280002",
            "refund_sn": "214105141028140919",
            "store_id": "5",
            "store_name": "世邦家具店1",
            "buyer_id": "15",
            "buyer_name": "testphp",
            "goods_id": "0",
            "order_goods_id": "0",
            "goods_name": "订单商品全部退订金",
            "goods_num": "1",
            "refund_amount": "300.00",
            "goods_image": null,
            "order_goods_type": "1",
            "refund_type": "1",
            "seller_state": "2",
            "refund_state": "3",
            "return_type": "1",
            "order_lock": "2",
            "goods_state": "1",
            "add_time": "1414476559",
            "seller_time": "1414476574",
            "admin_time": "1414476693",
            "reason_id": "0",
            "reason_info": "取消订单，全部退订金",
            "pic_info": "a:1:{s:5:\"buyer\";a:0:{}}",
            "buyer_message": "p",
            "seller_message": "p",
            "admin_message": "pp",
            "express_id": "0",
            "invoice_no": null,
            "ship_time": "0",
            "delay_time": "0",
            "receive_time": "0",
            "receive_message": null,
            "commis_rate": "0"
        },
        "pic_list": [],
        "order_info": {
            "order_id": "241",
            "order_sn": "1011CROR1410280002",
            "pay_sn": "430467820520514015",
            "store_id": "5",
            "store_name": "世邦家具店1",
            "seller_id": "5",
            "seller_name": "世邦-家具店1",
            "buyer_id": "15",
            "buyer_name": "testphp",
            "buyer_email": null,
            "add_time": "1414476520",
            "payment_code": "online",
            "payment_time": "0",
            "finnshed_time": "0",
            "goods_amount": "900.00",
            "order_amount": "950.00",
            "pay_deposit": "300.00",
            "pd_amount": "0.00",
            "cash_code_amount": "0.00",
            "shipping_fee": "50.00",
            "assembler_fee": "0.00",
            "evaluation_state": "0",
            "order_state": "0",
            "goods_state": "1",
            "refund_state": "1",
            "lock_state": "0",
            "delete_state": "0",
            "refund_amount": "300.00",
            "delay_time": "1414476693",
            "order_from": "1",
            "shipping_code": "",
            "deliver_time": "11/04/2014",
            "state_desc": "已取消",
            "payment_name": "在线付款",
            "extend_order_common": {
                "order_id": "241",
                "store_id": "5",
                "shipping_time": "0",
                "shipping_express_id": "0",
                "evaluation_time": "0",
                "evalseller_state": "0",
                "evalseller_time": "0",
                "order_message": "",
                "order_pointscount": "0",
                "voucher_price": null,
                "voucher_code": null,
                "deliver_explain": null,
                "daddress_id": "0",
                "reciver_name": "tttttttt",
                "reciver_info": {
                    "address": "北京\t北京市\t东城区 ttttttttttttttttttttt",
                    "phone": "12345678901"
                },
                "reciver_province_id": "1",
                "invoice_info": [],
                "promotion_info": ""
            },
            "goods_list": [
                {
                    "rec_id": "309",
                    "order_id": "241",
                    "goods_id": "304",
                    "goods_name": "test goods 2",
                    "goods_price": "900.00",
                    "goods_num": "1",
                    "goods_image": "5_04662740652413375.jpg",
                    "goods_pay_price": "900.00",
                    "store_id": "5",
                    "buyer_id": "15",
                    "goods_type": "3",
                    "promotions_id": "12",
                    "commis_rate": "0",
                    "gc_id": "6",
                    "shipping_type": "0"
                }
            ]


/index.php?act=member_refund_return&return_id=29&op=member_return_info&key=f8dfd21b659a6be9894bef5fc18ebe5e

"return_info": {
            "refund_id": "19",
            "order_id": "50",
            "order_sn": "6000000000004801",
            "refund_sn": "765106141013144600",
            "store_id": "6",
            "store_name": "mySHOP",
            "buyer_id": "15",
            "buyer_name": "testphp",
            "goods_id": "0",
            "order_goods_id": "0",
            "goods_name": "订单商品全部退款",
            "goods_num": "1",
            "refund_amount": "3800.00",
            "goods_image": null,
            "order_goods_type": "1",
            "refund_type": "2",
            "seller_state": "2",
            "refund_state": "1",
            "return_type": "2",
            "order_lock": "2",
            "goods_state": "5",
            "add_time": "1413182760",
            "seller_time": "1413184470",
            "admin_time": "0",
            "reason_id": "0",
            "reason_info": "取消订单，全部退款",
            "pic_info": "a:1:{s:5:\"buyer\";a:0:{}}",
            "buyer_message": "我中意啊",
            "seller_message": "fff",
            "admin_message": null,
            "express_id": "0",
            "invoice_no": null,
            "ship_time": "0",
            "delay_time": "0",
            "receive_time": "0",
            "receive_message": null,
            "commis_rate": "0"
        },
        "pic_list": [],
        "order_info": {
            "order_id": "50",
            "order_sn": "6000000000004801",
            "pay_sn": "110461341871224015",
            "store_id": "6",
            "store_name": "mySHOP",
            "seller_id": "0",
            "seller_name": "",
            "buyer_id": "15",
            "buyer_name": "testphp",
            "buyer_email": null,
            "add_time": "1407997871",
            "payment_code": "online",
            "payment_time": "0",
            "finnshed_time": "1409209043",
            "goods_amount": "3800.00",
            "order_amount": "3800.00",
            "pay_deposit": "0.00",
            "pd_amount": "0.00",
            "cash_code_amount": "200.00",
            "shipping_fee": "0.00",
            "assembler_fee": "0.00",
            "evaluation_state": "0",
            "order_state": "40",
            "goods_state": "5",
            "refund_state": "0",
            "lock_state": "1",
            "delete_state": "0",
            "refund_amount": "0.00",
            "delay_time": "0",
            "order_from": "1",
            "shipping_code": "",
            "deliver_time": "08/21/2014",
            "state_desc": "交易完成",
            "payment_name": "在线付款",
            "extend_order_common": {
                "order_id": "50",
                "store_id": "6",
                "shipping_time": "0",
                "shipping_express_id": "0",
                "evaluation_time": "0",
                "evalseller_state": "0",
                "evalseller_time": "0",
                "order_message": "",
                "order_pointscount": "380",
                "voucher_price": null,
                "voucher_code": null,
                "deliver_explain": null,
                "daddress_id": "0",
                "reciver_name": "tttttttt",
                "reciver_info": null,
                "reciver_province_id": "1",
                "invoice_info": [],
                "promotion_info": ""
            },
            "goods_list": [
                {
                    "rec_id": "51",
                    "order_id": "50",
                    "goods_id": "270",
                    "goods_name": "布艺沙发 现代简约客厅沙发组合 小户型布沙发",
                    "goods_price": "4000.00",
                    "goods_num": "1",
                    "goods_image": "6_04599722466046681.jpg",
                    "goods_pay_price": "4000.00",
                    "store_id": "6",
                    "buyer_id": "15",
                    "goods_type": "1",
                    "promotions_id": "0",
                    "commis_rate": "0",
                    "gc_id": "6",
                    "shipping_type": "0"
                }
            ]

投诉列表
/index.php?act=member_complain&key=b8a35cfe65014758d7963d594ea59479
投诉详情
/index.php?act=member_complain&op=complain_info&complain_id=1&key=b8a35cfe65014758d7963d594ea59479


收到的消息
/index.php?act=member_message&op=message&key=b8a35cfe65014758d7963d594ea59479

//系统消息
/index.php?act=member_message&op=systemmsg&key=b8a35cfe65014758d7963d594ea59479


系统消息详情
/index.php?act=member_message&op=showmsgbatch&drop_type=msg_system&message_id=128

普通消息详情
/index.php?act=member_message&op=showmsgcommon&drop_type=msg_list&message_id=38

//删除普通消息
index.php?act=member_message&op=dropcommonmsg&drop_type=msg_list&message_id=5
{
    "code": 200,
    "datas": {
        "state": "success",
        "new_num": "2"
    }
}
//我的消息设置详情
index.php?act=member_message&op=setting

//更新我的消息设置,只能用POST方式提交,
index.php?act=member_message&op=setting_update
data:mmt_code=arrival_notice&is_receive=0

order_payment_success 付款成功
order_deliver_success　商品出库
predeposit_change　余额变动
voucher_use　代金券使用
refund_return_notice　退换货消息
arrival_notice　到货通知
consult_goods_reply　商品咨询回复提醒
consult_mall_reply　平台咨询回复提醒



/trunk/data/model/order.model.php
/trunk/admin/templates/default/admin.add.php
/trunk/shop/control/store_order.php
/trunk/shop/control/member_address.php
/trunk/shop/control/store_goods_add.php
/trunk/shop/control/store_goods_sale.php
/trunk/shop/control/store_package_add.php
/trunk/shop/templates/default/seller/store_goods_add.step2.php
/trunk/shop/templates/default/seller/store_goods_sale.index.php
/trunk/shop/templates/default/seller/store_order.index.php
/trunk/shop/templates/default/seller/store_order.order_pay.php



1坐式签2挂式签(大)3插袋式签(大)4挂式签(小)5插袋式签(小)



/trunk/admin/control/goods_class.php
/trunk/admin/templates/default/order.index.php
/trunk/admin/templates/default/order.view.php
/trunk/data/config/config.ini.php
/trunk/data/model/goods.model.php
/trunk/data/model/member.model.php
/trunk/data/resource/js/common_select.js
/trunk/mobile/control/control.php
/trunk/shop/control/store_promotion_xianshi.php
/trunk/shop/control/control.php
/trunk/shop/control/store_account.php
/trunk/shop/control/authentication.php
/trunk/shop/control/login.php
/trunk/shop/control/member_information.php
/trunk/shop/control/store_goods_add.php
/trunk/shop/control/store_goods_online.php
/trunk/shop/control/store_goods_sale.php
/trunk/shop/control/store_package_add.php
/trunk/shop/templates/default/store/goods.php
/trunk/shop/templates/default/layout/member_layout.php
/trunk/shop/templates/default/member/member_order.index.php
/trunk/shop/templates/default/member/member_points.php
/trunk/shop/templates/default/member/member_order.show.php
/trunk/shop/templates/default/seller/store_order.show.php
/trunk/shop/templates/default/seller/store_goods_add.step2.php
/trunk/shop/templates/default/seller/store_order.index.php
/trunk/shop/templates/default/seller/store_goods_sale.index.php
/trunk/shop/templates/default/seller/store_promotion_xianshi.manage.php
/trunk/shop/templates/default/seller/store_order.change_order_pay_state.php

===============v901


/trunk/admin/control/order.php
/trunk/data/model/order.model.php
/trunk/data/model/refund_return.model.php
/trunk/shop/control/member.php
/trunk/shop/control/member_order.php
/trunk/shop/control/member_refund.php
/trunk/shop/control/store_order.php
/trunk/shop/templates/default/seller/store_goods_sale.index.php
/trunk/shop/templates/default/seller/store_order.index.php
/trunk/shopnc.php

====================V.1053

/trunk/admin/control/bill.php
/trunk/admin/control/stat_trade.php
/trunk/admin/include/menu.php
/trunk/admin/templates/default/refund_manage.list.php
/trunk/core/framework/function/goods.php
/trunk/data/crontab/include/order.php
/trunk/data/model/order.model.php
/trunk/data/model/refund_return.model.php
/trunk/shop/control/statistics_sale.php
/trunk/shop/control/store_bill.php
/trunk/shop/control/control.php
/trunk/shop/control/member_order.php
/trunk/shop/control/member_refund.php
/trunk/shop/control/store_refund.php
/trunk/shop/control/store_return.php
/trunk/shop/language/zh_cn/member_layout.php
/trunk/shop/templates/default/layout/common_layout.php
/trunk/shop/templates/default/member/member_order.index.php
/trunk/shop/templates/default/member/member_refund.php
/trunk/shop/templates/default/member/member_refund_all.php
/trunk/shop/templates/default/seller/store_refund.php

=======================V.1079

/trunk/data/model/goods.model.php
/trunk/data/model/refund_return.model.php
/trunk/db_log/20140915.txt
/trunk/shop/control/buy.php
/trunk/shop/control/member_refund.php
/trunk/shop/control/store_goods_offline.php
/trunk/shop/language/zh_cn/member_store_goods_index.php
/trunk/shop/templates/default/seller/store_goods_add.step2.php
/trunk/shop/templates/default/seller/store_goods_list.offline.php
/trunk/shop/templates/default/seller/store_goods_list.online.php
/trunk/shop/templates/default/seller/store_order.index.php
/trunk/shop/templates/default/store/goods.php
/trunk/shop/templates/default/store/info.php

================== V.1109





退货退款重写API:

列表,详情没有重写,根据refund_type来查看详情,1退款,2退货
/index.php?act=member_refund_return

首页导航:menu_type使用POST方式提交
模块导航
index.php?act=index&op=menu&menu_type=1
楼层
index.php?act=index&op=menu&menu_type=2

楼层管理:
index.php?act=index&op=floor


会员卡:
index.php?act=member_index&op=member_auth

违规举报列表:
index.php?act=member_inform

违规举报详情
/index.php?act=member_inform&op=inform_info&inform_id=3





/trunk/shop/templates/default/seller/store_order.index.php
/trunk/mobile/control/logout.php
/trunk/mobile/control/member_refund_return.php
/trunk/temporary/wap/js/templet/footer.js
/trunk/temporary/wap/js/templet/login.js
/trunk/wap/js/tmpl/footer.js
/trunk/wap/js/tmpl/login.js

============================V.1116


/trunk/admin/control/mb_floor.php
/trunk/admin/language/zh_cn/mobile.php
/trunk/admin/templates/default/mb_floor.edit.php
/trunk/admin/templates/default/mb_floor.list.php
/trunk/admin/templates/default/mb_menu.edit.php
/trunk/data/model/mb_floor.model.php
/trunk/data/model/mb_menu.model.php
/trunk/mobile/control/index.php
/trunk/mobile/control/member_complain.php
/trunk/mobile/control/member_inform.php
/trunk/mobile/control/member_index.php

==============V.1149


middle_member 表没有plantid

middle_member_authentication　没有　typeid_vip　, typeid_vip==vip_typeid　???

middle_goods goods_sn 为空时没默认值




/trunk/data/model/mb_menu.model.php
/trunk/data/model/mb_floor.model.php
/trunk/data/model/member.model.php
/trunk/data/model/order.model.php
/trunk/data/model/points.model.php
/trunk/shop/control/goods.php
/trunk/shop/control/store_goods_online.php
/trunk/shop/control/store_order.php
/trunk/shop/control/store_package_add.php
/trunk/shop/templates/default/css/home_goods.css
/trunk/shop/templates/default/seller/store_album.pic_list.php
/trunk/shop/templates/default/seller/store_goods_add.step2.php
/trunk/shop/templates/default/seller/store_goods_list_search.php
/trunk/shop/templates/default/seller/store_goods_list_search_ajax.php
/trunk/shop/templates/default/store/goods.php

==================================== V.1170


/trunk/data/model/member.model.php
/trunk/data/model/goods.model.php
/trunk/data/model/buy.model.php
/trunk/data/model/goods_browse.model.php
/trunk/data/model/store.model.php
/trunk/data/model/payment.model.php
/trunk/admin/include/menu.php
/trunk/admin/control/pointorder.php
/trunk/admin/control/promotion_xianshi.php
/trunk/admin/control/goods_lable.php
/trunk/admin/language/zh_cn/pointorder.php
/trunk/admin/language/zh_cn/payment.php
/trunk/admin/templates/default/pointorder.list.php
/trunk/admin/templates/default/pointorder_verify.php
/trunk/admin/templates/default/xianshi_goods_verify.php
/trunk/admin/templates/default/goods_lable.list.php
/trunk/admin/templates/default/goods_lable.xianshi_list.php
/trunk/admin/templates/default/goods_lable.verify_remark.php
/trunk/admin/templates/default/goods_xianshi_lable.verify_remark.php
/trunk/admin/templates/default/payment.edit.php
/trunk/admin/templates/default/promotion_goods_xianshi.list.php
/trunk/shop/control/authentication.php
/trunk/shop/control/search.php
/trunk/shop/control/login.php
/trunk/shop/control/member_security.php
/trunk/shop/control/store_goods_add.php
/trunk/shop/control/store_goods_online.php
/trunk/shop/control/store_package_add.php
/trunk/shop/control/store_promotion_xianshi.php
/trunk/shop/control/search.php
/trunk/shop/control/show_store.php
/trunk/shop/control/store_goods_sale.php
/trunk/shop/control/buy.php
/trunk/shop/control/payment.php
/trunk/shop/language/zh_cn/home_login_index.php
/trunk/shop/resource/js/store_goods_add.step2.js
/trunk/shop/templates/default/seller/store_goods_add.step2.php
/trunk/shop/templates/default/seller/store_promotion_xianshi.goods.php
/trunk/shop/templates/default/seller/store_promotion_xianshi.manage.php
/trunk/shop/templates/default/seller/store_goods_list_search_ajax.php
/trunk/shop/templates/default/seller/goods_list_ajax.php
/trunk/shop/templates/default/seller/store_goods_sale.index.php
/trunk/shop/templates/default/store/goods.php
/trunk/shop/templates/default/home/search.php
/trunk/shop/templates/default/home/goods.squares.php
/trunk/shop/templates/default/member/member_home.php
/trunk/shop/templates/default/member/member_security.modify_pwd.php
/trunk/shop/templates/default/member/member_order.index.php
/trunk/shop/templates/default/buy/buy_step2.php
========================= V.1210	


/trunk/admin/control/goods_lable.php
/trunk/admin/language/zh_cn/payment.php
/trunk/admin/templates/default/goods_lable.list.php
/trunk/admin/templates/default/goods_lable.xianshi_list.php
/trunk/admin/templates/default/payment.edit.php
/trunk/admin/templates/default/promotion_goods_xianshi.list.php
/trunk/admin/templates/default/payment.edit.php
/trunk/data/model/buy.model.php
/trunk/data/model/goods.model.php
/trunk/data/model/goods_browse.model.php
/trunk/data/model/store.model.php
/trunk/data/model/payment.model.php
/trunk/shop/control/search.php
/trunk/shop/control/show_store.php
/trunk/shop/control/store_goods_add.php
/trunk/shop/control/store_goods_online.php
/trunk/shop/control/store_goods_sale.php
/trunk/shop/control/store_package_add.php
/trunk/shop/control/store_promotion_xianshi.php
/trunk/shop/control/buy.php
/trunk/shop/control/payment.php
/trunk/shop/control/store_order.php
/trunk/shop/templates/default/home/goods.squares.php
/trunk/shop/templates/default/seller/goods_list_ajax.php
/trunk/shop/templates/default/seller/store_goods_add.step2.php
/trunk/shop/templates/default/seller/store_goods_sale.index.php
/trunk/shop/templates/default/seller/store_promotion_xianshi.goods.php
/trunk/shop/templates/default/seller/store_promotion_xianshi.manage.php
/trunk/shop/templates/default/store/goods.php
/trunk/shop/templates/default/buy/buy_step2.php
/trunk/shop/templates/default/member/member_order.index.php
/trunk/shop/templates/default/store/goods.php
/trunk/mobile/control/member_payment.php

======================================= V.1246

/trunk/admin/control/goods_lable.php
/trunk/admin/control/member.php
/trunk/admin/control/refund.php
/trunk/admin/templates/default/member.edit.php
/trunk/mobile/control/login.php
/trunk/data/model/member.model.php
/trunk/data/model/order.model.php
/trunk/data/model/points.model.php
/trunk/data/model/buy.model.php
/trunk/data/model/refund_return.model.php
/trunk/data/resource/js/area_array.js
/trunk/shop/control/goods.php
/trunk/shop/control/store_goods_offline.php
/trunk/shop/control/store_goods_sale.php
/trunk/shop/control/store_package_add.php
/trunk/shop/control/store_goods_add.php
/trunk/shop/control/login.php
/trunk/shop/language/zh_cn/home_login_index.php
/trunk/shop/templates/default/member/member_order.index.php
/trunk/shop/templates/default/member/member_order.show.php
/trunk/shop/templates/default/seller/goods_list_ajax.php
/trunk/shop/templates/default/seller/store_goods_sale.add.php
/trunk/shop/templates/default/seller/store_liveinfo.php
/trunk/shop/templates/default/seller/store_order.show.php
/trunk/shop/templates/default/seller/store_goods_add.step2.php
/trunk/shop/templates/default/seller/store_promotion_xianshi.goods.php
/trunk/shop/templates/default/seller/store_promotion_xianshi.manage.php
/trunk/shop/templates/default/store/goods.php
/trunk/shop/templates/default/home/goods.squares.php
/trunk/shop/templates/default/css/home_goods.css

======================V.1255


/trunk/admin/control/goods_lable.php
/trunk/admin/control/pointorder.php
/trunk/admin/templates/default/goods_lable.list.php
/trunk/admin/templates/default/goods_lable.xianshi_list.php
/trunk/admin/templates/default/pointorder.list.php
/trunk/shop/control/store_account_group.php
/trunk/shop/control/store_goods_add.php
/trunk/shop/control/store_package_add.php
/trunk/shop/control/store_promotion_xianshi.php
/trunk/shop/control/store_goods_online.php
/trunk/shop/control/store_order.php
/trunk/shop/templates/default/seller/store_promotion_xianshi.goods.php
/trunk/shop/templates/default/seller/store_promotion_xianshi.manage.php
/trunk/shop/templates/default/seller/store_goods_sale.index.php
/trunk/shop/templates/default/seller/store_order.show.php
/trunk/shop/templates/default/member/member_order.show.php
/trunk/shop/templates/default/css/home_goods.css

===================================V.1279


/trunk/admin/include/menu.php
/trunk/data/resource/js/area_array.js
/trunk/shop/control/store_goods_online.php
/trunk/shop/control/store_goods_sale.php
/trunk/shop/control/store_promotion_xianshi.php
/trunk/shop/templates/default/css/seller_center.css
/trunk/shop/templates/default/seller/store_goods_add.step2.php
/trunk/shop/templates/default/seller/store_goods_list_search.php
/trunk/shop/templates/default/seller/store_goods_sale.add.php
/trunk/shop/templates/default/seller/store_goods_sale.index.php
/trunk/shop/templates/default/store/goods.contrast.php

=============================V.1293


/trunk/admin/control/pointorder.php
/trunk/admin/control/pointprod.php
/trunk/admin/templates/default/pointorder.list.php
/trunk/admin/templates/default/pointprod.add.php
/trunk/admin/templates/default/pointprod.edit.php
/trunk/admin/templates/default/pointprod.list.php
/trunk/data/resource/js/common.js
/trunk/data/model/member.model.php
/trunk/shop/control/store_promotion_xianshi.php
/trunk/shop/control/store_goods_sale.php
/trunk/shop/control/member_pointorder.php
/trunk/shop/control/member_order.php
/trunk/shop/control/pointcart.php
/trunk/shop/control/pointprod.php
/trunk/shop/control/payment.php
/trunk/shop/control/store_account.php
/trunk/shop/templates/default/seller/goods_list_ajax.php
/trunk/shop/templates/default/seller/store_goods_sale.add.php
/trunk/shop/templates/default/seller/store_order_final.php
/trunk/shop/templates/default/seller/store_goods_add.step2.php
/trunk/shop/templates/default/seller/store_goods_sale.index.php
/trunk/shop/templates/default/seller/store_order.index.php
/trunk/shop/templates/default/home/pointcart_step1.php
/trunk/shop/templates/default/home/pointprod.php
/trunk/shop/templates/default/home/pointprod_info.php
/trunk/shop/templates/default/home/pointprod_list.php
/trunk/shop/templates/default/member/member_pointorder.php
/trunk/shop/templates/default/member/member_points.php
/trunk/shop/templates/default/member/member_order.index.php

===========================V.1323


/trunk/admin/control/pointorder.php
/trunk/admin/templates/default/pointorder.list.php
/trunk/core/framework/function/goods.php
/trunk/shop/control/control.php
/trunk/shop/control/store_brand.php
/trunk/shop/control/store_goods_offline.php
/trunk/shop/control/store_goods_online.php
/trunk/shop/language/zh_cn/member_layout.php
/trunk/shop/templates/default/seller/store_brand.list.php
/trunk/shop/templates/default/seller/store_goods_add.step2.php
/trunk/shop/templates/default/seller/store_goods_list.offline.php
/trunk/shop/templates/default/seller/store_goods_list.offline_lockup.php
/trunk/shop/templates/default/seller/store_goods_list.offline_waitverify.php
/trunk/shop/templates/default/seller/store_goods_list.online.php

==========================================V.1340

/trunk/shop/control/goods.php
/trunk/shop/templates/default/member/member_order.index.php
/trunk/shop/templates/default/member/member_order.show.php
/trunk/shop/templates/default/seller/store_order.show.php

===========================================V.1341


/trunk/admin/language/zh_cn/web_config.php
/trunk/admin/templates/default/css/skin_0.css
/trunk/admin/templates/default/web_code.edit.php
/trunk/admin/templates/default/web_focus.edit.php
/trunk/admin/templates/default/web_sale.edit.php
/trunk/data/resource/js/common.js
/trunk/data/resource/web_config/default.php
/trunk/data/resource/web_config/focus.php
/trunk/data/resource/web_config/web_index.js
/trunk/shop/control/store_goods_add.php
/trunk/shop/control/store_goods_online.php
/trunk/shop/control/store_package_add.php
/trunk/shop/control/member_refund.php
/trunk/shop/control/index.php
/trunk/shop/language/zh_cn/member_layout.php
/trunk/inspect/language/zh_cn/user_layout.php
/trunk/shop/templates/default/member/member_order.index.php
/trunk/shop/templates/default/member/member_refund_all.php
/trunk/shop/templates/default/member/member_refund_dep.php
/trunk/shop/templates/default/member/member_refund_view.php
/trunk/shop/templates/default/member/member_order.index.php
/trunk/shop/templates/default/member/member_order.show.php
/trunk/shop/templates/default/seller/store_goods_add.step2.php
/trunk/shop/templates/default/seller/store_order.show.php
/trunk/shop/templates/default/seller/store_goods_list.offline.php
/trunk/shop/templates/default/seller/store_goods_list.offline_lockup.php
/trunk/shop/templates/default/seller/store_goods_list.offline_waitverify.php
/trunk/shop/templates/default/seller/store_goods_list.online.php
/trunk/shop/templates/default/css/index.css
/trunk/shop/templates/default/footer.php
/trunk/shop/templates/default/home/index.php
/trunk/shop/templates/default/layout/common_layout.php

============================================V.1377


/trunk/admin/templates/default/web_goods_order.php
/trunk/admin/templates/default/web_sale.edit.php
/trunk/admin/control/goods.php
/trunk/admin/control/circle_class.php
/trunk/data/resource/js/common.js
/trunk/data/model/web_config.model.php
/trunk/data/model/goods.model.php
/trunk/data/model/refund_return.model.php
/trunk/data/resource/web_config/sale_goods.php
/trunk/data/resource/web_config/web_index.js
/trunk/inspect/language/zh_cn/user_layout.php
/trunk/shop/control/seller_center.php
/trunk/shop/control/store_goods_offline.php
/trunk/shop/control/store_goods_online.php
/trunk/shop/control/store_goods_sale.php
/trunk/shop/control/goods.php
/trunk/shop/language/zh_cn/member_home_index.php
/trunk/shop/language/zh_cn/member_layout.php
/trunk/shop/language/zh_cn/member_store_goods_index.php
/trunk/shop/templates/default/member/member_order.show.php
/trunk/shop/templates/default/member/member_home.php
/trunk/shop/templates/default/seller/index.php
/trunk/shop/templates/default/seller/store_goods_list.offline.php
/trunk/shop/templates/default/seller/store_goods_list.offline_lockup.php
/trunk/shop/templates/default/seller/store_goods_list.offline_waitverify.php
/trunk/shop/templates/default/seller/store_goods_add.step2.php
/trunk/shop/templates/default/seller/store_goods_add.step3.php
/trunk/shop/templates/default/store/goods.php
/trunk/shop/templates/default/layout/common_layout.php

==================================================V.1412


/trunk/data/model/order.model.php
/trunk/data/model/payment.model.php
/trunk/shop/api/payment/unionpay
/trunk/shop/api/payment/unionpay/cer
/trunk/shop/api/payment/unionpay/cer/GNETEWEB-TEST.cer
/trunk/shop/api/payment/unionpay/cer/MERCHANT.pem
/trunk/shop/api/payment/unionpay/cer/MERCHANT.pfx
/trunk/shop/api/payment/unionpay/conf
/trunk/shop/api/payment/unionpay/conf/NetTran.obj
/trunk/shop/api/payment/unionpay/conf/OpenVendor.ini
/trunk/shop/api/payment/unionpay/conf/openssl.cnf
/trunk/shop/api/payment/unionpay/return_url.php
/trunk/shop/api/payment/unionpay/unionpay.php
/trunk/shop/control/payment.php

==================================V.1420--------53





