// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

// 上传 按钮事件绑定
$('#btn-chooseImg').click(function() {
    $('#btn-file').click()
})
// 为文件选择框 绑定change事件
$('#btn-file').on('change', function(e) {
    // 拿到用户选择的文件
    let file = e.target.files[0]
    // 根据选择的文件，创建一个对应的 URL 地址：
    let newImgURL = URL.createObjectURL(file)
    // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
    $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
})

// 为 确定按钮 绑定click事件
$('#btn-confirm').click(function() {
    // 将裁剪后的图片，输出为 base64 格式的字符串
    let dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.ajax({
        type: 'post',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function(res) {
            if(res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            // 调用父页面的 getUserInfo 方法
            window.parent.getUserInfo() 
        }
    })
})