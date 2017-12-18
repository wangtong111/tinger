/**
 * Created by wangtong on 2017/11/25.
 */

/**
 * Created by wangtong on 2017/11/25.
 */


var PlayLayer51 = PlayLayerBase.extend({
    responseRect:null,
    selectTypes : -1,
    canTouchBtn : false,

    animalTalk : [  "在阿瑟瑞斯基的研究中，\n一些被试在实验室里进入了睡眠。\n他们有时会处于快速眼动期，\n有时会处于非快速眼动期。\n现在研究者要叫醒被试了。\n应该叫醒处在什么睡眠阶段的被试呢？\n请你把代表“叫醒”的闹钟\n拖到被试的枕边。",
        "这位被试在快速眼动期间被叫醒了。\n当被问到是否做梦，\n以及梦的内容时，\n他更有可能怎样回答呢？\n请把相应的对话气泡拖放到他嘴边。",
        "这位被试在非快速眼动期间被叫醒了。\n当被问到是否做梦，\n以及梦的内容时，\n他更有可能怎样回答呢？\n请把相应的对话气泡拖放到他嘴边。",
        ],

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

        if(selectGoods.length != 4){
            self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                alert("选择物品数目不对，请返回超市重新选择。");
            })));
            return;
        }

        for(var i = 0 ; i< selectGoods.length ; i++){
            if(selectGoods[i] !== 1 && selectGoods[i] !== 2 && selectGoods[i] !== 4 && selectGoods[i] !== 7){
                self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                    alert("选择物品有误，请返回超市重新选择。");
                })));
                return;
            }
        }

        LogData.setGameStartTime(Date.parse(new Date()));

        self.contentRes = [];
        self.movePos = [-1,-1];

        var d1 = new cc.Sprite(res.play_pad1);
        d1.setPosition(0,-5);
        self._content.addChild(d1,1);
        d1.setName("d1");

        for(var i = 0; i < 3; i++){
            var alarm = new cc.Sprite(res.market_alarm);
            alarm.setPosition(460,100 - 140*i);
            self._content.addChild(alarm,10,100 + i);
            self.addListeners(alarm);
        }

        // play_logo
        var logo = new cc.Sprite(res.play_logo_png);
        logo.setPosition(-550,-230);
        self._content.addChild(logo,2);

        self.addSpeak(0);
        self.responseRect = [ cc.rect(-60,-20,100,100),cc.rect(240,-20,100,100)];

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

        for(var i = 0; i < this.responseRect.length; i++ ){

            var rects = this.responseRect[i];
            if(cc.rectContainsPoint(rects,target)){
                if(this.movePos[i] !== -1){
                    return;
                }

                var node = this._content.getChildByTag(1000 + i);
                if(node){
                    return true;
                }

                for(var j = 0; j < this.responseRect.length ; j++){
                    if(this.movePos[j] === target.getTag()){
                        this.movePos[j] = -1;
                    }
                    var node = this._content.getChildByTag(1000 + j);
                    if(node){
                        node.removeFromParent(true);
                    }
                }

                this.movePos[i] = target.getTag();

                var node = new cc.LayerColor(cc.color(0, 255, 255, 180),rects.width,rects.height);
                node.setPosition(rects.x,rects.y);
                this._content.addChild(node,2,1000 + i);
                return;
            }
        }
        //
        for(var i = 0 ; i< this.responseRect.length ; i++){
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

        for(var i = 0 ; i< this.responseRect.length ; i++){
            if(this.movePos[i] === target.getTag()){
                flag = false;
                var node = this._content.getChildByTag(1000 + i);
                if(node){
                    node.removeFromParent();
                }
                return;
            }
        }

        if(flag){
            var tag = target.getTag() -100;
            target.setPosition(460,100 - 140*tag);
        }

        this.canTouchBtn = true;
    },



    onOk : function(){
        console.log("i am onOk");
        if (this.checkGame() == true){
            var self = this;

            function continueGame(){
                self.nowStep += 1;

                var d1 = self._content.getChildByName("d1");
                if(d1){
                    d1.removeFromParent();
                }

                for(var i = 0;i< 3; i++){
                    var alarm = self._content.getChildByTag(100 + i);
                    if(alarm){
                        alarm.removeFromParent();
                    }
                }

                var person = new cc.Sprite(res.market2_9);
                person.setPosition(0,0);
                person.setName("d1");
                self._content.addChild(person);

                var arr = [res.market1_2,res.market1_3,res.market1_8];
                for(var i = 0 ; i < 3; i++){
                    var talk = new cc.Sprite(arr[i]);
                    talk.setPosition(460,100 - i*140);
                    self._content.addChild(talk,10,100 + i);
                    self.addListeners(talk);
                }

                self.responseRect = [cc.rect(100,-85,150,200)];
                self.movePos = [-1];

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
            var count = 0;
            for(var i = 0 ; i < 2; i++){
                if(this.movePos[i] === -1){
                    count += 1
                }
            }
            if(count <= 0){
                return true;
            }

            return false;
        }

        if(this.nowStep === 1){
            console.log(this.movePos);
            if(this.movePos[0] === 101){
                return true;
            }

            return false;
        }

        if(this.nowStep === 2){
            if(this.movePos[0] === 100){
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
