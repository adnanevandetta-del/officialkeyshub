set -e
N=12163
until [ "$(ls v2frames 2>/dev/null | wc -l)" -ge $N ] && ! pgrep -f "render.js v2frames" >/dev/null; do sleep 20; done
ffmpeg -y -v error -framerate 30 -i v2frames/f%05d.jpg -i narration_am_fenrir.wav -i music_film.wav -filter_complex "[1:a]aresample=48000,loudnorm=I=-16:TP=-1.5,apad,asplit=2[vo1][vo2];[2:a]volume=0.35[mu];[mu][vo1]sidechaincompress=threshold=0.04:ratio=6:attack=20:release=350[duck];[duck][vo2]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95[a]" -map 0:v -map "[a]" -c:v libx264 -preset slow -crf 22 -tune grain -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart CAN_IRAN_HIT_AMERICA_v2_1080p.mp4
ffmpeg -y -v error -i CAN_IRAN_HIT_AMERICA_v2_1080p.mp4 -vf scale=1280:720 -c:v libx264 -preset veryfast -crf 27 -pix_fmt yuv420p -c:a copy -movflags +faststart CAN_IRAN_HIT_AMERICA_v2_preview720.mp4
ffprobe -v error -show_entries format=duration,size -of default=nw=1 CAN_IRAN_HIT_AMERICA_v2_1080p.mp4
ffmpeg -hide_banner -i CAN_IRAN_HIT_AMERICA_v2_1080p.mp4 -vn -af volumedetect -f null - 2>&1 | grep -E "mean_volume|max_volume"
ls -la CAN_IRAN_HIT_AMERICA_narrated_*.mp4
ffmpeg -y -v error -i CAN_IRAN_HIT_AMERICA_v2_1080p.mp4 -c:v libx264 -preset medium -crf 25 -pix_fmt yuv420p -c:a copy -movflags +faststart CAN_IRAN_HIT_AMERICA_v2_1080p_upload.mp4; ls -la CAN_IRAN_HIT_AMERICA_v2_*
