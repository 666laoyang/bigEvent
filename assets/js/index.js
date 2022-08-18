let layer = layui.layer
// 入口函数
$(function() {
    // 调用用户基本信息
    getUserInfo()
    // 退出 按钮绑定事件
    $('.btn-out').click(function() {
        // 弹出 退出 提示
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            // 清空本地存储的token
            localStorage.removeItem('token')
            // 退出到 登录页面
            location.href = '/login.html'
            // 关闭弹出层
            layer.close(index);
          });
    })
})
// 函数：获取用户基本信息
function getUserInfo () {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 配置 请求头
        /* headers: {
            Authorization: localStorage.getItem('token') || ''
        }, */
        success: function(res) {
            if(res.status !== 0) {
                return layer.msg(res.message)
            }
            // 调用 renderAvatar 渲染用户头像
            renderAvatar(res.data)
        },
        /* complete: function(res) {
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 清空本地存储的token
                localStorage.removeItem('token')
                // 强制退出到 登录页面
                location.href = '/login.html'
            }
        } */
    })
}
// 函数：渲染用户头像
function renderAvatar(user) {
    // 设置欢迎的文本
    let name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户头像
    if(user.user_pic) {
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    }else {
        let first = name[0].toUpperCase()
        $('.text-avatar')
            .text(first)
            .show()
        $('.layui-nav-img').hide()
    }
}
