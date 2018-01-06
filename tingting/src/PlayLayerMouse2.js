/**
 * Created by tingting on 2017/11/5.
 */
var PlayLayerMouse2 =  PlayLayerBase.extend({
    responseRect:null,
    nowStep : 0,
    canTouchBtn : false,

    animalTalk : ["这些箱子里装着一些小鼠的脑皮层组织\n（尽管实验中并不是装在箱子里的）。在不同\n实验情境下成长的小鼠的脑皮层可能\n会表现出不同的状态。\n现在，请你告诉我哪个箱子更可能\n装着丰富情境下长大的小鼠的大脑皮层吧。",
    "这次，请你告诉我哪个箱子更可\n能装着贫乏情境下长大的小鼠\n的大脑皮层吧。"],

    movePos : -1,

    contentRes  : 1,

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
            if(selectGoods[i] !== 5 && selectGoods[i] !== 1 && selectGoods[i] !== 6){
                self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                    alert("选择物品有误，请返回超市重新选择。");
                })));
                return;
            }
        }

        LogData.setGameStartTime(Date.parse(new Date()));

        self.movePos = -1;
        self.nowStep = 0;

        var nameArr = [res.market3_box1,res.market3_box2,res.market3_box3];
        for(var i = 0 ; i < 3 ;i++){

            var card = new cc.Sprite(nameArr[i]);
            card.setPosition(-250 + 250 * i,0);
            card.setTag(i);
            self._content.addChild(card,1);
            self.addListeners(card);
        }


        // play_logo
        var logo = new cc.Sprite(res.play_logo_png);
        logo.setPosition(-550,-230);
        self._content.addChild(logo,2);

        self.addSpeak(0);

        //for(var i = 0 ; i< 6 ;i++){
        //    var bgLayer = new cc.LayerColor(cc.color(0, 0, 0, 180),100,100);
        //    bgLayer.setPosition(-250 + 220 * (i%3) , 30 - 220*Math.floor(i/3) );
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
        content.x = 160 + 130;
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
            var bg = this._content.getChildByTag(100);
            if(bg)
                bg.removeFromParent();

            this.movePos = target.getTag();
            var bgLayer = new cc.LayerColor(cc.color(0, 0, 0, 100),200,140);
            bgLayer.ignoreAnchorPointForPosition(false);
            bgLayer.setPosition(target.x,target.y);
            this._content.addChild(bgLayer,20,100);

            return true;
        }

        return false;
    },

    onTouchMoved : function (touch,event) {

    },


    onTouchEnded : function(touch,event){
        if(this.movePos < 0)
            this.canTouchBtn = false;
        else
            this.canTouchBtn = true;
    },

    onOk : function(){
        // if (this.canTouchBtn){
        if (this.checkGame() == true){
            var self = this;

            function continueGame(){
                self.movePos = -1;
                self.nowStep += 1;

                var bg = self._content.getChildByTag(100);
                if(bg){
                    bg.removeFromParent();
                }

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

    checkGame : function(){
        var self = this;
        if(self.nowStep === 0 && self.movePos === 0 ){
            return true;
        }else if(self.nowStep === 1 && self.movePos === 1){
            return true;
        }

        return false;
    },

    onExit:function(){

        cc.eventManager.removeListener(this);
        this._super();
    },

    addBarGoods : function (node) {

    }
});
