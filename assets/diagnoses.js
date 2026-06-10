export const roleMeta = {
  farmer: { key: "plant", name: "农民", en: "FARMER", tone: "#88b891", mark: "田", line: "用时间换确定性" },
  fisher: { key: "surf", name: "渔民", en: "FISHER", tone: "#78a9bf", mark: "潮", line: "靠判断和时机吃饭" },
  landlord: { key: "build", name: "地主", en: "LANDLORD", tone: "#d6a54a", mark: "契", line: "让资产替你工作" },
  pirate: { key: "wind", name: "海盗", en: "PIRATE", tone: "#c65f4a", mark: "刃", line: "靠速度和信息差获利" },
  mixed: { key: "mixed", name: "四面受力", en: "MIXED", tone: "#63c7bd", mark: "汐", line: "同时被多种逻辑拉扯" }
};

export const diagnoses = {
  A: {
    code: "A",
    title: "辛苦是你的，差价是别人的",
    structure: "农民被海盗截流",
    diagonal: "farmer-pirate",
    selfSide: { role: "farmer", line: "我踏实做事，投入总会有回报" },
    forceSide: { role: "pirate", line: "但你的收入在中间环节被分走了" },
    body: "你是做事的人，相信投入和回报成正比。但你现在的实际情况是：你做出来的东西，在变成你手里的钱之前，已经被中间环节拿走了一部分——平台抽成、渠道加价、有人转手。不是你不够努力，是你的注意力全在「把东西做好」上，没看它是怎么被定价、怎么被卖掉的。",
    blindSpot: "钱不是在你手里少掉的，是在从你手里到买家手里的那段路上少掉的。",
    exit: "不用改行，把账算清楚就行：你的东西经过谁的手、每一道拿走多少、哪些环节可以绕开。看得懂这笔账的生产者，很难再被随便拿捏。"
  },
  B: {
    code: "B",
    title: "你的自由，平台也在收费",
    structure: "渔民被地主围困",
    diagonal: "fisher-landlord",
    selfSide: { role: "fisher", line: "我靠手艺自由地活，不依赖任何人" },
    forceSide: { role: "landlord", line: "但你干活的场地是别人的" },
    body: "你觉得自己是自由的：没有固定雇主，靠手艺和判断吃饭。但你的客户从哪来、钱从哪个账走、多少人能看到你，都由平台和渠道决定。它们不指挥你干活，但你干活的场地是它们的，规则也归它们定。",
    blindSpot: "你越「自由」，平台越不用为你交社保、发底薪、担风险，它赚得越稳。你的自由本身就是它利润的一部分。",
    exit: "在自由里加一点积累：一批直接找得到你的客户、一个自己说了算的渠道、一件能长期攒下去的东西。不用大，但要有一块不依赖任何平台的立足点。"
  },
  C: {
    code: "C",
    title: "手停口停的循环",
    structure: "农民无法地主化",
    diagonal: "farmer-landlord",
    selfSide: { role: "farmer", line: "我有手艺，我在持续劳动" },
    forceSide: { role: "landlord", line: "但你的劳动没有沉淀成任何资产" },
    body: "你会做事，也做得好，但所有收入都来自你亲手干活。你一停，钱就停。这样的结构里，人不敢生病、不敢休息、不敢冒险，因为没有任何东西在替你挣钱。",
    blindSpot: "你把「亲手做」当成了唯一踏实的挣钱方式。但让做过的事继续产生收入，不是投机取巧，是给自己留余地。",
    exit: "把做过的事变成能反复卖的东西：教程、模板、授权、长期合同、一个有口碑的名字。哪怕只占收入的一小部分，它也能让你第一次有「停下来也有钱进」的底气。"
  },
  D: {
    code: "D",
    title: "钱越挣越快，本事越来越虚",
    structure: "渔民漂流化 / 渔民→海盗滑移",
    diagonal: "fisher-pirate",
    selfSide: { role: "fisher", line: "我灵活，我能在变化里找到机会" },
    forceSide: { role: "pirate", line: "但你越来越靠信息差，而不是创造" },
    body: "你很会在变化里找机会，市场一动你比别人反应快。但你可能越来越说不清自己到底是做什么的——收入越来越依赖消息、时机和规则的空子，而不是你亲手做出来的东西。",
    blindSpot: "你已经很久没有从头到尾做成一个东西了。支撑你收入的那些条件——平台规则、信息差、行情——没有一样在你自己手里。",
    exit: "问自己：如果明天所有平台和空子都消失，你靠什么挣到第一笔钱？那个答案，就是你该花时间去补的地方。"
  },
  E: {
    code: "E",
    title: "家底还在，但它在变薄",
    structure: "地主在衰退中僵化",
    diagonal: "landlord-pirate",
    selfSide: { role: "landlord", line: "我有资产，我在收租，我安全" },
    forceSide: { role: "pirate", line: "但资产的价值正在悄悄流走" },
    body: "你有资产，也在靠它生活。但你心里清楚：它产生的钱在变少，或者它本身在贬值。「拥有」给人的安全感很强，强到让人不愿意去认真算这笔账。",
    blindSpot: "你的安全感建立在「我有什么」上，而不是「我会什么」上。可「有」是有条件的——市场得有人接，规则得认账，这两样都不归你管。",
    exit: "两件事选一件做：重新捡起一门能直接换钱的本事，或者趁还来得及，把不再产钱的资产换成更活的形态。不要恐慌，但也不要再拖。"
  },
  F: {
    code: "F",
    title: "四面受力",
    structure: "被四种逻辑同时拉扯",
    diagonal: "all",
    selfSide: { role: "mixed", line: "我什么都在做，想分散风险" },
    forceSide: { role: "mixed", line: "但你其实在分散注意力" },
    body: "你的情况没法用一个词概括：有稳定的部分，也在接活，有些资产，还在追机会。这几件事对人的要求是冲突的——有的要你沉住气，有的要你随时动。全都占着，就意味着每件事都只能用一部分力。",
    blindSpot: "你以为这是分散风险，实际更可能是分散注意力。",
    exit: "做一次减法：看哪一块真正在养你，哪一块只是在消耗你，把次要的砍掉或者交出去。方向定了，原来互相打架的精力才能合到一处。"
  }
};
