jQuery(document).ready(function(){
    //主题内容切换
    $('.switch-button').click(function(){
        if($(this).hasClass('hide')) {
            $('#styleSwitcher').css({'left': 0});
            $(this).removeClass('hide');
        }else{
            $('#styleSwitcher').css({'left': '-36px'});
            $(this).addClass('hide');
        }
    });
    $('.switch-panel').on('click','li a',function(){
        $('#styleSwitcher').css({'left':'-36px'});
        $('.switch-button').addClass('hide');
    });


    //默认颜色为红色
    changeStyle('#cd5353');
    //点击切换颜色
    $('#red').click(function(){
        $('#mainCSS').attr('href', 'css/theme/red.css');
        changeStyle('#cd5353');
    });
    $('#green').click(function(){
        $('#mainCSS').attr('href', 'css/theme/green.css');
        changeStyle('#66cc33');
    });
    $('#calm').click(function(){
        $('#mainCSS').attr('href', 'css/theme/calm.css');
        changeStyle('#43cee6');
    });
    $('#positive').click(function(){
        $('#mainCSS').attr('href', 'css/theme/positive.css');
        changeStyle('#4a87ee');
    });


    $('#page').easytabs({
        animate			: true,
        updateHash		: false,
        transitionIn	:'slideDown',
        transitionOut	:'slideUp',
        animationSpeed	:800,
        tabActiveClass	:'active',
        tabs            :'#tabs > ul > li',
        transitionInEasing: 'easeOutExpo',
        transitionOutEasing: 'easeInOutExpo'
    });

    //svg图
    //设置画布宽高
    //svg绘制柱形图
    var sw= $('#innerContent').width()*0.92;
    if($(window).width()>=768) {
        var sh = sw * 0.5;
    }else{
        var sh=sw*0.8;
    }
    var padding=0;//画布内容到边界的距离
    //console.log($('#innerContent').width());
    s1.setAttribute('width',sw);
    s1.setAttribute('height',sh);
    //设置#svgBox的描边效果
    svgBox.setAttribute('width',sw-2*padding);
    svgBox.setAttribute('height',sh-2*padding);
    //设置盒子的零点坐标
    svgBox.setAttribute('x',padding);
    svgBox.setAttribute('y',padding);
    //取消box的自动填充效果,填充为透明色
    svgBox.setAttribute('fill','transparent');
    //描边
    svgBox.setAttribute('stroke','#777');


    //建立一个发送ajax请求的函数，只要切换颜色，柱状图的颜色随之改变
    function changeStyle(color){
        $.ajax({
            type:'GET',
            url:'data/skill.json',
            success:function(data){
                //console.log(data);
                var html1='';
                console.log(html1);
                for(var i=0;i<data.length;i++){
                    html1 +='<linearGradient id="g1">' +
                    '<stop offset="0" stop-color="#ffe"></stop>' +
                    '<stop offset="1" stop-color="'+color+'"></stop></linearGradient>';
                }
                $('#gra').html(html1);

                var html2='';
                for(var i=0;i<data.length;i++){
                    var w= (sw-2*padding)*(data[i].value)/10;
                    var h= (sh-2*padding)/(2*data.length+1);
                    var x= padding;
                    var y= (2*i+1)*h+padding;
                    html2 +='<rect width="'+w+'" height="'+h+'" x="'+(x+1)+'" y="'+y+'" fill="url(#g1)"></rect>' +
                    '<text stroke="#666" font-size="12" font-family="SimSum" x="'+(w+x+5)+'" y="'+(y+h/2+3)+'">'+data[i].label+'</text>'
                    ;
                }
                //console.log(html);
                $('#group-bars').html(html2);
            }
        });
    }


});