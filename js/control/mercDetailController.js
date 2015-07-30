/**
 * Created by prince on 2015/1/29.
 */


(function($) {

    var goods_id = getUrlParam("goods_id");

    GetData();

    function GetData(){
        $.ajax({
            url:ApiUrl+"/index.php?act=goods&op=goods_detail",
            type:"GET",
            data:{goods_id:goods_id},
            dataType:"json",
            success:function(data){
                //console.log(data);
                var c_intro = {};
                var c_url_img =[];
                var c_info = data.datas.goods_info;
                var banner_img = data.datas.goods_image.split(',');
                for(var i=0; i < banner_img.length; ++i){
                    c_url_img.push({'item':banner_img[i]})
                }

                c_intro = {
                    c_name:c_info.goods_name,
                    c_price:c_info.goods_price,
                    c_price_market:c_info.goods_marketprice,
                    c_storage:c_info.goods_storage,
                    c_sale_num:c_info.goods_salenum,
                    c_unit:c_info.goods_unit,
                    c_origin:c_info.goods_origin

                };

                var c_detail = {c_url_img: c_url_img, c_intro: c_intro};
                var template = $('#detailTemplate').html();
                var compiledTemplate = Handlebars.compile(template);
                var renderTemplate = compiledTemplate(c_detail);

                $('#c_detail_cont').append(renderTemplate);

                $('.am-slider').flexslider({
                    touch: true,
                    easing: "swing",
                    keyboard: true,
                    directionNav: false,
                    multiplekeyboard: true,
                    direction: "horizontal"
                });



                var EventsList = function(element, options) {

                    var $main = $('#wrapper');
                    var $list = $main.find('#events-list');
                    var $pullDown = $main.find('#pull-down');
                    var $pullDownLabel = $main.find('#pull-down-label');
                    var $pullUp = $main.find('#pull-up');
                    var topOffset = -$pullDown.outerHeight();

                    this.compiler = Handlebars.compile($('#articleTemplate').html());
                    this.prev = this.next = this.start = options.params.start;
                    this.total = null;

                    this.getURL = function(params) {
                        var queries = ['callback=?'];
                        for (var key in  params) {
                            if (key !== 'start') {
                                queries.push(key + '=' + params[key]);
                            }
                        }
                        queries.push('start=');
                        return options.api + '?' + queries.join('&');
                    };

                    this.renderList = function(start, type) {
                        var _this = this;
                        var $el = $pullDown;

                        if (type === 'load') {
                            $el = $pullUp;
                        }

                        $.getJSON(this.URL + start).then(function(data) {
                            console.log(data);
                            _this.total = data.total;
                            var html = _this.compiler(data.events);
                            if (type === 'refresh') {
                                $list.children('li').first().before(html);
                            } else if (type === 'load') {
                                $list.append(html);
                            } else {
                                $list.html(html);
                            }

                            // refresh iScroll
                            setTimeout(function() {
                                _this.iScroll.refresh();
                            }, 100);
                        }, function() {
                            console.log('Error...')
                        }).always(function() {
                            _this.resetLoading($el);
                            if (type !== 'load') {
                                _this.iScroll.scrollTo(0, topOffset, 800, $.AMUI.iScroll.utils.circular);
                            }
                        });
                    };

                    this.setLoading = function($el) {
                        $el.addClass('loading');
                    };

                    this.resetLoading = function($el) {
                        $el.removeClass('loading');
                    };

                    this.init = function() {
                        var myScroll = this.iScroll = new $.AMUI.iScroll('#wrapper', {});
                        // myScroll.scrollTo(0, topOffset);
                        var _this = this;
                        var pullFormTop = false;
                        var pullStart;

                        this.URL = this.getURL(options.params);
                        this.renderList(options.params.start);

                        myScroll.on('scrollStart', function() {
                            if (this.y >= topOffset) {
                                pullFormTop = true;
                            }

                            pullStart = this.y;
                            // console.log(this);
                        });

                        myScroll.on('scrollEnd', function() {
                            if (pullFormTop && this.directionY === -1) {
                                _this.handlePullDown();
                            }
                            pullFormTop = false;

                            // pull up to load more
                            if (pullStart === this.y && (this.directionY === 1)) {
                                _this.handlePullUp();
                            }
                        });
                    };

                    this.handlePullDown = function() {
                        console.log('handle pull down');
                        if (this.prev > 0) {
                            this.setLoading($pullDown);
                            this.prev -= options.params.count;
                            this.renderList(this.prev, 'refresh');
                        } else {
                            console.log('别刷了，没有了');
                        }
                    };

                    this.handlePullUp = function() {
                        console.log('handle pull up');
                        if (this.next < this.total) {
                            this.setLoading($pullUp);
                            this.next += options.params.count;
                            this.renderList(this.next, 'load');
                        } else {
                            console.log(this.next);
                            // this.iScroll.scrollTo(0, topOffset);
                        }
                    }
                };

                $(function() {
                    var app = new EventsList(null, {
                        api: 'https://api.douban.com/v2/event/list',
                        params: {
                            start: 100,
                            type: 'music',
                            count: 10,
                            loc: 'beijing'
                        }
                    });
                    app.init();
                });

                document.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                }, false);

            }
        });

        $.ajax({
            url:ApiUrl+"/index.php?act=goods&op=goods_body",
            type:"GET",
            data:{goods_id:goods_id},
            dataType:"json",
            success:function(data){
                console.log(data);
            }});
    }


})(window.jQuery);