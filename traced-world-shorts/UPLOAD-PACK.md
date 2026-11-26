# Traced World: 5 Shorts, 26 Nov 2026

All Shorts are 1080x1920 H.264 at 30 fps, about 30 seconds each, with AAC audio normalised to about -16 LUFS.

Every description must keep the credit line below, because the satellite imagery is licensed CC BY 4.0:
> Satellite imagery: Sentinel-2 cloudless – https://s2maps.eu by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2016). Stock footage: Pexels (illustrative, not from the events described).

Recheck casualty figures just before posting. Tolls in breaking stories often change.

---

## 01 · Houthis claim strike on Saudi Arabia's biggest refinery
**Title:** Houthis Claim Strike on Saudi Arabia's Biggest Oil Refinery #shorts
**Description:** Yemen's Houthis say they hit the Ras Tanura refinery and Riyadh's financial district. The Saudi-led coalition says it intercepted 4 drones and has not confirmed refinery damage. 11 people were wounded in Riyadh.
Sources: Reuters, CBC, NBC News, Anadolu Agency.
**Hashtags:** #SaudiArabia #Houthis #Yemen #OilPrices #WorldNews
**Voiceover (optional):** "Yemen's Houthis say they've hit Saudi Arabia's biggest oil refinery. The group claims fires at Ras Tanura, and satellite images showed thick black smoke. The Saudi-led coalition says it shot down four drones, but hasn't confirmed any damage. In Riyadh, eleven people were wounded when a tower in the financial district was hit, the second strike on it in under a week. Oil prices jumped. Follow Traced World for the daily brief."

## 02 · Russia's overnight barrage on Ukraine
**Title:** Russia Hits Ukraine With Missiles and Drones Overnight #shorts
**Description:** Ukraine's air defences say they downed 87 missiles and drones. In Kharkiv a drone hit a residential high-rise. At least 7 people were killed and 58 injured across Ukraine, according to Suspilne.
Sources: Euronews, Suspilne.
**Hashtags:** #Ukraine #Russia #Kharkiv #UkraineWar #WorldNews
**Voiceover:** "Russia launched another wave of ballistic missiles and drones at Ukraine overnight. Ukraine says its air defences brought down eighty-seven of them. In Kharkiv, a drone hit an apartment block, killing two, and a third person died at an educational building. Across Ukraine, at least seven were killed. It comes after Putin vowed to retaliate for Ukrainian strikes on Russian energy sites."

## 03 · ISIS attack in Hassakeh, Syria
**Title:** ISIS Attack on Security Building in North-East Syria #shorts
**Description:** Syrian state media says ISIS attackers targeted an internal security building in Hassakeh. 2 security officers were killed and 5 injured. All four attackers died.
Source: Syrian state media via The National.
**Hashtags:** #Syria #ISIS #Hassakeh #MiddleEast #WorldNews
**Voiceover:** "ISIS attackers have struck a security building in Hassakeh, north-east Syria. State media says two security officers were killed and five injured. Officials say all four attackers died: two in clashes and two in suicide explosions. ISIS cells remain active in the region."

## 04 · Overnight strikes in Gaza
**Title:** Israeli Strikes Kill 8 in Gaza Despite Ceasefire #shorts
**Description:** Hospital officials in Gaza say overnight Israeli strikes killed 8 Palestinians, a day after 9 were reported killed. The ceasefire in place since October 2025 keeps being tested.
Source: AP.
**Hashtags:** #Gaza #Israel #Ceasefire #MiddleEast #WorldNews
**Voiceover:** "Overnight Israeli strikes killed eight Palestinians in Gaza, hospital officials say, a day after nine were reported killed. A ceasefire has held on paper since October 2025, but deadly strikes keep testing it. Israel says earlier strikes answered militant attacks."

## 05 · Congo's record Ebola outbreak
**Title:** Congo's Worst Ebola Outbreak Ever: 11,500+ Cases #shorts
**Description:** The ECDC counts 11,504 confirmed cases and 5,630 deaths in DR Congo as of 17 November 2026. UNICEF says 28% of confirmed cases are children. Africa CDC says the Bundibugyo-strain outbreak is not under control.
Sources: ECDC, WHO, UNICEF, Africa CDC.
**Hashtags:** #Ebola #Congo #DRC #GlobalHealth #WorldNews
**Voiceover:** "Congo's Ebola outbreak is now the worst the country has ever recorded: more than eleven and a half thousand confirmed cases and over five thousand six hundred deaths since May. Nearly three in ten cases are children. Africa CDC says the outbreak is still not under control."

---

## Posting plan
Post one Short a day for five days, at the same hour each day, starting with 01 and 02 while they're freshest. Pin a comment on each that lists the sources.

## Rebuilding / making more
`stories.json` holds the text and footage for each scene. `render2.py` builds the videos:
`python3 render2.py stories.json <out_dir> [id-filter]`. It needs ffmpeg, Pillow and numpy, plus the Pexels clips listed in `urls.txt`, saved in a `clips/` folder next to the script.
