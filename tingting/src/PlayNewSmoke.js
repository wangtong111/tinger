var PlayNewSmoke = PlayLayerBase.extend({
    responseRect:null,
    selectTypes : [-1,-1,-1,-1,-1],
    // selectTypes2 : -1,
    nowStep : 0,
    canTouchBtn : false,

    personTalk : [  "",
                    "",
                    "",
                    "",
                    "哦，哈哈哈。。这是一个裸女！ååå",
                    "我什么也没看到。。嘻嘻嘻。。\n哦,可能是搞笑的机器装置"],
    animalTalk : [  "\n屏幕上闪过了一个钉子的图片。\n接下来，裂脑人先生需要用\n手指出屏幕上呈现了什么东西。\n你能从屏幕左侧的物品中把正确\n的东西拖放到他手指的方向吗？",
                    "\n屏幕上闪过了一个钉子的图片。\n接下来，裂脑人先生需要用\n手指出屏幕上呈现了什么东西。\n你能从屏幕左侧的物品中把正确\n的东西拖放到他手指的方向吗？",
                    "\n屏幕上闪过了一个钉子的图片。\n接下来，裂脑人先生需要说出\n他看到了什么东西，\n你能从卡片中选择正确的回答，\n拖进对话气泡里吗？",
                    "\n屏幕上闪过了一个钉子的图片。\n接下来，裂脑人先生需要说出\n他看到了什么东西，\n你能从卡片中选择正确的回答，\n拖进对话气泡里吗？",
                    "\n这是裸女的图片。你知道\n刚刚研究者放了什么东西在\n哪边的屏幕上吗？请你把合\n适的图片拖动到屏幕上合适的位置。",
                    "\n这是搞笑的机器的图片。\n你知道刚刚研究者放了什么\n东西在哪边的屏幕上吗？请\n你把合适的图片拖动到屏幕上合适的位置。"],
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

        if(selectGoods.length != 5){
            self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                alert("选择物品数目不对，请返回超市重新选择。");
            })));
            return;
        }

        for(var i = 0 ; i< selectGoods.length ; i++){
            if(selectGoods[i] == 1 || selectGoods[i] == 2 || selectGoods[i] == 6 || selectGoods[i] == 8){
                self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                    alert("选择物品有误，请返回超市重新选择。");
                })));
                return;
            }
        }


        var desk = new cc.Sprite(res.play_desk_png);
        desk.setPosition(0,-5);
        self._content.addChild(desk,2);

        var person = new cc.Sprite(res.play_person_1_png);
        person.setPosition(0,-120);
        self._content.addChild(person,3,6000);

        self.addSpeak(self.nowStep);
        var posTable = [cc.p(-472,240),cc.p(-472,150),cc.p(472,70),cc.p(472,0),cc.p(472,-70)];
        var name = [res.market_cigar_png,res.market_ashtray_png,res.market_cigar_card_png,res.market_ashtray_card_png,res.market_nothing_png];
        for(var i =  0; i < selectGoods.length ; i++) {
            this.selectTypes[i] = -1;
            var points1 = new cc.Sprite(name[i]);
            points1.setPosition(posTable[i]);
            points1.setScale(0.5);
            self._content.addChild(points1,11,2000 + i * 100);
            self.addListeners(points1);
        }

        self.responseRect = [cc.rect(-330,-40,300,50),cc.rect(30,-40,300,50)];

        var ashtray = new cc.Sprite(res.market_ashtray_png);
        ashtray.setPosition(-90,160);
        ashtray.setScale(0.8);
        ashtray.setOpacity(180);
        self._content.addChild(ashtray,2,4000);
        // var bgLayer = new cc.LayerColor(cc.color(255, 0, 0, 180),250,130);
        // bgLayer.setPosition(200,120);
        // self._content.addChild(bgLayer,20);
        //
        // bgLayer = new cc.LayerColor(cc.color(0, 255, 0, 180),300,50);
        // bgLayer.setPosition(30,-40);
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

        var content = new cc.LabelTTF(this.animalTalk[levs],"Arial",20);
        content.setColor(cc.color(0,0,0,255));
        content.opacity = 0;
        content.x = 160 + 120;
        content.y = 90 + 135;
        speak1.addChild(content,10);
        content.runAction(cc.sequence(cc.delayTime(0.2),cc.fadeIn(0.2)));

        var bg = self._content.getChildByTag(5200);
        if(bg === null){
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
        }
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
        if(this.nowStep < 2 || this.nowStep > 3) {
            var speak = this._content.getChildByTag(5200);
            if (speak) {
                speak.removeFromParent(true);
            }
        }

        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var size = target.getContentSize();
        var rect = cc.rect(0,0,size.width,size.height);
        if(cc.rectContainsPoint(rect,location)){
            // if(this.nowStep >= 4) {
            //     var person = this._content.getChildByTag(6000);
            //     person.setSpriteFrame(new cc.SpriteFrame(res.play_person_4_png,cc.rect(0,0,485,423)));
            // }

            return true;
        }

        return false;
    },

    onTouchMoved : function (touch,event) {
        var target = event.getCurrentTarget();
        var delta = touch.getDelta();
        var tag = target.getTag();
        cc.log("ontouch moved " + tag.toString());
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

                this.selectTypes[Math.ceil((tag -2000 )/100)] = i;
                if(this.nowStep < 2) {
                    var name = res.play_person_5_png;
                    if (i == 1)
                        name = res.play_person_6_png;
                    var person = this._content.getChildByTag(6000);
                    person.setName(name);
                    person.setSpriteFrame(new cc.SpriteFrame(name, cc.rect(0, 0, 485, 423)));
                }else{
                    var node = new cc.LayerColor(cc.color(0, 255, 0, 255),rects.width,rects.height);
                    cc.log(rects.width + "   " + rects.height + " " + rects.x + "  " + rects.y);
                    node.setPosition(rects.x,rects.y);
                    this._content.addChild(node,12,1000 + i);

                }
                return;
            }
        }
        this.selectTypes[Math.ceil((tag -2000 )/100)] = -1;
        // if (tag == 2000)
        //     this.selectTypes1 = -1;
        // else
        //     this.selectTypes2 = -1;

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
        var counts = 0;
        var posTable = [cc.p(-472,240),cc.p(-472,150),cc.p(472,70),cc.p(472,0),cc.p(472,-70)];
        for(var i =  0; i < 5 ; i++) {
            if(this.selectTypes[i] < 0){
                counts += 1;
                var points = this._content.getChildByTag(2000 + i * 100);
                if(points)
                    points.setPosition(posTable[i]);

            }

        }

        if(counts >= 5){
            var person = this._content.getChildByTag(6000);
            person.setName(res.play_person_1_png);
            person.setSpriteFrame(new cc.SpriteFrame(res.play_person_1_png,cc.rect(0,0,485,423)));
        }

        this.canTouchBtn = true;
    },

    judgeRes : function(){

        if(this.nowStep == 0 ){

            cc.log("---------");
            var person = this._content.getChildByTag(6000);
            var name = person.getName();
            if(this.selectTypes[1] == 0 && name == res.play_person_5_png)
                return true;

            return false;
        }
        else if(this.nowStep == 1){
            var person = this._content.getChildByTag(6000);
            var name = person.getName();
            if(this.selectTypes[1] == 1 && name == res.play_person_6_png)
                return true;

            return false;
        }else if(this.nowStep == 2){
            cc.log(this.selectTypes.toString());
            var counts = this.selectTypes[3] +  this.selectTypes[1] + this.selectTypes[2] + this.selectTypes[0];
            if(this.selectTypes[4] == 0 && counts == -4)
                return true;

            return false;

        }else  if(this.nowStep == 3){
            var counts = this.selectTypes[4] + this.selectTypes[0] + this.selectTypes[2] + this.selectTypes[1];
            if(this.selectTypes[3] == 0 && counts == -4)
                return true;

            return false;
        }else  if(this.nowStep == 4){
            if(this.selectTypes[0] === 0 && this.selectTypes[1] === -1)
                return true;

            return false;
        }else  if(this.nowStep == 5){
            if(this.selectTypes[0] === 0 && this.selectTypes[1] === -1)
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
                var posTable = [cc.p(-472,240),cc.p(-472,150),cc.p(472,70),cc.p(472,0),cc.p(472,-70)];
                for(var i =  0; i < 5 ; i++) {
                    this.selectTypes[i] = -1;
                    var points = this._content.getChildByTag(2000 + i * 100);
                    if(self.nowStep >= 1)
                        points.setLocalZOrder(20);
                    points.setPosition(posTable[i]);
                }

                var person = this._content.getChildByTag(6000);
                person.setName(res.play_person_1_png);
                person.setSpriteFrame(new cc.SpriteFrame(res.play_person_1_png,cc.rect(0,0,485,423)));

                var ash = this._content.getChildByTag(4000);
                if(ash){
                    if (self.nowStep %2 == 0)
                        ash.setPosition(170,160);
                    else
                        ash.setPosition(-90,160);
                }
                self.nowStep += 1;
                if(this.nowStep >= 2) {
                    self.responseRect = [cc.rect(200,120,250,130)];
                }

                self.addSpeak(self.nowStep);
            }

            function continueGame1(){
                var speak = this._content.getChildByTag(5200);
                if (speak) {
                    speak.removeFromParent(true);
                }

                for(var i =  0; i < 5 ; i++) {
                    this.selectTypes[i] = -1;
                    var points = this._content.getChildByTag(2000 + i * 100);
                    if(points)
                        points.removeFromParent(true);
                }

                var posTable = [cc.p(-472,240),cc.p(-472,150)];
                var name = [res.play_nude_png,res.play_machine_png];
                for(var i =  0; i < 2 ; i++) {
                    this.selectTypes[i] = -1;
                    var points1 = new cc.Sprite(name[i]);
                    points1.setPosition(posTable[i]);
                    points1.setScale(0.5);
                    self._content.addChild(points1,22,2000 + i * 100);
                    self.addListeners(points1);
                }

                var person = this._content.getChildByTag(6000);
                person.setName(res.play_person_1_png);
                person.setSpriteFrame(new cc.SpriteFrame(res.play_person_1_png,cc.rect(0,0,485,423)));

                var ash = this._content.getChildByTag(4000);
                if(ash)
                    ash.removeFromParent();

                self.nowStep += 1;
                if(self.nowStep === 4){

                    self.responseRect = [cc.rect(25,45,230,240)];

                }else if(self.nowStep === 5){
                    self.responseRect = [cc.rect(-208,45,230,240)];
                }

                self.addSpeak(self.nowStep);
            }

            if(self.nowStep < 3){
                var cb = continueGame.bind(this);
                var layer = new CompleteTips();
                layer.setData(3);
                layer.setContent("恭喜你，操作正确！\n请接着完成后面的实验！")
                layer.setCallback(cb);
                this.addChild(layer,100);
                return;
            }else if(self.nowStep < 5){
                var cb = continueGame1.bind(this);
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
                    layer.setData(4);
                    layer.setContent("恭喜你，成功完成第一篇文献的全部关卡！\n")
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