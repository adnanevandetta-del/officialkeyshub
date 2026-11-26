"""Traced World narrator: calm, natural news voice.
usage: python3 narrate.py "<voice spec>" in.txt out.wav [speed]
voice spec: a voice name (am_michael) or a blend "am_michael:0.6,bm_george:0.4"
Blank lines in in.txt = paragraph breaks (longer pause)."""
import sys, re, os, subprocess, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
HERE = os.path.dirname(os.path.abspath(__file__))
K = Kokoro(os.path.join(HERE, "model.onnx"), os.path.join(HERE, "voices.npz"))
V = np.load(os.path.join(HERE, "voices.npz"))
def voice(spec):
    if ":" not in spec: return V[spec]
    parts = [p.split(":") for p in spec.split(",")]
    tot = sum(float(w) for _, w in parts)
    return sum(V[n] * (float(w) / tot) for n, w in parts).astype(np.float32)
def lang_for(spec): return "en-gb" if spec.split(":")[0].startswith("b") else "en-us"
def narrate(spec, text, speed=0.9, seed=3):
    rng = np.random.default_rng(seed); st = voice(spec); lang = lang_for(spec)
    out, sr = [], 24000
    for para in [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()]:
        sents = re.split(r"(?<=[.!?])\s+", para.replace("\n", " "))
        for i, s in enumerate(sents):
            a, sr = K.create(s, voice=st, speed=speed * rng.uniform(0.985, 1.015), lang=lang, trim=True)
            out.append(a)
            out.append(np.zeros(int(sr * rng.uniform(0.38, 0.52))))   # breath between sentences
        out.append(np.zeros(int(sr * 0.45)))                           # extra pause between paragraphs
    return np.concatenate(out).astype(np.float32), sr
def master(raw, out):
    # broadcast chain: clean lows, add warmth, soften harshness, tame sibilance, even level, tiny room, -16 LUFS
    af = ("highpass=f=75,equalizer=f=160:t=q:w=1:g=2.5,equalizer=f=3200:t=q:w=1.5:g=-2,"
          "equalizer=f=9000:t=q:w=1:g=-1.5,deesser=i=0.4,"
          "acompressor=threshold=-20dB:ratio=2.5:attack=15:release=180:makeup=2,"
          "aecho=0.9:0.6:14|23:0.05|0.03,loudnorm=I=-16:TP=-1.5:LRA=7")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", raw, "-af", af, "-ar", "48000", out], check=True)
if __name__ == "__main__":
    spec, src, dst = sys.argv[1:4]; speed = float(sys.argv[4]) if len(sys.argv) > 4 else 0.9
    a, sr = narrate(spec, open(src).read(), speed)
    raw = dst + ".raw.wav"; sf.write(raw, a, sr); master(raw, dst); os.remove(raw)
    print(dst, round(len(a) / sr, 1), "s")
