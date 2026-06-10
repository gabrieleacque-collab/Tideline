export const scenarios = [
  {
    id: 1,
    title: "制度 vs 海洋：学校是第一块地",
    conflict: "制度=原初的陆地，退学=出海。你还没拿到地契，要不要直接下海？",
    person: "小林，21岁，大三计算机专业，成绩上游。课余接外包写小程序。近日一个学长拉他加入团队做 AI 产品，需要全职投入。同时导师邀请他做毕业设计课题，表现好可以保研。",
    probe: "institution · projectIncome · specIncome · attention · skill",
    options: [
      { key: "A", text: "先把学位拿到。文凭是最基本的，没有它以后可能处处被动。", structuralLabel: "farmer", paramOffsets: { stableIncome: 8, institution: 10, attention: 8 } },
      { key: "B", text: "无论如何要保研。更重要的是搭上教授这条线，这才是真正有意义的方向。", structuralLabel: "landlord", paramOffsets: { institution: 12, skill: 8, assetIncome: 6 } },
      { key: "C", text: "把课余继续给外包项目，但跟学长谈谈不全职行不行。", structuralLabel: "fisher", paramOffsets: { projectIncome: 10, skill: 8, institution: 4 } },
      { key: "D", text: "休学加入创业。窗口期不等人，学位什么时候都能补，市场机会过了就没了。", structuralLabel: "pirate", paramOffsets: { specIncome: 12, projectIncome: 6, institution: -10, attention: -6 } }
    ]
  },
  {
    id: 2,
    title: "渔民 vs 海盗：海洋内部的掠夺",
    conflict: "在不确定中创造 vs 在不确定中拦截。你是自己捕鱼，还是抢别人的鱼？",
    person: "小美，27岁，做原创短视频。她发现一个流量密码：翻拍别人的热门视频稍作改动，流量是原创的十倍，还省了思考时间。有人批评她抄袭，但她心里想“互联网没有原创”。",
    probe: "specIncome · projectIncome · skill · attention",
    options: [
      { key: "A", text: "坚持原创。流量慢就慢，但这才是真正属于自己的东西。", structuralLabel: "farmer", paramOffsets: { attention: 12, skill: 10, stableIncome: 4 } },
      { key: "B", text: "研究爆款为什么爆，把方法论学过来融入自己的风格，做“有自己风格的热门”。", structuralLabel: "fisher", paramOffsets: { skill: 10, projectIncome: 8, attention: 4 } },
      { key: "C", text: "两条号并行：原创号做品牌，翻拍号做流量，用流量号给原创号导流。", structuralLabel: "landlord", paramOffsets: { assetIncome: 8, projectIncome: 6, institution: 6 } },
      { key: "D", text: "什么火做什么，“原创执念”没啥用。所有内容都是素材，拼接传播就是我的价值。", structuralLabel: "pirate", paramOffsets: { specIncome: 14, skill: -4, attention: -8 } }
    ]
  },
  {
    id: 3,
    title: "渔民→农民：出路之一",
    conflict: "用积累代替投机。渔民能学会种地吗？",
    person: "小路，28岁，做了三年自由职业，收入波动大但总体还行。一家公司给她开了 offer，薪水比平均自由收入低 20%，但五险一金齐全，每年有系统培训，三年后有晋升通道。",
    probe: "stableIncome · projectIncome · institution · attention · skill",
    options: [
      { key: "A", text: "去。自由得差不多了，也需要考虑以后的稳定。", structuralLabel: "farmer", paramOffsets: { stableIncome: 12, institution: 8, attention: 8, projectIncome: -6 } },
      { key: "B", text: "不去，但给自己定规矩：每月强制存30%，并且让收入稳下来。", structuralLabel: "fisher", paramOffsets: { attention: 10, savings: 8, skill: 8 } },
      { key: "C", text: "去，但争取保留接私活的权利。", structuralLabel: "fisher", paramOffsets: { stableIncome: 6, projectIncome: 6, institution: 4, skill: 4 } },
      { key: "D", text: "不去。趁自由把精力全压到一个创业方向上，三年内拼一个大的出来。", structuralLabel: "pirate", paramOffsets: { specIncome: 10, projectIncome: 6, attention: -6, institution: -8 } }
    ]
  },
  {
    id: 4,
    title: "渔民 vs 地主：平台围困",
    conflict: "流动劳动 vs 基础设施收租。你觉得自己是自由的，但你的自由恰恰是地主的利润来源。",
    person: "阿琳，29岁，自由插画师。80%的收入来自一个画廊/平台。平台突然改规则：抽成从15%涨到30%，但同时给她打上“优质创作者”标签，保证更多流量推荐。",
    probe: "projectIncome · assetIncome · institution · skill",
    options: [
      { key: "A", text: "减少依赖现在的平台，开始考虑找一份新全职工作。", structuralLabel: "farmer", paramOffsets: { stableIncome: 12, institution: 6, projectIncome: -8 } },
      { key: "B", text: "可以接受，但要跟平台谈清楚自己有没有选择权，没有的话会考虑解约。", structuralLabel: "fisher", paramOffsets: { projectIncome: 12, skill: 6, institution: -6 } },
      { key: "C", text: "接受新规则，用“优质标签”的流量慢慢沉淀自己的私域客户池。", structuralLabel: "landlord", paramOffsets: { assetIncome: 10, attention: 8, institution: 4 } },
      { key: "D", text: "表面接受，但私下联系客户跳过平台交易。平台的流量我照吃，抽成我不付。", structuralLabel: "pirate", paramOffsets: { specIncome: 12, institution: -8, projectIncome: 4 } }
    ]
  },
  {
    id: 5,
    title: "农民 vs 海盗：被截流",
    conflict: "生产 vs 拦截。你辛苦种出来的东西，有人想把流通渠道拿走。",
    person: "小陈，32岁，花三年做出了一个小众护肤品牌，口碑好但增长慢。一个资本方要收购他的品牌和配方，给一大笔钱加一个“品牌顾问”虚职。签完之后配方归对方，他不能再做同类产品。",
    probe: "stableIncome · specIncome · attention · skill · institution",
    options: [
      { key: "A", text: "不卖。三年心血是最宝贵的，产品就像自己的孩子不可能卖。", structuralLabel: "farmer", paramOffsets: { stableIncome: 10, attention: 10, skill: 6 } },
      { key: "B", text: "不卖品牌，但借机会谈合作：让他们投资，我拿钱扩产，按销量分成。", structuralLabel: "fisher", paramOffsets: { projectIncome: 10, debt: 6, skill: 6 } },
      { key: "C", text: "卖品牌保配方，签技术授权协议，按年收许可费。", structuralLabel: "landlord", paramOffsets: { assetIncome: 12, institution: 8, attention: 4 } },
      { key: "D", text: "卖，拿到钱后用同样的方法论做下一个品牌，再卖。品牌就是用来交易的。", structuralLabel: "pirate", paramOffsets: { specIncome: 14, institution: -8, attention: -6 } }
    ]
  },
  {
    id: 6,
    title: "农民 + 渔民：劳动者同盟",
    conflict: "计划理性 vs 应变理性。两个劳动者能合作吗？",
    person: "阿杰，34岁，木工手艺人，活儿很高端但客户少。朋友阿凯是自由销售，人脉广。阿凯提议合伙：阿杰做产品，阿凯找客户，利润五五分。",
    probe: "projectIncome · stableIncome · attention · familyLoad · debt",
    options: [
      { key: "A", text: "不合伙。定位不一样的人绑在一起迟早出事，宁可自己慢慢来。", structuralLabel: "farmer", paramOffsets: { stableIncome: 10, attention: 10, familyLoad: 4 } },
      { key: "B", text: "合伙，按单分成。有单一起干，没单各自忙，没什么大不了。", structuralLabel: "fisher", paramOffsets: { projectIncome: 12, skill: 6, institution: -4 } },
      { key: "C", text: "先谈清协议，定好退出机制再谈其他，信任归信任，规矩归规矩。", structuralLabel: "landlord", paramOffsets: { institution: 10, assetIncome: 6, attention: 4 } },
      { key: "D", text: "让他先帮我跑三个月试试，不分成，我给固定佣金。成了再谈长期。", structuralLabel: "fisher", paramOffsets: { debt: 4, projectIncome: 6, savings: -4, skill: 4 } }
    ]
  },
  {
    id: 7,
    title: "农民 vs 地主：陆地内部的阶级跃迁",
    conflict: "亲手劳动 vs 占有劳动条件。从做事的人变成收租的人。",
    person: "老张，40岁，资深厨师，在一家高端餐厅做了12年。老板要退休，提出把餐厅转让给他，价格公道但需要贷款。当了老板就不能全心全意掌勺了，要做管理。",
    probe: "skill · assetIncome · stableIncome · institution · debt",
    options: [
      { key: "A", text: "不接。我是厨师不是商人，不如去别的好餐厅继续做菜。", structuralLabel: "farmer", paramOffsets: { skill: 12, stableIncome: 8, attention: 6 } },
      { key: "B", text: "接，但先慢慢带出能接班的徒弟，再逐步退到后台。", structuralLabel: "landlord", paramOffsets: { skill: 6, assetIncome: 8, debt: 6, attention: 4 } },
      { key: "C", text: "接，老板走后雇一个行政主厨，自己专心做经营和品牌扩张。", structuralLabel: "landlord", paramOffsets: { assetIncome: 14, institution: 8, skill: -6 } },
      { key: "D", text: "不接，主要还是希望老板留下来，两人搭档有默契，保持现状就挺好。", structuralLabel: "fisher", paramOffsets: { projectIncome: 12, skill: 8, institution: -4 } }
    ]
  },
  {
    id: 8,
    title: "农民→渔民：出路之二",
    conflict: "带着耐心进入海洋。农民能学会出海吗？",
    person: "老周，44岁，在传统制造业做了18年，是工厂技术骨干。行业萎缩，但他的精加工手艺在海外有市场需求。出海意味着要学外贸流程、适应完全不同的商业规则、前两年大概率亏钱。",
    probe: "stableIncome · projectIncome · skill · attention · savings",
    options: [
      { key: "A", text: "不出海。在国内找相关行业继续干，经验总还有地方用得上。", structuralLabel: "farmer", paramOffsets: { stableIncome: 10, attention: 8, institution: 6 } },
      { key: "B", text: "出海，先找一个海外合作伙伴。他懂当地市场，我出技术，按单分成。", structuralLabel: "fisher", paramOffsets: { projectIncome: 10, skill: 8, debt: 4 } },
      { key: "C", text: "不亲自出海，找外贸代理，少赚一点可能比冒风险更划算。", structuralLabel: "landlord", paramOffsets: { assetIncome: 12, institution: 8, skill: -4 } },
      { key: "D", text: "直接出去，先低价冲量抢市场，亏两年也打下境外基础。", structuralLabel: "pirate", paramOffsets: { specIncome: 10, projectIncome: 6, savings: -8, attention: -4 } }
    ]
  },
  {
    id: 9,
    title: "地主 · 海盗：占有者的镜像",
    conflict: "固化占有 vs 流动占有。守住地盘，还是把地盘变成现金流走？",
    person: "大刘，45岁，有个独生子，家庭美满，在一个二线城市有两套房和一个小商铺，收入稳定支撑家庭开支。但城市人口在流出，他感觉资产在慢慢贬值。有朋友建议他卖掉一套房，拿钱去深圳搞投资。",
    probe: "assetIncome · specIncome · savings · institution · attention",
    options: [
      { key: "A", text: "房子在手里就是踏实，况且这个年龄了少折腾为妙。", structuralLabel: "landlord", paramOffsets: { assetIncome: 12, institution: 8, attention: 6 } },
      { key: "B", text: "卖一套腾出现金，留一套和商铺保底，应该问题不大。", structuralLabel: "fisher", paramOffsets: { savings: 8, projectIncome: 6, assetIncome: 4 } },
      { key: "C", text: "不卖房，但先各方打听探索下新路子也未尝不可。", structuralLabel: "fisher", paramOffsets: { debt: 8, projectIncome: 8, assetIncome: 4, institution: 4 } },
      { key: "D", text: "砸重金转向，想起年轻时出去闯荡的理想，也为儿子更好的读书环境，现在走出去也不晚。", structuralLabel: "pirate", paramOffsets: { specIncome: 14, assetIncome: -10, institution: -8 } }
    ]
  },
  {
    id: 10,
    title: "制度化教育的四种姿态",
    conflict: "教育系统是一个地主结构。它拥有“合法通道”，所有人都在向它交租。你怎么面对它？",
    person: "小刘，36岁，孩子刚上小学。家附近有一所还不错的公立学校，身边朋友都在给孩子报补习班、学奥数。小刘自己是“放养”长大的，觉得童年快乐最重要，但又怕孩子长大后怪自己“当年为什么不逼一下我”。",
    probe: "institution · familyLoad · attention · skill · savings",
    options: [
      { key: "A", text: "每天放学陪孩子读书、观察世界。真正的能力是在日复一日的陪伴中生长出来的。", structuralLabel: "farmer", paramOffsets: { attention: 12, skill: 8, familyLoad: 4 } },
      { key: "B", text: "让孩子广泛尝试，音乐、编程、运动、手工。没天赋至少能找到爱好。", structuralLabel: "fisher", paramOffsets: { skill: 10, projectIncome: 6, institution: -4 } },
      { key: "C", text: "学区房+重点学校+系统规划。教育这个钱不能省。", structuralLabel: "landlord", paramOffsets: { institution: 12, assetIncome: 6, familyLoad: 8, savings: -6 } },
      { key: "D", text: "应试教育难有出路，做什么都会后悔，想办法把孩子送到私立学校才安心。", structuralLabel: "pirate", paramOffsets: { specIncome: 10, institution: -6, attention: -6 } }
    ]
  }
];
