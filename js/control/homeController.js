
/** @namespace data.adv_list */
/** @namespace v.menu_url */
/** @namespace v.menu_img */
/** @namespace v.menu_title */
/** @namespace v.floor_url */
/** @namespace v.floor_img */
/** @namespace v.floor_title */

    mainPageInit();

    function mainPageInit() {
        $.ajax({
            url: ApiUrl + "/index.php?act=index",
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                console.log(result);
                var data = result.datas;
                var banner_list = data.adv_list.map(function (l) {
                    return {
                        'banner-img': l.image
                    }
                });
                var complainList = {banner: banner_list};
                var banner_tmp = Handlebars.compile($('#carousel_tmp').html());
                $('#banner_cur').append(banner_tmp(complainList));
                $('.am-slider').flexslider();
            }
        });

        $.ajax({
            url: ApiUrl + "/index.php?act=index&op=menu",
            type: 'POST',
            data: {menu_type: 1},
            dataType: 'json',
            success: function (result) {
                var data = result.datas;
                var site_list = data.list.map(function (v) {
                    return {
                        'site-url': v.menu_url,
                        'site-img': v.menu_img,
                        'site-title': v.menu_title
                    }
                });
                var complainList = {siteView: site_list};
                var webSite_tmp = Handlebars.compile($('#webSite_tmp').html());
                $('#site_view').append(webSite_tmp(complainList));
            }
        });

        $.ajax({
            url: ApiUrl + "/index.php?act=index&op=menu",
            type: 'POST',
            data: {menu_type: 2},
            dataType: 'json',
            success: function (result) {
                var data = result.datas.list;
                $('#home-title').append(data[0].menu_title);
                $('a#home-url').attr('href',data[0].menu_url);
                $('#build-title').append(data[1].menu_title);
                $('a#build-url').attr('href',data[1].menu_url);
                $('#fur-title').append(data[2].menu_title);
                $('a#fur-url').attr('href',data[2].menu_url);
            }
        });

        $.ajax({
            url: ApiUrl + "/index.php?act=index&op=floor",
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                console.log(result);
                var data = result.datas.list;
                var activity = data[1].map(function (v) {
                    return {
                        'floor-url': v.floor_url,
                        'floor-img': v.floor_img,
                        'floor-title': v.floor_title
                    }
                });
                var living_room = {
                    'floor-url': data[2][0].floor_url,
                    'floor-img': data[2][0].floor_img,
                    'floor-title': data[2][0].floor_title
                };
                var study_room = {
                    'floor-url': data[2][1].floor_url,
                    'floor-img': data[2][1].floor_img,
                    'floor-title': data[2][1].floor_title
                };
                var dining_room = {
                    'floor-url': data[2][2].floor_url,
                    'floor-img': data[2][2].floor_img,
                    'floor-title': data[2][2].floor_title
                };
                var children_room = {
                    'floor-url': data[2][3].floor_url,
                    'floor-img': data[2][3].floor_img,
                    'floor-title': data[2][3].floor_title
                };
                var bedroom = {
                    'floor-url': data[2][4].floor_url,
                    'floor-img': data[2][4].floor_img,
                    'floor-title': data[2][4].floor_title
                };
                var one2 = {
                    'floor-url': data[2][5].floor_url,
                    'floor-img': data[2][5].floor_img,
                    'floor-title': data[2][5].floor_title
                };
                var two2 = {
                    'floor-url': data[2][6].floor_url,
                    'floor-img': data[2][6].floor_img,
                    'floor-title': data[2][6].floor_title
                };

                var one3 = {
                    'floor-url': data[3][0].floor_url,
                    'floor-img': data[3][0].floor_img,
                    'floor-title': data[3][0].floor_title
                };
                var two3 = {
                    'floor-url': data[3][1].floor_url,
                    'floor-img': data[3][1].floor_img,
                    'floor-title': data[3][1].floor_title
                };
                var three3 = {
                    'floor-url': data[3][2].floor_url,
                    'floor-img': data[3][2].floor_img,
                    'floor-title': data[3][2].floor_title
                };
                var four3 = {
                    'floor-url': data[3][3].floor_url,
                    'floor-img': data[3][3].floor_img,
                    'floor-title': data[3][3].floor_title
                };
                var five3 = {
                    'floor-url': data[3][4].floor_url,
                    'floor-img': data[3][4].floor_img,
                    'floor-title': data[3][4].floor_title
                };
                var six3 = {
                    'floor-url': data[3][5].floor_url,
                    'floor-img': data[3][5].floor_img,
                    'floor-title': data[3][5].floor_title
                };
                var one4 = {
                    'floor-url': data[4][0].floor_url,
                    'floor-img': data[4][0].floor_img,
                    'floor-title': data[4][0].floor_title
                };
                var two4 = {
                    'floor-url': data[4][1].floor_url,
                    'floor-img': data[4][1].floor_img,
                    'floor-title': data[4][1].floor_title
                };
                var three4 = {
                    'floor-url': data[4][2].floor_url,
                    'floor-img': data[4][2].floor_img,
                    'floor-title': data[4][2].floor_title
                };
                var four4 = {
                    'floor-url': data[4][3].floor_url,
                    'floor-img': data[4][3].floor_img,
                    'floor-title': data[4][3].floor_title
                };
                var five4 = {
                    'floor-url': data[4][4].floor_url,
                    'floor-img': data[4][4].floor_img,
                    'floor-title': data[4][4].floor_title
                };
                var six4 = {
                    'floor-url': data[4][5].floor_url,
                    'floor-img': data[4][5].floor_img,
                    'floor-title': data[4][5].floor_title
                };

                var complainAct = {activity_flow: activity};
                var activity_tmp = Handlebars.compile($('#activity_tmp').html());
                $('#activity_flow').append(activity_tmp(complainAct));

                var furniture_cont = {first: living_room, second: study_room, thirdly: dining_room, fourthly: children_room, fifth: bedroom};
                var furniture_tmp = Handlebars.compile($('#furniture_tmp').html());
                $('#furn_tmp').append(furniture_tmp(furniture_cont));

                var fur_foot = {first: one2, second: two2};
                var furFooter_tmp = Handlebars.compile($('#furFooter_tmp').html());
                $('#furFooter').append(furFooter_tmp(fur_foot));

                var builds = {first: one3, second: two3, thirdly: three3,fourthly: four3, fifth: five3, sixth: six3};
                var builds_tmp = Handlebars.compile($('#builds_tmp').html());
                $('#builds').append(builds_tmp(builds));

                var access = {first: one4, second: two4, thirdly: three4, fourthly: four4,fifth: five4, sixth: six4};
                var access_tmp = Handlebars.compile($('#access_tmp').html());
                $('#access').append(access_tmp(access));

                var accessFooter = {fifth: five4, sixth: six4};
                var accessFooter_tmp = Handlebars.compile($('#accessFooter_tmp').html());
                $('#accessFooter').append(accessFooter_tmp(accessFooter));
            }
        });
    }

