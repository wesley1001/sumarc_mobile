//  key 排序方式 1-销量 2-浏览量 3-价格 空-按最新发布排序
//  order 排序方式 1-升序 2-降序
//  page 每页数量
//  curpage 当前页码
//  gc_id 分类编号
//  keyword 搜索关键字
//  gc_id和keyword二选一不能同时出现
//  index.php?act=goods&op=goods_list

(function ($) {
//    var classify = getUrlParam('gc_id');
//    var key_word = getUrlParam('keyword')
//    var params = {
//      gc_id:classify,
//    }
    var EventsList = function (element, options) {
        var $main = $('#wrapper');
        var $list = $main.find('#events_list');
        var $pullDown = $main.find('#pull-down');
        var $pullDownLabel = $main.find('#pull-down-label');
        var $pullUp = $main.find('#pull-up');
        var topOffset = -$pullDown.outerHeight();
        this.compiler = Handlebars.compile($('#tpi-list-item').html());
        this.next = this.prev = this.curpage = Number(options.params.curpage);
        this.start = options.params.page;
        this.total = null;
        this.getURL = function (params) {
            var queries = [];
            for (var key in  params) {
                if (key !== 'curpage') {
                    queries.push(key + '=' + params[key]);
                }
            }
            queries.push('curpage=');
            return options.api + '&' + queries.join('&');
        };
        this.renderList = function (pagination, type) {
            var _this = this;
            var $el = $pullDown;
            console.log(type);
            if (type === 'load') {
                $el = $pullUp;
            }
            $.getJSON(this.URL + pagination).then(function (data) {
                console.log(data);
                _this.total = parseFloat(data.page_total);
                var html = _this.compiler(data.datas.goods_list);
                if (type === 'refresh') {
                    $list.children('li').first().before(html);
                } else if (type === 'load') {
                    $list.append(html);
                } else {
                    $list.html(html);
                }
                // refresh iScroll
                setTimeout(function () {
                    _this.iScroll.refresh();
                }, 100);
            }, function () {
                console.log('Error...')
            }).always(function () {
                _this.resetLoading($el);
                if (type !== 'load') {
                    _this.iScroll.scrollTo(0, topOffset, 800, $.AMUI.iScroll.utils.circular);
                }
            });
        };
        this.setLoading = function ($el) {
            $el.addClass('loading');
        };
        this.resetLoading = function ($el) {
            $el.removeClass('loading');
        };
        this.init = function () {
            var myScroll = this.iScroll = new $.AMUI.iScroll('#wrapper', {});
            // myScroll.scrollTo(0, topOffset);
            var _this = this;
            var pullFormTop = false;
            var pullStart;
            this.URL = this.getURL(options.params);
            this.renderList(options.params.curpage);
//        this.renderList(options.params.start);
            myScroll.on('scrollStart', function () {
                if (this.y >= topOffset) {
                    pullFormTop = true;
                }
                pullStart = this.y;
                // console.log(this);
            });
            myScroll.on('scrollEnd', function () {
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
        this.handlePullDown = function () {
            console.log('handle pull down');
            if (this.prev > 2) {
                this.setLoading($pullDown);
                this.prev--;
                this.renderList(this.prev, 'refresh');
            } else {
                console.log('别刷了，没有了');
            }
        };
        this.handlePullUp = function () {
            console.log('handle pull up');
            if (this.curpage < this.total) {
                this.setLoading($pullUp);
                this.next += 1;
                this.curpage++;
                this.renderList(this.next, 'load');
            } else {
                console.log(this.next);
                // this.iScroll.scrollTo(0, topOffset);
            }
        }
    };
    $(function () {
        var appNews = new EventsList(null, {
            api: ApiUrl + '/index.php?act=goods&op=goods_list',
            params: {
                page: 12,
                curpage: '1'
            }
        });

        appNews.init();


        var nav = document.getElementsByClassName('winnow-tab')[0];
        var item = nav.children;
        for (var i = 0; i < item.length; i++) {
            item[i].onclick = function (e) {                                          //将点击事件绑定到item元素
                var e = e || window.event;
                var el = e.target || e.srcElement;                                  //通过事件对象的target属性获取触发元素
                var cls = el.className;                                             //触发元素的class
                //el.style.color = '#ff9500';
                var commodity_list = document.getElementById('events_list').children;
                //通过判断触发元素的class确定用户点击了哪个元素
                switch (cls) {
                    case 'price':           //价格
                        for(var c=0; c<commodity_list.length;){
                            commodity_list[c].remove();
                        }
                        var appPrice = new EventsList(null, {
                            api: ApiUrl + '/index.php?act=goods&op=goods_list',
                            params: {
                                key: 3,
                                page: 12,
                                curpage: '1'
                            }
                        });
                        appPrice.init();
                        break;
                    case 'sales-volume':    //销量
                        for(var s=0; s<commodity_list.length;){
                            commodity_list[s].remove();
                        }
                        var appVolume = new EventsList(null, {
                            api: ApiUrl + '/index.php?act=goods&op=goods_list',
                            params: {
                                key: 2,
                                page: 12,
                                curpage: '1'
                            }
                        });
                        appVolume.init();
                        break;
                    case 'popularity':      //人气
                        for(var p=0; p<commodity_list.length;){
                            commodity_list[p].remove();
                        }
                        var appPopu = new EventsList(null, {
                            api: ApiUrl + '/index.php?act=goods&op=goods_list',
                            params: {
                                key: 1,
                                page: 12,
                                curpage: '1'
                            }
                        });
                        appPopu.init();
                        break;
                    case 'news':            //新品
                        for(var n=0; n<commodity_list.length;){
                            commodity_list[n].remove();
                        }
                        appNews.init();
                        break;
                }
            }
        }
    });

    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);
})(window.jQuery);