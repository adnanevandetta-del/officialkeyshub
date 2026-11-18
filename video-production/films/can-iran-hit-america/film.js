// Classic "intelligence dossier" trailer — pure 2D canvas.
const W = 1920, H = 1080;
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const VO_OFF = 3.2;               // narration starts after the silent clipping opener
const LEN = 29.0;
window.TRAILER_LEN = LEN;

const INK = '#2a2119', RED = 'rgba(168,28,22,0.92)', GRAPH = 'rgba(48,42,36,0.85)', PAPER = '#e9dcbf';
const clamp01 = x => Math.max(0, Math.min(1, x));
const eout = x => 1 - Math.pow(1 - clamp01(x), 3);
const ease = x => { x = clamp01(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const fin = (t, s, d = .5) => clamp01((t - s) / d);
const rnd = n => { const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
const lerp = (a, b, f) => a + (b - a) * f;

const P = { tehran: [35.69, 51.39], dc: [38.9, -77.04], udeid: [25.12, 51.31], kermanshah: [34.31, 47.06], telaviv: [32.08, 34.78], greely: [63.97, -145.73], vandenberg: [34.74, -120.57], fordow: [34.88, 50.99], natanz: [33.72, 51.73], isfahan: [32.65, 51.67] };

// ---------- geo ----------
const geo = await (await fetch('assets/countries.geojson')).json();
const RINGS = [];
for (const f of geo.features) {
  const g = f.geometry, polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  for (const poly of polys) RINGS.push({ name: f.properties.ADMIN, ring: poly[0] });
}
function vec(lat, lon) { const a = lat * Math.PI / 180, b = lon * Math.PI / 180; return [Math.cos(a) * Math.cos(b), Math.cos(a) * Math.sin(b), Math.sin(a)]; }
function toLL(v) { return [Math.asin(Math.max(-1, Math.min(1, v[2]))) * 180 / Math.PI, Math.atan2(v[1], v[0]) * 180 / Math.PI]; }
function gc(a, b, n = 120) {
  const A = vec(...a), B = vec(...b), om = Math.acos(A[0] * B[0] + A[1] * B[1] + A[2] * B[2]), out = [];
  for (let i = 0; i <= n; i++) { const f = i / n, s1 = Math.sin((1 - f) * om) / Math.sin(om), s2 = Math.sin(f * om) / Math.sin(om); out.push(toLL([A[0] * s1 + B[0] * s2, A[1] * s1 + B[1] * s2, A[2] * s1 + B[2] * s2])); }
  return out;
}
function gcPartial(a, b, km, n = 60) {
  const A = vec(...a), B = vec(...b), om = Math.acos(A[0] * B[0] + A[1] * B[1] + A[2] * B[2]), fmax = (km / 6371) / om, out = [];
  for (let i = 0; i <= n; i++) { const f = i / n * fmax, s1 = Math.sin((1 - f) * om) / Math.sin(om), s2 = Math.sin(f * om) / Math.sin(om); out.push(toLL([A[0] * s1 + B[0] * s2, A[1] * s1 + B[1] * s2, A[2] * s1 + B[2] * s2])); }
  return out;
}
function smallCircle(c, km, n = 160) {
  const C = vec(...c), a = km / 6371;
  let u = [-C[1], C[0], 0]; const ul = Math.hypot(...u); u = u.map(x => x / ul);
  const w = [C[1] * u[2] - C[2] * u[1], C[2] * u[0] - C[0] * u[2], C[0] * u[1] - C[1] * u[0]];
  const out = [];
  for (let i = 0; i <= n; i++) { const th = i / n * Math.PI * 2.12, wob = 1 + .018 * Math.sin(th * 3 + 1); const aa = a * wob;
    out.push(toLL([0, 1, 2].map(k => C[k] * Math.cos(aa) + (u[k] * Math.cos(th) + w[k] * Math.sin(th)) * Math.sin(aa)))); }
  return out;
}

// ---------- view ----------
let VIEW = { lon: 0, lat: 0, s: 8 }, SHAKE = { x: 0, y: 0 };
const pj = (lat, lon) => ({ x: W / 2 + (lon - VIEW.lon) * VIEW.s * 0.82 + SHAKE.x, y: H / 2 - (lat - VIEW.lat) * VIEW.s + SHAKE.y });

// ---------- textures ----------
function makePaper(w, h, base, seed, fibers = true) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d');
  g.fillStyle = base; g.fillRect(0, 0, w, h);
  const id = g.getImageData(0, 0, w, h), d = id.data;
  for (let i = 0; i < d.length; i += 4) { const n = (rnd(i * .37 + seed) - .5) * 22; d[i] += n; d[i + 1] += n; d[i + 2] += n * .9; }
  g.putImageData(id, 0, 0);
  if (fibers) { g.strokeStyle = 'rgba(90,70,40,0.05)'; g.lineWidth = 1;
    for (let i = 0; i < 1400; i++) { const x = rnd(i + seed) * w, y = rnd(i * 2 + seed) * h, a = rnd(i * 3 + seed) * 6.3, l = 6 + rnd(i * 5) * 24; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + Math.cos(a) * l / 2 + 3, y + Math.sin(a) * l / 2 - 3, x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke(); } }
  for (let i = 0; i < 7; i++) { const x = rnd(i * 11 + seed) * w, y = rnd(i * 13 + seed) * h, r = 60 + rnd(i * 17 + seed) * 260;
    const gr = g.createRadialGradient(x, y, r * .6, x, y, r); gr.addColorStop(0, 'rgba(120,80,30,0.0)'); gr.addColorStop(.85, 'rgba(120,80,30,0.10)'); gr.addColorStop(1, 'rgba(120,80,30,0)'); g.fillStyle = gr; g.fillRect(0, 0, w, h); }
  const vg = g.createRadialGradient(w / 2, h / 2, Math.min(w, h) * .35, w / 2, h / 2, Math.max(w, h) * .75);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(70,40,10,0.35)'); g.fillStyle = vg; g.fillRect(0, 0, w, h);
  return c;
}
const paper = makePaper(2300, 1400, PAPER, 1);
const newsprint = makePaper(1100, 760, '#ece6d6', 7, false);
const card = makePaper(620, 380, '#f3eedf', 3, false);
const graphPaper = (() => { const c = makePaper(1500, 900, '#efe8d4', 5, false), g = c.getContext('2d');
  for (let x = 0; x < 1500; x += 25) { g.strokeStyle = x % 125 ? 'rgba(60,110,150,0.16)' : 'rgba(60,110,150,0.32)'; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 900); g.stroke(); }
  for (let y = 0; y < 900; y += 25) { g.strokeStyle = y % 125 ? 'rgba(60,110,150,0.16)' : 'rgba(60,110,150,0.32)'; g.beginPath(); g.moveTo(0, y); g.lineTo(1500, y); g.stroke(); }
  return c; })();
const telexPaper = makePaper(760, 1400, '#f2ecd9', 9, false);
const folder = makePaper(1600, 1000, '#cfae6f', 4);
const desk = (() => { const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
  g.fillStyle = '#2b1d12'; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 260; i++) { const y = rnd(i) * H; g.strokeStyle = `rgba(${60 + rnd(i * 3) * 40},${38 + rnd(i * 5) * 20},20,0.25)`; g.lineWidth = 1 + rnd(i * 7) * 3; g.beginPath(); g.moveTo(0, y); for (let x = 0; x <= W; x += 80) g.lineTo(x, y + Math.sin(x * .004 + i) * 6); g.stroke(); }
  const vg = g.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1200); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.6)'); g.fillStyle = vg; g.fillRect(0, 0, W, H); return c; })();
const grains = [0, 1, 2, 3].map(k => { const c = document.createElement('canvas'); c.width = 960; c.height = 540; const g = c.getContext('2d'); const id = g.createImageData(960, 540);
  for (let i = 0; i < id.data.length; i += 4) { const v = rnd(i * .13 + k * 977) * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 26; } g.putImageData(id, 0, 0); return c; });

