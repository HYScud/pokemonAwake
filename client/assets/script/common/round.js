window.Round = {
    round1: {
        map: "img_zxz",
        list: [{
                id: "1-1",
                name: "水边小道",
                star: 3,
                type: 0,
                boss: { petId: 1, level: 1, icon: "bobo", pos: 2, rankNum: 0 },
                monsterList: [
                    [{ petId: 1, life: 1320, star: 3, level: 1, icon: "bobo", pos: 1, rankNum: 0 }, { petId: 1, life: 1320, star: 3, level: 1, icon: "bobo", pso: 2, rankNum: 0 }, { petId: 1, life: 1320, star: 3, level: 1, icon: "bobo", pso: 3, rankNum: 0 }],
                    [{ petId: 1, star: 3, life: 1320, level: 1, icon: "bobo", pos: 2, rankNum: 0 }, { petId: 1, life: 1320, star: 3, level: 1, icon: "bobo", pos: 1, rankNum: 0 }],
                    [{ petId: 1, star: 3, life: 1320, level: 2, icon: "bobo", pos: 2, rankNum: 0 }]
                ],
                itemList: [{ itemId: 1, icon: 2, maxNum: 3 }, { itemId: 2, icon: 2, maxNum: 2 }]
            }, {
                id: "1-2",
                name: "沿途小路",
                star: 0,
                type: 1,
                boss: { petId: 1, level: 5, life: 1320, icon: "banjilasi", pos: 2, rankNum: 1, speed: 80 },
                monsterList: [
                    [{ petId: 1, star: 3, life: 1320, level: 5, icon: "bobo", pos: 2, rankNum: 1, speed: 80 }, { petId: 1, life: 1320, level: 1, star: 3, icon: "liekongzuo", pos: 6, rankNum: 1, speed: 80 }, { petId: 1, life: 1320, star: 3, level: 1, icon: "dakelaiyi", pos: 3, rankNum: 1, speed: 80 }, { petId: 1, life: 1320, level: 1, star: 3, icon: "liekongzuo", pos: 1, rankNum: 1, speed: 80 }, { petId: 1, life: 1320, star: 3, level: 1, icon: "dakelaiyi", pos: 4, rankNum: 1, speed: 80 }],
                    [{ petId: 1, star: 5, life: 1320, level: 5, icon: "banjilasi", pos: 2, rankNum: 1, speed: 80 }, { petId: 1, life: 1320, level: 5, star: 5, icon: "banjilasi", pos: 4, rankNum: 1, speed: 80 }, { petId: 1, life: 1320, star: 5, level: 5, icon: "banjilasi", pos: 6, rankNum: 1, speed: 80 }],
                ]
            },
            {
                id: "1-3",
                name: "山脚",
                star: 0,
                type: 0,
                boss: { petId: 1, level: 1, icon: "banjilasi", pos: 2, rankNum: 2 },
                monsterList: [
                    [{ petId: 1, star: 3, life: 1320, level: 1, icon: "bobo", pos: 2, rankNum: 2 }, { petId: 1, star: 3, level: 1, icon: "bobo", pso: 4, rankNum: 2 }, { petId: 1, star: 3, level: 1, icon: "bobo", pso: 4, rankNum: 1 }],
                    [{ petId: 1, star: 5, life: 1320, level: 1, icon: "banjilasi", pos: 2, rankNum: 2 }],
                ]
            },
        ],
        index: 1,
        completed: false
    }
};
window.map = {
    Round,
    curIndex: 1
};