var LobbyLayer = cc.Layer.extend({/**/

    onEnter : function () {
        var self = this;
        self._super();

        var centerPos = cc.visibleRect.center;

        var unLock = UserDataMgr.roomid;
        var bg = new cc.Sprite(res.lobby_bg_jpg);
        bg.setPosition(centerPos);
        self.addChild(bg);

        var menu = new cc.Menu();
        menu.setPosition(0,0);
        self.addChild(menu,1);

        var posArr = [840,485,920,335,495,350,1060,485,1370,325,260,335];

        function onPlay(tag,sender){
            sender._enabled = false;
            sender.runAction(cc.sequence(cc.delayTime(0.8),cc.callFunc(function () {
                sender._enabled = true;
            })));

            cc.log("-------------")
            cc.log(unLock);
            cc.log(tag);
            cc.log("---------------")
            if(tag <= unLock){

                if(tag == 0 ){
                    var layer = new MarketInfo();
                    self.addChild(layer,50);
                    return;
                }

                if(unLock != tag){

                    var layer = new CompleteTips();
                    layer.setData(3);
                    layer.setContent("你已经完成本实验室全部关卡！");
                    this.addChild(layer,100);
                    return;
                }


                if(unLock > 3){

                    var layer = new InfoTips();
                    layer.setData(tag,11,22);
                    layer.setPosition(0,0);
                    self.addChild(layer,50);
                    return;
                }


                // var layer = new MarketSelect();
                // layer.setTypes(tag);
                // self.addChild(layer,50);
                var lev = UserDataMgr.levid;
                if (tag < unLock){
                    lev = FLAG_CONFIG[tag].length;

                }

                var scene = new RoomScene(tag,lev);
                cc.director.pushScene(scene);

                //var layer = new Exp1Entrance();
                //layer.setTypes(tag);
                //self.addChild(layer,50);

            }else{


                var layer = new InfoTips();
                layer.setData(tag,11,22);
                layer.setPosition(0,0);
                self.addChild(layer,50);
            }

        }

        for(var i = 0 ; i< posArr.length/2 ;i++){
            var name = res.play_btn_png;
            if (i == 0){

            }else if(unLock != i){
                name = res.lock_btn_png;
            }else if(unLock > 3){
                name = res.lock_btn_png;

            }
            var spNormal = new cc.Sprite(name);
            var spSelect = new cc.Sprite(name);
            spSelect.setColor(cc.color(125,125,125));
            spSelect.setOpacity(180);

           var item  = new cc.MenuItemSprite(spNormal,spSelect);
           item.setPosition(posArr[i*2],posArr[i*2 + 1]);
           var func = onPlay.bind(this,i);
           item.setCallback(func,this);
           menu.addChild(item,3);
        }
    },

    onExit : function(){

        this.removeFromParent(true);
        this._super();
    }
});





var LobbyScene = cc.Scene.extend({

    ctor:function(){
        this._super();
    },

    onEnter : function () {
        this._super();

        var layer = new LobbyLayer();
        this.addChild(layer);
    }

});