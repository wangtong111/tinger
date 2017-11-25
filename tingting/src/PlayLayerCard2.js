var PlayLayerCard2 =  PlayLayerBase.extend({
    responseRect:null,
    selectTypes : -1,
    canTouchBtn : false,

    animalTalk : ["随着横坐标变化的趋势。科学家们用相关系数\n来表示这个图中两个量相互关联的程度，\n你能找出横坐标和纵坐标的\n相关系数是0.8左右的图吗？"],

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

        if(selectGoods.length != 4){
            self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                alert("选择物品数目不对，请返回超市重新选择。");
            })));
            return;
        }

        for(var i = 0 ; i< selectGoods.length ; i++){
            if(selectGoods[i] % 2 === 0){
                self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                    alert("选择物品有误，请返回超市重新选择。");
                })));
                return;
            }
        }

        LogData.setGameStartTime(Date.parse(new Date()));

        self.movePos = -1;

        var nameArr = [res.play_a,res.play_b,res.play_c,res.play_d];
        for(var i = 0 ; i < 4 ;i++){

            var card = new cc.Sprite(nameArr[i]);
            card.setPosition(-250 + 500 * (i%2) , 160 - 340*Math.floor(i/2));
            card.setScale(0.6);
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
        if((nowTime - startTime)/1000 <= 20){
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
            var bg = this._content.getChildByTag(100);
            if(bg)
                bg.removeFromParent();

            this.movePos = target.getTag();
            var bgLayer = new cc.LayerColor(cc.color(0, 0, 0, 100),647*0.6,487*0.6);
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
        console.log("-------->" + JSON.stringify(this.movePos));
        if (this.canTouchBtn){

            var callback = function(cbData){
                hideWaitting();
                if(cbData != null && cbData["code"] == 1){
                    LogData.clean();

                    if(this.checkGame()){
                        this.updateLevs();
                        var layer = new CompleteTips();
                        layer.content = "恭喜你回答正确！\n成功解锁第三关！";
                        layer.setData(1);
                        this.addChild(layer,100);
                        return;
                    }

                    var layer = new CompleteTips();
                    layer.setContent("很遗憾，你的回答是错误的！\n再看看文献里是怎么写的？");
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

            var sendData = {};
            LogData.setGameEndTime(Date.parse(new Date()));
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
       if (this.movePos == this.contentRes)
            return true;


       return false;
    },

    onExit:function(){

        cc.eventManager.removeListener(this);
        this._super();
    },

    addBarGoods : function (node) {
        
    }
});