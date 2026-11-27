import sys
ch=open(sys.argv[1]+"/chapters.txt").read().strip()
txt=f"""TITLE:
Two Italians Killed in Kuwait. Iran Says 'False Flag'. Who Really Did It? | The World This Week

DESCRIPTION:
In this week's recap, we start with a mystery. Two Italian engineers are dead in Kuwait, killed by a drone. Italy blames Iran. Tehran says it was a false flag. We lay out what we know, and end with the question no one can answer yet.

Plus: the Houthis claim a strike on Saudi Arabia's biggest oil refinery, Russia launches another overnight barrage on Ukraine, ISIS attacks a security building in north-east Syria, Israeli strikes kill eight in Gaza, and Congo's Ebola outbreak breaks a grim record.

Who do you think was behind the Kuwait strike? Tell us in the comments.

CHAPTERS
{ch}

SOURCES
Kuwait: CNN, Canberra Times, TRT World, Il Sole 24 Ore, Fox News
Saudi Arabia: Reuters, CBC, NBC News, Anadolu Agency
Ukraine: Euronews, Suspilne
Syria: Syrian state media via The National
Gaza: AP, hospital officials in Gaza
DR Congo: ECDC, WHO, UNICEF, Africa CDC

Narration is AI-generated. Satellite imagery: Sentinel-2 cloudless – https://s2maps.eu by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2016). Stock footage: Pexels (illustrative, not from the events described).

#WorldNews #Kuwait #Iran #Ukraine #Gaza

TAGS (paste into the Tags box):
world news, weekly news recap, news this week, Kuwait drone strike, Iran, Italy, false flag, Houthis, Saudi Arabia, Ras Tanura, Ukraine, Russia, Kharkiv, ISIS, Syria, Gaza, ceasefire, Ebola, Congo, Traced World

UPLOAD SETTINGS
- Thumbnail: "The World This Week - THUMBNAIL.jpg"
- Subtitles: Subtitles > Upload file > With timing > "The World This Week - captions.srt" (English)
- Category: News & Politics
- Altered or synthetic content: YES. The narrator voice is AI-generated.
- Not made for kids
- Pinned comment: "Who do you think was behind the Kuwait strike: Iran, an Iran-backed militia, or someone else? 👇"
"""
open(sys.argv[1]+"/The World This Week - UPLOAD TEXT.txt","w",newline="\r\n").write(txt)
