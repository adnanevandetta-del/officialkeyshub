set -e
S=/tmp/claude-0/-home-user-officialkeyshub/39654c7a-130c-5f84-a31f-97fde0cd2dfe/scratchpad; cd $S
./cbx/bin/python - <<'PY' 2>&1 | grep "^gen"
import json, torch, torchaudio as ta
from chatterbox.tts import ChatterboxTTS
man = json.load(open("cb/sent/manifest.json")); e = [x for x in man if x["text"].startswith("That came a day after nine")][0]
m = ChatterboxTTS.from_pretrained(device="cpu"); jobs = []
for seed in (11, 22, 33, 44):
    torch.manual_seed(seed); p = f"cb/cand/gaza9_{seed}.wav"
    w = m.generate("That came a day after nine people were reported killed, in separate strikes.", audio_prompt_path="cb/emma_ref.wav", exaggeration=0.4, cfg_weight=0.5, temperature=0.7)
    ta.save(p, w, m.sr); jobs.append(p); print("gen", p)
json.dump({"target": e["file"], "cands": jobs}, open("cb/cand/gaza9.json", "w"))
PY
python3 - <<'PY' 2>&1 | grep -v -i warn
import json, shutil, soundfile as sf, numpy as np
from faster_whisper import WhisperModel
m = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=4); j = json.load(open("cb/cand/gaza9.json")); best = None
for p in j["cands"]:
    a, sr = sf.read(p, dtype="float32"); idx = np.linspace(0, len(a)-1, int(len(a)*16000/sr)); a = np.interp(idx, np.arange(len(a)), a).astype("float32")
    t = " ".join(s.text for s in m.transcribe(a, beam_size=5)[0]).lower(); print(p, "|", t)
    if best is None and "were reported" in t and "separate strikes" in t: best = p
if not best: raise SystemExit("no clean take")
shutil.copy(best, j["target"]); print("USING", best)
PY
cd tw/week && rm -rf final_human && CB_MANIFEST=$S/cb/sent/manifest.json python3 world_week.py final_human > human.log 2>&1
grep -E "DONE|Traceback" human.log | tail -2
