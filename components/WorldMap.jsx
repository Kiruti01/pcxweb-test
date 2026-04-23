import DottedMap from "dotted-map";
import WorldMapClient from "./WorldMapClient";

// Pin positions probed from dotted-map with { height:60, grid:'diagonal' } → viewBox="0 0 119 60"
export const CITIES = {
  canada:  { label: "Canada",  x: 21.5, y: 12.12, lx: 21.5, ly: 8.2  },
  usa:     { label: "USA",     x: 32,   y: 21.65, lx: 32,   ly: 25.8 },
  brazil:  { label: "Brazil",  x: 41.5, y: 41.57, lx: 41.5, ly: 45.8 },
  ghana:   { label: "Ghana",   x: 59.5, y: 32.91, lx: 54.5, ly: 36.5 },
  nigeria: { label: "Nigeria", x: 62.5, y: 32.91, lx: 68.5, ly: 35.2 },
  china:   { label: "China",   x: 96.5, y: 22.52, lx: 93.5, ly: 26.8 },
  eu:      { label: "EU",      x: 62.5, y: 15.59, lx: 67.5, ly: 15.4 },
  uk:      { label: "UK",      x: 59,   y: 14.72, lx: 54.5, ly: 12.5 },
};

// Quadratic bezier control points (cx, cy) for each payment corridor
export const CONNECTIONS = [
  { from: "canada",  to: "usa",     cx: 26,  cy: 10   },
  { from: "usa",     to: "brazil",  cx: 30,  cy: 29   },
  { from: "usa",     to: "ghana",   cx: 46,  cy: 13   },
  { from: "brazil",  to: "nigeria", cx: 52,  cy: 28   },
  { from: "nigeria", to: "china",   cx: 80,  cy: 14   },
  { from: "china",   to: "eu",      cx: 83,  cy: 4    },
  { from: "eu",      to: "uk",      cx: 61,  cy: 11.5 },
  { from: "eu",      to: "canada",  cx: 42,  cy: 2    },
];

function makeDots(dotColor) {
  const map = new DottedMap({ height: 60, grid: "diagonal" });
  const raw = map.getSVG({
    radius: 0.22,
    color: dotColor,
    shape: "circle",
    backgroundColor: "transparent",
  });
  return raw.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
}

export default function WorldMap() {
  const lightDots = makeDots("#c8d5e8");
  const darkDots  = makeDots("#1a2d4a");
  return (
    <WorldMapClient
      lightDots={lightDots}
      darkDots={darkDots}
      cities={CITIES}
      connections={CONNECTIONS}
    />
  );
}
