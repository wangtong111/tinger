/**
 * Created by wangtong on 2017/10/22.
 */
var PlayLayerCard3 = PlayLayerBase.extend({
    responseRect:null,
    nowStep : 0,
    canTouchBtn : false,

    animalTalk : [  "我要 gameover",
                    "我要 gameover",
                    "我要 gameover",
                    "我要 gameover",
                    "我要 gameover",
                    "我要 gameover",
                    "我要 gameover"],

    movePos : [-1,-1],

    changeSp : [[],
                [res.market2_card13,res.market2_card14],
                [res.market2_card13,res.market2_card14],
                [res.market2_card13,res.market2_card14],
                [res.market2_card13,res.market2_card14],
                [res.market2_card13,res.market2_card14],
                [res.market2_card13,res.market2_card14]],

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

        if(selectGoods.length != 8){
            self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                alert("选择物品数目不对，请返回超市重新选择。");
            })));
            return;
        }

        for(var i = 0 ; i< selectGoods.length ; i++){
            if(selectGoods[i] === 4){
                self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                    alert("选择物品有误，请返回超市重新选择。");
                })));
                return;
            }
        }

        LogData.setGameStartTime(Date.parse(new Date()));

        for(var i = 0 ; i < 2 ; i++){
            var sp = new cc.Sprite(res.play_card11);
            sp.setPosition(-150 + 260 *(i%2),0);
            self._content.addChild(sp,1,8000 + i);
        }

        var label = new cc.LabelTTF(":","Arial Bold",80);
        label.setColor(cc.color(0,0,0,255));
        label.setPosition(-15,0);
        self._content.addChild(label,2);

        // play_logo
        var logo = new cc.Sprite(res.play_logo_png);
        logo.setPosition(-550,-230);
        self._content.addChild(logo,2);

        self.addSpeak(0);
        self.responseRect = [   cc.rect(-200,-50,100,100),cc.rect(60,-50,100,100)];
        self.movePos = [-1,-1];
        // for(var i = 0 ; i< 3 ;i++){
        //    var bgLayer = new cc.LayerColor(cc.color(0, 0, 0, 180),100,100);
        //    bgLayer.setPosition(self.responseRect[i].x,self.responseRect[i].y);
        //    self._content.addChild(bgLayer,20);
        // }
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
        console.log("---------------->" + this.movePos[0]);
        console.log("------->step" + this.nowStep);
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

        for(var i = 0; i < this.movePos.length ; i++ ){

            var rects = this.responseRect[i];
            if(cc.rectContainsPoint(rects,target)){
                if(this.movePos[i] !== -1){
                    return;
                }

                var node = this._content.getChildByTag(1000 + i);
                if(node){
                    return true;
                }

                for(var j = 0; j < this.movePos.length; j++){
                    var node = this._content.getChildByTag(1000 + j);
                    if(node){
                        node.removeFromParent(true);
                    }
                }

                this.movePos[i] = target.getTag();

                var node = new cc.LayerColor(cc.color(0, 255, 0, 180),100,100);
                node.setPosition(rects.x,rects.y);
                this._content.addChild(node,2,1000 + i);
                return;
            }
        }

        for(var i = 0 ; i< this.movePos.length ; i++){


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
        for(var i = 0 ; i< this.movePos.length ; i++){
            if(this.movePos[i] === target.getTag()){
                target.setPosition(-150 + 260 *(i%2),0);
                if(this.movePos.length == 1){
                    target.setPosition(350,0);
                    var node = this._content.getChildByTag(1000);
                    if(node)
                        node.removeFromParent();
                }
                target.setScale(1);
                flag = false;
                break;
            }

        }

        if(flag){
            target.setScale(0.45);
            var i = target.getTag( ) - 100;
            target.setPosition(110*i + 80 - 584,390);
        }


        this.canTouchBtn = true;
    },


    onOk : function(){
        // if (this.canTouchBtn){
        if (this.checkGame() == true){
            var self = this;

            function continueGame(){
                self.movePos = [-1];
                self.nowStep += 1;
                self.responseRect = [cc.rect(300,-50,100,100)];

                for(var i = 0 ; i < 8;i++){
                    var card = self._content.getChildByTag(100 + i);
                    card.setScale(0.45);
                    card.setPosition(110*i + 80 - 584,390)
                }

                for(var i = 0 ; i< 2 ; i++){
                    var sp = self._content.getChildByTag(8000+i);
                    sp.setSpriteFrame(new cc.SpriteFrame(self.changeSp[self.nowStep][i],cc.rect(0,0,200,145)));

                }

                self.addSpeak(self.nowStep);
            }

            if(self.nowStep < 6){
                var cb = continueGame.bind(this);
                var layer = new CompleteTips();
                layer.setData(3);
                layer.setContent("太棒了！操作正确！\n请接着做后面的实验吧！")
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
                    layer.setContent("恭喜你，成功完成第二篇文献的全部关卡！\n")
                    this.addChild(layer,100);
                    return;
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


    checkGame : function(){
        var self = this;
        if(self.nowStep === 0 && self.movePos[0] === 100 && self.movePos[1] === 103){
            return true;
        }else if(self.nowStep === 1 && self.movePos[0] === 104 ){
            return true;
        }else if(self.nowStep === 2 && self.movePos[0] === 106 ){
            return true;
        }else if(self.nowStep === 3 && self.movePos[0] === 101 ){
            return true;
        }else if(self.nowStep === 4 && self.movePos[0] === 104 ){
            return true;
        }else if(self.nowStep === 5 && self.movePos[0] === 105 ){
            return true;
        }else if(self.nowStep === 6 && self.movePos[0] === 101 ){
            return true;
        }

        return false;
    },

    onExit:function(){

        cc.eventManager.removeListener(this);
        this._super();
    },

    addBarGoods :function (node) {
        var self = this;
        var selectGoods = UserDataMgr.getSelectGoods();
        var config = GOODS_CONFIG[self.types][self.lev];
        for(var i = 0 ; i< selectGoods.length ; i++){
            var sp = new cc.Sprite(config[selectGoods[i]]);
            sp.setPosition(110*i + 80 - 584,390);
            sp.setScale(0.45);
            node.addChild(sp,20,100 + i);
            self.addListeners(sp)
        }
    }
});
