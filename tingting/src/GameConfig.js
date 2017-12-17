var GAME_TIPS = {};
GAME_TIPS[2] = "请先完成前面的实验";
GAME_TIPS[3] = "请先完成前面的实验";
GAME_TIPS[4] = "请先完成前面的实验";
GAME_TIPS[5] = "梦境实验室将于12月05日开放.";

var ROOM_CONFIG =  {};
ROOM_CONFIG[1] = res.house1_bg_jpg;
ROOM_CONFIG[2] = res.house2_bg_jpg;
ROOM_CONFIG[3] = res.house3_bg_jpg;
ROOM_CONFIG[4] = res.house4_bg_jpg;

var PLAY_CONFIG = {};
PLAY_CONFIG[1] = res.play_1_bg_jpg;
PLAY_CONFIG[2] = res.play_2_bg_jpg;
PLAY_CONFIG[3] = res.play_3_bg_jpg;
PLAY_CONFIG[4] = res.play_4_bg_jpg;

//配置小红旗位置
var FLAG_CONFIG =  {};
FLAG_CONFIG[1] = [cc.p(-255,-135),cc.p(-115,-70),cc.p(15,100),cc.p(105,-10),cc.p(185,142),cc.p(300,55)];//,cc.p(385,-25)];
FLAG_CONFIG[2] = [cc.p(465 - 800,-240 + 450) , cc.p(1120 - 800 ,-245 + 450), cc.p( 525 - 800,70 - 450)];
FLAG_CONFIG[3] = [cc.p(1260 - 800,495 - 450) , cc.p(490 - 800 ,125 - 450), cc.p( 365 - 800,490 - 450)];
FLAG_CONFIG[4] = [cc.p(-600,0),cc.p(-200,0),cc.p(200,0),cc.p(600,0)];
//GOODS_CONFIG代表超市图片列表，第一个数字代表房间，第二个数字代表关卡
var GOODS_CONFIG =  {};

GOODS_CONFIG[1] ={};
GOODS_CONFIG[1][1] = [res.market_fourpoints_png,res.market_knife_png,res.market_orange_png,res.market_numbercard_png,res.market_cigar_png,res.market_lettercard_png,res.market_fourpoints_png,res.market_ashtray_png,res.market_brain_png];
GOODS_CONFIG[1][2] = GOODS_CONFIG[1][1];
GOODS_CONFIG[1][3] = [res.market_apple_png,res.market_knife_png,res.market_orange_png,res.market_numbercard_png,res.market_cigar_png,res.market_lettercard_png,res.market_fourpoints_png,res.market_ashtray_png,res.market_brain_png];
GOODS_CONFIG[1][4] = [res.market_apple_png,res.market_fourpoints_png,res.market_orange_png,res.market_cigar_card_png,res.market_cigar_png,res.market_ashtray_card_png,res.market_fourpoints_png,res.market_ashtray_png,res.market_brain_png];
GOODS_CONFIG[1][5] = [res.market_apple_png,res.market_fourpoints_png,res.market_orange_png,res.market_cigar_card_png,res.market_cigar_png,res.market_ashtray_card_png,res.market_fourpoints_png,res.market_smoke_png,res.market_brain_png];
GOODS_CONFIG[1][6] = [res.market_nothing_png,res.market_apple_png,res.market_orange_png,res.market_cigar_card_png,res.market_cigar_png,res.market_ashtray_card_png,res.market_apple_png,res.market_ashtray_png,res.market_brain_png];

GOODS_CONFIG[2] ={};
GOODS_CONFIG[2][1] =[res.market2_card1,res.market2_card2,res.market2_card3,res.market2_card4,res.market2_card5,res.market2_card6,res.market2_card7,res.market2_card8,res.market2_card9];
GOODS_CONFIG[2][2] =[res.market2_card11,res.market2_card12,res.market2_card13,res.market2_card14,res.market2_card15,res.market2_card16,res.market2_card17,res.market2_card18,res.market2_card19];
GOODS_CONFIG[2][3] = [res.market2_card11,res.market2_less,res.market2_card13,res.market2_card17,res.market2_card15,res.market2_equal1,res.market2_more,res.market2_equal0,res.market2_card19];

