$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    //  console.log(options.url)
    options.complete = function (res) {
        console.log(res)
        if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
            localStorage.removeItem('token')
            location.href = "/login.html"
        }
    }
    // 统一为有权限 接口设置header请求
    if (options.url.indexOf('/my') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
})