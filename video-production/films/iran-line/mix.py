"""Sound for "The Line": narration + original score + foley on one 62.67 s timeline.

90 bpm, E minor, one bar = 2.667 s (24 bars). Cues come from events.json (the page) and voice/cues.json (narration).
Voice compressed; music ~10 dB (RMS) under it, carved at 300 Hz-4 kHz and ducked under each line.
usage: LIB=<library> $LIB/.venv/bin/python mix.py      -> out/mix.wav, out/instruments.txt
"""
import json, os, sys
import numpy as np, soundfile as sf, soxr
LIB = os.environ['LIB']; sys.path.insert(0, LIB)
from core.audio import sampler as S
from core.audio.sfx import SR, bp, lp, hp, add, compress, limit, click, whoosh, thump

HERE = os.path.dirname(os.path.abspath(__file__))
D = json.load(open(os.path.join(HERE, 'events.json'))); FULL = float(D['dur']); EV = D['ev']
CUES = json.load(open(os.path.join(HERE, 'voice', 'cues.json')))
N = int(FULL * SR) + SR; tt = np.arange(N) / SR; rng = np.random.default_rng(23)
BEAT = 60 / 90; BAR = 4 * BEAT
evs = lambda k: [e for e in EV if e['type'] == k]
def env_lin(pts): ts, vs = zip(*pts); return np.interp(tt, ts, vs)
def st(x): return np.stack([x, np.roll(x, 1733)], 1)
bt = lambda b, q=0: (b - 1) * BAR + q * BEAT                      # bar (1-based), beat offset -> seconds
mix = np.zeros((N, 2)); music = np.zeros((N, 2))

# ---------------- ambience ----------------
air = bp(rng.standard_normal(N), 250, 5200, 2) * env_lin([(0, 0), (.5, .014), (5.3, .014), (8, .009), (16, .009), (17, .0), (31.3, 0), (31.4, .004), (37, .004), (37.6, .016), (FULL, .012)])
sea = lp(bp(rng.standard_normal(N), 90, 800, 1), 600) * env_lin([(0, 0), (16.5, 0), (18.0, .03), (30.5, .03), (31.33, 0), (FULL, 0)])
low = lp(rng.standard_normal(N), 180, 2) * env_lin([(0, 0), (31.4, 0), (32.0, .03), (36.5, .03), (37.4, 0), (FULL, 0)])
for x in (air, sea, low): mix += st(x)

# ---------------- score ----------------
ev = []
CH = {'Em': [40, 47, 52, 55, 59], 'C': [36, 43, 48, 52, 55], 'D': [38, 45, 50, 54, 57], 'Am': [45, 52, 57, 60, 64], 'G': [43, 50, 55, 59, 62]}
# A (bars 1-2): a high bowed shimmer over a low cello pedal; one glockenspiel note when the point ignites
ev += [(0.05, 'vibraphone_bowed', 'B5', 5.4, .34, -.3, .28), (0.05, 'vibraphone_bowed', 'E6', 5.4, .3, .3, .22), (0.0, 'cellos', 'E2', 5.6, .36, 0, .3)]
for e in evs('point'): ev.append((e['t'], 'glockenspiel', 'E6', 2.0, .34, .2, .32))
for e in evs('title'): ev.append((e['t'], 'hand_chimes', 'B5', 2.2, .36, -.2, .3))
# B-D: the pulse (contrabass pizzicato on beats), frame drum on downbeats
PULSE = {3: 'Em', 4: 'Em', 5: 'C', 6: 'Em', 7: 'C', 8: 'Am', 9: 'C', 10: 'D', 11: 'Em', 12: 'C'}
for b, ch in PULSE.items():
    c = CH[ch]
    for q in range(4):
        if b == 12 and q >= 2: continue                              # the half bar of silence before the break
        ev.append((bt(b, q), 'contrabass_pizz', c[0] if q % 2 == 0 else c[1], .5, .5 if q == 0 else .38, -.05, .55))
    ev.append((bt(b), 'frame_drum', 'large_muted', None, .4, 0, .45))
    if b in (6, 7): ev.append((bt(b), 'vibraphone_bowed', c[3] + 12, BAR, .26, .25, .16))
    if b >= 8:                                                       # D: cello spiccato eighths while the paths fly
        for i, k in enumerate([2, 3, 2, 1, 2, 3, 2, 3]):
            if b == 12 and i >= 4: break
            ev.append((bt(b) + i * BEAT / 2, 'cellos_spic', c[k] + 12, .25, .3 + .1 * (i % 2 == 0), .25, .45))
