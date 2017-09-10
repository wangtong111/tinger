///**
// * Created by wangtong on 2017/9/10.
// */

var RoomLayer = cc.Layer.extend({
    types : 0,
    lev : 0,
    startPos : cc.p(-1000,-1000),
    _selectLevs : -1,

    setTypes : function(types,lev){

        this.types = types;
        this.lev = lev;
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

        var bgName = ROOM_CONFIG[self.types];
        var bg = new cc.Sprite(bgName);
        bg.x = 0;
        bg.y = 0;
        node.addChild(bg,1);

        var delay = 0.4;
        var flagConfig = FLAG_CONFIG[self.types];
        self.lev = self.lev >  flagConfig.length ? flagConfig.length : self.lev;
        for(var i = 0 ; i < self.lev ; i ++){
            var flag = new cc.Sprite(res.room_flag_png);
            flag.setPosition(flagConfig[i]);
            node.addChild(flag,4,i);
            if(i !== 0){
                delay = self.addFoot(node,flagConfig[i-1],flagConfig[i],delay);
                flag.opacity = 0;
                delay += 0.2;
                flag.runAction(cc.sequence(cc.delayTime(delay),
                    cc.spawn(cc.fadeIn(0.2),cc.sequence(cc.scaleTo(0.2,1.3),cc.scaleTo(0.1,1)))));
            }
        }

        var menu = new cc.Menu();
        menu.setPosition(0,0);
        node.addChild(menu,10);

        function onOk(){
            cc.director.popScene();
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

    addFoot : function(node,start,ends,delay){
        var dx = ends.x - start.x;
        var dy = ends.y - start.y;
        var atanValue = Math.atan(dy*1.0/dx);
        var rad = 360*atanValue/(Math.PI*2);
        var dis = Math.floor(Math.sqrt(dy*dy + dx*dx));
        var perDis = 26
        var counts = Math.floor(dis/perDis);

        perDis += Math.floor((dis%perDis)/counts);
        counts -= 1;
        // cc.log("==============>start");
        // cc.log("弧度"+ atanValue.toString());
        // cc.log("角度"+ rad.toString());
        // cc.log("count" + counts.toString());
        // cc.log("per_dis" + perDis.toString());
        // cc.log("cos" + Math.cos(atanValue).toString());
        // cc.log("sin" + Math.sin(atanValue));
        // cc.log("==============>ends");

        for(var i = 0 ; i < counts ; i ++){
            var name = res.foot_left_png;
            if(i%2 !== 0 ){
                name = res.foot_right_png;
            }

            var sp = new cc.Sprite(name)
            sp.x = start.x + Math.cos(atanValue)*(perDis*(i + 1));
            sp.y = start.y + Math.sin(atanValue)*(perDis*(i + 1));
            // cc.log("x = ",sp.x.toString());
            // cc.log("y = ",sp.y.toString());
            sp.opacity = 0;
            sp.runAction(cc.sequence(cc.delayTime(delay + i*0.2),cc.fadeIn(0.2)));
            node.addChild(sp,2);

        }

        return delay + counts*0.2;
    },

    onTouchBegan : function (touch,event) {
        var self = event.getCurrentTarget();
        var bg = self.getChildByTag(100);
        var location = touch.getLocation();
        var pos = bg.convertToNodeSpace(location);

        for(var i = 0; i< self.lev ;i ++){

            var flag = bg.getChildByTag(i);
            var rect = flag.getBoundingBox();
            if(cc.rectContainsPoint(rect,pos)) {
                flag.setScale(1.25);
                self.startPos = pos;
                self._selectLevs = i;
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
        var flag = bg.getChildByTag(self._selectLevs);
        flag.setScale(1);

        var location = touch.getLocation();
        var pos = bg.convertToNodeSpace(location);

        if (Math.abs(pos.x - self.startPos.x) > 25 || Math.abs(pos.y - self.startPos.y) > 25){
            return;
        }

        cc.log(self._selectLevs);

    },

    onExit:function(){

        cc.eventManager.removeListener(this);
        this._super();
    }


});

var RoomScene = cc.Scene.extend({

    ctor:function(types,lev){
        this._super();
        var layer = new RoomLayer();
        layer.setTypes(types,lev);
        this.addChild(layer);
    }

});