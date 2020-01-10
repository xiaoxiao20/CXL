$(() => {
    $('.littleTitle').mouseenter(function () {
        console.log('0000')
        console.log($(this).next().get(0));
        // css('display', 'block')
        $($(this).next().get(0)).addClass('current');
    });
    // 广州站显示隐藏
    $('.adr').mouseenter(function () {
        $('.memu').css('display', 'block');
    }).mouseout(function () {
        $('.memu').css('display', 'none');
    })
})