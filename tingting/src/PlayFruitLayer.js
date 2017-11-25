var PlayFruitLayer = PlayLayerBase.extend({
    responseRect:null,
    selectTypes1 : -1,
    selectTypes2 : -1,
    nowStep : 0,
    canTouchBtn : false,

    personTalk : [  "我摸到了苹果。",
                    "",
                    ""],
    animalTalk : [  "研究者把某样水果\n放到了裂脑人先生的一只手上，\n裂脑人先生说他摸到了苹果。\n你知道研究者把什么放在了他的哪只手上吗？\n如果你知道，请把水果拖放到相应的手上。",
                    "研究者把某样水果\n放到了裂脑人先生的一只手上，\n裂脑人先生没有说话，\n但用手做出了指的动作。你知道研究者刚才\n把什么放在了他的哪只手上吗？\n如果你知道，请把水果拖放到相应的手上。",
                    "研究者把某样水果\n放到了裂脑人先生的一只手上，\n裂脑人先生没有说话，\n但用手做出了指的动作。你知道研究者刚才\n把什么放在了他的哪只手上吗？\n如果你知道，请把水果拖放到相应的手上。"],
    nowTime : 0,

    addListeners : function(points){

        cc.eventManager.addListener({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this),
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
            if(selectGoods[i] != 0 && selectGoods[i] != 2){
                self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                    alert("选择物品有误，请返回超市重新选择。");
                })));
                return;
            }
        }

        LogData.setGameStartTime(Date.parse(new Date()));

        var desk = new cc.Sprite(res.play_desk_png);
        desk.setPosition(0,-5);
        self._content.addChild(desk,2);

        var person = new cc.Sprite(res.play_person_4_png);
        person.setPosition(0,-120);
        self._content.addChild(person,3,6000);

        self.addSpeak(self.nowStep);

        var points1 = new cc.Sprite(res.market_apple_png);
        points1.setScale(0.5);
        points1.setPosition(-472,240);
        self._content.addChild(points1,11,2000);

        var points2 = new cc.Sprite(res.market_orange_png);
        points2.setScale(0.5);
        points2.setPosition(-472,150);
        self._content.addChild(points2,11,3000)

        self.addListeners(points1);
        self.addListeners(points2);

        self.responseRect = [cc.rect(-235,-65,100,100),cc.rect(125,-65,100,100)];

        // var bgLayer = new cc.LayerColor(cc.color(255, 0, 0, 180),100,100);
        // bgLayer.setPosition(-235,-65);
        // self._content.addChild(bgLayer,20);
        // //
        // bgLayer = new cc.LayerColor(cc.color(0, 255, 0, 180),100,100);
        // bgLayer.setPosition(125,-65);
        // self._content.addChild(bgLayer,20);
        //
        // bgLayer = new cc.LayerColor(cc.color(255, 0, 0, 180),50,200);
        // bgLayer.setPosition(95,-80);
        // self._content.addChild(bgLayer,20);
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
        content.x = 160 + 125;
        content.y = 90 + 130;
        speak1.addChild(content,10);
        content.runAction(cc.sequence(cc.delayTime(0.2),cc.fadeIn(0.2)));

        var speak2 = new cc.Sprite(res.play_speak_png);
        speak2.setPosition(300,147);
        self._content.addChild(speak2,12,5000 + 200);
        speak2.setScale(0);
        speak2.runAction(cc.scaleTo(0.2,1,1));

        var content = new cc.LabelTTF(this.personTalk[levs],"Arial",20);
        content.setColor(cc.color(0,0,0,255));
        content.opacity = 0;
        content.x = 160 + 120;
        content.y = 90 + 130;
        speak2.addChild(content,10);
        content.runAction(cc.sequence(cc.delayTime(0.2),cc.fadeIn(0.2)));

    },

    onTouchBegan : function (touch,event) {
        if(this.nowTime == 0){
            // alert("至少阅读10秒，请仔细看下线索哦。");
            return ;
        }

        var startTime = this.nowTime;
        var nowTime = Date.parse(new Date());
        if((nowTime - startTime)/1000 <= 20){
            alert("至少阅读20秒，请仔细看下线索哦。");
            return ;

        }

        var speak = this._content.getChildByTag(5100);
        if(speak){
            speak.removeFromParent(true);
        }

        var speak = this._content.getChildByTag(5200);
        if(speak){
            speak.removeFromParent(true);
        }

        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var size = target.getContentSize();
        var rect = cc.rect(0,0,size.width,size.height);
        if(cc.rectContainsPoint(rect,location)){
            var person = this._content.getChildByTag(6000);
            person.setSpriteFrame(new cc.SpriteFrame(res.play_person_4_png,cc.rect(0,0,485,423)));


            return true;
        }

        return false;
    },

    onTouchMoved : function (touch,event) {
        var target = event.getCurrentTarget();
        var delta = touch.getDelta();
        var tag = target.getTag();

        target.x += delta.x;
        target.y += delta.y;
        var count = this.responseRect.length;
        for(var i = 0; i < count; i++ ){
            var rects = this.responseRect[i];
            if(cc.rectContainsPoint(rects,target)){

                var node = this._content.getChildByTag(1000 + i);
                if(node){
                    return true;
                }

                for(var j = 0; j <  count; j++){
                    var node = this._content.getChildByTag(1000 + j);
                    if(node){
                        node.removeFromParent(true);
                    }
                }
                if (tag == 2000)
                    this.selectTypes1 = i;
                else
                    this.selectTypes2 = i;
                var node = new cc.LayerColor(cc.color(0, 255, 0, 180),rects.width,rects.height);
                node.setPosition(rects.x,rects.y);
                this._content.addChild(node,10,1000 + i);
                return;
            }
        }

        if (tag == 2000)
            this.selectTypes1 = -1;
        else
            this.selectTypes2 = -1;

        for(var j = 0; j < count ; j++){
            var node = this._content.getChildByTag(1000 + j);
            if(node){
                node.removeFromParent(true);
            }
        }
    },


    onTouchEnded : function(touch,event){

        var count = this.responseRect.length;
        for(var j = 0; j < count ; j++){
            var node = this._content.getChildByTag(1000 + j);
            if(node){
                node.removeFromParent(true);
            }
        }

        if(this.selectTypes1 < 0){
            var points = this._content.getChildByTag(2000);
            if (this.nowStep == 0 )
                points.setPosition(-472,240);
            else
                points.setPosition(-320,-40)
        }else if(this.selectTypes2 < 0){

            var points = this._content.getChildByTag(3000);
            if (this.nowStep == 0 )
                points.setPosition(-472,150);
            else
                points.setPosition(280,0);
        }

        this.canTouchBtn = true;
    },

    judgeRes : function(){

        if(this.nowStep == 0 ){
            if(this.selectTypes1 == 1 && this.selectTypes2 == -1)
                return true;

            return false;
        }
        else if(this.nowStep == 1){
            if(this.selectTypes1 == 0 && this.selectTypes2 == -1)
                return true;

            return false;
        }else if(this.nowStep == 2){
            if(this.selectTypes2 == 1 && this.selectTypes1 == -1)
                return true;

            return false;

        }


        return false;
    },


    onOk : function(){
        // if (this.canTouchBtn){
        if (this.judgeRes() == true){
            var self = this;

            function continueGame(){
                this.selectTypes2 = -1;
                this.selectTypes1 = -1;
                var points = this._content.getChildByTag(2000);
                points.setPosition(-320,-40);

                var points = this._content.getChildByTag(3000);
                points.setPosition(280,0);

                self.nowStep += 1;

                if(self.nowStep == 1 || self.nowStep == 2 ){
                    var person = this._content.getChildByTag(6000);
                    var pos = person.getPosition();
                    person.removeFromParent(true);
                    var name = res.play_person_5_png;
                    if(self.nowStep == 2){
                        name = res.play_person_6_png;
                    }
                    var person = new cc.Sprite(name);
                    person.setPosition(pos);
                    this._content.addChild(person,3,6000)
                }

                self.addSpeak(self.nowStep);
            }

            if(self.nowStep < 2){
                var cb = continueGame.bind(this);
                var layer = new CompleteTips();
                layer.setData(3);
                layer.setContent("恭喜你，操作正确！\n请接着完成后面的实验！")
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
                    layer.setData(1);
                    layer.setContent("恭喜你，成功完成本关卡！\n你已成功解锁下一关！\n快去看看吧！")
                    this.addChild(layer,100);
                    return;
                }

                var layer = new CompleteTips();
                layer.setData(2);
                layer.setContent("太遗憾了，你的操作是错误的！\n回到文献中再看看吧！")
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

    onExit:function(){

        cc.eventManager.removeListener(this);
        this._super();
    }
});