// ---------- drawing helpers ----------
function font(f, size, w = 400, it = false) { ctx.font = `${it ? 'italic ' : ''}${w} ${size}px ${f}`; }
function typed(s, x, y, t, t0, o = {}) {
  const cps = o.cps || 28, n = Math.min(s.length, Math.floor((t - t0) * cps)); if (n <= 0) return;
  ctx.save(); font("'Elite'", o.size || 30); ctx.fillStyle = o.color || INK; ctx.globalAlpha = o.alpha ?? .92; ctx.textBaseline = 'alphabetic';
  let cx = x; if (o.align === 'center') { cx = x - ctx.measureText(s).width / 2; }
  for (let i = 0; i < n; i++) { const ch = s[i]; ctx.globalAlpha = (o.alpha ?? .92) * (.75 + .25 * rnd(i * 7 + (o.seed || 0))); ctx.fillText(ch, cx, y + (rnd(i * 3 + (o.seed || 0)) - .5) * 2.2); cx += ctx.measureText(ch).width; }
  ctx.restore();
}
function hand(s, x, y, t, t0, o = {}) {
  const dur = o.dur || s.length * .055, p = fin(t, t0, dur); if (p <= 0) return;
  ctx.save(); font("'Hand'", o.size || 46, 700); ctx.fillStyle = o.color || RED; ctx.translate(x, y); ctx.rotate(o.rot || -0.03);
  const w = ctx.measureText(s).width, ox = o.align === 'center' ? -w / 2 : 0;
  const sz = o.size || 46; ctx.beginPath(); ctx.rect(ox - 10, -sz * 1.2, (w + 20) * p, sz * 1.7); ctx.clip(); ctx.fillText(s, ox, 0); ctx.restore();
}
function inkPath(pts, p, o = {}) {
  const n = Math.floor((pts.length - 1) * clamp01(p)); if (n < 1) return null;
  const pass = (lw, col, jit) => {
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (o.dash) ctx.setLineDash(o.dash);
    ctx.beginPath();
    for (let i = 0; i <= n; i++) { const q = pts[i], j = jit * (Math.sin(i * .9 + (o.seed || 0)) + .6 * Math.sin(i * 2.3)); i ? ctx.lineTo(q.x + j, q.y - j) : ctx.moveTo(q.x, q.y); }
    ctx.stroke(); ctx.restore();
  };
  pass(o.width || 4.5, o.color || RED, o.jit ?? .8);
  if (!o.dash) pass((o.width || 4.5) * .45, 'rgba(255,230,210,0.18)', .3);
  return pts[n];
}
const llPts = arr => arr.map(([la, lo]) => pj(la, lo));
function pin(lat, lon, t, t0, color = '#b3221b') {
  const a = fin(t, t0, .15); if (a <= 0) return; const q = pj(lat, lon), drop = (1 - eout((t - t0) / .15)) * 40;
  ctx.save(); ctx.globalAlpha = a * .35; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(q.x + 9, q.y + 6, 12, 6, 0, 0, 7); ctx.fill(); ctx.restore();
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = '#555'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(q.x + 4, q.y - 14 - drop); ctx.stroke();
  const g = ctx.createRadialGradient(q.x + 1, q.y - 20 - drop, 2, q.x + 4, q.y - 16 - drop, 12); g.addColorStop(0, '#ff9a8a'); g.addColorStop(.35, color); g.addColorStop(1, '#4a0a06');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(q.x + 4, q.y - 16 - drop, 11, 0, 7); ctx.fill(); ctx.restore();
}
function drawMap(alpha = 1) {
  ctx.save(); ctx.globalAlpha = alpha;
  // graticule
  ctx.strokeStyle = 'rgba(90,68,40,0.22)'; ctx.lineWidth = 1; ctx.setLineDash([3, 6]);
  for (let lon = -180; lon <= 180; lon += 10) { const a = pj(85, lon), b = pj(-85, lon); if (a.x < -50 || a.x > W + 50) continue; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
  for (let lat = -80; lat <= 80; lat += 10) { const a = pj(lat, -180), b = pj(lat, 180); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
  ctx.setLineDash([]);
  // land
  ctx.globalCompositeOperation = 'multiply';
  for (const { name, ring } of RINGS) {
    ctx.beginPath(); ring.forEach(([lo, la], i) => { const q = pj(la, lo); i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y); }); ctx.closePath();
    ctx.fillStyle = name === 'Iran' ? 'rgba(170,70,40,0.32)' : name === 'United States of America' ? 'rgba(70,90,120,0.22)' : 'rgba(150,118,70,0.26)'; ctx.fill();
    ctx.strokeStyle = 'rgba(62,44,26,0.75)'; ctx.lineWidth = name === 'Iran' ? 2.2 : 1; ctx.stroke();
  }
  ctx.restore();
}
function mapLabel(s, lat, lon, size, a = .7) { const q = pj(lat, lon); ctx.save(); font("'Serif'", size, 700, true); ctx.fillStyle = `rgba(62,44,26,${a})`; ctx.textAlign = 'center'; ctx.letterSpacing = '6px'; ctx.fillText(s, q.x, q.y); ctx.restore(); }
function stampAt(text, x, y, rot, t, t0, o = {}) {
  if (t < t0) return; const p = eout((t - t0) / .13), sc = 1 + 1.2 * (1 - p), a = Math.min(1, (t - t0) / .06);
  const size = o.size || 64; font("'Serif'", size, 900); const tw = ctx.measureText(text).width, bw = tw + 60, bh = size + 44;
  const c = document.createElement('canvas'); c.width = bw + 20; c.height = bh + 20; const g = c.getContext('2d');
  g.strokeStyle = g.fillStyle = o.color || 'rgba(176,26,20,1)'; g.lineWidth = 6; g.strokeRect(10, 10, bw, bh); g.lineWidth = 2; g.strokeRect(20, 20, bw - 20, bh - 20);
  g.font = `900 ${size}px 'Serif'`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, 10 + bw / 2, 10 + bh / 2 + 4);
  g.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 900; i++) { g.globalAlpha = .4 + rnd(i * 3 + t0) * .6; g.beginPath(); g.arc(rnd(i + t0) * c.width, rnd(i * 2 + t0) * c.height, rnd(i * 5) * 2.4, 0, 7); g.fill(); }
  ctx.save(); ctx.globalAlpha = a * (o.alpha ?? .85); ctx.globalCompositeOperation = 'multiply'; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.drawImage(c, -c.width / 2, -c.height / 2); ctx.restore();
}
function shadowBox(x, y, w, h, rot, img, blur = 30) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = blur; ctx.shadowOffsetX = 8; ctx.shadowOffsetY = 14;
  ctx.drawImage(img, -w / 2, -h / 2, w, h); ctx.restore();
}
function indexCard(x, y, rot, title, lines, t, t0) {
  const a = fin(t, t0, .35); if (a <= 0) return; const dy = (1 - eout((t - t0) / .35)) * 500;
  ctx.save(); ctx.translate(x, y + dy); ctx.rotate(rot);
  ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 12; ctx.drawImage(card, -310, -190); ctx.shadowColor = 'transparent';
  ctx.strokeStyle = 'rgba(70,110,170,.35)'; ctx.lineWidth = 1.2; for (let ly = -110; ly < 180; ly += 40) { ctx.beginPath(); ctx.moveTo(-300, ly); ctx.lineTo(300, ly); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(190,40,40,.5)'; ctx.beginPath(); ctx.moveTo(-300, -132); ctx.lineTo(300, -132); ctx.stroke();
  // paper clip
  ctx.strokeStyle = '#8d8d8d'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(210, -215); ctx.lineTo(210, -120); ctx.arc(228, -120, 18, Math.PI, 0, true); ctx.lineTo(246, -230); ctx.arc(232, -230, 14, 0, Math.PI, true); ctx.lineTo(218, -150); ctx.stroke();
  ctx.restore();
  ctx.save(); ctx.translate(x, y + dy); ctx.rotate(rot);
  typed(title, -280, -145, t, t0 + .3, { size: 26, cps: 40, seed: 3 });
  lines.forEach((l, i) => typed(l, -280, -82 + i * 40, t, t0 + .6 + i * .5, { size: 26, cps: 36, seed: i * 11 }));
  ctx.restore();
}
function rocket(x, baseY, stages, wpx, color, dash, p) {
  // stages: array of heights bottom->top, then nose
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 3; if (dash) ctx.setLineDash([10, 8]);
  let y = baseY; const total = stages.reduce((a, b) => a + b, 0) + wpx * 1.6, lim = baseY - total * clamp01(p);
  ctx.beginPath(); ctx.rect(x - wpx / 2 - 1000, lim, 3000, baseY - lim + 60); ctx.clip();
  stages.forEach((h, i) => { ctx.strokeRect(x - wpx / 2, y - h, wpx, h); if (i === 0) { ctx.beginPath(); ctx.moveTo(x - wpx / 2, y - 6); ctx.lineTo(x - wpx / 2 - wpx * .45, y + 10); ctx.lineTo(x - wpx / 2, y - h * .35); ctx.moveTo(x + wpx / 2, y - 6); ctx.lineTo(x + wpx / 2 + wpx * .45, y + 10); ctx.lineTo(x + wpx / 2, y - h * .35); ctx.stroke(); } y -= h; });
  ctx.beginPath(); ctx.moveTo(x - wpx / 2, y); ctx.quadraticCurveTo(x - wpx / 2, y - wpx * 1.2, x, y - wpx * 1.6); ctx.quadraticCurveTo(x + wpx / 2, y - wpx * 1.2, x + wpx / 2, y); ctx.stroke();
  ctx.restore();
  return baseY - total;
}

// ---------- captions (narration lines, offset by VO_OFF) ----------
const CAPS = [[0.05, 2.19, 'Ten thousand kilometers.'], [2.19, 6.79, "That's all that stands between Iran... and America."], [6.79, 10.11, 'Today, its missiles stop at two thousand.'], [10.11, 13.0, "But Iran's rockets are getting bigger."], [13.0, 16.22, 'And every launch... is a test.'], [16.22, 19.15, 'So could Iran ever hit America?']].map(c => [c[0] + VO_OFF, c[1] + VO_OFF, c[2]]);
function captions(t) {
  const c = CAPS.find(c => t >= c[0] && t < c[1]); if (!c) return;
  ctx.save(); font("'Elite'", 38); const w = ctx.measureText(c[2]).width;
  ctx.fillStyle = 'rgba(14,10,6,0.78)'; ctx.fillRect(W / 2 - w / 2 - 26, 958, w + 52, 62);
  ctx.fillStyle = '#f1e6c8'; ctx.textAlign = 'center'; ctx.fillText(c[2], W / 2, 1001); ctx.restore();
}

// ---------- shots ----------
const S = [0, 3.2, 5.39, 9.99, 13.31, 16.2, 19.42, 22.35, LEN];
const TD = gc(P.tehran, P.dc), REACH = gcPartial(P.tehran, P.dc, 2000);
const RING = smallCircle(P.tehran, 2000);
const STRIKE = gc(P.kermanshah, P.udeid, 40);

function shotClipping(t) {
  ctx.drawImage(desk, 0, 0);
  const sc = 1 + t * .02; ctx.save(); ctx.translate(W / 2, H / 2); ctx.scale(sc, sc); ctx.translate(-W / 2, -H / 2);
  // torn newsprint
  ctx.save(); ctx.translate(W / 2 - 40, H / 2 + 10); ctx.rotate(-.025); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18;
  ctx.beginPath(); const w = 1100, h = 760; ctx.moveTo(-w / 2, -h / 2);
  for (let x = -w / 2; x <= w / 2; x += 18) ctx.lineTo(x, -h / 2 + rnd(x) * 10);
  for (let y = -h / 2; y <= h / 2; y += 18) ctx.lineTo(w / 2 - rnd(y + 3) * 10, y);
  for (let x = w / 2; x >= -w / 2; x -= 18) ctx.lineTo(x, h / 2 - rnd(x + 9) * 12);
  for (let y = h / 2; y >= -h / 2; y -= 18) ctx.lineTo(-w / 2 + rnd(y + 5) * 10, y);
  ctx.closePath(); ctx.save(); ctx.clip(); ctx.shadowColor = 'transparent'; ctx.drawImage(newsprint, -w / 2, -h / 2); ctx.restore(); ctx.fillStyle = 'rgba(0,0,0,0)'; ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.fillStyle = INK; font("'Elite'", 22); ctx.fillText('ARCHIVE — PRESS CLIPPING', -500, -322); ctx.fillText('SATURDAY, FEB. 28, 2026', 205, -322);
  ctx.fillRect(-500, -306, 1000, 3); ctx.fillRect(-500, -300, 1000, 1);
  font("'Serif'", 78, 900); ctx.fillText('U.S. AND ISRAEL', -500, -210); ctx.fillText('STRIKE IRAN', -500, -126);
  font("'Serif'", 27, 700, true); ctx.fillText('War begins; Tehran answers with missiles across the region', -500, -76);
  // body columns
  ctx.fillStyle = 'rgba(40,32,24,.45)';
  for (let col = 0; col < 2; col++) for (let i = 0; i < 12; i++) { const lw = 300 - (i === 11 ? 120 : rnd(i + col * 31) * 30); ctx.fillRect(-500 + col * 330, -36 + i * 26, lw, 9); }
  // inset map box
  ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.strokeRect(170, -40, 330, 300);
  ctx.restore();
  // inset map (draw real geography inside the box)
  ctx.save(); ctx.translate(W / 2 - 40, H / 2 + 10); ctx.rotate(-.025); ctx.beginPath(); ctx.rect(171, -39, 328, 298); ctx.clip(); ctx.rotate(.025); ctx.translate(-(W / 2 - 40), -(H / 2 + 10));
  VIEW = { lon: 53.2, lat: 33.0, s: 30 }; const sx = SHAKE; SHAKE = { x: 0, y: 0 };
  ctx.save(); ctx.translate(W / 2 - 40 + 335 - W / 2, H / 2 + 10 + 110 - H / 2); drawMap(.9);
  for (const [k, n] of [['tehran', 'TEHRAN'], ['natanz', 'NATANZ'], ['isfahan', 'ISFAHAN']]) { const q = pj(...P[k]); ctx.fillStyle = '#9c1b14'; ctx.beginPath(); ctx.arc(q.x, q.y, 6, 0, 7); ctx.fill(); font("'Elite'", 16); ctx.fillStyle = INK; ctx.fillText(n, q.x + 10, q.y + 5); }
  ctx.restore(); SHAKE = sx; ctx.restore();
  ctx.restore();
  stampAt('ARCHIVE', 1380, 330, -.18, t, 1.25, { size: 56 });
  hand('→ the second war in a year', 1010, 1010, t, 2.0, { size: 48, rot: -.04, dur: 1.0 });
}
function shotWorld(t, lt, view, mode) {
  ctx.drawImage(paper, -190 - view.lon * .6, -160 + view.lat * .4);
  VIEW = view; drawMap();
  mapLabel('ATLANTIC  OCEAN', 30, -40, 34, .5); mapLabel('UNITED STATES', 45.5, -98, 30, .55); mapLabel('IRAN', 33, 54, 26, .7);
  pin(...P.tehran, t, mode === 'A' ? 3.3 : -1); pin(...P.dc, t, mode === 'A' ? 3.55 : -1, '#2a4a8a');
  const tq = pj(...P.tehran), dq = pj(...P.dc);
  if (mode !== 'F') { hand('Tehran', tq.x + 22, tq.y + 52, t, mode === 'A' ? 3.5 : -9, { size: 40, color: GRAPH }); hand('Washington', dq.x - 40, dq.y + 56, t, mode === 'A' ? 3.8 : -9, { size: 40, color: GRAPH }); }
  if (mode === 'A' || mode === 'B') {
    const p = mode === 'A' ? eout((t - 3.5) / 1.7) : 1;
    inkPath(llPts(TD), p, { color: GRAPH, width: 2.5, dash: [14, 10], jit: 0 });
    const mid = pj(...TD[60]);
    ctx.save(); ctx.fillStyle = 'rgba(243,238,223,.9)'; ctx.translate(mid.x, mid.y - 50); ctx.rotate(-.02); ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 10; ctx.fillRect(-150, -40, 300, 64); ctx.restore();
    const km = Math.round(10200 * p / 10) * 10;
    typed(km.toLocaleString('en-US') + ' KM', mid.x, mid.y - 66 + 30, t, mode === 'A' ? 3.5 : -9, { size: 44, align: 'center', cps: 999 });
  }
  if (mode === 'B') {
    const e = inkPath(llPts(REACH), eout((t - 5.8) / 1.2), { width: 6 });
    if (t > 7.0 && e) { const q = pj(...REACH[REACH.length - 1]); const pp = fin(t, 7.0, .3);
      ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(q.x - 22, q.y - 22); ctx.lineTo(q.x - 22 + 44 * pp, q.y - 22 + 44 * pp); if (pp > .5) { ctx.moveTo(q.x + 22, q.y - 22); ctx.lineTo(q.x + 22 - 44 * (pp - .5) * 2, q.y - 22 + 44 * (pp - .5) * 2); } ctx.stroke(); ctx.restore(); }
    { const q = pj(...REACH[REACH.length - 1]); hand('max ≈ 2,000 km', q.x - 40, q.y - 50, t, 7.3, { size: 50, rot: -.06 }); }
    { const q = pj(...TD[70]); hand('8,000 km short', q.x, q.y + 110, t, 8.4, { size: 44, color: GRAPH, rot: .03, align: 'center' }); }
  }
  if (mode === 'F') {
    hand('If Iran is attacked again...', 260, 190, t, 19.55, { size: 62, color: GRAPH, rot: -.03, dur: 1.2 });
    inkPath(llPts(REACH), 1, { width: 6 });
    inkPath(llPts(TD), eout((t - 19.9) / 1.6), { width: 5, dash: [18, 12], jit: .4 });
    if (t > 21.4) hand('?', dq.x + 30, dq.y - 60, t, 21.4, { size: 130, dur: .3, rot: 0 });
    hand('...could it reach America?', 260, 262, t, 20.6, { size: 62, rot: -.03, dur: 1.2 });
    pin(...P.greely, t, 21.0, '#2a4a8a'); pin(...P.vandenberg, t, 21.15, '#2a4a8a');
    { const a = pj(...P.greely), b = pj(...P.vandenberg); typed('INTERCEPTORS', a.x + 26, a.y + 34, t, 21.2, { size: 22, cps: 40 }); typed('INTERCEPTORS', b.x + 26, b.y + 34, t, 21.35, { size: 22, cps: 40 }); }
  }
}
function shotRegion(t) {
  const f = (t - S[3]) / (S[4] - S[3]);
  VIEW = { lon: 47.5 + f * 1.5, lat: 31, s: lerp(21, 23.5, ease(f)) };
  ctx.drawImage(paper, -260 - f * 60, -150);
  drawMap();
  mapLabel('IRAN', 32.5, 55, 40, .65); mapLabel('SAUDI  ARABIA', 22.0, 44, 30, .5); mapLabel('IRAQ', 33, 43.5, 26, .5); mapLabel('PERSIAN GULF', 27.1, 51.5, 20, .5);
  pin(...P.tehran, t, -1);
  inkPath(llPts(RING), eout((t - 10.2) / 1.4), { width: 5, jit: 1.2 });
  hand('2,000 km', pj(...RING[18]).x + 10, pj(...RING[18]).y - 18, t, 11.4, { size: 52, rot: -.15 });
  pin(...P.udeid, t, 11.0, '#2a4a8a'); pin(...P.telaviv, t, 11.2, '#2a4a8a');
  { const q = pj(...P.udeid); typed('AL UDEID (US)', q.x + 24, q.y + 40, t, 11.1, { size: 22, cps: 40 }); }
  { const q = pj(...P.telaviv); typed('ISRAEL', q.x - 110, q.y + 40, t, 11.3, { size: 22, cps: 40 }); }
  inkPath(llPts(STRIKE), eout((t - 11.7) / .7), { width: 4.5, jit: .5 });
  { const q = pj(...STRIKE[20]); hand('June 23, 2025', q.x - 230, q.y + 20, t, 12.2, { size: 40, rot: -.05, dur: .7 }); }
  indexCard(1540, 300, .04, 'FILE: IRAN / BALLISTIC', ['SEJJIL ........ ~2,000 KM', 'KHORRAMSHAHR .. ~2,000 KM', 'US TERRITORY .. OUT OF RANGE'], t, 10.3);
}
function shotBlueprint(t) {
  ctx.drawImage(desk, 0, 0);
  ctx.save(); const f = (t - S[4]) / (S[5] - S[4]), sc = 1.02 + f * .04; ctx.translate(W / 2, H / 2); ctx.scale(sc, sc); ctx.rotate(.012);
  ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 16; ctx.drawImage(graphPaper, -750, -450); ctx.shadowColor = 'transparent'; ctx.translate(-W / 2, -H / 2);
  typed('SPACE LAUNCH VEHICLES — COMPARATIVE SKETCH', 260, 160, t, 13.4, { size: 28, cps: 50 });
  typed('NOT TO SCALE / OPEN-SOURCE ESTIMATES', 260, 196, t, 13.6, { size: 20, cps: 60, alpha: .7 });
  const base = 780;
  ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(240, base + 12); ctx.lineTo(1680, base + 12); ctx.stroke(); ctx.restore();
  const t1 = rocket(560, base, [230, 150], 64, INK, false, eout((t - 13.4) / .8));
  hand('Simorgh', 560, base + 70, t, 13.9, { size: 46, color: GRAPH, align: 'center' });
  const t2 = rocket(900, base, [190, 150, 120], 60, INK, false, eout((t - 14.1) / .8));
  hand('Qaem-100', 900, base + 70, t, 14.6, { size: 46, color: GRAPH, align: 'center' });
  const t3 = rocket(1340, base, [210, 160, 110], 74, RED, true, eout((t - 14.9) / 1.0));
  hand('ICBM ?', 1340, base + 70, t, 15.5, { size: 58, align: 'center' });
  hand('bigger every year →', 1110, 165, t, 15.2, { size: 50, rot: -.04, align: 'center' });
  // growth arrow
  if (false) { ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 4; ctx.lineCap = 'round'; const p = eout((t - 15.3) / .5); ctx.beginPath(); ctx.moveTo(640, t1 - 30); ctx.quadraticCurveTo(980, t3 + 60, 640 + (1250 - 640) * p, t1 - 30 + ((t3 - 40) - (t1 - 30)) * p); ctx.stroke(); ctx.restore(); }
  ctx.restore();
}
function shotTelex(t) {
  ctx.drawImage(desk, 0, 0);
  const lt = t - S[5], feed = Math.min(lt, 2.4) * 60;
  ctx.save(); ctx.translate(W / 2 - 160, -feed); ctx.rotate(-.01); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 14; ctx.drawImage(telexPaper, -380, 60); ctx.shadowColor = 'transparent';
  ctx.strokeStyle = 'rgba(80,60,40,.3)'; ctx.setLineDash([2, 10]); ctx.beginPath(); ctx.moveTo(-340, 60); ctx.lineTo(-340, 1460); ctx.moveTo(340, 60); ctx.lineTo(340, 1460); ctx.stroke(); ctx.setLineDash([]);
  ctx.translate(-W / 2, 0);
  const L = ['=== PRIORITY // LAUNCH WARNING ===', 'DTG ........ 0412Z', 'SITE ....... SEMNAN, IRAN', 'VEHICLE .... MULTI-STAGE', 'TRAJECTORY . ORBITAL / BALLISTIC?', 'STATUS ..... TRACKING', '', 'ANALYST NOTE: EACH SPACE LAUNCH', 'TESTS ICBM-RELEVANT STAGING.'];
  L.forEach((l, i) => typed(l, W / 2 - 330, 220 + i * 52, t, 16.3 + i * .28, { size: 28, cps: 70, seed: i * 5 }));
  ctx.restore();
  stampAt('MONITORED', W / 2 - 120, 700, -.12, t, 18.35, { size: 66 });
}
function shotFolder(t) {
  ctx.drawImage(desk, 0, 0);
  const lt = t - S[7], f = lt / (LEN - S[7]);
  ctx.save(); ctx.translate(W / 2, H / 2 + 20); ctx.scale(1 + f * .05, 1 + f * .05); ctx.rotate(-.015);
  ctx.shadowColor = 'rgba(0,0,0,.65)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 20;
  ctx.fillStyle = '#c4a262'; ctx.beginPath(); ctx.moveTo(-800, -440); ctx.lineTo(-420, -440); ctx.lineTo(-380, -500); ctx.lineTo(-60, -500); ctx.lineTo(-20, -440); ctx.lineTo(800, -440); ctx.lineTo(800, 480); ctx.lineTo(-800, 480); ctx.closePath(); ctx.fill();
  ctx.shadowColor = 'transparent'; ctx.drawImage(folder, -800, -440, 1600, 920);
  // label sticker
  ctx.fillStyle = '#f2ecda'; ctx.fillRect(-640, -380, 620, 120); ctx.strokeStyle = 'rgba(60,40,20,.5)'; ctx.strokeRect(-640, -380, 620, 120);
  ctx.translate(-W / 2, -H / 2);
  typed('FILE No. 07', W / 2 - 610, H / 2 - 330, t, 22.5, { size: 30, cps: 40 });
  typed('SUBJECT: IRAN — BALLISTIC RANGE', W / 2 - 610, H / 2 - 285, t, 22.8, { size: 26, cps: 50 });
  const ta = fin(t, 23.2, .25);
  ctx.save(); ctx.globalAlpha = ta; ctx.fillStyle = INK; font("'Serif'", 128, 900); ctx.textAlign = 'center'; ctx.fillText('CAN IRAN HIT', W / 2, H / 2 + 20); ctx.fillStyle = '#8f1a13'; ctx.fillText('AMERICA?', W / 2, H / 2 + 160); ctx.restore();
  typed('— IF IT IS EVER ATTACKED AGAIN —', W / 2, H / 2 + 250, t, 24.0, { size: 38, cps: 30, align: 'center' });
  ctx.restore();
  stampAt('FULL REPORT SOON', W / 2 + 470, H / 2 - 300, .14, t, 25.6, { size: 58 });
}


// =====================================================================
// FULL FILM — Part 1: Cold open + Chapter 1 (draft timing from script)
// =====================================================================
const BASES = { udeid: [25.12, 51.31, 'AL UDEID · QATAR', -150, 78], bahrain: [26.21, 50.61, 'NSA BAHRAIN', -190, -10], dhafra: [24.25, 54.55, 'AL DHAFRA · UAE', 26, 40], asad: [33.79, 42.44, 'AL ASAD · IRAQ', -210, 40], kuwait: [29.35, 47.52, 'ALI AL SALEM · KUWAIT', -300, 8] };
const TD2 = gc(P.tehran, P.dc), REACH2 = gcPartial(P.tehran, P.dc, 2000), RING2 = smallCircle(P.tehran, 2000);

// ---- generic dossier pieces ----
function deskWith(t, fn, push = .02) { ctx.drawImage(desk, 0, 0); ctx.save(); const s = 1 + t * push; ctx.translate(W / 2, H / 2); ctx.scale(s, s); ctx.translate(-W / 2, -H / 2); fn(); ctx.restore(); }
function tape(x, y, rot, w = 130) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = 'rgba(235,225,190,0.72)'; ctx.fillRect(-w / 2, -18, w, 36); ctx.strokeStyle = 'rgba(160,140,100,.35)'; ctx.setLineDash([3, 3]); ctx.strokeRect(-w / 2, -18, w, 36); ctx.restore(); }
function telexSheet(t, t0, lines, stamp, stampAt_) {
  const lt = t - t0, feed = Math.min(lt, 2.4) * 50;
  ctx.drawImage(desk, 0, 0);
  ctx.save(); ctx.translate(W / 2 - 160, -feed); ctx.rotate(-.01); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 14; ctx.drawImage(telexPaper, -380, 60); ctx.shadowColor = 'transparent';
  ctx.strokeStyle = 'rgba(80,60,40,.3)'; ctx.setLineDash([2, 10]); ctx.beginPath(); ctx.moveTo(-340, 60); ctx.lineTo(-340, 1460); ctx.moveTo(340, 60); ctx.lineTo(340, 1460); ctx.stroke(); ctx.setLineDash([]);
  ctx.translate(-W / 2, 0);
  lines.forEach((l, i) => typed(l, W / 2 - 330, 220 + i * 52, t, t0 + .3 + i * .32, { size: 28, cps: 60, seed: i * 5 }));
  ctx.restore();
  if (stamp) stampAt(stamp, W / 2 - 140, 760, -.12, t, stampAt_, { size: 64 });
}
function chapterCard(t, t0, num, title) {
  ctx.drawImage(desk, 0, 0);
  const a = fin(t, t0, .3);
  ctx.save(); ctx.globalAlpha = a; ctx.translate(W / 2, H / 2); ctx.rotate(-.01); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 16;
  ctx.drawImage(card, -620, -300, 1240, 600); ctx.shadowColor = 'transparent';
  ctx.strokeStyle = 'rgba(70,110,170,.3)'; for (let y = -180; y < 280; y += 60) { ctx.beginPath(); ctx.moveTo(-600, y); ctx.lineTo(600, y); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(190,40,40,.45)'; ctx.beginPath(); ctx.moveTo(-600, -210); ctx.lineTo(600, -210); ctx.stroke();
  ctx.restore();
  typed('CHAPTER ' + num, W / 2, H / 2 - 120, t, t0 + .2, { size: 44, cps: 30, align: 'center' });
  ctx.save(); ctx.globalAlpha = fin(t, t0 + .6, .3); font("'Serif'", 110, 900); const tw0 = ctx.measureText(title).width, fs0 = Math.min(110, 110 * 1080 / tw0); font("'Serif'", fs0, 900); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.fillText(title, W / 2, H / 2 + 60); ctx.restore();
  ctx.save(); ctx.globalAlpha = fin(t, t0 + 1.0, .4); ctx.fillStyle = '#8f1a13'; ctx.fillRect(W / 2 - 200, H / 2 + 100, 400 * eout((t - t0 - 1) / .6), 5); ctx.restore();
}
// Host placeholders — your recording drops into these slots later
let TIMING = null; try { const r = await fetch('timing.json', { cache: 'no-store' }); if (r.ok) TIMING = await r.json(); } catch (e) {}
const NARRATED = !!TIMING; let CUR_T = 0, QUOTE_ACTIVE = false;
function quoteCard(x, y, w, h, rot) {
  QUOTE_ACTIVE = true;
  const c = (typeof CAPS_FILM !== 'undefined') ? CAPS_FILM.find(c => CUR_T >= c[0] && CUR_T < c[1]) : null;
  ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.rotate(rot);
  ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 36; ctx.shadowOffsetY = 14; ctx.drawImage(card, -w / 2, -h / 2, w, h); ctx.shadowColor = 'transparent';
  ctx.strokeStyle = 'rgba(70,110,170,.25)'; ctx.lineWidth = 1.2; for (let ly = -h / 2 + 120; ly < h / 2 - 20; ly += 64) { ctx.beginPath(); ctx.moveTo(-w / 2 + 20, ly); ctx.lineTo(w / 2 - 20, ly); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(190,40,40,.45)'; ctx.beginPath(); ctx.moveTo(-w / 2 + 20, -h / 2 + 90); ctx.lineTo(w / 2 - 20, -h / 2 + 90); ctx.stroke();
  font("'Elite'", 26); ctx.fillStyle = 'rgba(42,33,25,.75)'; ctx.fillText('ANALYST NOTE', -w / 2 + 50, -h / 2 + 66);
  if (c) {
    const fs = w > 900 ? 64 : 40; font("'Serif'", fs, 700, true); ctx.fillStyle = INK; ctx.textAlign = 'center';
    const words = ('“' + c[2] + '”').split(' '), lines = []; let line = '';
    for (const wd of words) { const tl = line ? line + ' ' + wd : wd; if (ctx.measureText(tl).width > w - 140) { lines.push(line); line = wd; } else line = tl; } lines.push(line);
    const p = clamp01((CUR_T - c[0]) / Math.max(.6, (c[1] - c[0]) * .5)), nChars = Math.floor(p * lines.join(' ').length); let used = 0;
    const y0 = -((lines.length - 1) * fs * 1.25) / 2 + 30;
    lines.forEach((l, i) => { const show = l.slice(0, Math.max(0, nChars - used)); used += l.length + 1; ctx.fillText(show, 0, y0 + i * fs * 1.25); });
  }
  ctx.restore();
  tape(x + 40, y - 6, -.5); tape(x + w - 40, y - 6, .5);
}
function hostSlotRect(x, y, w, h, rot, label, sub) {
  if (NARRATED) { quoteCard(x, y, w, h + (sub ? 70 : 0), rot); return; }
  ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.rotate(rot);
  ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 36; ctx.shadowOffsetY = 14; ctx.fillStyle = '#f1ead6'; ctx.fillRect(-w / 2 - 22, -h / 2 - 22, w + 44, h + 44 + (sub ? 70 : 0)); ctx.shadowColor = 'transparent';
  ctx.fillStyle = '#2e2924'; ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.strokeStyle = 'rgba(241,234,214,.35)'; ctx.setLineDash([10, 10]); ctx.lineWidth = 2; const s = h / 600;
  ctx.beginPath(); ctx.arc(0, -h * .1, 90 * s, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-230 * s, h / 2); ctx.quadraticCurveTo(-210 * s, h * .12, 0, h * .1); ctx.quadraticCurveTo(210 * s, h * .12, 230 * s, h / 2); ctx.stroke(); ctx.setLineDash([]);
  font("'Elite'", Math.max(18, 34 * s)); ctx.fillStyle = 'rgba(241,234,214,.85)'; ctx.textAlign = 'center'; ctx.fillText(label, 0, -h / 2 + 60 * s + 10);
  font("'Elite'", Math.max(14, 22 * s)); ctx.fillStyle = 'rgba(241,234,214,.6)'; ctx.fillText('YOUR RECORDING GOES HERE', 0, -h / 2 + 100 * s + 14);
  if (sub) { font("'Hand'", 44, 700); ctx.fillStyle = GRAPH; ctx.fillText(sub, 0, h / 2 + 64); }
  ctx.restore();
  tape(x + 40, y - 6, -.5); tape(x + w - 40, y - 6, .5);
}
function hostFull(t, t0, note) {
  ctx.drawImage(desk, 0, 0);
  hostSlotRect(360, 96, 1200, 675, -.006, 'HOST — FULL FRAME', note || 'you, on camera');
}
function hostCorner() { if (NARRATED) return; hostSlotRect(1440, 640, 400, 225, .02, 'HOST — CORNER CAM', null); }

// ---- missile index card ----
function missileCard(x, y, rot, t, t0, name, range, note, len) {
  const a = fin(t, t0, .35); if (a <= 0) return; const dy = (1 - eout((t - t0) / .35)) * 600;
  ctx.save(); ctx.translate(x, y + dy); ctx.rotate(rot); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 12; ctx.drawImage(card, -200, -150, 400, 300); ctx.shadowColor = 'transparent';
  ctx.strokeStyle = 'rgba(70,110,170,.3)'; for (let ly = -70; ly < 140; ly += 34) { ctx.beginPath(); ctx.moveTo(-190, ly); ctx.lineTo(190, ly); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(190,40,40,.45)'; ctx.beginPath(); ctx.moveTo(-190, -96); ctx.lineTo(190, -96); ctx.stroke();
  // silhouette
  const L = len, mx = -L / 2, my = 10; ctx.strokeStyle = INK; ctx.lineWidth = 2.2; const pr = eout((t - t0 - .3) / .6);
  ctx.save(); ctx.beginPath(); ctx.rect(-200, -150, 400 * pr, 300); ctx.clip();
  ctx.beginPath(); ctx.moveTo(mx, my - 9); ctx.lineTo(mx + L - 40, my - 9); ctx.quadraticCurveTo(mx + L, my, mx + L - 40, my + 9); ctx.lineTo(mx, my + 9); ctx.closePath(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(mx + 6, my - 9); ctx.lineTo(mx - 10, my - 26); ctx.lineTo(mx + 26, my - 9); ctx.moveTo(mx + 6, my + 9); ctx.lineTo(mx - 10, my + 26); ctx.lineTo(mx + 26, my + 9); ctx.stroke();
  ctx.restore(); ctx.restore();
  ctx.save(); ctx.translate(x, y + dy); ctx.rotate(rot);
  typed(name, -180, -108, t, t0 + .3, { size: 30, cps: 30 });
  typed(range, -180, 90, t, t0 + .7, { size: 32, cps: 30, color: '#8f1a13' });
  typed(note, -180, 128, t, t0 + 1.0, { size: 20, cps: 50, alpha: .75 });
  ctx.restore();
}

// ---- shot table: [duration, renderer(tLocal, tGlobal, t0), captionLines] ----
const SHOTS = [];
const add = (d, fn, caps = []) => SHOTS.push({ d, fn, caps });

// COLD OPEN
add(7, (lt, t, t0) => { clipping(t, t0); }, ['February 2026. The United States and Israel went to war with Iran.']);
add(6.5, (lt, t, t0) => telexSheet(t, t0, ['=== FLASH // MARCH 2026 ===', 'ORIGIN ..... IRAN (DENIED BY TEHRAN)', 'EVENT ...... 2 BALLISTIC MISSILES', 'TARGET ..... DIEGO GARCIA, INDIAN OCEAN', 'DISTANCE ... ≈ 4,000 KM (UK GOVERNMENT)', 'RESULT ..... 1 FAILED · 1 INTERCEPTED'], 'DISPUTED', t0 + 4.2), ['In March, Britain said two missiles flew toward Diego Garcia,', 'a US and UK base about four thousand kilometers away.', 'Iran denied firing them.']);
add(8, (lt, t, t0) => worldReach(t, t0, lt), ['For years, Iran said its missiles stop at two thousand kilometers.', 'This month, it said that limit is gone.', 'America is still ten thousand away.']);
add(13, (lt, t, t0) => hostFull(t, t0, 'you: the big question'), ['So here\'s the question everyone is asking now:', 'with the line gone, could Iran actually build a missile that reaches America?', 'And how long would it take?']);
add(5, (lt, t, t0) => fileOpen(t, t0), []);
// CHAPTER 1
add(3, (lt, t, t0) => chapterCard(t, t0, 'ONE', 'THE ARSENAL'), []);
add(5, (lt, t, t0) => hostFull(t, t0, 'you: chapter intro'), ['To answer that, we first need to know what Iran has right now.']);
add(16, (lt, t, t0) => arsenalCards(t, t0), ['Even after months of war, Iran still has one of the largest missile arsenals in the Middle East.', 'But look at the ranges.', 'They all top out around the same number: two thousand kilometers.']);
add(12, (lt, t, t0) => capMemo(t, t0), ['That was no accident.', 'For years, Iran\'s commanders said the Supreme Leader had capped their missiles at 2,000 km.', 'Then, on November 7th, the Revolutionary Guard said: that restriction has been lifted.']);
add(14, (lt, t, t0) => regionBases(t, t0, lt, false), ['And inside that circle sits Israel, every Gulf state,', 'and tens of thousands of American troops.']);
add(9, (lt, t, t0) => { regionBases(t, t0 - 14, lt + 14, true); hostCorner(); }, ['So when people ask "can Iran hit America?", the honest first answer is:', 'it already can, just not the American mainland.']);

// ---- shot renderers ----
function clipping(t, t0) {
  const lt = t - t0;
  shotClippingBase(lt);
}
function shotClippingBase(lt) { // reuse trailer clipping with its own local clock
  shotClipping(lt * .9 + 0.0);
}
function worldReach(t, t0, lt) {
  const f = ease(lt / 8);
  ctx.drawImage(paper, -190, -160);
  VIEW = { lon: lerp(-8, 4, f), lat: 44, s: lerp(8.6, 10, f) }; drawMap();
  mapLabel('ATLANTIC  OCEAN', 30, -40, 34, .5); mapLabel('UNITED STATES', 45.5, -98, 30, .55); mapLabel('IRAN', 33, 54, 26, .7);
  pin(...P.tehran, t, t0 + .2); pin(...P.dc, t, t0 + .4, '#2a4a8a');
  const tq = pj(...P.tehran), dq = pj(...P.dc);
  hand('Tehran', tq.x + 22, tq.y + 52, t, t0 + .4, { size: 40, color: GRAPH }); hand('Washington', dq.x - 40, dq.y + 56, t, t0 + .6, { size: 40, color: GRAPH });
  inkPath(llPts(TD2), eout((lt - .5) / 1.6), { color: GRAPH, width: 2.5, dash: [14, 10], jit: 0 });
  inkPath(llPts(REACH2), eout((lt - 1.4) / 1.2), { width: 6 });
  if (lt > 2.6) { const q = pj(...REACH2[REACH2.length - 1]), pp = fin(lt, 2.6, .3); ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(q.x - 22, q.y - 22); ctx.lineTo(q.x - 22 + 44 * pp, q.y - 22 + 44 * pp); if (pp > .5) { ctx.moveTo(q.x + 22, q.y - 22); ctx.lineTo(q.x + 22 - 44 * (pp - .5) * 2, q.y - 22 + 44 * (pp - .5) * 2); } ctx.stroke(); ctx.restore(); }
  { const q = pj(...REACH2[REACH2.length - 1]); hand('max ≈ 2,000 km', q.x - 40, q.y - 50, t, t0 + 2.9, { size: 50, rot: -.06 });
    if (lt > 4.2) { const p = eout((lt - 4.2) / .5); ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(q.x - 50, q.y - 52); ctx.lineTo(q.x - 50 + 330 * p, q.y - 74 - 6 * p); ctx.stroke(); ctx.restore(); }
    } stampAt('LIMIT LIFTED · NOV 2026', 820, 790, -.06, t, t0 + 4.8, { size: 50 });
  { const mid = pj(...TD2[60]); typed('≈ 10,200 KM', mid.x, mid.y - 40, t, t0 + 4.4, { size: 44, align: 'center', cps: 20 }); }
}
function fileOpen(t, t0, noStamp) {
  const lt = t - t0;
  ctx.drawImage(desk, 0, 0);
  ctx.save(); ctx.translate(W / 2, H / 2 + 20); ctx.rotate(-.015);
  ctx.shadowColor = 'rgba(0,0,0,.65)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 20;
  ctx.fillStyle = '#c4a262'; ctx.beginPath(); ctx.moveTo(-800, -440); ctx.lineTo(-420, -440); ctx.lineTo(-380, -500); ctx.lineTo(-60, -500); ctx.lineTo(-20, -440); ctx.lineTo(800, -440); ctx.lineTo(800, 480); ctx.lineTo(-800, 480); ctx.closePath(); ctx.fill();
  ctx.shadowColor = 'transparent'; ctx.drawImage(folder, -800, -440, 1600, 920);
  ctx.fillStyle = '#f2ecda'; ctx.fillRect(-640, -380, 620, 120); ctx.strokeStyle = 'rgba(60,40,20,.5)'; ctx.strokeRect(-640, -380, 620, 120);
  ctx.translate(-W / 2, -H / 2);
  typed('FILE No. 07', W / 2 - 610, H / 2 - 330, t, t0 + .2, { size: 30, cps: 40 });
  typed('SUBJECT: IRAN — BALLISTIC RANGE', W / 2 - 610, H / 2 - 285, t, t0 + .5, { size: 26, cps: 50 });
  ctx.save(); ctx.globalAlpha = fin(t, t0 + .8, .25); ctx.fillStyle = INK; font("'Serif'", 128, 900); ctx.textAlign = 'center'; ctx.fillText('CAN IRAN HIT', W / 2, H / 2 + 20); ctx.fillStyle = '#8f1a13'; ctx.fillText('AMERICA?', W / 2, H / 2 + 160); ctx.restore();
  ctx.restore();
  if (!noStamp) stampAt('FILE OPEN', W / 2 + 470, H / 2 - 300, .14, t, t0 + 2.4, { size: 62 });
}
function arsenalCards(t, t0) {
  ctx.drawImage(desk, 0, 0);
  ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(.008); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.drawImage(paper, -900, -480, 1800, 960); ctx.restore();
  typed('IRAN — BALLISTIC MISSILE INVENTORY (OPEN SOURCE)', 180, 150, t, t0 + .2, { size: 30, cps: 45 });
  missileCard(400, 400, -.03, t, t0 + 1.0, 'SHAHAB-3', '~1,300 KM', 'LIQUID FUEL · 1 STAGE', 200);
  missileCard(860, 420, .02, t, t0 + 2.6, 'GHADR', '~1,600–1,900 KM', 'LIQUID FUEL · IMPROVED', 230);
  missileCard(1320, 400, -.015, t, t0 + 4.2, 'SEJJIL', '~2,000 KM', 'SOLID FUEL · 2 STAGES', 250);
  missileCard(860, 760, .025, t, t0 + 5.8, 'KHORRAMSHAHR', '~2,000 KM', 'LIQUID FUEL · HEAVY WARHEAD', 260);
  if (t > t0 + 9) {
    // red marker circles the ranges + handwritten conclusion
    const p = eout((t - t0 - 9) / 1.2);
    ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath();
    ctx.ellipse(1450, 820, 270, 120, -.05, -1.2, -1.2 + Math.PI * 2.1 * p); ctx.stroke(); ctx.restore();
    hand('all stop at ≈ 2,000 km', 1450, 840, t, t0 + 10.2, { size: 54, align: 'center', rot: -.04 });
  }
}
function capMemo(t, t0) {
  ctx.drawImage(desk, 0, 0);
  ctx.save(); ctx.translate(W / 2 - 120, H / 2 + 10); ctx.rotate(-.012); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 16; ctx.drawImage(newsprint, -520, -440, 1040, 900); ctx.restore();
  const X = W / 2 - 600;
  typed('MEMORANDUM', X, 170, t, t0 + .2, { size: 40, cps: 30 });
  typed('SUBJECT: IRANIAN MISSILE RANGE POLICY', X, 225, t, t0 + .7, { size: 26, cps: 45 });
  ctx.save(); ctx.fillStyle = INK; ctx.globalAlpha = fin(t, t0 + 1.2, .3); ctx.fillRect(X, 245, 960, 2); ctx.restore();
  const body = ['1. FOR YEARS, IRANIAN COMMANDERS SAID', '   MISSILE RANGE WAS LIMITED TO', '   2,000 KM BY ORDER OF THE SUPREME LEADER.', '', '2. STATED RATIONALE: ALL REQUIRED TARGETS', '   (ISRAEL, US REGIONAL BASES) LIE WITHIN', '   THAT RADIUS.', '', '3. 7 NOV 2026, IRGC: "THAT RESTRICTION', '   HAS BEEN LIFTED FOR US."'];
  body.forEach((l, i) => typed(l, X, 310 + i * 48, t, t0 + 1.4 + i * .45, { size: 27, cps: 55, seed: i * 7 }));
  if (t > t0 + 4.2) { const p = eout((t - t0 - 4.2) / .8); ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(X + 50, 418); ctx.lineTo(X + 50 + 330 * p, 418); ctx.stroke(); ctx.restore(); }
  if (t > t0 + 7.6) { const p = eout((t - t0 - 7.6) / 1.0); ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(X + 330, 712, 400, 62, -.01, -1.5, -1.5 + Math.PI * 2.1 * p); ctx.stroke(); ctx.restore(); }
  hand('the line is gone', X + 560, 900, t, t0 + 9.0, { size: 60, rot: -.06 }); stampAt('LIFTED', X + 980, 760, .12, t, t0 + 10.2, { size: 62 });
  stampAt('CONFIDENTIAL', W / 2 + 200, 240, .1, t, t0 + 0.9, { size: 42, alpha: .7 });
}
function regionBases(t, t0, lt, settled) {
  const f = ease(Math.min(1, lt / 14));
  VIEW = { lon: 47.5 + f * 1.5, lat: 29.5, s: lerp(20, 23, f) };
  ctx.drawImage(paper, -260 - f * 60, -150); drawMap();
  mapLabel('IRAN', 32.5, 55, 40, .65); mapLabel('SAUDI  ARABIA', 22.0, 44, 30, .5); mapLabel('IRAQ', 33, 43.5, 26, .5); mapLabel('PERSIAN GULF', 27.1, 51.5, 20, .5);
  pin(...P.tehran, t, t0 + .1);
  inkPath(llPts(RING2), settled ? 1 : eout((lt - .4) / 1.8), { width: 5, jit: 1.2 });
  hand('2,000 km', pj(...RING2[18]).x + 10, pj(...RING2[18]).y - 18, t, t0 + 2.2, { size: 52, rot: -.15 });
  pin(...P.telaviv, t, t0 + 3.0, '#2a4a8a'); { const q = pj(...P.telaviv); typed('ISRAEL', q.x - 110, q.y + 40, t, t0 + 3.1, { size: 22, cps: 40 }); }
  pin(24.7, 46.7, t, t0 + 3.6, '#2a4a8a'); { const q = pj(24.7, 46.7); typed('RIYADH', q.x - 120, q.y + 40, t, t0 + 3.7, { size: 22, cps: 40 }); }
  Object.values(BASES).forEach(([la, lo, name, dx, dy], i) => { pin(la, lo, t, t0 + 6 + i * .5, '#2a4a8a'); const q = pj(la, lo); ctx.save(); ctx.fillStyle = 'rgba(243,238,223,.85)'; font("'Elite'", 20); const tw = ctx.measureText(name).width; ctx.globalAlpha = fin(t, t0 + 6.1 + i * .5, .2); ctx.fillRect(q.x + dx - 6, q.y + dy - 20, tw + 12, 28); ctx.restore(); typed(name, q.x + dx, q.y + dy, t, t0 + 6.1 + i * .5, { size: 20, cps: 45 }); });
  if (lt > 9.5) indexCard(340, 300, -.03, 'US FORCES IN RANGE', ['BASES ........ 5+ (SHOWN)', 'TROOPS ....... TENS OF THOUSANDS', 'MAINLAND US .. OUT OF RANGE'], t, t0 + 9.5);
}


// =====================================================================
// FULL FILM — Part 2: Chapter 2 (Proof of reach) + Chapter 3 (10,000 km)
// =====================================================================
const cork = (() => { const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
  g.fillStyle = '#9a6b3f'; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 26000; i++) { const x = rnd(i * 1.3) * W, y = rnd(i * 2.7 + 5) * H, r = .6 + rnd(i * 3.1) * 2.2, v = rnd(i * 4.9); g.fillStyle = v > .5 ? `rgba(60,35,15,${.25 + v * .3})` : `rgba(210,160,110,${.15 + v * .3})`; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); }
  const vg = g.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1100); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.55)'); g.fillStyle = vg; g.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#3b2412'; return c; })();
