import * as React from 'react';

import {gsap} from 'gsap';
import {SplitText} from 'gsap-trial/SplitText';

import {AbsoluteFill, OffthreadVideo, useVideoConfig} from 'remotion';

import {useGsapTimeline} from '../../utils/useGsapTimeline';

import bgm from './intro-bgm.mp4';

export type Props = {
  title: string;
};

gsap.registerPlugin(SplitText);

export const CHAPTER_INTRO_DURATION = 4;

function ChapterIntro(props: Props) {
  const {title} = props;

  const {fps} = useVideoConfig();
  const ref = useGsapTimeline<HTMLDivElement>(() => {
    const split = new SplitText('#title', {
      type: 'chars',
      reduceWhiteSpace: false,
      position: 'absolute',
    });
    return gsap.timeline().from(split.chars, {
      delay: 0.5,
      duration: 1,
      y: 0,
      autoAlpha: 0,
      stagger: 0.05,
    });
  });

  return (
    <AbsoluteFill ref={ref} className="bg-gray-100 p-5 pb-12">
      <div
        id="title"
        className="absolute text-5xl"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {title}
      </div>
      <OffthreadVideo
        src={bgm}
        className="absolute w-0 h-0"
        startFrom={1.5 * fps}
      />
    </AbsoluteFill>
  );
}

export default React.memo(ChapterIntro);
