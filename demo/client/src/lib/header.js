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

})