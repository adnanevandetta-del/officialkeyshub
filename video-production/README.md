# Video production

Everything for the YouTube channel lives here, kept separate from the website. This whole folder is
listed in `.vercelignore`, so nothing in it is uploaded to, or slows down, the website deployment.

## Raw footage — `raw-footage/`

One folder per video. Copy `_new-project-template/` and rename it for each new video.

```
raw-footage/
  iran-missile-range/          <- "Can Iran Hit America?"
    on-camera/   H1.mp4 … H9.mp4      (your on-camera clips, one per slot)
    voiceover/   VO-Cold.m4a, VO-1.m4a … VO-6.m4a   (voice-only lines, one file per chapter)
    b-roll/      any extra footage, photos or screen recordings
  _new-project-template/       <- copy this for the next video
```

The slot numbers (H1–H9) and the lines to say for each one are in the recording sheet for that
video.

### File-size rules (GitHub)

Files here are saved in the Git repository so every Claude session can see them.

| Size per file | What happens |
| --- | --- |
| under 25 MB | can be uploaded straight from the GitHub website (drag and drop) |
| 25–100 MB | must be pushed with git (or asked of Claude in a session) |
| over 100 MB | **GitHub rejects it** — split the clip, or export smaller (see below) |

Exporting to stay small: 1080p, H.264, around 8 Mbps is roughly 60 MB per minute — so keep each
on-camera clip to about a minute and a half. Voice-only audio (.m4a) is tiny and never a problem.
For big source files, keep the originals on your computer or cloud drive and put a shared link in a
`LINKS.md` file in the project folder instead.

## YouTube skills — `.claude/skills/yt-*`

Eleven skills from [youtube-agent-skill](https://github.com/Jakeschincariol/youtube-agent-skill)
(MIT, see `.claude/skills/YOUTUBE-AGENT-SKILLS-LICENSE`), saved in this repo so every session loads
them:

| command | use it for |
| --- | --- |
| `/yt-script` | a script from an idea, with five hooks scored |
| `/yt-package` | title + thumbnail checked as one pairing |
| `/yt-seo` | description, tags, search queries |
| `/yt-chapters` | chapters that follow YouTube's rules |
| `/yt-shorts` | Shorts cut from a long video |
| `/yt-edit` | cut list (dead air, filler, retakes) from a transcript |
| `/yt-retention` | read a YouTube Studio retention export |
| `/yt-comment` | triage comments and draft replies |
| `/yt-plan` | a weekly upload plan that fits your hours |
| `/yt-viral` | what is working in your niche, ranked by outlier multiple |
| `/yt-audit` | a channel audit that ends in one fix |

**Voice profile:** the skills read a voice profile describing how you talk on camera. A blank one
is at `.claude/youtube/voice.md` — fill it in once (or send Claude three of your videos and ask it
to fill it in). The skills look for it at `~/.claude/youtube/voice.md`, which is outside this repo
and is wiped with each cloud session, so when you use a `/yt-*` skill say "use the voice profile in
.claude/youtube/voice.md" and Claude will copy it into place first.
