const MOODS = [
  { v: 5, e: '😄', n: '开心', c: '#fcb040' },
  { v: 4, e: '🙂', n: '平静', c: '#7dd17a' },
  { v: 3, e: '😐', n: '一般', c: '#9aa7b0' },
  { v: 2, e: '😔', n: '低落', c: '#6f8df0' },
  { v: 1, e: '😢', n: '难过', c: '#a985f5' },
];
const TRIGGERS = ['学业', '工作', '人际', '家庭', '睡眠', '健康', '财务', '其他'];
const KEY = 'moodcare.entries.v1';
const TIPS = [
  '写下今天一件做得好的小事，无论多小。',
  '起身倒一杯温水，慢慢喝完它。',
  '出门晒 10 分钟太阳，顺便看看天空。',
  '整理一下书桌的角落，只 5 分钟即可。',
  '给一个很久没联系的朋友发句问候。',
  '听一首初中时最爱的那首歌。',
  '做 10 次又慢又深的呼吸。',
  '写下此刻心里的三个「小确幸」。',
  '给自己做一顿简单的饭，认真摆个盘。',
  '放下手机，发呆 3 分钟，不被打扰。',
];
const KEYWORDS = [
  { k: '考试', c: '学业' }, { k: '论文', c: '学业' }, { k: '作业', c: '学业' },
  { k: 'ddl', c: '学业' }, { k: '上课', c: '学业' }, { k: '成绩', c: '学业' },
  { k: '复习', c: '学业' }, { k: '答辩', c: '学业' }, { k: '早八', c: '学业' },
  { k: '图书馆', c: '学业' }, { k: '占座', c: '学业' },
  { k: '面试', c: '工作' }, { k: '加班', c: '工作' }, { k: '领导', c: '工作' },
  { k: '同事', c: '工作' }, { k: '需求', c: '工作' }, { k: '汇报', c: '工作' },
  { k: '开会', c: '工作' }, { k: '实习', c: '工作' }, { k: '方案', c: '工作' },
  { k: '转正', c: '工作' },
  { k: '吵架', c: '人际' }, { k: '冷战', c: '人际' }, { k: '孤独', c: '人际' },
  { k: '朋友', c: '人际' }, { k: '室友', c: '人际' }, { k: '恋爱', c: '人际' },
  { k: '分手', c: '人际' }, { k: '同学', c: '人际' }, { k: '小组', c: '人际' },
  { k: '记挂', c: '人际' },
  { k: '父母', c: '家庭' }, { k: '妈妈', c: '家庭' }, { k: '爸爸', c: '家庭' },
  { k: '家里', c: '家庭' }, { k: '家人', c: '家庭' },
  { k: '失眠', c: '睡眠' }, { k: '熬夜', c: '睡眠' }, { k: '睡不着', c: '睡眠' },
  { k: '早起', c: '睡眠' }, { k: '睡眠', c: '睡眠' }, { k: '困', c: '睡眠' },
  { k: '做梦', c: '睡眠' },
  { k: '生病', c: '健康' }, { k: '感冒', c: '健康' }, { k: '头疼', c: '健康' },
  { k: '拉伸', c: '健康' }, { k: '体检', c: '健康' },
  { k: '房租', c: '财务' }, { k: '工资', c: '财务' }, { k: '账单', c: '财务' },
  { k: '花钱', c: '财务' }, { k: '兼职', c: '财务' }, { k: '攒钱', c: '财务' },
  { k: '跑步', c: '生活' }, { k: '游戏', c: '生活' }, { k: '旅行', c: '生活' },
  { k: '周末', c: '生活' }, { k: '阳光', c: '生活' }, { k: '公园', c: '生活' },
  { k: '火锅', c: '生活' }, { k: '刷手机', c: '生活' },
  { k: '焦虑', c: '情绪词' }, { k: '紧张', c: '情绪词' }, { k: '压力', c: '情绪词' },
  { k: '累', c: '情绪词' }, { k: '疲惫', c: '情绪词' }, { k: '开心', c: '情绪词' },
  { k: '难过', c: '情绪词' }, { k: '生气', c: '情绪词' }, { k: '委屈', c: '情绪词' },
  { k: '迷茫', c: '情绪词' }, { k: '崩溃', c: '情绪词' }, { k: '放松', c: '情绪词' },
  { k: '期待', c: '情绪词' }, { k: '兴奋', c: '情绪词' }, { k: '满足', c: '情绪词' },
  { k: '受挫', c: '情绪词' },
];
const GROUND = [
  { n: 5, v: '看见', h: '慢慢说出你此刻看到的 5 样东西', ex: '比如：一盏灯、窗外的树、手边的杯子…' },
  { n: 4, v: '触摸', h: '感受你能触碰到的 4 样东西的质地', ex: '比如：桌面的凉、衣服的软、水杯的滑…' },
  { n: 3, v: '听见', h: '仔细听，找出 3 种你能听到的声音', ex: '比如：空调声、车流声、自己的呼吸…' },
  { n: 2, v: '闻到', h: '留意 2 种此刻闻得到的气味', ex: '比如：空气的味道、咖啡香、洗衣液…' },
  { n: 1, v: '尝到', h: '注意 1 种此刻嘴里的味道', ex: '喝一口水，慢慢感受它的味道…' },
];

