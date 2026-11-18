"""Place the narration on the 90 bpm grid and write voice/cues.json (subtitles) and voice/timeline.json (for the mixer)."""
import json, os, sys
D = sys.argv[1]; V = os.path.join(D, 'voice')
dur = json.load(open(os.path.join(V, 'dur.json')))
START = {'v01': .667, 'v02': 6.0, 'v03': 11.333, 'v04': 17.0, 'v05': 25.333, 'v06': 32.667, 'v07': 38.667, 'v08': 43.333, 'v09': 49.333, 'v10': 56.667}
SUB = {'v01': 'This November... Iran erased a line.', 'v02': '2,000 km. As far as its missiles were meant to fly.', 'v03': 'Inside it: Israel. The Gulf. Every American base in the region.', 'v04': 'Then, in March: two missiles flew toward Diego Garcia, about 4,000 km away.', 'v05': 'Britain says one failed, and one was shot down. Iran denies firing them.', 'v06': 'Now its Revolutionary Guard says the limit is gone.', 'v07': 'But Washington is 10,000 km away.', 'v08': 'That takes an intercontinental missile. Iran is not known to have one.', 'v09': 'US intelligence says it could build one by 2035, if it decides to.', 'v10': "The line is gone. The distance isn't."}
SUB = {'v01': 'This November, Iran erased a line it had kept for years.',
       'v02': '2,000 km. The farthest its missiles were meant to fly.',
       'v03': 'Inside it: Israel, the Gulf, and every American base in the region.',
       'v04': 'In March, during the war, two missiles flew toward Diego Garcia, about 4,000 km away.',
       'v05': 'Britain says one failed, and one was shot down. Iran denies firing them.',
       'v06': 'Now its Revolutionary Guard says the limit is gone.',
       'v07': 'But Washington is 10,000 km from Tehran.',
       'v08': 'That takes an intercontinental missile, and Iran is not known to have one.',
       'v09': 'US intelligence says it could build one by 2035, if it decides to.',
       'v10': "The line is gone. The distance isn't."}
ids = sorted(START); cues = []
for i, k in enumerate(ids):
    t0 = START[k]; end = t0 + dur[k]; nxt = START[ids[i + 1]] - .15 if i + 1 < len(ids) else 62.0
    t1 = min(max(end + .6, t0 + 1.8), nxt)
    assert end <= nxt + .15, (k, end, nxt)
    cues.append({'id': k, 't0': round(t0, 3), 't1': round(t1, 3), 'text': SUB[k]})
json.dump(cues, open(os.path.join(V, 'cues.json'), 'w'), indent=1)
json.dump([{'id': k, 't': START[k], 'dur': dur[k]} for k in ids], open(os.path.join(V, 'timeline.json'), 'w'), indent=1)
for c in cues: print(c['id'], c['t0'], c['t1'], round(c['t1'] - c['t0'], 2))
