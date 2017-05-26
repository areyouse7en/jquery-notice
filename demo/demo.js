// 数据
var noticeData = {
    title: '开会啦',
    desc: '去会议室开会啦'
}

// 回调
var cbSingle = {
    read: function(data) {
        alert('已读了：' + data.title)
        $.notice.close()
    }
}

// 数据
var noticeList = [{
    title: '开会啦',
    desc: '去会议室开会啦'
}, {
    title: '突发新闻',
    desc: '江南皮革厂倒闭啦！<a href="#">查看详情</a>'
}, {
    title: '下班啦',
    desc: '<p>赶紧回家买菜去啦</p><ul><li>买鱼</li><li>买肉</li><li>买西瓜</li></ul>'
}]

// 回调
var cbMultiple = {
    read: function(data, dataList, index) {
        alert('已读了：' + data.title)
        noticeList.splice(index, 1)
        $.notice.refresh(noticeList)
    },
    later: function(data, dataList, index) {
        alert('稍后处理：' + data.title)
    },
    readAll: function(data, dataList, index) {
        alert('全部已读，共' + dataList.length + '条')
        $.notice.close()
    }
}

// 单条
$('#btn-single').click(function(e) {
    $.notice(noticeData, cbSingle)
})

// 多条
$('#btn-multiple').click(function(e) {
    $.notice(noticeList, cbMultiple)
})

// 添加
$('#btn-add').click(function(e) {
    var newNotice = {
        title: '加班啦',
        desc: '今天要加班啦'
    }
    $.notice.add(newNotice)
})

// 主题
$('#btn-info').click(function(e) {
    $.notice.info(noticeList, cbMultiple)
})
$('#btn-success').click(function(e) {
    $.notice.success(noticeList, cbMultiple)
})
$('#btn-warning').click(function(e) {
    $.notice.warning(noticeList, cbMultiple)
})
$('#btn-error').click(function(e) {
    $.notice.error(noticeList, cbMultiple)
})

// 代码高亮工，与本插件无关
hljs.initHighlightingOnLoad();
