var LogData = {};
var dataTable = {};

LogData.setRoomAndLev = function(room_id,lev_id){

    dataTable.room_id = room_id;
    dataTable.lev_id = lev_id;
};

LogData.setStartReadTime = function (startTime) {

    dataTable.start_read_time = startTime;
};

LogData.getStartReadTime = function () {

   return dataTable.start_read_time ;
};

LogData.setEndReadTime = function (endTime) {

    dataTable.end_read_time = endTime;
    dataTable.cross_read_time = (dataTable.end_read_time - dataTable.start_read_time)/1000;
};

LogData.appendSelectGoods = function (goods) {

    if ( dataTable.hasOwnProperty("select_goods") ){
        cc.log("i am here ,hahaha")

        dataTable.select_goods.push(goods);
        return;

    };

    dataTable.select_goods = new Array();
    dataTable.select_goods.push(goods);
};

LogData.setGameStartTime = function (startTime) {

    dataTable.start_game_time = startTime;
};

LogData.setGameEndTime = function (endTime) {

    dataTable.end_game_time = endTime;

    dataTable.cross_game_time = (dataTable.end_game_time - dataTable.start_game_time)/1000;
};

LogData.setGamePass  = function(pass){

  dataTable.game_pass  = pass;
};

LogData.getAllData = function(){
    return dataTable;
};

LogData.clean = function(){

    dataTable = {};
};