# the line ignites (bar 3 downbeat): bowed basses + a climbing glockenspiel; it closes with a chime
ig = evs('ignite')[0]['t']
ev += [(ig, 'contrabass', 'E1', 3.2, .5, 0, .4), (ig, 'cellos', 'B2', 3.2, .4, -.2, .32), (ig, 'frame_drum', 'large', None, .58, 0, .65)]
for i, p in enumerate([76, 79, 83, 88]): ev.append((ig + i * BEAT / 2, 'glockenspiel', p, .9, .28 + .04 * i, .35 - .2 * i, .32))
for e in evs('close'): ev.append((e['t'], 'hand_chimes', 'E6', 2.2, .4, 0, .38))
# C: one hand chime per US base, E minor pentatonic
PENTA = [64, 67, 69, 71, 74]
for e in evs('base'): ev.append((e['t'], 'hand_chimes', PENTA[e['i']] + 12, 1.8, .38, -.4 + .2 * e['i'], .4))
# D: horn swell under the measured distance; the failure and the interception
ev += [(22.6, 'horn', 'E3', 2.8, .38, -.1, .3), (22.6, 'horn', 'B3', 2.8, .34, .1, .26), (25.3, 'horn', 'G3', 2.6, .36, 0, .26)]
for e in evs('fail'): ev.append((e['t'], 'contrabass_pizz', 'E1', 1.2, .5, -.3, .45))
for e in evs('intercept'): ev.append((e['t'], 'glockenspiel', 'B6', 1.2, .34, .35, .3))
# E (bars 13-14): strings drop out; low bowed pedal while the line breaks
br = evs('break')[0]['t']
ev += [(br, 'contrabass', 'E1', 5.2, .48, 0, .42), (br + .02, 'cellos', 'E2', 5.2, .3, 0, .24), (br + 1.4, 'vibraphone_bowed', 'G5', 3.6, .26, .3, .16)]
# F (bars 15-21): harp arpeggios open up; vibraphone; softer drum
for b, ch in [(15, 'Em'), (16, 'C'), (17, 'G'), (18, 'D'), (19, 'Em'), (20, 'C'), (21, 'D')]:
    c = CH[ch]
    for i, k in enumerate([1, 2, 3, 4, 3, 2, 3, 4]): ev.append((bt(b) + i * BEAT / 2, 'harp', c[k] + 12, 1.2, .3 + .05 * (i == 0), -.2 + .05 * i, .36))
    ev.append((bt(b), 'contrabass', c[0], BAR, .36, 0, .26))
    if b % 2: ev.append((bt(b), 'frame_drum', 'large_muted', None, .26, 0, .3))
