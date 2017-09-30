var GAME_TIPS = {};
GAME_TIPS[2] = "双胞胎实验室将于10月24日开放.";
GAME_TIPS[3] = "老鼠游乐园将于11月07日开放.";
GAME_TIPS[4] = "视崖实验室将于11月21日开放.";

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
GOODS_CONFIG[1][4] = [res.market_apple_png,res.market_fourpoints_png,res.market_orange_png,res.market_cigar_card_png,res.market_cigar_png,res.market_ashtray_card_png,res.market_fourpoints_png,res.market_ashtray_png,res.market_brain_png];
GOODS_CONFIG[1][5] = [res.market_apple_png,res.market_fourpoints_png,res.market_orange_png,res.market_cigar_card_png,res.market_cigar_png,res.market_ashtray_card_png,res.market_fourpoints_png,res.market_smoke_png,res.market_brain_png];
GOODS_CONFIG[1][6] = [res.market_nothing_png,res.market_apple_png,res.market_orange_png,res.market_cigar_card_png,res.market_cigar_png,res.market_ashtray_card_png,res.market_apple_png,res.market_ashtray_png,res.market_brain_png];

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
MARKET_LABEL[1][1] = "接下来我们要模仿切除癫痫病人的胼胝体。\n请你在这里选择待会儿需要用到的内容。\n给你一点小提示，只要用到的都需要选择哦。\n有了材料后，请你试试切除这个病人的胼胝体吧，\n请你回忆一下上课时老师说胼胝体在哪里，\n然后拖动手术刀，把它放在相应的位置。";
MARKET_LABEL[1][2] = "接下来是你的第一个实验。\n你还记得课上讲到的内容和你刚才读到的知识吗？\n想想这个实验用到了什么材料？\n你需要在这里按照你刚刚读过的文献和想想的提示，\n点选你需要的物品，然后带去实验室吧。\n但请不要选择多余的物品。\n只有选对了物品才能进入游戏界面哦。";
MARKET_LABEL[1][3] = "这次研究人员带来了一些水果，\n请你选择所有的水果来继续实验。";
MARKET_LABEL[1][4] = "这次研究者们带来了一些工具，\n它们的照片，以及上面写着它们的名字的小卡片。\n请你选择这些东西，\n然后去实验室看看研究者\n为裂脑人先生准备了什么实验吧。";
MARKET_LABEL[1][5] = "这次研究者们把钉子换成了另一种工具，\n请选择所有的工具，";
MARKET_LABEL[1][6] = "还剩下最后一关，加油，\n你已经做得很棒了！\n现在，请你选择所有的工具和所有的卡片\n（所有卡片都要选哦），\n然后把它们带到实验室~";