const lsGet = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
let entries = [];
try { entries = JSON.parse(lsGet(KEY) || '[]').filter(e => e && e.ts); } catch (e) { entries = []; }
const save = () => lsSet(KEY, JSON.stringify(entries));
const dayKey = ts => { const d = new Date(ts); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };
const moodOf = v => MOODS.find(m => m.v === v) || MOODS[2];
const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const hasSample = () => entries.some(e => e.sample);

let form = { mood: 0, intensity: 5, triggers: [], text: '' };
let groundStep = -1;
let currentNoise = null;
let audioCtx = null, noiseNodes = null;
const main = document.getElementById('main');
const themeBtn = document.getElementById('themeBtn');
let toastEl = null, bTimer = null;

function toast(msg) {
  if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; document.body.appendChild(toastEl); }
  toastEl.textContent = msg; toastEl.classList.add('show');
  clearTimeout(toastEl._t); toastEl._t = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

function stats() {
  const n = entries.length;
  const avg = n ? entries.reduce((a, e) => a + e.mood, 0) / n : 0;
  const counts = {}; entries.forEach(e => counts[e.mood] = (counts[e.mood] || 0) + 1);
  const topM = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const tc = triggerCounts(entries);
  const topT = Object.entries(tc).sort((a, b) => b[1] - a[1])[0];
  const days = new Set(entries.map(e => dayKey(e.ts)));
  let streak = 0; const c = new Date();
  while (days.has(dayKey(c.getTime()))) { streak++; c.setDate(c.getDate() - 1); }
  return { n, avg, streak, topM: topM ? +topM[0] : null, topT: topT ? topT[0] : null };
}

function triggerCounts(list) {
  const tc = {};
  list.forEach(e => (e.triggers || []).forEach(t => tc[t] = (tc[t] || 0) + 1));
  list.forEach(e => {
    if (!e.text) return;
    const seen = new Set();
    KEYWORDS.forEach(kw => { if (kw.c !== '情绪词' && e.text.includes(kw.k)) seen.add(kw.c); });
    seen.forEach(c => tc[c] = (tc[c] || 0) + 1);
  });
  return tc;
}

function wordCounts() {
  const counts = {};
  entries.forEach(e => {
    if (!e.text) return;
    KEYWORDS.forEach(kw => {
      const n = e.text.split(kw.k).length - 1;
      if (n > 0) counts[kw.k] = (counts[kw.k] || 0) + n;
    });
  });
  return counts;
}

function loadSampleData() {
  const now = new Date();
  const at = (daysAgo, h, m) => { const d = new Date(now); d.setDate(d.getDate() - daysAgo); d.setHours(h, m, 0, 0); return d.getTime(); };
  const samples = [
    [13, 9, 30, 3, 5, ['学业'], '周一早八，困得睁不开眼，课程难度有点跟不上'],
    [13, 21, 10, 4, 6, ['人际'], '和室友一起吃了火锅，聊得很开心'],
    [12, 14, 0, 2, 7, ['学业'], '论文 deadline 快到了，焦虑得写不下去，反复改开头'],
    [11, 19, 45, 4, 7, [], '傍晚去操场跑了三圈，出了一身汗，心情轻松不少'],
    [10, 11, 20, 2, 8, ['工作'], '实习面试被问懵了，感觉自己准备得不够，有点受挫'],
    [9, 22, 0, 1, 8, ['睡眠'], '失眠，翻来覆去睡不着，越想睡越清醒，明天还要早起'],
    [8, 15, 30, 3, 4, ['工作'], '开会被领导批评了方案，虽然知道要改，还是有点委屈'],
    [7, 20, 0, 5, 8, ['人际'], '高中同学突然联系我，聊了很久，被记挂的感觉真好'],
    [6, 10, 0, 4, 6, ['健康'], '睡了个好觉，起来拉伸了十分钟，身体舒服多了'],
    [5, 16, 40, 2, 7, ['学业', '工作'], '考试和实习撞在一起，压力山大，不知道先顾哪头'],
    [4, 13, 15, 3, 5, [], '普通的一天，图书馆坐了一下午，效率一般'],
    [3, 18, 0, 4, 7, ['财务'], '发了兼职工资，请自己吃了顿好的，小小的满足'],
    [3, 23, 10, 2, 6, ['睡眠'], '又熬夜刷手机了，明天一定要早睡'],
    [2, 9, 50, 3, 6, ['学业'], '早起占座，考试复习进入状态比想象中快'],
    [1, 17, 30, 5, 9, ['人际'], '小组作业终于答辩通过，全组都很兴奋，一起合影'],
    [0, 8, 45, 4, 7, [], '周末自然醒，阳光很好，打算去公园走走'],
  ];
  const base = Date.now();
  samples.forEach((s, i) => {
    entries.push({ id: base + i, ts: at(s[0], s[1], s[2]), mood: s[3], intensity: s[4], triggers: s[5], text: s[6], sample: true });
  });
  entries.sort((a, b) => a.ts - b.ts);
  save();
  lsSet('moodcare.onboarded', '1');
}

