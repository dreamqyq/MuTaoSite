$(document).ready(function(){
        // 弹出层参数
    var login=$('.login'),
        register=$('.register'),
        popMask=$('.pop-mask'),
        popLayer=$('.pop-layer'),
        close=$('.close'),
        popContent=$('.pop-content'),
        loginWindow=$('.login-window').html(),
        registerWindow=$('.register-window').html(),
        // 轮播图参数
        dots=$('.dots').children('span'),
        sliderPic=$('.slider-pic'),
        prevBtn=$('.btn-prev'),
        nextBtn=$('.btn-next'),
        sliderBox=$('.slider'),
        timer=null,
        picIndex=0,
        // 左侧楼层导航参数
        leftSidebar = $('.leftsidebar'),
        lsLink=$('.ls-link'),
        floors=$('.shop-content'),
        floorTop=[],
        floorMiddle=[],
        //楼层参数
        roomName=$('.s-t-link').children('a'),
        roomContent=$('.shop-main'),
        roomIndex=0;

//弹出层函数
    function showLayer(){
        // 登录
        login.click(function(){
           maskShow(310,330);
           popContent.html(loginWindow);
           login.addClass('active');
           register.removeClass('active');
            // 账号表单校验
            $('.input[name=account]').blur(function(){
                var accountVal = $('input[name=account]').val();
                formVerify('account',accountVal);
            })
            // 密码表单校验
            $('.input[name=password]').blur(function(){
                var passwordVal = $('input[name=password]').val();
                formVerify('password',passwordVal);
            })
           return false;
        });
        // 注册
        register.click(function(){
            maskShow(270,330);
            popContent.html(registerWindow);
            register.addClass('active');
            login.removeClass('active');

            // 账号表单校验
            $('.input[name=account]').blur(function(){
                var accountVal = $('input[name=account]').val();
                formVerify('account',accountVal);
            })
            // 验证码表单校验
            $('input[name=verify]').blur(function(){
                var verifyVal= $('input[name=verify]').val();
                formVerify('verify',verifyVal);
            })
            return false;
        })

        // 关闭弹出层
        close.click(function () {
            maskHide();
        });

    }
    // 弹出层显示
    function maskShow(h,w){
        popMask.show();
        popLayer.show();
        popLayer.css({
            'height':h,
            'width':w
        })
    }
    // 弹出层隐藏
    function maskHide(){
        popMask.hide();
        popLayer.hide();
    }
    //表单验证函数(第一个参数为检测类型，第二个参数为表单数据)
    function formVerify(form,val) {
        // 账号检测
        if(form==='account'){
            var accountVal = $('input[name=account]').val();
            // 如果输入的登录名是11位数字或者非数字则可以登录，否则显示错误提示
            if(isNaN(accountVal)||(isNaN(accountVal)===false&&accountVal.length===11)){
                $('.erro-name').hide();
            }else{
                $('.erro-name').show();
            }
        }
        // 密码检测
        if(form==='password'){
            // 如果密码长度在6-16位之间则正确，否则显示错误提示
            if(val.length>=6&&val.length<=16){
                $('.erro-psd').hide();
            }else{
                $('.erro-psd').show();
            }
        }
        // 验证码检测
        if(form==='verify'){
            if(val==='GYyd'){
                $('.erro-verify').hide();
            }else{
                $('.erro-verify').show();
            }
        }
    }

// 购物车函数
    function shoppingFn() {
        var logoShopping=$('.logo-shopping'),
            shoppingContent=$('.logo-shopping-content'),
            shoppingHover=$('.logo-shopping-content-hover'),
            shoppingList=$('.logo-shopping-list');
        logoShopping.mouseover(function () {
            shoppingContent.hide();
            shoppingHover.show();
            shoppingList.show();
            logoShopping.css('background','#fff');
        })
        logoShopping.mouseout(function () {
            shoppingContent.show();
            shoppingHover.hide();
            logoShopping.css('background','red');
            shoppingList.hide();
        })
    }
    
// 侧边栏菜单展开函数
    function sidebarFn(){
        var sidebarMain=$('.sidebar-main'),
            sidebarSpread=$('.sidebar-spread'),
            sidebarContent=sidebarSpread.children($('.sidebar-content')),
            sidebar=$('.sidebar'),
            sidebarTitle=$('.sidebar-title'),
            index=0;
        for(var i=0;i<sidebarMain.length;i++){
            sidebarMain.eq(i).attr('num',i);
            sidebarMain.eq(i).mouseover(function(){
                for(var j=0;j<sidebarMain.length;j++){
                    sidebarContent.eq(j).hide();
                    sidebarTitle.eq(j).removeClass('sidebar-active');
                }
                index=$(this).attr('num');
                sidebarSpread.show();
                sidebarTitle.eq(index).addClass('sidebar-active');
                sidebarContent.eq(index).show();
            })
        }
        sidebar.mouseout(function () {
            sidebarHide();
        });
        sidebarSpread.mouseover(function(){
            sidebarShow();
        }).mouseout(function () {
           sidebarHide();
        })
        // 侧边栏显示函数
        function sidebarShow() {
            sidebarSpread.show();
            sidebarTitle.eq(index).addClass('sidebar-active');
        }
        // 侧边栏隐藏函数
        function sidebarHide() {
            sidebarSpread.hide();
            sidebarTitle.removeClass('sidebar-active');
        }
    }

// 轮播图函数
    function sliderFn() {
        sliderBox.mouseout(function(){
            autoSlider();
        }).trigger('mouseout');
        sliderBox.mouseover(function(){
            stopSlider();
        });
        // 上一张图片切换
        prevBtn.click(function(){
            picIndex--;
            changePic();
        });
        // 下一张图片切换
        nextBtn.click(function(){
            picIndex++;
            changePic();
        });
        // 为每一个dots添加num属性值
        for(var b=0;b<sliderPic.length;b++){
            dots.eq(b).attr('num',b);
        }
        // 圆点切换函数（根据圆点的num值）
        dots.click(function(){
            picIndex=$(this).attr('num');
            changePic();
        })
    }
    // 轮播图片切换函数
    function changePic(){
        if(picIndex<0){
            picIndex=sliderPic.length-1;
        }
        if(picIndex>=sliderPic.length){
            picIndex=0;
        }
        for(var a=0;a<sliderPic.length;a++){
            sliderPic.eq(a).removeClass('pic-active');
            dots.eq(a).removeClass('dots-active');
        }
        sliderPic.eq(picIndex).addClass('pic-active');
        dots.eq(picIndex).addClass('dots-active');
    }
    //图片自动播放函数
    function autoSlider() {
        timer=setInterval(function () {
            picIndex++;
            changePic();
        },2000);
    }
    // 图片播放清除
    function stopSlider() {
        if(timer){
            clearInterval(timer);
        }
    }

// 左侧楼层导航栏函数
    function leftSidebarFn() {
        floorHeight();
        $(window).scroll(function () {
            changeByScroll();
        })
        lsLink.click(function () {
            $('body,html').animate({
                'scrollTop':floorTop[$(this).attr('floor')],
            },500);
            return false;
        }).mouseover(function () {
            floorNameFn(this,'over');
        }).mouseout(function () {
            floorNameFn(this,'out');
        });
    }
    // 楼层高度检测函数
    function floorHeight() {
        for(var c=0;c<lsLink.length;c++){
            lsLink.eq(c).attr('floor',c);
            floorMiddle[c]=floors.eq(c).children('hr').offset().top-325;
            floorTop[c]=floors.eq(c).children('hr').offset().top-52;
        }
    }
    // 楼层链接更名函数(改名对象，改名类型,[索引])
    function floorNameFn(obj,type,i) {
        var index=$(obj).attr('floor');
        var floorName=['服饰','美妆','手机','家电','数码'],
            floorNum=['1F','2F','3F','4F','5F'];
        if(type==='over'){
            $(obj).text(floorName[index]);
            $(obj).css('color','red');
        }
        if(type==='out'){
            $(obj).text(floorNum[index]);
            $(obj).css('color','#8b8d9c');
            changeByScroll();
        }
        if(type==='scroll'){
            leftSidebar.show();
            for(var e=0;e<$(obj).length;e++){
                $(obj).eq(e).text(floorNum[e]);
                $(obj).css('color','#8b8d9c');
            }
            $(obj).eq(i).text(floorName[i]);
            $(obj).eq(i).css('color','red');
        }
    }
    // 根据轮动条到相应的位置，楼层链接对应改变
    function changeByScroll() {
        var scrollHeight=$(window).scrollTop();
        if(scrollHeight>=floorMiddle[0]&&scrollHeight<floorMiddle[1]){
            floorNameFn(lsLink,'scroll',0);
        } else if(scrollHeight>=floorMiddle[1]&&scrollHeight<floorMiddle[2]){
            floorNameFn(lsLink,'scroll',1);
        }else if(scrollHeight>=floorMiddle[2]&&scrollHeight<floorMiddle[3]){
            floorNameFn(lsLink,'scroll',2);
        }else if(scrollHeight>=floorMiddle[3]&&scrollHeight<floorMiddle[4]){
            floorNameFn(lsLink,'scroll',3);
        }else if(scrollHeight>=floorMiddle[4]){
            floorNameFn(lsLink,'scroll',4);
        }else {
            leftSidebar.hide();
        }

    }

// 右侧导航栏函数
    function rightSidebarFn() {
        var rsLink=$('.rightsidebar').children('a'),
            rsSpread=$('.rs-spread');
        // 为每一个链接添加num属性
        for(var f=0;f<rsLink.length;f++){
            rsLink.eq(f).attr('num',f);
        }
        // 动态显示链接展开区
        rsLink.mouseenter(function () {
            var index=$(this).attr('num');
            rsSpread.eq(index).animate({
                'right':0,
                'opacity':1
            },300)
        }).mouseleave(function () {
            var index=$(this).attr('num');
            rsSpread.eq(index).animate({
                'right':-70,
                'opacity':0
            },300)
        })
        // 返回顶部
        rsLink.eq(4).click(function () {
            $('body,html').animate({
                'scrollTop':0
            },500);
            return false;
        })
    }

// 楼层切换函数
    function floorChaneFn() {
        // 为每一个小标题添加num属性
        for(var h=0;h<roomName.length;h++){
            roomName.eq(h).attr('room',h);
        }
        // 当鼠标移至小标题上，楼层内容对应改变
        roomName.mouseover(function () {
            roomIndex=parseInt($(this).attr('room'),10);
            roomByIndex();
            // 每当切换一次room时，重新测量楼层高度方便左侧楼层导航定位
            floorHeight();
        })
    }
    // 根据索引改变楼层内容
    function roomByIndex() {
        // 根据点击的小标题的索引，将其对应楼层的其他两块内容删除active类
        if(roomIndex%3===0){
            removeRoom(roomIndex+1);
            removeRoom(roomIndex+2);
        }else if(roomIndex%3===1){
            removeRoom(roomIndex-1);
            removeRoom(roomIndex+1);
        }else if(roomIndex%3===2){
            removeRoom(roomIndex-1);
            removeRoom(roomIndex-2);
        }
        // 将鼠标移到的那一块设置active类
        roomName.eq(roomIndex).addClass('a-active');
        roomContent.eq(roomIndex).addClass('room-active');
    }
    // 移除房间的类的函数
    function removeRoom(i) {
        roomName.eq(i).removeClass('a-active');
        roomContent.eq(i).removeClass('room-active');
    }


// 页面函数调用
    // banner区侧边栏函数
    sidebarFn();
    // 购物车显示函数
    shoppingFn();
    // 弹出层显示函数
    showLayer();
    // 轮播图函数
    sliderFn();
    // 楼层内容切换函数
    floorChaneFn();
    // 左侧楼层侧边栏函数
    leftSidebarFn();
    // 右侧导航链接函数
    rightSidebarFn();

    
    return false;

})