var UserDataMgr = UserDataMgr || {};
UserDataMgr._goods = null;

UserDataMgr.setSelctGoods = function(data){
    UserDataMgr._goods = data;
};

UserDataMgr.getSelctGoods = function(data){
    return UserDataMgr._goods;
};

