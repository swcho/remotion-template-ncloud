/** @jsx jsx  */
/** @jsxFrag */
/* eslint-disable @remotion/warn-native-media-tag */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {jsx} from '@emotion/react';

import {AbsoluteFill} from 'remotion';

import {PresentationConfig} from '../presentation/presentation-utils';

export const outro: PresentationConfig[] = [
  {
    duration: {
      caption: `지금까지 Clova Voice를 활용한 remotion tts 템플릿을 소개드렸습니다.
				시청해 주셔서 감사합니다.`,
    },
    Component: () => (
      <AbsoluteFill
        className="bg-gray-100 items-center justify-center"
        css={{
          /* made at https://learnui.design/tools/gradient-generator.html */
          background: `radial-gradient(circle at 100% 0%, #a0d9f2, #8dded2, #9ddda7, #c0d57f, #e3c978, #fcbb9e, #ffb0d2, #f7b0ff)`,
        }}
      >
        <div className="text-6xl">감사합니다.</div>
      </AbsoluteFill>
    ),
  },
];
