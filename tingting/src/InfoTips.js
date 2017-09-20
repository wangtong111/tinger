var InfoTips = cc.Layer.extend({
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

       var popup = new cc.Sprite(res.popup_bg_png);
       popup.setPosition(0,0);
       node.addChild(popup);

       var title = new cc.LabelTTF("通知","Arial Black",50)
       title.setColor(cc.color(0,0,0,255));
       title.x = 0;
       title.y = 165;
       node.addChild(title,10);

       var content = new cc.LabelTTF(cc.formatStr(GAME_TIPS[self._tag]),"Arial",35);
       content.setColor(cc.color(0,0,0,255));
       content.setPosition(0,0);
       node.addChild(content,1);


       function onOk(){
           self.removeFromParent();
       }

       var menu = new cc.Menu();
       menu.setPosition(0,0);
       node.addChild(menu);

       var spNormal = new cc.Sprite(res.btn_ok_png);
       var spSelect = new cc.Sprite(res.btn_ok_png);

       var buyItem = new cc.MenuItemSprite(spNormal,spSelect);
       buyItem.setPosition(0,-160);
       buyItem.setAnchorPoint(0.5,0.5);
       buyItem.setCallback(onOk,this);
       menu.addChild(buyItem,1);

   },

    onTouchBegan : function (touch,event) {
        return true;
    },

    onExit:function(){
        cc.eventManager.removeListener(this);
        this._super();
    }


});