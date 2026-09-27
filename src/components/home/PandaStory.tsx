import { homepage } from '@/data/homepage';
import { PandaBack, PandaFrontArm, Hamper } from './PandaFigure';
import { PandaMotion } from './PandaMotion';

const SCENE_ID = 'panda-scene';

/**
 * Two pandas, one hamper. The server renders the static handoff composition (the reduced-motion
 * fallback); PandaMotion replays the full sequence once when motion is allowed.
 */
export function PandaStory() {
  const { line, srDescription, label } = homepage.panda;
  return (
    <section aria-labelledby="panda-heading" className="py-section md:py-section-md">
      <div className="mx-auto flex max-w-site flex-col items-center px-gutter md:px-gutter-md">
        <h2 id="panda-heading" className="sr-only">{label}</h2>
        <p className="sr-only">{srDescription}</p>
        <div id={SCENE_ID} className="-mx-gutter w-[calc(100%+40px)] max-w-[920px] md:mx-0 md:w-full">
          <svg viewBox="70 96 680 222" className="h-auto w-full" aria-hidden="true" focusable="false">
            <line x1={110} y1={300} x2={710} y2={300} stroke="rgba(46,38,32,0.18)" strokeWidth={1} />
            {/* Panda A (giver) — static frame: arrived, arms out */}
            <g transform="translate(133 300)">
              <g data-part="a-walk" style={{ transform: 'translate(200px, 0px)' }}>
                <PandaBack id="a" pose={{ arms: -75 }} />
              </g>
            </g>
            {/* Panda B (receiver), mirrored to face A */}
            <g transform="translate(483 300) scale(-1 1)">
              <PandaBack id="b" pose={{ arms: -75, head: -6, happy: true, blush: 0.85 }} />
            </g>
            <g data-part="hamper-carry" style={{ transform: 'translate(200px, 0px)' }}>
              <g data-part="hamper" style={{ transform: 'translate(208px, 210px)' }}>
                <Hamper />
              </g>
            </g>
            <g transform="translate(133 300)">
              <g data-part="a-walk" style={{ transform: 'translate(200px, 0px)' }}>
                <PandaFrontArm id="a" pose={{ arms: -75 }} />
              </g>
            </g>
            <g transform="translate(483 300) scale(-1 1)">
              <PandaFrontArm id="b" pose={{ arms: -75 }} />
            </g>
          </svg>
        </div>
        <p id="panda-line" className="reveal mt-10 text-center font-serif text-h3 italic text-brown-soft md:mt-14">
          {line}
        </p>
      </div>
      <PandaMotion targetId={SCENE_ID} />
    </section>
  );
}
