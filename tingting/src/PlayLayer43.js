/**
 * Created by tingting on 2017/11/26.
 */

var PlayLayer43 = PlayLayerBase.extend({
    responseRect: [],
    selectTypes : -1,
    canTouchBtn : false,

    animalTalk : [  "在研究中，把一只刚出生一天的\n小羊放在视崖装置的玻璃上，\n并把地板调节到了特定高度。\n小羊很害怕，肢体都僵直了。\n你猜研究者把地板调节到什么高度？\n请你拖动正确的装置和相应\n状态的小羊到相应的位置。",
                    "在研究中，把一只刚出生一天的\n小羊放在视崖装置的玻璃上，\n并把地板调节到了特定高度。\n小羊表现得很镇定。你猜研究\n者把地板调节到什么高度？请你拖动\n正确的装置和相应状态的小羊\n到相应的位置。",
                    "在研究中，研究者每次把一只小\n鼠放到了视崖装置中间的平台上，\n并改变平台的高度。小鼠在平台\n边缘探索一番之后离开了平台，\n绝大多数的小鼠都去了装置的其中一侧。\n你猜此时中间的平台有多高，\n小鼠去了哪一侧？请你拖动小鼠和\n相应高度的平台到正确的位置。",
                    "现在我们假设研究者放置了一群\n小猫在视崖装置中间的平台上。\n小猫们活泼地爬来爬去，马上，\n平台上就一只小猫也不剩了。\n你能揣测出它们都去了哪吗？\n请你把小猫们拖到它们\n可能出现的位置。",
                    "现在我们假设研究者放置了一群\n小龟在视崖装置中间的平台上。\n小龟们活泼地爬来爬去，马上，\n平台上就一只小龟也不剩了。\n你能揣测出它们都去了哪吗？\n请你把小龟们拖到它们\n可能出现的位置。"],

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

        self.contentRes = [0,0];
        self.nowStep = 0;
        self.selectTypes = -1;
        self.movePos = [-1,-1,-1];


        var menu = new cc.Menu();
        menu.setPosition(0,0);
        menu.setName("menu");
        self._content.addChild(menu,2);

        function addDesk(tag,sender){
            console.log("tag = " + tag);
            var names = [res.play_4_9,res.play_4_10,res.play_4_11,res.play_4_12];
            var sp = self._content.getChildByName("desk");
            if(sp){
               sp.removeFromParent();
            }

            var sp = new cc.Sprite(names[tag]);
            sp.setPosition(0,0);
            sp.setName("desk");
            self._content.addChild(sp,1);


            self.selectTypes = tag;
        }

        var nameArr = [res.market_4_18,res.market_4_19,res.market_4_20,res.market_4_21];
        for(var i = 0; i < 3; i++){
            var spNormal = new cc.Sprite(nameArr[i]);
            var spSelect = new cc.Sprite(nameArr[i]);

            var item = new cc.MenuItemSprite(spNormal,spSelect);
            item.setPosition(-460, 200 - 200*i);
            item.setCallback(addDesk.bind(this,i),this);
            menu.addChild(item,1)
        }


        self.addAnimals();
        // play_logo
        self.addSpeak(0);

        //self.responseRect = [ cc.rect(-210,100,100,100),cc.rect(-50,100,100,100),cc.rect(110,100,100,100)];

        //for(var i = 0 ; i< self.responseRect.length ;i++){
        //    var bgLayer = new cc.LayerColor(cc.color(0, 0, 0, 180),100,100);
        //    bgLayer.setPosition(self.responseRect[i].x,self.responseRect[i].y);
        //    self._content.addChild(bgLayer,20);
        //}
    },

    addSpeak : function(levs){
        this.nowTime = Date.parse(new Date());
        var self = this;

        var logo = new cc.Sprite(res.play_logo_png);
        logo.setPosition(-550,-230);
        logo.setTag(5000);
        self._content.addChild(logo,2);

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
        if((nowTime - startTime)/1000 <= 10){
            alert("至少阅读10秒，请仔细看下线索哦。");
            return ;

        }

        var speak = this._content.getChildByTag(5100);
        if(speak){
            speak.removeFromParent(true);
        }

        var speak = this._content.getChildByTag(5000);
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
                if (this.nowStep < 3){
                    if(this.movePos[i] !== -1){
                        return;
                    }

                    var node = this._content.getChildByTag(1000 + i);
                    if(node){
                        return true;
                    }

                    this.movePos[i] = target.getTag();
                }else{

                    this.movePos[target.getTag() - 10000] = i;
                }




                for(var j = 0; j < this.responseRect.length ; j++){
                    var node = this._content.getChildByTag(1000 + j);
                    if(node){
                        node.removeFromParent(true);
                    }
                }

                var node = new cc.LayerColor(cc.color(0, 255, 255, 180),rects.width,rects.height);
                node.setPosition(rects.x,rects.y);
                this._content.addChild(node,2,1000 + i);
                return;
            }
        }
        //
        if(this.nowStep < 3){
            for(var i = 0 ; i<  this.movePos.length ; i++){
                if(this.movePos[i] === target.getTag()){
                    this.movePos[i] = -1;
                    var node = this._content.getChildByTag(1000 + i);
                    if(node){
                        node.removeFromParent();
                    }
                    return;
                }
            }
        }else{
            this.movePos[target.getTag() - 10000] =  -1;
        }

    },


    onTouchEnded : function(touch,event){
        var target = event.getCurrentTarget();
        var flag = true;

        if(this.nowStep < 3 ){
            for(var i = 0 ; i< this.responseRect.length ; i++){

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
                var tag = target.getTag() - 10000;
                target.setPosition(460 , 200 - 100 * tag);

            }
        }else{
           for(var i = 0 ;i < 2; i++){
               var node = this._content.getChildByTag(1000 + i);
               if(node){
                   node.removeFromParent();
               }
           }
        }




        this.canTouchBtn = true;
    },

    addAnimals : function(){
        var self = this;

        self.contentRes = [0,0];
        self.selectTypes = -1;
        self.movePos = [-1,-1,-1];
        self.responseRect =  [cc.rect(-200,50,100,180),cc.rect(-50,50,100,180),cc.rect(90,50,100,180)];

        var sp = self._content.getChildByName("desk");
        if(sp){
            sp.removeFromParent();
        }

        for(var i = 0 ; i < 5 ; i++){
            var sp = self._content.getChildByTag(10000 + i);
            if(sp){
                sp.removeFromParent();
            }
        }


        var nArr = [res.market_4_5,res.market_4_9,res.market_4_22,res.market_4_8,res.market_4_4];
        for(var i = 0 ; i < 5; i++ ){

            var sp = new cc.Sprite(nArr[i]);
            sp.setScale(0.8);
            sp.setPosition(460 , 200 - 100 * i);
            self._content.addChild(sp,2,10000 + i);
            self.addListeners(sp);
        }
    },


    addOthers : function(){
        var self = this;

        self.movePos = [-1,-1,-1,-1,-1,-1];
        self.responseRect = [ cc.rect(-210 - 210,30,160,150),cc.rect(110 - 250,20,160,150)];

        var sp = self._content.getChildByName("menu");
        if(sp){
            sp.removeFromParent();
        }

        var sp = self._content.getChildByName("desk");
        if(sp){
            sp.removeFromParent();
        }

        for(var i = 0 ; i < 6 ; i++){
            var sp = self._content.getChildByTag(10000 + i);
            if(sp){
                sp.removeFromParent();
            }
        }


        var sp = new cc.Sprite(res.play_4_9);
        sp.setPosition(-150,0);
        sp.setName("desk");
        self._content.addChild(sp,1);

        var names = res.market_4_22;
        if(self.nowStep === 3){
            names = res.market_4_8;
        }


        for(var i = 0 ; i < 6 ; i++){
            var sp = new cc.Sprite(names);
            sp.setPosition(300 + 150 *(i%2) , 150 - 150 *Math.floor(i/2));
            sp.setScale(0.7);
            self._content.addChild(sp,2,10000 + i);
            self.addListeners(sp);
        }


        //for(var i = 0 ; i< self.responseRect.length ;i++){
        //    var bgLayer = new cc.LayerColor(cc.color(0, 0, 0, 180),200,150);
        //    bgLayer.setPosition(self.responseRect[i].x,self.responseRect[i].y);
        //    self._content.addChild(bgLayer,20);
        //}
    },






    onOk : function(){
        console.log("i am onOk");
        if (this.checkGame() == true){
            var self = this;

            function continueGame(){
                self.nowStep += 1;
                console.log("--------------" + self.nowStep);
                if(self.nowStep < 3){
                    self.addAnimals();
                }else{
                    self.addOthers();
                }


                self.addSpeak(self.nowStep);
            }

            if(self.nowStep < 4){
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
                    layer.setData(1);
                    layer.setContent("恭喜你，解锁下一关！\n")
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
       var self = this;
        console.log(self.nowStep+ "   " + self.selectTypes + "     " + JSON.stringify(self.movePos)  );
        if(self.nowStep === 0){
            if(self.selectTypes === 0 && (self.movePos[0] === -1 && self.movePos[1] === -1 && self.movePos[2] === 10000 )){
                return true;
            }

            return false;
        }

        if(self.nowStep === 1){

            if(self.selectTypes === 2 && (self.movePos[0] === -1 && self.movePos[1] === -1 && self.movePos[2] === 10004 )){
                return true;
            }

            return false;

        }

        if(self.nowStep === 2){
            if(self.selectTypes === 1 && (self.movePos[0] === 10001 && self.movePos[1] === -1 && self.movePos[2] === -1 )){
                return true;
            }

            return false;

        }

        if(self.nowStep === 3){
            for(var i = 1; i < 6 ; i++){
                if(this.movePos[i] !== 0){
                    return false;
                }
            }

            return true;

        }

        if(self.nowStep === 4){
            var count = 0;
            for(var i = 1; i < 6 ; i++){
                if(this.movePos[i] < 0){
                    return false;
                }

                count += this.movePos[i]
            }

            if(count > 0){
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

    addBarGoods : function(){

    }
});