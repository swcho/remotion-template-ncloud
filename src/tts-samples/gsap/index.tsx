/* eslint-disable @remotion/deterministic-randomness */
/** @jsx jsx  */
/** @jsxFrag */
/* eslint-disable @remotion/warn-native-media-tag */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {jsx} from '@emotion/react';

import React from 'react';
import Svg from 'react-inlinesvg';

import clsx from 'clsx';
import {gsap as Gsap} from 'gsap';

import {PresentationConfig} from '../../presentation/presentation-utils';
import {useGsapTimeline} from '../../utils/useGsapTimeline';
import TitleContent from '../layout/TitleContent';
import {makeChanterIntro} from '../layout/layout-utils';

import svgSample from './SvgSample.svg';
// import './SvgSample.css';

const TITLE = 'GSAP 활용하기';

const POT_BOTTOM_Y = 585;
const POTS_TIMES = [
  {
    duration: 0.5 + Math.random() * 0.3,
    delay: 0,
  },
  {
    duration: 0.5 + Math.random() * 0.3,
    delay: 0.5,
  },
  {
    duration: 0.5 + Math.random() * 0.3,
    delay: 0.2,
  },
];

export const gsap: PresentationConfig[] = [
  makeChanterIntro(TITLE),
  {
    duration: {
      caption: 'GSAP을 사용하여 에니메이션을 추가할 수 있습니다.',
    },
    Component: ({from}) => {
      const ref1 = React.useRef(null);
      const animationBoxRef: React.RefObject<HTMLDivElement> = useGsapTimeline(
        from,
        () => {
          const scope = animationBoxRef.current!;
          // console.log('Gsap.scope', scope);
          const q = Gsap.utils.selector(scope);
          const masterTimeline = Gsap.timeline();

          const potsTimeline = q('.pot').map((pot, i) => {
            const timeline = Gsap.timeline();
            timeline.from(pot, {
              duration: POTS_TIMES[i].duration,
              delay: POTS_TIMES[i].delay,
              y: -POT_BOTTOM_Y,
            });
            return timeline;
          });

          const shadowsTimeline = q('.pot-shadow').map((shadow, i) => {
            const timeline = Gsap.timeline();
            timeline.from(shadow, {
              duration: POTS_TIMES[i].duration,
              // ease: Power0.easeInOut,
              ease: 'power1.inOut',
              delay: POTS_TIMES[i].delay,
              scale: 0,
              transformOrigin: 'center center',
            });
            return timeline;
          });

          const leafsTimeline = q('.leaf').map((leaf) => {
            const isBack = leaf.classList.contains('leaf-back');
            const timeline = Gsap.timeline();
            timeline.from(leaf, {
              duration: 0.5 + Math.random() * 0.8,
              delay: isBack ? 0.5 : 0,
              // ease: Back.easeOut.config(0.5 + Math.random()),
              ease: 'back.out',
              scale: 0,
              yPercent: 10 * Math.random(),
              transformOrigin: 'center bottom',
            });

            return timeline;
          });

          const flowersTimeline = q('.flower').map((flower) => {
            const isLeft = flower.classList.contains('flower-left');
            const timeline = Gsap.timeline();
            timeline.from(flower, {
              duration: 1 + Number(Math.random()),
              // ease: Circ.easeOut,
              ease: 'circ.out',
              scale: 0,
              transformOrigin: isLeft ? 'right bottom' : 'left bottom',
            });
            return timeline;
          });

          masterTimeline
            .to(q('.replay-text'), {opacity: 0, duration: 0})
            .add(potsTimeline, 0)
            .add(shadowsTimeline, 0)
            .add(leafsTimeline)
            .add(flowersTimeline)
            .to(q('.replay-text'), {opacity: 1, duration: 0.5});

          return masterTimeline;
        },
      );

      if (!animationBoxRef) {
        return <></>;
      }

      // console.log({from});
      return (
        <TitleContent innerRef={ref1} title={TITLE}>
          <div ref={animationBoxRef}>
            {/* [GSAP SVG Plants](https://codepen.io/denisinvader/pen/wxNGwZ) */}
            <Svg
              css={{
                '.no-fill, .cactus-prickle': {
                  fill: 'none',
                },
                '.back': {
                  fill: '#b8c6d1',
                },
                '.replay-text': {
                  fill: '#ffffff',
                  fontSize: '24px',
                  fontFamily: 'Helvetica, sans, monospace, sans-serif',
                  userSelect: 'none',
                },
                '.pot': {
                  fill: '#e3e5e1',
                },
                '.pot-lighter': {
                  fill: '#edeeeb',
                },
                '.pot-lightest': {
                  fill: '#f6f6f4',
                },
                '.pot-top-lightest': {
                  fill: '#fff',
                },
                '.pot-top-soil': {
                  fill: '#afb4a6',
                },
                '.pot-shadow': {
                  fill: '#a1b4bd',
                },
                '.haworthia': {
                  clipPath: 'url(#haworthia-clip-path)',
                  fill: '#7ea981',
                },
                '.haworthia-strip': {
                  fill: '#c7e5ce',
                },
                '.haworthia-ouline': {
                  fill: '#709c74',
                  opacity: '0.5',
                },
                '.cactus': {
                  clipPath: 'url(#cactus-clip-path)',
                  fill: '#5b9a7c',
                },
                '.cactus-lighter': {
                  fill: '#63a689',
                },
                '.cactus-lightest': {
                  fill: '#6fb293',
                },
                '.cactus-prickle': {
                  stroke: '#4c8165',
                  strokeLinecap: 'round',
                  strokeMiterlimit: '10',
                  strokeWidth: '3px',
                },
                '.flower-root': {
                  fill: '#71d1a8',
                },
                '.flower-lighter': {
                  fill: '#efad96',
                },
                '.flower': {
                  fill: '#e19680',
                },
                '.flower-back': {
                  fill: '#d38570',
                },
                '.echeveria': {
                  clipPath: 'url(#echeveria-clip-path)',
                  fill: '#78b1b5',
                },
                '.echeveria-darker': {
                  fill: '#6ea8a8',
                },
                '.echeveria-lighter ': {
                  fill: '#88bfbf',
                },
              }}
              className={clsx('h-full w-full')}
              src={svgSample}
              preserveAspectRatio="xMidYMid meet"
            />
          </div>
        </TitleContent>
      );
    },
  },
];
