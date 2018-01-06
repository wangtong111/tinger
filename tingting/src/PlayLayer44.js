/**
 * Created by tingting on 2017/11/25.
 */


var PlayLayer44 = PlayLayerBase.extend({
    responseRect: [],
    selectTypes : -1,
    canTouchBtn : false,

    animalTalk : [  "在研究中，研究者改换了深侧\n地板的图案和摆放方式来控制图\n案密度和运动视差。现在，在界面的\n右边有不同密度的三种图案，\n（密度并不精确）你能使用其中一种\n图案重现研究者们消除图案\n密度作用的方法吗？请拖动图案\n到正确的位置。",
                    "在研究中，研究者改换了深侧\n地板的图案和摆放方式来控制图\n案密度和运动视差。现在，在界面的\n右边有不同密度的三种图案， \n（密度并不精确）你能使用其中一种\n图案重现研究者们消除运动\n视差作用的方法吗？请拖动图案\n到正确的位置。",
                    "你还记得研究者把哪些小动物\n放在控制了图案密度和运动视差\n的视崖装置的深侧了吗？它们的表现\n更可能是什么样？请你从右侧的\n方框中拖动正确的图片到正确的位置。"],

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

        if(selectGoods.length != 3){
            self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                alert("选择物品数目不对，请返回超市重新选择。");
            })));
            return;
        }

        for(var i = 0 ; i< selectGoods.length ; i++){
            if(selectGoods[i] < 6){
                self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                    alert("选择物品有误，请返回超市重新选择。");
                })));
                return;
            }
        }

        LogData.setGameStartTime(Date.parse(new Date()));

        self.contentRes = [0,0];
        self.nowStep = 0;
        self.movePos = [-1,-1,-1];

        var d1 = new cc.Sprite(res.play_4_1);
        d1.setPosition(0,0);
        self._content.addChild(d1,1);
        d1.setName("d1");

        var d2 = new cc.Sprite(res.play_4_7);
        d2.setPosition(8,12);
        self._content.addChild(d2,2);
        d2.setName("d2");
        //self.addListeners(d2);

        var d3 = new cc.Sprite(res.play_4_3);
        d3.setPosition(-3 , -1);
        self._content.addChild(d3,2);
        d3.setName("d3");


        self.addAnimals();
        // play_logo
        var logo = new cc.Sprite(res.play_logo_png);
        logo.setPosition(-700,-230);
        self._content.addChild(logo,2);

        self.addSpeak(0);
        //self.responseRect = [ cc.rect(110,-100,100,100),cc.rect(110,0,100,100)];
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

        if(this.nowStep < 2){
            return;
        }

        for(var i = 0; i < this.responseRect.length; i++ ){

            var rects = this.responseRect[i];
            if(cc.rectContainsPoint(rects,target)){
                if(this.movePos[i] != -1){
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

        if(this.nowStep < 2 ){
            var tag = target.getTag();
            var rects = [cc.rect(80,-135,100,100),cc.rect(64,30,100,100)];

            for(var i = 0 ;i < 2; i++){
                if(cc.rectContainsPoint(rects[i],target)){
                    if (this.contentRes[i] <= 0){
                        target.setPosition(rects[i].x + 50 , rects[i].y + 50);
                        this.contentRes[i] = tag;
                    }

                }else if(this.contentRes[i] === tag){
                    this.contentRes[i] = 0;
                }
            }



            return ;

        }
        console.log("=================" + JSON.stringify(this.movePos));
        var flag = true;
        for(var i = 0 ; i< this.responseRect.length ; i++){
            if(this.movePos[i] === target.getTag()){
                flag = false;
                var node = this._content.getChildByTag(1000 + i);
                if(node) {
                    node.removeFromParent();
                }
            }
        }

        if (flag == true){
            var posy = [500,400,200,100];
            var tag =  target.getTag() - 10000;
            var i = Math.floor(tag/100);
            var j = tag%100;

            target.setPosition(785 - 583 + j*100, posy[i] - 330);
        }



        this.canTouchBtn = true;
    },

    addAnimals : function(){
        var self = this;

        //self.movePos = [-1,-1,-1];
        //self.responseRect =  [cc.rect(180,-100,100,100),cc.rect(-50,100,100,100)];
        self.contentRes = [0,0];

        for(var i = 0 ; i < 3; i++){
            var p1 = self._content.getChildByTag(10000 + i);
            if(p1){
                p1.removeFromParent();
            }
        }

        var nameArr = [res.play_4_4,res.play_4_5,res.play_4_6];

        for(var i = 0 ; i < 3 ; i++){
            var p1 = new cc.Sprite(nameArr[i]);
            p1.setPosition(468,200 - 200*i);
            self._content.addChild(p1,1,10000 + i);
            self.addListeners(p1);

        }
    },

    addOthers : function(){
        var self = this;
        for(var i = 0 ; i < 3; i++){
            var p1 = self._content.getChildByTag(10000 + i);
            if(p1){
                p1.removeFromParent();
            }
        }

        var p = self._content.getChildByName("d1");
        if(p){
            p.removeFromParent()
        }

        var p = self._content.getChildByName("d2");
        if(p){
            p.removeFromParent()
        }

        var p = self._content.getChildByName("d3");
        if(p){
            p.removeFromParent()
        }

        var sp = new cc.Sprite(res.play_4_8);
        sp.setPosition(0,0);
        self._content.addChild(sp,1);

        self.responseRect = [];
        //165,140
        for(var i = 0; i < 6; i++){
            self.responseRect.push(cc.rect(330 - 583  + 155 *(i%2) , 410  - 330 - 140 * Math.floor(i/2), 140 ,125 ) );
        }

        self.movePos = [-1,-1,-1,-1,-1,-1];
        //for(var i = 0 ; i< self.responseRect.length ;i++){
        //    var bgLayer = new cc.LayerColor(cc.color(0, 0, 0, 180),134,118);
        //    bgLayer.setPosition(self.responseRect[i].x,self.responseRect[i].y);
        //    self._content.addChild(bgLayer,20);
        //}

        var arrName = [res.market_4_1,res.market_4_7,res.market_4_3,res.market_4_9];
        var posy = [500,400,200,100];

        for(var i = 0 ; i < 4; i++ ){
            for(var j = 0; j < 3 ; j++){
                var sp = new cc.Sprite(arrName[i]);
                sp.setScale(0.6);
                sp.setPosition(785 - 583 + j*100, posy[i] - 330);
                self._content.addChild(sp,1,10000 + i*100 + j);
                self.addListeners(sp);
            }
        }



    },

    onOk : function(){
        console.log("i am onOk");
        if (this.checkGame() == true){
            var self = this;

            function continueGame(){
                self.nowStep += 1;

                if(self.nowStep < 2)
                    self.addAnimals();
                else
                    self.addOthers();

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
        if(this.nowStep < 2 ){
            var count = 0 ;
            for(var i = 0;i < this.contentRes.length; i++){
                count += this.contentRes[i];
            }
            console.log("check game,"+count);
            if(this.nowStep === 0 && count === 10000 && this.contentRes[0] === 10000){
                return true;
            }

            if(this.nowStep === 1 && count === 10001 && this.contentRes[1] === 10001){
                return true;
            }

            return false;
        }


        if(this.nowStep === 2){
            if(this.movePos[0] >= 10100 && this.movePos[0] <= 10102  && this.movePos[1] >= 10000 && this.movePos[1] <= 10002 && this.movePos[2] >= 10200  && this.movePos[2] <= 10202 && this.movePos[3] >= 10200 && this.movePos[3] <= 10202 && this.movePos[4] >= 10300 && this.movePos[4] <= 10302 && this.movePos[5] >= 10200 && this.movePos[5] <= 10202  ){
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