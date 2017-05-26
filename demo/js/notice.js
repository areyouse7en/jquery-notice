'use strict';

(function ($) {
    // 默认配置
    var opt = {
        id: '',
        // 弹窗样式
        type: 'default',
        data: '',
        dataList: [],
        // 回调函数，用户自定义
        callback: {
            read: function read() {},
            later: null,
            readAll: function readAll() {}
        },
        // 分页
        pager: {
            current: 1,
            total: 1
        },
        // 初始化数据
        initData: function initData(dl) {
            if ($.type(dl) == 'array') {
                // 如果传入的是数组，则进行分页
                this.dataList = dl;
            } else {
                this.dataList = [];
                this.dataList.push(dl);
            }
            this.pager.total = this.dataList.length;
            this.getData(1);
        },
        // 根据页码获取数据
        getData: function getData(index) {
            this.data = this.dataList[index - 1];
            this.pager.current = index;
        },
        // 上一页
        prev: function prev() {
            var index = this.pager.current;
            if (index > 1) {
                this.getData(index - 1);
                showNotice();
            }
        },
        // 下一页
        next: function next() {
            var index = this.pager.current;
            if (index < this.pager.total) {
                this.getData(index + 1);
                showNotice();
            }
        },
        // 关闭弹窗
        close: function close(cb) {
            instance.addClass('slideOutRight');
            setTimeout(function () {
                opt.remove();
                if (cb) cb();
            }, 500);
        },
        remove: function remove() {
            instance.remove();
            instance = null;
        }
    },
        B = $('body'),
        instance = null;

    // 显示弹窗
    function showNotice() {
        if (instance) {
            // 当前有弹窗的，先移除当前的再显示新的
            opt.remove();
            newInstance();
        } else {
            // 第一次进入，有入场动画
            newInstance();
            instance.addClass('slideInRight');
        }
    }

    // 实例方法
    function newInstance() {
        // 给唯一id
        opt.id = 'notice' + -new Date();

        // 添加到body中
        B.append(tpl(opt.data));

        // 获取实例
        instance = $('#' + opt.id);

        // 绑定回调
        $('[data-cb]', instance).each(function (index, el) {
            var that = $(el),
                cb = that.data('cb');
            that.on('click', function (event) {
                // 返回当前数据，总数组，当前索引
                event.preventDefault();
                var index = opt.pager.current - 1;
                opt.callback[cb](opt.data, opt.dataList, index);
            });
        });

        // 绑定事件
        $('[data-action]', instance).each(function (index, el) {
            var that = $(el),
                action = that.data('action');
            that.on('click', function (event) {
                event.preventDefault();
                opt[action]();
            });
        });
    }

    // 模板方法
    function tpl(data) {
        var footer = '';
        if (opt.pager.total > 1) {
            // 总数大于1时显示分页
            footer = '<div class="fs-notice-footer fs-cf">\n                        <div class="fs-fl">\n                            <i class="iconfont icon-check" data-cb="readAll">\u5168\u90E8\u6807\u8BB0\u4E3A\u5DF2\u8BFB</i>\n                        </div>\n                        <div class="fs-fr fs-noselect">\n                            <i class="iconfont icon-arrow-left" title="\u4E0A\u4E00\u6761" data-action="prev"></i>\n                            ' + opt.pager.current + '/' + opt.pager.total + '\n                            <i class="iconfont icon-arrow-right" title="\u4E0B\u4E00\u6761" data-action="next"></i>\n                        </div>\n                    </div>';
        }
        var laterIcon = '';
        if (opt.callback.later) {
            laterIcon = '<i class="iconfont icon-time" title="\u7A0D\u540E\u5904\u7406" data-cb="later"></i>';
        }
        return '<div class="fs-notice-wrapper fs-notice-' + opt.type + '" id="' + opt.id + '">\n                    <div class="fs-notice-header">\n                        <div class="fs-notice-title">\n                            <span data-cb="read">' + data.title + '</span>\n                        </div>\n                        <div class="fs-notice-actions">\n                            ' + laterIcon + '\n                            <i class="iconfont icon-close" title="\u5173\u95ED" data-action="close"></i>\n                        </div>\n                    </div>\n                    <div class="fs-notice-body">\n                        <div class="fs-notice-custom-body">' + data.desc + '</div>\n                    </div>\n                    ' + footer + '\n                </div>';
    }

    // 主方法
    $.notice = function (dataList, callback, type) {
        // 同时只能有一个弹窗实例
        if (instance) return;

        // 初始化数据
        opt.initData(dataList);

        //使用传入的回调方法
        for (var prop in callback) {
            opt.callback[prop] = callback[prop];
        }
        // 主题配色
        opt.type = type ? type : 'default';

        // 显示弹窗
        showNotice(type);
    };

    // 关闭方法
    $.notice.close = function () {
        if (!instance) return;
        opt.close();
    };

    // 不同颜色边边
    var types = ['info', 'success', 'warning', 'error'];
    types.forEach(function (type) {
        // 可以通过$.notice.info等调用
        $.notice[type] = function (dataList, callback) {
            return $.notice(dataList, callback, type);
        };
    });

    // 添加提醒数据
    $.notice.add = function (newNotice) {
        opt.dataList.unshift(newNotice);
        $.notice.refresh(opt.dataList);
    };

    // 刷新提醒数据
    $.notice.refresh = function (newDl) {
        if (newDl.length < 1 || !newDl) {
            $.notice.close();
        } else {
            opt.initData(newDl);
            showNotice();
        }
    };
})(jQuery);
//# sourceMappingURL=notice.js.map