function clip(x, y, rot, t, t0, date, head, sub) {
  const a = fin(t, t0, .25); if (a <= 0) return null; const s = 1 + .25 * (1 - eout((t - t0) / .25));
  ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.scale(1.15, 1.15); ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 22; ctx.shadowOffsetY = 10; ctx.drawImage(newsprint, -190, -140, 380, 280); ctx.shadowColor = 'transparent';
  ctx.fillStyle = INK; font("'Elite'", 20); ctx.fillText(date, -170, -100); ctx.fillRect(-170, -90, 340, 2);
  font("'Serif'", 30, 900); const words = head.split(' '); let line = '', ly = -50;
  for (const w of words) { const tl = line ? line + ' ' + w : w; if (ctx.measureText(tl).width > 340) { ctx.fillText(line, -170, ly); ly += 34; line = w; } else line = tl; } ctx.fillText(line, -170, ly);
  font("'Serif'", 18, 700, true); { let l2 = '', y2 = ly + 32; for (const w of sub.split(' ')) { const tl = l2 ? l2 + ' ' + w : w; if (ctx.measureText(tl).width > 330) { ctx.fillText(l2, -170, y2); y2 += 22; l2 = w; } else l2 = tl; } ctx.fillText(l2, -170, y2); ly = y2 - 32; }
  ctx.fillStyle = 'rgba(40,32,24,.4)'; for (let i = 0; i < 2; i++) ctx.fillRect(-170, ly + 56 + i * 18, 300 - i * 40, 7);
  ctx.restore();
  return { x, y: y - 138 };
}
function corkPin(p, color = '#b3221b') { ctx.save(); const g = ctx.createRadialGradient(p.x - 3, p.y - 3, 2, p.x, p.y, 12); g.addColorStop(0, '#ff9a8a'); g.addColorStop(.35, color); g.addColorStop(1, '#4a0a06'); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 4; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, 12, 0, 7); ctx.fill(); ctx.restore(); }
function string(a, b, p) { if (!a || !b || p <= 0) return; const mx = (a.x + b.x) / 2, my = Math.max(a.y, b.y) + 60; ctx.save(); ctx.strokeStyle = '#b01f18'; ctx.lineWidth = 3; ctx.shadowColor = 'rgba(0,0,0,.4)'; ctx.shadowBlur = 4; ctx.shadowOffsetY = 3; ctx.beginPath(); ctx.moveTo(a.x, a.y);
  const N = 30; for (let i = 1; i <= N * clamp01(p); i++) { const f = i / N, x = (1 - f) * (1 - f) * a.x + 2 * (1 - f) * f * mx + f * f * b.x, y = (1 - f) * (1 - f) * a.y + 2 * (1 - f) * f * my + f * f * b.y; ctx.lineTo(x, y); } ctx.stroke(); ctx.restore(); }

