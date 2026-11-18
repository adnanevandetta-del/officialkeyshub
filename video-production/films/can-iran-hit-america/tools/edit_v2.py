import sys
P = sys.argv[1]
s = open(P, encoding='utf-8').read()
def rep(old, new, count=1):
    global s
    n = s.count(old)
    assert n == count, (n, old[:80])
    s = s.replace(old, new)

# ---- cold open clipping: the 2026 war ----
rep("ctx.fillText('SUNDAY, JUNE 22, 2025', 230, -322);", "ctx.fillText('SATURDAY, FEB. 28, 2026', 205, -322);")
rep("ctx.fillText('U.S. STRIKES IRAN', -500, -210); ctx.fillText('NUCLEAR SITES', -500, -126);",
    "ctx.fillText('U.S. AND ISRAEL', -500, -210); ctx.fillText('STRIKE IRAN', -500, -126);")
rep("'Fordow, Natanz and Isfahan hit; Tehran vows response'", "'War begins; Tehran answers with missiles across the region'")
rep("for (const [k, n] of [['fordow', 'FORDOW'], ['natanz', 'NATANZ'], ['isfahan', 'ISFAHAN']])", "for (const [k, n] of [['tehran', 'TEHRAN'], ['natanz', 'NATANZ'], ['isfahan', 'ISFAHAN']])")
rep("hand('→ Iran strikes back next day', 1010, 1010, t, 2.0,", "hand('→ the second war in a year', 1010, 1010, t, 2.0,")

# ---- cold open shot table ----
rep("""add(7, (lt, t, t0) => { clipping(t, t0); }, ['June 2025. American bombs hit Iran\\'s most protected nuclear sites.']);""",
    """add(7, (lt, t, t0) => { clipping(t, t0); }, ['February 2026. The United States and Israel went to war with Iran.']);""")
rep("""add(6.5, (lt, t, t0) => telexSheet(t, t0, ['=== FLASH // 23 JUNE 2025 ===', 'ORIGIN ..... IRAN', 'EVENT ...... BALLISTIC MISSILES LAUNCHED', 'TARGET ..... AL UDEID AIR BASE, QATAR', 'NOTE ....... LARGEST US BASE IN REGION'], 'RETALIATION', t0 + 3.4), ['The next day, Iran fired back, at the largest American base in the Middle East.']);""",
    """add(6.5, (lt, t, t0) => telexSheet(t, t0, ['=== FLASH // MARCH 2026 ===', 'ORIGIN ..... IRAN (DENIED BY TEHRAN)', 'EVENT ...... 2 BALLISTIC MISSILES', 'TARGET ..... DIEGO GARCIA, INDIAN OCEAN', 'DISTANCE ... ≈ 4,000 KM (UK GOVERNMENT)', 'RESULT ..... 1 FAILED · 1 INTERCEPTED'], 'DISPUTED', t0 + 4.2), ['In March, Britain said two missiles flew toward Diego Garcia,', 'a US and UK base about four thousand kilometers away.', 'Iran denied firing them.']);""")
rep("""add(8, (lt, t, t0) => worldReach(t, t0, lt), ['But Iran\\'s missiles stop at about two thousand kilometers.', 'America is ten thousand away.']);""",
    """add(8, (lt, t, t0) => worldReach(t, t0, lt), ['For years, Iran said its missiles stop at two thousand kilometers.', 'This month, it said that limit is gone.', 'America is still ten thousand away.']);""")
rep("""['So here\\'s the question nobody in Washington wants to ask out loud:', 'if Iran is ever attacked again, could it build a missile that reaches America?', 'And how long would it take?']""",
    """['So here\\'s the question everyone is asking now:', 'with the line gone, could Iran actually build a missile that reaches America?', 'And how long would it take?']""")
