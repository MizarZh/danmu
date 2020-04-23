/* (function($){
    // 弹幕发射实现
    $('#danmu').load(function(){

    })

    // 弹幕默认设置
    defaultSetting = {
        fontSize  : 16,
        color     : 'white',
        position  : 'top',
        type      : 'scroll',
        start     : 0,
        end       : 1000
    }


    function Danmu2(text = '', start = 0, end = 1000, color = '#fff', row = 1, fontSize = 16){

    }

    // 弹幕类
    function Danmu(text, setting){
        if(this instanceof Danmu){
            if(setting === void 0){
                this.setting = defaultSetting;
            }else{
                this.setting = setting;
            }
            this.text = text;
        }else{
            return new Danmu(text, setting);
        }
        return this;
    }


    // 填充机制应为：如果弹幕仍在入口处，则将其移到第二行，如果都满了才重叠 

    //
    function timeLineRender(Danmu){

    
    }

    function liveRender(Danmu){

    }

})(jQuery); */



var div = document.querySelector('#danmu');
var start = Date.now();

function json2Danmu(){

}

function Danmu(text, start, duration = 3, color = '#fff', fontSize = 16){
    if(text === undefined && start === undefined && duration === undefined) 
    throw new Error('first three arguments are nessisary');
    this.text = text;
    this.start = start;
    this.duration = duration;
    this.color = color;
    this.fontSize = fontSize;
}

// 判断是否在下一行可以设置一个delay的时间，当小于这个时间时则下一行

function renderByTime(sortedDanmuArray, rows){
    var DanmuItem = sortedDanmuArray[0];
    var delay;
    var timeline;
    var timelineId = setInterval(function(){
        timeline = Date.now() - start;
    },1)
    var run = function(DanmuItem){
        var DanmuContainer = document.createElement('div');
        DanmuContainer.innerText = DanmuItem.text; // 赋值
        DanmuContainer.classList.add('rowitems');  // 使用rowitems规范化
        DanmuContainer.style = '';  //这里加其他属性
        DanmuContainer.style.left = div.clientLeft + div.clientWidth + 'px';
        var speed = (div.clientLeft + div.clientWidth - div.clientLeft - DanmuContainer.clientWidth)
            / DamuItem.duration;
        div.querySelectorAll('.rows')[rows-1].appendChild(DanmuContainer);
        var runId = setInterval(function(){
            left = parseFloat(DanmuContainer.style.left)
            if(left < -DanmuContainer.clientWidth) {clearInterval(runId); } // 还需要加一个移除元素
            DanmuContainer.style.left = left - speed + 'px';
        },2)
    }
}

function renderByRealtime(){

}

// 测试用

var div = document.querySelector('#danmu');
var start = Date.now();
var duration = 1000;
DanmuContainer = document.querySelector('.rowitems');
DanmuContainer.style.left = div.clientLeft + div.clientWidth + 'px';
var speed = (div.clientWidth + DanmuContainer.clientWidth) / duration;
var runId = setInterval(function(){
    left = parseFloat(DanmuContainer.style.left)
    if(left < -DanmuContainer.clientWidth) {
        clearInterval(runId);
        document.querySelectorAll('.rows')[0].removeChild(DanmuContainer);
    }
    DanmuContainer.style.left = left - speed + 'px';
    
},1)