function corkTimeline(t, t0) {
  ctx.drawImage(cork, 0, 0);
  typed('TIMELINE — FROM THREATS TO LAUNCHES', 120, 110, t, t0 + .1, { size: 34, cps: 40, color: '#f1e6c8' });
  const items = [[290, 400, -.04, 'APRIL 2024', 'Iran launches first direct strike on Israel', 'Drones and missiles, mostly intercepted'], [730, 640, .03, 'JUNE 2025', 'US strikes nuclear sites; Iran hits back at Al Udeid', 'A US base targeted directly'], [1180, 400, -.02, 'FEB. 28, 2026', 'US and Israel strike Iran; war begins', 'Missiles fly across the region'], [1620, 640, .04, 'MARCH 2026', 'Two missiles toward Diego Garcia', 'About 4,000 km, says Britain; Iran denies firing them']];
  const pts = items.map((it, i) => clip(it[0], it[1], it[2], t, t0 + 1 + i * 2.2, it[3], it[4], it[5]));
  for (let i = 0; i < 3; i++) string(pts[i], pts[i + 1], (t - t0 - 2 - i * 2.2) / .8);
  pts.forEach(p => p && corkPin(p));
  if (t > t0 + 10.5) hand('from threats → to launches', 960, 880, t, t0 + 10.5, { size: 60, color: '#f1e6c8', align: 'center', rot: -.02 });
}
function udeidClose(t, t0, lt) {
  const f = ease(lt / 12);
  VIEW = { lon: 49.0, lat: 28.3, s: lerp(36, 41, f) };
  ctx.drawImage(paper, -260, -150 - f * 40); drawMap();
  mapLabel('IRAN', 32.0, 53.5, 44, .65); mapLabel('QATAR', 25.5, 51.1, 22, .6); mapLabel('PERSIAN  GULF', 27.4, 50.6, 24, .5); mapLabel('SAUDI  ARABIA', 24.5, 46.5, 30, .45);
  const target = P.udeid; pin(...target, t, t0 + .2, '#2a4a8a');
  { const q = pj(...target); typed('AL UDEID AIR BASE', q.x + 26, q.y + 44, t, t0 + .4, { size: 24, cps: 40 }); }
  const origins = [[34.31, 47.06], [33.5, 48.4], [32.4, 50.9], [31.3, 49.0], [30.4, 50.2]];
  origins.forEach((o, i) => { const pts = llPts(gc(o, target, 40)); const p = eout((lt - 1 - i * .35) / 1.4); inkPath(pts.slice(0, 33), p, { width: 4, jit: .4, seed: i }); if (lt > 3.4 + i * .3) { const e = pts[32]; ctx.save(); ctx.strokeStyle = '#2a4a8a'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(e.x - 12, e.y - 12); ctx.lineTo(e.x + 12, e.y + 12); ctx.moveTo(e.x + 12, e.y - 12); ctx.lineTo(e.x - 12, e.y + 12); ctx.stroke(); ctx.restore(); } });
  hand('intercepted ✕', pj(27.6, 49.5).x + 70, pj(27.6, 49.5).y - 10, t, t0 + 4.6, { size: 52, color: '#2a4a8a', rot: -.05 });
  stampAt('INTERCEPTED', 1460, 240, -.1, t, t0 + 5.6, { size: 60 });
  indexCard(390, 760, -.03, 'AL UDEID — 23 JUNE 2025', ['US CASUALTIES .... NONE', 'WARNING .......... GIVEN', 'MESSAGE .......... "WE CAN REACH YOU"'], t, t0 + 6.8);
}
function hostSplit(t, t0, title, lines) {
  ctx.drawImage(desk, 0, 0);
  hostSlotRect(120, 170, 940, 529, -.008, 'HOST — SPLIT SCREEN', null);
  indexCard(1440, 470, .03, title, lines, t, t0 + .4);
}
function worldStrings(t, t0, lt) {
  const f = ease(lt / 14);
  VIEW = { lon: lerp(-30, -34, f), lat: 42, s: lerp(8.0, 8.3, f) };
  ctx.drawImage(paper, -190, -160); drawMap();
  mapLabel('ATLANTIC  OCEAN', 28, -40, 30, .5); mapLabel('UNITED STATES', 47.5, -104, 28, .55); mapLabel('IRAN', 33, 54, 22, .7);
  pin(...P.tehran, t, t0 + .2);
  const dests = [[[40.71, -74.0], 'NEW YORK', '≈ 9,900 KM', 1.0, [20, -90]], [P.dc, 'WASHINGTON', '≈ 10,200 KM', 3.2, [30, 50]], [[34.05, -118.24], 'LOS ANGELES', '≈ 12,200 KM', 5.6, [-60, 60]]];
  dests.forEach(([d, name, km, s, off], i) => {
    pin(...d, t, t0 + s, '#2a4a8a');
    const pts = llPts(gc(P.tehran, d, 160)); inkPath(pts, eout((lt - s) / 1.8), { color: GRAPH, width: 2.4, dash: [12, 9], jit: 0, seed: i });
    const q = pj(...d); typed(name, q.x + off[0], q.y + off[1], t, t0 + s + 1.6, { size: 24, cps: 40 }); typed(km, q.x + off[0], q.y + off[1] + 32, t, t0 + s + 1.9, { size: 28, cps: 30, color: '#8f1a13' });
  });
  inkPath(llPts(REACH2), 1, { width: 6 });
  if (lt > 9) hand('every one is 5× out of reach', 960, 180, t, t0 + 9, { size: 60, align: 'center', rot: -.02 });
}
function barSketch(t, t0) {
  ctx.drawImage(desk, 0, 0);
  ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(-.01); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 16; ctx.drawImage(graphPaper, -750, -450); ctx.restore();
  typed('RANGE: WHAT IRAN HAS vs. WHAT IT WOULD NEED', 260, 170, t, t0 + .2, { size: 30, cps: 45 });
  const x0 = 480, unit = 1100 / 12000;
  const bars = [['OLD LIMIT', 2000, 290, RED, 1.0], ['DIEGO GARCIA*', 4000, 405, RED, 2.0], ['ICBM CLASS', 5500, 520, 'rgba(42,74,138,.85)', 3.0], ['NEW YORK', 9900, 635, GRAPH, 4.0], ['WASHINGTON', 10200, 750, GRAPH, 5.0]];
  bars.forEach(([n, v, y, col, s]) => {
    typed(n, 260, y + 34, t, t0 + s, { size: 24, cps: 40 });
    const p = eout((t - t0 - s - .2) / 1.0), w = v * unit * p;
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.strokeRect(x0, y, w, 50);
    ctx.globalAlpha = .25; ctx.fillStyle = col; for (let hx = 0; hx < w; hx += 14) ctx.fillRect(x0 + hx, y, 3, 50); ctx.restore();
    if (p > .95) typed(v.toLocaleString('en-US') + ' KM', x0 + w + 16, y + 36, t, t0 + s + 1.2, { size: 26, cps: 30 });
  });
  typed('(ICBM = OVER 5,500 KM)   * UK FIGURE, MARCH 2026; IRAN DENIES THE LAUNCH', 260, 850, t, t0 + 6.2, { size: 20, cps: 60, alpha: .7 });
  if (t > t0 + 7) { ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 5; const p = eout((t - t0 - 7) / .8); ctx.beginPath(); ctx.ellipse(1500, 380, 110, 80, 0, -1.4, -1.4 + Math.PI * 2.1 * p); ctx.stroke(); ctx.restore(); hand('5×', 1500, 410, t, t0 + 7.3, { size: 110, align: 'center', dur: .4 }); }
}
function dictCard(t, t0) {
  ctx.drawImage(desk, 0, 0);
  ctx.save(); ctx.translate(W / 2, H / 2 - 20); ctx.rotate(.012); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 16; ctx.drawImage(newsprint, -640, -340, 1280, 680); ctx.restore();
  ctx.save(); ctx.globalAlpha = fin(t, t0 + .2, .3); ctx.fillStyle = INK; font("'Serif'", 96, 900); ctx.fillText('ICBM', 380, 330); font("'Serif'", 34, 700, true); ctx.fillText('/ˌaɪ siː biː ˈɛm/  noun', 720, 325); ctx.restore();
  typed('INTERCONTINENTAL BALLISTIC MISSILE.', 380, 420, t, t0 + 1.0, { size: 34, cps: 30 });
  typed('A missile with a range of more than 5,500 km,', 380, 490, t, t0 + 2.4, { size: 30, cps: 32 });
  typed('able to strike targets on another continent.', 380, 540, t, t0 + 3.8, { size: 30, cps: 32 });
  typed('Fielded by only a handful of countries.', 380, 620, t, t0 + 5.4, { size: 30, cps: 32, color: '#8f1a13' });
  if (t > t0 + 7) { ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 4; const p = eout((t - t0 - 7) / .7); ctx.beginPath(); ctx.moveTo(380, 632); ctx.lineTo(380 + 760 * p, 632); ctx.stroke(); ctx.restore(); }
  hand('Iran has never tested one', 1150, 780, t, t0 + 8.2, { size: 58, rot: -.05, align: 'center' });
}

