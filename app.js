/* 엑셀마스터 — SolunaTex */

const KEY = 'stx-excel';
const DEFAULTS = { done: [], last: null, xl: 'es', size: 1 };

const S = (() => {
  try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(KEY) || '{}')); }
  catch (e) { return Object.assign({}, DEFAULTS); }
})();
function persist() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

const $app = document.getElementById('app');
const $tabs = document.getElementById('tabs');

// 부별 색 (밝은 바탕 + 진한 글씨)
const UNIT_COLORS = ['#B9B7F6', '#F9A48F', '#F5D46A', '#8FD4C6', '#A9CDF5', '#B5CBAD'];

/* ── 텍스트 치환 ── */
function term(k) { return TERMS[k] ? TERMS[k][S.xl] : k; }
function chip(k) {
  const t = TERMS[k];
  if (!t) return k;
  const v = t[S.xl];
  if (t.kind === 'key') return `<span class="keys">${v.split('+').map(x => `<kbd>${x}</kbd>`).join('<span class="plus">+</span>')}</span>`;
  if (t.kind === 'fn') return `<code>${v}</code>`;
  return `<span class="ui">${v}</span>`;
}
function tpl(s) {
  return String(s)
    .replace(/\[\[(\w+)\]\]/g, (m, k) => chip(k))
    .replace(/\{\{(\w+)\}\}/g, (m, k) => term(k));
}
function plain(s) { return tpl(s).replace(/<[^>]+>/g, ''); }

const locale = () => (S.xl === 'es' ? 'es-AR' : 'ko-KR');
function fmtCell(v) {
  if (typeof v === 'number') return v.toLocaleString(locale(), { maximumFractionDigits: 2 });
  const d = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (d) return S.xl === 'es' ? `${d[3]}/${d[2]}/${d[1]}` : v;
  return tpl(v);
}

/* ── 미니 엑셀 화면 ── */
const LETTERS = 'ABCDEFGHIJ';
function sheet(sh) {
  const cols = sh.cols || LETTERS.slice(0, sh.rows[0].length).split('');
  const set = k => new Set(sh[k] || []);
  const hl = set('hl'), ref = set('ref'), warn = set('warn'), sel = set('sel');
  const boldRows = sh.bold || 0;
  let h = '<div class="sheet-wrap">';
  if (sh.bar) h += `<div class="fbar"><span class="fbar-cell">${sh.bar.cell}</span><span class="fx">fx</span><code>${tpl(sh.bar.f)}</code></div>`;
  h += '<div class="sheet-scroll"><table class="sheet"><thead><tr><th></th>';
  cols.forEach(c => { h += `<th>${c}</th>`; });
  h += '</tr></thead><tbody>';
  sh.rows.forEach((row, ri) => {
    const r = ri + 1;
    h += `<tr><th>${r}</th>`;
    row.forEach((v, ci) => {
      const id = cols[ci] + r;
      const cls = [];
      if (typeof v === 'number') cls.push('num');
      if (ri < boldRows) cls.push('b');
      if (sel.has(id)) cls.push('sel');
      if (hl.has(id)) cls.push('hl');
      if (ref.has(id)) cls.push('ref');
      if (warn.has(id)) cls.push('warn');
      h += `<td class="${cls.join(' ')}">${fmtCell(v)}</td>`;
    });
    h += '</tr>';
  });
  h += '</tbody></table></div></div>';
  return h;
}

function chart(data) {
  const max = Math.max(...data.flatMap(d => [d[1], d[2]]));
  let h = '<div class="chart" role="img" aria-label="월별 매출과 지출 막대 차트"><div class="bars">';
  data.forEach(([m, a, b]) => {
    h += `<div class="grp"><div class="pair"><i class="b1" style="height:${(a / max) * 100}%"></i><i class="b2" style="height:${(b / max) * 100}%"></i></div><span>${m}</span></div>`;
  });
  h += '</div><div class="legend"><span><i class="b1"></i>매출</span><span><i class="b2"></i>지출</span></div></div>';
  return h;
}

/* ── 공통 ── */
const lessonById = id => LESSONS.find(l => String(l.id) === String(id));
const numOf = l => LESSONS.indexOf(l) + 1;
const isDone = id => S.done.map(String).includes(String(id));
const nextLesson = () => LESSONS.find(l => !isDone(l.id));
const unitColor = u => UNIT_COLORS[u % UNIT_COLORS.length];
const unitOf = l => UNITS.find(u => u.id === l.unit);
function stepsOf(l) {
  return [...l.steps.map(s => ({ type: 'learn', ...s })), { type: 'practice' }, { type: 'quiz' }];
}
function unitProgress(u) {
  const ls = LESSONS.filter(l => l.unit === u.id);
  return { n: ls.filter(l => isDone(l.id)).length, total: ls.length };
}

