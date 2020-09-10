// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

$('.upload').on('click', function () {
    $('#file').click()
})
//选图片
$('#file').on('change', function (e) {

    var filelist = e.target.files
   // console.log(filelist)
    if (filelist.length == 0) {
        return "请选择图片"
    }
    //实现基本裁剪
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)

    //拿到用户选择的文件
    var file = e.target.files[0]
    var newImgURL = URL.createObjectURL(file)
    $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域



    //确定按钮点击事件
    $('.sure').on('click', function () {

        //将裁剪后的图片，输出为 base64 格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')      

        $.ajax({
            url: '/my/update/avatar',
            type: 'post',
            data:{avatar: dataURL},
            success: function (res) {
              
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更换头像成功')
              
                window.parent.getUserInfo()
            }

        })
    })

})

