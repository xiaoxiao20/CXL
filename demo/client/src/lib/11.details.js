
$(() => {

    let phone = Cookie.getItem("phone");
    let user_id = Cookie.getItem("user_id");
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

    // 列表页跳转到详情页的数据渲染
    let urlStr = decodeURI(location.search).slice(1);
    let urlArr = urlStr.split('&');
    let arr = urlArr.map(function (val, key) {
        return val.split('=')[1];
    });
    console.log(arr)// ["//img.vvic.com/1578116501798_875109.jpeg", "55", "2020春装新款~实拍~小视频~法式气质荷叶边褶皱长袖打底连衣裙", "242"]
    if (arr.length != 1) {
        $('.minbox,.bigbox').find('img').attr('src', arr[0]);
        $('.minpics').find('ul').find('li').eq(0).find('img').attr('src', arr[0]);
        $('.priceBox').find('.price1').text('￥' + (arr[1] * 1).toFixed(2));
        $('.title').text(arr[2]);
        $('.goods-size').find('.size-price').text(arr[1] * 1)
        $('.minpic').attr('data-goods-id', arr[3]);
    }

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
    let itemcost = $('.priceBox').find('.price1').text().slice(1) * 1;
    console.log(itemcost)
    function totalCost(unitNum, itemcost) {
        $('.total1').each(function () {
            unitNum += $(this).val() * 1;
        });
        $('.units').text(unitNum);
        let sumcost = (itemcost * unitNum * 1).toFixed(2);
        $('.yuan').text(sumcost);
        unitNum = 0;
    };
    // 输入值的时候改变
    $('.total1').change(function (e) {
        e.preventDefault();
        totalCost(unitNum, itemcost);
    });
    // 点击计算价格
    let val2 = 0;
    let val3 = 0;
    $('.count').find('.cut1').unbind('click').click(function (e) {
        val2 = $(this).next().val() * 1 - 1;
        if (val2 - 1 < 0) {
            val2 = 0;
        }
        $(this).next().val(val2);
        totalCost(unitNum, itemcost);
    });
    $('.count').find('.add1').unbind('click').click(function (e) {
        val3 = $(this).prev().val() * 1 + 1;
        $(this).prev().val(val3);
        totalCost(unitNum, itemcost);
    });
    function getCartData() {
        /* 接口：cart.php?type=get&user_id=xxx*/
        $.ajax({
            type: "get",
            url: "../../../server/07.cart.php",
            data: `type=get&user_id=${user_id}`,
            dataType: "json",
            success: function (data) {
                console.log(data);
                /* 整理前[{商品},{商品},{}] */
                /* 需要对数据进行处理(把数据按照店铺名称来整理) */
                /* 整理后[{店铺},{店铺},{}] */
                let storeNames = [];
                let storeData = [];
                data.forEach(ele => {
                    if (!storeNames.includes(ele.shopName)) storeNames.push(ele.shopName);
                });

                storeNames.forEach(ele => {
                    storeData.push({ "shopName": ele, "goods": [] })
                });

                data.forEach(ele => {
                    let currentStoreName = ele.shopName;
                    storeData.forEach(item => {
                        if (item.shopName == currentStoreName) {
                            item.goods.push(ele);
                        }
                    })
                });
                cartRenderUI(storeData);
            }
        });
    };
    /* 侧边栏购物车数据内容渲染 */
    function cartRenderUI(_data) {
        console.log(_data);
        /* 创建标签 */
        let html = _data.map(ele => {

            let tpl = ele.goods.map(ele => {
                let price = ele.num * ele.price;
                return `
                            <div class="shopsDetails" data-item-id=${ele.goods_id}>
                                <input class="fl check1" type="checkbox" name="">
                                <div class="desc-pic fl">
                                    <img src="${ele.src}" alt="">
                                </div>
                                <div class="desc fl">
                                    <p class="storemsg">${ele.title}</p>
                                    <div class="count">
                                        <input class="cut" type="button" value="-">
                                        <input class="total" type="text" value="${ele.num}">
                                        <input class="add" type="button" value="+">
                                    </div>
                                    <div class="cost-del">
                                        <span class="fl cost">￥${price}.00</span>
                                        <span class="fr delete">删除</span>
                                    </div>
                                </div>
                            </div>
                        `
            }).join("");
            return `<li class="store">
                        <div class="store-name">    
                            <div class="fl">
                                <input type="checkbox" name="" class="check-store">
                                <span class="storeName">${ele.shopName}</span>
                            </div>
                            <div class="fr store-price">￥0.00</div>
                         </div>
                        ${tpl}
                    </li>`
        }).join("");

        /* 设置标签 */
        $(".stores").html(html);
    };
    // 003---获取购物车中的数量，显示数量
    function getGoodsNums() {
        $.ajax({
            type: "get",
            url: "../../../server/07.cart.php",
            data: `type=getCount&user_id=${user_id}`,
            dataType: "json",
            success: function (response) {
                if (response.status == 'success') {
                    $('.total-nums').text(response.count);
                }
            }
        });
    };
    // 点击加入购物车的时候，判断此时的件数，不为0则加入购物车
    $('.send').click(function () {
        let itemNum = $('.sum').find('.units').text();
        if (itemNum == 0) {
            alert('您还没有选购，请继续选购~');
        }
        else {
            console.log('++++++')
            // 发送请求加入购物车
            // // 检查该用户是否登录
            if (!phone || !user_id) {
                location.href = '../html/03.login.html';
            }
            else {
                // 用户已经登录,发送网络请求，根据goods_id把商品信息加入购物车
                let goods_id = $('.minpic').data('goods-id');
                let more = $('.sum').find('.units').text() * 1;
                $.ajax({
                    type: "get",
                    url: "../../../server/07.cart.php",
                    data: `type=addmore&goods_id=${goods_id}&user_id=${user_id}&more=${more}`,
                    dataType: "json",
                    success: function (response) {
                        if (response.status == 'success') {
                            alert('加入成功，请继续选购~')
                            getCartData();
                            getGoodsNums();
                            window.location.reload();
                        }

                    }
                });
            };
        }
    })


})