export const inputs = [
      { id: "stableIncome", label: "稳定工资/固定现金流占比", value: 0, hint: "越高越接近农民，代表时间换钱的底盘。" },
      { id: "supportIncome", label: "靠他人补助维持经济占比", value: 0, hint: "父母、伴侣、家庭或外部资助。占比越高，越说明当前仍靠确定性供养打底，学生尤其会被推向农民。" },
      { id: "assetIncome", label: "资产性收入占比", value: 0, hint: "租金、股息、利息、产权收益。" },
      { id: "projectIncome", label: "项目/提成/副业机会占比", value: 0, hint: "越高越接近渔民，代表事件捕获能力。" },
      { id: "specIncome", label: "套利/投机/信息差收入占比", value: 0, hint: "越高越接近海盗，但需要承受高波动。" },
      { id: "savings", label: "手里够花多久", value: 0, min: 0, max: 24, unit: "月", hint: "手里钱越厚，越能慢慢等机会。" },
      { id: "debt", label: "债务压力", value: 0, hint: "房贷、消费贷、经营贷对自由度的挤压。" },
      { id: "skill", label: "技能复利", value: 0, hint: "一个领域持续提高时薪和判断力的能力。" },
      { id: "institution", label: "制度/平台依赖", value: 0, hint: "依赖单位、平台、牌照、流量入口的程度。" },
      { id: "familyLoad", label: "家庭与固定责任负载", value: 0, hint: "越高越需要稳定底线。" },
      { id: "attention", label: "长期专注度", value: 0, hint: "能否长期守住一个方向，直到真正吃透它。" },
      { id: "retainedPerMonth", label: "每月真正留下的钱", value: 0, min: 0, max: 50000, unit: "元", hint: "收入减去支出、还债、必要责任后，真正能留下的钱。" }
    ];

export const simpleTheory = {
      nodes: [
        ["tl", "地主", "确定性资产：把资源留住"],
        ["tr", "海盗", "不确定性优势：抓信息和速度"],
        ["bl", "农民", "确定性劳动：长期打底"],
        ["br", "渔民", "不确定性劳动：捕捉机会"]
      ],
      edges: [
        ["左右轴", "左边是确定性，右边是不确定性。"],
        ["上下轴", "下方是劳动，上方是让资源替你工作。"],
        ["四个名字", "农民、渔民、地主、海盗不是身份，而是你此刻的收入结构和行动方式。"],
        ["移动方法", "先看自己在哪里，再决定要加稳定、加机会、加资产，还是降速度。"]
      ]
    };

export const hiddenDefaults = { moveRoom: 58, reserveWindow: 36, volatility: 54 };
export const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, n));
export const round = n => Math.round(clamp(n));

export const personalityLabels = {
      plant: "农民",
      surf: "渔民",
      build: "地主",
      wind: "海盗"
    };

