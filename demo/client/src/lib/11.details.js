$(() => {


    // 小图片的渲染
    let srcStr = src[0].minPic.map(function (val, key) {
        return `<li class="${key == 0 ? 'active' : ''}">
                <img src=${val} alt="">
            </li>`
    }).join('');
    $('.minpics').find('ul').html(srcStr);
    // links的渲染
    let html = font.map(function (val, key) {
        return `<span class="iconfont ${val}"></span>`
    });
    let str = link.map(function (val, key) {
        return ` <a href="./01.index.html">
    ${html[key]}
    <span>${val}</span>
</a>`
    }).join('');
    $('.links-foot').html(str);

    // list小图片高亮
    $('.list').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.minbox').find('img').attr('src', $(this).find('img').attr('src'))
        $('.bigbox').find('img').attr('src', $(this).find('img').attr('src'))
    });
    // 点击切换图片
    let index = 0;
    $('.clickmove').on('click', 'span', function () {
        if ($(this).hasClass('prev')) {
            index++;
            if (index >= 0) {
                index = 0
            };
            console.log(index)
            let rg = index * 70;
            $('.minpics').find('ul').css({
                "left": rg + 'px'
            });
        }
        else {
            index--;
            console.log(index);
            if (index <= -1) {
                index = -1;
            }
            let lf = index * 70;
            $('.minpics').find('ul').css({
                "left": lf + 'px'
            });

        }
    })

    // 放大镜显示
    $('.minpic').mouseenter(function () {
        $('.mask,.bigbox').show();
    }).mouseleave(function () {
        $('.mask,.bigbox').hide();
    }).mousemove(function (e) {
        e = e || window.event;
        // 鼠标在盒子里的位置
        let _left = e.pageX - $('.minpic').offset().left - $('.mask')[0].offsetWidth / 2
        let _top = e.pageY - $('.minpic').offset().top - $('.mask')[0].offsetHeight / 2
        let mask_maxwid = $('.minpic')[0].offsetWidth - $('.mask')[0].offsetWidth;
        let mask_maxhei = $('.minpic')[0].offsetHeight - $('.mask')[0].offsetHeight;
        //   遮罩只能活动在盒子里面
        if (_left <= 0) {
            _left = 0
        }
        if (_left >= mask_maxwid) {
            _left = mask_maxwid
        }
        if (_top <= 0) {
            _top = 0
        }
        if (_top >= mask_maxhei) {
            _top = mask_maxhei
        }

        // 大盒子中的大图片随着遮罩的移动而变化，是反方向运动
        let iX = ($('.bigbox')[0].offsetWidth - $('.bigbox').find('img')[0].offsetWidth) / mask_maxwid;
        let iY = ($('.bigbox')[0].offsetHeight - $('.bigbox').find('img')[0].offsetHeight) / mask_maxhei;
        let left = _left * iX;
        let top = _top * iY;
        $('.mask').css({
            'left': _left + 'px',
            'top': _top + 'px'
        });
        $('.bigbox').find('img').css({
            'left': left + 'px',
            'top': top + 'px'
        })
    });
    //  尺寸获取更多size
    $('.icon-z044').click(function () {
        let Lwid = $('.size').css('height').slice(0, -2) * 1;
        let iwid = $('.goods-size').css('height').slice(0, -2) * 1;
        if (Lwid < iwid) {
            $('.size').css('height', iwid + 'px')
        };
        $(this).hide();
    });

    // 价格的变动,输入价格计算总价
    let unitNum = 0;
    let itemcost = 58;
    function totalCost(unitNum, itemcost) {
        $('.total').each(function () {
            unitNum += $(this).val() * 1;
        });
        $('.units').text(unitNum);
        let sumcost = (itemcost * unitNum * 1).toFixed(2);
        $('.yuan').text(sumcost);
        unitNum = 0;
    };
    // 输入值的时候改变
    $('.total').change(function (e) {
        e.preventDefault();
        totalCost(unitNum, itemcost);
    });
    // 点击计算价格
    let val2 = 0;
    let val3 = 0;
    $('.count').find('.cut').unbind('click').click(function (e) {
        val2 = $(this).next().val() * 1 - 1;
        if (val2 - 1 < 0) {
            val2 = 0;
        }
        $(this).next().val(val2);
        totalCost(unitNum, itemcost);
    });
    $('.count').find('.add').unbind('click').click(function (e) {
        val3 = $(this).prev().val() * 1 + 1;
        $(this).prev().val(val3);
        totalCost(unitNum, itemcost);
    });



})