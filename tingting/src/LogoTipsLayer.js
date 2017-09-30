var LogoTipsLayer = cc.Layer.extend({
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

        var bgLayer = new cc.LayerColor(cc.color(0, 0, 0, 100),size.width,size.height);
        bgLayer.ignoreAnchorPointForPosition(false);
        bgLayer.setPosition(0,0);
        node.addChild(bgLayer);

        var logo = new cc.Sprite(res.play_logo_png);
        logo.setPosition(800 +150,0);
        node.addChild(logo,10);
        logo.runAction(cc.sequence(cc.moveTo(0.5,cc.p(-40,0)),cc.moveTo(0.05,cc.p(-600,-100))));

        var talkBg = new cc.Sprite(res.popup_bg_png);
        talkBg.x =0;
        talkBg.y = 100;
        talkBg.setScale(0);
        node.addChild(talkBg,10);
        talkBg.runAction(cc.sequence(cc.delayTime(0.7),cc.scaleTo(0.2,1,1)));

        var rooms = UserDataMgr.getSelectRoom();
        var levs = UserDataMgr.getselectLev();
        var content = new cc.LabelTTF(MARKET_LABEL[rooms][levs],"Arial",32);
        content.setColor(cc.color(0,0,0,255));
        content.opacity = 0;
        content.x = 440;
        content.y = 300;
        talkBg.addChild(content,10);
        content.runAction(cc.sequence(cc.delayTime(0.9),cc.fadeIn(0.2),cc.callFunc(function () {
            self.canHide = true;
        })));


    },

    onTouchBegan : function (touch,event) {
        return true;
    },

    onTouchEnded : function(touch,event){
        var self = event.getCurrentTarget();
        if(self.canHide){
            self.removeFromParent();
        }
    },

    onExit:function(){

        cc.eventManager.removeListener(this);
        this._super();
    }




});