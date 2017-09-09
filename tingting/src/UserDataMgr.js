var UserDataMgr = UserDataMgr || {};
UserDataMgr._goods = null;

UserDataMgr.setSelctGoods = function(data){
    UserDataMgr._goods = data;
};

UserDataMgr.getSelctGoods = function(){
    return UserDataMgr._goods;
};

