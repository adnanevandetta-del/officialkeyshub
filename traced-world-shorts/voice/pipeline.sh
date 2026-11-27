set -e
S=/tmp/claude-0/-home-user-officialkeyshub/39654c7a-130c-5f84-a31f-97fde0cd2dfe/scratchpad; cd $S
while pgrep -f cb_track.py >/dev/null; do sleep 20; done
./cbx/bin/python cb/cb_track.py tw/week/beats.json cb/emma_ref.wav cb/sent > cb/track2.log 2>&1
while ! grep -q "CB DONE" cb/track2.log; do sleep 20; if ! pgrep -f cb_track.py >/dev/null && ! grep -q "CB DONE" cb/track2.log; then echo "cb crashed"; tail -5 cb/track.log; exit 1; fi; done
for round in 1 2; do
  python3 cb/check_sent.py cb/sent/manifest.json cb/bad.txt 2>&1 | grep -E "BAD|checked"
  [ -s cb/bad.txt ] || break
  xargs rm -f < cb/bad.txt
  CB_SEED=$((7+round*11)) ./cbx/bin/python cb/cb_track.py tw/week/beats.json cb/emma_ref.wav cb/sent 2>&1 | grep -E "CB DONE"
done
[ -s cb/bad.txt ] && python3 cb/check_sent.py cb/sent/manifest.json cb/bad.txt 2>&1 | grep -E "BAD|checked" || true
cd tw/week && CB_MANIFEST=$S/cb/sent/manifest.json python3 world_week.py final_human 2>&1 | grep -E "DONE|Traceback|Error:" | grep -v muxer
