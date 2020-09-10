$(function () {

    initCate()
    var layer = layui.layer
    var form = layui.form
    //获取文章类别信息
    function initCate() {
        $.ajax({

            url: '/my/article/cates',
            method: 'get',
            success: function (res) {

                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                var tpl = template('tpl-cate', res)
                $('[name=cate_id]').html(tpl)
                form.render()
            }
        })
    }
    //初始化文本编辑器
    initEditor()
    //裁剪
    // 1. 初始化图片裁剪器
    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })
    // 监听 coverFile 的 change 事件，获取用户选择的文件列表
    $('#coverFile').on('change', function (e) {
        // 获取到文件的列表数组
        var files = e.target.files
        // 判断用户是否选择了文件
        if (files.length === 0) {
            return
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0])
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    var art_state = "已发布"
    $('#btn_save2').on('click', function () {
        art_state = "草稿"

    })

    //提交表单
    $('#pub_form').on('submit', function (e) {
        e.preventDefault()
        //只接受原生对象
        var fd = new FormData($(this)[0])
        fd.append('state', art_state)
        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        }).toBlob(function (blob) {//转换为文件对象
            fd.append('cover_img', blob)
            publishArticle(fd)
        })

    });
    //发表
    function publishArticle(fd) {
        $.ajax({
            method: 'post',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status != 0) {
                   
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                console.log(res.message)
                location.href = "/artical/art_list.html"
            }

        })
    }

})