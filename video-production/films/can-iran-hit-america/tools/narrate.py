import json, re, sys, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
VOICE = sys.argv[1] if len(sys.argv) > 1 else 'bm_george'
SPEED = float(sys.argv[2]) if len(sys.argv) > 2 else 0.93
LANG = 'en-gb' if VOICE.startswith('b') else 'en-us'
D = '/tmp/claude-0/-home-user-officialkeyshub/124fe90d-2b57-52d7-818c-ec3f3b3ec545/scratchpad/iranvid/'
meta = json.load(open(D + 'shots_meta.json'))
k = Kokoro("models/kokoro-v1.0.onnx", "models/voices-v1.0.bin")
def speech(s):
    s = s.replace('Khorramshahr', 'Khorram-shahr').replace('7th', 'seventh').replace('2035', 'twenty thirty-five').replace('2025', 'twenty twenty-five')
    s = re.sub(r'\bkm\b', 'kilometers', s)
    s = re.sub(r'\bUS\b', 'U.S.', s)
    s = s.replace('ICBM', 'I.C.B.M.').replace('Qaem-100', 'Qaem one hundred')
    return s
SR = 24000; LEAD, GAP, TAIL = 0.5, 0.45, 0.8
shots, caps, segs = [], [], []
t = 0.0
for i, s in enumerate(meta):
    d0 = s['d']
    if not s['caps']:
        shots.append(d0); t += d0; continue
    cur = t + LEAD; lines = []
    for c in s['caps']:
        a, sr = k.create(speech(c), voice=VOICE, speed=SPEED, lang=LANG)
        a = np.asarray(a, dtype=np.float32); L = len(a) / sr
        caps.append([round(cur, 3), round(cur + L + GAP * .8, 3), c]); segs.append((cur, a))
        cur += L + GAP
    need = (cur - GAP) - t + TAIL
    d = max(d0, round(need, 2))
    shots.append(d); t += d
    print(f'shot {i:2d}: {d0:5.1f}s -> {d:5.1f}s', flush=True)
total = sum(shots)
out = np.zeros(int((total + 1) * SR), dtype=np.float32)
for st, a in segs:
    i0 = int(st * SR); out[i0:i0 + len(a)] += a
sf.write(D + f'narration_{VOICE}.wav', out, SR)
json.dump({'voice': VOICE, 'shots': shots, 'caps': caps}, open(D + 'timing.json', 'w'))
print('TOTAL', round(total, 1))