export const targetStrategies = {
      plant: {
        nw: { title: "农民去筑基", text: "你不是要突然变有钱，而是把稳定劳动慢慢沉淀成能替你工作的东西。", steps: ["固定留存比例，先把 6 到 12 个月安全垫做出来。", "把技能收入的一部分转成低维护资产或长期工具。", "减少无复利的加班，把时间换成可复制方法。"] },
        n: { title: "农民上岸", text: "目标是从单纯劳动转向可积累的职级、资格、作品和组织位置。", steps: ["选择一个能涨价的专业方向，不再平均用力。", "用证书、作品集或关键项目证明你的可替代性下降。", "把收入增长的一半留住，避免生活成本同步膨胀。"] },
        ne: { title: "农民去借风", text: "你想借速度，但底线不能丢。适合小仓位试风口，而不是押上生活。", steps: ["只拿闲钱和业余时间试新机会。", "每次试错前写清止损线和退出条件。", "保留主收入，不用工资和贷款补高波动亏损。"] },
        w: { title: "农民入土", text: "你需要更深的确定性：更少波动、更清楚的规则、更稳定的现金流。", steps: ["优先寻找长期合同、稳定岗位或可预测客户。", "砍掉分散项目，集中在一个能持续积累的场景。", "每月复盘留存，而不是只看收入总额。"] },
        c: { title: "农民守中线", text: "目标不是换人格，而是让稳定底盘更有弹性。", steps: ["保留固定进账，同时每周给新收入留出固定时间。", "把债务压力压到不会影响选择权。", "建立季度复测，观察坐标是否缓慢右移。"] },
        e: { title: "农民去逐浪", text: "你要从确定劳动走向机会捕获，关键是先有一个小而真实的市场。", steps: ["从一个具体客户群开始，不要泛泛做副业。", "用作品、案例或样品换第一批反馈。", "主业托底，直到项目收入连续 3 个月可重复。"] },
        sw: { title: "农民回田", text: "这是回到底盘的选择：先保现金流、保健康、保家庭责任。", steps: ["暂停高波动尝试，先把月度支出降下来。", "补足紧急备用金，减少被动跳槽和被迫借钱。", "用技能成长替代短期焦虑。"] },
        s: { title: "农民深耕", text: "目标是把主动收入做厚，靠技能复利而不是靠运气。", steps: ["选择一个能持续涨价的技能，每周固定投入。", "把成果变成作品集、客户评价或可展示案例。", "每半年只优化一个主变量：时薪、客户质量或留存。"] },
        se: { title: "农民试潮", text: "适合从稳定底盘出发，试一条可控的项目线。", steps: ["先做低成本试单，验证需求而不是想象市场。", "项目钱先留一半，不立刻扩大开销。", "只在复购出现后再投入更多时间。"] }
      },
      surf: {
        nw: { title: "渔民去筑基", text: "你要把一次次捕获固化下来，让机会变成资产和流程。", steps: ["把项目收入分成生活、留存、复投三份。", "把最佳客户和交付流程写成模板。", "减少只靠个人状态才能完成的项目。"] },
        n: { title: "渔民上岸", text: "你需要把不稳定机会转成可预测收入。", steps: ["筛选复购客户，放弃只消耗精力的单次项目。", "给报价和交付设置标准，不再每次临场发挥。", "建立现金流表，看未来 3 个月是否站得住。"] },
        ne: { title: "渔民去借风", text: "这是从项目捕获走向更高速度，但风险也会放大。", steps: ["只放大已经验证过的渠道，不放大情绪。", "设置单项目亏损上限，避免用下一单补上一单。", "保留一个稳定客户池作为回撤垫。"] },
        w: { title: "渔民去播种", text: "你要减少漂移感，把机会收入放进更清楚的规则里。", steps: ["把客户来源固定到 1 到 2 个主渠道。", "把交付周期缩短，减少回款不确定。", "用合同、定金和里程碑保护现金流。"] },
        c: { title: "渔民守中线", text: "保持机会敏感，但别让每次浪都改变生活节奏。", steps: ["保留项目弹性，同时固定每月最低留存。", "把高峰收入平滑到 6 个月使用。", "每季度淘汰一个低质量机会来源。"] },
        e: { title: "渔民扩海", text: "你适合扩大机会池，但必须靠方法，不靠兴奋。", steps: ["复制最成功的客户画像，寻找相邻市场。", "用公开作品和案例降低获客成本。", "只扩张能复用的部分，不扩张个人疲劳。"] },
        sw: { title: "渔民下潜", text: "目标是从波动中撤一层，先回到能稳定呼吸的位置。", steps: ["暂停大项目赌注，先补回现金和睡眠。", "把项目列表按回款确定性排序。", "先做小而快的交付，恢复节奏。"] },
        s: { title: "渔民练桨", text: "你要把机会判断背后的技能练实。", steps: ["复盘过去 5 次赚钱，找出真正可复制的动作。", "补一个短板技能：销售、交付、财务或表达。", "让项目能力脱离单次好运。"] },
        se: { title: "渔民追潮", text: "这是顺势扩张位，适合已有验证后的连续捕获。", steps: ["围绕一个已验证方向连续做 3 个版本。", "用现金留存控制扩张速度。", "把客户反馈变成下一轮产品或服务。"] }
      },
      build: {
        nw: { title: "地主加固", text: "你已经在占有侧，重点是确认资产真的产钱。", steps: ["盘点每项资产扣除维护后的净现金流。", "清理不产现金还占用心力的资产。", "把现金流重新投到更低维护的结构里。"] },
        n: { title: "地主收租", text: "目标是提高被动收益质量，而不是堆账面规模。", steps: ["看净收益率，不只看总价。", "降低债务和维护成本对现金流的侵蚀。", "保留流动现金，避免资产重但手里空。"] },
        ne: { title: "地主去借风", text: "你想用资产基础去抓速度，但不能把底座抵押掉。", steps: ["只用盈余试高波动机会，不动核心资产。", "为每个机会设置资金上限和时间上限。", "把收益及时撤回底座，而不是无限滚动。"] },
        w: { title: "地主封仓", text: "这是防守位：减少外部波动，让资产和责任匹配。", steps: ["重新评估负债期限，避免短债长投。", "提高现金比例，降低被迫卖出的概率。", "把家庭责任纳入资产配置，而不是只看收益。"] },
        c: { title: "地主守中线", text: "你需要在稳定和开放之间留一个窗口。", steps: ["保留核心资产，同时拿小比例做新项目观察。", "每季度检查资产是否仍然产现金。", "把稳定收益的一部分用于技能或渠道更新。"] },
        e: { title: "地主开窗", text: "你要从资产稳定走向机会开放，让沉睡资源重新流动。", steps: ["用已有资源连接新客户、渠道或合作。", "先做轻资产试验，不急着重投入。", "把一次合作变成长期入口。"] },
        sw: { title: "地主去播种", text: "回到劳动侧是为了修复现金流，不是失败。", steps: ["如果资产现金流变薄，先补主动收入。", "减少账面幻觉，关注每月留下的钱。", "用一段稳定工作或服务换回流动性。"] },
        s: { title: "地主补工", text: "你需要重新拥有主动赚钱能力，避免只靠资产价格。", steps: ["恢复一个能直接变现的技能。", "用专业服务或顾问收入补现金流。", "不要让身份感压过真实收入。"] },
        se: { title: "地主去逐浪", text: "适合用稳资产做后盾，开一条小项目线。", steps: ["选择和现有资产相关的轻项目。", "控制预算，先验证客户和回款。", "成功后再考虑资产化或流程化。"] }
      },
      wind: {
        nw: { title: "海盗去筑基", text: "你要把速度留下来，变成底座，而不是只留下刺激。", steps: ["每次收益先撤出本金和税费。", "把盈利的一部分固定转入安全资产。", "减少杠杆，让风停时还能站住。"] },
        n: { title: "海盗收束", text: "目标是从高波动上方回到可管理的占有结构。", steps: ["列出所有风险敞口，先砍掉最大尾部风险。", "把短期交易收益转成安全储备。", "停止用借来的钱追下一波。"] },
        ne: { title: "海盗冲顶", text: "这是最高速位置，只适合极小仓位和明确止损。", steps: ["每次行动前写清退出价格、时间和亏损上限。", "用组合限制单点失败。", "盈利后立即分层撤退，不把胜利重新押回去。"] },
        w: { title: "海盗去播种", text: "你要把信息差收入接到更稳定的规则和现金流上。", steps: ["寻找能制度化的渠道，而不是只靠快进快出。", "把交易、套利或风口经验整理成服务或流程。", "降低频率，提高确定性。"] },
        c: { title: "海盗守中线", text: "你需要保留敏锐，但把它关进风险笼子里。", steps: ["设定总风险预算，亏完就停。", "每月固定留存，不让账户波动决定生活。", "把一次判断复盘成规则，不靠情绪冲动。"] },
        e: { title: "海盗控帆", text: "你仍在海洋侧，但目标是有控制地借势。", steps: ["只追自己熟悉的风，不追所有风。", "减少杠杆，增加信息验证。", "用小仓位连续试，而不是单次梭哈。"] },
        sw: { title: "海盗降帆", text: "这是止损和回到底线的位置，先活下来。", steps: ["停止加仓和借钱，先确认还能撑多久。", "把债务、保证金和固定支出逐项降下来。", "用稳定现金流修复选择权。"] },
        s: { title: "海盗练底", text: "你需要让爆发力下面长出真实技能。", steps: ["选一个能长期变现的硬技能。", "把过去的判断经验写成可出售的内容或服务。", "先稳定三个月现金流，再谈下一次机会。"] },
        se: { title: "海盗去逐浪", text: "从纯速度转向项目捕获，让高波动变得可复用。", steps: ["把信息差转成客户价值，而不是只做交易。", "寻找可复购场景，让机会变成项目。", "每次项目收益都先补安全储备。"] }
      }
    };

