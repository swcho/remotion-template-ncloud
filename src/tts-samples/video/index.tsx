/* eslint-disable @remotion/warn-native-media-tag */
import {OffthreadVideo} from 'remotion';

import AudioSyncVideo from '../../presentation/AudioSyncVideo';
import {PresentationConfig} from '../../presentation/presentation-utils';
import TitleContent from '../layout/TitleContent';
import {makeChanterIntro} from '../layout/layout-utils';

import vd0 from './test-video.mp4';

const TITLE = '비디오 포함하기';

export const video: PresentationConfig[] = [
  makeChanterIntro(TITLE),
  {
    duration: {
      caption: '이미지와 마찬가지 방법으로 비디오를 추가할 수 있습니다.',
    },
    Component: () => (
      <TitleContent title={TITLE}>
        <OffthreadVideo className="h-full w-full object-contain" src={vd0} />
      </TitleContent>
    ),
  },
  {
    duration: {
      caption: 'TTS 오디오를 재상하는 시점에 비디오를 플레이 할 수 있습니다.',
    },
    Component: () => (
      <TitleContent title={TITLE}>
        <AudioSyncVideo className="object-contain" src={vd0} />
      </TitleContent>
    ),
  },
];
