var MarketInfo = cc.Layer.extend({
    canHide : false,


    addListener:function(){
        cc.eventManager.addListener({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded

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

        var talkBg = new cc.Sprite(res.market_talk_png);
        talkBg.x = 50;
        talkBg.y = 100;
        talkBg.setScale(0);
        node.addChild(talkBg,2);

        var content = new cc.LabelTTF("去实验室看看\n需要买什么吧.","Arial",35);
        content.setColor(cc.color(0,0,0,255));
        content.opacity = 0;
        content.x = 160;
        content.y = 90;
        talkBg.addChild(content,1);
        content.runAction(cc.sequence(cc.delayTime(1.4),cc.fadeIn(0.2),cc.callFunc(function () {
            self.canHide = true;
        })));

        talkBg.runAction(cc.sequence(cc.delayTime(1.2),cc.scaleTo(0.2,1,1)))


    },

    onTouchBegan : function (touch,event) {
        return true;
    },

    onTouchEnded : function(touch,event){
        var self = event.getCurrentTarget();
        if(self.canHide){
            self.removeFromParent(true);
        }
    },

    onExit:function(){

        cc.eventManager.removeListener(this);
        this._super();
    }


});