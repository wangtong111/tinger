/**
 * Created by tingting on 2017/11/25.
 */


var PlayLayer53 = PlayLayerBase.extend({
    responseRect: [],
    selectTypes : -1,
    canTouchBtn : false,

    animalTalk : [  "这是做梦剥夺研究的\n实验结果表格的一部分。\n表格里两个重要的部分被隐去了。\n在屏幕右侧，你可以看到\n本研究中使用过的各种指标或者阶段，\n被隐去的部分就藏在其中。\n你能拖动其中两个图案，\n补全表格中箭头所指的\n被隐去的部分吗？",
        "这是做梦剥夺研究的\n实验结果表格的一部分。\n表格里两个重要的部分被隐去了。\n在屏幕右侧，你可以看到\n本研究中使用过的各种指标或者阶段，\n被隐去的部分就藏在其中。\n你能拖动其中两个图案，\n补全表格中箭头所指\n的被隐去的部分吗？"],

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

        if(selectGoods.length != 9){
            self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                alert("选择物品数目不对，请返回超市重新选择。");
            })));
            return;
        }

        LogData.setGameStartTime(Date.parse(new Date()));

        self.contentRes = [0,0,0,0,0,0,0,0,0,0];
        self.nowStep = 0;
        self.movePos = [-1];

        var d1 = new cc.Sprite(res.play_pad4);
        d1.setPosition(0,-5);
        self._content.addChild(d1);
        d1.setName("d1");

        self.posArr = [cc.p(495,210),cc.p(495,141),cc.p(495,86),cc.p(501,27),cc.p(495,-40),cc.p(433,-101),cc.p(433,-165),cc.p(433,-227),cc.p(433,-290)];

        var arr = [res.market_sleeping,res.market_moon,res.market_alarm,res.market_rem,res.market_norem,res.play_arrow_3,res.market1_4,res.play_arrow_2,res.play_arrow_4];

        var str = ["被试次数","夜晚次数","唤醒次数","REM占比","非REM占比"];

        for(var i = 0 ; i < 5 ; i++){
            var label = new cc.LabelTTF(str[i],"Arial",30);
            label.setAnchorPoint(0,0.5);
            label.setColor(cc.color(0,0,0,255));
            label.setPosition(338,self.posArr[i].y);
            self._content.addChild(label,1)
        }

        for(var i = 0 ; i< 9 ; i++){
            var sp = new cc.Sprite(arr[i]);
            sp.setPosition(self.posArr[i]);
            if(i < 5){
                sp.setScale(0.4);
            }else{
                sp.setScale(1,0.4);
            }

            self._content.addChild(sp,5,i);
            self.addListeners(sp);
        }


        // play_logo
        var logo = new cc.Sprite(res.play_logo_png);
        logo.setPosition(-700,-230);
        self._content.addChild(logo,2);

        self.addSpeak(0);
        self.responseRect = [ cc.rect(-192,41,200,50)];
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
        speak1.setPosition(-500,0);
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

                var node = new cc.LayerColor(cc.color(0, 0, 255, 180),rects.width,rects.height);
                node.setPosition(rects.x,rects.y);
                this._content.addChild(node,2,1000 + i);
                return;
            }
        }
        //
        for(var i = 0 ; i< this.responseRect.length ; i++){
            if(this.movePos[i] == target.getTag()){
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

        var tag = target.getTag();

        console.log("tag = " + tag);
        for(var i = 0 ;i < this.responseRect.length ; i++){
            var rects = this.responseRect[i];
            if(cc.rectContainsPoint(rects,target)){

                console.log("i am here hahaha");
                if (this.contentRes[tag] <= 0){
                    flag = false;
                    this.contentRes[tag] = tag;
                }

            }else{
                console.log("i am here ,so fare");
                this.contentRes[tag] = 0;
                target.setPosition(this.posArr[tag]);
            }
        }

        for(var i = 0 ; i< this.responseRect.length ; i++){
            if(this.movePos[i] == target.getTag()){
                this.movePos[i] = -1;
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

        if (this.checkGame() == true){
            var self = this;

            function continueGame(){
                self.nowStep += 1;

                var d1 = self._content.getChildByName("d1");
                if(d1){
                    d1.removeFromParent();
                }

                var d1 = new cc.Sprite(res.play_pad5);
                d1.setPosition(0,-5);
                self._content.addChild(d1);

                for(var i = 0 ; i < 9 ; i++){
                    var sp = self._content.getChildByTag(i);
                    if(sp){
                        sp.setPosition(self.posArr[i]);
                    }
                }

                self.contentRes = [0,0,0,0,0,0,0,0,0,0];
                self.movePos = [-1];
                self.responseRect = [ cc.rect(-30,41,200,50)];

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

    updateData : function(result) {
        var callback = function (cbData) {
            hideWaitting();
            if (cbData != null && cbData["code"] == 1) {
                LogData.clean();

                if (result == true) {
                    this.updateLevs();
                    var layer = new CompleteTips();
                    layer.setData(4);
                    layer.setContent("恭喜你，成功完成第四篇文献的全部关卡！\n")
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
            var count = 0
            for(var i = 0; i< 9 ; i++){
                if(this.contentRes[i] > 0){
                    count += this.contentRes[i]
                }
            }

            console.log("check game,"+this.contentRes + "    " + count);
            if(this.nowStep === 0){
                if(count == 8 && this.contentRes[2] === 2 && this.contentRes[6] === 6 ){
                    return true;
                }

                return false;
            }

            if(this.nowStep === 1){
                if(count == 10 && this.contentRes[3] === 3 && this.contentRes[7] === 7 ){
                    return true;
                }

                return false;

            }

        return true;
    },

    onExit:function(){

        cc.eventManager.removeListener(this);
        this._super();
    },

    addBarGoods :function (node) {

    }
});