/*
 *
 * 总设定：时间使用单位毫秒
 *
 */
var testblock = document.querySelector('#test');

var defaultFontSize = 35;
/* 单个弹幕属性
 * text 文字，start 开始时间，duration 运动速度（speed?？）
 * color 字体颜色，fontFamily 字体，
 * 待解决：fontSize 字体大小，弹幕轨道问题（使用canvas？），弹幕类型（中间悬空）
 * 待添加：textShadow 字体阴影
 */
function Danmu(
  text,
  start,
  duration = 3000,
  color = '#fff',
  fontFamily = 'serif'
) {
  if (text === undefined && start === undefined && duration === undefined) {
    throw new Error('first three arguments are nessisary');
  }
  this.text = text;
  this.start = start;
  this.duration = duration;
  this.color = color;
  // getOwnPropertyDescipter?
  this.fontFamily = fontFamily;
}

/* div窗口属性，设置窗体的大小、窗体的效果属性、字幕按时间轴的放出
 * element DOM元素，DanmuArr 这个元素中的弹幕组
 * width height left top 位置、大小属性
 * rows 行数
 * opacity 透明度
 * 待添加：显示区域，屏蔽字幕，变换的div需要重新分配rows
 */
function Div(
  element = document.querySelector('#danmu'),
  DanmuArr,
  opacity = 1
) {
  if (element === undefined) {
    throw new Error('div do not exist');
  } else {
    this.element = element;
  }

  this.width = element.clientWidth;
  this.height = element.clientHeight;
  this.left = element.clientLeft;
  this.top = element.clientTop;

  this.rows = (() => {
    let temprows = [];
    for(let i = 0;i < Math.floor(this.height / defaultFontSize); ++i){
      let tempdiv = document.createElement('div');
      tempdiv.classList.add('rows');
      temprows[temprows.length] = tempdiv;
      this.element.appendChild(tempdiv);
    }
    return temprows;
  })();

  this.DanmuArr = DanmuArr.sort((a, b) => a.start - b.start); // 按时间排序弹幕组

  this.opacity = opacity;

  //let lastItem = this.DanmuArr.slice(-1)[0];
  // this.timeline = new Timeline(lastItem.start + lastItem.duration);
  this.timeline = new Timeline();

  //var tracks = document.querySelectorAll('.rows'); // 后期可能需要用js生成
  this.render = function () {
    // 初始化：
    let index = 0; // sortedDanmuArray运行到的位置
    for (let row of this.rows) row.innerHTML = '';

    // 二分查找起始index
    var ulim = DanmuArr.length - 1,
      dlim = 0,
      mid = (ulim + dlim) / 2;
    while (ulim > dlim) {
      mid = Math.ceil((ulim + dlim) / 2); //向上取整，使index取值符合timeline之后
      if (DanmuArr[mid].start < this.timeline.current) {
        dlim = mid;
      } else if (DanmuArr[mid].start > this.timeline.current) {
        ulim = mid;
      } else {
        // 相等时，向前查找符合条件的数
        while (DanmuArr[mid].start === this.timeline.current 
          && mid > 0 && --mid) {}
        break;
      }
    }
    index = mid;
    // index有问题
    console.log(index);
    // 开启时间线
    this.timeline.start();
    // 放出单个弹幕
    // DanmuItem:Danmu类 row:运行轨道的DOM元素
    var renderSingleDanmu = (DanmuItem, row) => {
      // 弹幕属性设置
      var DanmuContainer = document.createElement('div');
      DanmuContainer.innerText = DanmuItem.text;
      DanmuContainer.classList.add('rowitems'); // 使用rowitems规范化
      DanmuContainer.style = `color: ${DanmuItem.color}; font-family: ${DanmuItem.fontFamily};`; //其他属性
      // 确定位置
      DanmuContainer.style.left = this.left + this.width + 'px';

      row.appendChild(DanmuContainer);
      var speed =
        (this.width + DanmuContainer.clientWidth) / DanmuItem.duration;

      // 运动
      var left = parseFloat(DanmuContainer.style.left);
      var runId = setInterval(() => {
        if (left < -DanmuContainer.clientWidth) {
          clearInterval(runId);
          row.removeChild(DanmuContainer);
        }
        DanmuContainer.style.left = left - speed * 
          (this.timeline.current - DanmuItem.start) + 'px';
      }, 0.5);
    };

    // 异步运行的确认
    // 这里的闭包可能会很影响效率，设法提高
    var timelineId = setInterval(() => {
      var danmuPerRow = [];
      for (let i of this.rows) {
        danmuPerRow[danmuPerRow.length] = i.childElementCount; // 每行弹幕的个数
      }
      while (
        index < DanmuArr.length &&
        this.timeline.current >= DanmuArr[index].start
      ) {
        let smallestDanmuNumberIndex = danmuPerRow.indexOf(
          Math.min(...danmuPerRow)
        );
        renderSingleDanmu(DanmuArr[index], this.rows[smallestDanmuNumberIndex]); // 返回元素最少的
        ++index;
        ++danmuPerRow[smallestDanmuNumberIndex];
      }
      if (index > DanmuArr.length) {
        clearInterval(timelineId);
        this.timeline.end();
      }
    }, 0.5);
  };
}

/* 时间轴
 * 默认从0开始，结束时间可以设定
 * 可以与某个对象绑定，如video，audio，或者自己设置Timeline对象
 * 时间单位毫秒
 * 设想对象：current playrate timerid
 *
 */
function Timeline(length) {
  this.current = 0;
  if (length > 0) {
    this.length = length;
  } else {
    this.length = Infinity;
  }
  //this.playrate = 1;
  // 绑定时间类的对象
  this.bindobj = function () {};

  // 解除绑定
  this.release = function () {};

  // 开始
  this.start = () => {
    var start = Date.now();
    timerid = setInterval(() => {
      testblock.innerText = Date.now() - start;
      this.current = Date.now() - start;
      if(this.current > length){
        clearInterval(timerid);
      }
    }, 0.5);
  };

  // 结束
  this.end = function () {
    clearInterval(timerid);
  };

  // 设置当前时间
  this.setTime = function (time) {
    time = parseInt(time);
    if (time > current && time < 0) {
      current = 0;
      throw new Error('Time out of range');
    } else {
      current = time;
    }
  };
}
