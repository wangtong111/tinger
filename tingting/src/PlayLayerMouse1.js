/**
 * Created by wangtong on 2017/11/5.
 */
var PlayLayerMouse1 = PlayLayerBase.extend({
    responseRect:null,
    selectTypes : -1,
    canTouchBtn : false,

    animalTalk : ["非常好！研究中正是使用了\n同一窝出生的小鼠，这样就极大地降低了\n基因的影响。除了你选择的这一窝小鼠外，\n研究人员还选择了其他几窝小鼠，\n现在它们都在屏幕的左边。\n这些小鼠需要被分配到不同的实验情境里，\n正如你在文献中所读过的一样，\n它们分别是丰富条件、实验室条件和贫乏条件。\n请你代替研究人员把小鼠们拖到合适的情境中去吧！"],

    movePos : [-1,-1,-1,-1,-1,-1,-1,-1,-1],

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
            if(selectGoods[i] !== 5 && selectGoods[i] !== 7 && selectGoods[i] !== 6){
                self._content.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function () {
                    alert("选择物品有误，请返回超市重新选择。");
                })));
                return;
            }
        }

        LogData.setGameStartTime(Date.parse(new Date()));

        this.movePos = [-1,-1,-1,-1,-1,-1,-1,-1,-1];

        var nameArr = [res.market3_mouse_tall,res.market3_mouse_tall,res.market3_mouse_tall,res.market3_mouse_short,res.market3_mouse_short,res.market3_mouse_short,res.market3_mouse_normal,res.market3_mouse_normal,res.market3_mouse_normal];

        for(var i = 0 ; i < 9 ;i++){
            var name = nameArr[i];
            var card = new cc.Sprite(name);
            card.setPosition(-500 + 90 * (i%3) , 250 - 150*Math.floor(i/3));
            self._content.addChild(card,4,i);
            self.addListeners(card);
        }

        var middle = new cc.Sprite(res.play_midcage);
        middle.setPosition(-50,92);
        self._content.addChild(middle,6);

        var large = new cc.Sprite(res.play_bigcage);
        large.setPosition(330,150);
        self._content.addChild(large,6);

        var desk = new cc.Sprite(res.play_table);
        desk.setPosition(450,60);
        self._content.addChild(desk,2);

        // play_logo
        var logo = new cc.Sprite(res.play_logo_png);
        logo.setPosition(-550,-230);
        self._content.addChild(logo,2);


        for(var i = 0 ; i< 3 ; i++){
            var small = new cc.Sprite(res.play_smallcage);
            small.setPosition(-100 + 240 * i ,-240);
            self._content.addChild(small,6);
        }


        self.addSpeak(0);
        self.responseRect = [   cc.rect(620 - 800,500 - 450,80,80),cc.rect(710 - 800,500 - 450,80,80),cc.rect(800 - 800,500 - 450,80,80),
            cc.rect(950 - 800,500 - 450,80,80),cc.rect(1050 - 800,50,80,80),cc.rect(1150 - 800,50,80,80),cc.rect(640 - 800,-290,80,80),
            cc.rect(880 - 800,-290,80,80),cc.rect(1120 - 800 ,-290,80,80)];
        //for(var i = 0 ; i< 9 ;i++){
        //    var bgLayer = new cc.LayerColor(cc.color(0, 0, 0, 180),80,80);
        //    var x = self.responseRect[i].x;
        //    var y = self.responseRect[i].y;
        //    bgLayer.setPosition(x,y);
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

        var content = new cc.LabelTTF(this.animalTalk[levs],"Arial",6);
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

        for(var i = 0; i < 9; i++ ){

            var rects = this.responseRect[i];
            if(cc.rectContainsPoint(rects,target)){
                if(this.movePos[i] !== -1){
                    return;
                }

                var node = this._content.getChildByTag(1000 + i);
                if(node){
                    return true;
                }

                for(var j = 0; j < 9 ; j++){
                    var node = this._content.getChildByTag(1000 + j);
                    if(node){
                        node.removeFromParent(true);
                    }
                }

                this.movePos[i] = target.getTag();

                var node = new cc.LayerColor(cc.color(0, 255, 255, 180),80,80);
                node.setPosition(rects.x,rects.y);
                this._content.addChild(node,2,1000 + i);
                return;
            }
        }

        for(var i = 0 ; i< 9 ; i++){

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
        for(var i = 0 ; i< 9 ; i++){
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
            var i = target.getTag( );
            target.setPosition(-500 + 90 * (i%3) , 250 - 150*Math.floor(i/3));
        }

        for(var i = 0 ; i < 9 ; i++){
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
                        layer.content = "恭喜你回答正确！\n成功解锁第二关！";
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

        for(var i = 0 ; i< 3 ; i++){
            var count = 0;
            for(var j = 0 ; j < 3; j++){
                count += Math.floor (this.movePos[i*3 + j]/3)
            }

            if(count !== 3){
                return false;
            }

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