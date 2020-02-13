
$(() => {
    // 标题的切换
    $('.lgTitle').click(function () {
        $(this).addClass('current').siblings().removeClass('current');
        $('.login').eq($(this).index()).addClass('active').siblings().removeClass('active');
    });
    // 重复使用的代码进行封装
    function iDCheck(ele, str, reg) {
        let phoneVal = $.trim($(ele).val());
        console.log('this是：', ele);
        if (!reg.test(phoneVal)) {
            $('.errorMsg').css({
                'display': 'block',
            }).text(str);
        }
        else {
            $('.errorMsg').css({
                'display': 'none',
            });
            $(ele).parents('.p1').removeClass('formError');
        }
    };
    // 进行发送请求信息的封装
    function sendAjax(url, val, str) {
        $.ajax({
            type: "get",
            url,
            data: "phone=" + val,
            dataType: "json",
            success: function (response) {
                console.log(response);
                if (response.status == 'success') {
                    alert(response.msg)
                    Cookie.setItem('phone', $.trim($('#phoneID').val()));
                    Cookie.setItem("user_id", response.id);
                    location.href = '../html/01.index.html'
                    // 如果勾选了免登录复选框，进行cookie相关操作
                    if ($('#checkbox1').is(":checked")) {
                        console.log('666')
                        Cookie.setItem('phone', $.trim($('#phoneID').val()), 7);
                        Cookie.setItem("user_id", response.id, 7);
                    };
                }
                else {
                    alert(str);
                    return;
                }

            }
        });
    }

    //01----手机号码验证，进行登录
    $('#phoneID').blur(function () {
        let str1 = '手机号码格式不正确';
        let reg1 = /^1[3-9]\d{9}$/;
        return iDCheck(this, str1, reg1);
    }
    );
    $('.registerBtn').click(function () {
        if (!/^1[3-9]\d{9}$/.test($.trim($('#phoneID').val()))) {
            $('#phoneID').parents('.p1').addClass('formError');
            return;
        };
        if ($.trim($('.slid_txt').text()) == '验证通过') {
            $('.errorMsg').css({
                'display': 'none',
            });
            $('.slid_wrap').removeClass('formError');
        } else {
            console.log('++++');
            $('.errorMsg').css({
                'display': 'block',
            }).text('请进行验证');
            $('.slid_wrap').addClass('formError');
            return;
        };
        // 发送请求，进行验证该手机号码是否注册
        let [url1, val1, str1] = ["../../../server/02.login.php",
            $.trim($('#phoneID').val()),
            "该用户还没有注册，请前往注册"];
        sendAjax(url1, val1, str1);
        // 手机号码登录--13790949924
    });


    // 02----密码登录验证
    $('.phoneID').blur(function () {
        let str1 = '手机号码格式不正确';
        let reg1 = /^1[3-9]\d{9}$/;
        return iDCheck(this, str1, reg1);
    });
    $('#passwordID').blur(function () {
        let str1 = '密码格式不规范';
        let reg1 = /^[a-zA-Z0-9]{8,20}$/;
        return iDCheck(this, str1, reg1);
    })
    $('.registerBtn1').click(function () {
        if (!/^1[3-9]\d{9}$/.test($.trim($('.phoneID').val()))) {
            $('.phoneID').parents('.p1').addClass('formError');
            return;
        }
        if (!/^[a-zA-Z0-9]{8,20}$/.test($.trim($("#passwordID").val()))) {
            $('#passwordID').parents('.p1').addClass('formError');
            // console.log('++++')
            return;
        }
        // 发送请求，进行验证该手机号码是否注册,验证密码是否正确
        let data = {
            phoneNum: $.trim($('.phoneID').val()),
            password: md5($.trim($("#passwordID").val())).substr(0, 10),
        };
        // console.log(data.phoneNum, data.password)
        // let url1 = "../../../server/02.login2.php";
        // let val1 = $.trim($('#phoneID').val());
        // let str1 = "该用户还没有注册，请前往注册";
        // sendAjax(url1, val1, str1);
        $.ajax({
            type: "post",
            url: "../../../server/02.login2.php",
            data,
            dataType: "json",
            success: function (response) {
                console.log(response)
                if (response.status == 'success') {
                    alert(response.msg)
                    Cookie.setItem('phone', $.trim($('.phoneID').val()));
                    Cookie.setItem("user_id", response.id);
                    location.href = '../html/01.index.html'
                    console.log(response.id);
                    // 如果勾选了免登录复选框，进行cookie相关操作
                    if ($('#checkbox2').is(":checked")) {
                        console.log('666')
                        Cookie.setItem('phone', $.trim($('.phoneID').val()), 7);
                        Cookie.setItem("user_id", response.id, 7);
                    }
                }
                else {
                    alert(response.msg);
                    return;
                }
            }
        });
    });

    // 如果cookie中有值
    // if (Cookie.getItem('phone')) {
    //     let [url2, val2, str2] = ["../../../server/02.login.php",
    //         $.trim(Cookie.getItem('phone')),
    //         '您的免密登录已过期，请重新登录'];
    //     sendAjax(url2, val2, str2);
    // }
})