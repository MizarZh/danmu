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
var tracks = document.querySelectorAll('.rows'); // 后期可能需要用js生成
var maxRow = 4; // 最大行数为4
function json2Danmu(){

}

function Danmu(text, start, duration = 3, color = '#fff', fontSize = 16){
    if(text === undefined && start === undefined && duration === undefined) 
    {throw new Error('first three arguments are nessisary');}
    this.text = text;
    this.start = start;
    this.duration = duration;
    this.color = color;
    this.fontSize = fontSize;
}



function renderByTime(sortedDanmuArray, rows){
    // sortedDanmuArray为按照时间线排序好的Danmu类数组
    var timeline = 0,   // 时间线
    currentRow = 1, // 目前弹幕所在行数
    index = 0;      // sortedDanmuArray运行到的位置
    timelineStart = Date.now()

    var init = function(newtimeline){
        // 清楚所有弹幕元素并初始化参数
        for(let rows of document.querySelectorAll('.rows')) rows.innerHTML = '';
        timeline = newtimeline,currentRow = 1,index = 0,timelineStart = Date.now();

        // 二分查找起始index


        // 
    }

    var renderSingleDanmu = function(DanmuItem, row){
        // 属性设置
        var DanmuContainer = document.createElement('div');
        DanmuContainer.innerText = DanmuItem.text;
        DanmuContainer.classList.add('rowitems');  // 使用rowitems规范化
        DanmuContainer.style = 
        `color : ${DanmuItem.color}; font-size : ${DanmuItem.fontSize};`;  //其他属性

        // 确定位置
        DanmuContainer.style.left = div.clientLeft + div.clientWidth + 'px';
        //速度值仍不准
        var speed = (div.clientLeft + div.clientWidth - div.clientLeft - DanmuContainer.clientWidth)
            / DamuItem.duration;
        row.appendChild(DanmuContainer);

        // 运动
        var runId = setInterval(function(){
            left = parseFloat(DanmuContainer.style.left)
            if(left < -DanmuContainer.clientWidth) {
                clearInterval(runId); 
                div.querySelectorAll('.rows')[row-1].remove(DanmuContainer)
            }
            DanmuContainer.style.left = left - speed + 'px';
        },1)
    }

    // 更新时间线并放置弹幕
    var timelineId = setInterval(function(){
        timeline = Date.now() - timelineStart; 
        var danmuPerRow;
        while(timeline > sortedDanmuArray[index]){
            for(let i of tracks){
                danmuPerRow[danmuPerRow.length] = i.childElementCount; // 每行弹幕的个数
            }
            renderSingleDanmu(sortedDanmuArray[index], 
                tracks[ [...tracks].indexOf(Math.min(danmuPerRow))] ); // 返回元素最少的
            ++index;
        }
        if(index > sortedDanmuArray.length) clearInterval(timelineId);
    },1)

}

function renderByRealtime(){

}

// 测试用

var div = document.querySelector('#danmu');
var timelineStart = Date.now();
var duration = 7000; // 不准
DanmuContainer = document.querySelectorAll('.rowitems')[0];
DanmuContainer.style.left = div.clientLeft + div.clientWidth + 'px';
var speed = (div.clientWidth + DanmuContainer.clientWidth) / (duration / 10);
var runId = setInterval(function(){
    left = parseFloat(DanmuContainer.style.left)
    if(left < -DanmuContainer.clientWidth) {
        document.querySelectorAll('.rows')[0].removeChild(DanmuContainer);
        clearInterval(runId);
    }
    DanmuContainer.style.left = left - speed + 'px';
    
},1)