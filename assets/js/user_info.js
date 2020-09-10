var form = layui.form
var layer=layui.layer
form.verify({
    nickname: function (value) {
        if (value.length > 6) {
            return "昵称长度必须在1-6个字符之间"
        }
    }
})
initUserInfo() 
//初始化
function initUserInfo() {
    $.ajax({
        method: 'get',
        url:'/my/userinfo',
        success: function (res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
           // layer.msg(res.message)
            form.val('form-user',res.data)
        }
    })
}
//重置
$('.layui-btn-primary').on('click', function (e) {
    e.preventDefault()
    initUserInfo() 
})
//修改
$('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        method: 'post',
        url: '/my/userinfo',
        data:$(this).serialize(),
        success: function (res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            layer.msg('更新成功')
          window.parent.getUserInfo();
        }
    })
})