# worldReach: strike the old limit, stamp LIFTED
rep("""  { const q = pj(...REACH2[REACH2.length - 1]); hand('max ≈ 2,000 km', q.x - 40, q.y - 50, t, t0 + 2.9, { size: 50, rot: -.06 }); }""",
    """  { const q = pj(...REACH2[REACH2.length - 1]); hand('max ≈ 2,000 km', q.x - 40, q.y - 50, t, t0 + 2.9, { size: 50, rot: -.06 });
    if (lt > 4.2) { const p = eout((lt - 4.2) / .5); ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(q.x - 50, q.y - 52); ctx.lineTo(q.x - 50 + 330 * p, q.y - 74 - 6 * p); ctx.stroke(); ctx.restore(); }
    stampAt('LIMIT LIFTED · NOV 2026', q.x + 120, q.y - 150, -.08, t, t0 + 4.8, { size: 46 }); }""")

# ---- chapter 1 ----
rep("""['Iran has the largest ballistic missile arsenal in the Middle East, numbering in the thousands.',""",
    """['Even after months of war, Iran still has one of the largest missile arsenals in the Middle East.',""")
rep("""['And that\\'s not an accident.', 'Iran\\'s leadership has said publicly that it caps its missiles at 2,000 km.', 'The official reason is that everything it says it needs to hit is inside that circle.']""",
    """['That was no accident.', 'For years, Iran\\'s commanders said the Supreme Leader had capped their missiles at 2,000 km.', 'Then, on November 7th, the Revolutionary Guard said: that restriction has been lifted.']""")
rep("""const body = ['1. IRANIAN COMMANDERS HAVE STATED PUBLICLY', '   THAT MISSILE RANGE IS LIMITED TO', '   2,000 KM BY ORDER OF THE SUPREME LEADER.', '', '2. STATED RATIONALE: ALL REQUIRED TARGETS', '   (ISRAEL, US REGIONAL BASES) LIE WITHIN', '   THAT RADIUS.', '', '3. THE LIMIT IS A POLICY CHOICE,', '   NOT A PROVEN TECHNICAL CEILING.'];""",
    """const body = ['1. FOR YEARS, IRANIAN COMMANDERS SAID', '   MISSILE RANGE WAS LIMITED TO', '   2,000 KM BY ORDER OF THE SUPREME LEADER.', '', '2. STATED RATIONALE: ALL REQUIRED TARGETS', '   (ISRAEL, US REGIONAL BASES) LIE WITHIN', '   THAT RADIUS.', '', '3. 7 NOV 2026, IRGC: "THAT RESTRICTION', '   HAS BEEN LIFTED FOR US."'];""")
rep("hand('a choice — not a limit', X + 520, 900, t, t0 + 9.0, { size: 56, rot: -.06 });",
    "hand('the line is gone', X + 560, 900, t, t0 + 9.0, { size: 60, rot: -.06 }); stampAt('LIFTED', X + 980, 760, .12, t, t0 + 10.2, { size: 62 });")

# ---- chapter 2 timeline ----
rep("""const items = [[290, 400, -.04, 'APRIL 2024', 'Iran launches first direct strike on Israel', 'Drones and missiles, mostly intercepted'], [730, 640, .03, 'OCTOBER 2024', 'About 180 missiles fired at Israel', 'Second direct attack in six months'], [1180, 400, -.02, 'JUNE 2025', '12-day war; US strikes nuclear sites', 'Fordow, Natanz, Isfahan hit'], [1620, 640, .04, 'JUNE 23, 2025', 'Iranian missiles target Al Udeid', 'Iran strikes a US base directly']];""",
    """const items = [[290, 400, -.04, 'APRIL 2024', 'Iran launches first direct strike on Israel', 'Drones and missiles, mostly intercepted'], [730, 640, .03, 'JUNE 2025', 'US strikes nuclear sites; Iran hits back at Al Udeid', 'A US base targeted directly'], [1180, 400, -.02, 'FEB. 28, 2026', 'US and Israel strike Iran; war begins', 'Missiles fly across the region'], [1620, 640, .04, 'MARCH 2026', 'Two missiles toward Diego Garcia', 'About 4,000 km, says Britain; Iran denies firing them']];""")
