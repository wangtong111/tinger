var PlayPointsLayer = PlayLayerBase.extend({
    responseRect:null,
    selectTypes : -1,
    canTouchBtn : false,

    addListeners : function(points){

        cc.eventManager.addListener({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this)

        },points);

    },

    onEnter:function () {
        var self = this;
        self._super();

        var selectGoods = UserDataMgr.getSelectGoods();

        if(selectGoods.length != 2){
            self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                alert("选择物品数目不对，请返回超市重新选择。");
            })));
            return;
        }

        for(var i = 0 ; i< selectGoods.length ; i++){
            if(selectGoods[i] != 0 && selectGoods[i] != 6){
                self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                    alert("选择物品有误，请返回超市重新选择。");
                })));
                return;
            }
        }

        var points1 = new cc.Sprite(res.market_fourpoints_png);
        points1.setPosition(0,0)
        self._content.addChild(points1,10,2000)

        var points2 = new cc.Sprite(res.market_fourpoints_png);
        points2.setPosition(300,0)
        self._content.addChild(points2,10,3000)

        self.addListeners(points1)
        self.addListeners(points2)

        self.responseRect = [cc.rect(-35,-80,50,200),cc.rect(-150,-80,50,200),cc.rect(95,-80,50,200)];

        // var bgLayer = new cc.LayerColor(cc.color(255, 0, 0, 180),50,200);
        // bgLayer.setPosition(-35,-80);
        // self._content.addChild(bgLayer,20);
        //
        // bgLayer = new cc.LayerColor(cc.color(255, 0, 0, 180),50,200);
        // bgLayer.setPosition(-150,-80);
        // self._content.addChild(bgLayer,20);
        //
        // bgLayer = new cc.LayerColor(cc.color(255, 0, 0, 180),50,200);
        // bgLayer.setPosition(95,-80);
        // self._content.addChild(bgLayer,20);
    },

    onTouchBegan : function (touch,event) {
        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var size = target.getContentSize();
        var rect = cc.rect(0,0,size.width,size.height);
        if(cc.rectContainsPoint(rect,location)){
            return true;
        }

        return false;
    },

    onTouchMoved : function (touch,event) {
        var target = event.getCurrentTarget();
        var delta = touch.getDelta();

        target.x += delta.x;
        target.y += delta.y;

        for(var i = 0; i < 3; i++ ){
            var rects = this.responseRect[i];
            if(cc.rectContainsPoint(rects,target)){

                var node = this._content.getChildByTag(1000 + i);
                if(node){
                    return true;
                }

                for(var j = 0; j < 3 ; j++){
                    var node = this._content.getChildByTag(1000 + j);
                    if(node){
                        node.removeFromParent();
                    }
                }

                this.selectTypes = i;
                var node = new cc.LayerColor(cc.color(255, 0, 0, 180),50,200);
                node.setPosition(rects.x,rects.y);
                this._content.addChild(node,12,1000 + i);
                return;
            }
        }

        this.selectTypes = -1;

        for(var j = 0; j < 3 ; j++){
            var node = this._content.getChildByTag(1000 + j);
            if(node){
                node.removeFromParent();
            }
        }
    },


    onTouchEnded : function(touch,event){
        if(this.selectTypes < 0){
            var target = event.getCurrentTarget();

            var points = this._content.getChildByTag(2000);
            if(points == target){
                points.setPosition(0,0);
            }

            var points = this._content.getChildByTag(3000);
            if(points == target){
                points.setPosition(300,0);
            }

            this.canTouchBtn = false;
            return;
        }

        this.canTouchBtn = true;
    },

    onOk : function(){
        if (this.canTouchBtn){
            if(this.selectTypes == 0){
                var layer = new CompleteTips();
                layer.setData(1);
                this.addChild(layer,100);
                // alert("right");
                return;
            }

            var layer = new CompleteTips();
            layer.setData(2);
            this.addChild(layer,100);
            // alert("error");
            return;
        }

        alert("请先完成实验。");
        // cc.log("i am PlayBrainLayer onOk");
    },

    onExit:function(){

        cc.eventManager.removeListener(this);
        this._super();
    }
});