function entryHtml(e) {
  const m = moodOf(e.mood), d = new Date(e.ts);
  return `<div class="entry"><div class="e">${m.e}</div><div class="body">
    <div class="meta">${d.getMonth() + 1}月${d.getDate()}日 · ${m.n} · 强度 ${e.intensity}/10${e.sample ? ' · 示例' : ''}</div>
    ${e.triggers.length ? `<div class="mini-chips">${e.triggers.map(t => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
    ${e.text ? `<div class="txt">${esc(e.text)}</div>` : ''}
  </div><button class="del" data-del="${e.id}">✕</button></div>`;
}

function renderDiary() {
  const now = new Date();
  const wd = ['日', '一', '二', '三', '四', '五', '六'];
  const h = now.getHours();
  const greet = h < 6 ? '夜深了' : h < 11 ? '早上好' : h < 14 ? '中午好' : h < 18 ? '下午好' : '晚上好';
  const last = entries[entries.length - 1];
  const s = stats();
  const showOnboard = !lsGet('moodcare.onboarded') && entries.length === 0;
  main.innerHTML = `
  ${showOnboard ? `
  <div class="card onboard">
    <div class="onboard-h">👋 欢迎使用心晴</div>
    <p class="hint">情绪日记与自我关怀 · 三步开始</p>
    <div class="onboard-steps">
      <div><b>1. 记录</b><span>30 秒记下此刻的心情</span></div>
      <div><b>2. 洞察</b><span>看清情绪趋势与触发因素</span></div>
      <div><b>3. 关怀</b><span>呼吸 · 音乐 · 运动处方</span></div>
    </div>
    <button class="primary" data-load-sample>✨ 载入示例数据，先看看效果</button>
    <button class="ghost" data-onboard-skip style="margin-top:10px">直接开始记录</button>
  </div>` : ''}
  <div class="card hero">
    <div class="date">${now.getMonth() + 1}月${now.getDate()}日 · 星期${wd[now.getDay()]}</div>
    <div class="greet">${greet}，今天的你感觉如何？</div>
    <div class="mood-row">${MOODS.map(m => `<button class="mood-btn ${last && last.mood === m.v ? 'on' : ''}" data-mood="${m.v}"><span class="e">${m.e}</span>${m.n}</button>`).join('')}</div>
    <div class="hero-meta">连续记录 <b>${s.streak}</b> 天 · 已写下 <b>${s.n}</b> 条心情</div>
  </div>
  <div class="card">
    <h2>记一笔 ✍️</h2>
    <p class="hint">花 30 秒，把此刻的感受安放下来</p>
    <div class="pick">${MOODS.map(m => `<button class="mood-btn2 ${form.mood === m.v ? 'on' : ''}" data-pick="${m.v}" title="${m.n}">${m.e}</button>`).join('')}</div>
    <div class="field"><label>情绪强度 <b id="intVal">${form.intensity}</b> / 10</label><input id="intensity" type="range" min="1" max="10" value="${form.intensity}"></div>
    <div class="field"><label>可能的触发因素</label><div class="chips">${TRIGGERS.map(t => `<button class="chip ${form.triggers.includes(t) ? 'on' : ''}" data-trigger="${t}">${t}</button>`).join('')}</div></div>
    <div class="field"><label>发生了什么？（可选）</label><textarea id="text" placeholder="比如：今天开组会，方案又被否了，有点沮丧…">${esc(form.text || '')}</textarea></div>
    <button class="primary" id="saveBtn">保存这条心情</button>
  </div>
  ${entries.length ? `<div class="card"><h2>最近记录</h2><p class="hint">${entries.length} 条心情日常</p>${entries.slice(-5).reverse().map(entryHtml).join('')}</div>` : ''}`;
}

function trendChart() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const k = dayKey(d.getTime());
    const vals = entries.filter(e => dayKey(e.ts) === k).map(e => e.mood);
    days.push({ label: i === 0 ? '今天' : `${d.getMonth() + 1}/${d.getDate()}`, v: vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null });
  }
  const W = 640, H = 210, P = 34;
  const xy = (i, v) => [P + i * (W - 2 * P) / 6, H - P - (v - 1) * (H - 2 * P) / 4];
  const grid = [1, 2, 3, 4, 5].map(v => { const y = xy(0, v)[1]; return `<line x1="${P}" y1="${y}" x2="${W - P}" y2="${y}" stroke="#d9deeb" stroke-width="1" stroke-dasharray="4 5"/><text x="${P - 8}" y="${y + 4}" font-size="11" fill="#9aa3b5" text-anchor="end">${v}</text>`; }).join('');
  const pins = days.map((x, i) => { const [px, py] = xy(i, x.v ?? 3); return `<text x="${px}" y="${H - 10}" font-size="11" fill="#9aa3b5" text-anchor="middle">${x.label}</text>` + (x.v != null ? `<circle cx="${px}" cy="${py}" r="5" fill="#6c7cff"/><text x="${px}" y="${py - 10}" font-size="11" fill="#6c7cff" text-anchor="middle">${x.v.toFixed(1)}</text>` : ''); }).join('');
  const pts = days.map((x, i) => ({ ...x, i })).filter(x => x.v != null);
  let line = '', area = '';
  if (pts.length > 1) {
    line = `<polyline points="${pts.map(x => xy(x.i, x.v).join(',')).join(' ')}" fill="none" stroke="#6c7cff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
    area = `<polygon points="${xy(pts[0].i, 1).join(',')} ${pts.map(x => xy(x.i, x.v).join(',')).join(' ')} ${xy(pts[pts.length - 1].i, 1).join(',')}" fill="#6c7cff1c"/>`;
  } else if (pts.length === 1) {
    const [cx, cy] = xy(pts[0].i, pts[0].v);
    line = `<circle cx="${cx}" cy="${cy}" r="12" fill="#6c7cff22"/><circle cx="${cx}" cy="${cy}" r="5" fill="#6c7cff"/>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" class="chart">${grid}${area}${line}${pins}</svg>`;
}

function moodBars() {
  const counts = MOODS.map(m => entries.filter(e => e.mood === m.v).length);
  const max = Math.max(1, ...counts);
  return MOODS.map((m, i) => `<div class="bar-row"><span style="width:62px">${m.e} ${m.n}</span><div class="bar-track"><div class="bar-fill" style="width:${(counts[i] / max * 100).toFixed(1)}%;background:${m.c}"></div></div><span style="width:26px;text-align:right;color:var(--sub)">${counts[i]}</span></div>`).join('');
}

function heatmapHtml() {
  const rangeStart = new Date(); rangeStart.setDate(rangeStart.getDate() - 29); rangeStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(); todayEnd.setHours(23, 59, 59, 999);
  const gridStart = new Date(rangeStart);
  while (gridStart.getDay() !== 0) gridStart.setDate(gridStart.getDate() - 1);
  const gridEnd = new Date();
  while (gridEnd.getDay() !== 6) gridEnd.setDate(gridEnd.getDate() + 1);
  const byDay = {};
  entries.forEach(e => { const k = dayKey(e.ts); (byDay[k] = byDay[k] || []).push(e.mood); });
  const todayK = dayKey(Date.now());
  let cells = '';
  for (let d = new Date(gridStart); d <= gridEnd; d.setDate(d.getDate() + 1)) {
    const k = dayKey(d.getTime());
    if (d < rangeStart || d > todayEnd) { cells += '<div class="hm-cell out"></div>'; continue; }
    const ms = byDay[k];
    if (!ms) { cells += `<div class="hm-cell empty" title="${d.getMonth() + 1}月${d.getDate()}日 · 无记录"></div>`; continue; }
    const avg = ms.reduce((a, b) => a + b, 0) / ms.length;
    const m = moodOf(Math.round(avg));
    cells += `<div class="hm-cell${k === todayK ? ' today' : ''}" style="background:${m.c}" title="${d.getMonth() + 1}月${d.getDate()}日 · ${m.n} · ${ms.length} 条记录"></div>`;
  }
  return `<div class="heatmap">
    <div class="hm-labels"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div>
    <div class="hm-grid">${cells}</div>
  </div>
  <div class="hm-legend"><span>😢 低</span>${MOODS.slice().reverse().map(m => `<i style="background:${m.c}"></i>`).join('')}<span>高 😄</span></div>`;
}

function triggerBars() {
  const tc = triggerCounts(entries);
  const list = Object.entries(tc).sort((a, b) => b[1] - a[1]);
  if (!list.length) return '<p class="hint">记录时打上触发因素标签，或写下日记，这里会出现排行。</p>';
  const max = list[0][1];
  return list.map(([t, c]) => `<div class="bar-row"><span style="width:62px">${esc(t)}</span><div class="bar-track"><div class="bar-fill" style="width:${(c / max * 100).toFixed(1)}%;background:linear-gradient(90deg,#6c7cff,#9b8cff)"></div></div><span style="width:26px;text-align:right;color:var(--sub)">${c}</span></div>`).join('');
}

function wordCloudHtml() {
  const counts = wordCounts();
  const list = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 18);
  if (!list.length) return '<p class="hint">写下更多日记，这里会浮现你的高频词 ☁️</p>';
  const max = list[0][1], min = list[list.length - 1][1];
  const range = max - min;
  const colors = ['#6c7cff', '#a985f5', '#7dd17a', '#fcb040', '#6f8df0', '#9be1c0', '#ff9eb5'];
  return `<div class="cloud">${list.map(([w, c], i) => {
    const size = range === 0 ? 22 : 14 + (c - min) / range * 26;
    return `<span class="cloud-word" style="font-size:${size.toFixed(0)}px;color:${colors[i % colors.length]}" title="出现 ${c} 次">${esc(w)}</span>`;
  }).join('')}</div>`;
}

function weeklyReport() {
  const now = Date.now(), W = 7 * 86400000;
  const thisWeek = entries.filter(e => e.ts >= now - W);
  const prevWeek = entries.filter(e => e.ts >= now - 2 * W && e.ts < now - W);
  const avgOf = arr => arr.length ? arr.reduce((a, e) => a + e.mood, 0) / arr.length : null;
  const a1 = avgOf(thisWeek), a0 = avgOf(prevWeek);
  const delta = a1 != null && a0 != null ? a1 - a0 : null;
  const mc = {}; thisWeek.forEach(e => mc[e.mood] = (mc[e.mood] || 0) + 1);
  const topM = Object.entries(mc).sort((a, b) => b[1] - a[1])[0];
  const topMood = topM ? moodOf(+topM[0]) : null;
  const tc = triggerCounts(thisWeek);
  const topT = Object.entries(tc).sort((a, b) => b[1] - a[1])[0];
  const byDay = {};
  thisWeek.forEach(e => { const k = dayKey(e.ts); (byDay[k] = byDay[k] || []).push(e.mood); });
  let best = null, worst = null;
  Object.entries(byDay).forEach(([k, ms]) => {
    const a = ms.reduce((x, y) => x + y, 0) / ms.length;
    if (!best || a > best.a) best = { k, a };
    if (!worst || a < worst.a) worst = { k, a };
  });
  let story;
  if (!thisWeek.length) story = '本周还没有记录，从今天开始写下第一笔吧。';
  else if (a0 == null) story = `本周平均情绪 ${a1.toFixed(1)}/5，坚持记录一两周，就能看到属于你的变化趋势。`;
  else if (delta > 0.3) story = `比上周回升了 ${delta.toFixed(1)} 分，好状态正在回来，继续做让自己舒服的事。`;
  else if (delta < -0.3) story = `比上周回落了 ${Math.abs(delta).toFixed(1)} 分，这周辛苦了——「关怀」区有为你准备的练习。`;
  else story = `与上周基本持平（${delta >= 0 ? '+' : ''}${delta.toFixed(1)}），情绪平稳也是一种稳定。`;
  return { a1, delta, count: thisWeek.length, topMood, topTrigger: topT ? topT[0] : null, best, worst, story };
}

function renderInsights() {
  const s = stats();
  if (!s.n) {
    main.innerHTML = `<div class="card" style="text-align:center;padding:56px 24px">
      <div style="font-size:46px">📊</div>
      <h2>还没有数据可以分析</h2>
      <p class="hint">先记录一条心情，或载入示例数据看看效果</p>
      <button class="primary" data-goto="diary" style="max-width:220px;margin-bottom:10px">去记录 ✍️</button>
      <button class="ghost" data-load-sample>✨ 载入示例数据</button>
    </div>`;
    return;
  }
  const lines = [];
  lines.push(`你已记录 ${s.n} 条心情，坚持写下感受本身就是一种自我照顾。`);
  if (s.avg < 3) lines.push(`近期平均情绪 ${s.avg.toFixed(1)}/5，整体偏低——试着把大任务拆小，主动安排休息，必要时向信任的人倾诉。`);
  else if (s.avg >= 4) lines.push(`近期平均情绪 ${s.avg.toFixed(1)}/5，状态在线！把这份好心情存进今日的「小确幸」清单吧。`);
  else lines.push(`近期平均情绪 ${s.avg.toFixed(1)}/5，平稳中有起伏，正是生活的常态。`);
  if (s.topT) lines.push(`情绪波动最常和「${s.topT}」相关，下次遇到类似场景前，可以提前安排一次放松练习。`);
  if (s.streak >= 3) lines.push(`已连续记录 ${s.streak} 天，觉察是改变的起点，继续保持 ✨`);
  const wr = weeklyReport();
  const fmtDay = k => { const p = k.split('-'); return `${+p[1]}月${+p[2]}日`; };
  main.innerHTML = `
  ${hasSample() ? `<div class="card banner"><span>✨ 当前包含示例数据，体验后可一键清空</span><button class="ghost" id="clearSample" style="width:auto;padding:8px 14px;font-size:13px">清空示例</button></div>` : ''}
  <div class="grid3">
    <div class="stat"><div class="num">${s.avg.toFixed(1)}</div><div class="lbl">平均情绪 /5</div></div>
    <div class="stat"><div class="num">${s.n}</div><div class="lbl">记录次数</div></div>
    <div class="stat"><div class="num">${s.streak}</div><div class="lbl">连续天数</div></div>
  </div>
  <div class="card">
    <h2>📈 本周情绪周报</h2><p class="hint">近 7 天 vs 上一个 7 天</p>
    <div class="grid3" style="margin-bottom:12px">
      <div class="stat"><div class="num">${wr.a1 != null ? wr.a1.toFixed(1) : '—'}</div><div class="lbl">本周平均 /5</div></div>
      <div class="stat"><div class="num ${wr.delta > 0.05 ? 'up' : wr.delta < -0.05 ? 'down' : ''}">${wr.delta == null ? '—' : (wr.delta > 0 ? '↑' : wr.delta < 0 ? '↓' : '±') + Math.abs(wr.delta).toFixed(1)}</div><div class="lbl">较上周</div></div>
      <div class="stat"><div class="num">${wr.count}</div><div class="lbl">本周记录</div></div>
    </div>
    ${wr.topMood ? `<div class="rrow"><span>出现最多的情绪</span><b>${wr.topMood.e} ${wr.topMood.n}</b></div>` : ''}
    ${wr.topTrigger ? `<div class="rrow"><span>TOP 触发因素</span><b>${esc(wr.topTrigger)}</b></div>` : ''}
    ${wr.best && wr.worst && wr.best.k !== wr.worst.k ? `<div class="rrow"><span>峰值 / 低谷</span><b>${fmtDay(wr.best.k)} ${moodOf(Math.round(wr.best.a)).e} / ${fmtDay(wr.worst.k)} ${moodOf(Math.round(wr.worst.a)).e}</b></div>` : ''}
    <p class="insight">${wr.story}</p>
  </div>
  <div class="card"><h2>🗓️ 近 30 天情绪日历</h2><p class="hint">颜色代表当日平均情绪，悬停查看详情</p>${heatmapHtml()}</div>
  <div class="card"><h2>近 7 天情绪趋势</h2><p class="hint">每天的平均情绪评分（1–5）</p>${trendChart()}</div>
  <div class="card"><h2>情绪分布</h2><p class="hint">每种情绪出现的次数</p>${moodBars()}</div>
  <div class="card"><h2>触发因素 TOP</h2><p class="hint">综合手动标签与日记文本识别</p>${triggerBars()}</div>
  <div class="card"><h2>☁️ 日记高频词</h2><p class="hint">从你的文字里浮现的关键词</p>${wordCloudHtml()}</div>
  <div class="card"><h2>给你的小洞察</h2>${lines.map(l => `<p class="insight">${l}</p>`).join('')}</div>`;
}

function planFor(v) {
  if (v <= 2) return {
    headline: '辛苦了，先好好照顾自己 🌙',
    music: [
      { e: '🎹', t: '舒缓钢琴', d: '平静心绪', k: '舒缓钢琴 轻音乐' },
      { e: '🌧️', t: '白噪音', d: '雨声助眠放松', k: '雨声 白噪音' },
    ],
    sport: [
      { e: '🧘', t: '肩颈拉伸', d: '5 分钟即时放松', k: '肩颈拉伸 跟练' },
      { e: '🚶', t: '出门走走', d: '20 分钟快走', k: '快走 有氧 减脂' },
    ],
  };
  if (v === 3) return {
    headline: '给普通的一天加一点甜 🍬',
    music: [
      { e: '☕', t: '轻松爵士', d: '咖啡馆氛围', k: '咖啡厅 爵士乐 歌单' },
      { e: '🎧', t: '轻电音', d: '提神不吵闹', k: '轻电子 专注 学习' },
    ],
    sport: [
      { e: '🤸', t: '开合跳', d: '3 组 × 30 个', k: '开合跳 跟练' },
      { e: '🚴', t: '骑行', d: '30 分钟兜风', k: '骑行 vlog 放松' },
    ],
  };
  return {
    headline: '状态不错，把好心情延续下去 ✨',
    music: [
      { e: '🎶', t: '元气歌单', d: '让心情起飞', k: '元气满满 歌单' },
      { e: '🌤️', t: '轻快民谣', d: '阳光午后', k: '民谣 轻快 治愈' },
    ],
    sport: [
      { e: '🏃', t: '慢跑', d: '30 分钟有氧', k: '慢跑 新手 跟练' },
      { e: '🧘', t: '流瑜伽', d: '20 分钟拉伸', k: '流瑜伽 初级' },
    ],
  };
}

function groundHtml() {
  if (groundStep < 0) return `<button class="primary" data-ground="start">开始练习</button>`;
  if (groundStep >= GROUND.length) return `
    <div class="ground-done">🌿 你已经回到当下<br><span class="hint" style="font-weight:400">感受一下现在的呼吸和身体</span></div>
    <button class="ghost" data-ground="reset">再来一次</button>`;
  const s = GROUND[groundStep];
  const pct = ((groundStep + 1) / GROUND.length * 100).toFixed(0);
  return `
    <div class="ground-step">
      <div class="ground-num">${s.n}</div>
      <div class="ground-body">
        <div class="ground-label">${s.v}</div>
        <p class="ground-h">${s.h}</p>
        <p class="hint" style="margin:0">${s.ex}</p>
      </div>
    </div>
    <div class="ground-bar"><div style="width:${pct}%"></div></div>
    <button class="primary" data-ground="next">${groundStep + 1 >= GROUND.length ? '完成 ✓' : '完成这一项 →'}</button>`;
}

function noiseBtn(type, emoji, name) {
  return `<button class="noise-btn ${currentNoise === type ? 'on' : ''}" data-noise="${type}"><b>${emoji}</b><span>${name}</span></button>`;
}

function renderCare() {
  const last = entries[entries.length - 1];
  const v = last ? last.mood : 5;
  const m = moodOf(v);
  const plan = planFor(v);
  main.innerHTML = `
  <div class="card hero">
    <div class="date">今日关怀方案</div>
    <div class="greet">${plan.headline}</div>
    <div class="hero-meta">${last ? `依据你最近的「${m.e} ${m.n}」心情为你定制` : '完成一笔记录后，方案会更懂你'}</div>
  </div>
  <div class="card">
    <h2>🌬️ 4-7-8 呼吸冥想</h2>
    <p class="hint">吸气 4 秒 · 屏息 7 秒 · 呼气 8 秒，做 4 轮，安抚焦虑、帮助入眠</p>
    <div class="breath-wrap">
      <div class="breath-ring" id="ring"><span class="ph" id="ph">准备好</span><span class="ct" id="ct" style="font-size:20px">点击开始</span></div>
      <button class="primary" id="bBtn" style="max-width:320px;margin:0 auto">开始练习</button>
    </div>
  </div>
  <div class="card">
    <h2>🌍 5-4-3-2-1 着陆练习</h2>
    <p class="hint">焦虑、思绪飘走时，用五种感官把注意力拉回当下</p>
    ${groundHtml()}
  </div>
  <div class="card">
    <h2>🎧 白噪音</h2>
    <p class="hint">浏览器实时生成，无需联网、无版权负担</p>
    <div class="noise-row">${noiseBtn('rain', '🌧️', '雨声')}${noiseBtn('waves', '🌊', '海浪')}${noiseBtn('wind', '🌬️', '风声')}</div>
  </div>
  <div class="card">
    <h2>🎵 音乐处方</h2><p class="hint">点击跳转网易云试听</p>
    <div class="rec-grid">${plan.music.map(x => `<a class="rec" target="_blank" rel="noopener" href="https://music.163.com/#/search/m/?s=${encodeURIComponent(x.k)}"><span class="e">${x.e}</span><div class="t">${x.t}</div><div class="d">${x.d}</div></a>`).join('')}</div>
  </div>
  <div class="card">
    <h2>🏃 运动处方</h2><p class="hint">低门槛、10–30 分钟见效，点击看 B 站演示</p>
    <div class="rec-grid">${plan.sport.map(x => `<a class="rec" target="_blank" rel="noopener" href="https://search.bilibili.com/all?keyword=${encodeURIComponent(x.k)}"><span class="e">${x.e}</span><div class="t">${x.t}</div><div class="d">${x.d}</div></a>`).join('')}</div>
  </div>
  <div class="card">
    <h2>💌 今日自我关怀小事</h2>
    <div class="tip" id="tip">${TIPS[Math.floor(Math.random() * TIPS.length)]}</div>
    <button class="ghost" id="tipBtn">换一个 🔄</button>
  </div>`;
}

function startBreath() {
  const ring = document.getElementById('ring'), ph = document.getElementById('ph'), ct = document.getElementById('ct'), btn = document.getElementById('bBtn');
  const seq = [['吸气', 4, 'in'], ['屏息', 7, 'hold'], ['呼气', 8, 'out']];
  if (bTimer) {
    clearInterval(bTimer); bTimer = null;
    ring.className = 'breath-ring'; ring.style.animation = 'none';
    ph.textContent = '准备好'; ct.textContent = '点击开始'; ct.style.fontSize = '20px';
    btn.textContent = '开始练习';
    requestAnimationFrame(() => ring.style.animation = '');
    return;
  }
  let ci = 0, si = -1, left = 0, t0 = 0;
  ct.style.fontSize = '26px';
  btn.textContent = '停止练习';
  const nxt = () => {
    si++;
    if (si >= seq.length) {
      si = 0; ci++;
      if (ci > 4) {
        clearInterval(bTimer); bTimer = null;
        ring.className = 'breath-ring';
        ph.textContent = '完成啦'; ct.textContent = '你做得很好 🌟'; ct.style.fontSize = '15px';
        btn.textContent = '再来一轮';
        return;
      }
    }
    const [p, d, k] = seq[si];
    left = d; t0 = Date.now();
    ph.textContent = p; ct.textContent = d;
    ring.className = 'breath-ring ' + k;
    if (k !== 'hold') { ring.style.animation = 'none'; requestAnimationFrame(() => { ring.style.animation = ''; }); }
  };
  bTimer = setInterval(() => {
    const el = (Date.now() - t0) / 1000;
    if (el >= left) nxt();
    else ct.textContent = Math.ceil(left - el);
  }, 100);
  nxt();
}

function stopBreath() { if (bTimer) { clearInterval(bTimer); bTimer = null; } }

function stopNoise() {
  if (!noiseNodes) { currentNoise = null; return; }
  const { src, master, lfo } = noiseNodes;
  try {
    master.gain.cancelScheduledValues(audioCtx.currentTime);
    master.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.25);
    setTimeout(() => { try { src.stop(); if (lfo) lfo.stop(); } catch (e) {} }, 320);
  } catch (e) {}
  noiseNodes = null;
  currentNoise = null;
}

