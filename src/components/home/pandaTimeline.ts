/**
 * The two-panda sequence, as Web Animations API keyframes. Only transform + opacity are animated.
 * Loaded lazily (dynamic import) as the section approaches the viewport.
 */
type Track = [offset: number, value: string][];

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const INOUT = 'cubic-bezier(0.45, 0, 0.55, 1)';
export const DURATION = 5600;

const tx = (x: number, y = 0) => `translate(${x}px, ${y}px)`;
const rot = (d: number) => `rotate(${d}deg)`;

// Walk: four gentle steps between 0.30 and 0.66.
const stepPeaks = [0.345, 0.435, 0.525, 0.615];
const bob: Track = [
  [0, tx(0)], [0.07, tx(0)], [0.14, tx(0, 5)], [0.18, tx(0, 5)], [0.27, tx(0)], [0.3, tx(0)],
  ...stepPeaks.flatMap((p): Track => [[p, tx(0, -3)], [p + 0.045, tx(0)]]),
  [0.8, tx(0, -2)], [0.875, tx(0)], [1, tx(0)],
];
export const tracks: Record<string, Track> = {
  'a-walk': [[0, tx(0)], [0.3, tx(0)], [0.66, tx(200)], [0.77, tx(200)], [0.875, tx(188)], [1, tx(188)]],
  // The hamper rides on the same walk curve as Panda A, so it stays in its paws.
  'hamper-carry': [[0, tx(0)], [0.3, tx(0)], [0.66, tx(200)], [1, tx(200)]],
  'a-upper': bob,
  'a-upperFront': bob,
  'a-legFront': [[0, tx(0)], [0.3, tx(0)], [0.345, tx(3, -5)], [0.39, tx(0)], [0.525, tx(3, -5)], [0.57, tx(0)], [0.8, tx(-3, -3)], [0.875, tx(0)], [1, tx(0)]],
  'a-legBack': [[0, tx(0)], [0.39, tx(0)], [0.435, tx(3, -5)], [0.48, tx(0)], [0.615, tx(3, -5)], [0.66, tx(0)], [1, tx(0)]],
  'a-armBack': [[0, rot(0)], [0.07, rot(0)], [0.16, rot(-35)], [0.18, rot(-35)], [0.28, rot(-75)], [0.77, rot(-75)], [0.875, rot(-6)], [1, rot(-6)]],
  'a-armFront': [[0, rot(0)], [0.07, rot(0)], [0.16, rot(-35)], [0.18, rot(-35)], [0.28, rot(-75)], [0.77, rot(-75)], [0.875, rot(-6)], [1, rot(-6)]],
  hamper: [
    [0, tx(193, 276)], [0.16, tx(193, 276)], [0.27, tx(183, 210)], [0.3, tx(183, 210)],
    ...stepPeaks.flatMap((p): Track => [[p, tx(183, 207)], [p + 0.045, tx(183, 210)]]),
    [0.77, tx(183, 210)], [0.875, tx(221, 212)], [1, tx(221, 212)],
  ],
  'b-armBack': [[0, rot(0)], [0.66, rot(0)], [0.77, rot(-75)], [0.875, rot(-72)], [1, rot(-72)]],
  'b-armFront': [[0, rot(0)], [0.66, rot(0)], [0.77, rot(-75)], [0.875, rot(-72)], [1, rot(-72)]],
  'b-head': [[0, rot(0)], [0.88, rot(0)], [0.95, rot(-6)], [1, rot(-6)]],
};

export const fades: Record<string, [number, number][]> = {
  'b-eyesOpen': [[0, 1], [0.9, 1], [0.94, 0], [1, 0]],
  'b-eyesHappy': [[0, 0], [0.9, 0], [0.94, 1], [1, 1]],
  'b-blush': [[0, 0], [0.9, 0], [1, 0.85]],
};

const easingFor = (key: string) => (key === 'a-walk' || key === 'hamper-carry' ? INOUT : EASE);

/** Build paused animations (frame 0 applied immediately). Call .play() on each to run. */
export function createSequence(root: Element): Animation[] {
  const anims: Animation[] = [];
  const opts: KeyframeAnimationOptions = { duration: DURATION, fill: 'both' };
  for (const [key, track] of Object.entries(tracks)) {
    const kf = track.map(([offset, transform]) => ({ offset, transform, easing: easingFor(key) }));
    root.querySelectorAll(`[data-part="${key}"]`).forEach((el) => {
      const a = el.animate(kf, opts);
      a.pause();
      anims.push(a);
    });
  }
  for (const [key, track] of Object.entries(fades)) {
    const kf = track.map(([offset, opacity]) => ({ offset, opacity, easing: EASE }));
    root.querySelectorAll(`[data-part="${key}"]`).forEach((el) => {
      const a = el.animate(kf, opts);
      a.pause();
      anims.push(a);
    });
  }
  return anims;
}
