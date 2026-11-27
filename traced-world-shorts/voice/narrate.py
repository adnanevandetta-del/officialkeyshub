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
# Broadcast pronunciations (BBC-style), as espeak IPA. Keys are matched as whole words.
LEX = {
 "Houthis": "hˈuːθiz", "Houthi": "hˈuːθi",
 "Ras Tanura": "ɹˈɑːs tanˈʊəɹə",
 "Riyadh's": "ɹiːjˈɑːdz", "Riyadh": "ɹiːjˈɑːd",
 "Kharkiv": "xˈɑːkɪv",
 "Suspilne": "suːspˈiːlnɛ",
 "Hassakeh": "hasˈɑːkə",
 "Bundibugyo": "bˌʊndɪbˈʊɡjəʊ",
 "Putin": "pˈuːtɪn",
 "Tajani": "tajˈɑːni",
 "Araghchi": "aɹˈɑːɡʧi",
 "Rheinmetall": "ɹˈaɪnmətˌɑːl",
 "Tehran": "tɛɹˈɑːn",
 "Marandi": "maɹˈandi",
}
_ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split()
_TENS = "_ _ twenty thirty forty fifty sixty seventy eighty ninety".split()
def _two(n): return _ONES[n] if n < 20 else _TENS[n // 10] + ("" if n % 10 == 0 else "-" + _ONES[n % 10])
def normalize(text):
    text = re.sub(r"\b20(\d\d)\b", lambda m: "twenty " + (_two(int(m.group(1))) if int(m.group(1)) >= 10 else "oh " + _ONES[int(m.group(1))]), text)
    return text
_LEXRE = re.compile(r"\b(" + "|".join(sorted(map(re.escape, LEX), key=len, reverse=True)) + r")\b")
def phonemes(text, lang):
    text = normalize(text); out = []; pos = 0
    for m in _LEXRE.finditer(text):
        if m.start() > pos: out.append(K.tokenizer.phonemize(text[pos:m.start()], lang))
        out.append(LEX[m.group(1)]); pos = m.end()
    if pos < len(text): out.append(K.tokenizer.phonemize(text[pos:], lang))
    p = " ".join(x.strip() for x in out if x.strip())
    return re.sub(r"\s+([,.;:!?])", r"\1", p)
def say(text, style, speed, lang):
    return K.create(phonemes(text, lang), voice=style, speed=speed, lang=lang, is_phonemes=True, trim=True)
def lang_for(spec): return "en-gb" if spec.split(":")[0].startswith("b") else "en-us"
def narrate(spec, text, speed=0.93, seed=3):
    rng = np.random.default_rng(seed); st = voice(spec); lang = lang_for(spec)
    out, sr = [], 24000
    for para in [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()]:
        sents = re.split(r"(?<=[.!?])\s+", para.replace("\n", " "))
        for i, s in enumerate(sents):
            a, sr = say(s, st, speed * rng.uniform(0.985, 1.015), lang)
            out.append(a)
            out.append(np.zeros(int(sr * rng.uniform(0.5, 0.65))))   # breath between sentences
        out.append(np.zeros(int(sr * 0.45)))                           # extra pause between paragraphs
    return np.concatenate(out).astype(np.float32), sr
def master(raw, out):
    # broadcast chain: clean lows, add warmth, soften harshness, tame sibilance, even level, tiny room, -16 LUFS
    af = ("highpass=f=75,equalizer=f=160:t=q:w=1:g=2.5,equalizer=f=3200:t=q:w=1.5:g=-2,"
          "equalizer=f=9000:t=q:w=1:g=-1.5,deesser=i=0.4,"
          "acompressor=threshold=-20dB:ratio=2.5:attack=15:release=180:makeup=2,"
          "loudnorm=I=-16:TP=-1.5:LRA=7")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", raw, "-f", "lavfi", "-i", "anoisesrc=color=pink:amplitude=0.0016:r=24000",
        "-filter_complex", f"[0:a]{af}[v];[1:a]lowpass=f=5000,aresample=48000[n];[v][n]amix=inputs=2:duration=first:normalize=0[o]",
        "-map", "[o]", "-ar", "48000", out], check=True)
if __name__ == "__main__":
    spec, src, dst = sys.argv[1:4]; speed = float(sys.argv[4]) if len(sys.argv) > 4 else 0.9
    a, sr = narrate(spec, open(src).read(), speed)
    raw = dst + ".raw.wav"; sf.write(raw, a, sr); master(raw, dst); os.remove(raw)
    print(dst, round(len(a) / sr, 1), "s")