for e in evs('dc'): ev.append((e['t'], 'hand_chimes', 'B5', 2.0, .38, -.3, .34))
for e in evs('year'): ev.append((e['t'], 'glockenspiel', 'E6', 1.6, .32, .3, .3))
# G: the last line; a plain E minor rings out
fin = evs('final')[0]['t']
for i, p in enumerate([40, 52, 59, 64, 67, 71, 76]): ev.append((fin + i * .03, 'harp', p, 3.6, .48, -.3 + i * .1, .5))
ev += [(fin, 'vibraphone_bowed', 'B5', FULL - fin, .3, .2, .2), (fin, 'cellos', 'E2', FULL - fin, .34, 0, .28), (fin, 'vibraphone_bowed', 'G5', FULL - fin, .26, -.2, .16)]
for e in evs('end'): ev.append((e['t'], 'hand_chimes', 'E6', 2.0, .32, .3, .28))
S.seed(5)
sc = S.render(ev, dur=FULL + 1, master=False)[:N]
f0 = 41.2
drone = np.sin(2 * np.pi * f0 * tt) + .45 * np.sin(4 * np.pi * f0 * tt) + .22 * np.sin(6 * np.pi * f0 * tt)
drone *= env_lin([(0, 0), (1.0, .02), (5.3, .024), (5.4, .045), (8, .03), (31.33, .03), (31.4, .012), (32.0, .04), (37, .03), (FULL, .012)])
sc += st(drone)
sw = bp(rng.standard_normal(N), 300, 3000, 1); swell = np.zeros(N)
for a, b in [(4.3, 5.33), (15.0, 16.0), (36.3, 37.33)]: swell += np.clip((tt - a) / (b - a), 0, 1) ** 3 * (tt < b)
sc += st(sw * swell * .05)
sc = np.stack([hp(sc[:, c], 32, 2) for c in range(2)], 1)
music += S.room(sc, size=.55, mix=.22)

# ---------------- foley tied to the picture ----------------
for e in EV:
    k, t = e['type'], e['t']
    if k == 'point': add(mix, hp(click(pitch=2.2, v=1.0), 3000) * .05, t, 1, 0)
    elif k == 'ignite':
        add(mix, thump(1.0, 48) * .24, t, 1, 0)
        n = int(3.2 * SR); x = np.arange(n) / SR
        buzz = bp(np.sin(2 * np.pi * 110 * x) + .5 * np.sin(2 * np.pi * 220.7 * x) + .3 * rng.standard_normal(n), 150, 2400, 1) * np.exp(-x / 1.2) * np.minimum(1, x / .05)
        add(mix, buzz * .03, t, 1, .15)
    elif k == 'measure':
        for i in range(7): add(mix, hp(click(pitch=1.2 + .08 * i, v=1.0), 1800) * .04, t + i * .1, 1, .2)
    elif k == 'base': add(mix, hp(click(pitch=1.7, v=1.0), 2500) * .04, t, 1, -.4 + .2 * e['i'])
    elif k == 'turn' or k == 'rise': add(mix, lp(whoosh(1.8, 1.0), 1800) * .08, t, 1, 0)
    elif k == 'path':
        n = int(3.4 * SR); x = np.arange(n) / SR
        streak = bp(rng.standard_normal(n), 400 + 300 * e['i'], 3200, 1) * np.sin(np.pi * np.clip(x / 3.4, 0, 1)) ** 2
        add(mix, streak * .035, t, 1, -.25 + .5 * e['i'])
    elif k == 'dg': add(mix, hp(click(pitch=1.4, v=1.0), 2000) * .045, t, 1, -.3)
    elif k == 'fail': add(mix, thump(.8, 70) * .12, t, 1, -.2)
    elif k == 'intercept':
        n = int(.9 * SR); x = np.arange(n) / SR
        crack = hp(rng.standard_normal(n), 1500, 2) * np.exp(-x / .12); add(mix, crack * .09, t, 1, .3); add(mix, thump(.6, 90) * .1, t, 1, .3)
    elif k == 'tick':
        for d in (0, .07): add(mix, hp(click(pitch=.9, v=1.0), 1200) * .08, t + d, 1, .25)
    elif k == 'break':
        n = int(1.6 * SR); x = np.arange(n) / SR
        tear = bp(rng.standard_normal(n), 80, 900, 2) * np.exp(-x / .6) * np.minimum(1, x / .02)
        add(mix, tear * .16, t, 1, 0); add(mix, thump(1.0, 38) * .22, t, 1, 0)
    elif k == 'seg': add(mix, hp(click(pitch=2.6 + rng.random(), v=1.0), 3500) * .022, t + .4, 1, rng.uniform(-.6, .6))
    elif k == 'dissolve': add(mix, lp(whoosh(1.4, 1.0), 2400) * .1, t, 1, 0)
    elif k == 'ruler':
        for i in range(4): add(mix, hp(click(pitch=1.0 + .1 * i, v=1.0), 1500) * .06, t + i * .18, 1, -.2 + .15 * i)

