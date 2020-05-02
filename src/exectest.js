var div = document.querySelector('#danmu'),
DanmuArr = [
  new Danmu('test',0000,1000,'#000'),
  new Danmu('test',0000,2000,'#000'),
  new Danmu('test',0000,1000,'#000'),
  new Danmu('test',0000,2000,'#000'),
  new Danmu('test',0000,1000,'#000'),
]
DanmuObj = new Div(div,DanmuArr);
DanmuObj.render();