export function calculate(state, situationSignal = { x: 0, y: 0 }) {
      const s = state;
      const supportIncome = s.supportIncome ?? 0;
      const farmer = clamp(
        s.stableIncome * 0.52 + supportIncome * 0.86 + s.skill * 0.22 + s.attention * 0.16 +
        s.familyLoad * 0.10 - s.moveRoom * 0.08
      );
      const fisher = clamp(
        s.projectIncome * 0.52 + s.moveRoom * 0.20 + s.volatility * 0.16 +
        s.skill * 0.08 - s.familyLoad * 0.10 - supportIncome * 0.14
      );
      const landlord = clamp(
        s.assetIncome * 0.62 + s.savings * 2.1 + s.institution * 0.15 -
        s.debt * 0.18
      );
      const pirate = clamp(
        s.specIncome * 0.58 + s.volatility * 0.18 + s.moveRoom * 0.10 +
        (100 - s.institution) * 0.08 - s.savings * 0.55 - supportIncome * 0.18
      );

      const land = (farmer + landlord) / 2;
      const sea = (fisher + pirate) / 2;
      const labor = (farmer + fisher) / 2;
      const owning = (landlord + pirate) / 2;
      let x = clamp(50 + (sea - land) * 0.44, 13, 87);
      let y = clamp(50 - (owning - labor) * 0.44, 13, 87);
      x = clamp(x + situationSignal.x, 13, 87);
      y = clamp(y + situationSignal.y, 13, 87);

      const mismatch = clamp(
        s.debt * 0.28 + s.specIncome * 0.36 + s.volatility * 0.18 +
        Math.max(0, s.projectIncome - s.savings * 3) * 0.22 -
        s.savings * 1.15 - s.attention * 0.10
      );

      const reserveLongWan = (s.retainedPerMonth * s.reserveWindow) / 10000;
      const retentionStrength = clamp(
        (s.retainedPerMonth / 500) + s.savings * 1.6 + s.attention * 0.14 -
        s.debt * 0.14 - s.familyLoad * 0.08
      );

      const resilience = clamp(
        s.savings * 2.6 + s.skill * 0.24 + s.attention * 0.22 +
        s.assetIncome * 0.12 + retentionStrength * 0.18 - s.debt * 0.22
      );

      const thirdPath = clamp(
        Math.min(farmer, fisher) * 0.58 + s.savings * 1.25 +
        s.attention * 0.18 + s.skill * 0.18 + retentionStrength * 0.12 -
        mismatch * 0.18
      );

      return {
        farmer, fisher, landlord, pirate, x, y, mismatch, resilience, thirdPath,
        reserveLongWan, retentionStrength
      };
    }

