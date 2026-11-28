set -e
S=/tmp/claude-0/-home-user-officialkeyshub/39654c7a-130c-5f84-a31f-97fde0cd2dfe/scratchpad; cd $S
OUT=$S/cb/brief_sent; B=$S/tw/brief/beats.json
./cbx/bin/python cb/cb_track.py $B $S/cb/emma_ref.wav $OUT 2>&1 | grep -E "CB DONE|Error|Traceback" || true
for round in 1 2; do
  python3 cb/check_sent.py $OUT/manifest.json cb/brief_bad.txt 2>&1 | grep -E "BAD|checked"
  [ -s cb/brief_bad.txt ] || break
  xargs rm -f < cb/brief_bad.txt
  CB_SEED=$((7+round*11)) ./cbx/bin/python cb/cb_track.py $B $S/cb/emma_ref.wav $OUT 2>&1 | grep -E "CB DONE" || true
done
cd tw/brief && BEATS=$B CB_MANIFEST=$OUT/manifest.json python3 world_week.py final > render.log 2>&1; grep -E "DONE|Traceback" render.log | tail -2
