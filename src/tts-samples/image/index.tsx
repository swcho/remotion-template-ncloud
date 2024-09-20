/* eslint-disable @remotion/warn-native-media-tag */
import {PresentationConfig} from '@/presentation/presentation-utils';

import TitleContent from '../layout/TitleContent';
import {makeChanterIntro} from '../layout/layout-utils';

import img from './image.png';
import img2 from './image2.png';

const TITLE = 'Image 포함하기';

export const image: PresentationConfig[] = [
  makeChanterIntro(TITLE),
  {
    duration: {
      caption: '간단하게 이미지를 첨부할 수 있습니다.',
    },
    Component: () => (
      <TitleContent title={TITLE}>
        <>
          <img
            className="h-full w-full object-contain"
            src="https://fastly.picsum.photos/id/563/200/300.jpg?hmac=SZO4DbUo3eM7wbKdFWm2jUkpnLD7OkJda_aTTd8FP9k"
          />
        </>
      </TitleContent>
    ),
  },
  {
    duration: {
      caption: '소스 코드에 포함된 로컬 이미지를 임포트하고,',
    },
    Component: () => (
      <TitleContent title={TITLE}>
        <>
          <img className="h-full w-full object-contain" src={img} />
        </>
      </TitleContent>
    ),
  },
  {
    duration: {
      caption: 'img 테그를 사용하여 화면을 구성합니다.',
    },
    Component: () => (
      <TitleContent title={TITLE}>
        <>
          <img className="h-full w-full object-contain" src={img2} />
        </>
      </TitleContent>
    ),
  },
];
