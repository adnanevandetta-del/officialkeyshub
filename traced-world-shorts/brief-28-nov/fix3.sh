S=/tmp/claude-0/-home-user-officialkeyshub/39654c7a-130c-5f84-a31f-97fde0cd2dfe/scratchpad; cd $S
./cbx/bin/python - <<'PY' 2>&1 | grep "^gen"
import torch, torchaudio as ta, json
from chatterbox.tts import ChatterboxTTS
m = ChatterboxTTS.from_pretrained(device="cpu"); jobs = {}
L = {"d63b0f44ba": "According to sources cited by Reuters, the attackers exploited a software flaw to reach the system's control plane. That's the layer administrators use, to manage it.",
     "bba9627a2d": "And it is still not known who the hackers are, or whether any data was taken."}
for h, txt in L.items():
    jobs[h] = []
    for seed in (5, 15, 25, 35):
        torch.manual_seed(seed); p = f"cb/cand/{h}_{seed}.wav"
        ta.save(p, m.generate(txt, audio_prompt_path="cb/emma_ref.wav", exaggeration=0.4, cfg_weight=0.5, temperature=0.7), m.sr); jobs[h].append(p); print("gen", p)
json.dump(jobs, open("cb/cand/fix3.json", "w"))
PY
python3 - <<'PY' 2>&1 | grep -v -i warn
import json, shutil, soundfile as sf, numpy as np
from faster_whisper import WhisperModel
m = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=4)
need = {"d63b0f44ba": "administrators use to manage", "bba9627a2d": "it is still not known"}
for h, cands in json.load(open("cb/cand/fix3.json")).items():
    pick = None
    for p in cands:
        a, sr = sf.read(p, dtype="float32"); idx = np.linspace(0, len(a)-1, int(len(a)*16000/sr)); a = np.interp(idx, np.arange(len(a)), a).astype("float32")
        t = " ".join(s.text for s in m.transcribe(a, beam_size=5)[0]).lower().replace(",", "")
        ok = need[h] in t or (h == "bba9627a2d" and "it's still not known" in t); print(h, ok, "|", t.strip())
        if ok and not pick: pick = p
    if pick: shutil.copy(pick, f"cb/brief_sent/{h}.wav"); print("USING", pick)
    else: print("NO CLEAN TAKE for", h)
PY
cd tw/brief && rm -rf final && BEATS=$S/tw/brief/beats.json CB_MANIFEST=$S/cb/brief_sent/manifest.json python3 world_week.py final > render.log 2>&1; grep -E "^DONE|Traceback" render.log | tail -1
CB_MANIFEST=$S/cb/brief_sent/shorts_manifest.json python3 shorts_vo.py shorts.json shorts_final 06 2>&1 | grep -E "^DONE|Traceback"
