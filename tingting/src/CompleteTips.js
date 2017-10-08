var CompleteTips = cc.Layer.extend({
    _types: -1,
    cb : null,
    content : "",
    setData :function(types) {
        this._types = types;

    },

    setCallback : function(cb){
      this.cb = cb;
    },

    setContent : function(content){

        this.content = content;
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

        //var name ;
        var content = this.content;
       // var name = "恭喜过关";
       // var content = "请继续闯关。";
       // if(self._types === 2){
       //     name = "失败";
       //     content = "大侠请重新来过。";
       // }else  if(self._types == 3){

        //    name = "";
          //  content = "请继续游戏。";
        //}

        //var title = new cc.LabelTTF(name,"Arial Black",50)
        //title.setColor(cc.color(0,0,0,255));
        //title.x = 0;
        //title.y = 165;
        //node.addChild(title,10);

        var content = new cc.LabelTTF(content,"Arial",35);
        content.setColor(cc.color(0,0,0,255));
        content.setPosition(0,0);
        node.addChild(content,1);


        function onOk(){

            if(self._types === 1){
                var parent = self.getParent();
                parent.removeAllChildren(true)
                parent.removeFromParent(true);

                cc.director.popScene();
            }
            if(self._types === 2){
                var parent = self.getParent();
                parent.removeAllChildren(true)
                parent.removeFromParent(true);

                var layer = new DocLayer();
                var scene = cc.director.getRunningScene();
                scene.addChild(layer,1);
                return
            }else if(self._types === 3){
                self.removeFromParent(true);

                if(self.cb)
                    self.cb()
                return;
            }else if(self._types === 4){

                var parent = self.getParent();
                parent.removeAllChildren(true)
                parent.removeFromParent(true);

                cc.director.popScene();
                cc.director.popScene();

            }


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