function playNoise(type) {
  stopNoise();
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const ctx = audioCtx;
    const len = ctx.sampleRate * 3;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf; src.loop = true;
    const filter = ctx.createBiquadFilter();
    const mod = ctx.createGain();
    const master = ctx.createGain();
    master.gain.value = 0;
    let lfo = null;
    if (type === 'rain') {
      filter.type = 'lowpass'; filter.frequency.value = 1400; filter.Q.value = 0.5;
      mod.gain.value = 0.16;
    } else if (type === 'waves') {
      filter.type = 'lowpass'; filter.frequency.value = 500;
      mod.gain.value = 0.1;
      lfo = ctx.createOscillator();
      const lg = ctx.createGain();
      lfo.frequency.value = 0.12; lg.gain.value = 0.07;
      lfo.connect(lg); lg.connect(mod.gain); lfo.start();
    } else {
      filter.type = 'bandpass'; filter.frequency.value = 350; filter.Q.value = 0.4;
      mod.gain.value = 0.2;
    }
    src.connect(filter); filter.connect(mod); mod.connect(master); master.connect(ctx.destination);
    src.start();
    master.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.6);
    noiseNodes = { src, master, lfo };
    currentNoise = type;
  } catch (e) {
    currentNoise = null;
    toast('当前浏览器不支持音频播放');
  }
}

