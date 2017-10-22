var PlayLayerBase = cc.Layer.extend({

    types : 0,
    lev : 0,
    _content : null,

    onEnter : function(){
        var self = this;
        self._super();

        var node = new cc.Node();
        node.x = cc.visibleRect.center.x;
        node.y = cc.visibleRect.center.y;
        self.addChild(node,1);
        self._content = node;

        var bgLayer = new cc.LayerColor(cc.color(255, 255, 255, 255),1167,660);
        bgLayer.ignoreAnchorPointForPosition(false);
        bgLayer.setPosition(0,-5);
        node.addChild(bgLayer);

        var bar = new cc.Sprite(res.play_bar_png);
        bar.setPosition(0,390);
        node.addChild(bar,5);

        self.types = UserDataMgr.getSelectRoom();
        self.lev = UserDataMgr.getselectLev();

        var selectGoods = UserDataMgr.getSelectGoods();
        var config = GOODS_CONFIG[self.types][self.lev];
        for(var i = 0 ; i< selectGoods.length ; i++){
            var sp = new cc.Sprite(config[selectGoods[i]]);
            sp.setPosition(130*i + 80,52);
            sp.setScale(0.55);
            bar.addChild(sp,1,100000 + selectGoods[i]);

        }


        var menu = new cc.Menu();
        menu.setPosition(0,0);
        node.addChild(menu,10);

        var backItem = new cc.MenuItemFont("回超市",self.onBack,self);
        backItem.setFontSize(40);
        // backItem.setFontColor(cc.color(0,0,0,255));
        backItem.setFontName("Arial Black");
        backItem.setPosition(1250 - 800,390);
        menu.addChild(backItem);

        function onOk(){
           self.onOk();
        }

        var spNormal = new cc.Sprite(res.btn_ok_png);
        spNormal.setScale(1.4);
        var spSelect = new cc.Sprite(res.btn_ok_png);
        spSelect.setScale(1.4);

        var buyItem = new cc.MenuItemSprite(spNormal,spSelect);
        buyItem.setPosition(0,-410);
        buyItem.setAnchorPoint(0.5,0.5);
        buyItem.setCallback(onOk,this);
        menu.addChild(buyItem,1);

    },

    onBack : function(){
        var self = this;
        var layer = new MarketSelect();
        var scene = cc.director.getRunningScene();
        scene.addChild(layer,5);
        self.removeFromParent();
    },

    onOk : function(){

        cc.log("i am PlayLayerBase onOk");
    },

    updateLevs : function () {
        var selectRoomId = UserDataMgr.getSelectRoom();
        var selectLevId = UserDataMgr.getselectLev();

        var roomid = UserDataMgr.roomid;
        var levid = UserDataMgr.levid;
        if(selectRoomId < roomid || selectLevId < levid ){
            cc.log("没有完成新的房间");
            return;
        }

        if(levid >= FLAG_CONFIG[roomid].length){
            if (FLAG_CONFIG.hasOwnProperty(roomid)){
                UserDataMgr.roomid += 1;
                UserDataMgr.levid = 1;
            }
        }else{
            UserDataMgr.levid += 1;
        }

        var data = {}
        data["levid"] = UserDataMgr.levid;
        data["roomid"] = UserDataMgr.roomid;
        data["id"] = UserDataMgr.id;

        function callback(cbData){
            if(cbData != null && cbData["code"] == 1){
                return;
            }

            var cb = callback.bind(this);
            sendRequest(data,cb);
        };

        var cb = callback.bind(this);

        sendRequest(data,cb);

    }
});