var MarketInfo = cc.Layer.extend({
    _tag : -1,
    _month: 0,
    _days : 0,

    setData :function(tag,months,days) {
        this._tag = tag;
        this._month = months;
        this._days = days;

    },
    addListener:function(){
        cc.eventManager.addListener({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded,

        },this)
    },

    onEnter:function(){
        this._super();
        this.addListener();

        var self = this;
        var size = cc.winSize;

        var node = new cc.Node();
        node.x = cc.visibleRect.center.x;
        node.y = cc.visibleRect.center.y;
        self.addChild(node,3);


        var bg = new cc.Sprite(res.market_bg_jpg);
        bg.x = 0;
        bg.y = 0;
        node.addChild(bg,1);

        var person = new cc.Sprite(res.market_person_png);
        person.x = size.width/2 + 300;
        person.y = -100;
        node.addChild(person,2);
        person.runAction(cc.sequence(cc.moveTo(1,cc.p(-240,-100)),cc.moveTo(0.05,cc.p(-200,-100) )));






    },

    onTouchBegan : function (touch,event) {
        return true;
    },

    onTouchEnded : function(touch,event){
        var self = event.getCurrentTarget();
        self.removeFromParent();
    }


});