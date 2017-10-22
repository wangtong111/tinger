/**
 * Created by wangtong on 2017/10/22.
 */

var RoomLayerChild = RoomLayer.extend({

    initOwnBg : function(node){
        var self = this;

        var menu = new cc.Menu();
        menu.setPosition(0,0);
        node.addChild(menu,10);

        function onTouch(tag,sender){
            cc.director.popScene();
            var scene = new PlayScene(self.types,tag);
            cc.director.pushScene(scene);
        }

        var flagConfig = FLAG_CONFIG[self.types];
        self.lev = self.lev >  flagConfig.length ? flagConfig.length : self.lev;

        for(var i = 0 ; i< self.lev ; i++){
            var spNormal = new cc.Sprite(res.room_baby_png);
            var spSelect = new cc.Sprite(res.room_baby_png);
            if(i == 2){
                spNormal.setFlippedX(true);
                spSelect.setFlippedX(true);
            }

            var buyItem = new cc.MenuItemSprite(spNormal,spSelect);
            buyItem.setPosition(flagConfig[i]);
            buyItem.setAnchorPoint(0.5,0.5);
            buyItem.setCallback(onTouch.bind(this,i+ 1),this);
            menu.addChild(buyItem,1);
            buyItem.setOpacity(0);

            buyItem.runAction(cc.sequence(cc.delayTime(i*0.2),cc.fadeIn(0.2)));
        }
    }


}) ;