import { inputs, simpleTheory, calculate, conclusion, dominant, dominantKey, round, analyzeTargetPath, targetNameFromPosition } from './calculate.js';
import { createDefaultState, saveTestSnapshot, loadTestSnapshot } from './state.js';
import { personalityMeta, renderRouteSparkline, getVisibleFamousRoutes } from './routes-data.js';
import { scenarios } from './scenarios.js';
import { applyScenarioOffsets, roleToKey, rolePositions, inferSelfPosition, inferStructuralPosition } from './diagnose.js';
import { roleMeta } from './diagnoses.js';
import { crossReadings } from './cross.js';

let state = createDefaultState();
let targetPosition = null;
let situationSignal = { x: 0, y: 0, note: '' };
let coordinateRecords = [];
let selectedFamousIndex = 0;
let quizIndex = 0;
let quizAnswers = [];
let currentPersonality = null;

const $ = id => document.getElementById(id);
const setText = (id, text) => { const el = $(id); if (el) el.textContent = text; };
const setHTML = (id, html) => { const el = $(id); if (el) el.innerHTML = html; };

function createManualInitialState() {
  return { ...createDefaultState(), ...Object.fromEntries(inputs.map(item => [item.id, 0])) };
}

function gradeLabel(value, labels) {
  const index = Math.min(labels.length - 1, Math.floor(Number(value) / (101 / labels.length)));
  return labels[Math.max(0, index)];
}

function formatInputValue(item, value) {
  if (item.id === 'skill' || item.id === 'attention') return gradeLabel(value, ['差', '较差', '一般', '良好', '优秀']);
  if (item.id === 'institution') return gradeLabel(value, ['很低', '较低', '一般', '较高', '很高']);
  if (item.id === 'familyLoad') return gradeLabel(value, ['很轻', '较轻', '一般', '较重', '很重']);
  return `${value}${item.unit ?? '%'}`;
}

function buildSliderForm(formId = 'form', onChange = updateTest) {
  const form = $(formId);
  if (!form) return;
  form.innerHTML = inputs.map(item => {
    const min = item.min ?? 0;
    const max = item.max ?? 100;
    const unit = item.unit ?? '%';
    const value = state[item.id] ?? item.value;
    return `<label class="slider-row" title="${item.hint}"><span class="slider-label"><strong>${item.label}</strong><span class="value" id="value-${formId}-${item.id}">${formatInputValue(item, value)}</span></span><input type="range" min="${min}" max="${max}" value="${value}" id="${formId}-${item.id}" data-input-id="${item.id}"></label>`;
  }).join('');
  inputs.forEach(item => {
    const el = $(`${formId}-${item.id}`);
    el?.addEventListener('input', () => {
      state[item.id] = Number(el.value);
      setText(`value-${formId}-${item.id}`, formatInputValue(item, el.value));
      onChange();
    });
  });
}

function buildForm() {
  buildSliderForm('form', updateTest);
  $('situationApply')?.addEventListener('click', () => applySituationSignal());
  $('situationInput')?.addEventListener('input', () => setText('situationHint', '写完后点“更新定位”。后台接入 AI 后会读取这里；现在先用关键词轻轻修正定位点。'));
}

function initManualPage() {
  const snapshot = loadTestSnapshot();
  if (snapshot) loadSnapshotIntoState(snapshot);
  state = createManualInitialState();
  situationSignal = { x: 0, y: 0, note: '' };
  targetPosition = null;
  buildForm();
  bindGenerate();
}

function applySituationSignal(text = $('situationInput')?.value || '') {
  const content = text.trim();
  const signal = { x: 0, y: 0, note: '已根据你的补充做轻量校准。' };
  if (!content) {
    situationSignal = { x: 0, y: 0, note: '' };
    setText('situationHint', '后台接入 AI 后会读取这里；现在先用关键词轻轻修正定位点。');
    updateTest();
    return;
  }
  if (/房贷|车贷|债|还款|父母|孩子|家庭|稳定|编制|公务|养老/.test(content)) signal.x -= 4;
  if (/副业|客户|项目|订单|自由职业|创业|接单|转行|作品/.test(content)) signal.x += 5;
  if (/资产|房租|股息|存款|投资|版权|店铺|股权|物业/.test(content)) signal.y -= 4;
  if (/技能|写作|设计|咨询|销售|工资|上班|手艺|专业/.test(content)) signal.y += 3;
  if (/风口|股票|币|杠杆|套利|流量|信息差|短视频|投机/.test(content)) { signal.x += 4; signal.y -= 2; }
  situationSignal = signal;
  setText('situationHint', `${signal.note} 后台接入 AI 后会读取这里，定位会更细。`);
  updateTest();
  triggerResultFlash();
}