// CHAPTER 2
add(3, (lt, t, t0) => chapterCard(t, t0, 'TWO', 'PROOF OF REACH'), []);
add(15, (lt, t, t0) => corkTimeline(t, t0), ['In two years, Iran went from threats to launches:', 'at Israel, at a US base in Qatar,', 'and, Britain says, at an island base twice as far as its old limit.']);
add(13, (lt, t, t0) => udeidClose(t, t0, lt), ['Most were intercepted.', 'The attack on Al Udeid caused no American casualties.', 'But it proved something: Iran is willing to fire at American targets when it\'s hit first.']);
add(6, (lt, t, t0) => hostSplit(t, t0, 'THE REAL QUESTION', ['WILL TO STRIKE US? .. SHOWN', 'REACH TO MAINLAND? .. ?']), ['So the real question isn\'t will. It\'s reach.']);
// CHAPTER 3
add(3, (lt, t, t0) => chapterCard(t, t0, 'THREE', 'THE 10,000 KM PROBLEM'), []);
add(13, (lt, t, t0) => worldStrings(t, t0, lt), ['Tehran to New York: nearly ten thousand kilometers.', 'Washington: over ten.', 'The West Coast: twelve.']);
add(11, (lt, t, t0) => barSketch(t, t0), ['That\'s five times Iran\'s old limit,', 'and more than twice as far as the Diego Garcia launch Britain reported.']);
add(11, (lt, t, t0) => dictCard(t, t0), ['To cross that gap, you need a different class of weapon:', 'an intercontinental ballistic missile, an ICBM.', 'Only a handful of countries have ever built one.']);
add(6, (lt, t, t0) => hostFull(t, t0, 'you: three hard problems'), ['And building one isn\'t just "a bigger missile."', 'It\'s three very hard problems.']);