main.addEventListener('click', e => {
  const mv = e.target.closest('[data-mood]');
  if (mv) { form.mood = +mv.dataset.mood; renderDiary(); toast(`已选中「${moodOf(form.mood).n}」，补充细节后保存吧`); return; }
  const pk = e.target.closest('[data-pick]');
  if (pk) { form.mood = +pk.dataset.pick; document.querySelectorAll('.pick .mood-btn2').forEach(b => b.classList.toggle('on', +b.dataset.pick === form.mood)); return; }
  const tg = e.target.closest('[data-trigger]');
  if (tg) { const t = tg.dataset.trigger; form.triggers.includes(t) ? form.triggers = form.triggers.filter(x => x !== t) : form.triggers.push(t); tg.classList.toggle('on'); return; }
  if (e.target.id === 'saveBtn') {
    if (!form.mood) { toast('先选一个此刻的心情哦'); return; }
    entries.push({ id: Date.now(), ts: Date.now(), mood: form.mood, intensity: form.intensity, triggers: [...form.triggers], text: (form.text || '').trim() });
    save();
    form = { mood: 0, intensity: 5, triggers: [], text: '' };
    toast('已保存，今晚也要记得回来看看 🌱');
    renderDiary();
    return;
  }
  const del = e.target.closest('[data-del]');
  if (del) { entries = entries.filter(x => x.id !== +del.dataset.del); save(); renderDiary(); toast('已删除这条记录'); return; }
  const lsBtn = e.target.closest('[data-load-sample]');
  if (lsBtn) { loadSampleData(); toast('已载入 16 条示例数据，可随时清空'); route(); return; }
  const skip = e.target.closest('[data-onboard-skip]');
  if (skip) { lsSet('moodcare.onboarded', '1'); renderDiary(); return; }
  if (e.target.id === 'clearSample') { entries = entries.filter(x => !x.sample); save(); toast('示例数据已清空'); route(); return; }
  const gd = e.target.closest('[data-ground]');
  if (gd) {
    const a = gd.dataset.ground;
    if (a === 'start') groundStep = 0;
    else if (a === 'next') groundStep = Math.min(groundStep + 1, GROUND.length);
    else if (a === 'reset') groundStep = -1;
    renderCare();
    return;
  }
  const nb = e.target.closest('[data-noise]');
  if (nb) {
    const t = nb.dataset.noise;
    if (currentNoise === t) stopNoise();
    else playNoise(t);
    document.querySelectorAll('[data-noise]').forEach(b => b.classList.toggle('on', b.dataset.noise === currentNoise));
    return;
  }
  if (e.target.id === 'bBtn') { startBreath(); return; }
  if (e.target.id === 'tipBtn') { document.getElementById('tip').textContent = TIPS[Math.floor(Math.random() * TIPS.length)]; return; }
  const go = e.target.closest('[data-goto]');
  if (go) { location.hash = '/' + go.dataset.goto; return; }
});

main.addEventListener('input', e => {
  if (e.target.id === 'intensity') { form.intensity = +e.target.value; const l = document.getElementById('intVal'); if (l) l.textContent = form.intensity; }
  if (e.target.id === 'text') form.text = e.target.value;
});

document.querySelector('.tabbar').addEventListener('click', e => {
  const t = e.target.closest('.tab');
  if (t) location.hash = '/' + t.dataset.view;
});

function route() {
  const h = location.hash.replace(/^#\//, '');
  const views = { diary: renderDiary, insights: renderInsights, care: renderCare };
  const view = views[h] ? h : 'diary';
  if (view !== 'care') { stopNoise(); stopBreath(); groundStep = -1; }
  views[view]();
  document.querySelectorAll('.tab').forEach(b => b.classList.toggle('on', b.dataset.view === view));
}
window.addEventListener('hashchange', route);

(function initTheme() {
  const cur = lsGet('moodcare.theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const apply = t => { document.documentElement.dataset.theme = t; themeBtn.textContent = t === 'dark' ? '☀️' : '🌙'; };
  apply(cur);
  themeBtn.addEventListener('click', () => {
    const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    lsSet('moodcare.theme', t); apply(t);
  });
})();

route();