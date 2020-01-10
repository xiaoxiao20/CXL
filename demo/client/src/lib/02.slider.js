// 实现拖动滑块进行验证的插件
(function ($) {
    $.fn.slider = function () {
        let str = `<div class="slid_color">
                        <span class="slid_txt">
                            请拖动滑块，到最右侧
                            <span class="slid">>></span>
                        </span>
                    </div>`;
        let _str = `验证通过<span class='slid'></span>`
        $(this).append(str);
        let gap;//鼠标点击的时候和左侧的距离
        let slog = false;
        let _stand = 320 - 44;
        $('.slid').mousedown(function (e) {
            slog = true;
            gap = e.pageX;
            console.log('gap' + gap + ':' + $(this).parents('.slid_wrap').css('left'));
        });
        $('.slid_wrap').mousemove(function (e) {
            let _x;
            if (slog) {
                _x = e.pageX - gap;
                if (_x < _stand) {
                    $('.slid_color').css({ 'width': _x });
                    $('.slid').css('left', _x);
                }
                else {
                    $('.slid_color').css({ 'width': _stand - 1 });
                    $('.slid').css('left', _stand - 1);
                }
            }
        })
        $(window).mouseup(function (e) {
            e.preventDefault;
            _x = e.pageX - gap;
            if (slog) {
                if (_x < _stand) {
                    $('.slid_color').css({ 'width': 0 });
                    $('.slid').css('left', '0');
                }
                else {
                    $('.slid_txt').html(_str);
                    $('.slid_txt').css({
                        'background': '#195',
                        'color': 'white'
                    })
                    $('.slid_color').css({ 'width': _stand - 2 });
                    $('.slid').css({ 'left': _stand - 2, 'background-image': 'url(../img/yzm.png) ' });
                    $(this).unbind('mousedown mouseup mousemove');
                    $('.slid_wrap').unbind('mousemove');
                    return true;
                }
                slog = false;
            }
        })
        return false
    }
})(jQuery);