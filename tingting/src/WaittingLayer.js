var WaittingLayer = cc.Layer.extend({
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

        var wait = new cc.Sprite(res.watting_png);
        wait.setPosition(0,0);
        node.addChild(wait,2);

        wait.runAction(cc.repeatForever(cc.rotateBy(1,30)));
    },

    onTouchBegan : function (touch,event) {
        return true;
    },

    onExit:function(){
        cc.eventManager.removeListener(this);
        this._super();
    }


});

function showWatting(){


    var layer = new WaittingLayer();
    var scene =cc.director.getRunningScene();
    scene.addChild(layer,1000,11111);
}

function hideWaitting() {
    var scene =cc.director.getRunningScene();
    var layer = scene.getChildByTag(11111);
    if (layer)
        layer.removeFromParent(true);
}