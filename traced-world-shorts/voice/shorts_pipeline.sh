S=/tmp/claude-0/-home-user-officialkeyshub/39654c7a-130c-5f84-a31f-97fde0cd2dfe/scratchpad; cd $S
while pgrep -f brief_pipeline.sh >/dev/null; do sleep 30; done
OUT=$S/cb/brief_sent; B=$S/tw/brief/shorts_voice.json; M=$OUT/shorts_manifest.json
MANIFEST_NAME=shorts_manifest.json ./cbx/bin/python cb/cb_track.py $B $S/cb/emma_ref.wav $OUT 2>&1 | grep -E "CB DONE|Traceback" || true
for round in 1 2; do
  python3 cb/check_sent.py $M cb/shorts_bad.txt 2>&1 | grep -E "BAD|checked"
  [ -s cb/shorts_bad.txt ] || break
  xargs rm -f < cb/shorts_bad.txt
  MANIFEST_NAME=shorts_manifest.json CB_SEED=$((7+round*11)) ./cbx/bin/python cb/cb_track.py $B $S/cb/emma_ref.wav $OUT 2>&1 | grep -E "CB DONE" || true
done
cd tw/brief && CB_MANIFEST=$M python3 shorts_vo.py shorts.json shorts_final 2>&1 | grep -E "^DONE|Traceback"