function currentScores() { return calculate(state, situationSignal); }

function updateTargetOverlay(scores) {
  if (!targetPosition) targetPosition = { x: scores.x, y: scores.y };
  const targetDot = $('targetDot');
  const path = $('targetPath');
  if (!targetDot || !path) return;
  targetDot.style.setProperty('--tx', targetPosition.x);
  targetDot.style.setProperty('--ty', targetPosition.y);
  const dx = targetPosition.x - scores.x;
  const dy = targetPosition.y - scores.y;
  const length = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx);
  path.style.setProperty('--from-x', scores.x);
  path.style.setProperty('--from-y', scores.y);
  path.style.setProperty('--path-l', `${length}%`);
  path.style.setProperty('--path-a', `${angle}rad`);
}

function updateTest() {
  const scores = currentScores();
  const result = conclusion(scores);
  setText('scoreLandlord', round(scores.landlord));
  setText('scorePirate', round(scores.pirate));
  setText('scoreFarmer', round(scores.farmer));
  setText('scoreFisher', round(scores.fisher));
  const dot = $('dot');
  const label = $('dotLabel');
  if (dot) { dot.style.setProperty('--x', scores.x); dot.style.setProperty('--y', scores.y); }
  if (label) { label.style.setProperty('--x', scores.x); label.style.setProperty('--y', scores.y); label.textContent = result.path; }
  setText('miniDominant', dominant(scores));
  setText('miniPath', result.path);
  updateTargetOverlay(scores);
}