GOODS_CONFIG[3] ={};
GOODS_CONFIG[3][1] = [res.market3_mouse_fat,res.market3_mouse_tall,res.market3_mouse_tall,res.market3_mouse_fat,res.market3_mouse_short,res.market3_mouse_normal,res.market3_mouse_normal,res.market3_mouse_normal,res.market3_mouse_thin];
GOODS_CONFIG[3][2] = [res.market3_mouse_fat,res.market3_box1,res.market3_mouse_tall,res.market3_mouse_fat,res.market3_mouse_short,res.market3_box2,res.market3_box3,res.market3_hand,res.market3_mouse_thin];
GOODS_CONFIG[3][3] = [res.market3_mouse_fat,res.market3_mouse_tall,res.market3_mouse_tall,res.market3_mouse_fat,res.market3_hand,res.market3_mouse_normal,res.market3_mouse_normal,res.market3_mouse_normal,res.market3_mouse_thin];

GOODS_CONFIG[4] = {};
GOODS_CONFIG[4][1] = [res.market_4_5,res.market_4_9,res.market_4_7,res.market_4_8,res.market_4_6,res.market_4_11,res.market_4_12,res.market_4_13,res.market_4_14];
GOODS_CONFIG[4][2] = [res.market_4_5,res.market_4_13,res.market_4_4,res.market_4_12,res.market_4_7,res.market_4_1,res.market_4_6,res.market_4_11,res.market_4_14];
GOODS_CONFIG[4][3] = [res.market_4_5,res.market_4_9,res.market_4_22,res.market_4_8,res.market_4_4,res.market_4_18,res.market_4_19,res.market_4_20,res.market_4_21];
GOODS_CONFIG[4][4] = [res.market_4_5,res.market_4_2,res.market_4_4,res.market_4_22,res.market_4_7,res.market_4_1,res.market_4_15,res.market_4_16,res.market_4_17];


//DOC_CONFIG代表阅读文档
var DOC_CONFIG =  {};

DOC_CONFIG[1] = {};
DOC_CONFIG[1][1] = [res.doc_1_1_jpg];
DOC_CONFIG[1][2] = [res.doc_2_1_jpg,res.doc_2_2_jpg];
DOC_CONFIG[1][3] = [res.doc_3_1_jpg];
DOC_CONFIG[1][4] = [res.doc_4_1_jpg,res.doc_4_2_jpg];
DOC_CONFIG[1][5] = [res.doc_5_1_jpg];
DOC_CONFIG[1][6] = [res.doc_6_1_jpg,res.doc_6_2_jpg,res.doc_6_3_jpg,res.doc_6_4_jpg ];

DOC_CONFIG[2] = {};
DOC_CONFIG[2][1] = [res.doc2_1_1,res.doc2_1_2];
DOC_CONFIG[2][2] = [res.doc2_2_1,res.doc2_2_2,res.doc2_2_3];
DOC_CONFIG[2][3] = [res.doc2_3_1,res.doc2_3_2,res.doc2_3_3,res.doc2_3_4,res.doc2_3_5];

DOC_CONFIG[3] = {};
DOC_CONFIG[3][1] = [res.doc3_1_1,res.doc3_1_2];
DOC_CONFIG[3][2] = [res.doc3_2_1,res.doc3_2_2,res.doc3_2_3];
DOC_CONFIG[3][3] = [res.doc3_3_1];

DOC_CONFIG[4] = {};
DOC_CONFIG[4][1] = [res.doc4_1_1,res.doc4_1_2];
DOC_CONFIG[4][2] = [res.doc4_2_1];
DOC_CONFIG[4][3] = [res.doc4_3_1,res.doc4_3_2,res.doc4_3_3];
DOC_CONFIG[4][4] = [res.doc4_4_1,res.doc4_4_2,res.doc4_4_3,res.doc4_4_4,res.doc4_4_5];



