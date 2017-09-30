/****************************************************************************
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
/**
 * <p>cc.LoaderScene is a scene that you can load it when you loading files</p>
 * <p>cc.LoaderScene can present thedownload progress </p>
 * @class
 * @extends cc.Scene
 * @example
 * var lc = new cc.LoaderScene();
 */
cc.LoaderScene = cc.Scene.extend({
    _interval : null,
    _label : null,
    _className:"LoaderScene",
    cb: null,
    target: null,
    _box1: null,
    _box2: null,
    _box1Str : "",
    _box2Str : "",
    /**
     * Contructor of cc.LoaderScene
     * @returns {boolean}
     */
    init : function(){
        var self = this;

        //logo
        var logoWidth = 160;
        var logoHeight = 200;

        // bg
        var bgLayer = self._bgLayer = new cc.LayerColor(cc.color(32, 32, 32, 255));
        self.addChild(bgLayer, 0);

        //image move to CCSceneFile.js
        var fontSize = 24, lblHeight =  -logoHeight / 2 + 100;
        if(cc._loadPro){
            //loading logo
            cc.loader.loadImg(cc._loadPro, {isCrossOrigin : false }, function(err, img){
                logoWidth = img.width;
                logoHeight = img.height;
                self.initPro(img, cc.visibleRect.center);
            });
            fontSize = 30;
            lblHeight = -logoHeight / 2 - 10;
        }
        //loading percent
        var label = self._label = new cc.LabelTTF("Loading... 0%", "Arial Black", fontSize);
        label.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, lblHeight - 200)));
        label.setColor(cc.color(200, 200, 200,255));
        bgLayer.addChild(this._label, 20);

        if(cc._loadIcon){
            cc.loader.loadImg(cc._loadIcon, {isCrossOrigin : false }, function(err, img){
                logoWidth = img.width;
                logoHeight = img.height;
                self.initIcon(img, cc.visibleRect.center);
            });
        }
        return true;
    },

    initIcon : function(img,centerPos){

        var self = this;
        var texture2d = self._texture2d = new cc.Texture2D();
        texture2d.initWithElement(img);
        texture2d.handleLoadedTexture();
        var icon = new cc.Sprite(texture2d);
        icon.setPosition(centerPos.x,centerPos.y + 200)
        self._bgLayer.addChild(icon, 10,200);
    } ,

    initPro : function (img, centerPos) {
        var self = this;
        var texture2d = self._texture2d = new cc.Texture2D();
        texture2d.initWithElement(img);
        texture2d.handleLoadedTexture();
        var proSprite = new cc.Sprite(texture2d);
        var progress = new cc.ProgressTimer(proSprite);
        progress.setType(cc.ProgressTimer.TYPE_BAR);
        progress.setMidpoint(cc.p(0,0));
        progress.setBarChangeRate(cc.p(1,0));
        progress.setPosition(centerPos.x,centerPos.y - 200);
        progress.setPercentage(0);
        self._bgLayer.addChild(progress,3,100);
        // var logo = self._logo = new cc.Sprite(texture2d);
        // // logo.setScale(cc.contentScaleFactor());
        // logo.setScale(0.5,0.3);
        // logo.x = centerPos.x;
        // logo.y = centerPos.y;
        // self._bgLayer.addChild(logo, 10);
    },
    /**
     * custom onEnter
     */
    onEnter: function () {
        var self = this;
        cc.Node.prototype.onEnter.call(self);
        self.schedule(self._startLoading, 0.3);
    },
    /**
     * custom onExit
     */
    onExit: function () {
        this.removeAllChildren(true);
        cc.Node.prototype.onExit.call(this);
    },

    /**
     * init with resources
     * @param {Array} resources
     * @param {Function|String} cb
     * @param {Object} target
     */
    initWithResources: function (resources, cb, target) {
        if(cc.isString(resources))
            resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
        this.target = target;
    },

    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        cc.loader.load(res,
            function (result, count, loadedCount) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                self._label.setString("Loading... " + percent + "%");
                var pro = self._bgLayer.getChildByTag(100);
                if(pro)
                    pro.setPercentage(percent);
            }, function () {
                self._label.setString("Loading... 100%");
                var pro = self._bgLayer.getChildByTag(100);
                if(pro)
                    pro.setPercentage(100);
                // if (self.cb)
                //     self.cb.call(self.target);
                self.showLogin()
            });
    },

    showLogin : function(){
        var self = this;
        self._bgLayer.removeAllChildren(true);
        self._bgLayer.removeFromParent(true);
        self._label.removeFromParent(true);

        var bg = new cc.Sprite(res.loading_bg_jpg);
        bg.setPosition(cc.visibleRect.center);
        self.addChild(bg,1);

        var bgLayer = new cc.LayerColor(cc.color(0, 0, 0, 100));
        bgLayer.ignoreAnchorPointForPosition(false);
        bgLayer.setPosition(cc.visibleRect.center);
        self.addChild(bgLayer,2);

        var node = new cc.Node();
        node.x = cc.visibleRect.center.x;
        node.y = cc.visibleRect.center.y;
        self.addChild(node,3);


        var popup = new cc.Sprite(res.popup_bg_png);
        popup.setPosition(0,0);
        node.addChild(popup);

        var num = new cc.LabelTTF("学号","Arial Black",50);
        num.setColor(cc.color(0,0,0,255));
        num.setPosition(-160,100);
        node.addChild(num,1);

        var frame = new cc.Sprite(res.text_frame_png);
        frame.setPosition(80,100);
        node.addChild(frame,1);

        this._box1 = new cc.EditBox(cc.size(234,61), new cc.Scale9Sprite(res.text_block_png), new cc.Scale9Sprite(res.text_block_png));
        this._box1.setString("");
        this._box1.x = 80;
        this._box1.y = 100;
        this._box1.setFontColor(cc.color(100, 100, 0));
        this._box1.setFontSize(25);
        this._box1.setDelegate(this);
        node.addChild(this._box1,2);

        var mima = new cc.LabelTTF("密码","Arial Black",50);
        mima.setColor(cc.color(0,0,0,255));
        mima.setPosition(-160,-30);
        node.addChild(mima,1);

        var frame1 = new cc.Sprite(res.text_frame_png);
        frame1.setPosition(80,-30);
        node.addChild(frame1,1);

        this._box2 = new cc.EditBox(cc.size(234,61),new cc.Scale9Sprite(res.text_block_png));
        this._box2.setString("");
        this._box2.x = 80;
        this._box2.y = -30;
        this._box2.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this._box2.setFontColor(cc.color(100, 100, 0));
        this._box2.setFontSize(30);
        this._box2.setDelegate(this);
        node.addChild(this._box2,2);



        function onOk(){
           self.onOk()
        }

        var menu = new cc.Menu();
        menu.setPosition(0,0);
        node.addChild(menu);

        var spNormal = new cc.Sprite(res.btn_ok_png);
        var spSelect = new cc.Sprite(res.btn_ok_png);

        var buyItem = new cc.MenuItemSprite(spNormal,spSelect);
        buyItem.setPosition(0,-160);
        buyItem.setAnchorPoint(0.5,0.5);
        buyItem.setCallback(onOk,this);
        menu.addChild(buyItem,1);




    },

    onOk : function(){

        var self = this;
        // self.cb();



        function callback(cbData) {
            hideWaitting();
            if(cbData == null || cbData == ""){

                alert("账号或密码错误，请重新输入");
                return ;
            }

            if (self.cb){
                UserDataMgr.init(cbData);
                self.cb(self.target);
            }
        }
        var data = {};
        data.id = self._box1Str;
        data.password = self._box2Str;
        cc.log(JSON.stringify(data));
        sendRequest(data,callback);
        showWatting();
        //var self = this;
        //if(self._box1Str == "201622060049" && self._box2Str == "zuoting" ){
        //
        //    if (self.cb){
        //
        //        self.cb(self.target);
        //    }
        //}
        //else{
        //
        //
        //    alert("账号或密码错误。");
        //}
    },

    editBoxEditingDidBegin: function (editBox) {
        // cc.log("editBox " + this._getEditBoxName(editBox) + " DidBegin !");
    },

    editBoxEditingDidEnd: function (editBox) {
        // cc.log("editBox " + this._getEditBoxName(editBox) + " DidEnd !");
    },

    editBoxTextChanged: function (editBox, text) {

        if (this._box1 == editBox) {
            this._box1Str = text;
        } else{
            this._box2Str = text;
        }
    },

    editBoxReturn: function (editBox) {
        // cc.log("editBox " + this._getEditBoxName(editBox) + " was returned !");
        if (this._box2 == editBox) {

            this.onOk();
        }

    }
});
/**
 * <p>cc.LoaderScene.preload can present a loaderScene with download progress.</p>
 * <p>when all the resource are downloaded it will invoke call function</p>
 * @param resources
 * @param cb
 * @param target
 * @returns {cc.LoaderScene|*}
 * @example
 * //Example
 * cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new HelloWorldScene());
    }, this);
 */
cc.LoaderScene.preload = function(resources, cb, target){
    var _cc = cc;
    if(!_cc.loaderScene) {
        _cc.loaderScene = new cc.LoaderScene();
        _cc.loaderScene.init();
    }
    _cc.loaderScene.initWithResources(resources, cb, target);

    cc.director.runScene(_cc.loaderScene);
    return _cc.loaderScene;
};