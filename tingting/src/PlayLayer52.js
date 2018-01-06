/**
 * Created by tingting on 2017/11/26.
 */

var PlayLayer52 = PlayLayerBase.extend({
    responseRect: [],
    selectTypes : -1,
    canTouchBtn : false,

    animalTalk : [  "      在REM睡眠剥夺实验中，\n  被试要经过好几个阶段的实验。\n  你还记的这些实验都有哪些吗？\n它们的顺序是什么样的？\n请把实验的不同阶段按顺序拖到界面中央。",
        "      在REM剥夺研究中，\n  一些被试在实验室里进入了睡眠。\n  他们有时会处于快速眼动期，\n有时会处于非快速眼动期\n现在是REM剥夺阶段，研究者要叫醒被试了。\n应该叫醒处在什么睡眠阶段的被试呢？\n请你把代表“叫醒”的闹钟拖到被试的枕边。",
        "      在REM剥夺研究中，\n  一些被试在实验室里进入了睡眠。\n  他们有时会处于快速眼动期，\n有时会处于非快速眼动期。\n现在是非REM剥夺阶段，研究者要叫醒被试了。\n应该叫醒处在什么睡眠阶段的被试呢？\n请你把代表“叫醒”的闹钟拖到被试的枕边。。",
        "      在睡眠剥夺阶段，\n  一位被试找到了主试。",
        "      在REM剥夺实验中，\n  研究者记录了REM剥夺阶段\n  几位被试接受睡眠剥夺的夜晚数量\n（用月亮表示）。\n现在到了剥夺非REM 睡眠的阶段了。\n你知道每名被试应该接受多少\n晚的非REM 睡眠剥夺吗？\n请把正确的夜晚数量\n拖放到相应的位置。",
        "      在REM剥夺实验中，\n  研究者记录了REM剥夺阶段\n  几位被试每晚被唤醒的次数\n（用闹钟表示）。\n现在到了剥夺非REM 睡眠的阶段了。\n在第一夜（以及之后的夜晚），\n研究者需要规划每位被试在\n非REM睡眠中被叫醒的次数。\n你知道每名被试需要被叫醒的次数吗？\n请把正确的次数拖放到相应的位置。",],

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

        if(selectGoods.length != 6){
            self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                alert("选择物品数目不对，请返回超市重新选择。");
            })));
            return;
        }

        for(var i = 0 ; i< selectGoods.length ; i++){
            if(selectGoods[i] === 3 && selectGoods[i] === 8 && selectGoods[i] === 7){
                self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                    alert("选择物品有误，请返回超市重新选择。");
                })));
                return;
            }
        }

        LogData.setGameStartTime(Date.parse(new Date()));

        self.contentRes = [0,0];
        self.nowStep = 0;
        self.selectTypes = -1;
        self.movePos = [-1,-1,-1,-1,-1,-1];

        self.addNode1();

        // play_logo
        self.addSpeak(0);

        //self.responseRect = [ cc.rect(-210,100,100,100),cc.rect(-50,100,100,100),cc.rect(110,100,100,100)];

        //for(var i = 0 ; i< self.responseRect.length ;i++){
        //    var bgLayer = new cc.LayerColor(cc.color(0, 0, 0, 180),100,100);
        //    bgLayer.setPosition(self.responseRect[i].x,self.responseRect[i].y);
        //    self._content.addChild(bgLayer,20);
        //}
    },

    addSpeak : function(levs){
        this.nowTime = Date.parse(new Date());
        var self = this;

        var logo = new cc.Sprite(res.play_logo_png);
        logo.setPosition(-550,-230);
        logo.setTag(5000);
        self._content.addChild(logo,2);

        var speak1 = new cc.Sprite(res.play_speak_png);
        speak1.setPosition(-350,0);
        self._content.addChild(speak1,12,5000 + 100);
        speak1.setScale(0);
        speak1.runAction(cc.scaleTo(0.2,1.5,1.5));

        var content = new cc.LabelTTF(this.animalTalk[levs],"Arial",14);
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
        if((nowTime - startTime)/1000 <= 10){
            alert("至少阅读10秒，请仔细看下线索哦。");
            return ;

        }

        var speak = this._content.getChildByTag(5100);
        if(speak){
            speak.removeFromParent(true);
        }

        var speak = this._content.getChildByTag(5000);
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

                this.movePos[i] = target.getTag();

                for(var j = 0; j < this.responseRect.length ; j++){
                    var node = this._content.getChildByTag(1000 + j);
                    if(node){
                        node.removeFromParent(true);
                    }
                }

                var node = new cc.LayerColor(cc.color(0, 0, 255, 180),rects.width,rects.height);
                node.setPosition(rects.x,rects.y);
                this._content.addChild(node,2,1000 + i);
                return;
            }
        }
        //
        for(var i = 0 ; i<  this.movePos.length ; i++){
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
                break;
            }
        }

        if(flag){
            if(this.nowStep === 0){
                var tag = target.getTag();
                target.setPosition(-400 + 250 * (tag%4) , 140 - 100* Math.floor(tag/4));
            }else if (this.nowStep < 3){
                var tag = target.getTag() - 100;
                target.setPosition(460,100 - tag*140)
            }else if(this.nowStep == 3){
                var tag = target.getTag() - 100;
                target.setPosition(460,100 - tag*170)
            }else if(this.nowStep == 4 || this.nowStep === 5){
                var tag = target.getTag();
                target.setPosition(390 + (tag%2)*105 ,85 - Math.floor(tag/2)*115);

            }

        }

        this.canTouchBtn = true;
    },

    addNode1 : function () {
        var self = this;
        var arr = [res.market1_7,res.market1_9,res.play_arrow_3,res.market1_1,res.play_arrow_1,res.play_arrow_2,res.play_arrow_4,res.market1_4];

        var node = new cc.Node();
        node.setPosition(0,0);
        this._content.addChild(node,1,10000);

        for(var i = 0; i< 8 ; i++){
            var sp = new cc.Sprite(arr[i]);
            sp.setPosition(-400 + 250 * (i%4) , 140 - 100* Math.floor(i/4));
            sp.setScale(0.8);
            node.addChild(sp,5,i);
            self.addListeners(sp);
        }

        self.responseRect = [];
        for(var i = 0 ;i < 6; i++){
            var layer = new cc.LayerColor(cc.color(0, 255, 100, 255),160,90);
            layer.ignoreAnchorPointForPosition(false);
            layer.setPosition(-450 + 180 * i,-180);
            node.addChild(layer,1);
            self.responseRect[i] = cc.rect(-450 + 180 * i - 80 ,-180 - 45,160,90);
        }


    },

    addNode2 : function(){
        var self = this;

        self.contentRes = [];
        self.movePos = [-1,-1];
        self.responseRect = [ cc.rect(-60,-20,100,100),cc.rect(240,-20,100,100)];

        var node = new cc.Node();
        node.setPosition(0,0);
        this._content.addChild(node,1,10000);


        var d1 = new cc.Sprite(res.play_pad1);
        d1.setPosition(0,-5);
        node.addChild(d1,1);

        for(var i = 0; i < 3; i++){
            var alarm = new cc.Sprite(res.market_alarm);
            alarm.setPosition(460,100 - 140*i);
            node.addChild(alarm,10,100 + i);
            self.addListeners(alarm);
        }
    },


    addNode3 : function(){
        var self = this;

        var node = new cc.Node();
        node.setPosition(0,0);
        this._content.addChild(node,1,10000);

        var person = new cc.Sprite(res.play_pad6);
        person.setPosition(0,-5);
        person.setName("d1");
        node.addChild(person);

        var arr = [res.market2_3,res.market2_7,res.market2_2];
        for(var i = 0 ; i < 3; i++){
            var talk = new cc.Sprite(arr[i]);
            talk.setPosition(460,100 - i*170);
            node.addChild(talk,10,100 + i);
            self.addListeners(talk);
        }

        self.responseRect = [cc.rect(100,-255,150,150)];
        self.movePos = [-1];



    },

    addNode4 : function(){
        var self = this;

        var node = new cc.Node();
        node.setPosition(0,0);
        this._content.addChild(node,1,10000);

        var person = new cc.Sprite(res.play_pad2);
        person.setPosition(0,-5);
        person.setName("d1");
        node.addChild(person);

        var arr = [res.play_moon3,res.play_moon4,res.play_moon5,res.play_moon6,res.play_moon7,res.play_moon8];
        for(var i = 0 ; i < 6; i++){
            var talk = new cc.Sprite(arr[i]);
            talk.setPosition(390 + (i%2)*105 ,85 - Math.floor(i/2)*115);
            talk.setScale(0.6);
            node.addChild(talk,10,i);
            self.addListeners(talk);
        }

        self.responseRect = [cc.rect(110,85,80,80),cc.rect(110,-65,80,80),cc.rect(110,-220,80,80)];
        self.movePos = [-1,-1,-1];

    },

    addNode5 : function(){
        var self = this;

        var node = new cc.Node();
        node.setPosition(0,0);
        this._content.addChild(node,1,10000);

        var person = new cc.Sprite(res.play_pad3);
        person.setPosition(0,-5);
        person.setName("d1");
        node.addChild(person);

        var arr = [res.play_alarm7,res.play_alarm8,res.play_alarm9,res.play_alarm11,res.play_alarm12,res.play_alarm13];
        for(var i = 0 ; i < 6; i++){
            var talk = new cc.Sprite(arr[i]);
            talk.setPosition(390 + (i%2)*105 ,85 - Math.floor(i/2)*115);
            talk.setScale(0.6);
            node.addChild(talk,10,i);
            self.addListeners(talk);
        }

        self.responseRect = [cc.rect(110,85,80,80),cc.rect(110,-65,80,80),cc.rect(110,-220,80,80)];
        self.movePos = [-1,-1,-1];

    },



    onOk : function(){
        console.log("i am onOk");
        if (this.checkGame() == true){
            var self = this;

            function continueGame(){
                self.nowStep += 1;

                var node = self._content.getChildByTag(10000);
                if(node){
                    node.removeFromParent();
                }

                if(self.nowStep === 1 || self.nowStep === 2){
                    self.addNode2();
                }

                if(self.nowStep === 3){
                    self.addNode3();
                }

                if(self.nowStep === 4){
                    self.addNode4();
                }

                if(self.nowStep === 5){
                    self.addNode5();
                }

                self.addSpeak(self.nowStep);
            }

            if(self.nowStep < 5){
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
                    layer.setContent("恭喜你，解锁下一关！\n")
                    this.addChild(layer, 100);
                    return;
                    return;
                }

                var layer = new CompleteTips();
                layer.setData(2);
                layer.setContent("太遗憾了，你的操作是错误的！\n回到文献中再看看吧！");
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
        var self = this;
        console.log(self.nowStep+ "   " + self.selectTypes + "     " + JSON.stringify(self.movePos)  );
        if(self.nowStep === 0){
            if(this.movePos[0] === 1 && this.movePos[1] === 7 && this.movePos[2] === 5 && this.movePos[3] === 4 && this.movePos[4] === 6 && this.movePos[5] === 2 ){
                return true;
            }

            return false;
        }

        if(self.nowStep === 1){

            if(this.movePos[0] !== -1 && this.movePos[1] === -1){
                return true;
            }

            return false;

        }

        if(self.nowStep === 2){
            if(this.movePos[0] === -1 && this.movePos[1] !== -1){
                return true;
            }

            return false;

        }

        if(self.nowStep === 3){

            if(this.movePos[0] !== 101){
                return false;
            }

            return true;

        }

        if(self.nowStep === 4){
            if(this.movePos[0] === 2 && this.movePos[1] === 1 && this.movePos[2] === 4 ){
                return true
            }

            return false;

        }

        if(self.nowStep === 5){
            if(this.movePos[0] === 1 && this.movePos[1] === 5 && this.movePos[2] === 3 ){
                return true
            }

            return false;

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