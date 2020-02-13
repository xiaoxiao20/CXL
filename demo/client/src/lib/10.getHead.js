$(() => {
    $('.header-load').load('../../../server/header.html', function () {
        $.getScript('../lib/header.js');
        $.getScript('../lib/index.js');

        $('.nav-title').find('li').eq(0).find('a').css({
            "color": 'white'
        });
        $('.nav-title').find('li').eq(0).css({
            "backgroundColor": '#f96388'
        }).mouseenter(function () {
            $(this).css({
                "backgroundColor": 'white'
            });
            $(this).find('a').css({
                "color": '#999999'
            });
            $('.ban-left').show().mouseenter(function () {
                $('.nav-title').find('li').eq(0).trigger('mouseenter');
                $(this).find('.erji-rg').show().mouseenter(function () {
                    // $(this).show();
                    // $('.ban-left').show();
                    $('.nav-title').find('li').eq(0).trigger('mouseenter');
                })

            }).mouseleave(function () {
                $(this).hide();
                $('.nav-title').find('li').eq(0).css({
                    "backgroundColor": '#f96388'
                });
                $('.nav-title').find('li').eq(0).find('a').css({
                    "color": 'white'
                });

            });
        }).mouseleave(function () {
            $(this).css({
                "backgroundColor": '#f96388'
            });
            $(this).find('a').css({
                "color": 'white'
            });
            $('.ban-left').hide();

        }).append($("<span class='iconfont icon-gengduo-2'></span>").css({
            "width": "18px",
            "height": "100%",
            "float": "right",
            "color": '#999999'
        }));
        $('.nav-title').find('li').eq(1).css({
            "backgroundColor": '#f96388'
        });
        $('.nav-title').find('li').eq(1).find('a').css({
            "color": 'white'
        });
        console.log($('.nav-title').find('li').eq(0).find('a'))
    });

})