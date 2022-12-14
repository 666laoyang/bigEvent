let form = layui.form
let layer = layui.layer
form.verify({
    pwd:[
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
    ],
    samePwd: function(value) {
        if(value === $('[name="oldPwd"]').val()) {
            return '新密码不能和原密码一致'
        }
    },
    rePwd: function(value) {
        if(value !== $('[name="newPwd"]').val()) {
            return '两次密码不一致'
        }
    } 
})
$('.layui-form').submit(function(e) {
    e.preventDefault()
    $.ajax({
        type: 'post',
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: function(res) {
            if(res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            // 重置表单
            // 法一：$('.layui-form')[0].reset()
            //法二：
            $('#btn-reset').click()

        }
    })
})