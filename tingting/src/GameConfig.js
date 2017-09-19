var GAME_TIPS = {};
GAME_TIPS[2] = "双胞胎实验室将于%d月%d日开放.";
GAME_TIPS[3] = "老鼠游乐园将于%d月%d日开放.";
GAME_TIPS[4] = "视涯实验室将于%d月%d日开放.";

var ROOM_CONFIG =  {};
ROOM_CONFIG[1] = res.house1_bg_jpg;

var PLAY_CONFIG = {};
PLAY_CONFIG[1] = res.play_1_bg_jpg ;

//配置小红旗位置
var FLAG_CONFIG =  {};
FLAG_CONFIG[1] = [cc.p(-255,-135),cc.p(-115,-70),cc.p(15,100),cc.p(105,-10),cc.p(185,142),cc.p(300,55)];//,cc.p(385,-25)];

//GOODS_CONFIG代表超市图片列表，第一个数字代表房间，第二个数字代表关卡
var GOODS_CONFIG =  {};

GOODS_CONFIG[1] ={};
GOODS_CONFIG[1][1] = [res.market_fourpoints_png,res.market_knife_png,res.market_orange_png,res.market_numbercard_png,res.market_cigar_png,res.market_lettercard_png,res.market_fourpoints_png,res.market_ashtray_png,res.market_brain_png];
GOODS_CONFIG[1][2] = GOODS_CONFIG[1][1];
GOODS_CONFIG[1][3] = [res.market_apple_png,res.market_knife_png,res.market_orange_png,res.market_numbercard_png,res.market_cigar_png,res.market_lettercard_png,res.market_fourpoints_png,res.market_ashtray_png,res.market_brain_png];
GOODS_CONFIG[1][4] = [res.market_apple_png,res.market_knife_png,res.market_orange_png,res.market_cigar_card_png,res.market_cigar_png,res.market_ashtray_card_png,res.market_fourpoints_png,res.market_ashtray_png,res.market_brain_png];
GOODS_CONFIG[1][5] = [res.market_apple_png,res.market_knife_png,res.market_orange_png,res.market_cigar_card_png,res.market_cigar_png,res.market_ashtray_card_png,res.market_fourpoints_png,res.market_smoke_png,res.market_brain_png];
GOODS_CONFIG[1][6] = [res.market_nothing_png,res.market_knife_png,res.market_orange_png,res.market_cigar_card_png,res.market_cigar_png,res.market_ashtray_card_png,res.market_fourpoints_png,res.market_ashtray_png,res.market_brain_png];

//DOC_CONFIG代表阅读文档
var DOC_CONFIG =  {};

DOC_CONFIG[1] = {};
DOC_CONFIG[1][1] = [res.doc_1_1_jpg];
DOC_CONFIG[1][2] = [res.doc_2_1_jpg,res.doc_2_2_jpg];
DOC_CONFIG[1][3] = [res.doc_3_1_jpg];
DOC_CONFIG[1][4] = [res.doc_4_1_jpg,res.doc_4_2_jpg];
DOC_CONFIG[1][5] = [res.doc_5_1_jpg];
DOC_CONFIG[1][6] = [res.doc_6_1_jpg,res.doc_6_2_jpg,res.doc_6_3_jpg,res.doc_6_4_jpg ];

//代表小海豚说的话
var MARKET_LABEL = {};
MARKET_LABEL[1] = {};
MARKET_LABEL[1][1] = "接下来，我们需要切除\n被试脑中胼胝体，在这里\n购买需要用到的材料吧!";
MARKET_LABEL[1][2] = "请选择带小点卡片以进\n行实验！";
MARKET_LABEL[1][3] = "请选择所有的水果！";
MARKET_LABEL[1][4] = "请选择工具和工具对应\n的单词卡！";
MARKET_LABEL[1][5] = "请选择工具图片。";
MARKET_LABEL[1][5] = "请选择工具图片。";
MARKET_LABEL[1][6] = "请选择工具和所有卡片。";