rep("""['In the last two years, Iran went from threats to launches,', 'firing hundreds of missiles at Israel,', 'and then at a US base.']""",
    """['In two years, Iran went from threats to launches:', 'at Israel, at a US base in Qatar,', 'and, Britain says, at an island base twice as far as its old limit.']""")
rep("""'But it proved something: Iran is willing to shoot at America when it\\'s hit first.'""",
    """'But it proved something: Iran is willing to fire at American targets when it\\'s hit first.'""")

# ---- chapter 3 bar sketch ----
rep("""const bars = [['IRAN MAX', 2000, 330, RED, 1.0], ['NEW YORK', 9900, 470, GRAPH, 2.4], ['WASHINGTON', 10200, 610, GRAPH, 3.6], ['ICBM CLASS', 5500, 750, 'rgba(42,74,138,.85)', 4.8]];""",
    """const bars = [['OLD LIMIT', 2000, 290, RED, 1.0], ['DIEGO GARCIA*', 4000, 405, RED, 2.0], ['ICBM CLASS', 5500, 520, 'rgba(42,74,138,.85)', 3.0], ['NEW YORK', 9900, 635, GRAPH, 4.0], ['WASHINGTON', 10200, 750, GRAPH, 5.0]];""")
rep("typed('(ICBM = OVER 5,500 KM)', 260, 840, t, t0 + 6.2, { size: 20, cps: 50, alpha: .7 });",
    "typed('(ICBM = OVER 5,500 KM)   * UK FIGURE, MARCH 2026; IRAN DENIES THE LAUNCH', 260, 850, t, t0 + 6.2, { size: 20, cps: 60, alpha: .7 });")
rep("""add(11, (lt, t, t0) => barSketch(t, t0), ['That\\'s five times the range of anything Iran has ever fired.']);""",
    """add(11, (lt, t, t0) => barSketch(t, t0), ['That\\'s five times Iran\\'s old limit,', 'and more than twice as far as the Diego Garcia launch Britain reported.']);""")

# ---- chapter 6: what comes next ----
rep("""add(3, (lt, t, t0) => chapterCard(t, t0, 'SIX', 'IF IRAN IS ATTACKED AGAIN'), []);""",
    """add(3, (lt, t, t0) => chapterCard(t, t0, 'SIX', 'WHAT COMES NEXT'), []);""")
rep("""add(5, (lt, t, t0) => hostFull(t, t0, 'you: the scenario'), ['So imagine Iran is attacked again. What actually changes?']);""",
    """add(5, (lt, t, t0) => hostFull(t, t0, 'you: what comes next'), ['So the line is gone. What could actually happen next?', 'Here are three possibilities. None of them is certain.']);""")