export function dominant(scores) {
      const list = [
        ["build", scores.landlord],
        ["wind", scores.pirate],
        ["plant", scores.farmer],
        ["surf", scores.fisher]
      ].sort((a, b) => b[1] - a[1]);
      return personalityLabels[list[0][0]];
    }

export function dominantKey(scores) {
      return [
        ["build", scores.landlord],
        ["wind", scores.pirate],
        ["plant", scores.farmer],
        ["surf", scores.fisher]
      ].sort((a, b) => b[1] - a[1])[0][0];
    }

export function conclusion(scores) {
      const d = dominant(scores);
      const highMismatch = scores.mismatch >= 62;
      const weakBase = scores.resilience < 38;
      const strongThird = scores.thirdPath >= 62;
      const pirateHigh = scores.pirate > scores.farmer && scores.pirate > 54;
      const landlordHigh = scores.landlord > 56 && scores.farmer < 45;

      if (highMismatch) {
        return {
          path: "先保命：降杠杆",
          title: "未来主要风险：拿生活底线去赌风口",
          text: "现在最该处理的不是寻找下一个机会，而是先把债务、投机和高波动收入降下来。通俗说：不要用工资、信用卡、贷款去赌行情。先把每月固定压力降到可承受范围，再谈上升。",
          notes: [
            "先看每月真正留下的钱：一样东西如果让你留下的钱变少，它就不是资产，是负担。",
            "把高息债、短债、维护成本和必须每月还的钱列出来，先处理最危险的。",
            "投机和试错只能用闲钱，不能用房租、生活费、工资预支或借来的钱。"
          ]
        };
      }

      if (strongThird) {
        return {
          path: "主业托底副业试水",
          title: "未来进展：最适合走第三条路",
          text: "你已经有基本稳定的底线，也有机会捕获能力。最具体的做法是：主业或固定进账负责让日子照常过，副业、项目、客户、作品集负责打开上限。不要急着裸辞，也不要只守着工资。",
          notes: [
            "保留一份稳定进账，至少覆盖生活费和固定责任。",
            "选一个具体方向长期做：例如固定客户、专业作品、可复购产品、可持续渠道。",
            "每赚到一笔项目钱，都别急着花：先留钱，再升级能力，再沉淀资产。"
          ]
        };
      }

      if (pirateHigh) {
        return {
          path: "做项目拿大单后固化",
          title: "未来进展：机会能力强，但要把一次成功变成结构",
          text: "你比较会抓机会、抓信息差或抓客户窗口。下一步不是继续追更大的浪，而是把一次性收入变成可重复收入。通俗说：拿大单之后，要把客户、流程、团队、资产留下来。",
          notes: [
            "把高波动收入的一部分变成备用钱或低波动资产。",
            "不要只靠一个平台、一个客户、一个行情吃饭。",
            "复盘每次赚钱靠的是什么：渠道、时机、判断、执行，能复制的才是真能力。"
          ]
        };
      }

      if (landlordHigh) {
        return {
          path: "守资产，再开小窗口",
          title: "未来进展：稳定性强，但上限需要重新打开",
          text: "你现在更像已经有一些固定资源或稳定收益的人。好处是安全，问题是容易僵化，而且地权逻辑常见的误判是：账面很大，现金流很薄。具体做法是守住真实产钱的资产，同时拿一小部分时间或资金测试新项目。",
          notes: [
            "别只看资产总价，要看扣掉维护成本后每月到底留下多少钱。",
            "用小仓位试新项目：新客户、新渠道、新产品、新市场。",
            "定期检查资产是否还真的产生现金流，不要把账面安全当成真实安全。"
          ]
        };
      }

      if (weakBase) {
        return {
          path: "先打底：稳收入",
          title: "未来进展：先把日常底盘做厚",
          text: "当前安全垫和技能复利偏薄，过早追求跃迁会很累。未来 6 到 12 个月最具体的任务是：稳定收入、减少乱花、提高一个能涨价的技能，让自己重新有选择权。",
          notes: [
            "先让手里的钱至少能撑 6 个月。",
            "选一个能涨工资、接单或提高议价权的技能，每周固定投入。",
            "减少太分散的机会，先做能积累履历、作品、客户或证书的事。"
          ]
        };
      }

      return {
        path: d === "农民" ? "上班攒资产" : d === "渔民" ? "项目试水" : d === "地主" ? "守资产开窗口" : "小仓位抓机会",
        title: `未来进展：当前主导为${d}`,
        text: "你的结构还没有形成压倒性方向。短期适合做参数校准：稳定收入负责生活，项目收入负责上限，资产收入负责沉淀，投机收入只能当小比例实验。",
        notes: [
          "如果工资最稳定，就先走“上班攒资产”：涨技能、涨时薪、攒备用钱。",
          "如果项目机会最多，就走“项目试水”：先小单验证，再做可复购客户。",
          "每季度复测一次，看自己的坐标在往哪边移，和你想去的方向对不对得上。"
        ]
      };
    }

export function gridZoneFromPosition(x, y) {
      const col = x < 40 ? "w" : x > 60 ? "e" : "c";
      const row = y < 40 ? "n" : y > 60 ? "s" : "m";
      if (row === "m" && col === "c") return "c";
      if (row === "m") return col;
      if (col === "c") return row;
      return `${row}${col}`;
    }

export function targetNameFromPosition(x, y) {
      const zone = gridZoneFromPosition(x, y);
      const names = {
        nw: "地主象限左上",
        n: "上方占有带",
        ne: "海盗象限右上",
        w: "陆地确定带",
        c: "中线均衡区",
        e: "海洋机会带",
        sw: "农民象限左下",
        s: "下方劳动带",
        se: "渔民象限右下"
      };
      return names[zone];
    }

export function analyzeTargetPath(scores, targetPosition = null) {
      const target = targetPosition || { x: scores.x, y: scores.y };
      const zone = gridZoneFromPosition(target.x, target.y);
      const targetName = targetNameFromPosition(target.x, target.y);
      const strategy = targetStrategies[dominantKey(scores)][zone];

      return {
        title: `你想去的结构：${targetName} · ${strategy.title}`,
        text: `做到这个结果，你需要：${strategy.text}`,
        steps: strategy.steps
      };
    }
