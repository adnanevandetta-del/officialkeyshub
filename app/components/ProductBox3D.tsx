import type { CSSProperties } from "react";

// A real 3D product box built from CSS faces: front cover image, coloured spine
// with the product name, sides, top and bottom. The parent must keep
// transform-style: preserve-3d and lift the site-wide max-width cap
// (`.x * { max-width: none }`), since the faces hang off a centred anchor.
export default function ProductBox3D({
  image,
  short,
  accent,
  dark,
  w,
  frontClassName = "",
}: {
  image: string;
  short: string;
  accent: string;
  dark: string;
  w: number;
  frontClassName?: string;
}) {
  const h = Math.round(w * 1.38);
  const d = Math.round(w * 0.24);
  const face = (extra: CSSProperties): CSSProperties => ({ position: "absolute", left: "50%", top: "50%", ...extra });
  return (
    <div style={{ position: "relative", transformStyle: "preserve-3d", width: w, height: h }}>
      <div
        className={frontClassName}
        style={face({ width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2, transform: `translateZ(${d / 2}px)`, backgroundImage: `url("${image}")`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: 4 })}
      >
        <div className="okh-box-gloss" />
      </div>
      <div style={face({ width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2, transform: `rotateY(180deg) translateZ(${d / 2}px)`, background: dark, borderRadius: 4 })} />
      <div style={face({ width: d, height: h, marginLeft: -d / 2, marginTop: -h / 2, transform: `rotateY(90deg) translateZ(${w / 2}px)`, background: `linear-gradient(180deg, ${accent}, ${dark})` })}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ writingMode: "vertical-rl", color: "rgba(255,255,255,.9)", fontSize: Math.max(8, w * 0.065), fontWeight: 700, letterSpacing: ".08em", whiteSpace: "nowrap" }}>{short}</span>
        </div>
      </div>
      <div style={face({ width: d, height: h, marginLeft: -d / 2, marginTop: -h / 2, transform: `rotateY(-90deg) translateZ(${w / 2}px)`, background: dark })} />
      <div style={face({ width: w, height: d, marginLeft: -w / 2, marginTop: -d / 2, transform: `rotateX(90deg) translateZ(${h / 2}px)`, background: "#f1f5f9" })} />
      <div style={face({ width: w, height: d, marginLeft: -w / 2, marginTop: -d / 2, transform: `rotateX(-90deg) translateZ(${h / 2}px)`, background: "#cbd5e1" })} />
    </div>
  );
}