rep("""add(15, (lt, t, t0) => scenarioBoard(t, t0), ['An attack could push Iran to drop its self-imposed limit and race for longer range.', 'But the problems don\\'t disappear.', 'It would still need years, and every test would be seen.']);""",
    """add(9, (lt, t, t0) => scenarioBoard(t, t0, 0), ['One: it\\'s a warning.', 'Words aimed at deterring new strikes, and at winning leverage in talks with Washington.', 'No new missile has to exist for that to work.']);
add(9, (lt, t, t0) => scenarioBoard(t, t0, 1), ['Two: stretch what it already has.', 'Iranian state media claim a lighter warhead could push the Khorramshahr missile to three or four thousand kilometers.', 'That\\'s unconfirmed, and it would put parts of Europe in range, not America.']);
add(9, (lt, t, t0) => scenarioBoard(t, t0, 2), ['Three: the long road, a true intercontinental missile.', 'US intelligence says that\\'s possible by 2035, if Tehran decides to build one.', 'And every test along the way would be hard to hide.']);""")
# new scenario board: three paths, earlier columns already in place
start = s.index('function scenarioBoard(t, t0) {'); end = s.index('function northAmerica(')
s = s[:start] + r"""function scenarioBoard(t, t0, stage) {
  ctx.drawImage(cork, 0, 0);
  const OLD = t0 - 100;
  typed('THREE POSSIBLE PATHS: ASSUMPTIONS, NOT FORECASTS', 120, 110, t, stage ? OLD : t0 + .1, { size: 34, cps: 45, color: '#f1e6c8' });
  const cols = [[360, 'SCENARIO A', 'A WARNING SHOT', ['WORDS, NOT NEW MISSILES', 'AIM: DETERRENCE, LEVERAGE'], '#2a4a8a'],
                [960, 'SCENARIO B', 'STRETCH WHAT IT HAS', ['LIGHTER WARHEAD: 3-4,000 KM', 'EUROPE IN RANGE, NOT USA'], '#b07a12'],
                [1560, 'SCENARIO C', 'THE LONG ROAD', ['A REAL ICBM, ~2035 (DIA)', 'EVERY TEST VISIBLE'], '#b3221b']];
  cols.forEach(([x, tag, head, items, color], k) => {
    if (k > stage) return;
    const s0 = k < stage ? OLD : t0 + .4;
    const h = clip(x, 300, k === 1 ? .02 : -.02, t, s0, tag, head, '');
    items.forEach((it, i) => { const yy = 560 + i * 170; const a = fin(t, s0 + 1.4 + i * 1.6, .3); if (a <= 0) return;
      ctx.save(); ctx.globalAlpha = a; ctx.translate(x, yy); ctx.rotate((i % 2 ? .02 : -.02)); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 8; ctx.drawImage(card, -260, -60, 520, 120); ctx.restore();
      typed(it, x - 235, yy + 10, t, s0 + 1.5 + i * 1.6, { size: 26, cps: 45 }); corkPin({ x, y: yy - 50 }, color); });
    if (h) corkPin(h, color);
  });
  if (stage === 2 && t > t0 + 6.5) hand('which one is it?', 960, 975, t, t0 + 6.5, { size: 64, color: '#f1e6c8', align: 'center', rot: -.02 });
}
""" + s[end:]

# ---- verdict + open question ----
rep("""const rows = [['TODAY', 'NO ICBM · MAX RANGE ≈ 2,000 KM', 'NO', 'rgba(40,120,60,1)', 1.2], ['IN ~10 YEARS', 'POSSIBLE — IF IRAN DECIDES TO BUILD IT', 'POSSIBLE', 'rgba(190,120,20,1)', 4.6], ['WILL IT?', 'THE REAL QUESTION', 'UNKNOWN', 'rgba(176,26,20,1)', 8.0]];""",
    """const rows = [['TODAY', 'NO ICBM · LIMIT LIFTED, LONGER REACH UNPROVEN', 'NO', 'rgba(40,120,60,1)', 1.2], ['IN ~10 YEARS', 'POSSIBLE — IF IRAN DECIDES TO BUILD IT', 'POSSIBLE', 'rgba(190,120,20,1)', 4.6], ['WILL IT?', 'BLUFF OR BLUEPRINT?', 'UNKNOWN', 'rgba(176,26,20,1)', 8.0]];""")
rep("""['So, can Iran hit America? Today, no.', 'In about ten years, possibly, if it decides to cross that line.', 'And if it\\'s attacked again, that decision might come faster.', 'The real question isn\\'t whether Iran can build it. It\\'s whether it ever chooses to.', 'What do you think? Tell me in the comments.']""",
    """['So, can Iran hit America? Today, no.', 'The line is gone, but the distance isn\\'t.', 'In about ten years, possibly, if Tehran decides to build it, and the tests would be hard to hide.', 'So here\\'s my question for you:', 'is lifting the limit a real plan, or a warning shot meant to buy leverage?', 'Tell me what you think in the comments.']""")
open(P, 'w', encoding='utf-8').write(s)
print('ok')
