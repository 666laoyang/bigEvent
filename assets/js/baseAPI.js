// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，会先调用ajaxPrefilter这个函数
// 在这个函数中，我们可拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // 统一为有权限的接口，设置 headers请求头
    if(options.url.indexOf('/my') !== -1){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function(res) {
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 清空本地存储的token
            localStorage.removeItem('token')
            // 强制退出到 登录页面
            location.href = '/login.html'
        }
    }
})