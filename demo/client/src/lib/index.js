$(() => {
    // 导航切换
    $('.littleTitle').mouseenter(function () {
        $(this).next().show()
    }).mouseleave(function () {
        $(this).next().hide()
    })
    // 广州站显示隐藏
    $('.adr').mouseenter(function () {
        $('.memu').show();
    }).mouseleave(function () {
        $('.memu').hide();
    });

    // 二级导航显示隐藏 
    $('.banner1 .erji-lf').unbind('mouseenter').on('mouseenter', 'li', function (e) {
        // e.preventDefault();
        let num = $(this).index();
        console.log(num);
        $('.erji-rg').stop().animate({
            'width': '800px'
        }, 800).mouseenter(function () {
            // $('.erji-lf').find('li').eq(num).trigger('mouseenter');
            $(this).show();
        }).mouseleave(function () {
            $(this).stop().animate({
                'width': '0'
            }, 800)
        });
    }).on('mouseleave', 'li', function () {
        $('.erji-rg').stop().animate({
            'width': '0'
        }, 800);
    });
    // 轮播图右侧的选项卡
    $('.banRg1 span').mouseenter(function () {
        $(this).addClass('active').siblings().removeClass('active')
        $('.tab').eq($(this).index()).addClass('active1').siblings().removeClass('active1');

    });
    let tabStr = tabData1.map(function (val, lindex) {
        return ` <a href="###">${val}</a>`
    }).join('');
    $('.tab1').append(tabStr);
    let tabStr2 = tabData2.map(function (val, lindex) {
        return ` <a href="###">${val}</a>`
    }).join('');
    $('.tab2').append(tabStr2);

    // banner2左侧的市场栏
    let banBtDataStr = banBtData.map(function (val, index) {
        return `<a href="./01.index.html">${val}</a>`
    }).join('');
    $('.banner2').find('.memu').html(banBtDataStr);
    // 市场展开和收起
    $('.moreMemu').find('span').click(function () {
        let H = $(this).parent().prev().css('height').slice(0, -2) * 1;
        console.log(H);
        if (H > 184) {
            console.log('111')
            $(this).parent().prev().css('height', '500px')
            $(this).text('收起市场')
        }
        else {
            $(this).parent().prev().css('height', '184px')
            $(this).text('更多市场');
        }
    });

});
