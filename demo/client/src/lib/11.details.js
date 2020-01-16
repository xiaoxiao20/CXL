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


    // $('.minpics').find('ul').on('click', 'li', function () {
    //     $(this).addClass('active').siblings().removeClass('active');
    //     console.log('00000')
    // });
    $('.minpics').click(function () {
        console.log('02340')

    })
})