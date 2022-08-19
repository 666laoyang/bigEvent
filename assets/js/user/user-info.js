let form = layui.form
let layer = layui.layer
$(function() {
    form.verify({
        nickname:[
            /^[\S]{1,12}$/
            ,'昵称必须1到12位，且不能出现空格'
        ] 
    })
    initUserInfo()
    // 重置表单数据
    $('#btn-reset').click(function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        initUserInfo()
    }) 
    // 监听表单的 提交 事件
    $('.layui-form').submit(function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.mag(res.message)
                }
                layer.msg('更新用户信息成功')
                // 调用父页面中的方法，重新渲染用户头像和名字
                window.parent.getUserInfo()

            }
        })
    })
})
// 函数：初始化用户的基本信息
function initUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if(res.status !== 0) {
                return layer.msg(res.message)
            }
            // 调用 form.val()快速为表单赋值
            form.val('formUserInfo', res.data) 
        }
    })
}