# suspense, as in the first trailer: a heartbeat under the tense middle (bars 6-12) and deep impacts on the big turns
for b in range(6, 13):
    for q in (0, 2):
        if b == 12 and q == 2: continue                              # the half bar of silence before the break
        t = bt(b, q); g = .14 + .02 * (b - 6)
        add(mix, thump(.5, 52) * g, t, 1, 0); add(mix, thump(.4, 60) * g * .55, t + .22, 1, 0)
for t in (5.33, 16.0, 32.0, 37.33, 56.67):
    n = int(2.6 * SR); x = np.arange(n) / SR
    boom = np.sin(2 * np.pi * np.cumsum(36 + 80 * np.exp(-x * 6)) / SR) * np.exp(-x * 1.6)
    add(mix, boom * .2 + lp(rng.standard_normal(n), 400) * np.exp(-x * 9) * .05, t, 1, 0)

# carve the voice band from the music, duck it under every line
mid = np.stack([bp(music[:, c], 300, 4000, 2) for c in range(2)], 1)
music = music - mid * (1 - 10 ** (-4 / 20))

# ---------------- narration ----------------
TL = {v['id']: v['t'] for v in json.load(open(os.path.join(HERE, 'voice', 'timeline.json')))}
voice = np.zeros(N); active = np.zeros(N)
for c in CUES:
    x, sr = sf.read(os.path.join(HERE, 'voice', c['id'] + '.wav'), dtype='float64')
    if x.ndim > 1: x = x.mean(1)
    if sr != SR: x = soxr.resample(x, sr, SR)
    i = int(TL[c['id']] * SR); j = min(N, i + len(x)); voice[i:j] += x[:j - i]; active[i:j] = 1
voice = compress(hp(voice, 80, 2), thr=.18, ratio=3.0)
duck = np.convolve(active, np.ones(int(.25 * SR)) / int(.25 * SR), 'same'); duck = 1 - .45 * np.clip(duck * 1.4, 0, 1)
music = music * duck[:, None]
voice *= .16 / np.sqrt((voice[active > 0] ** 2).mean())
music *= (.16 * 10 ** (-10 / 20)) / np.sqrt((music[active > 0] ** 2).mean())
fx_r = np.sqrt((mix[active > 0] ** 2).mean()); mix *= min(1.0, (.16 * 10 ** (-12 / 20)) / max(fx_r, 1e-9))
mix += music + np.stack([voice, voice], 1)
out = mix[:int(FULL * SR)].copy(); nf = int(1.2 * SR); out[-nf:] *= np.linspace(1, 0, nf)[:, None] ** 1.5
out = np.stack([limit(compress(out[:, c], thr=.35, ratio=2.0)) for c in range(2)], 1)
os.makedirs(os.path.join(HERE, 'out'), exist_ok=True)
sf.write(os.path.join(HERE, 'out', 'mix.wav'), out.astype(np.float32), SR)
used = ['hand_chimes', 'vibraphone_bowed', 'contrabass_pizz', 'cellos_spic', 'contrabass', 'cellos', 'glockenspiel', 'harp', 'frame_drum', 'horn']
cr = S.credits(used); open(os.path.join(HERE, 'out', 'instruments.txt'), 'w').write('\n'.join(cr) if isinstance(cr, list) else str(cr))
vo = 20 * np.log10(np.sqrt((voice[active > 0] ** 2).mean())); mu = 20 * np.log10(np.sqrt((music[active > 0] ** 2).mean()))
print(f'mix peak {np.abs(out).max():.3f}  voice {vo:.1f} dB  music {mu:.1f} dB  gap {vo - mu:.1f} dB')
