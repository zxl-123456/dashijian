
    getUserInfo();
    function getUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'get',
            /*  headers: {
                 Authorization: localStorage.getItem('token') || ''
             }, */
            success: function (res) {
                // console.log(res.data)
                if (res.status != 0) {
                    return "获取信息失败";
                }
                setAvatar(res.data)
            }
           
        })
    }
    //渲染头像
    function setAvatar(user) {
        var name = user.nickname || user.username
        $('#welcome').html('欢迎  ' + name);
        //头像
        if (user.user_pic != null) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            var first = user.username[0].toUpperCase()
            $('.layui-nav-img').hide()
            $('.text-avatar').html(first)
        }
    }
    //退出功能
    $('.tuichu').on('click', function () {
        var layer = layui.layer
        layer.confirm('确定退出？', { icon: 3, title: '提示' }, function (index) {
          //  console.log(index)
            localStorage.removeItem('token')
            location.href = "/login.html"
            layer.close(index)
        })
    })

