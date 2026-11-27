import json, os, sys, re, torch, torchaudio as ta
sys.argv_ = sys.argv
from chatterbox.tts import ChatterboxTTS
man = json.load(open("cb/sent/manifest.json"))
TARGET = {"Two were killed in clashes, and two blew themselves up.": "Two of them were killed in clashes. And two blew themselves up.",
          "Suspilne": "Soos-pilnay", "Marandi": "Mah-ran-dee", "Araghchi": "Arak-chee"}
m = ChatterboxTTS.from_pretrained(device="cpu"); os.makedirs("cb/cand", exist_ok=True); jobs = []
for e in man:
    said = e["said"]; hit = False
    for k, v in TARGET.items():
        if k in e["text"] or k in said:
            hit = True
            said = said.replace(k, v) if k in said else said
            said = re.sub(r"Soos-peel-neh", "Soos-pilnay", said); said = re.sub(r"Mah-rahn-dee", "Mah-ran-dee", said); said = re.sub(r"Ah-rahg-chee", "Arak-chee", said)
    if not hit: continue
    if e["text"].startswith("Officials say all four"): pass
    for seed in (101, 202, 303):
        p = f"cb/cand/{os.path.basename(e['file'])[:-4]}_{seed}.wav"
        torch.manual_seed(seed)
        w = m.generate(said, audio_prompt_path="cb/emma_ref.wav", exaggeration=0.4, cfg_weight=0.5, temperature=0.7)
        ta.save(p, w, m.sr); jobs.append({"text": e["text"], "said": said, "target": e["file"], "cand": p}); print("gen", p, "|", said, flush=True)
json.dump(jobs, open("cb/cand/jobs.json", "w"), indent=1)
