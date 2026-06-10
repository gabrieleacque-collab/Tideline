const assetUrl = path => new URL(path, import.meta.url).href;

export const personalityMeta = {
      plant: { name: "农民", en: "PLANTER", image: assetUrl("../assets/persona-plant.png"), tone: "#88b891", rgb: "136, 184, 145", line: "用时间换确定性" },
      surf: { name: "渔民", en: "SURFER", image: assetUrl("../assets/persona-surf.png"), tone: "#78a9bf", rgb: "120, 169, 191", line: "靠判断和时机吃饭" },
      build: { name: "地主", en: "BUILDER", image: assetUrl("../assets/persona-build.png"), tone: "#d6a54a", rgb: "214, 165, 74", line: "让资产替你工作" },
      wind: { name: "海盗", en: "RIDER", image: assetUrl("../assets/persona-wind.png"), tone: "#c65f4a", rgb: "198, 95, 74", line: "靠速度和信息差获利" }
    };

    export const routePointMap = {
      plant: { x: 22, y: 78 },
      surf: { x: 78, y: 78 },
      build: { x: 22, y: 22 },
      wind: { x: 78, y: 22 }
    };

    export function renderRouteSparkline(path) {
      const points = path.map(key => routePointMap[key] || routePointMap.plant);
      const polyline = points.map(point => `${point.x},${point.y}`).join(" ");
      const circles = points.map(point => `<circle cx="${point.x}" cy="${point.y}" r="3.8"></circle>`).join("");
      return `<svg class="route-sparkline" data-route-sparkline="routeSparkline" viewBox="0 0 100 100" role="img" aria-label="九宫路径"><polyline points="${polyline}"></polyline>${circles}</svg>`;
    }

    export const famousRoutes = [
      { name: "巴菲特", route: "农民→地主", key: "build", path: ["plant", "build"], text: "用时间的复利，把耐心本身变成最大资产。", method: "长期阅读、长期等待、长期少犯错。你可以学他的不是买什么，而是把判断力交给时间，让留存慢慢变成底座。" },
      { name: "松下幸之助", route: "农民→地主", key: "build", path: ["plant", "build"], text: "九岁学徒工开始种地，一辈子没换过田。", method: "把日常经营做成流程、信用和组织。普通人的突破不是突然跳跃，而是让每天能重复做好的事变成系统。" },
      { name: "Louis Kahn", route: "农民→地主", key: "build", path: ["plant", "build"], text: "五十岁前默默无闻，用光和混凝土种地。", method: "长期守住一种材料、一种问题、一种尺度。你可以把慢热期当成蓄力期，别急着证明自己已经到达。" },
      { name: "黑泽明", route: "农民→地主", key: "build", path: ["plant", "build"], text: "三十年打磨剪辑和分镜，方法论成了基础设施。", method: "把审美拆成可训练动作：观察、分镜、节奏、剪辑。真正能留下来的不是灵感，是稳定的工作法。" },
      { name: "杜甫", route: "农民→地主", key: "build", path: ["plant", "build"], text: "颠沛流离中写下诗史，苦地变成纪念碑。", method: "把个人困境写进更大的时代结构。你可以把压力变成记录能力，而不是只把它当消耗。" },
      { name: "弗洛伊德", route: "农民→地主", key: "build", path: ["plant", "build"], text: "在维也纳诊室里听人说话，听出一套基础设施。", method: "在一个场景里长期重复，直到细节自己说话。你的入口可以很窄，但观察要足够深。" },
      { name: "尼采", route: "农民→海盗", key: "wind", path: ["plant", "wind"], text: "从古典语文学出发，用尖锐的文字炸碎旧道德。", method: "先深读，再决裂。你可以先在一个传统里学会语言，然后用自己的判断重写它。" },
      { name: "马克思", route: "农民→海盗", key: "wind", path: ["plant", "wind"], text: "大英博物馆里耕作三十年，产出改写世界的武器。", method: "用大量研究建立底盘，再把复杂现实压缩成可传播、可组织、可行动的工具。" },
      { name: "王阳明", route: "农民→海盗", key: "wind", path: ["plant", "wind", "plant"], text: "龙场悟道前是书生，之后变成能打仗的哲学家。", method: "认知必须进入行动。对你来说，知识不是收藏品，而是遇到局势时还能站住的内在秩序。" },
      { name: "杜尚", route: "农民→海盗", key: "wind", path: ["plant", "wind"], text: "规矩画了十年画，再用小便池改写艺术定义。", method: "先学会系统内部的规则，再找到最小但最致命的破口。创新不是乱来，是准确地移动定义。" },
      { name: "鲁迅", route: "农民→海盗", key: "wind", path: ["plant", "wind"], text: "从学医到弃医从文，沉默里磨出匕首。", method: "把长期观察压成短促有力的表达。你的文字、产品或行动要能击中时代的疼点。" },
      { name: "路德", route: "农民→海盗", key: "wind", path: ["plant", "wind"], text: "修道院苦修多年，一纸论纲点燃新世界。", method: "在制度内部看清问题，再用明确、公开、可复制的表达突破。关键是让个人判断变成公共事件。" },
      { name: "哥白尼", route: "农民→海盗", key: "wind", path: ["plant", "wind"], text: "神父身份种了一辈子地，临终前移动宇宙中心。", method: "长期收集证据，等待一个能重排世界的模型。慢不等于弱，慢可以换来结构级判断。" },
      { name: "李白", route: "农民→渔民", key: "surf", path: ["plant", "surf"], text: "少年读书蜀中，出蜀后成为全唐最自由的渔民。", method: "先给自己一块文化底盘，再出门撞见世界。自由不是空心漂流，而是带着积累去移动。" },
      { name: "葛饰北斋", route: "农民→渔民", key: "surf", path: ["plant", "surf"], text: "从六岁画到九十岁，一生都在换海域。", method: "持续练基本功，同时不断更新题材和身份。你可以长期做一件事，但不要让它只有一种表情。" },
      { name: "安藤忠雄", route: "渔民→农民", key: "plant", path: ["surf", "plant"], text: "拳击、自学、旅行之后，用清水混凝土种地。", method: "先在世界里移动和吸收，再回到极克制的语言反复打磨。机会最终要落成手艺。" },
      { name: "村上春树", route: "渔民→农民", key: "plant", path: ["surf", "plant"], text: "从爵士酒吧转入每天凌晨写作的纪律。", method: "把灵感从偶然变成制度：固定时间、固定身体状态、固定产出节奏，让写作不只靠心情。" },
      { name: "苏东坡", route: "渔民→农民", key: "plant", path: ["surf", "plant"], text: "官场起落如逐浪，留下来的却是生活和文字。", method: "外部潮水不可控时，把经验转成作品、生活技术和精神弹性。" },
      { name: "草间弥生", route: "渔民→农民", key: "plant", path: ["surf", "plant"], text: "在艺术海洋里捕猎，最后住进自己的田。", method: "让个人感知不断重复、不断深化，直到它从症状变成符号，从符号变成作品系统。" },
      { name: "Mies", route: "渔民→农民", key: "plant", path: ["surf", "plant"], text: "柏林事务所里逐浪学艺，最后找到少即是多。", method: "先广泛吸收，再删到只剩骨架。你可以靠减少，而不是堆叠，找到自己的语言。" },
      { name: "贾科梅蒂", route: "渔民→农民", key: "plant", path: ["surf", "plant"], text: "离开巴黎超现实主义海洋，回工作室削人像三十年。", method: "从热闹圈层撤回核心问题。你真正的田，可能就是别人觉得太窄的那个问题。" },
      { name: "塔可夫斯基", route: "渔民→农民", key: "plant", path: ["surf", "plant"], text: "在审查和流亡中漂泊，每部电影却守同一块田。", method: "不让环境夺走内核。即使外部不断迁移，也要保留一条稳定的精神轴线。" },
      { name: "柯布西耶", route: "渔民→农民", key: "plant", path: ["surf", "plant"], text: "东方之旅四处看、画、量，回来种了一辈子地。", method: "旅行不是逃走，是采样。把外部经验带回你的系统里，变成长期可用的形式。" },
      { name: "赵无极", route: "渔民→农民", key: "plant", path: ["surf", "plant"], text: "从杭州到巴黎，在抽象海洋里找到水墨骨骼。", method: "让两套文化互相照亮。你的优势也许不在纯粹，而在能把不同经验融成一块田。" },
      { name: "是枝裕和", route: "渔民→农民", key: "plant", path: ["surf", "plant"], text: "从电视纪录片逐浪，找到家庭这块田后深耕二十五年。", method: "先靠现场感训练眼睛，再找到可反复进入的主题。持续不是重复，是越拍越准。" },
      { name: "卡拉瓦乔", route: "渔民→农民", key: "plant", path: ["surf", "plant"], text: "罗马街头和逃亡港口里，种下改变巴洛克的画。", method: "把粗粝现实带进作品。你不必抹平自己的经历，关键是让它进入形式。" },
      { name: "李嘉诚", route: "渔民→地主", key: "build", path: ["surf", "build"], text: "从塑料花贸易起步，抓住地产机会建造版图。", method: "在流动市场里捕捉窗口，然后迅速把利润沉淀到更稳定的资产和控制权里。" },
      { name: "Coco Chanel", route: "渔民→地主", key: "build", path: ["surf", "build"], text: "从裁缝渔民到巴黎品牌，把名字变成不动产。", method: "先感知生活方式的变化，再用产品语言定义它。审美不是装饰，而是新的社会规则。" },
      { name: "拉康", route: "渔民→地主", key: "build", path: ["surf", "build"], text: "在弗洛伊德边界上捕猎，最后建立自己的学派。", method: "不要只继承权威，要在遗产边界上提出新问题。学派来自持续的概念组织。" },
      { name: "安迪·沃霍尔", route: "渔民→地主", key: "build", path: ["surf", "build"], text: "商业插画起步，在纽约艺术市场捕猎，工厂成品牌。", method: "把时代的复制、消费和媒体变成自己的生产系统。你的机会要能变成一个房间、一套流程。" },
      { name: "山本耀司", route: "渔民→地主", key: "build", path: ["surf", "build"], text: "在巴黎时装海洋突围，把反时尚变成不动产。", method: "用清晰反差进入市场，再用长期一致性变成品牌。叛逆也需要稳定语法。" },
      { name: "村上隆", route: "渔民→地主", key: "build", path: ["surf", "build"], text: "在御宅文化和当代艺术交叉海域逐浪，超扁平成品牌。", method: "把边缘文化翻译成全球语言。你要找到能被理解、被购买、被传播的接口。" },
      { name: "贝聿铭", route: "渔民→地主", key: "build", path: ["surf", "build"], text: "从购物中心项目逐浪，到卢浮宫金字塔封神。", method: "先在商业现实里训练交付，再在关键项目里建立象征。大作品需要长期可信度。" },
      { name: "扎哈·哈迪德", route: "渔民→地主", key: "build", path: ["surf", "build"], text: "十年纸上建筑师，终于让激进空间落地。", method: "在没被接受时继续生产方案。等窗口打开，长期积累会一次性显形。" },
      { name: "乔布斯", route: "海盗→农民", key: "plant", path: ["wind", "plant"], text: "先靠速度、说服和时代风口破局，回归后迷恋细节。", method: "用叙事和判断打开风口，但真正赢在反复打磨产品体验，把速度收回细节。" },
      { name: "丰臣秀吉", route: "海盗→农民", key: "plant", path: ["wind", "plant"], text: "从足轻借风到天下人，再拼命想把局势落地。", method: "先抓住时代缝隙快速上升，再用组织、奖惩和土地秩序固定胜势。" },
      { name: "拿破仑", route: "海盗→农民", key: "plant", path: ["wind", "plant"], text: "靠速度征服欧洲，帝国消散后法典继续生长。", method: "速度能改变局面，制度才能留下。你需要把一次胜利写成可继承的规则。" },
      { name: "嵇康", route: "海盗→农民", key: "plant", path: ["wind", "plant"], text: "最激烈的海盗，死亡本身成了永恒姿态。", method: "把个人姿态压到极纯。你不一定要模仿激烈，但可以学习一致性带来的穿透力。" },
      { name: "Renzo Piano", route: "海盗→农民", key: "plant", path: ["wind", "plant"], text: "蓬皮杜中心借风成名，之后四十年温和耕作。", method: "成名之后不要只重复爆点。把突围得到的注意力，转回安静、准确、可靠的长期工作。" },
      { name: "迪拜王室", route: "地主→海盗", key: "wind", path: ["build", "wind"], text: "从石油地租出发，把迪拜变成全球化海船。", method: "资源不是终点，而是跳板。你可以把既有底盘变成连接、通道、平台和流量入口。" },
      { name: "美第奇家族", route: "地主→海盗", key: "wind", path: ["build", "wind"], text: "银行业筑基，再把资本变成文艺复兴燃料。", method: "把钱投向能改变声望和时代语言的人。资产真正的上限，是它能催生什么生态。" },
      { name: "大卫·鲍伊", route: "地主→渔民", key: "surf", path: ["build", "surf"], text: "每隔几年杀死一个自己，先筑基再主动拆毁。", method: "先形成可辨认的身份，再有意识地更新它。改变不是失去自己，而是管理版本。" },
      { name: "洛克菲勒", route: "海盗→地主", key: "build", path: ["wind", "build"], text: "靠铁路时机和标准石油借风，再转成基金会和大学。", method: "把高强度扩张后的财富转成公共基础设施。胜利之后要问：它能留下什么秩序。" },
      { name: "川久保玲", route: "海盗→地主", key: "build", path: ["wind", "build"], text: "巴黎初登场是借风，Dover Street Market 把反叛筑基。", method: "先用差异撕开入口，再把差异经营成空间、渠道和稳定生态。" },
      { name: "切·格瓦拉", route: "渔民→渔民", key: "surf", path: ["surf", "surf"], text: "从阿根廷到古巴、刚果、玻利维亚，永远追下一片海。", method: "这是极致移动型路线。对个人来说，它提醒你：如果一直不上岸，就要承担无法沉淀的代价。" },
      { name: "玄奘", route: "渔民→渔民", key: "surf", path: ["surf", "surf"], text: "十七年穿越沙漠雪山，在佛法海洋中追真理。", method: "把移动变成求证。你不是为了新鲜而走，而是为了找到更高质量的答案。" },
      { name: "宫崎骏", route: "农民→农民→农民", key: "plant", path: ["plant", "plant", "plant"], text: "从未离开画桌，五十年手绘产生不可复制之物。", method: "把个人世界观交给漫长手工。稳定不是保守，而是对作品质量近乎固执的守护。" },
      { name: "司马迁", route: "农民→农民→农民", key: "plant", path: ["plant", "plant", "plant"], text: "宫刑之后继续写史记，最极端的农民。", method: "把个人遭遇转成更大的叙事秩序。靠长期材料、判断和忍耐，把痛苦变成结构。" },
      { name: "莫兰迪", route: "农民→农民→农民", key: "plant", path: ["plant", "plant", "plant"], text: "在博洛尼亚画同样的瓶子五十年，瓶子变成永恒。", method: "限制题材，放大敏感度。你可以不追热点，只要把一个问题看得比别人深。" },
      { name: "颜真卿", route: "农民→农民→农民", key: "plant", path: ["plant", "plant", "plant"], text: "从练楷书到殉国，一辈子在同一块田里。", method: "把字、人格和时代责任合在一起。长期训练最终会显出人的骨头。" },
      { name: "康德", route: "农民→农民→农民", key: "plant", path: ["plant", "plant", "plant"], text: "一生没离开柯尼斯堡，却重划人类认识版图。", method: "稳定生活可以服务于极大的思想运动。外部移动少，不代表内部问题小。" },
      { name: "任正非", route: "农民→渔民→农民", key: "surf", path: ["plant", "surf", "plant"], text: "军人纪律打底，下海逐浪，最后回到研发和组织。", method: "以组织纪律打底，进入全球竞争捕捉机会，最后把压力重新压回研发、流程和人才密度。" },
      { name: "诸葛亮", route: "农民→渔民→农民", key: "surf", path: ["plant", "surf", "plant"], text: "躬耕南阳，再入乱世航行，始终带着农民品质。", method: "先建立判断和秩序，再进入复杂局势。真正支撑博弈的不是奇谋，而是后勤、纪律和长期治理。" },
      { name: "张爱玲", route: "复杂轨迹", key: "plant", path: ["plant", "surf", "plant"], text: "上海播种、香港逐浪、美国播种，底色始终冷。", method: "不同阶段可以种不同的地。关键不是环境多热闹，而是你是否保留了自己的观看方式。" },
      { name: "谷崎润一郎", route: "复杂轨迹", key: "plant", path: ["surf", "plant"], text: "东京逐浪后迁居关西，写出阴翳礼赞。", method: "从热闹中撤回传统和身体感。你的田可能在一次迁移之后才显形。" },
      { name: "黑格尔", route: "复杂轨迹", key: "build", path: ["plant", "wind", "build"], text: "耶拿穷教师播种，精神现象学借风，柏林大学筑基。", method: "先长期搭概念，再让一次作品打开局面，最后把体系放进制度里。" },
      { name: "弗里达·卡罗", route: "复杂轨迹", key: "plant", path: ["plant", "plant"], text: "车祸把她绑在床上，她在床上种出最烈的画。", method: "被迫的限制也能成为创作的田。问题不是自由多少，而是能否把限制转成形式。" },
      { name: "阿甘本", route: "复杂轨迹", key: "build", path: ["plant", "surf", "build"], text: "从语文学播种，在福柯和海德格尔之间逐浪，再建概念帝国。", method: "把学术谱系当海域，不断找边界问题。最终要建立自己的概念房子。" },
      { name: "三岛由纪夫", route: "复杂轨迹", key: "wind", path: ["plant", "wind"], text: "从战后文坛播种到右翼政治借风，用身体截获注意力。", method: "这是高风险路线。它提示你：表达越极端，越要知道自己是在生产作品还是燃烧自己。" },
      { name: "Thomas Bernhard", route: "复杂轨迹", key: "wind", path: ["plant", "wind"], text: "在奥地利封闭世界种地，用播种方式做借风的事。", method: "长期重复也能形成攻击力。你的声音如果足够准确，不必追风也会产生风。" },
      { name: "坂本龙一", route: "复杂轨迹", key: "plant", path: ["surf", "plant", "plant"], text: "从 YMO 逐浪到电影音乐播种，最后在病房种到最后一天。", method: "不同媒介之间移动，但保持对声音的细密感。越到后期，越要让作品变轻、变准。" },
      { name: "妹岛和世", route: "复杂轨迹", key: "surf", path: ["plant", "surf", "plant"], text: "在伊东丰雄事务所学艺，再以 SANAA 的透明轻盈逐浪。", method: "先在事务所学规则，再用极轻的语言打开新局。轻不是弱，是控制力。" },
      { name: "齐白石", route: "复杂轨迹", key: "surf", path: ["plant", "surf"], text: "乡下木匠农民，到北京后衰年变法。", method: "晚起步不是问题。带着农民题材进入新海域，反而能形成无法伪装的真。" },
      { name: "瓦格纳", route: "复杂轨迹", key: "plant", path: ["wind", "plant"], text: "流亡二十年的海盗，却用二十六年完成指环。", method: "激进想象需要漫长工期。你可以有很大的野心，但必须给它足够长的施工时间。" },
      { name: "齐格蒙特·鲍曼", route: "复杂轨迹", key: "build", path: ["surf", "build"], text: "被驱逐三次，把流亡经验变成液态现代性。", method: "把漂泊经验变成理论模型。你的不稳定经历，如果被概念化，也能成为别人理解时代的工具。" }
    ];

    export const DAILY_ROUTE_UNLOCK_COUNT = 3;
    export const dailyRouteCandidates = [
      { name: "奥黛丽·赫本", route: "渔民→农民", key: "plant", path: ["surf", "plant"], text: "从舞台和电影逐浪，晚年把声望转向儿童救助。", method: "把被世界看见的能力，收回到一件长期、具体、有人受益的事上。" },
      { name: "南丁格尔", route: "农民→地主", key: "build", path: ["plant", "build"], text: "从护理现场播种，把经验变成现代护理制度。", method: "先在真实现场解决问题，再把方法写成标准。照顾人的劳动也能变成基础设施。" },
      { name: "达尔文", route: "渔民→农民", key: "plant", path: ["surf", "plant"], text: "环球航行逐浪，回到书房后用二十年种出进化论。", method: "先收集足够多的世界，再用漫长安静把观察压成理论。" },
      { name: "玛丽·居里", route: "农民→地主", key: "build", path: ["plant", "build"], text: "在实验室长期耕作，把不可见的元素变成新科学地基。", method: "持续做艰苦、重复、少人看见的工作，直到材料本身改变知识边界。" },
      { name: "贝多芬", route: "农民→海盗", key: "wind", path: ["plant", "wind"], text: "长期训练古典技法，却用个人意志撞开浪漫主义。", method: "先掌握旧规则，再让无法回避的个人声音进入规则，改变它。" },
      { name: "弗吉尼亚·伍尔夫", route: "农民→海盗", key: "wind", path: ["plant", "wind"], text: "在私人房间里播种，用意识流改写小说的内在时间。", method: "把最私人的感受训练成形式，让细微经验获得公共表达。" },
      { name: "莱特兄弟", route: "农民→渔民", key: "surf", path: ["plant", "surf"], text: "从自行车店里的实验开始，把人类推向天空。", method: "小作坊也能做大突破。关键是持续试验、快速修正、紧贴真实问题。" },
      { name: "费曼", route: "渔民→农民", key: "plant", path: ["surf", "plant"], text: "在问题之间逐浪，最后留下极清楚的物理直觉。", method: "保持好奇，但把每次好奇都讲到别人能懂。理解不是炫技，是可传递。" },
      { name: "李小龙", route: "海盗→地主", key: "build", path: ["wind", "build"], text: "用速度和影像借风，再把截拳道变成方法。", method: "不要被门派困住。把有效动作留下，把无效身份拿掉，最终形成自己的体系。" },
      { name: "托妮·莫里森", route: "农民→地主", key: "build", path: ["plant", "build"], text: "长期编辑和写作，把被忽略的经验写成文学地基。", method: "先照看语言，再照看历史。你的材料越具体，越可能成为更大的结构。" },
      { name: "伊夫·圣罗兰", route: "渔民→地主", key: "build", path: ["surf", "build"], text: "在巴黎时装浪潮里突围，把女性衣橱改成品牌秩序。", method: "抓住生活方式的变化，用清晰产品反复定义它。" },
      { name: "泰戈尔", route: "农民→渔民", key: "surf", path: ["plant", "surf"], text: "从诗歌和教育播种，又在世界文化之间航行。", method: "根要深，路可以远。真正的开放不是失根，而是带着根去交流。" },
      { name: "海明威", route: "渔民→农民", key: "plant", path: ["surf", "plant"], text: "在战争、旅行和新闻现场逐浪，回到极简句子里种地。", method: "经历很多不等于作品成立。要把经验删到最硬、最准确的句子。" },
      { name: "奥本海默", route: "农民→海盗", key: "wind", path: ["plant", "wind"], text: "理论物理播种多年，在战争风口中被推到中心。", method: "专业能力遇到时代事件时会被放大。越靠近风口，越需要承担后果。" },
      { name: "吴清源", route: "农民→农民→农民", key: "plant", path: ["plant", "plant", "plant"], text: "一生在棋盘上深耕，靠极薄的变化重写围棋。", method: "把世界缩到一张棋盘，也可以无限深。慢工不是慢，是精度。" }
    ];

    export function generateDailyRoutes(now = new Date()) {
      const start = Date.parse("2026-06-07T00:00:00+08:00");
      const days = Math.max(1, Math.floor((now.getTime() - start) / 86400000) + 1);
      const count = Math.min(dailyRouteCandidates.length, days * DAILY_ROUTE_UNLOCK_COUNT);
      return dailyRouteCandidates.slice(0, count);
    }

    export function getDailyUnlockedRoutes(now = new Date()) {
      const key = "tidelineDailyRoutes";
      const dayKey = now.toISOString().slice(0, 10);
      try {
        const cached = JSON.parse(localStorage.getItem(key) || "null");
        if (cached?.dayKey === dayKey && Number.isFinite(cached.count)) {
          return dailyRouteCandidates.slice(0, Math.min(cached.count, dailyRouteCandidates.length));
        }
        const routes = generateDailyRoutes(now);
        localStorage.setItem(key, JSON.stringify({ dayKey, count: routes.length }));
        return routes;
      } catch (error) {
        return generateDailyRoutes(now);
      }
    }

    export function addDailyRoutes(routes) {
      const known = new Set(routes.map(person => person.name));
      return routes.concat(getDailyUnlockedRoutes().filter(person => !known.has(person.name)));
    }

    export function getVisibleFamousRoutes() {
      return addDailyRoutes(famousRoutes);
    }

    export function targetKeyFromPosition(position) {
      if (position.y < 50 && position.x < 50) return "build";
      if (position.y < 50 && position.x >= 50) return "wind";
      if (position.y >= 50 && position.x < 50) return "plant";
      return "surf";
    }
