/**
 * Created by wangtong on 2017/11/5.
 */
/**
 * Created by wangtong on 2017/11/5.
 */
var PlayLayerMouse3 = PlayLayerBase.extend({
    responseRect:null,
    nowStep : 0,
    canTouchBtn : false,

    animalTalk : ["每天换玩具的时候，研究者会把丰富组的小鼠\n拿出来再放回去，这样它们会受到更多的抚摸。那么，\n它们更发达的大脑到底是由丰富环境造成的，还是由\n这种抚摸造成的呢？比较小鼠的大脑皮层时，\n若想排除抚摸造成的干扰，有两种方法。你能把\n它们都表现出来吗？",
        "现在，研究者们想研究，\n抚摸对小鼠的大脑皮层到底有没有影响。\n这样，研究者应该比较什么条件下的小鼠\n的脑皮层，应该不应该给它们抚摸呢？\n你能把它表现出来吗？"],

    movePos : [3,-1,-1,-1,-1,-1],
    handPos : [-1,-1,-1,-1,-1,-1],

    addListeners : function(card){

        cc.eventManager.addListener({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this)

        },card);

    },

    onEnter:function () {
        var self = this;
        self._super();

        var selectGoods = UserDataMgr.getSelectGoods();

        if(selectGoods.length != 4){
            self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                alert("选择物品数目不对，请返回超市重新选择。");
            })));
            return;
        }

        for(var i = 0 ; i< selectGoods.length ; i++){
            if(selectGoods[i] !== 4 && selectGoods[i] !== 5 && selectGoods[i] !== 7 && selectGoods[i] !== 6){
                self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                    alert("选择物品有误，请返回超市重新选择。");
                })));
                return;
            }
        }

        LogData.setGameStartTime(Date.parse(new Date()));

        var node = new cc.Node();
        node.setPosition(0,0);
        self._content.addChild(node,1,10000);

        this.movePos = [3,-1,-1,-1,-1,-1];
        this.handPos = [-1,-1,-1,-1,-1,-1];

        var nameArr = [res.play_mouse_pinfa,res.play_mouse_pinfa,res.play_mouse_fengfu,res.play_mouse_fengfu,res.play_mouse_shiyanshi,res.play_mouse_shiyanshi];

        for(var i = 0 ; i < 6 ;i++){
            if(i !== 3) {
                var name = nameArr[i];
                var card = new cc.Sprite(name);
                card.setPosition(-500 + 110 * (i % 2), 250 - 150 * Math.floor(i / 2));
                self._content.addChild(card, 4, i);
                self.addListeners(card);
            }


            var weight = new cc.Sprite(res.play_weight);
            weight.setPosition(-150 + 180*(i%3),60 - 220*Math.floor(i/3));
            node.addChild(weight);
        }

        var label = new cc.LabelTTF("无论哪种方法，对小鼠脑皮层的比较都不会受到抚摸的干扰了。","Arial Bold",30);
        label.setColor(cc.color(0,0,0,255));
        label.setPosition(0,-280);
        node.addChild(label);

        var label = new cc.LabelTTF("方法1：","Arial Bold",30);
        label.setColor(cc.color(0,0,0,255));
        label.setPosition(-260,60);
        node.addChild(label);

        var label = new cc.LabelTTF("方法2：","Arial Bold",30);
        label.setColor(cc.color(0,0,0,255));
        label.setPosition(-260,-160);
        node.addChild(label);


        var handBg = new cc.Sprite(res.play_handsframe);
        handBg.setPosition(450,0);
        handBg.setScale(0.5);
        self._content.addChild(handBg,1);

        for(var i = 0 ; i < 4 ;i++){
            var hand = new cc.Sprite(res.market3_hand);
            hand.setScale(0.4);
            hand.setPosition(400 + 90*(i%2), 45 - 70* Math.floor(i/2));
            self._content.addChild(hand,8,10 + i);
            self.addListeners(hand);
        }


        var sp = new cc.Sprite(res.play_mouse_fengfu);
        sp.setPosition(650 - 800,620 - 450);
        node.addChild(sp,1);

        var hand = new cc.Sprite(res.market3_hand);
        hand.setScale(0.4);
        hand.setPosition(670 - 800,625 - 450);
        node.addChild(hand,8,10 + i);






        var logo = new cc.Sprite(res.play_logo_png);
        logo.setPosition(-550,-230);
        self._content.addChild(logo,2);

        self.addSpeak(0);
        self.responseRect = [cc.rect(600 - 800,545 - 450,120,120),cc.rect(780 - 800,545 - 450,120,120),cc.rect(960 - 800,545 - 450,120,120),
                             cc.rect(600 - 800,325 - 450,120,120),cc.rect(780 - 800,325 - 450,120,120),cc.rect(960 - 800,325 - 450,120,120)];
        //for(var i = 0 ; i< 6 ;i++){
        //    var bgLayer = new cc.LayerColor(cc.color(0, 0, 0, 180),120,120);
        //    var x = self.responseRect[i].x;
        //    var y = self.responseRect[i].y;
        //    bgLayer.setPosition(x,y);
        //    self._content.addChild(bgLayer,20);
        //}
    },

    addSpeak : function(levs){
        this.nowTime = Date.parse(new Date());
        var self = this;
        var speak1 = new cc.Sprite(res.play_speak_png);
        speak1.setPosition(-350,0);
        self._content.addChild(speak1,12,5000 + 100);
        speak1.setScale(0);
        speak1.runAction(cc.scaleTo(0.2,1.4,1.4));

        var content = new cc.LabelTTF(this.animalTalk[levs],"Arial",14);
        content.setColor(cc.color(0,0,0,255));
        content.opacity = 0;
        content.x = 160 + 125;
        content.y = 90 + 125;
        speak1.addChild(content,10);
        content.runAction(cc.sequence(cc.delayTime(0.2),cc.fadeIn(0.2)));
    },

    onTouchBegan : function (touch,event) {
        if(this.nowTime == 0){
            // alert("至少阅读10秒，请仔细看下线索哦。");
            return ;
        }

        console.log("----->"+JSON.stringify(touch.getLocation()));

        var startTime = this.nowTime;
        var nowTime = Date.parse(new Date());
        if((nowTime - startTime)/1000 <= 10){
            alert("至少阅读10秒，请仔细看下线索哦。");
            return ;

        }

        var speak = this._content.getChildByTag(5100);
        if(speak){
            speak.removeFromParent(true);
        }

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
        var tTag = target.getTag();
        for(var i = 1; i < 6; i++ ){

            var rects = this.responseRect[i];
            if(cc.rectContainsPoint(rects,target)){
                if(tTag < 10){
                    if(this.movePos[i] !== -1){
                        return;
                    }
                }


                var node = this._content.getChildByTag(1000 + i);
                if(node){
                    return true;
                }

                for(var j = 0; j < 6 ; j++){
                    var node = this._content.getChildByTag(1000 + j);
                    if(node){
                        node.removeFromParent(true);
                    }
                }

                if(tTag < 10){
                    this.movePos[i] = tTag;
                }
                else{
                    this.handPos[i] = tTag
                }

                var node = new cc.LayerColor(cc.color(0, 255, 255, 180),120,120);
                node.setPosition(rects.x,rects.y);
                this._content.addChild(node,2,1000 + i);
                return;
            }
        }

        for(var i = 0 ; i< 6 ; i++){

            if(this.movePos[i] === tTag || this.handPos[i] === tTag ){
                if(tTag < 10){
                    this.movePos[i] = -1;
                }else{
                    this.handPos[i] = -1;
                }

                var node = this._content.getChildByTag(1000 + i);
                if(node){
                    node.removeFromParent();
                }
                return;
            }
        }
    },


    onTouchEnded : function(touch,event){
        var target = event.getCurrentTarget();

        var flag = true;
        for(var i = 0 ; i< 6 ; i++){
            if(this.movePos[i] === target.getTag() || this.handPos[i] === target.getTag()){
                flag = false;
                var node = this._content.getChildByTag(1000 + i);
                if(node){
                    node.removeFromParent();
                }
                break;
            }

        }

        if(flag){
            var i = target.getTag( );
            if (i < 10){
                target.setPosition(-500 + 110 * (i % 2), 250 - 150 * Math.floor(i / 2));
            }else{
                i -= 10;
                target.setPosition(400 + 90*(i%2), 45 - 70* Math.floor(i/2));
            }
        }

        //for(var i = 0 ; i < 9 ; i++){
        //    if(this.movePos[i] < 0){
        //        this.canTouchBtn = false;
        //        return;
        //    }
        //}


        this.canTouchBtn = true;
    },

    onOk : function(){
        // if (this.canTouchBtn){
        if (this.checkGame() == true){
            var self = this;

            function continueGame(){
                self.movePos = [-1,-1,-1,-1,-1,-1];
                self.handPos = [-1,-1,-1,-1,-1,-1];

                self.nowStep += 1;

                var node = self._content.getChildByTag(10000);
                if(node){
                    node.removeFromParent();
                }

                for(var i = 0 ; i< 6 ; i++){
                    var node = self._content.getChildByTag(1000 + i);
                    if(node){
                        node.removeFromParent();
                    }

                    var sp = self._content.getChildByTag(i);
                    if(sp){
                        if(i == 1){
                            sp.removeFromParent();
                        }else{
                            sp.setPosition(-500 + 110 * (i % 2), 250 - 150 * Math.floor(i / 2));
                        }

                    }

                    var sp = self._content.getChildByTag(10 + i);
                    if(sp){
                        sp.setPosition(400 + 90*(i%2), 45 - 70* Math.floor(i/2));
                    }

                }

                //var name = res.play_mouse_fengfu;
                //var card = new cc.Sprite(name);
                //card.setPosition(-500 + 110 * (3 % 2), 250 - 150 * Math.floor(3 / 2));
                //self._content.addChild(card, 4, i);
                //self.addListeners(card);


                for(var i = 0 ; i < 2 ; i++){
                    var weight = new cc.Sprite(res.play_weight);
                    weight.setPosition(-150 + 300*i,60);
                    self._content.addChild(weight);
                }

                self.responseRect = [cc.rect(-1200,-200,0,0),cc.rect(-200,130,120,120),cc.rect(100,130,120,120),
                    cc.rect(-1200,-200,0,0),cc.rect(-1200,-200,0,0),cc.rect(-1200,-200,0,0)];
                //for(var i = 0 ; i< 6 ;i++){
                //    var bgLayer = new cc.LayerColor(cc.color(0, 0, 0, 180),120,120);
                //    var x = self.responseRect[i].x;
                //    var y = self.responseRect[i].y;
                //    bgLayer.setPosition(x,y);
                //    self._content.addChild(bgLayer,20);
                //}



                self.addSpeak(self.nowStep);
            }

            if(self.nowStep < 1){
                var cb = continueGame.bind(this);
                var layer = new CompleteTips();
                layer.setData(3);
                layer.setContent("太棒了！操作正确！");
                layer.setCallback(cb);
                this.addChild(layer,100);
                return;
            }

            self.updateData(true);
            return;
        }

        this.updateData(false);
    },

    updateData : function(result){
        var callback = function(cbData){
            hideWaitting();
            if(cbData != null && cbData["code"] == 1){
                LogData.clean();

                if(result == true){
                    this.updateLevs();
                    var layer = new CompleteTips();
                    layer.setData(4);
                    layer.setContent("恭喜你，成功完成第三篇文献的全部关卡！\n");
                    this.addChild(layer,100);
                    return;
                    return;
                }

                var layer = new CompleteTips();
                layer.setData(2);
                layer.setContent("太遗憾了，你的操作是错误的！\n回到文献中再看看吧！");
                this.addChild(layer,100);
                return;
            }

            alert("上传数据出错，请重新点击ok按钮。");
        };

        var cb = callback.bind(this);

        if(result == true){
            LogData.setGamePass(1);
        }
        else{
            LogData.setGamePass(0);
        }

        var sendData = {};
        LogData.setGameEndTime(Date.parse(new Date()));
        sendData["id"] = UserDataMgr.id;
        sendData["data"] = LogData.getAllData();
        sendRequest(sendData,cb);
        showWatting();
    },

    checkGame : function(){
        if(this.nowStep === 0){

            for(var i = 0 ; i< 2 ; i++){
                var count = 0;
                for(var j = 0 ; j < 3; j++){
                    count += Math.floor (this.movePos[i*3 + j]/2)
                    console.log("------>" + i + j +"   "+ count);
                }

                if(count !== 3){
                    return false;
                }
            }

            if(this.handPos[1] === -1 || this.handPos[2] === -1){
                return false;
            }
        }else{
            if(this.movePos[1] + this.movePos[2] !== 9){
                return false;
            }

            if((this.handPos[1] === -1 && this.handPos[2] === -1) ||(this.handPos[1] !== -1 && this.handPos[2] !== -1) ){
                return false;
            }

        }


        return true;
    },

    onExit:function(){

        cc.eventManager.removeListener(this);
        this._super();
    },

    addBarGoods : function(){


    }
});