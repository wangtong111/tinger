var PlaySmokeLayer = PlayLayerBase.extend({
    responseRect:null,
    selectTypes : [-1,-1],
    // selectTypes2 : -1,
    nowStep : 0,
    canTouchBtn : false,

    personTalk : [  ""],
    animalTalk : [  "刚才研究者把一样东西\n放在了裂脑人被试的手上，\n他接着用手指向了钉子。\n但这次研究者放在裂脑人先生\n手上的东西并不是钉子\n。你知道研究者放了什么东西在\n裂脑人先生的哪只手上吗？"],
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
            if(selectGoods[i] != 4 && selectGoods[i] != 7){
                self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                    alert("选择物品有误，请返回超市重新选择。");
                })));
                return;
            }
        }


        var desk = new cc.Sprite(res.play_desk_png);
        desk.setPosition(0,-5);
        self._content.addChild(desk,2);

        var person = new cc.Sprite(res.play_person_5_png);
        person.setPosition(0,-120);
        self._content.addChild(person,3,6000);

        self.addSpeak(self.nowStep);
        var posTable = [cc.p(-472,240),cc.p(-472,77)];
        var name = [res.market_cigar_png,res.market_smoke_png];
        for(var i =  0; i < selectGoods.length ; i++) {
            this.selectTypes[i] = -1;
            var points1 = new cc.Sprite(name[i]);
            points1.setPosition(posTable[i]);
            self._content.addChild(points1,11,2000 + i * 1000);
            self.addListeners(points1);
        }

        self.responseRect = [cc.rect(-235,-65,100,100),cc.rect(125,-65,100,100)];

        var goods =  new cc.Sprite(res.market_ashtray_png);
        goods.x = -260;
        goods.y = -40;
        goods.setScale(0.5);
        self._content.addChild(goods,2);

        var goods2 =  new cc.Sprite(res.play_ruler_png);
        goods2.x = 260;
        goods2.y = -40;
        goods2.setScale(0.5);
        self._content.addChild(goods2,2);

        // var bgLayer = new cc.LayerColor(cc.color(255, 0, 0, 180),230,240);
        // bgLayer.setPosition(-208,45);
        // self._content.addChild(bgLayer,20);
        //
        // bgLayer = new cc.LayerColor(cc.color(0, 255, 0, 180),230,240);
        // bgLayer.setPosition(25,45);
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
        content.x = 160 + 120;
        content.y = 90 + 125;
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
            // if(this.nowStep >= 4) {
            var person = this._content.getChildByTag(6000);
            person.setSpriteFrame(new cc.SpriteFrame(res.play_person_4_png,cc.rect(0,0,485,423)));
            // }

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
                this.selectTypes[Math.ceil((tag -2000 )/1000)] = i;
                // if (tag == 2000)
                //     this.selectTypes1 = i;
                // else
                //     this.selectTypes2 = i;
                var node = new cc.LayerColor(cc.color(0, 255, 0, 180),rects.width,rects.height);
                node.setPosition(rects.x,rects.y);
                this._content.addChild(node,10,1000 + i);
                return;
            }
        }
        this.selectTypes[Math.ceil((tag -2000 )/1000)] = -1;
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

        // if(this.selectTypes1 < 0){
            var posTable = [cc.p(-472,240),cc.p(-472,77)];
            for(var i =  0; i < 2 ; i++) {
                if(this.selectTypes[i] < 0){
                    var points = this._content.getChildByTag(2000 + i * 1000);
                    points.setPosition(posTable[i]);

                }

            }

        // }else if(this.selectTypes2 < 0){
        //
        //     var points = this._content.getChildByTag(3000);
        //     points.setPosition(-472,77);
        // }

        this.canTouchBtn = true;
    },

    judgeRes : function(){

        if(this.nowStep === 0 ){
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