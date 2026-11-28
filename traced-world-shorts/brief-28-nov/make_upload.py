import sys, os
out = sys.argv[1]; ch = open(sys.argv[2]).read().strip() if len(sys.argv) > 2 else ""
CREDIT = "Narration is AI-generated. Satellite imagery: Sentinel-2 cloudless – https://s2maps.eu by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2016). Stock footage: Pexels (illustrative, not from the events described)."
SET = """UPLOAD SETTINGS
- Category: News & Politics · Not made for kids
- Altered or synthetic content: YES (AI narrator voice)
- Add the matching THUMBNAIL.jpg{extra}
- Upload the matching captions .srt under Subtitles (English)"""
def w(name, title, desc, src, tags, pinned, extra=""):
    t = f"""TITLE:
{title}

DESCRIPTION:
{desc}

SOURCES: {src}

{CREDIT}

{tags}

---
PINNED COMMENT:
{pinned}

{SET.format(extra=extra)}
"""
    open(os.path.join(out, name + " - UPLOAD TEXT.txt"), "w", newline="\r\n").write(t)
w("Traced World Brief - 28 Nov 2026",
  "Hackers Inside the US Air Force? Kuwait Probe, Hormuz Standstill & a New Defence Pact | Traced World Brief",
  "Hackers have reportedly broken into the US Air Force's flagship Cloud One computing platform, and nobody knows yet who they are or what they took.\n\nAlso in this brief: Rome opens a murder investigation into the Kuwait drone strike that killed two Italians, the Strait of Hormuz falls from about 85 ships a day to just one, and Pakistan and Turkey pledge to stand with Saudi Arabia against the Houthis.\n\nWhich of these stories worries you most? Tell us in the comments.\n\nCHAPTERS\n" + ch,
  "Reuters (via CBS News, The Hill, Military Times); Euronews; Al Jazeera; Arab Times; CNBC; IMF PortWatch; Joint Maritime Information Centre; gCaptain; AP",
  "#WorldNews #USAirForce #Cyberattack #StraitOfHormuz #Kuwait",
  "Hackers, drones or mines: which of these stories worries you most? 👇",
  "\n- In YouTube Studio > End screen, add Video + Subscribe elements over the last 8 seconds (the end card leaves space for them)")
w("06-us-air-force-cloud-one-hack", "Hackers Reportedly Breach the US Air Force's Cloud One #shorts",
  "Reuters reports hackers breached the US Air Force's flagship Cloud One platform, which reportedly hosts command-and-control and munitions-tracking systems. The Air Force won't confirm or deny it.",
  "Reuters (via CBS News, The Hill, Military Times)", "#USAirForce #Cyberattack #Hackers #WorldNews", "Who do you think is behind the Air Force hack? 👇")
w("07-kuwait-drone-murder-probe", "Rome Opens Murder Probe Into Kuwait Drone Strike #shorts",
  "Two Italian technicians were killed by a drone in Kuwait. Rome has opened a murder investigation, Kuwait says falling debris killed them, and Iran calls the accusations baseless.",
  "Euronews, Al Jazeera, Arab Times, CNBC", "#Kuwait #Iran #Italy #WorldNews", "Who do you think launched that drone? 👇")
w("08-strait-of-hormuz-standstill", "Strait of Hormuz: From 85 Ships a Day to Just 1 #shorts",
  "One of the world's most important oil routes has almost stopped. On November 22, the IMF's PortWatch tracker recorded one ship through Hormuz, against about 85 a day before the crisis. 17 tankers have been struck since November 1.",
  "IMF PortWatch, Joint Maritime Information Centre, CNBC, gCaptain", "#StraitOfHormuz #Oil #Iran #WorldNews", "What do you think happens next in Hormuz? 👇")
w("09-pakistan-turkey-back-saudi", "Pakistan and Turkey Pledge to Back Saudi Arabia #shorts",
  "Pakistan and Turkey have pledged to support Saudi Arabia against Houthi attacks, under a pact that treats an attack on one member as an attack on all.",
  "AP", "#Pakistan #Turkey #SaudiArabia #WorldNews", "Could this pact pull more countries into the conflict? 👇")
print("ok")
