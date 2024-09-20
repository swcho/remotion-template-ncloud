import {createRoot} from 'react-dom/client';

import {getAudioInfo} from '../tts/ncloud-proxy';
import {GsapHookContextProvider} from '../utils/useGsapTimeline';

export type DurationConfig =
  | {
      seconds: number;
    }
  | {
      caption: string;
      audioDelay?: number;
    }
  | {
      gsapTimeline: boolean;
    };

export type PresentationProps = {
  index: number;
  transitionPaddingFrames: number;
  durationInFrames: number;
  durationConfig: DurationConfig;

  /** duration info */
  duration: number;
  audioInfo?: Awaited<ReturnType<typeof getAudioInfo>> & {
    audioDelayInFrames: number;
  };
};

export type PresentationConfig = {
  duration: DurationConfig;
  Component?: React.FC<PresentationProps>;
};

export type PresentationOptions = {
  fps: number;
  audioDelay: number;
  transitionDuration: number;
};

export function secondsToFrames(fps: number, seconds: number) {
  return Math.floor(fps * seconds);
}

export async function getPresentationPropList(
  presentations: PresentationConfig[],
  options: PresentationOptions,
) {
  const {fps, transitionDuration} = options;
  const ret: PresentationProps[] = [];
  let index = 0;
  const transitionPaddingFrames = secondsToFrames(fps, transitionDuration);
  for (const presentation of presentations) {
    const durationInfo = await getPresentationDuration(presentation, options);
    const {duration: durationConfig} = presentation;
    const {duration} = durationInfo;
    const edge = index === 0 || index === presentations.length - 1;
    const durationInFrames = secondsToFrames(
      fps,
      duration + (edge ? transitionDuration : transitionDuration * 2),
    );
    ret.push({
      durationConfig,
      transitionPaddingFrames,
      durationInFrames,
      index,
      ...durationInfo,
    });
    index += 1;
  }
  return ret;
}

function getGsapDuration(
  Component: NonNullable<PresentationConfig['Component']>,
) {
  return new Promise<number>((resolve) => {
    let duration = 0;
    const root = createRoot(document.createElement('div'));
    const callback = (gsap: gsap.core.Timeline) => {
      duration = gsap.totalDuration();
      root.unmount();
      resolve(duration);
    };
    root.render(
      <GsapHookContextProvider callback={callback}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Component {...({} as any)} />
      </GsapHookContextProvider>,
    );
  });
}

async function getPresentationDuration(
  presentation: PresentationConfig,
  {fps, audioDelay: audioDelayDefault}: PresentationOptions,
): Promise<
  Omit<
    PresentationProps,
    | 'index'
    | 'from'
    | 'durationInFrames'
    | 'durationConfig'
    | 'transitionPaddingFrames'
  >
> {
  const {duration} = presentation;
  if ('seconds' in duration) {
    const {seconds} = duration;
    return {duration: seconds};
  }
  if ('caption' in duration) {
    const {caption, audioDelay: audioDelayUser} = duration;
    const audioDelay =
      audioDelayUser === 0 ? 0.01 : audioDelayUser || audioDelayDefault;
    const audioInfo = await getAudioInfo({text: caption, voice: 'nara'});
    const audioDelayInFrames = secondsToFrames(fps, audioDelay);
    // console.log(duration);
    return {
      audioInfo: {...audioInfo, audioDelayInFrames},
      duration: audioInfo.duration + audioDelay,
    };
  }
  if ('gsapTimeline' in duration) {
    const {Component} = presentation;
    const duration = (Component && (await getGsapDuration(Component))) || 0;
    console.log('gsapTimeline', {duration});
    return {duration};
  }
  throw new Error('Invalid config');
}
