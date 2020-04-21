(function($){
    // 弹幕发射实现
    $('#danmu').load(function(){

    })

    // 弹幕默认设置
/*     defaultSetting = {
        fontSize  : 16,
        color     : 'white',
        position  : 'top',
        type      : 'scroll',
        start     : 0,
        end       : 1000
    }


    function Danmu2(text = '', start = 0, end = 1000, color = '#fff', row = 1, fontSize = 16){

    } */

    // 弹幕类
/*     function Danmu(text, setting){
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
    } */


    // 填充机制应为：如果弹幕仍在入口处，则将其移到第二行，如果都满了才重叠 

    //
    function timeLineRender(Danmu){

    
    }

    function liveRender(Danmu){

    }

})(jQuery);



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

// 可以试试直接使用setTimeout运行并销毁弹幕
// 判断是否在下一行可以设置一个delay的时间，当小于这个时间时则下一行

function renderByTime(sortedDanmuArray, rows){
    sortedDanmuArray
    var run = function(DanmuItem){
        var DanmuContainer = document.createElement('div');
        DanmuContainer.classList.add('.rowitems');
        DanmuContainer.style = '';

    }
}

function renderByRealtime(){

}