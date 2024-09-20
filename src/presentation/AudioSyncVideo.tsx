import * as React from 'react';

import {Img, OffthreadVideo, Sequence} from 'remotion';

import {usePresentationContext} from './RootPresentationComposition';

export type Props = {
  className?: string;
  placeholder?: string;
  src: string;
};

function AudioSyncVideo(props: Props) {
  const {className, placeholder, src: videoSrc} = props;

  const {audioFrom} = usePresentationContext();
  return (
    <div className={className || 'h-full w-full relative'}>
      {placeholder ? (
        <Img
          className="absolute h-full w-full object-contain"
          src={placeholder}
        />
      ) : (
        // eslint-disable-next-line @remotion/warn-native-media-tag
        <video
          className="absolute h-full w-full object-contain"
          src={videoSrc}
        />
      )}
      {audioFrom && (
        <Sequence from={audioFrom}>
          <OffthreadVideo
            className="absolute h-full w-full object-contain"
            src={videoSrc}
          />
        </Sequence>
      )}
    </div>
  );
}

export default React.memo(AudioSyncVideo);
