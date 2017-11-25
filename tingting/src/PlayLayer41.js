/**
 * Created by wangtong on 2017/11/25.
 */


var PlayLayer41 = PlayLayerBase.extend({
    responseRect:null,
    selectTypes : -1,
    canTouchBtn : false,

    animalTalk : [  "第一步",
                    "第二步",
                    "第三步"],

    movePos : [],

    nowStep : 0,

    contentRes  : [],

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

        if(selectGoods.length != 5){
            self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                alert("选择物品数目不对，请返回超市重新选择。");
            })));
            return;
        }

        for(var i = 0 ; i< selectGoods.length ; i++){
            if(selectGoods[i] < 4){
                self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                    alert("选择物品有误，请返回超市重新选择。");
                })));
                return;
            }
        }

        LogData.setGameStartTime(Date.parse(new Date()));

        self.contentRes = [];
        self.movePos = [-1,-1,-1];

        var d1 = new cc.Sprite(res.play_4_1);
        d1.setPosition(0,0);
        self._content.addChild(d1,1);

        var d2 = new cc.Sprite(res.play_4_2);
        d2.setPosition(373,-166);
        self._content.addChild(d2,2);
        d2.setName("d2");
        self.addListeners(d2);

        var d3 = new cc.Sprite(res.play_4_3);
        d3.setPosition(266,166);
        self._content.addChild(d3,2);
        d3.setName("d3");
        self.addListeners(d3);


        // play_logo
        var logo = new cc.Sprite(res.play_logo_png);
        logo.setPosition(-550,-230);
        self._content.addChild(logo,2);

        self.addSpeak(0);
        self.responseRect = [ cc.rect(-210,100,100,100),cc.rect(-50,100,100,100),cc.rect(110,100,100,100)
            ];
        //for(var i = 0 ; i< self.responseRect.length ;i++){
        //    var bgLayer = new cc.LayerColor(cc.color(0, 0, 0, 180),100,100);
        //    bgLayer.setPosition(self.responseRect[i].x,self.responseRect[i].y);
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
        speak1.runAction(cc.scaleTo(0.2,1,1));

        var content = new cc.LabelTTF(this.animalTalk[levs],"Arial",16);
        content.setColor(cc.color(0,0,0,255));
        content.opacity = 0;
        content.x = 160 + 120;
        content.y = 90 + 125;
        speak1.addChild(content,10);
        content.runAction(cc.sequence(cc.delayTime(0.2),cc.fadeIn(0.2)));
    },

    onTouchBegan : function (touch,event) {
        if(this.nowTime == 0){
            // alert("至少阅读10秒，请仔细看下线索哦。");
            return ;
        }

        var startTime = this.nowTime;
        var nowTime = Date.parse(new Date());
        if((nowTime - startTime)/1000 <= 0){
            alert("至少阅读20秒，请仔细看下线索哦。");
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

        if(this.nowStep === 0){
            return 0;
        }


        for(var i = 0; i < 3; i++ ){

            var rects = this.responseRect[i];
            if(cc.rectContainsPoint(rects,target)){
                if(this.movePos[i] !== -1){
                    return;
                }

                var node = this._content.getChildByTag(1000 + i);
                if(node){
                    return true;
                }

                for(var j = 0; j < 3 ; j++){
                    var node = this._content.getChildByTag(1000 + j);
                    if(node){
                        node.removeFromParent(true);
                    }
                }

                this.movePos[i] = target.getTag();

                var node = new cc.LayerColor(cc.color(0, 255, 255, 180),100,100);
                node.setPosition(rects.x,rects.y);
                this._content.addChild(node,2,1000 + i);
                return;
            }
        }
        //
        for(var i = 0 ; i< 3 ; i++){
            if(this.movePos[i] === target.getTag()){
                this.movePos[i] = -1;
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

        if(this.nowStep === 0){
            var name = target.getName();
            if(name === "d2"){
                var rect = cc.rect(40,-30,100,100);
                if(cc.rectContainsPoint(rect,target)){
                    target.setPosition(80,10);
                    this.contentRes.push(1);
                    cc.eventManager.removeListeners(target);
                }
            }else if(name === "d3"){
                var rect = cc.rect(-56,-50,100,100);
                if(cc.rectContainsPoint(rect,target)){
                    target.setPosition(-3,-1);
                    this.contentRes.push(2);
                    cc.eventManager.removeListeners(target);
                }
            }

            return
        }

        for(var i = 0 ; i< 3 ; i++){
            if(this.movePos[i] === target.getTag()){
                var node = this._content.getChildByTag(1000 + i);
                if(node){
                    node.removeFromParent();
                }
                return;
            }
        }

        this.canTouchBtn = true;
    },

    onOk : function(){
        console.log("i am onOk");
        if (this.checkGame() == true){
            var self = this;

            function continueGame(){
                self.movePos = [-1,-1,-1];
                self.nowStep += 1;
                self.responseRect =  [cc.rect(-180,100,100,100),cc.rect(-50,100,100,100),cc.rect(80,100,100,100)];

                var p1 = self._content.getChildByTag(10000);
                if(p1){
                    p1.removeFromParent();
                }

                var p2 = self._content.getChildByTag(10001);
                if(p2){
                    p2.removeFromParent();
                }

                var p1 = new cc.Sprite(res.market_4_6);
                p1.setPosition(-468,155);
                self._content.addChild(p1,10,10000);
                self.addListeners(p1);

                var p2 = new cc.Sprite(res.market_4_11);
                p2.setPosition(-468,-36);
                self._content.addChild(p2,10,10001);
                self.addListeners(p2);




                self.addSpeak(self.nowStep);
            }

            if(self.nowStep < 2){
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

    updateData : function(result) {
        var callback = function (cbData) {
            hideWaitting();
            if (cbData != null && cbData["code"] == 1) {
                LogData.clean();

                if (result == true) {
                    this.updateLevs();
                    var layer = new CompleteTips();
                    layer.setData(1);
                    layer.setContent("恭喜你,解锁下一关！\n")
                    this.addChild(layer, 100);
                    return;
                    return;
                }

                var layer = new CompleteTips();
                layer.setData(2);
                layer.setContent("太遗憾了，你的操作是错误的！\n回到文献中再看看吧！")
                this.addChild(layer, 100);
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
            var count = 0 ;
            for(var i = 0;i < this.contentRes.length; i++){
                count += this.contentRes[i];
            }
            console.log("check game,"+count)
            if(count !== 3){
                return false;
            }
            return true;
        }

        if(this.nowStep === 1){
            if(this.movePos[1] === 10000 && this.movePos[0] === -1 && this.movePos[2] === -1){
                return true;
            }

            return false;
        }

        if(this.nowStep === 2){
            if(this.movePos[0] === 10001 && this.movePos[1] === -1 && this.movePos[2] === -1){
                return true;
            }

            return false;
        }

        return true;
    },

    onExit:function(){

        cc.eventManager.removeListener(this);
        this._super();
    }
});