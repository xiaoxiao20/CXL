$(() => {
    /* 001--检验手机号码 */
    $("#phoneID").blur(function () {
        let phoneVal = $.trim($(this).val());
        if (/^1[3-9]\d{9}$/.test(phoneVal)) {
            $(this).removeClass('form-error');
        } else {
            $(this).addClass('form-error');
        }
    });
    /* 002--输入密码 */
    $("#passwordID").blur(function () {
        let pwdAVal = $.trim($(this).val());
        if (/^[a-zA-Z0-9]{8,20}$/.test(pwdAVal)) {
            $(this).removeClass('form-error');
        } else {
            $(this).addClass('form-error');
        }
    });
    /* 003--确认密码 */
    $("#passwordB").blur(function () {
        let pwdBVal = $.trim($(this).val());
        if (pwdBVal == $("#passwordID").val()) {
            $(this).removeClass('form-error');
        } else {
            $(this).addClass('form-error');
        }
    });

    // 点击注册的时候检验
    $('.registerBtn').click(function () {
        // 检查用户信息填写是否正确,模仿失去焦点事件
        $("#passwordID,#passwordB,#phoneID").trigger('blur');
        if (!$('.form-error').length == 0) {
            return;
        }
        // 检查用户是否勾选了同意协议
        if (!$('#checkbox').is(':checked')) {
            alert('请阅读并同意协议内容');
            return;
        }
        if ($.trim($('.slid_txt').text()) == "验证通过") {
            console.log('++++')
        } else {
            console.log('----')
            alert('请进行验证！');
            return;
        }
        let data = {
            password: md5($.trim($("#passwordID").val())).substr(0, 10),//进行加密
            phone: $.trim($("#phoneID").val())
        };
        $.ajax({
            type: "get",
            url: "../../../server/01.register.php",
            data: data,
            dataType: "json",
            success: function (response) {
                console.log('11111111')
                console.log(response);
                if (response.status == 'success') {
                    alert(response.msg);
                    location.href = "https://www.vvic.com/gz";
                }
                else {
                    alert(response.msg);
                }
            }
        });
    });

})