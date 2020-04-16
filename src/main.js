(function($){
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

    function render(Danmu){

    }

})(jQuery)



