$(() => {


    // 检查用户是否登录
    let phone = Cookie.getItem("phone");
    let user_id = Cookie.getItem("user_id");
    if (phone && user_id) {
        $(".header-load .main1 .login .login-status").text("您好: SKW" + phone.slice(0, 8));
        $('.header-load .main1 .login .reg-status').text('退出');
        getGoodsNums();
        getCartData();
    };
    // 设置页面刷新和登录后页面用户的显示
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
    // 用户退出登录功能
    if (off == "退出") {
        $('.header-load .main1 .login .reg-status').click(function () {
            phone = "";
            user_id = "";
            Cookie.removeItem("phone");
            Cookie.removeItem("user_id");
            window.location.reload();
        })
    }

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
        // 当购物车为空时，有消息提示
        let lists = $('.stores').children();
        if (lists.length == 0) {
            $('.nothing').show()
        } else {
            $('.nothing').hide();
        };
    }
    //001--- getCartData---获取对应的数据，并进行渲染
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

                // 侧边购物车没有内容的时候提示
                let child = $('.sorts-details .stores').children();
                if (!child.length == 0) {
                    $('.hide_cart .nothing').hide();
                } else {
                    console.log('hidehidehide');
                    $('.hide_cart .nothing').show();
                };
            }
        });
    }
    // 001---点击加入购物车
    $('.Ulist').unbind('click').on('click', '.addCart', function () {
        console.log('+++++=')
        // 检查该用户是否登录
        if (!phone || !user_id) {
            location.href = '../html/03.login.html';
        }
        else {
            // 用户已经登录,发送网络请求，根据goods_id把商品信息加入购物车
            let goods_id = $(this).parents('.item').data('goods-id');
            $.ajax({
                type: "get",
                url: "../../../server/07.cart.php",
                data: `type=add&goods_id=${goods_id}&user_id=${user_id}`,
                dataType: "json",
                success: function (response) {
                    if (response.status == 'success') {
                        console.log('加入成功')
                        getCartData();
                        getGoodsNums();
                    }

                }
            });
        };



    });
    // 002---点击删除购物车,根据goods_id删除数据库信息，再刷新渲染
    $('.stores').on('click', '.delete', function () {
        console.log('deldedledl')
        let goods_id = $(this).parents('.shopsDetails').data('item-id');
        $.ajax({
            type: "get",
            url: "../../../server/07.cart.php",
            data: `type=delete&user_id=${user_id}&goods_id=${goods_id}`,
            dataType: "json",
            success: function (response) {
                if (response.status == 'success') {
                    let res = confirm('主人，您确定不要我了吗~o(╥﹏╥)o')
                    if (res) {
                        getCartData();
                        getGoodsNums();

                    } else {
                        return;
                    }
                }
            }
        });
    });
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
    // 004---封装函数，根据商品的复选框的勾选状况，计算总商品数量和总价
    function sumTotalPriceAndNum() {
        let totalPrice = 0;
        let totalNum = 0;
        $('.stores').find('.check1').each(function () {
            let isCheck = $(this).is(':checked');
            if (isCheck) {
                currtntPrice = $(this).parents('.shopsDetails').find('.cost').text().slice(1) * 1;
                currentNum = $(this).parents('.shopsDetails').find('.total').val() * 1;
                totalPrice += currtntPrice;
                totalNum += currentNum;
            };
            // console.log(totalNum, totalPrice, "222222")
            $('.hide_cart').find('.btm .num').text(totalNum);
            $('.hide_cart').find('.btm .total-cost').text(totalPrice.toFixed(2));

        })
    };
    // 005--加减更新数据和页面
    $('.stores').on('click', '.cut', function () {
        // 减
        let count = $(this).next().val() * 1;
        if (count == 1) return;
        upDateNum($(this), count - 1);
    });
    $('.stores').on('click', '.add', function () {
        // 加
        let count = $(this).prev().val() * 1;
        console.log(count);
        upDateNum($(this), count + 1);

    });
    function upDateNum(ele, count) {
        let goods_id = ele.parents('.shopsDetails').data('item-id');
        $.ajax({
            type: "get",
            url: "../../../server/07.cart.php",
            data: `type=upDateNum&goods_id=${goods_id}&user_id=${user_id}&count=${count}`,
            dataType: "json",
            success: function (response) {
                if (response.status == 'success') {
                    ele.parents('.count').find('.total').val(count);
                    ele.parents('.count').next().find('.cost').text("￥" + count * response.price + ".00");

                    let store_price = 0;
                    ele.parents('.store').find('.check1').each(function () {
                        if ($(this).is(':checked')) {
                            current_price = $(this).parents('.shopsDetails').find('.cost').text().slice(1) * 1;
                            store_price += current_price
                        }
                    });
                    ele.parents('.store').find('.store-price').text("￥" + store_price.toFixed(2));
                    getGoodsNums();
                    sumTotalPriceAndNum();
                }
            }
        });
    };

    // ********商品店铺复选框状态变化的时候，该店铺下的所有商品复选框状态一致
    $('.stores').on('click', '.check-store', function () {
        let all = $(this).parents('.store').find('.check1');
        let isCheck = $(this).is(':checked');
        all.prop('checked', isCheck);
        if ($(this).is(':checked')) {
            let store_price = 0;
            $(this).parents('.store').find('.cost').each(function () {
                current_price = $(this).text().slice(1) * 1;
                store_price += current_price
            });
            $(this).parents('.store').find('.store-price').text("￥" + store_price.toFixed(2));
        } else {
            $(this).parents('.store').find('.store-price').text("￥0.00");
        }
        let allStore = $('.stores').find('.check-store');
        let flag = allStore.toArray().every((ele) => {
            return $(ele).is(':checked') == true
        });
        $('.hide_cart').find(".select-all input[type='checkbox']").prop('checked', flag);
        sumTotalPriceAndNum();
    });
    // ********全选功能
    $('.hide_cart').find(".select-all input[type='checkbox']").click(function () {
        let isCheck = $(this).is(':checked');
        $('.stores').find("input[type='checkbox']").prop('checked', isCheck);
        if ($(this).is(':checked')) {
            $(this).parents('.hide_cart').find('.store').each(function () {
                let store_price = 0;
                $(this).find('.cost').each(function () {
                    current_price = $(this).text().slice(1) * 1;
                    store_price += current_price
                });
                $(this).find('.store-price').text("￥" + store_price.toFixed(2));
            });
        } else {
            $(this).parents('.hide_cart').find('.store').each(function () {
                $(this).find('.store-price').text("￥0.00");
            })

        }
        sumTotalPriceAndNum();
    });

    // *********商品的勾选情况
    /* 逻辑：当某个具体的商品勾选状态改变的时候，应该检查当前店铺中是否所有的商品都有被勾选 */
    /* 如果成立，那么就把把店铺勾上，否则就去掉 */
    $('.stores').on('click', '.check1', function () {
        let all = $(this).parents('.store').find('.check1');
        // 该店铺下的每个商品都被勾选才返回
        let key = all.toArray().every((ele) => {
            return $(ele).is(':checked') == true
        });
        $(this).parents('.store').find('.check-store').prop('checked', key);
        let allStore = $('.stores').find('.check-store');
        let flag = allStore.toArray().every((ele) => {
            return $(ele).is(':checked') == true
        });
        $('.hide_cart').find(".select-all input[type='checkbox']").prop('checked', flag);
        let store_price = 0;
        $(this).parents('.store').find('.check1').each(function () {
            if ($(this).is(':checked')) {
                current_price = $(this).parents('.shopsDetails').find('.cost').text().slice(1) * 1;
                store_price += current_price
            }
        });
        $(this).parents('.store').find('.store-price').text("￥" + store_price.toFixed(2));
        sumTotalPriceAndNum();
    })

    // 侧边栏购物车显示隐藏
    $('.right-nav').find('.cart').click(function () {
        if ($('.hide_cart').is(':hidden')) {
            $('.hide_cart').show();
            $('.right-nav').css({
                "right": '300px'
            });
            $('.cart').css({
                "backgroundColor": "#f88ca5"
            });
            $('.current_cart').css("color", "white")
        } else {
            $('.hide_cart').hide();
            $('.right-nav').css({
                "right": '0px'
            });
            $('.cart').css({
                "backgroundColor": "#f5f5f5"
            });
            $('.current_cart').css("color", "#6c6c6c")
        }
    });

    // 回到顶部
    $('.turnBack').click(function (e) {
        e = e || window.event;
        $iY = window.scrollY;
        let timer = setInterval(function () {
            if ($iY >= 0) {
                window.scrollTo(0, $iY -= 30)
            }
            else {
                clearInterval(timer);
            }
        }, 10)
    });

})