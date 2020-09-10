getArtlist()
var layer = layui.layer
var form = layui.form
//获取列表
function getArtlist() {
    $.ajax({
        url: '/my/article/cates',
        type: 'get',
        success: function (res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }

            //   console.log(res)
            var tplHtml = template('tpl', res)
            $('tbody').html(tplHtml)
        }
    })
}
var addindex = null
//添加类别
$('.addcate').on('click', function () {

    addindex = layer.open({
        btn: 0,
        area: ['500px', '300px'],
        title: '添加文章分类'
        , content: $('#cate-content').html()
    });

})

$('body').on('click', '.sureAdd', function () {

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/my/article/addcates',
            method: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }

                getArtlist()
                layer.close(addindex)

            }
        })
    })

})
//编辑操作
var editindex = null
$('body').on('click', '.btn-edit', function () {
    editindex = layer.open({
        btn: 0,
        area: ['500px', '300px'],
        title: '添加文章分类'
        , content: $('#cate-edit').html()
    });
    var id = $(this).attr('data-id')
   // console.log(id)
    $.ajax({
        type: 'get',
        url: '/my/article/cates/' + id,
        success: function (res) {

            if (res.status != 0) {
                return layer.msg(res.message)
            }

            form.val('edit-form', res.data)
        }

    })
})
//更新操作
$('body').on('submit', '.edit', function (e) {
    e.preventDefault()

    $.ajax({
        method: 'POST',
        url: '/my/article/updatecate',
        data: $(this).serialize(),
        success: function (res) {

            if (res.status !== 0) {
                return layer.msg('更新分类数据失败！')
            }

            layer.msg('更新分类数据成功！')
            layer.close(editindex)
            getArtlist()
        }
    })

})
//删除操作
$('body').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id')
    layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
        $.ajax({
            url: '/my/article/deletecate/' + id,
            type: 'get',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.close(index)
                getArtlist()
            }

        })
    })

})