function enableTargetDrag() {
  const quad = $('quad') || $('diagnosticQuad');
  const dot = $('targetDot');
  if (!quad || !dot) return;
  const moveTarget = event => {
    const rect = quad.getBoundingClientRect();
    const x = Math.max(13, Math.min(87, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(13, Math.min(87, ((event.clientY - rect.top) / rect.height) * 100));
    targetPosition = { x, y };
    updateTest();
    if (page === 'result') {
      saveTestSnapshot({ state, answers: quizAnswers, situationSignal, targetPosition, coordinateRecords });
      renderExpectedGreats(currentScores(), currentPersonality);
    }
  };
  dot.addEventListener('pointerdown', event => { event.preventDefault(); dot.classList.add('dragging'); dot.setPointerCapture(event.pointerId); moveTarget(event); });
  dot.addEventListener('pointermove', event => { if (dot.classList.contains('dragging')) moveTarget(event); });
  dot.addEventListener('pointerup', event => { dot.classList.remove('dragging'); if (dot.hasPointerCapture(event.pointerId)) dot.releasePointerCapture(event.pointerId); });
  dot.addEventListener('pointercancel', event => { dot.classList.remove('dragging'); if (dot.hasPointerCapture(event.pointerId)) dot.releasePointerCapture(event.pointerId); });
}

function recordCurrentPosition() {
  const scores = currentScores();
  const analysis = analyzeTargetPath(scores, targetPosition);
  coordinateRecords.push({ x: scores.x, y: scores.y, label: dominant(scores), path: analysis.title.replace('你想去的结构：', '') });
  coordinateRecords = coordinateRecords.slice(-10);
  renderTrajectory();
}

function renderTrajectory() {
  const polyline = $('trajectoryPolyline');
  const pointsLayer = $('trajectoryPoints');
  const recordList = $('recordList');
  if (!polyline || !pointsLayer || !recordList) return;
  polyline.setAttribute('points', coordinateRecords.map(point => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' '));
  pointsLayer.innerHTML = coordinateRecords.map((point, index) => `<circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="${index === coordinateRecords.length - 1 ? 2.2 : 1.55}"></circle>`).join('');
  recordList.innerHTML = coordinateRecords.length ? coordinateRecords.map((point, index) => `<li><span>#${index + 1}</span><strong>${point.label}</strong><em>${Math.round(point.x)}, ${Math.round(point.y)}</em></li>`).join('') : '<li><span>-</span><strong>还没有记录</strong><em>0/10</em></li>';
}

function bindTrajectory() {
  $('recordCurrentPosition')?.addEventListener('click', recordCurrentPosition);
  $('clearTrajectory')?.addEventListener('click', () => { coordinateRecords = []; renderTrajectory(); });
  renderTrajectory();
}

function bindGenerate() {
  $('generateTideCardButton')?.addEventListener('click', event => {
    event.preventDefault();
    const scores = currentScores();
    const quizCompleted = quizAnswers.filter(answer => answer?.scenarioId).length >= scenarios.length;
    const nextPageAfterManual = quizCompleted ? 'result.html' : 'quiz.html';
    saveTestSnapshot({
      state,
      situationSignal,
      targetPosition: targetPosition || { x: scores.x, y: scores.y },
      coordinateRecords,
      answers: quizAnswers,
      quizCompleted,
      manualCompleted: true
    });
    location.href = nextPageAfterManual;
  });
}

function renderQuiz() {
  const scenario = scenarios[quizIndex];
  if (!scenario) return;
  setText('quizProgress', `${quizIndex + 1}/10`);
  const bar = $('quizBar');
  if (bar) bar.style.width = `${((quizIndex + 1) / scenarios.length) * 100}%`;
  setText('quizPerson', scenario.person);
  setHTML('quizOptions', scenario.options.map(option => `<button class="quiz-option" type="button" data-option="${option.key}"><span>${option.key}</span><p>${option.text}</p></button>`).join(''));
  document.querySelectorAll('[data-option]').forEach(button => {
    button.addEventListener('click', () => chooseQuizOption(button.dataset.option));
  });
}

function chooseQuizOption(key) {
  const scenario = scenarios[quizIndex];
  const option = scenario.options.find(item => item.key === key);
  quizAnswers.push({ scenarioId: scenario.id, option });
  if (quizIndex < scenarios.length - 1) {
    quizIndex += 1;
    renderQuiz();
    return;
  }
  const existing = loadTestSnapshot();
  const existingManualDone = Boolean(existing?.manualCompleted);
  state = existingManualDone ? { ...createDefaultState(), ...(existing?.state || {}) } : applyScenarioOffsets(createDefaultState(), quizAnswers);
  const scores = calculate(state);
  const personality = personalityResultFromAnswers(quizAnswers, scores);
  saveTestSnapshot({
    state,
    answers: quizAnswers,
    personalityCode: personality.role,
    situationSignal: existing?.situationSignal || situationSignal,
    targetPosition: existing?.targetPosition || personality.point,
    coordinateRecords: existing?.coordinateRecords || [],
    quizCompleted: true,
    manualCompleted: existingManualDone
  });
  location.href = existingManualDone ? 'result.html' : 'test.html';
}

function loadSnapshotIntoState(snapshot) {
  state = { ...createDefaultState(), ...(snapshot?.state || {}) };
  situationSignal = snapshot?.situationSignal || { x: 0, y: 0, note: '' };
  targetPosition = snapshot?.targetPosition || null;
  coordinateRecords = snapshot?.coordinateRecords || [];
  quizAnswers = snapshot?.answers || [];
}

function hasCompletedBothModes(snapshot) {
  return Boolean(snapshot?.manualCompleted) && Boolean(snapshot?.quizCompleted) && (snapshot?.answers || []).filter(answer => answer?.scenarioId).length >= scenarios.length;
}

function personalityResultFromAnswers(answers = [], scores = currentScores()) {
  const counts = { farmer: 0, fisher: 0, landlord: 0, pirate: 0 };
  const weights = { farmer: 0, fisher: 0, landlord: 0, pirate: 0 };
  for (const answer of answers) {
    const role = answer?.option?.structuralLabel || answer?.structuralLabel;
    if (!counts.hasOwnProperty(role)) continue;
    counts[role] += 1;
    weights[role] += Object.values(answer?.option?.paramOffsets || {}).reduce((sum, value) => sum + Math.abs(value), 0);
  }
  const role = Object.keys(counts).sort((a, b) => {
    const countDiff = counts[b] - counts[a];
    if (countDiff) return countDiff;
    const weightDiff = weights[b] - weights[a];
    if (weightDiff) return weightDiff;
    const scoreMap = { farmer: scores.farmer, fisher: scores.fisher, landlord: scores.landlord, pirate: scores.pirate };
    return scoreMap[b] - scoreMap[a];
  })[0] || 'farmer';
  return { role, meta: roleMeta[role] || roleMeta.farmer, point: rolePositions[role] || rolePositions.farmer };
}

function renderDiagnosticQuad(personality, scores = currentScores()) {
  const point = personality?.point || { x: scores.x, y: scores.y };
  if (!targetPosition) targetPosition = { x: point.x, y: point.y };
  const dot = $('dot') || $('structuralPositionDot');
  const label = $('dotLabel');
  if (dot) {
    dot.style.setProperty('--x', scores.x);
    dot.style.setProperty('--y', scores.y);
  }
  if (label) {
    label.style.setProperty('--x', scores.x);
    label.style.setProperty('--y', scores.y);
    label.textContent = personality?.meta?.name || conclusion(scores).path;
  }
  updateTargetOverlay(scores);
}

function renderParamGroups() {
  const groups = [
    ['农民', ['stableIncome', 'attention', 'familyLoad'], 'var(--green)'],
    ['渔民', ['projectIncome', 'skill', 'debt'], 'var(--blue)'],
    ['地主', ['assetIncome', 'institution', 'savings'], 'var(--gold)'],
    ['海盗', ['specIncome'], 'var(--red)']
  ];
  const labels = Object.fromEntries(inputs.map(item => [item.id, item]));
  setHTML('paramGroups', groups.map(group => `<section class="param-group" style="--group-tone:${group[2]}"><h4>${group[0]}</h4>${group[1].map(key => `<div class="param-row"><span>${labels[key]?.label || key}</span><strong>${state[key] ?? 0}${labels[key]?.unit ?? '%'}</strong></div>`).join('')}</section>`).join(''));
}

function personalityBody(role) {
  const bodies = {
    farmer: '你更接近农民：相信稳定、长期投入和持续劳动。你的优势是能把一件事做深，风险是太容易只在生产端用力，而忽略流通、定价和资产沉淀。',
    fisher: '你更接近渔民：靠判断、手艺和时机在变化里获得收入。你的优势是灵活，风险是太依赖外部水域，需要慢慢沉淀自己的客户、作品和规则。',
    landlord: '你更接近地主：重视稳定资源、平台位置和可持续收益。你的优势是能把价值留下来，风险是过度相信既有地盘，忘了重新劳动和更新能力。',
    pirate: '你更接近海盗：对速度、信息差和窗口期很敏感。你的优势是能快速抓住机会，风险是如果只靠截流和波动，最后会缺少真正能生根的东西。'
  };
  return bodies[role] || bodies.farmer;
}

function renderResultPersonality() {
  const scores = calculate(state, situationSignal);
  currentPersonality = personalityResultFromAnswers(quizAnswers, scores);
  const meta = currentPersonality.meta;
  const hero = document.querySelector('.personality-hero');
  const realAnswers = quizAnswers.filter(answer => answer?.scenarioId);
  const selfRole = inferSelfPosition(realAnswers);
  const structRole = inferStructuralPosition(state);
  const selfName = (roleMeta[selfRole] || roleMeta.farmer).name;
  const structName = (roleMeta[structRole] || roleMeta.farmer).name;
  const resultLine = selfRole === structRole ? `自认为是${selfName}，实际上确实是${structName}` : `自认为是${selfName}，实际上是${structName}`;
  const reading = crossReadings[selfRole]?.[structRole];
  hero?.style.setProperty('--persona-tone', meta.tone);
  setText('personalityResultName', resultLine);
  setText('personalityResultLine', reading?.title || meta.line);
  setText('personalityResultBody', personalityBody(currentPersonality.role));
  renderDiagnosticQuad(currentPersonality, scores);
  updateTest();
  renderCrossReading(scores);
  renderExpectedGreats(scores, currentPersonality);
}

function renderCrossReading(scores = currentScores()) {
  const content = $('crossContent');
  const locked = $('crossLocked');
  const marker = $('selfMarker');
  const line = $('crossLine');
  if (!content && !locked) return;
  const realAnswers = quizAnswers.filter(answer => answer?.scenarioId);
  const hasQuiz = realAnswers.length >= 2;
  if (!hasQuiz) {
    locked?.classList.remove('hidden');
    content?.classList.add('hidden');
    if (marker) marker.style.display = 'none';
    if (line) line.style.display = 'none';
    return;
  }
  locked?.classList.add('hidden');
  content?.classList.remove('hidden');
  const selfRole = inferSelfPosition(realAnswers);
  const structRole = inferStructuralPosition(state);
  const selfMeta = roleMeta[selfRole] || roleMeta.farmer;
  const structMeta = roleMeta[structRole] || roleMeta.farmer;
  const reading = crossReadings[selfRole]?.[structRole] || crossReadings.farmer.farmer;
  $('crossSelfChip')?.style.setProperty('--chip-tone', selfMeta.tone);
  $('crossStructChip')?.style.setProperty('--chip-tone', structMeta.tone);
  setText('crossSelfName', selfMeta.name);
  setText('crossSelfLine', selfMeta.line);
  setText('crossStructName', structMeta.name);
  setText('crossStructLine', structMeta.line);
  setText('crossTitle', reading.title);
  setText('crossBody', reading.body);
  setText('crossMove', reading.move);
  const aligned = selfRole === structRole;
  setText('crossHint', aligned
    ? '下方坐标图里：实心点是现实的你，空心环是你以为的你。两个点几乎重合——你选择的活法和你真实的处境是同一个。'
    : '下方坐标图里：实心点是现实的你，空心环是你以为的你。两点之间的虚线，就是上面这段话说的差距。');
  const selfPoint = rolePositions[selfRole] || rolePositions.farmer;
  if (marker) {
    marker.style.display = '';
    marker.style.setProperty('--x', selfPoint.x);
    marker.style.setProperty('--y', selfPoint.y);
  }
  if (line) {
    line.style.display = '';
    line.setAttribute('x1', selfPoint.x);
    line.setAttribute('y1', selfPoint.y);
    line.setAttribute('x2', scores.x.toFixed(1));
    line.setAttribute('y2', scores.y.toFixed(1));
  }
}

function renderResultPage() {
  const snapshot = loadTestSnapshot();
  if (!snapshot || !hasCompletedBothModes(snapshot)) {
    $('emptyResult')?.classList.add('show');
    $('resultContent')?.classList.add('hidden');
    return;
  }
  loadSnapshotIntoState(snapshot);
  renderResultPersonality();
  enableTargetDrag();
}

function renderExpectedGreats(scores = currentScores(), personality = currentPersonality) {
  const mount = $('expectedGreatCards');
  if (!mount) return;
  const targetRole = personality?.role || 'farmer';
  const key = roleToKey[targetRole] || 'plant';
  const matched = getVisibleFamousRoutes().filter(person => person.key === key || person.path.includes(key)).slice(0, 3);
  mount.innerHTML = matched.map(person => `<article class="expected-card"><h4>${person.name}</h4><span>${person.route}</span><p>${person.text}</p></article>`).join('');
}

function selectFamousRoute(index, scores = currentScores()) {
  selectedFamousIndex = index;
  const routes = getVisibleFamousRoutes();
  const person = routes[selectedFamousIndex] || routes[0];
  const userKey = dominantKey(scores);
  const userMeta = personalityMeta[userKey];
  const routeMeta = personalityMeta[person.key];
  const fitText = person.key === userKey ? '这张卡适合你参考：它的落点与你当前最接近。' : `这张卡更像一个外部参照：你当前偏${userMeta.name}，它的落点偏${routeMeta.name}。`;
  $('famousDetail')?.style.setProperty('--route-tone', routeMeta.tone);
  setText('selectedFamousName', person.name);
  setText('selectedFamousRoute', person.route);
  setText('selectedFamousMethod', person.method);
  setText('selectedFamousCompare', `${fitText} 对你来说，关键不是模仿他的身份，而是学习这条路线的动作：${person.text}`);
  document.querySelectorAll('.famous-card').forEach((card, cardIndex) => card.classList.toggle('active', cardIndex === selectedFamousIndex));
}

function renderFamousRoutes(scores = currentScores()) {
  const mount = $('famousRoutes');
  if (!mount) return;
  const routes = getVisibleFamousRoutes();
  const userKey = dominantKey(scores);
  if (selectedFamousIndex >= routes.length) selectedFamousIndex = 0;
  mount.innerHTML = routes.map((person, index) => {
    const meta = personalityMeta[person.key];
    const fit = person.key === userKey ? '<span class="famous-fit">适合你参考</span>' : '';
    return `<button class="famous-card" type="button" data-famous-index="${index}" style="--route-tone: ${meta.tone}; --route-rgb: ${meta.rgb}"><img src="${meta.image}" alt="${person.name}路径图例"><div>${renderRouteSparkline(person.path)}<h4>${person.name}</h4><div class="route">${person.route}</div><p>${person.text}</p>${fit}</div></button>`;
  }).join('');
  mount.querySelectorAll('[data-famous-index]').forEach(card => card.addEventListener('click', () => selectFamousRoute(Number(card.dataset.famousIndex), currentScores())));
  selectFamousRoute(selectedFamousIndex, scores);
}

function renderSimpleTheory() {
  setHTML('edgeList', simpleTheory.edges.map(edge => `<div class="edge-item"><strong>${edge[0]}</strong>：${edge[1]}</div>`).join(''));
  setHTML('miniMap', simpleTheory.nodes.map(node => `<div class="mini-node ${node[0]}"><strong>${node[1]}</strong><span>${node[2]}</span></div>`).join(''));
}

function triggerResultFlash(scores = currentScores()) {
  const flash = $('resultFlash');
  const dot = $('dot') || $('structuralPositionDot');
  if (!flash || !dot) return;
  const rect = dot.getBoundingClientRect();
  const fx = ((rect.left + rect.width / 2) / innerWidth) * 100;
  const fy = ((rect.top + rect.height / 2) / innerHeight) * 100;
  const colors = ['99, 199, 189', '214, 200, 170', '198, 95, 74', '136, 184, 145', '120, 169, 191'];
  flash.style.setProperty('--fx', `${fx}%`);
  flash.style.setProperty('--fy', `${fy}%`);
  flash.dataset.effect = '复杂粒子聚合';
  flash.innerHTML = Array.from({ length: 92 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 92 + Math.random() * .7;
    const distance = 160 + Math.random() * Math.max(innerWidth, innerHeight) * .46;
    return `<span class="flash-particle" id="flashParticle${index}" style="--sx:${(Math.cos(angle) * distance).toFixed(1)}px;--sy:${(Math.sin(angle) * distance).toFixed(1)}px;--ps:${(2 + Math.random() * 3.6).toFixed(1)}px;--pc:${colors[index % colors.length]}"></span>`;
  }).join('');
  flash.classList.remove('active');
  void flash.offsetWidth;
  flash.classList.add('active');
  window.setTimeout(() => { flash.classList.remove('active'); flash.innerHTML = ''; }, 1120);
}

function startParticles() {
  const canvas = $('network');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const pointer = { x: -999, y: -999 };
  let particles = [];
  const colors = ['98, 214, 203', '239, 98, 88', '111, 192, 130', '90, 167, 216', '213, 166, 58'];
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(innerWidth * dpr); canvas.height = Math.floor(innerHeight * dpr);
    canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(120, Math.max(54, Math.floor(innerWidth * innerHeight / 15000)));
    particles = Array.from({ length: count }, (_, i) => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - .5) * .38, vy: (Math.random() - .5) * .38, r: Math.random() * 1.6 + .5, c: colors[i % colors.length] }));
  }
  function frame() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = innerWidth + 20; if (p.x > innerWidth + 20) p.x = -20; if (p.y < -20) p.y = innerHeight + 20; if (p.y > innerHeight + 20) p.y = -20;
      const dx = p.x - pointer.x; const dy = p.y - pointer.y; const d = Math.hypot(dx, dy);
      if (d < 120) { p.x += dx / 260; p.y += dy / 260; }
    }
    for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 132) { ctx.strokeStyle = `rgba(${a.c}, ${.16 * (1 - d / 132)})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    }
    for (const p of particles) { ctx.fillStyle = `rgba(${p.c}, .72)`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); }
    requestAnimationFrame(frame);
  }
  addEventListener('resize', resize); addEventListener('pointermove', e => { pointer.x = e.clientX; pointer.y = e.clientY; }); addEventListener('pointerleave', () => { pointer.x = -999; pointer.y = -999; }); resize(); frame();
}

const page = document.body.dataset.page;
startParticles();
if (page === 'quiz') renderQuiz();
if (page === 'test') initManualPage();
if (page === 'result') renderResultPage();
if (page === 'routes') renderFamousRoutes();
if (page === 'model') renderSimpleTheory();
