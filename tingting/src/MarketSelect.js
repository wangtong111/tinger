var MarketSelect = cc.Layer.extend({
    types : 0,
    lev : 0,
    startPos : cc.p(-1000,-1000),
    _selectGoods : -1,

    setData : function(){

       this.types = UserDataMgr.getSelectRoom();
       this.lev = UserDataMgr.getselectLev();
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
        self.setData();

        var node = new cc.Node();
        node.x = cc.visibleRect.center.x;
        node.y = cc.visibleRect.center.y;
        self.addChild(node,3,100);

        var bg = new cc.Sprite(res.market_select_bg_png);
        bg.x = 0;
        bg.y = 0;
        node.addChild(bg,1);

        var config = GOODS_CONFIG[self.types][self.lev];

        for(var i = 0; i < 9; i++) {
            var row = Math.floor(i/3);
            var col = i%3;
            var x = 260*(col- 1);
            var y = 290 - 245*(row);
            var fBg = new cc.Sprite(res.market_box_png);
            fBg.setPosition(x,y);
            node.addChild(fBg,2,i);

            var sp = new cc.Sprite(config[i]);
            sp.setPosition(x,y);
            node.addChild(sp,3,50 + i);
       }

        var menu = new cc.Menu();
        menu.setPosition(0,0);
        node.addChild(menu,10);

        function onOk(){
            var bg = self.getChildByTag(100);
            var arr = [];
            for(var i = 0; i < 9 ; i++){
                var good = bg.getChildByTag(50 + i);
                var black = good.getChildByTag(100);
                if(black){

                    arr.push(i);
                }

            }
            cc.log(arr.toString());

            UserDataMgr.setSelectGoods(arr);

            self.removeFromParent();

            var layer = new PlayBrainLayer() ;
            var scene = cc.director.getRunningScene();
            scene.addChild(layer,10);
        }

        var spNormal = new cc.Sprite(res.btn_ok_png);
        spNormal.setScale(1.4);
        var spSelect = new cc.Sprite(res.btn_ok_png);
        spSelect.setScale(1.4);

        var buyItem = new cc.MenuItemSprite(spNormal,spSelect);
        buyItem.setPosition(0,-400);
        buyItem.setAnchorPoint(0.5,0.5);
        buyItem.setCallback(onOk,this);
        menu.addChild(buyItem,1);

        var layer = new LogoTipsLayer();
        self.addChild(layer,10)
    },

    onTouchBegan : function (touch,event) {
        var self = event.getCurrentTarget();
        var bg = self.getChildByTag(100);
        var location = touch.getLocation();
        var pos = bg.convertToNodeSpace(location);

        for(var i = 0; i< 9 ;i ++){

            var goodsBg = bg.getChildByTag(i);
            var rect = goodsBg.getBoundingBox();
            if(cc.rectContainsPoint(rect,pos)) {
                // cc.log(i.toString() + pos.x.toString() + "    " + pos.y.toString());
                self.startPos = pos;
                self._selectGoods = i;
                return true
            }
        }

        self.startPos = cc.p(-1000,-1000)
        return true;
    },

    onTouchMoved : function (touch,event) {

    },

    onTouchEnded : function(touch,event){

        var self = event.getCurrentTarget();
        if(self.startPos.x == -1000){
            return
        }

        var bg = self.getChildByTag(100);
        var location = touch.getLocation();
        var pos = bg.convertToNodeSpace(location);
        if (Math.abs(pos.x - self.startPos.x) > 30 || Math.abs(pos.y - self.startPos.y) > 30){
            return;
        }

        var select = self._selectGoods;

        var good = bg.getChildByTag(50 + select);
        var black = good.getChildByTag(100);
        if(black){
            black.removeFromParent();
        }else{
            var black = new cc.LayerColor(cc.color(0,0,0,165),224,216);
            black.ignoreAnchorPointForPosition(false);
            black.setPosition(100,75);
            good.addChild(black,5,100);
        }


    },

    onExit:function(){

        cc.eventManager.removeListener(this);
        this._super();
    }


});