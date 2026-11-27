import json, re, sys, difflib, os
import soundfile as sf
from faster_whisper import WhisperModel
m = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=4)
NUM = {"eleven thousand, five hundred and four":"11504","five thousand, six hundred and thirty":"5630","eighty-seven":"87","fifty-eight":"58",
       "twenty-eight":"28","eleven":"11","seventeenth":"17","twenty twenty-five":"2025","2025":"2025"}
SP = {"defence":"defense","defences":"defenses","adviser":"advisor","north-east":"northeast","mohammad":"mohammed"}
def norm(x):
    x = x.lower()
    for k, v in NUM.items(): x = x.replace(k, v)
    for k, v in SP.items(): x = re.sub(r"\b" + k + r"\b", v, x)
    return re.sub(r"[^a-z0-9]", "", x)
bad = []
for e in json.load(open(sys.argv[1])):
    a, sr = sf.read(e["file"], dtype="float32")
    if sr != 16000:
        import numpy as np; idx = np.linspace(0, len(a) - 1, int(len(a) * 16000 / sr)); a = np.interp(idx, np.arange(len(a)), a).astype("float32")
    heard = " ".join(s.text for s in m.transcribe(a, beam_size=5)[0])
    r = difflib.SequenceMatcher(None, norm(e["text"]), norm(heard)).ratio()
    dur = len(a) / 16000; words = len(e["text"].split())
    if r < 0.86 or dur > 0.75 * words + 2:   # garbled/missing words, or runaway audio
        bad.append(e["file"]); print(f"BAD {r:.2f} {dur:.1f}s | {e['text']} | HEARD: {heard}", flush=True)
print(f"checked, {len(bad)} bad"); open(sys.argv[2], "w").write("\n".join(bad))
