// 点击 去注册 链接
$('#link_reg').click(function() {
    $('.login_box').hide()
    $('.register_box').show()
})
// 点击 去登录 链接
$('#link_login').click(function() {
    $('.register_box').hide()
    $('.login_box').show()
})
// 从layui中获取form，layer对象
let form = layui.form
let layer = layui.layer
// 自定义表单验证规则
form.verify({
    // 自定义了叫pwd的验证规则
    pwd:[
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ],
    // 自定义 再次确认密码 的验证规则
    repwd: function(value) {
        let pwdValue = $('.register_box [name="password"]').val()
        if(pwdValue !== value) {
            return '两次密码不一致'
        }
    } 
})
// 监听注册表单的 提交 事件
$('.register_box').on('submit', function(e) {
    // 阻止表单默认提交行为
    e.preventDefault()
    // ajax发起post请求
    let data = {username:$('.register_box [name="username"]').val(),password:$('.register_box [name="password"]').val()}
    $.post('/api/reguser',data ,function(res) {
        if(res.status !== 0) {
            layer.msg(res.message)
        }
        layer.msg('注册成功')
        // 模拟人的点击行为 跳转到登录页面并自动把账号输进去
        $('#link_login').click()
        $('.login_box [name="username"]').val($('.register_box [name="username"]').val())
    })
})
// 监听登录表单的 提交 事件
$('.login_box').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
        type:'POST',
        url:'/api/login',
        data:$(this).serialize(),
        success:function(res) {
            if(res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('登录成功')
            // 把登录成功返回的token存到本地存储中
            localStorage.setItem('token', res.token)
            location.href = '/index.html'
        }
    })
})