//代表小海豚说的话
var MARKET_LABEL = {};
MARKET_LABEL[1] = {};
MARKET_LABEL[1][1] = "接下来我们要模仿切除癫痫病人的胼胝体。\n请你在这里选择待会儿需要用到的材料。\n给你一点小提示，只要用到的都需要选择哦。\n有了材料后，请你试试切除这个病人的胼胝体吧，\n请你回忆一下上课时老师说胼胝体在哪里，\n然后拖动手术刀，把它放在相应的位置。";
MARKET_LABEL[1][2] = "接下来是你的第一个实验。\n你还记得课上讲到的内容和你刚才读到的知识吗？\n想想这个实验用到了什么材料？\n你需要在这里按照你刚刚读过的文献和想想的提示，\n点选你需要的物品，然后带去实验室吧。\n但请不要选择多余的物品。\n只有选对了物品才能进入游戏界面哦。";
MARKET_LABEL[1][3] = "这次研究人员带来了一些水果，\n请你选择所有的水果来继续实验。";
MARKET_LABEL[1][4] = "这次研究者们带来了一些工具，\n它们的照片，以及上面写着它们的名字的小卡片。\n请你选择这些东西，\n然后去实验室看看研究者\n为裂脑人先生准备了什么实验吧。";
MARKET_LABEL[1][5] = "这次研究者们把钉子换成了另一种工具，\n请选择所有的工具，";
MARKET_LABEL[1][6] = "还剩下最后一关，加油，\n你已经做得很棒了！\n现在，请你选择所有的工具和所有的卡片\n（所有卡片都要选哦），\n然后把它们带到实验室~";

MARKET_LABEL[2] = {};
MARKET_LABEL[2][1] = "大家好，今天我们迎来了另一个章节的学习。\n你准备好了吗？在接下来的游戏中，\n你会遇到一些我们关注的人群，\n他们的名字都分门别类地写在了这些方块上。\n请你选择所有写着字的方块来继续。";
MARKET_LABEL[2][2] = "请你选择所有画着小点点的图片。\n它们的名字叫做“散点图”。\n你应该已经在阅读材料里见过它了，\n在游戏里你们还会再次相遇的。";
MARKET_LABEL[2][3] = "还剩下最后一关，加油！\n请你选择所有除了小星星外的方块。\n它们的用处是什么呢？\n请到游戏里看一看吧！";

MARKET_LABEL[3] = {};
MARKET_LABEL[3][1] = "欢迎你来到新的篇章！\n刚才的文章读得怎么样了呢？\n在研究中使用了很多小鼠，但不是\n所有的小鼠都符合研究人员的要求。\n你还记得研究中需要使用什么样的小鼠吗？\n想一想他们都应该具有什么样的特征？\n如果你记得，你能挑出三只符合\n研究人员要求的小鼠吗？";
MARKET_LABEL[3][2] = "相信你已经看完了文献的内容。\n现在，科学研究人员已经把小鼠们的大脑皮层取出。\n为了不让你看到血腥的画面，\n这些皮层组织都被分别装进了三个\n一模一样的箱子里。\n请选择三只箱子，然后去实验室看看吧。";
MARKET_LABEL[3][3] = "让我们回到研究进行的时候，\n现在要为实验中的小鼠换玩具啦。\n你还记得哪些老鼠参加了研究吗？\n请选择来自同一窝的小鼠们。\n此外，请选择一只手用来触碰小鼠。";

MARKET_LABEL[4] = {};
MARKET_LABEL[4][1] = "大家好！欢迎来到视崖的小游戏。\n在视崖的实验中，研究者使用了\n一种叫做视崖的装置，现在这个\n装置被拆开成一片一片的了，\n请你选择这些部分；此外，请你选\n择两个刚刚学会爬行的小宝宝。\n他们为什么表现出了不同的反应？";
MARKET_LABEL[4][2] = "除了人类的婴儿，研究者使用了其\n他的小动物。你能选中它们吗？";
MARKET_LABEL[4][3] = "你阅读完了这部分的文章了吗？\n我们来看看研究者又对小动物做了\n哪些进一步的研究吧。请你选择\n所有的东西，包括所有的小动物\n和视崖装置的各个组件。";
MARKET_LABEL[4][4] = "在对深度的知觉中，有很多视觉\n线索能帮助人们觉察深度，\n其中有两种线索，图案密度和运动视差。\n你还记得它们分别是什么吗？\n请你花些时间回想一下，\n然后选择不同密度的地板图案吧。";
