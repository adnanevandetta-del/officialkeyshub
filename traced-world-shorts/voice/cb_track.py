"""Generate every narration sentence of beats.json with Chatterbox, in Emma's voice (reference clip)."""
import json, re, os, sys, hashlib, torch, torchaudio as ta
from chatterbox.tts import ChatterboxTTS
beats_path, ref, outdir = sys.argv[1:4]
os.makedirs(outdir, exist_ok=True)
SAY = {  # phonetic spellings so the model says names the way newsreaders do
 r"\bHouthis\b": "Hoo-theez", r"\bHouthi\b": "Hoo-thee", r"\bRas Tanura\b": "Rass Tanoora",
 r"\bRiyadh's\b": "Ree-yahd's", r"\bRiyadh\b": "Ree-yahd", r"\bKharkiv\b": "Kharkiv",
 r"\bSuspilne\b": "Soos-peel-neh", r"\bHassakeh\b": "Hassaka", r"\bBundibugyo\b": "Boondee-boog-yo",
 r"\bPutin\b": "Pootin", r"\bTajani\b": "Tah-yah-nee", r"\bAraghchi\b": "Arak-chee",
 r"\bRheinmetall\b": "Rine-metal", r"\bMarandi\b": "Mah-rahn-dee", r"\bISIS\b": "Eye-sis",
 r"\bAfrica CDC\b": "Africa C.D.C.", r"\bUN\b": "U.N.", r"\b2025\b": "twenty twenty-five",
}
def prep(s):
    for k, v in SAY.items(): s = re.sub(k, v, s)
    return s
m = ChatterboxTTS.from_pretrained(device="cpu")
d = json.load(open(beats_path)); man = []
for si, seg in enumerate(d["segments"]):
    for bi, b in enumerate(seg["beats"]):
        for k, s in enumerate(re.split(r"(?<=[.!?])\s+", b["vo"])):
            h = hashlib.md5(prep(s).encode()).hexdigest()[:10]; p = os.path.join(outdir, h + ".wav")
            if not os.path.exists(p):
                torch.manual_seed(int(os.environ.get("CB_SEED", "7")))
                w = m.generate(prep(s), audio_prompt_path=ref, exaggeration=0.4, cfg_weight=0.5, temperature=0.7)
                ta.save(p, w, m.sr)
            man.append({"seg": si, "beat": bi, "k": k, "text": s, "said": prep(s), "file": p})
            print(len(man), s[:50], flush=True)
json.dump(man, open(os.path.join(outdir, os.environ.get("MANIFEST_NAME", "manifest.json")), "w"), indent=1)
print("CB DONE")