function setTabs(name) {
  $tabs.querySelectorAll('a').forEach(a => a.classList.toggle('on', a.dataset.tab === name));
  $tabs.hidden = name === null;
}

/* ── 화면: 홈 ── */
function viewHome() {
  setTabs('home');
  const n = S.done.length, total = LESSONS.length;
  const pct = Math.round((n / total) * 100);
  const nx = nextLesson();
  const resume = S.last && lessonById(S.last.id) && !isDone(S.last.id) ? S.last : null;
  const target = resume ? lessonById(resume.id) : nx;
  const href = resume ? `#/l/${resume.id}/${resume.step}` : nx ? `#/l/${nx.id}/0` : '#/lessons';
  const label = !nx ? '처음부터 다시 보기' : resume ? '이어서 하기' : n === 0 ? '첫 강의 시작' : '다음 강의 시작';

  $app.innerHTML = `
  <header class="top"><h1>홈</h1></header>

  <div class="who">
    <img src="icon-192.png" alt="" width="48" height="48">
    <div><b>엑셀마스터</b><small>50대부터 시작하는 엑셀 · SolunaTex</small></div>
  </div>

  <section class="card today">
    <div class="ring" style="--p:${pct}"><b>${pct}%</b></div>
    <div>
      <p class="label">${n === 0 ? '오늘부터 시작!' : n === total ? '전부 끝냈어!' : '잘하고 있어'}</p>
      ${target ? `<p class="big">${numOf(target)}강 · ${plain(target.title)}</p>` : '<p class="big">엑셀 졸업</p>'}
      <p class="small">${total}강 중 ${n}강 완료</p>
    </div>
  </section>

  <a class="btn primary big" href="${href}">${label}</a>

  <section class="card units">
    <h3>부별 진도</h3>
    ${UNITS.map(u => {
      const p = unitProgress(u);
      return `<a class="urow" href="#/lessons" data-unit="${u.id}">
        <i style="background:${unitColor(u.id)}"></i>
        <span>${u.title}</span>
        <span class="bar"><span style="width:${(p.n / p.total) * 100}%;background:${unitColor(u.id)}"></span></span>
        <small>${p.n}/${p.total}</small></a>`;
    }).join('')}
  </section>

  <p class="note">휴대폰으로 읽고, 컴퓨터 엑셀로 따라 해.<br>중간에 멈춰도 읽던 자리가 남아.</p>`;
  bindUnitJumps();
}

