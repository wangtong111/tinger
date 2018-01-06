/**
 * Created by tingting on 2017/10/22.
 */

var RoomLayerBrain = RoomLayer.extend({

    initOwnBg : function(node){
        var self = this;
        var delay = 0.4;
        var flagConfig = FLAG_CONFIG[self.types];
        self.lev = self.lev >  flagConfig.length ? flagConfig.length : self.lev;
        for(var i = 0 ; i < self.lev ; i++){
            var flag = new cc.Sprite(res.room_flag_png);
            flag.setPosition(flagConfig[i]);
            node.addChild(flag,4,i + 1000);
            if(i !== 0){
                delay = self.addFoot(node,flagConfig[i-1],flagConfig[i],delay);
                flag.opacity = 0;
                delay += 0.2;
                flag.runAction(cc.sequence(cc.delayTime(delay),
                    cc.spawn(cc.fadeIn(0.2),cc.sequence(cc.scaleTo(0.2,1.3),cc.scaleTo(0.1,1)))));
            }
        }
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
        cc.log("-------->" + self.lev);
        for(var i = 0; i< self.lev ;i ++){

            var flag = bg.getChildByTag(1000  + i);
            cc.log("-------------->" +flag);
            if (flag !== null) {
                var rect = flag.getBoundingBox();

                if (cc.rectContainsPoint(rect, pos)) {
                    flag.setScale(1.25);
                    self.startPos = pos;
                    self._selectLevs = i;
                    return true;
                }
            }
        }

        self.startPos = cc.p(-1000,-1000);
        return true;

    },

    onTouchMoved : function (touch,event) {

    },

    onTouchEnded : function(touch,event){
        var self = event.getCurrentTarget();
        if(self.startPos.x == -1000){
            return;
        }

        var bg = self.getChildByTag(100);
        var flag = bg.getChildByTag(1000 + self._selectLevs);
        flag.setScale(1);

        var location = touch.getLocation();
        var pos = bg.convertToNodeSpace(location);

        if (Math.abs(pos.x - self.startPos.x) > 25 || Math.abs(pos.y - self.startPos.y) > 25){
            return;
        }

        // cc.log(self._selectLevs);

        var scene = new PlayScene(self.types,self._selectLevs + 1);
        cc.director.pushScene(scene);

    }
});
