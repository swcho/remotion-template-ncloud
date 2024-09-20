/** @jsx jsx  */
/** @jsxFrag */
/* eslint-disable @remotion/warn-native-media-tag */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {jsx} from '@emotion/react';

import * as React from 'react';

import {AbsoluteFill} from 'remotion';

export type Props = React.PropsWithChildren & {
  title: React.ReactNode;
};

function TitleContent(props: Props) {
  const {title, children} = props;
  return (
    <AbsoluteFill
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: 'repeat(8, 1fr)',
        gap: '8px',
      }}
      css={{
        /* made at https://learnui.design/tools/gradient-generator.html */
        background: `radial-gradient(circle at 100% 0%, #a0d9f2, #8dded2, #9ddda7, #c0d57f, #e3c978, #fcbb9e, #ffb0d2, #f7b0ff)`,
      }}
      className="bg-gray-100 p-5 pb-12"
    >
      <div
        style={{
          gridColumn: 'span 12 / span 12',
          gridRow: 'span 1 / span 1',
        }}
        className="text-5xl flex items-center"
      >
        {title}
      </div>
      <div
        style={{
          gridColumn: 'span 12 / span 12',
          gridRow: 'span 7 / span 7',
          gridRowStart: '2',
        }}
        className="flex justify-center items-center"
      >
        {children}
      </div>
    </AbsoluteFill>
  );
}

export default React.memo(TitleContent);
