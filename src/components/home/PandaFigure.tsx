/**
 * One original editorial panda, drawn by hand in SVG. Feet sit at local (0,0); faces right.
 * Animated parts are wrapped so every pivot is at a local origin (SVG default transform-origin: 0 0).
 * `part` picks which layer to render so the hamper can sit between the back and front layers.
 */
const INK = '#29231F';
const IVORY = '#F5F0E8';
const BLUSH = '#E2B3A8';
const BOX = '#E8CFC8'; // the MEVAÉ blush box
const RIBBON = '#A58A63'; // antique brass
const STROKE = 1.5;

export interface PandaPose {
  arms: number; // degrees
  head?: number;
  happy?: boolean;
  blush?: number;
}

export function PandaBack({ id, pose }: { id: string; pose: PandaPose }) {
  return (
    <>
      {/* legs */}
      <g data-part={`${id}-legBack`}>
        <rect x={2} y={-40} width={14} height={40} rx={6} fill={INK} />
      </g>
      <g data-part={`${id}-legFront`}>
        <rect x={-18} y={-40} width={14} height={40} rx={6} fill={INK} />
      </g>
      <g data-part={`${id}-upper`}>
        {/* back arm */}
        <g transform="translate(-4 -112)">
          <g data-part={`${id}-armBack`} style={{ transform: `rotate(${pose.arms}deg)` }}>
            <rect x={-7} y={-4} width={14} height={44} rx={7} fill={INK} />
          </g>
        </g>
        {/* body */}
        <ellipse cx={0} cy={-78} rx={31} ry={44} fill={IVORY} stroke={INK} strokeWidth={STROKE} />
        <path d="M-24 -104 Q0 -122 24 -104 L22 -96 Q0 -110 -22 -96 Z" fill={INK} />
        {/* head */}
        <g transform="translate(6 -120)">
          <g data-part={`${id}-head`} style={{ transform: `rotate(${pose.head ?? 0}deg)` }}>
            <circle cx={-15} cy={-40} r={8.5} fill={INK} />
            <circle cx={13} cy={-43} r={8.5} fill={INK} />
            <circle cx={2} cy={-22} r={25} fill={IVORY} stroke={INK} strokeWidth={STROKE} />
            <path d="M18 -29 Q35 -28 34 -15 Q33 -7 20 -8" fill={IVORY} stroke={INK} strokeWidth={STROKE} strokeLinecap="round" />
            <ellipse cx={8} cy={-26} rx={5.5} ry={7.5} transform="rotate(18 8 -26)" fill={INK} />
            <ellipse cx={22} cy={-27} rx={3.6} ry={6} transform="rotate(14 22 -27)" fill={INK} />
            <g data-part={`${id}-eyesOpen`} style={{ opacity: pose.happy ? 0 : 1 }}>
              <circle cx={9} cy={-27} r={1.6} fill={IVORY} />
              <circle cx={22.5} cy={-28} r={1.1} fill={IVORY} />
            </g>
            <g data-part={`${id}-eyesHappy`} style={{ opacity: pose.happy ? 1 : 0 }} fill="none" stroke={IVORY} strokeWidth={1.3} strokeLinecap="round">
              <path d="M5.5 -26 q3.5 -3.2 7 0" />
              <path d="M20.5 -27 q2 -2.2 4 0" />
            </g>
            <ellipse cx={34} cy={-16} rx={3.2} ry={2.4} fill={INK} />
            <path d="M33 -12 q-2.5 3 -6 1.2" fill="none" stroke={INK} strokeWidth={1} strokeLinecap="round" />
            <ellipse data-part={`${id}-blush`} cx={15} cy={-13} rx={5} ry={3} fill={BLUSH} style={{ opacity: pose.blush ?? 0 }} />
          </g>
        </g>
      </g>
    </>
  );
}

/** Front arm, rendered above the hamper. */
export function PandaFrontArm({ id, pose }: { id: string; pose: PandaPose }) {
  return (
    <g data-part={`${id}-upperFront`}>
      <g transform="translate(10 -110)">
        <g data-part={`${id}-armFront`} style={{ transform: `rotate(${pose.arms}deg)` }}>
          <rect x={-7} y={-4} width={14} height={44} rx={7} fill={INK} />
        </g>
      </g>
    </g>
  );
}

/** A simple, correct-silhouette MEVAÉ hamper box, centred on (0,0); base at y = 24. */
export function Hamper() {
  return (
    <g>
      <rect x={-32} y={-18} width={64} height={42} rx={1.5} fill={BOX} stroke={INK} strokeWidth={STROKE} />
      <rect x={-35} y={-27} width={70} height={11} rx={1.5} fill={BOX} stroke={INK} strokeWidth={STROKE} />
      <rect x={-3} y={-27} width={6} height={51} fill={RIBBON} />
      <path d="M0 -27 C-10 -38 -16 -30 -3 -27 M0 -27 C10 -38 16 -30 3 -27" fill="none" stroke={RIBBON} strokeWidth={2.4} strokeLinecap="round" />
      <path d="M-3 -27 H3" stroke={INK} strokeWidth={0.8} />
    </g>
  );
}
