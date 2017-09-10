///**
// * Created by wangtong on 2017/9/10.
// */

var Exp1Entrance = cc.Layer.extend({
    types : 0,
    startPos : cc.p(-1000.-1000),

    setTypes : function(types){

        this.types = types;
    },

    addListener:function(){
        cc.eventManager.addListener({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded

        },this)
    },

    onEnter : function () {
        var self = this;
        self._super();
        self.addListener();

        var node = new cc.Node();
        node.x = cc.visibleRect.center.x;
        node.y = cc.visibleRect.center.y;
        self.addChild(node,3,100);

        var bg = new cc.Sprite(res.house1_bg_jpg);
        bg.x = 0;
        bg.y = 0;
        node.addChild(bg,1);

        var menu = new cc.Menu();
        menu.setPosition(0,0);
        node.addChild(menu,10);

        function onOk(){
            var bg = self.getChildByTag(100);
            self.removeFromParent();
        }

        var spNormal = new cc.Sprite(res.btn_back_png);
        spNormal.setScale(1.4);
        var spSelect = new cc.Sprite(res.btn_back_png);
        spSelect.setScale(1.4);

        var buyItem = new cc.MenuItemSprite(spNormal,spSelect);
        buyItem.setPosition(0,-400);
        buyItem.setAnchorPoint(0.5,0.5);
        buyItem.setCallback(onOk,this);
        menu.addChild(buyItem,1);

    },


    onTouchBegan : function (touch,event) {

    },

    onTouchMoved : function (touch,event) {

    },

    onTouchEnded : function(touch,event){

    },

    onExit:function(){

        cc.eventManager.removeListener(this);
        this._super();
    }


});