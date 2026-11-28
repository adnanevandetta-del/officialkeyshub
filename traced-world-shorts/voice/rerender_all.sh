S=/tmp/claude-0/-home-user-officialkeyshub/39654c7a-130c-5f84-a31f-97fde0cd2dfe/scratchpad
cd $S/tw/brief && rm -rf final prev && BEATS=$S/tw/brief/beats.json CB_MANIFEST=$S/cb/brief_sent/manifest.json python3 world_week.py final > render.log 2>&1; grep -E "^DONE|Traceback" render.log | tail -1
cd $S/tw/week && rm -rf final_v2 && CB_MANIFEST=$S/cb/sent/manifest.json python3 world_week.py final_v2 > render_v2.log 2>&1; grep -E "^DONE|Traceback" render_v2.log | tail -1
cd $S/tw && mkdir -p shorts_v2 && python3 render2.py stories.json shorts_v2 2>&1 | grep -E "^done|Traceback"
