$(function () {
    //去注册按钮
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //去登录
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //layui自动注入的对象
    var form = layui.form;

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须为6-12位，且不能有空格'],
        //校验俩次密码是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name="password"]').val()
            if (pwd != value) {
                return "俩次密码不一致"
            }
        }
    });
    //注册接口
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        /*  $.ajax({
             url: 'http://ajax.frontend.itheima.net/api/reguser',
             data: data,
             type: 'post',
             success: function (res) {
                 console.log(res)
                 if (res.status != 0) {
                     return layer.msg(res.message)
                 }
                 layer.msg('注册成功')
                 $('#link_login').click()
             }
         }) */
        $.post('/api/reguser', data, function (res) {
            console.log(res)
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
            $('#link_login').click()

        })



    })
    //登录接口，发送请求，
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                if (res.status != 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }

        })
    })
})