/* ── 화면: 강의 목록 ── */
function viewList() {
  setTabs('list');
  let h = '<header class="top"><h1>강의</h1></header><div class="bento">';
  UNITS.forEach((u, i) => {
    const p = unitProgress(u);
    h += `<button class="tile ${i === 0 ? 'tall' : ''}" style="--c:${unitColor(u.id)}" data-unit="${u.id}">
      <span class="tile-no">${u.id === 0 ? '준비' : u.id + '부'}</span>
      <b>${u.title}</b><small>${p.n}/${p.total}강</small></button>`;
  });
  h += '</div>';

  UNITS.forEach(u => {
    h += `<h3 class="sec" id="unit-${u.id}">${u.title}</h3><ul class="lessons">`;
    LESSONS.filter(l => l.unit === u.id).forEach(l => {
      const d = isDone(l.id);
      const cur = S.last && String(S.last.id) === String(l.id) && !d;
      const prog = d ? 100 : cur ? Math.round((S.last.step / stepsOf(l).length) * 100) : 0;
      h += `<li><a href="#/l/${l.id}/${cur ? S.last.step : 0}" class="${d ? 'done' : ''}">
        <span class="thumb" style="background:${unitColor(u.id)}"><span>${d ? '✓' : numOf(l)}</span></span>
        <span class="t"><small>${numOf(l)}강 · ${l.time}분</small>${tpl(l.title)}
          <span class="pbar"><span style="width:${prog}%"></span></span></span></a></li>`;
    });
    h += '</ul>';
  });
  $app.innerHTML = h;
  bindUnitJumps();
  if (S.jump != null) { scrollToUnit(S.jump); S.jump = null; }
}
function scrollToUnit(id) {
  const el = document.getElementById('unit-' + id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function bindUnitJumps() {
  $app.querySelectorAll('[data-unit]').forEach(el => el.addEventListener('click', e => {
    const id = +el.dataset.unit;
    if (location.hash === '#/lessons') { e.preventDefault(); scrollToUnit(id); }
    else S.jump = id;
  }));
}

/* ── 화면: 강의 ── */
function viewLesson(id, stepIdx) {
  const l = lessonById(id);
  if (!l) return go('#/lessons');
  const steps = stepsOf(l);
  stepIdx = Math.max(0, Math.min(stepIdx, steps.length - 1));
  const st = steps[stepIdx];
  setTabs(null);
  S.last = { id: l.id, step: stepIdx };
  persist();

  let body = '';
  if (st.type === 'learn') {
    body = `${stepIdx === 0 ? `<p class="goal">이번 강의 목표 · ${tpl(l.goal)}</p>` : ''}
      <h2>${tpl(st.title)}</h2>
      <div class="prose">${tpl(st.body)}</div>
      ${st.sheet ? sheet(st.sheet) : ''}
      ${st.chart ? chart(st.chart) : ''}
      ${st.tip ? `<aside class="tip"><b>요령</b>${tpl(st.tip)}</aside>` : ''}`;
  } else if (st.type === 'practice') {
    body = `<h2>이제 컴퓨터로 해 볼까</h2>
      <p class="prose">엑셀을 열고 하나씩 해 봐. 끝낸 건 딸깍해서 체크.</p>
      <ul class="checks">${l.practice.map(p =>
        `<li><label><input type="checkbox"><span>${tpl(p)}</span></label></li>`).join('')}</ul>
      <aside class="tip"><b>막히면</b>「이전」으로 돌아가서 다시 봐도 돼. 천천히 해도 괜찮아.</aside>`;
  } else {
    const q = l.quiz;
    body = `<h2>확인 문제</h2>
      <p class="q">${tpl(q.q)}</p>
      <div class="opts">${q.options.map((o, i) => `<button class="opt" data-i="${i}">${tpl(o)}</button>`).join('')}</div>
      <div class="why" hidden></div>`;
  }

  const last = stepIdx === steps.length - 1;
  $app.innerHTML = `
  <header class="lhead">
    <a class="circle" href="#/lessons" aria-label="강의 목록으로">‹</a>
    <div class="ltitle"><small>${numOf(l)}강 · ${stepIdx + 1}/${steps.length}</small><span>${tpl(l.title)}</span></div>
  </header>
  <div class="lprog"><span style="width:${((stepIdx + 1) / steps.length) * 100}%"></span></div>
  <article class="card step">${body}</article>
  <nav class="lnav">
    ${stepIdx > 0 ? `<a class="btn ghost" href="#/l/${l.id}/${stepIdx - 1}">이전</a>` : '<span></span>'}
    ${last
      ? `<button class="btn primary" id="finish" ${st.type === 'quiz' ? 'disabled' : ''}>강의 완료</button>`
      : `<a class="btn primary" href="#/l/${l.id}/${stepIdx + 1}">${st.type === 'practice' ? '다 했어' : '다음'}</a>`}
  </nav>`;

  const fin = $app.querySelector('#finish');
  if (st.type === 'quiz') {
    const q = l.quiz, why = $app.querySelector('.why');
    $app.querySelectorAll('.opt').forEach(btn => btn.addEventListener('click', () => {
      const ok = +btn.dataset.i === q.answer;
      $app.querySelectorAll('.opt').forEach(b => b.classList.remove('wrong'));
      btn.classList.add(ok ? 'right' : 'wrong');
      why.hidden = false;
      why.className = 'why ' + (ok ? 'ok' : 'no');
      why.innerHTML = ok ? `<b>맞았어!</b> ${tpl(q.why)}` : '<b>아깝다.</b> 다시 한번 골라 봐.';
      if (ok) {
        $app.querySelectorAll('.opt').forEach(b => { b.disabled = true; });
        fin.disabled = false;
      }
    }));
  }
  if (fin) fin.addEventListener('click', () => {
    if (!isDone(l.id)) S.done.push(l.id);
    S.last = null;
    persist();
    go(`#/ok/${l.id}`);
  });
  window.scrollTo(0, 0);
}

/* ── 화면: 완료 ── */
function viewDone(id) {
  setTabs(null);
  const l = lessonById(id);
  const after = LESSONS.slice(LESSONS.indexOf(l) + 1).find(x => !isDone(x.id)) || nextLesson();
  const all = S.done.length === LESSONS.length;
  $app.innerHTML = `
  <section class="done-screen">
    <div class="badge" aria-hidden="true">✓</div>
    <h2>${all ? `${LESSONS.length}강 전부 끝!` : `${numOf(l)}강 끝!`}</h2>
    <p>${all ? '이제 SolunaTex 장부는 친구 손에 있어. 정말 수고 많았어.' : '오늘도 한 걸음. 쉬었다 해도 되고, 바로 가도 돼.'}</p>
    ${after ? `<a class="btn primary big" href="#/l/${after.id}/0">다음: ${numOf(after)}강 ${plain(after.title)}</a>` : ''}
    <a class="btn ghost big" href="#/">홈으로</a>
  </section>`;
}

/* ── 화면: 사전 ── */
function viewDict() {
  setTabs('dict');
  const row = (dt, dd) => `<div><dt>${dt}</dt><dd>${dd}</dd></div>`;
  $app.innerHTML = `
  <header class="top"><h1>사전</h1></header>
  <p class="lead">엑셀 언어: <b>${S.xl === 'es' ? '스페인어' : '한국어'}</b> 기준 · 설정에서 바꿀 수 있어</p>
  <section class="card dict"><h3>단축키</h3><dl>${DICT.keys.map(([k, d]) => row(chip(k), d)).join('')}</dl></section>
  <section class="card dict"><h3>함수</h3><dl>${DICT.fns.map(([k, d, ex]) => row(chip(k), `${d}<code class="ex">${tpl(ex)}</code>`)).join('')}</dl></section>
  <section class="card dict"><h3>엑셀에 쓰는 스페인어</h3><dl>${DICT.es.map(([w, d]) => row(w, d)).join('')}</dl></section>
  <section class="card dict"><h3>말 뜻</h3><dl>${DICT.words.map(([w, d]) => row(w, d)).join('')}</dl></section>`;
}

/* ── 화면: 설정 ── */
function viewSettings() {
  setTabs('set');
  $app.innerHTML = `
  <header class="top"><h1>설정</h1></header>
  <section class="card set">
    <h3>내 엑셀은 어떤 말로 나와?</h3>
    <p class="hint">엑셀 위쪽 메뉴가 <b>Archivo · Inicio</b>면 스페인어, <b>파일 · 홈</b>이면 한국어야. 고르면 강의 속 메뉴 이름, 함수, 단축키가 다 맞춰 바뀌어.</p>
    <div class="seg" role="radiogroup">
      <button role="radio" data-xl="es" aria-checked="${S.xl === 'es'}">스페인어<small>SUMA · Ctrl+G</small></button>
      <button role="radio" data-xl="ko" aria-checked="${S.xl === 'ko'}">한국어<small>SUM · Ctrl+S</small></button>
    </div>
  </section>
  <section class="card set">
    <h3>글자 크기</h3>
    <div class="seg" role="radiogroup">
      ${[[1, '보통'], [1.15, '크게'], [1.3, '아주 크게']].map(([v, t]) =>
        `<button role="radio" data-size="${v}" aria-checked="${S.size === v}" style="font-size:${v}em">${t}</button>`).join('')}
    </div>
  </section>
  <section class="card set">
    <h3>연습 자료 파일</h3>
    <p class="hint">9강부터 쓰는 엑셀 파일이야. 메일로 보내 놨어. 메일에 없으면 <b>컴퓨터</b>에서 이 앱 주소를 열고 아래 버튼을 눌러도 받아져.</p>
    <a class="btn ghost" href="${encodeURI(PRACTICE_FILE)}" download>연습 자료 받기</a>
  </section>
  <section class="card set">
    <h3>휴대폰 홈 화면에 두기</h3>
    <p class="hint"><b>아이폰</b> — 사파리로 열고 아래 공유 단추 → 「홈 화면에 추가」<br>
    <b>안드로이드</b> — 크롬으로 열고 오른쪽 위 ⋮ → 「앱 설치」 또는 「홈 화면에 추가」</p>
  </section>
  <section class="card set">
    <h3>처음부터 다시</h3>
    <p class="hint">완료 표시를 모두 지워. 되돌릴 수 없어.</p>
    <button class="btn danger" id="reset">진도 초기화</button>
  </section>`;

  $app.querySelectorAll('[data-xl]').forEach(b => b.addEventListener('click', () => {
    S.xl = b.dataset.xl; persist(); viewSettings();
  }));
  $app.querySelectorAll('[data-size]').forEach(b => b.addEventListener('click', () => {
    S.size = +b.dataset.size; persist(); applySize(); viewSettings();
  }));
  const reset = $app.querySelector('#reset');
  reset.addEventListener('click', () => {
    if (reset.dataset.armed) { S.done = []; S.last = null; persist(); go('#/'); return; }
    reset.dataset.armed = '1';
    reset.textContent = '정말? 한 번 더 누르면 지워져';
  });
}

/* ── 라우터 ── */
function applySize() { document.documentElement.style.setProperty('--scale', S.size); }
function go(h) { location.hash = h; }
function route() {
  const p = location.hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
  if (p[0] === 'lessons') viewList();
  else if (p[0] === 'l') viewLesson(p[1], +p[2] || 0);
  else if (p[0] === 'ok') viewDone(p[1]);
  else if (p[0] === 'dict') viewDict();
  else if (p[0] === 'set') viewSettings();
  else viewHome();
}

applySize();
window.addEventListener('hashchange', route);
route();

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
