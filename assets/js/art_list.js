var q = {
    pagenum: '1', // 页码值，默认请求第一页的数据
    pagesize: '2', // 每页显示几条数据，默认每页显示2条
    cate_id: '',// 文章分类的 Id
    state: ''// 文章的发布状态
}
initTable()
//获取文章列表
function initTable() {
    $.ajax({
        type: 'get',
        url: '/my/article/list',
        data: q,
        success: function (res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            //   console.log(res)
            var tplHtml = template('tpl', res)
            $('tbody').html(tplHtml)
            renderPage(res.total)

        }
    })
}
//过滤器
template.defaults.imports.filter = function (data) {
    var date = new Date(data)
    var y = date.getFullYear()
    var m = zero(date.getMonth() + 1)
    var d = zero(date.getDate())
    var h = zero(date.getHours())
    var f = zero(date.getMinutes())
    var s = zero(date.getSeconds())
    return y + "-" + m + "-" + d + " " + h + ":" + f + ":" + s
}
//过滤器补0操作
function zero(time) {
    return time >= 10 ? time : '0' + time
}

initCate()
//初始化文章列表分类
var form = layui.form
function initCate() {
    $.ajax({
        url: '/my/article/cates/',
        type: 'get',
        success: function (res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
             console.log(res)
            var tplcate = template('tpl_cate', res)
            $('[name=cate_id]').html(tplcate)
            form.render()
        }
    })
}
//筛选功能
$('#form-search').on('submit', function (e) {
    e.preventDefault()
    q.cate_id = $('[name=cate_id]').val()
    q.state = $('[name=state]').val()
    initTable()
})

//分页
//接收总数量
function renderPage(total) {
    var laypage = layui.laypage;

    //执行一个laypage实例
    laypage.render({
        curr: q.pagenum,//默认选中第几页
        limit: q.pagesize,//每页显示几条数据
        limits: [1, 2, 3, 5, 7, 10],
        elem: 'page' //注意，这里的 test1 是 ID，不用加 # 号
        , count: total,//数据总数，从服务端得到
        layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
        jump: function (obj,first) {
            console.log(obj)
            q.pagenum = obj.curr
            q.pagesize=obj.limit
            if (!first) { //首次不执行
                initTable()
            }
        }
    });
}
//删除
$('tbody').on('click', '.btn-delete',function () {
    var id = $(this).attr('data-id')
    var len=$('.btn-delete').length
    layer.confirm('确认删除', { icon: 3, title: '提示' }, function (index) {
        $.ajax({
            method: 'get',
            url: '/my/article/delete/'+id,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                
                layer.msg(res.message)
                if (len == 1) {
                    q.pagenum=q.pagenum==1?1:q.pagenum-1
                }
                initTable()
            }
        })
        layer.close(index)
    })
})
