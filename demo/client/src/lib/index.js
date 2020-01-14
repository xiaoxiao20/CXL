$(() => {
    // 导航切换
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

    // 二级导航显示隐藏 
    $('.banner1 .erji-lf').on('mouseenter', 'li', function () {
        $(this).mouseenter(function () {
            let num = $(this).index();
            // console.log(num);
            $('.erji-rg').eq(num).stop().animate({
                'width': '800px'
            }, 800);
            // console.log($('.erji-rg').eq(num));
        }).mouseleave(function () {
            let num = $(this).index();
            $('.erji-rg').eq(num).stop().animate({
                'width': '0'
            }, 800);
        });
    })

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
    $('.banner2').find('.memu').append(banBtDataStr);
    // 市场展开和收起
    $('.moreMemu').find('span').eq(0).click(function () {
        $('.banner2').find('.memu').css('height', '312px');
        $(this).css('display', 'none');
        $('.moreMemu').find('span').eq(1).css('display', 'block');
        $('.moreMemu').find('span').eq(1).click(function () {
            $('.banner2').find('.memu').css('height', '184px');
            $(this).css('display', 'none');
            $('.moreMemu').find('span').eq(0).css('display', 'block');
        })

    });
})