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

let entries = JSON.parse(localStorage.getItem(KEY) || '[]').filter(e => e && e.ts);
const save = () => localStorage.setItem(KEY, JSON.stringify(entries));
const dayKey = ts => { const d = new Date(ts); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };
const moodOf = v => MOODS.find(m => m.v === v) || MOODS[2];
const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

let form = { mood: 0, intensity: 5, triggers: [], text: '' };
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
  const tc = {}; entries.forEach(e => e.triggers.forEach(t => tc[t] = (tc[t] || 0) + 1));
  const topT = Object.entries(tc).sort((a, b) => b[1] - a[1])[0];
  const days = new Set(entries.map(e => dayKey(e.ts)));
  let streak = 0; const c = new Date();
  while (days.has(dayKey(c.getTime()))) { streak++; c.setDate(c.getDate() - 1); }
  return { n, avg, streak, topM: topM ? +topM[0] : null, topT: topT ? topT[0] : null };
}

function entryHtml(e) {
  const m = moodOf(e.mood), d = new Date(e.ts);
  return `<div class="entry"><div class="e">${m.e}</div><div class="body">
    <div class="meta">${d.getMonth() + 1}月${d.getDate()}日 · ${m.n} · 强度 ${e.intensity}/10</div>
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
  main.innerHTML = `
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
  const pts = days.filter(x => x.v != null);
  let line = '', area = '';
  if (pts.length > 1) {
    line = `<polyline points="${pts.map((x, i) => xy(i, x.v).join(',')).join(' ')}" fill="none" stroke="#6c7cff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
    area = `<polygon points="${xy(0, 1).join(',')} ${pts.map((x, i) => xy(i, x.v).join(',')).join(' ')} ${xy(6, 1).join(',')}" fill="#6c7cff1c"/>`;
  } else if (pts.length === 1) {
    line = `<circle cx="${xy(6, pts[0].v)[0]}" cy="${xy(6, pts[0].v)[1]}" r="12" fill="#6c7cff22"/><circle cx="${xy(6, pts[0].v)[0]}" cy="${xy(6, pts[0].v)[1]}" r="5" fill="#6c7cff"/>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" class="chart">${grid}${area}${line}${pins}</svg>`;
}

function moodBars() {
  const counts = MOODS.map(m => entries.filter(e => e.mood === m.v).length);
  const max = Math.max(1, ...counts);
  return MOODS.map((m, i) => `<div class="bar-row"><span style="width:62px">${m.e} ${m.n}</span><div class="bar-track"><div class="bar-fill" style="width:${(counts[i] / max * 100).toFixed(1)}%;background:${m.c}"></div></div><span style="width:26px;text-align:right;color:var(--sub)">${counts[i]}</span></div>`).join('');
}

function triggerBars() {
  const tc = {}; entries.forEach(e => e.triggers.forEach(t => tc[t] = (tc[t] || 0) + 1));
  const list = Object.entries(tc).sort((a, b) => b[1] - a[1]);
  if (!list.length) return '<p class="hint">记录时为心情打上触发因素标签，这里会出现排行。</p>';
  const max = list[0][1];
  return list.map(([t, c]) => `<div class="bar-row"><span style="width:62px">${esc(t)}</span><div class="bar-track"><div class="bar-fill" style="width:${(c / max * 100).toFixed(1)}%;background:linear-gradient(90deg,#6c7cff,#9b8cff)"></div></div><span style="width:26px;text-align:right;color:var(--sub)">${c}</span></div>`).join('');
}

function renderInsights() {
  const s = stats();
  if (!s.n) {
    main.innerHTML = `<div class="card" style="text-align:center;padding:56px 24px">
      <div style="font-size:46px">📊</div>
      <h2>还没有数据可以分析</h2>
      <p class="hint">先记录一条心情，这里会出现趋势、分布与洞察</p>
      <button class="primary" data-goto="diary" style="max-width:220px">去记录 ✍️</button>
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
  main.innerHTML = `
  <div class="grid3">
    <div class="stat"><div class="num">${s.avg.toFixed(1)}</div><div class="lbl">平均情绪 /5</div></div>
    <div class="stat"><div class="num">${s.n}</div><div class="lbl">记录次数</div></div>
    <div class="stat"><div class="num">${s.streak}</div><div class="lbl">连续天数</div></div>
  </div>
  <div class="card"><h2>近 7 天情绪趋势</h2><p class="hint">每天的平均情绪评分（1–5）</p>${trendChart()}</div>
  <div class="card"><h2>情绪分布</h2><p class="hint">每种情绪出现的次数</p>${moodBars()}</div>
  <div class="card"><h2>触发因素 TOP</h2><p class="hint">最常牵动你情绪的因素</p>${triggerBars()}</div>
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
  const view = { diary: renderDiary, insights: renderInsights, care: renderCare }[h] ? h : 'diary';
  ({ diary: renderDiary, insights: renderInsights, care: renderCare })[view]();
  document.querySelectorAll('.tab').forEach(b => b.classList.toggle('on', b.dataset.view === view));
}
window.addEventListener('hashchange', route);

(function initTheme() {
  const cur = localStorage.getItem('moodcare.theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const apply = t => { document.documentElement.dataset.theme = t; themeBtn.textContent = t === 'dark' ? '☀️' : '🌙'; };
  apply(cur);
  themeBtn.addEventListener('click', () => {
    const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('moodcare.theme', t); apply(t);
  });
})();

route();