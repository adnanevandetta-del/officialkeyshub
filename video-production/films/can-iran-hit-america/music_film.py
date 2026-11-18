# Original dark-synth underscore, generated procedurally (royalty-free by construction).
import numpy as np, wave
import json
_TM = json.load(open('timing.json'))['shots']; _ST = [sum(_TM[:i]) for i in range(len(_TM))]
SR = 48000; T = round(sum(_TM) + .1, 2); N = int(SR * T); t = np.arange(N) / SR
rng = np.random.default_rng(7)

def env_adsr(n, a, r):
    e = np.ones(n); ai = int(a * SR); ri = int(r * SR)
    e[:ai] = np.linspace(0, 1, ai); e[-ri:] = np.linspace(1, 0, ri); return e

out = np.zeros((N, 2))
# chord progression of drones (Hz), changes on chapter boundaries
chap = [0] + [_ST[i] for i in (5, 11, 15, 20, 25, 30, 37)] + [T]
roots = [41.2, 55.0, 49.0, 46.25, 43.65, 49.0, 41.2, 36.7]
for i, r in enumerate(roots):
    s, e = int(chap[i] * SR), int(chap[i + 1] * SR); n = e - s; tt = t[s:e]
    sig = np.zeros(n)
    for k, (mul, amp) in enumerate([(1, .5), (1.5, .25), (2, .22), (3, .08), (4.0, .05)]):
        det = 1 + .003 * (k % 2)
        sig += amp * (np.sin(2 * np.pi * r * mul * tt) + np.sin(2 * np.pi * r * mul * det * tt + 1.3)) / 2
    lfo = .6 + .4 * np.sin(2 * np.pi * .13 * tt + i)
    sig *= lfo * env_adsr(n, min(1.2, n / SR / 3), min(1.2, n / SR / 3))
    out[s:e, 0] += sig * .9; out[s:e, 1] += sig * .9 * (1 + .1 * np.sin(2 * np.pi * .07 * tt))

# pulse: low "heartbeat" kick every beat at 80 bpm, ramps intensity
beat = 60 / 72
for bt in np.arange(1.0, T - 1.5, beat):
    s = int(bt * SR); n = int(.35 * SR)
    if s + n > N: break
    tt = np.arange(n) / SR; f = 50 + 70 * np.exp(-tt * 30)
    k = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 9)
    inten = .25 + .35 * (bt / T)
    out[s:s + n] += (k * inten)[:, None]

# hi ticks (data clicks) on 16ths, filtered noise
for bt in np.arange(0.5, T - 1, beat / 4):
    if rng.random() < .55: continue
    s = int(bt * SR); n = int(.03 * SR); nz = rng.standard_normal(n) * np.exp(-np.arange(n) / SR * 160)
    nz = np.diff(np.concatenate([[0], nz]))
    pan = rng.random(); out[s:s + n, 0] += nz * .05 * pan; out[s:s + n, 1] += nz * .05 * (1 - pan)

# risers + impacts at key beats
for hit in [_ST[1]] + chap[1:-1]:
    rs = int((hit - 2.0) * SR); n = int(2.0 * SR)
    if rs > 0:
        tt = np.arange(n) / SR; nz = rng.standard_normal(n)
        sweep = np.sin(2 * np.pi * np.cumsum(200 + 1800 * (tt / 2) ** 2) / SR)
        rise = (nz * .25 + sweep * .4) * (tt / 2) ** 2.5 * .22
        out[rs:rs + n] += rise[:, None]
    s = int(hit * SR); n = int(2.5 * SR)
    if s + n > N: n = N - s
    tt = np.arange(n) / SR
    boom = np.sin(2 * np.pi * np.cumsum(38 + 90 * np.exp(-tt * 6)) / SR) * np.exp(-tt * 1.8) * .9
    crack = rng.standard_normal(n) * np.exp(-tt * 25) * .25
    out[s:s + n] += (boom + crack)[:, None]

# simple reverb-ish smear via feedback delays
for d, g in [(0.113, .3), (0.171, .25), (0.293, .2)]:
    di = int(d * SR); out[di:, 0] += out[:-di, 1] * g; out[di:, 1] += out[:-di, 0] * g

fade = np.ones(N); fi = int(2.5 * SR); fade[-fi:] = np.linspace(1, 0, fi); fade[:int(.6 * SR)] = np.linspace(0, 1, int(.6 * SR))
out *= fade[:, None]
out /= np.max(np.abs(out)) + 1e-9
out *= 10 ** (-14 / 20)  # peak at -14 dBFS so narration sits on top
pcm = (out * 32767).astype(np.int16)
with wave.open('music_film.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print('ok', T)
