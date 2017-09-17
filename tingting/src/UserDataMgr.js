var UserDataMgr = {};
UserDataMgr._goods = null;
UserDataMgr._selectRoom = -1;
UserDataMgr._selecrLev  = null;

UserDataMgr.init = function(data){

    for(var item  in data){

        UserDataMgr[item] = data[item];
    }

    cc.log(JSON.stringify(UserDataMgr));
};

UserDataMgr.setSelectGoods = function(data){
    UserDataMgr._goods = data;
};

UserDataMgr.getSelectGoods = function(){
    return UserDataMgr._goods;
};

UserDataMgr.setSelectRoom = function(roomId){

    UserDataMgr._selectRoom = roomId;
};

UserDataMgr.getSelectRoom = function(){

    return UserDataMgr._selectRoom;
};

UserDataMgr.setSelectLev = function(lev){

    UserDataMgr._selecrLev = lev;
};

UserDataMgr.getselectLev = function(){
    return UserDataMgr._selecrLev
};



