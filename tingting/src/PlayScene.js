
var DocLayer = cc.Layer.extend({
    types : 0,
    lev : 0,
    _mTable : true,
    _mSlider : true,

    setData : function(){
        this.types = UserDataMgr.getSelectRoom();
        this.lev = UserDataMgr.getselectLev();
    },


    onEnter : function () {
        LogData.setStartReadTime(Date.parse(new Date()));
        var self = this;
        self._super();
        self.setData();

        var node = new cc.Node();
        node.x = cc.visibleRect.center.x;
        node.y = cc.visibleRect.center.y;
        self.addChild(node,3,100);

        var bgLayer = new cc.LayerColor(cc.color(255, 255, 255, 255),1450,760);
        bgLayer.ignoreAnchorPointForPosition(false);
        bgLayer.setPosition(0,50);
        node.addChild(bgLayer);

        var tableView = new cc.TableView(self,cc.size(1450,760));
        //设置tableview的滑动的方向
        //cc.SCROLLVIEW_DIRECTION_HORIZONTAL 水平
        //cc.SCROLLVIEW_DIRECTION_VERTICAL 竖直
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        tableView.x = -725;
        tableView.y = -330;

        // 设置委托
        tableView.setDelegate(this);

        //tableView填充方式  (cc.TABLEVIEW_FILL_BOTTOMUP)
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        node.addChild(tableView,5,1000);

        //更新tableview
        tableView.reloadData();


        var len = DOC_CONFIG[this.types][this.lev].length;
        // Add the slider
        var slider = new cc.ControlSlider(res.play_slide_png, res.play_slide_png, res.play_slide_btn_png);
        slider.anchorX = 0.5;
        slider.anchorY = 0.5;
        slider.setMinimumValue(-(1810*len - 760) - 10); // Sets the min value of range
        slider.setMaximumValue(0 + 10); // Sets the max value of range
        slider.setMaximumAllowedValue(0);
        slider.setMinimumAllowedValue(-(1810*len - 760));
        slider.setValue(-(1810*len - 470));
        slider.setPosition(630 + 75,0);
        slider.setTag(2000);
        slider.setRotation(90);
        node.addChild(slider,6,2000);
        // When the value of the slider will change, the given selector will be call
        slider.addTargetWithActionForControlEvents(this, this.valueChanged, cc.CONTROL_EVENT_VALUECHANGED);

        var menu = new cc.Menu();
        menu.setPosition(0,0);
        node.addChild(menu,10);

        function onOk(){
            var startTime = LogData.getStartReadTime();
            var nowTime = Date.parse(new Date());
            cc.log(startTime);
            cc.log(nowTime);
            if((nowTime - startTime)/1000 <= 60){

                alert("请至少阅读一分钟再进行游戏。");
                return;
            }
            var layer = new MarketSelect();
            var scene = cc.director.getRunningScene();
            scene.addChild(layer,5);
            self.removeFromParent();
        }

        var spNormal = new cc.Sprite(res.btn_ok_png);
        spNormal.setScale(1.4);
        var spSelect = new cc.Sprite(res.btn_ok_png);
        spSelect.setScale(1.4);

        var buyItem = new cc.MenuItemSprite(spNormal,spSelect);
        buyItem.setPosition(0,-400);
        buyItem.setAnchorPoint(0.5,0.5);
        buyItem.setCallback(onOk,this);
        menu.addChild(buyItem,1);

    },
    //slider回调
    valueChanged : function(sender, controlEvent){
        var self = this;
        self._mTable = false;
        if (self._mSlider === true){
            var bg = self.getChildByTag(100);
            var tableView = bg.getChildByTag(1000);
            var pSlider = bg.getChildByTag(2000);
            if (tableView && pSlider)
                tableView.setContentOffset(cc.p(0,pSlider.getValue()));
        }
        self._mTable = true;
    },
    //设置点击cell后的回调函数
    scrollViewDidScroll: function (view) {
        var self = this;
        self._mSlider = false;

        if (self._mTable == true) {
            var bg = self.getChildByTag(100)
            var tableView = bg.getChildByTag(1000)
            var pSlider = bg.getChildByTag(2000)
            if (tableView && pSlider)
                pSlider.setValue(tableView.getContentOffset().y);
        }

        self._mSlider = true;
    },

    //设置cell大小
    tableCellSizeForIndex: function (table, idx) {
        return cc.size(1400,1810);
    },
    //添加Cell
    tableCellAtIndex: function (table, idx) {
        //alert(idx.toString());
        var cell = table.cellAtIndex(idx);
        if (!cell) {
            cell = new cc.TableViewCell();

            var doc = new cc.Sprite(DOC_CONFIG[this.types][this.lev][idx]);
            doc.setAnchorPoint(0,0);
            doc.setPosition(0,0);
            cell.addChild(doc);
        } else {
            return cell
        }

        return cell;
    },
    //设置cell个数
    numberOfCellsInTableView: function (table) {
        // cc.log("================");
        // cc.log(this.types);
        // cc.log(this.lev);
        // cc.log("===================");
        return DOC_CONFIG[this.types][this.lev].length;
    },

    onExit : function(){

        LogData.setEndReadTime(Date.parse(new Date()));
    }
});



var PlayScene = cc.Scene.extend({

    ctor:function(types,lev){
        this._super();
        UserDataMgr.setSelectRoom(types);
        UserDataMgr.setSelectLev(lev);
        LogData.setRoomAndLev(types,lev);

        var layer = new DocLayer();
        this.addChild(layer,1);

        var bgName = PLAY_CONFIG[types];
        var bg = new cc.Sprite(bgName);
        bg.x = cc.visibleRect.center.x;
        bg.y = cc.visibleRect.center.y;
        this.addChild(bg);
    }

});