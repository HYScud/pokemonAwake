window.RES_TABLE = {
    start: {
        loadPrefab: {
            type: cc.Prefab,
            path: "loading/prefab",
            list: ["loading"]
        },
        loadSound: {
            type: cc.AudioClip,
            path: "sound/login",
            list: ["default"]
        },
        loadImg: {
            type: cc.SpriteFrame,
            path: "loading/loadBg",
            list: ["bg_1", "bg_10", "bg_11", "bg_12", "bg_13", "bg_14", "bg_15", "bg_16", "bg_17", "bg_18", "bg_19", "bg_2", "bg_20", "bg_21", "bg_22", "bg_23", "bg_24", "bg_25", "bg_3", "bg_4", "bg_5", "bg_6", "bg_7", "bg_8", "bg_9"]
        },
    },
    login: {
        avatar: {
            type: cc.SpriteFrame,
            path: "personal/avatar",
            list: ["1", "2", "icon_2021sdtx", "icon_2021ydtx", "icon_2021year@", "icon_21gq_tx", "icon_21wsj_tx", "icon_ddzq", "icon_dwj2_tx", "icon_mwzz_tx", "icon_pkqgq", "icon_qrj_tx", "icon_sd_bjm", "icon_sd_gs", "icon_sd_jng", "icon_sd_mm", "icon_sd_mmx", "icon_sd_mwzz", "icon_sd_pkq", "icon_sd_xhl", "icon_sd_yb", "icon_sd_yjl", "icon_sd_zyy", "icon_wsj", "icon_wy_tx", "icon_zqj_tx", "img_am@", "img_as@", "img_dds", "img_dng", "img_ly", "img_lyetj", "img_mx@", "img_pkq", "img_pkq_znq", "img_ql@", "img_role_10@", "img_role_11@", "img_role_12@", "img_role_13@", "img_role_14@", "img_role_15@", "img_role_16@", "img_role_17@", "img_role_18@", "img_role_19@", "img_role_20@", "img_role_21@", "img_role_22@", "img_role_23@", "img_role_24@", "img_role_25@", "img_role_26@", "img_role_27@", "img_role_28@", "img_role_29@", "img_role_31@", "img_role_32@", "img_role_33@", "img_role_34@", "img_role_35@", "img_role_36@", "img_role_37@", "img_role_38@", "img_role_39@", "img_role_3@", "img_role_40@", "img_role_41@", "img_role_42@", "img_role_43@", "img_role_4@", "img_role_5@", "img_role_6@", "img_role_7@", "img_role_8@", "img_role_9@", "img_sy@", "img_wy", "img_xb@", "img_xk@", "img_xrj1@", "img_xrj2@", "img_xs@"],
        },
        tip: {
            type: cc.Prefab,
            path: "tip/prefab",
            list: ["tip", "tipsPanel"]
        },
        popup: {
            type: cc.AudioClip,
            path: "sound/popup",
            list: ["popupOpen", "popupClose", "show"]
        },
        sound: {
            type: cc.AudioClip,
            path: "sound",
            list: ["click_1", "click_2", "equip", "evolution", "formation", "gem_diamond_10", "gem_draw_1", "gem_gold_10", "levelUp", "role_levelup", "skill2_effect", "square", "star", "zaixianlibao"],
        },
    },
    main: {
        mainSound: {
            type: cc.AudioClip,
            path: "sound/main",
            list: ["city2", "city", "city3"],
        },
        resIcon: {
            type: cc.SpriteFrame,
            path: "common/icon",
            list: ["icon_diamond", "icon_gold", "icon_stamina"]
        },
        starIcon: {
            type: cc.SpriteFrame,
            path: "star/img",
            list: ["icon_star", "icon_star_d", "icon_star2", "icon_star2_d", "icon_star_z", "icon_star_z1", "icon_rank_star", "icon_rank_star_d"]
        },
        starPrefab: {
            type: cc.Prefab,
            path: "star/prefab",
            list: ["star"]
        },
        skillIcon: {
            type: cc.SpriteFrame,
            path: "pet/icon/skill",
            list: ["0", "1", "10", "11", "12", "13", "14", "15", "16", "17", "2", "3", "4", "5", "6", "7", "8", "9"]
        },
        cardImg: {
            type: cc.SpriteFrame,
            path: "common/card",
            list: ["bg_0", "bg_1", "bg_2", "bg_3", "bg_4", "bg_5", "bg_6", "frame_0", "frame_1", "frame_2", "frame_3", "frame_4", "frame_5", "frame_6", "box_bottom_d0", "box_bottom_d1", "box_bottom_d2", "box_bottom_d3", "box_bottom_d4", "box_bottom_d5", "box_bottom_d6"],
        },
        stage: {
            type: cc.SpriteFrame,
            path: "common/stage",
            list: ["tag_digital1", "tag_digital2", "tag_digital3", "tag_digital4", "tag_digital5", "tag_digital6", "tag_digital7"]
        },
        attrIcon: {
            type: cc.SpriteFrame,
            path: "pet/icon/attribute",
            list: ["0", "1", "10", "11", "12", "13", "14", "15", "16", "17", "2", "3", "4", "5", "6", "7", "8", "9"]
        },
        boxFrameIcon: {
            type: cc.SpriteFrame,
            path: "common/frame",
            list: ["panel_0", "panel_1", "panel_2", "panel_3", "panel_4", "panel_5", "panel_6", "panel_default", "panel_f0", "panel_f1", "panel_f2", "panel_f3", "panel_f4", "panel_f5", "panel_f6"],
        },
        petSpine: {
            type: sp.SkeletonData,
            path: "spine/pet",
            list: ["banjilasi", "bobo", "chaomeng", "dakelaiyi", "dudu", "fengsugou", "fengwang", "gaiouka", "houguai", "huashiyilong", "huoyanniao", "jiaherenwa", "jiaojinyu", "jiekeluomu", "jielaaola", "jienigui", "kalakala", "labaya", "laixilamu", "leijiluoke", "liekongzuo", "lvmaochong", "menghuan", "miaowazhongzi", "niduolan", "penhuolongX", "pikaqui", "qiuleimu", "Sguladuo", "shuijiangui", "wanli", "xiaohuolong", "xiaolada", "xiaomuling", "xiaoquanshi", "zheerniyasi", "zoulucao"]
        },
        petPrefab: {
            type: cc.Prefab,
            path: "pet/prefab",
            list: ["pet", "petBattle", "attr", "petBox", "petCard", "petFormation"]
        },
        petIconBag: {
            type: cc.SpriteFrame,
            path: "pet/petIcon/petBag",
            list: ["banjilasi", "bobo", "chaomeng", "dakelaiyi", "dudu", "fengsugou", "gaiouka", "houguai", "huoyanniao", "jiaherenwa", "jiaojinyu", "jiekeluomu", "jielaaola", "jienigui", "kalakala", "labaya", "laixilamu", "leijiaisi", "leijiluoke", "liekongzuo", "lvmaochong", "menghuan", "miaowazhongzi", "niduolan", "penhuolongX", "pikaqui", "pikaqui2", "qiuleimu", "Sguladuo", "shuijiangui", "Sliekongzuo", "wanli", "xiaohuolong", "xiaolada", "xiaomuling", "xiaoquanshi", "zheerniyasi", "zoulucao"]
        },
        petIconBox: {
            type: cc.SpriteFrame,
            path: "pet/petIcon/petBox",
            list: ["banjilasi", "bobo", "chaomeng", "dakelaiyi", "dudu", "fengsugou", "gaiouka", "houguai", "huoyanniao", "jiaherenwa", "jiaojinyu", "jiekeluomu", "jielaaola", "jienigui", "kalakala", "labaya", "laixilamu", "leijiaisi", "leijiluoke", "liekongzuo", "lvmaochong", "menghuan", "miaowazhongzi", "niduolan", "penhuolongX", "pikaqui", "pikaqui2", "qiuleimu", "Sguladuo", "shuijiangui", "Sliekongzuo", "wanli", "xiaohuolong", "xiaolada", "xiaomuling", "xiaoquanshi", "zheerniyasi", "zoulucao"],
        },
        petIconRank: {
            type: cc.SpriteFrame,
            path: "pet/petIcon/petRank",
            list: ["banjilasi", "bobo", "chaomeng", "dakelaiyi", "dudu", "fengsugou", "gaiouka", "guladuo", "houguai", "huoyanniao", "jiaherenwa", "jiaojinyu", "jiekeluomu", "jielaaola", "jienigui", "kalakala", "labaya", "laixilamu", "leijiluoke", "liekongzuo", "lvmaochong", "menghuan", "miaowazhongzi", "niduolan", "penhuolongX", "pikaqui", "qiuleimu", "Sguladuo", "shuijiangui", "wanli", "xiaohuolong", "xiaolada", "xiaomuling", "xiaoquanshi", "zheerniyasi", "zoulucao"],
        },
        petIconSpeed: {
            type: cc.SpriteFrame,
            path: "pet/petIcon/petSpeed",
            list: ["banjilasi", "bobo", "chaomeng", "dakelaiyi", "dudu", "fengsugou", "gaiouka", "guladuo", "houguai", "huoyanniao", "jiaherenwa", "jiaojinyu", "jiekeluomu", "jielaaola", "jienigui", "kalakala", "labaya", "laixilamu", "leijiluoke", "liekongzuo", "lvmaochong", "menghuan", "miaowazhongzi", "niduolan", "penhuolongX", "pikaqui", "qiuleimu", "Sguladuo", "shuijiangui", "wanli", "xiaohuolong", "xiaolada", "xiaomuling", "xiaoquanshi", "zheerniyasi", "zoulucao"],
        },
        qualityIcon: {
            type: cc.SpriteFrame,
            path: "pet/qualityIcon",
            list: ["2", "3", "4", "5", "6"]
        },
        itemIcon: {
            type: cc.SpriteFrame,
            path: "item/icon",
            list: ["1", "2", "3", "icon_fire_green", "icon_grass_green", "icon_walter_green", "jy_1", "jy_2", "jy_3", "jy_4"]
        },
        itemPrefab: {
            type: cc.Prefab,
            path: "item/prefab",
            list: ["item"]
        },
        settingIcon: {
            type: cc.SpriteFrame,
            path: "main/setting",
            list: ["btn_bf", "btn_off", "btn_on", "btn_zt"]
        },
        shopPrefab: {
            type: cc.Prefab,
            path: "shop/prefab",
            list: ["shopItem"]
        },
        shopImg: {
            type: cc.SpriteFrame,
            path: "common/btn",
            list: ["tag_fragment", "btn_r_1"]
        },
    },
    drawCard: {
        drawCardBg: {
            type: cc.SpriteFrame,
            path: "drawCard/bg",
            list: ["img_bg_zxck", "img_ck", "img_ck_jb", "img_xdck", "img_xsck"],
        },
        drawCardSound: {
            type: cc.AudioClip,
            path: "sound/drawCard",
            list: ["card_gain", "drawcard_one", "drawcard_one2", "drawcard_ten", "drawcard_ten2"],
        },
        drawCardSpine: {
            type: sp.SkeletonData,
            path: "spine/drawCard",
            list: ["chouka", "huodexinjingling", "huodexinjinglingbg", "jingbichouka", "xianshichouka", "zuanshichouka"]
        },
        drawCardPrefab: {
            type: cc.Prefab,
            path: "drawCard/prefab",
            list: ["ItemBox", "PetBox"]
        },
    },
    battle: {
        petSound: {
            type: cc.AudioClip,
            path: "sound/pet",
            list: ["banjilasi_attack", "banjilasi_skill1", "banjilasi_skill2", "bobo_attack", "bobo_skill1", "bobo_skill2", "chaomeng_attack", "chaomeng_skill1", "chaomeng_skill2", "dakelaiyi_attack", "dakelaiyi_skill1", "dudu_attack", "dudu_skill1", "dudu_skill2", "dakelaiyi_skill2", "fengsugou_attack", "fengsugou_sk1", "fengsugou_sk2", "gaiouka_attack", "gaiouka_skill1", "gaiouka_skill2", "houguai_attack", "houguai_skill1", "houguai_skill2", "jiaherenwa_attack", "jiaherenwa_skill1", "jiaherenwa_skill2", "jiekeluomu_attack", "jiekeluomu_skill1", "jiekeluomu_skill2", "kalakala_attack", "kalakala_skill1", "kalakala_skill2", "labaya_attack", "labaya_skill1", "labaya_skill2", "laixilamu_attack", "laixilamu_skill1", "laixilamu_skill2", "leijiaisi_attack", "leijiaisi_skill1", "leijiaisi_skill2", "leijiluoke_attack", "leijiluoke_skill1", "leijiluoke_skill2", "liekongzuo_attack", "liekongzuo_skill1", "liekongzuo_skill2", "menghuan_attack", "menghuan_skill1", "menghuan_skill2", "miaowazhongzi_attack", "miaowazhongzi_skill1", "miaowazhongzi_skill2", "niduolang_attack", "niduolang_skill1", "niduolang_skill2", "niduolan_attack", "niduolan_skill1", "niduolan_skill2", "penhuolongX_attack", "penhuolongX_skill1", "penhuolongX_skill2", "pikaqiu_attack", "pikaqiu_skill1", "pikaqiu_skill2", "qiuleimu_attack", "qiuleimu_skill1", "qiuleimu_skill2", "wanli_attack", "wanli_skill1", "wanli_skill2", "xiaohuolong_attack", "xiaohuolong_skill1", "xiaohuolong_skill2", "xiaolada_attack", "xiaolada_skill1", "xiaolada_skill2", "xiaomuling_attack", "xiaomuling_skill1", "xiaomuling_skill2", "zoulucao_attack", "zoulucao_skill1", "zoulucao_skill2"],
        },
        battleSound: {
            type: cc.AudioClip,
            path: "sound/battle",
            list: ["battle1", "battle1_pre", "battle2", "battle2_pre", "battle3", "battle3_pre", "battle4", "battle4_pre", "battle5", "battle_bgm", "battle_cheer", "battle_false", "battle_pvp_loop", "battle_pvp_pre", "gate_win", "pve_win", "pvp_win"],
        },
        CDIcon: {
            type: cc.SpriteFrame,
            path: "battle/cd",
            list: ["txt_lq_0", "txt_lq_1", "txt_lq_2", "txt_lq_3", "txt_lq_5", "txt_lq_4", "txt_lq_6", "txt_lq_7", "txt_lq_8", "txt_lq_9"]
        },
        battlePrefab: {
            type: cc.Prefab,
            path: "battle/prefab",
            list: ["enemyOrder", "playerOrder", "hurtLabel"]
        },
        battleSpine: {
            type: sp.SkeletonData,
            path: "battle/anim",
            list: ["death"]
        },
        end: {
            type: cc.SpriteFrame,
            path: "battle/end",
            list: ["loss_bg", "img_bg"]
        },
        atkTypeIcon: {
            type: cc.SpriteFrame,
            path: "battle/icon",
            list: ["icon_w", "icon_z", "icon_t"]
        }
    },
}