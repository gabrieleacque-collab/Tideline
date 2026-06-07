import { inputs, simpleTheory, calculate, conclusion, dominant, dominantKey, round, analyzeTargetPath, targetNameFromPosition } from './calculate.js';
import { createDefaultState, saveTestSnapshot, loadTestSnapshot } from './state.js';
import { personalityMeta, renderRouteSparkline, getVisibleFamousRoutes, targetKeyFromPosition } from './routes-data.js';

let state = createDefaultState();
let targetPosition = null;
let situationSignal = { x: 0, y: 0, note: '' };
let coordinateRecords = [];
let selectedFamousIndex = 0;

const $ = id => document.getElementById(id);
const setText = (id, text) => { const el = $(id); if (el) el.textContent = text; };
const setHTML = (id, html) => { const el = $(id); if (el) el.innerHTML = html; };

function buildForm() {
  const form = $('form');
  if (!form) return;
  form.innerHTML = inputs.map(item => {
    const min = item.min ?? 0;
    const max = item.max ?? 100;
    const unit = item.unit ?? '%';
    return `<label class="slider-row" title="${item.hint}"><span class="slider-label"><strong>${item.label}</strong><span class="value" id="value-${item.id}">${state[item.id] ?? item.value}${unit}</span></span><input type="range" min="${min}" max="${max}" value="${state[item.id] ?? item.value}" id="${item.id}"></label>`;
  }).join('');
  inputs.forEach(item => {
    const el = $(item.id);
    el?.addEventListener('input', () => {
      state[item.id] = Number(el.value);
      setText(`value-${item.id}`, `${el.value}${item.unit ?? '%'}`);
      updateTest();
    });
  });
  $('situationApply')?.addEventListener('click', () => applySituationSignal());
  $('situationInput')?.addEventListener('input', () => setText('situationHint', '写完后点“更新定位”。后台接入 AI 后会读取这里；现在先用关键词轻轻修正定位点。'));
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
  const quad = $('quad');
  const dot = $('targetDot');
  if (!quad || !dot) return;
  const moveTarget = event => {
    const rect = quad.getBoundingClientRect();
    const x = Math.max(13, Math.min(87, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(13, Math.min(87, ((event.clientY - rect.top) / rect.height) * 100));
    targetPosition = { x, y };
    updateTest();
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
  $('generateTideCardButton')?.addEventListener('click', () => {
    const scores = currentScores();
    saveTestSnapshot({ state, situationSignal, targetPosition: targetPosition || { x: scores.x, y: scores.y }, coordinateRecords });
  });
}

function loadSnapshotIntoState(snapshot) {
  state = { ...createDefaultState(), ...(snapshot?.state || {}) };
  situationSignal = snapshot?.situationSignal || { x: 0, y: 0, note: '' };
  targetPosition = snapshot?.targetPosition || null;
  coordinateRecords = snapshot?.coordinateRecords || [];
}

function renderTideCard(scores) {
  const key = dominantKey(scores);
  const meta = personalityMeta[key];
  const target = targetPosition || { x: scores.x, y: scores.y };
  const future = targetNameFromPosition(target.x, target.y);
  const analysis = analyzeTargetPath(scores, target);
  const card = $('tidelineCard');
  card?.style.setProperty('--persona-tone', meta.tone);
  card?.style.setProperty('--persona-rgb', meta.rgb);
  const img = $('personaImage');
  if (img) { img.src = meta.image; img.alt = `${meta.name}人格插画`; }
  setText('cardCurrent', `${meta.name} / ${meta.en}`);
  setText('cardFuture', future);
  setText('cardRelation', `你现在更接近${meta.name}：${meta.line}。你拖动的方向是${future}，这不是换一种身份，而是在原来的底盘上调结构。${analysis.text.replace('做到这个结果，你需要：', '')}`);
  setHTML('cardSteps', analysis.steps.map(step => `<li>${step}</li>`).join(''));
}

function renderConclusion(scores) {
  const result = conclusion(scores);
  const analysis = analyzeTargetPath(scores, targetPosition);
  setText('verdictTitle', result.title);
  setText('verdictText', result.text);
  setText('targetAnalysisTitle', analysis.title);
  setText('targetAnalysisText', analysis.text);
  setHTML('targetSteps', analysis.steps.map(step => `<li>${step}</li>`).join(''));
}

function renderExpectedGreats(scores = currentScores()) {
  const mount = $('expectedGreatCards');
  if (!mount) return;
  const target = targetPosition || { x: scores.x, y: scores.y };
  const key = targetKeyFromPosition(target);
  const matched = getVisibleFamousRoutes().filter(person => person.key === key || person.path.includes(key)).slice(0, 3);
  mount.innerHTML = matched.map(person => `<article class="expected-card"><h4>${person.name}</h4><span>${person.route}</span><p>${person.text}</p></article>`).join('');
}

function renderResultPage() {
  const snapshot = loadTestSnapshot();
  if (!snapshot) {
    $('emptyResult')?.classList.add('show');
    $('resultContent')?.classList.add('hidden');
    return;
  }
  loadSnapshotIntoState(snapshot);
  const scores = currentScores();
  renderTideCard(scores);
  renderConclusion(scores);
  renderExpectedGreats(scores);
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
  const dot = $('dot');
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
if (page === 'test') { buildForm(); enableTargetDrag(); bindTrajectory(); bindGenerate(); updateTest(); }
if (page === 'result') renderResultPage();
if (page === 'routes') renderFamousRoutes();
if (page === 'model') renderSimpleTheory();
