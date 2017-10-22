/**
 * Created by wangtong on 2017/10/22.
 */
var PlayLayerCard1 = PlayLayerBase.extend({
    responseRect:null,
    selectTypes : -1,
    canTouchBtn : false,

    animalTalk : ["我要 gameover"],

    movePos : [-1,103,101,-1,-1,-1],

    contentRes  : [102,103,101,105,104,100],

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
            if(selectGoods[i] === 2 || selectGoods[i] === 4 || selectGoods[i] === 6){
                self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                    alert("选择物品有误，请返回超市重新选择。");
                })));
                return;
            }
        }

        LogData.setGameStartTime(Date.parse(new Date()));

        self.movePos = [-1,103,101,-1,-1,-1];
        var arrow = new cc.Sprite(res.play_arrow);
        arrow.setPosition(0,220);
        self._content.addChild(arrow,1);

        var name = new cc.LabelTTF("基因","Arial Bold",30);
        name.setColor(cc.color(0,0,0,255));
        name.setPosition(0,260);
        self._content.addChild(name,1);


        var arrow = new cc.Sprite(res.play_arrow);
        arrow.setScale(0.6,1);
        arrow.setRotation(90);
        arrow.setPosition(-345,0);
        self._content.addChild(arrow,1);

        var name = new cc.LabelTTF("环境","Arial Bold",30);
        name.setColor(cc.color(0,0,0,255))
        name.setPosition(-398,0);
        self._content.addChild(name,1);

        for(var i = 0 ; i < 6 ;i++){
            var name = res.play_card;
            if(i === 1){
                name = res.market2_card6;
            }else if(i === 2){
                name = res.market2_card2;
            }

            var card = new cc.Sprite(name);
            card.setPosition(-200 + 220 * (i%3) , 80 - 220*Math.floor(i/3));
            self._content.addChild(card,1);
        }


        for(var i = 0 ; i < selectGoods.length;i++){

            var card = self._content.getChildByTag(100 + i);
            self.addListeners(card);
        }

        // play_logo
        var logo = new cc.Sprite(res.play_logo_png);
        logo.setPosition(-550,-230);
        self._content.addChild(logo,2);

        self.addSpeak(0);
        self.responseRect = [   cc.rect(-250,30,100,100),cc.rect(-30,30,100,100),cc.rect(190,30,100,100),
                                cc.rect(-250,-190,100,100),cc.rect(-30,-190,100,100),cc.rect(190,-190,100,100)];
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

        for(var i = 0; i < 6; i++ ){

            var rects = this.responseRect[i];
            if(cc.rectContainsPoint(rects,target)){
                if(this.movePos[i] !== -1){
                    return;
                }

                if(i === 1 || i === 2){
                    return;
                }

                var node = this._content.getChildByTag(1000 + i);
                if(node){
                    return true;
                }

                for(var j = 0; j < 6 ; j++){
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

        for(var i = 0 ; i< 6 ; i++){
            if(i === 1 || i === 2)
                continue;

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
        for(var i = 0 ; i< 6 ; i++){
            if(i === 1 || i === 2)
                continue;
            if(this.movePos[i] === target.getTag()){
                target.setPosition(-200 + 220 * (i%3) , 80 - 220*Math.floor(i/3));
                target.setScale(1);
                flag = false;
                break;
            }

        }

        if(flag){
            target.setScale(0.55);
            var i = target.getTag( ) - 100;
            target.setPosition(130*i + 80 - 584,390);
            target.setScale(0.55);
        }

        for(var i = 0 ; i < 6 ; i++){
            if(this.movePos[i] < 0){
                this.canTouchBtn = false;
                return;
            }
        }


        this.canTouchBtn = true;
    },

    onOk : function(){
        console.log("-------->" + JSON.stringify(this.movePos));
        if (this.canTouchBtn){
            LogData.setGameEndTime(Date.parse(new Date()));

            var callback = function(cbData){
                hideWaitting();
                if(cbData != null && cbData["code"] == 1){
                    LogData.clean();

                    if(this.checkGame()){
                        this.updateLevs();
                        var layer = new CompleteTips();
                        layer.content = "   恭喜你有了一名裂脑人被试！";
                        layer.setData(1);
                        this.addChild(layer,100);
                        return;
                    }

                    var layer = new CompleteTips();
                    layer.setContent("哎呀，手术失败了!\n再看看文献里是怎么写的？");
                    //layer.content = "bbbbb";
                    layer.setData(2);
                    this.addChild(layer,100);
                    return;
                }

                alert("上传数据出错，请重新点击ok按钮。");
            };

            var cb = callback.bind(this);

            if(this.checkGame()){
                LogData.setGamePass(1);
            }
            else{
                LogData.setGamePass(0);
            }

            var sendData = {}
            sendData["id"] = UserDataMgr.id;
            sendData["data"] = LogData.getAllData();
            sendRequest(sendData,cb);
            showWatting();
            return;
        }

        alert("请先完成实验。");
        // cc.log("i am PlayBrainLayer onOk");
    },

    checkGame : function(){
        for(var i = 0 ; i< 6 ; i++){
            if (this.movePos[i] !== this.contentRes[i])
                return false;
        }

        return true;
    },

    onExit:function(){

        cc.eventManager.removeListener(this);
        this._super();
    }
});