// =====================================================================
// FULL FILM — Part 3: Ch.4 Three hard problems · Ch.5 Shortcut · Ch.6 If attacked again · Verdict
// =====================================================================
function notebook(t, t0, title, num) {
  ctx.drawImage(desk, 0, 0);
  ctx.save(); ctx.translate(W / 2, H / 2 - 10); ctx.rotate(-.008); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 16;
  ctx.drawImage(card, -760, -450, 1520, 900); ctx.shadowColor = 'transparent';
  ctx.strokeStyle = 'rgba(70,110,170,.25)'; ctx.lineWidth = 1.2; for (let y = -340; y < 440; y += 46) { ctx.beginPath(); ctx.moveTo(-760, y); ctx.lineTo(760, y); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(190,40,40,.45)'; ctx.beginPath(); ctx.moveTo(-620, -450); ctx.lineTo(-620, 450); ctx.stroke();
  for (let y = -400; y < 440; y += 80) { ctx.fillStyle = '#2b1d12'; ctx.beginPath(); ctx.arc(-715, y, 13, 0, 7); ctx.fill(); }
  ctx.restore();
  typed('PROBLEM ' + num, 400, 175, t, t0 + .1, { size: 30, cps: 30, color: '#8f1a13' });
  ctx.save(); ctx.globalAlpha = fin(t, t0 + .4, .3); font("'Serif'", 64, 900); ctx.fillStyle = INK; ctx.fillText(title, 400, 250); ctx.restore();
}
function probPower(t, t0) {
  notebook(t, t0, 'POWER', 1);
  // curved earth + trajectory
  ctx.save(); ctx.strokeStyle = GRAPH; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(960, 2300, 1500, -Math.PI * .72, -Math.PI * .28); ctx.stroke(); ctx.restore();
  const p = eout((t - t0 - 1.2) / 3);
  ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 4; ctx.setLineDash([14, 10]); ctx.beginPath(); for (let i = 0; i <= 60 * p; i++) { const f = i / 60, x = 560 + f * 900, y = 860 - Math.sin(Math.PI * f) * 520; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore();
  rocket(520, 860, [120, 90, 70], 40, INK, false, eout((t - t0 - .6) / 1));
  hand('stage 1', 420, 820, t, t0 + 1.2, { size: 34, color: GRAPH }); hand('stage 2', 420, 715, t, t0 + 1.5, { size: 34, color: GRAPH }); hand('stage 3', 420, 630, t, t0 + 1.8, { size: 34, color: GRAPH });
  hand('payload → 10,000 km', 1250, 330, t, t0 + 4.4, { size: 54, rot: -.05 });
  typed('BIGGER BOOSTERS · MORE STAGES · HEAVIER PAYLOAD', 640, 940, t, t0 + 6, { size: 24, cps: 45, alpha: .8 });
}
function probReentry(t, t0) {
  notebook(t, t0, 'RE-ENTRY', 2);
  const cx = 960, cy = 600, a = fin(t, t0 + .5, .4);
  ctx.save(); ctx.globalAlpha = a; ctx.translate(cx, cy); ctx.rotate(.6);
  for (let i = 0; i < 9; i++) { const f = .5 + .5 * Math.sin(t * 18 + i * 1.7), l = 160 + 120 * f + i * 14; ctx.strokeStyle = `rgba(178,${40 + i * 12},20,${.35 + .4 * f})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-60 + i * 15, 70); ctx.quadraticCurveTo(-90 + i * 18, 70 + l * .6, -70 + i * 14, 70 + l); ctx.stroke(); }
  ctx.fillStyle = 'rgba(243,238,223,1)'; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -150); ctx.lineTo(-75, 70); ctx.lineTo(75, 70); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = 'rgba(40,30,20,.5)'; ctx.lineWidth = 1.5; for (let k = -70; k < 70; k += 10) { ctx.beginPath(); ctx.moveTo(k, 70); ctx.lineTo(k + 8, 54); ctx.stroke(); }
  ctx.restore();
  hand('≈ 7 km per second', 1190, 430, t, t0 + 2.0, { size: 54, rot: -.04 });
  hand('wrapped in plasma', 1190, 520, t, t0 + 3.2, { size: 54, rot: -.04 });
  hand('heat shield must survive', 520, 860, t, t0 + 4.6, { size: 46, color: GRAPH, rot: .02 });
  typed('NORTH KOREA SPENT YEARS ON THIS STEP ALONE', 600, 950, t, t0 + 6.2, { size: 24, cps: 45, alpha: .8 });
}
function probAccuracy(t, t0) {
  notebook(t, t0, 'ACCURACY', 3);
  const tx = 1330, ty = 620, a = fin(t, t0 + .5, .4);
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = INK; ctx.lineWidth = 3; for (const r of [150, 100, 50]) { ctx.beginPath(); ctx.arc(tx, ty, r, 0, 7); ctx.stroke(); } ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(tx, ty, 10, 0, 7); ctx.fill(); ctx.restore();
  const p = eout((t - t0 - 1.4) / 2.2);
  ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 3; ctx.setLineDash([12, 8]);
  ctx.beginPath(); ctx.moveTo(480, 640); ctx.lineTo(480 + (tx + 60 - 480) * p, 640 + (ty - 250 - 640) * p); ctx.moveTo(480, 640); ctx.lineTo(480 + (tx + 60 - 480) * p, 640 + (ty + 250 - 640) * p); ctx.stroke(); ctx.restore();
  ctx.save(); ctx.globalAlpha = fin(t, t0 + 1.2, .3); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(480, 640, 9, 0, 7); ctx.fill(); ctx.restore();
  hand('launch', 430, 700, t, t0 + 1.2, { size: 40, color: GRAPH });
  hand('tiny error here…', 520, 520, t, t0 + 2.6, { size: 48, rot: -.03 });
  hand('…kilometers off here', 1160, 920, t, t0 + 4.0, { size: 48, rot: -.03 });
}
function probSummary(t, t0) {
  ctx.drawImage(desk, 0, 0);
  ctx.save(); ctx.translate(W / 2, H / 2 - 20); ctx.rotate(.01); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.drawImage(paper, -820, -420, 1640, 840); ctx.restore();
  typed('ICBM REQUIREMENTS — STATUS (IRAN, PUBLIC RECORD)', 260, 220, t, t0 + .1, { size: 30, cps: 45 });
  [['1. POWER', 'NOT SHOWN AT ICBM SCALE'], ['2. RE-ENTRY', 'NOT DEMONSTRATED'], ['3. ACCURACY', 'NOT DEMONSTRATED']].forEach(([a, b], i) => { typed(a, 300, 360 + i * 130, t, t0 + .6 + i * .5, { size: 44, cps: 30 }); typed(b, 820, 360 + i * 130, t, t0 + 1 + i * .5, { size: 30, cps: 40, color: '#8f1a13' }); });
  stampAt('UNPROVEN', 1380, 820, -.14, t, t0 + 3.4, { size: 90 });
}
function spaceNote(t, t0) {
  ctx.drawImage(desk, 0, 0);
  ctx.save(); ctx.translate(W / 2 - 220, H / 2 - 40); ctx.rotate(-.02); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 36; ctx.drawImage(newsprint, -560, -330, 1120, 660); ctx.restore();
  ctx.save(); ctx.globalAlpha = fin(t, t0 + .2, .3); font("'Serif'", 70, 900); ctx.fillStyle = INK; ctx.fillText("IRAN'S SPACE PROGRAM", 260, 300); ctx.restore();
  typed('SATELLITE LAUNCHES: SEMNAN / SHAHROUD', 260, 380, t, t0 + .8, { size: 28, cps: 45 });
  typed('WATCHED CLOSELY BY US INTELLIGENCE', 260, 430, t, t0 + 1.8, { size: 28, cps: 45, color: '#8f1a13' });
  // satellite doodle
  ctx.save(); ctx.globalAlpha = fin(t, t0 + 2.4, .4); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.translate(820, 640); ctx.rotate(-.2); ctx.strokeRect(-40, -30, 80, 60); ctx.strokeRect(-200, -22, 140, 44); ctx.strokeRect(60, -22, 140, 44); for (let k = -180; k < -60; k += 20) { ctx.beginPath(); ctx.moveTo(k, -22); ctx.lineTo(k, 22); ctx.stroke(); } for (let k = 80; k < 200; k += 20) { ctx.beginPath(); ctx.moveTo(k, -22); ctx.lineTo(k, 22); ctx.stroke(); } ctx.restore();
  hostCorner();
}
function intelMemo(t, t0) {
  ctx.drawImage(desk, 0, 0);
  ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(.008); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 16; ctx.drawImage(newsprint, -700, -440, 1400, 880); ctx.restore();
  typed('THREAT ASSESSMENT — EXCERPT', 300, 170, t, t0 + .2, { size: 36, cps: 35 });
  typed('SOURCE: US DEFENSE INTELLIGENCE AGENCY (2025)', 300, 220, t, t0 + .8, { size: 22, cps: 50, alpha: .75 });
  ctx.save(); ctx.fillStyle = INK; ctx.globalAlpha = fin(t, t0 + 1.2, .3); ctx.fillRect(300, 240, 1320, 2); ctx.restore();
  const L = ['IRAN HAS SPACE LAUNCH VEHICLES IT COULD USE TO', 'DEVELOP A MILITARILY-VIABLE ICBM BY 2035,', 'SHOULD TEHRAN DECIDE TO PURSUE THE CAPABILITY.'];
  const hp = eout((t - t0 - 5.2) / 1.6);
  if (hp > 0) { ctx.save(); ctx.fillStyle = 'rgba(240,215,70,0.45)'; ctx.globalCompositeOperation = 'multiply'; [[300, 362, 1160], [300, 432, 1080], [300, 502, 1200]].forEach(([x, y, w], i) => { const pp = clamp01(hp * 3 - i); if (pp > 0) ctx.fillRect(x - 6, y - 36, w * pp, 46); }); ctx.restore(); }
  L.forEach((l, i) => typed(l, 300, 360 + i * 70, t, t0 + 1.6 + i * 1.1, { size: 34, cps: 40, seed: i }));
  hand('2035', 1500, 700, t, t0 + 7.2, { size: 120, dur: .5, rot: -.08 });
  hand('— IF it decides to', 1180, 820, t, t0 + 8.2, { size: 56, rot: -.05 });
}
function scenarioBoard(t, t0, stage) {
  ctx.drawImage(cork, 0, 0);
  const OLD = t0 - 100;
  typed('THREE POSSIBLE PATHS: ASSUMPTIONS, NOT FORECASTS', 120, 110, t, stage ? OLD : t0 + .1, { size: 34, cps: 45, color: '#f1e6c8' });
  const cols = [[360, 'SCENARIO A', 'A WARNING SHOT', ['WORDS, NOT NEW MISSILES', 'AIM: DETERRENCE, LEVERAGE'], '#2a4a8a'],
                [960, 'SCENARIO B', 'STRETCH WHAT IT HAS', ['LIGHTER WARHEAD: 3-4,000 KM', 'EUROPE IN RANGE, NOT USA'], '#b07a12'],
                [1560, 'SCENARIO C', 'THE LONG ROAD', ['A REAL ICBM, ~2035 (DIA)', 'EVERY TEST VISIBLE'], '#b3221b']];
  cols.forEach(([x, tag, head, items, color], k) => {
    if (k > stage) return;
    const s0 = k < stage ? OLD : t0 + .4;
    const h = clip(x, 300, k === 1 ? .02 : -.02, t, s0, tag, head, '');
    items.forEach((it, i) => { const yy = 560 + i * 170; const a = fin(t, s0 + 1.4 + i * 1.6, .3); if (a <= 0) return;
      ctx.save(); ctx.globalAlpha = a; ctx.translate(x, yy); ctx.rotate((i % 2 ? .02 : -.02)); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 8; ctx.drawImage(card, -260, -60, 520, 120); ctx.restore();
      typed(it, x - 235, yy + 10, t, s0 + 1.5 + i * 1.6, { size: 26, cps: 45 }); corkPin({ x, y: yy - 50 }, color); });
    if (h) corkPin(h, color);
  });
  if (stage === 2 && t > t0 + 6.5) hand('which one is it?', 960, 880, t, t0 + 6.5, { size: 64, color: '#f1e6c8', align: 'center', rot: -.02 });
}
function northAmerica(t, t0, lt) {
  const f = ease(lt / 12);
  VIEW = { lon: lerp(-112, -108, f), lat: 50, s: lerp(9.5, 10.2, f) };
  ctx.drawImage(paper, -190, -160); drawMap();
  mapLabel('UNITED STATES', 40, -98, 34, .55); mapLabel('CANADA', 58, -100, 30, .5); mapLabel('ALASKA', 64, -152, 24, .5);
  inkPath(llPts(TD2), eout((lt - .3) / 2.5), { color: GRAPH, width: 2.4, dash: [12, 9], jit: 0 });
  pin(...P.greely, t, t0 + 2.4, '#2a4a8a'); pin(...P.vandenberg, t, t0 + 2.9, '#2a4a8a');
  { const q = pj(...P.greely); typed('FORT GREELY, AK', q.x + 26, q.y + 36, t, t0 + 2.6, { size: 24, cps: 40 }); }
  { const q = pj(...P.vandenberg); typed('VANDENBERG, CA', q.x + 26, q.y + 36, t, t0 + 3.1, { size: 24, cps: 40 }); }
  indexCard(420, 800, -.03, 'GROUND-BASED MIDCOURSE DEFENSE', ['INTERCEPTORS ... ~44', 'SITES .......... ALASKA + CALIFORNIA', 'BUILT FOR ...... LIMITED ICBM THREAT'], t, t0 + 4.4);
  hand('the last line', pj(...P.greely).x + 40, pj(...P.greely).y - 70, t, t0 + 8.5, { size: 54, rot: -.05 });
}
function verdictSheet(t, t0) {
  ctx.drawImage(desk, 0, 0);
  ctx.save(); ctx.translate(W / 2, H / 2 - 10); ctx.rotate(-.006); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 16; ctx.drawImage(newsprint, -720, -450, 1440, 900); ctx.restore();
  ctx.save(); ctx.globalAlpha = fin(t, t0 + .1, .3); font("'Serif'", 80, 900); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.fillText('VERDICT', W / 2, 200); ctx.restore();
  const rows = [['TODAY', 'NO ICBM · LIMIT LIFTED, LONGER REACH UNPROVEN', 'NO', 'rgba(40,120,60,1)', 1.2], ['IN ~10 YEARS', 'POSSIBLE — IF IRAN DECIDES TO BUILD IT', 'POSSIBLE', 'rgba(190,120,20,1)', 4.6], ['WILL IT?', 'BLUFF OR BLUEPRINT?', 'UNKNOWN', 'rgba(176,26,20,1)', 8.0]];
  rows.forEach(([k, d, st, col, s], i) => { const y = 330 + i * 200; typed(k, 320, y, t, t0 + s, { size: 44, cps: 30 }); typed(d, 320, y + 50, t, t0 + s + .5, { size: 26, cps: 45, alpha: .8 }); stampAt(st, 1420, y + 10, -.1 + i * .06, t, t0 + s + 1.6, { size: 64, color: col }); });
}
function caseContinues(t, t0) {
  fileOpen(t, t0 - 3, true);
  stampAt('CASE CONTINUES', W / 2 - 330, H / 2 + 330, -.06, t, t0 + .6, { size: 66 });
  indexCard(1580, 900, .05, 'NEXT FILE', ['SUBSCRIBE SO YOU', "DON'T MISS IT"], t, t0 + 2.0);
}

// CHAPTER 4
add(3, (lt, t, t0) => chapterCard(t, t0, 'FOUR', 'THREE HARD PROBLEMS'), []);
add(9, (lt, t, t0) => probPower(t, t0), ['First, power.', 'You need bigger, multi-stage rockets that can throw a heavy payload halfway around the planet.']);
add(11, (lt, t, t0) => probReentry(t, t0), ['Second, re-entry.', 'The warhead comes back through the atmosphere at about seven kilometers per second, wrapped in burning plasma.', 'North Korea spent years on this problem alone.']);
add(8, (lt, t, t0) => probAccuracy(t, t0), ['Third, accuracy.', 'A tiny error at launch turns into kilometers of miss at the other end of the world.']);
add(6, (lt, t, t0) => probSummary(t, t0), ['Iran has not publicly demonstrated any of the three at intercontinental range.']);
// CHAPTER 5
add(3, (lt, t, t0) => chapterCard(t, t0, 'FIVE', 'THE SHORTCUT'), []);
add(6, (lt, t, t0) => spaceNote(t, t0), ['But here\'s where it gets interesting,', 'and why US intelligence keeps a close eye on Iran\'s space program.']);
add(12, (lt, t, t0) => shotBlueprint(13.31 + Math.min(lt * 0.28, 2.9)), ['Iran launches satellites, using rockets like the Simorgh and the solid-fuel Qaem-100.', 'And the rocket that puts a satellite in orbit uses much of the same technology as an ICBM.']);
add(11, (lt, t, t0) => intelMemo(t, t0), ['A 2025 US intelligence assessment said Iran could develop a working ICBM by around 2035,', 'if it decides to.']);
add(10, (lt, t, t0) => telexSheet(t, t0, ['=== PRIORITY // LAUNCH WARNING ===', 'SITE ....... SEMNAN, IRAN', 'VEHICLE .... MULTI-STAGE', 'TRAJECTORY . ORBITAL', 'STATUS ..... TRACKED BY SATELLITE', '', 'ANALYST NOTE: A FULL-RANGE ICBM', 'TEST CANNOT BE HIDDEN.'], 'MONITORED', t0 + 4.6), ['And every space launch is, in a way, a test.', 'But it\'s a test the whole world can see.', 'A full-range ICBM test can\'t be hidden.']);
// CHAPTER 6
add(3, (lt, t, t0) => chapterCard(t, t0, 'SIX', 'WHAT COMES NEXT'), []);
add(5, (lt, t, t0) => hostFull(t, t0, 'you: what comes next'), ['So the line is gone. What could actually happen next?', 'Here are three possibilities. None of them is certain.']);
add(9, (lt, t, t0) => scenarioBoard(t, t0, 0), ['One: it\'s a warning.', 'Words aimed at deterring new strikes, and at winning leverage in talks with Washington.', 'No new missile has to exist for that to work.']);
add(9, (lt, t, t0) => scenarioBoard(t, t0, 1), ['Two: stretch what it already has.', 'Iranian state media claim a lighter warhead could push the Khorramshahr missile to three or four thousand kilometers.', 'That\'s unconfirmed, and it would put parts of Europe in range, not America.']);
add(9, (lt, t, t0) => scenarioBoard(t, t0, 2), ['Three: the long road, a true intercontinental missile.', 'US intelligence says that\'s possible by 2035, if Tehran decides to build one.', 'And every test along the way would be hard to hide.']);
add(11, (lt, t, t0) => northAmerica(t, t0, lt), ['And at the end of that road, America has interceptors in Alaska and California,', 'built for exactly this kind of limited ICBM threat.']);
add(9, (lt, t, t0) => hostSplit(t, t0, 'THE REAL THREAT — TODAY', ['US BASES ........ IN RANGE', 'SHIPS / SHIPPING . IN RANGE', 'ALLIES .......... IN RANGE']), ['Which is why, in the short term, the realistic threat isn\'t a missile over the Atlantic.', 'It\'s what Iran can already reach: bases, ships, allies and shipping lanes.']);
// VERDICT
add(3, (lt, t, t0) => chapterCard(t, t0, '—', 'THE VERDICT'), []);
add(12, (lt, t, t0) => verdictSheet(t, t0), []);
add(16, (lt, t, t0) => hostFull(t, t0, 'you: the verdict'), ['So, can Iran hit America? Today, no.', 'The line is gone, but the distance isn\'t.', 'In about ten years, possibly, if Tehran decides to build it, and the tests would be hard to hide.', 'So here\'s my question for you:', 'is lifting the limit a real plan, or a warning shot meant to buy leverage?', 'Tell me what you think in the comments.']);
add(6, (lt, t, t0) => caseContinues(t, t0), []);

// ---- timeline engine ----
window.SHOTS_META = SHOTS.map(s => ({ d: s.d, caps: s.caps }));
if (TIMING) SHOTS.forEach((s, i) => { s.d = TIMING.shots[i]; });
let acc = 0; SHOTS.forEach(s => { s.t0 = acc; acc += s.d; }); const FILM_LEN = acc;
const CAPS_FILM = TIMING ? TIMING.caps : [];
if (!TIMING) SHOTS.forEach(s => { if (!s.caps.length) return; const tot = s.caps.reduce((a, c) => a + c.length, 0); let c0 = s.t0 + .3; const span = s.d - .6; s.caps.forEach(c => { const d = span * c.length / tot; CAPS_FILM.push([c0, c0 + d, c]); c0 += d; }); });
function capsFilm(t) {
  if (QUOTE_ACTIVE) return;
  const c = CAPS_FILM.find(c => t >= c[0] && t < c[1]); if (!c) return;
  ctx.save(); font("'Elite'", 36); const w = ctx.measureText(c[2]).width;
  if (w <= 1700) { ctx.fillStyle = 'rgba(14,10,6,0.78)'; ctx.fillRect(W / 2 - w / 2 - 26, 960, w + 52, 60); ctx.fillStyle = '#f1e6c8'; ctx.textAlign = 'center'; ctx.fillText(c[2], W / 2, 1001); ctx.restore(); return; }
  const ws = c[2].split(' '); let best = 1, bd = 1e9; for (let k = 1; k < ws.length; k++) { const d = Math.abs(ctx.measureText(ws.slice(0, k).join(' ')).width - ctx.measureText(ws.slice(k).join(' ')).width); if (d < bd) { bd = d; best = k; } }
  const l1 = ws.slice(0, best).join(' '), l2 = ws.slice(best).join(' '), mw = Math.max(ctx.measureText(l1).width, ctx.measureText(l2).width);
  ctx.fillStyle = 'rgba(14,10,6,0.78)'; ctx.fillRect(W / 2 - mw / 2 - 26, 912, mw + 52, 108); ctx.fillStyle = '#f1e6c8'; ctx.textAlign = 'center'; ctx.fillText(l1, W / 2, 953); ctx.fillText(l2, W / 2, 1001); ctx.restore();
}
window.FILM_LEN = FILM_LEN;
window.renderFilm = (t) => {
  CUR_T = t; QUOTE_ACTIVE = false;
  const s = SHOTS.find(s => t >= s.t0 && t < s.t0 + s.d) || SHOTS[SHOTS.length - 1];
  SHAKE = { x: 0, y: 0 };
  ctx.save(); ctx.translate(Math.sin(t * 7.3) * .8, Math.cos(t * 6.1) * .8);
  ctx.fillStyle = '#1a120b'; ctx.fillRect(-20, -20, W + 40, H + 40);
  s.fn(t - s.t0, t, s.t0);
  ctx.restore();
  capsFilm(t);
  ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(255,226,180,0.55)'; ctx.fillRect(0, 0, W, H); ctx.restore();
  ctx.save(); ctx.globalCompositeOperation = 'overlay'; ctx.drawImage(grains[Math.floor(t * 24) % 4], 0, 0, W, H); ctx.restore();
  const vg = ctx.createRadialGradient(W / 2, H / 2, 380, W / 2, H / 2, 1150); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(20,10,0,0.62)'); ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = `rgba(255,240,210,${(rnd(Math.floor(t * 24)) * .035).toFixed(3)})`; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 3; i++) { if (rnd(Math.floor(t * 24) * 3 + i) > .7) { ctx.fillStyle = 'rgba(30,20,10,0.18)'; ctx.fillRect(rnd(Math.floor(t * 24) + i * 9) * W, 0, 1.5, H); } }
  for (const sh of SHOTS) { const d = t - sh.t0; if (sh.t0 > 0 && d >= 0 && d < .22) { ctx.fillStyle = `rgba(10,6,2,${(1 - d / .22) * .85})`; ctx.fillRect(0, 0, W, H); } }
  const fa = Math.max(1 - fin(t, 0, .5), fin(t, FILM_LEN - .8, .8)); if (fa > 0) { ctx.fillStyle = `rgba(0,0,0,${fa})`; ctx.fillRect(0, 0, W, H); }
};
window.renderTrailer = window.renderFilm; window.renderAt = window.renderFilm;

await document.fonts.load("20px 'Elite'"); await document.fonts.load("700 20px 'Hand'"); await document.fonts.load("900 20px 'Serif'"); await document.fonts.load("italic 700 20px 'Serif'"); await document.fonts.load("700 20px 'Serif'");
window.READY = true;
