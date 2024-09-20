import {PresentationConfig} from '../../presentation/presentation-utils';

import ChapterIntro, {CHAPTER_INTRO_DURATION} from './ChapterIntro';

export function makeChanterIntro(title: string): PresentationConfig {
  return {
    duration: {
      seconds: CHAPTER_INTRO_DURATION,
    },
    Component: () => <ChapterIntro title={title} />,
  };
}
