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
    title: "种地的人看不见航线",
    structure: "农民被海盗截流",
    diagonal: "farmer-pirate",
    selfSide: { role: "farmer", line: "我踏实做事，投入总会有回报" },
    forceSide: { role: "pirate", line: "但你的产出在流通环节被悄悄拿走" },
    body: "你是一个生产者。你相信投入和回报成正比，相信时间会给认真的人回报。但你现在的处境是：你种出来的东西，在到达你手上之前，已经被别人拿走了一部分。不是你不够努力，是你站在生产端，看不见流通端发生了什么。",
    blindSpot: "价值不是在你手里消失的，是在从你手里到市场的那段路上消失的。",
    exit: "农民必须出海。不是变成海盗，而是带着你的耐心进入流通，理解你的产品怎么被定价、被中转、被抽成。不用学会抢，但必须学会看见航线。"
  },
  B: {
    code: "B",
    title: "自由是别人的利润",
    structure: "渔民被地主围困",
    diagonal: "fisher-landlord",
    selfSide: { role: "fisher", line: "我靠手艺自由地活，不依赖任何人" },
    forceSide: { role: "landlord", line: "但你脚下的海域属于别人" },
    body: "你觉得自己是自由的。没有固定雇主，靠手艺和判断力在市场里游猎。但你没注意到：你的自由发生在别人的领地上。平台、渠道、中间商，他们不指挥你怎么干活，但他们拥有你干活的基础设施。",
    blindSpot: "你的自由本身就是地租的一部分。你越“自由”，平台越不用为你承担成本，它的利润就越高。",
    exit: "渔民要学农民。不是放弃自由回去上班，而是在你的自由里植入农民的时间结构：积累、建设、长周期。你需要一块不依赖任何平台就属于你的地，哪怕很小。"
  },
  C: {
    code: "C",
    title: "手停口停的循环",
    structure: "农民无法地主化",
    diagonal: "farmer-landlord",
    selfSide: { role: "farmer", line: "我有手艺，我在持续劳动" },
    forceSide: { role: "landlord", line: "但你的劳动没有沉淀成任何资产" },
    body: "你会做事，而且做得好。但你所有的收入都直接来自你的劳动。你一停，收入就停。农民的粮食会腐烂，所以农民永远在劳作。地主发明了地契，一种不会腐烂的价值存储方式。",
    blindSpot: "你把“亲手做”当成了唯一正当的经济模式。但占有和劳动不是道德问题，是结构问题。",
    exit: "把手艺变成资产。教程、模板、授权、合约、品牌，任何能让“你做过的事”继续产生价值的形式，都能让劳动的果实不再腐烂。"
  },
  D: {
    code: "D",
    title: "在海上忘了怎么着陆",
    structure: "渔民漂流化 / 渔民→海盗滑移",
    diagonal: "fisher-pirate",
    selfSide: { role: "fisher", line: "我灵活，我能在变化里找到机会" },
    forceSide: { role: "pirate", line: "但你越来越靠信息差，而不是创造" },
    body: "你很擅长在不确定中生存。别人慌的时候你能找到机会，市场变的时候你能跟上。但你可能越来越难说清楚自己到底在做什么。渔民自己捕鱼，海盗拦截别人的鱼。你可能已经从前者滑向了后者。",
    blindSpot: "你已经很久没有从零开始创造一个东西了。你的收入越来越依赖信息差、时间差、平台规则的漏洞。",
    exit: "找回你的渔网。问自己：如果明天所有的平台、所有的信息差都消失了，你还能靠什么活？那个东西就是你的技能，你真正的劳动。"
  },
  E: {
    code: "E",
    title: "地契在手里贬值",
    structure: "地主在衰退中僵化",
    diagonal: "landlord-pirate",
    selfSide: { role: "landlord", line: "我有资产，我在收租，我安全" },
    forceSide: { role: "pirate", line: "但地的价值正在悄悄流走" },
    body: "你有地，你在收租。但你心里清楚：租金在变少，或者地在贬值。地主的优势是地契不会腐烂，盲区也在这里。你以为“拥有”本身是安全的，但拥有只在制度保障你的拥有权时才安全。",
    blindSpot: "你已经忘记了怎么劳动。你的身份建立在“拥有”而非“能做”上。如果明天资产归零，你还会什么？",
    exit: "两条路：重新拾起一种能创造价值的技能，或者把固化的价值转成流动资本。但流动要有方向，不要恐慌式抛售。"
  },
  F: {
    code: "F",
    title: "四面受力",
    structure: "被四种逻辑同时拉扯",
    diagonal: "all",
    selfSide: { role: "mixed", line: "我什么都在做，想分散风险" },
    forceSide: { role: "mixed", line: "但你其实在分散注意力" },
    body: "你的处境不是一个象限能概括的。你同时在种地、在出海、在交租、在被截流。四种逻辑互相干扰：种地需要耐心，出海需要随时出发；收租需要你不动，截流需要你速度最快。",
    blindSpot: "你以为你在分散风险，其实你在分散注意力。",
    exit: "先做减法，认清你的主要矛盾在哪条对角线上。找到那条主线，然后用对应的出路。同时应对四个方向，最终哪个方向都走不远。"
  }
};
