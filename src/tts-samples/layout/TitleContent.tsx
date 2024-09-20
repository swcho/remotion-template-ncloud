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
