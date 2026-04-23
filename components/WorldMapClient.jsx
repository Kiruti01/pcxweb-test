"use client";
import { useMemo, useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeContext";
import DottedMapWithoutCountries from "dotted-map/without-countries";
import mapData from "../public/map-data.json";

const W = 1000;
const H = 500;
const TOP_PAD = 5;

const PINS = [
  { label: "European Union", lat: 72.0, lng: 15.0, primary: true }, // 0
  { label: "Canada", lat: 58.0, lng: -100.0, primary: false, labelLeft: true }, // 1
  { label: "United States", lat: 25.5, lng: -105.0, primary: true }, // 2
  { label: "Brazil", lat: -32.0, lng: -55.0, primary: false }, // 3
  { label: "United Kingdom", lat: 42.5, lng: -2.0, primary: false }, // 4
  { label: "China", lat: 20.0, lng: 125.0, primary: false }, // 5
  { label: "Ghana", lat: -5.5, lng: -5.0, primary: false, labelTop: true }, // 6
  { label: "Nigeria", lat: -10.0, lng: 15.0, primary: true }, // 7
];

// [fromIndex, toIndex, invert?]  — invert curves downward instead of upward
const CONNECTIONS = [
  [1, 2, false, [155, 100, 160, 168]], // Canada → United States (curves left)
  [2, 3], // United States → Brazil
  [2, 6], // United States → Ghana
  [1, 0], // Canada → European Union
  [0, 4, false, [468, 62, 458, 122]], // EU→UK: smooth left arc
  [0, 5], // European Union → China
  [5, 7], // China → Nigeria
  [3, 7, true], // Brazil → Nigeria (curves down to avoid US→Ghana clash)
];

function toXY(lat, lng) {
  return {
    x: ((lng + 180) / 360) * W,
    y: ((90 - lat) / 180) * H,
  };
}

function arcPath(a, b, invert = false, cubic = null) {
  if (cubic) {
    const [c1x, c1y, c2x, c2y] = cubic;
    return `M${a.x},${a.y} C${c1x},${c1y} ${c2x},${c2y} ${b.x},${b.y}`;
  }
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const pull = len * 0.45;
  const dir = invert ? -1 : 1;
  const cx = mx + dir * (dy / len) * pull * 0.3;
  const cy = my + (invert ? 1 : -1) * (Math.abs(dx) / len) * pull;
  return `M${a.x},${a.y} Q${cx},${cy} ${b.x},${b.y}`;
}

export default function WorldMap() {
  const { dark } = useTheme();
  const mapPoints = useMemo(() => {
    const map = new DottedMapWithoutCountries({ map: mapData });
    return map.getPoints();
  }, []);

  const pathRefs = useRef([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    // Set up continuous traveling pulse on each path
    pathRefs.current.forEach((el, i) => {
      if (!el) return;
      const len = el.getTotalLength();
      const pulse = len * 0.35;
      const gap = len - pulse;
      el.style.strokeDasharray = `${pulse} ${gap}`;

      const duration = 6000 + (i % 3) * 1000;
      el.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
        duration,
        delay: i * 400,
        iterations: Infinity,
        easing: "linear",
      });
    });
  }, []);

  const pins = PINS.map((p) => ({ ...p, ...toXY(p.lat, p.lng) }));

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${W}/${H + TOP_PAD}` }}
    >
      {/* Paths SVG — includes the dotted map as an embedded image */}
      <svg
        viewBox={`0 ${-TOP_PAD} ${W} ${H + TOP_PAD}`}
        className="absolute inset-0 w-full h-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter
            id="glow-primary"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="4"
              floodColor="#4f5ef7"
              floodOpacity="0.8"
            />
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="8"
              floodColor="#4f5ef7"
              floodOpacity="0.4"
            />
          </filter>
          <filter id="glow-dark" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="4"
              floodColor="#5b6abf"
              floodOpacity="0.7"
            />
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="8"
              floodColor="#5b6abf"
              floodOpacity="0.35"
            />
          </filter>
          <filter id="glow-dot" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <style>{`
            @keyframes breathe {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.06); }
            }
          `}</style>
        </defs>
        {/* Base dotted map — rendered directly from point data */}
        {mapPoints.map((pt, i) => {
          // Library coords are in its own grid (height:60 → 120×60)
          // Scale to our W×H space
          const cx = (pt.x / 120) * W;
          const cy = (pt.y / 60) * H;
          return (
            <circle
              key={`dot-${i}`}
              cx={cx}
              cy={cy}
              r="1.8"
              fill={dark ? "#2a4a6b" : "#9bb0cc"}
              opacity={Math.max(pt.opacity ?? 1, 0.6)}
              style={{ pointerEvents: "none" }}
            />
          );
        })}
        {CONNECTIONS.map(([ai, bi, invert, cubic], i) => {
          const a = pins[ai];
          const b = pins[bi];
          const d = arcPath(a, b, !!invert, cubic ?? null);
          const dur = 6 + (i % 3) * 1;
          return (
            <g key={i}>
              {/* Static faint base line */}
              <path
                id={`arc-${i}`}
                d={d}
                fill="none"
                stroke="#7c86d4"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.2"
              />
              {/* Animated bright pulse */}
              <path
                ref={(el) => (pathRefs.current[i] = el)}
                d={d}
                fill="none"
                stroke="#7c86d4"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.8"
              />
              {/* Traveling dot 1 — main */}
              <circle
                r="3"
                fill="#7c9ef5"
                filter="url(#glow-dot)"
                opacity="0.9"
              >
                <animateMotion
                  dur={`${dur}s`}
                  begin={`${i * 0.4}s`}
                  repeatCount="indefinite"
                >
                  <mpath href={`#arc-${i}`} />
                </animateMotion>
              </circle>
              {/* Traveling dot 2 — offset follower */}
              <circle
                r="2.2"
                fill="#7c9ef5"
                filter="url(#glow-dot)"
                opacity="0.18"
              >
                <animateMotion
                  dur={`${dur}s`}
                  begin={`${i * 0.4 + dur * 0.5}s`}
                  repeatCount="indefinite"
                >
                  <mpath href={`#arc-${i}`} />
                </animateMotion>
              </circle>
              {/* Particle trail — tiny fading dots */}
              {[0.15, 0.35, 0.65, 0.85].map((offset, j) => (
                <circle key={j} r="1.2" fill="#a0b4f5" opacity="0">
                  <animateMotion
                    dur={`${dur}s`}
                    begin={`${i * 0.4 + dur * offset}s`}
                    repeatCount="indefinite"
                  >
                    <mpath href={`#arc-${i}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.5;0"
                    dur={`${dur * 0.3}s`}
                    begin={`${i * 0.4 + dur * offset}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="r"
                    values="1.2;0.4"
                    dur={`${dur * 0.3}s`}
                    begin={`${i * 0.4 + dur * offset}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </g>
          );
        })}

        {/* Pin dots */}
        {pins.map((pin, i) => (
          <g key={i}>
            {/* outer pulse */}
            <circle
              cx={pin.x}
              cy={pin.y}
              r="5"
              fill="none"
              stroke="#5b6abf"
              strokeWidth="1"
              opacity="0.4"
            >
              <animate
                attributeName="r"
                values="4;9;4"
                dur="3s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.4;0;0.4"
                dur="3s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
            {/* solid dot */}
            <circle
              cx={pin.x}
              cy={pin.y}
              r="3.5"
              fill={pin.primary ? "#5b6ef5" : "#4a5db5"}
            />
            <circle cx={pin.x} cy={pin.y} r="1.5" fill="white" opacity="0.9" />
          </g>
        ))}

        {/* Label chips — inside SVG so they scale with viewBox */}
        {pins.map((pin, i) => {
          const padX = 10;
          const padY = 5;
          const fontSize = 14;
          const charW = fontSize * 0.65;
          const boxW = pin.label.length * charW + padX * 2;
          const boxH = fontSize + padY * 2;
          const tx = pin.labelTop
            ? pin.x - boxW / 2
            : pin.labelLeft
              ? pin.x - 8 - boxW
              : pin.x + 8;
          const ty = pin.labelTop ? pin.y - boxH / 2 - 12 : pin.y;
          const isHovered = hovered === i;
          const glowFilter = isHovered
            ? pin.primary
              ? "url(#glow-primary)"
              : "url(#glow-dark)"
            : "none";
          const pillCenterX = tx + boxW / 2;
          const pillCenterY = ty;
          return (
            <g
              key={`label-${i}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                cursor: "pointer",
                pointerEvents: "all",
                filter: glowFilter,
                transition: "filter 0.25s ease",
                transformOrigin: `${pillCenterX}px ${pillCenterY}px`,
                animation: isHovered
                  ? "none"
                  : `breathe ${2.5 + i * 0.3}s ease-in-out infinite`,
                transform: isHovered ? "scale(1.08)" : undefined,
              }}
            >
              {/* shadow */}
              <rect
                x={tx}
                y={ty - boxH / 2 + 1}
                width={boxW}
                height={boxH}
                rx="5"
                fill="rgba(0,0,0,0.25)"
              />
              {/* background pill */}
              <rect
                x={tx}
                y={ty - boxH / 2}
                width={boxW}
                height={boxH}
                rx="5"
                fill={pin.primary ? "#4f5ef7" : "#1a2035"}
              />
              <text
                x={tx + boxW / 2}
                y={ty + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#fff"
                fontSize={fontSize}
                fontWeight="700"
                letterSpacing="0.05em"
                fontFamily="'DM Mono', 'Fira Mono', monospace"
                style={{ pointerEvents: "none" }}
              >
                {pin.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
