$(() => {
    $('.littleTitle').mouseenter(function () {
        $(this).next().css('display', 'block')
    }).mouseleave(function () {
        $(this).next().css('display', 'none')
    })
    // 广州站显示隐藏
    $('.adr').mouseenter(function () {
        $('.memu').css('display', 'block');
    }).mouseout(function () {
        $('.memu').css('display', 'none');
    });

    // 检查用户是否登录
    let phone = Cookie.getItem("phone");
    let user_id = Cookie.getItem("user_id");
    if (phone && user_id) {
        $(".header-load .main1 .login .login-status").text("您好: SKW" + phone.slice(0, 8));
        $('.header-load .main1 .login .reg-status').text('退出');

    };
    let login = $(".header-load .main1 .login .login-status").text();
    let off = $('.header-load .main1 .login .reg-status').text();
    if (login == "登录") {
        $(".header-load .main1 .login .login-status").click(function () {
            window.location.href = "../html/03.login.html"
        });
        $('.header-load .main1 .login .reg-status').click(function () {
            window.location.href = "../html/02.register.html"
        })
    }
    if (off == "退出") {
        $('.header-load .main1 .login .reg-status').click(function () {
            Cookie.removeItem("phone");
            Cookie.removeItem("user_id");
            window.location.reload();
        })
    }


})