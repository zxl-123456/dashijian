var form = layui.form
var layer = layui.layer

form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须是6-12位"],
    samePwd: function (value) {
        if (value == $("[name=oldPwd]").val()) {
            return "新密码不能与旧密码相同"
        }
        
    },
    rePwd: function (value) {
        if (value != $('[name=newPwd]').val()) {
            return '俩次密码不一致'
        }
    }
})

$('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        url: '/my/updatepwd',
        method: 'post',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            layer.msg('修改成功')
            $('.layui-form')[0].reset()
        }
    })
})