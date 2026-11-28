"""Final QA: specs, loudness, speech-vs-script, and a contact sheet. usage: qa.py video.mp4 [script.json|-] sheet.png"""
import sys, json, re, subprocess, difflib, os
v, sj, sheet = sys.argv[1:4]
pr = json.loads(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=codec_type,width,height,r_frame_rate:format=duration", "-of", "json", v], capture_output=True, text=True).stdout)
vs = [s for s in pr["streams"] if s["codec_type"] == "video"][0]; dur = float(pr["format"]["duration"])
lu = subprocess.run(["ffmpeg", "-hide_banner", "-i", v, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
I = re.findall(r"I:\s+(-?[\d.]+) LUFS", lu)[-1]
print(f"{os.path.basename(v)} | {vs['width']}x{vs['height']} | {dur:.1f}s | {I} LUFS | audio={'yes' if any(s['codec_type']=='audio' for s in pr['streams']) else 'NO'}")
n = 8; tiles = []
for k in range(n):
    t = dur * (k + 0.5) / n; o = f"/tmp/qa_{k}.png"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{t:.2f}", "-i", v, "-frames:v", "1", "-vf", "scale=-1:300", o]); tiles.append(o)
subprocess.run(["ffmpeg", "-y", "-loglevel", "error"] + sum([["-i", t] for t in tiles], []) + ["-filter_complex", f"hstack={n}", sheet])
if sj != "-":
    import soundfile as sf, numpy as np
    from faster_whisper import WhisperModel
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", v, "-vn", "-ac", "1", "-ar", "16000", "/tmp/qa.wav"])
    a, _ = sf.read("/tmp/qa.wav", dtype="float32")
    m = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=4)
    heard = " ".join(s.text for s in m.transcribe(a, beam_size=5, vad_filter=True)[0])
    d = json.load(open(sj)); segs = d["segments"] if isinstance(d, dict) else d
    script = " ".join(b["vo"] for s in segs for b in s["beats"] if b.get("vo"))
    NUM = {"eighty-seven":"87","fifty-eight":"58","twenty-eight":"28","seventeen":"17","eighty-five":"85","two hundred":"200","eleven":"11"}
    SP = {"defence":"defense","defences":"defenses","adviser":"advisor","north-east":"northeast","mohammad":"mohammed"}
    def norm(x):
        x = x.lower()
        for k_, v_ in {**NUM, **SP}.items(): x = re.sub(r"\b" + k_ + r"\b", v_, x)
        return re.sub(r"[^a-z0-9' ]", " ", x.replace("-", " ")).split()
    A, B = norm(script), norm(heard); bad = 0
    for op, i1, i2, j1, j2 in difflib.SequenceMatcher(None, A, B, autojunk=False).get_opcodes():
        if op == "equal": continue
        s1, s2 = " ".join(A[i1:i2]), " ".join(B[j1:j2])
        if re.fullmatch(r"[\d ]+", s2 or "x") or s1.replace(" ", "") == s2.replace(" ", ""): continue
        bad += 1; print(f"   DIFF {op}: script={s1!r} heard={s2!r}")
    print(f"   speech check: {bad} differences")
