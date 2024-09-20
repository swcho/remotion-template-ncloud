/* eslint-disable react-hooks/rules-of-hooks */
import {createContext, useContext, useEffect, useRef} from 'react';

import {gsap} from 'gsap';

import {useCurrentFrame, useVideoConfig} from 'remotion';

type Context = {
  callback?: (params: gsap.core.Timeline) => void;
};

const GsapHookContext = createContext<Context>({});

export declare namespace GsapHookContextProvider {
  export type Props = Context & {
    children?: React.ReactNode;
  };
}

export function GsapHookContextProvider(props: GsapHookContextProvider.Props) {
  const {children, callback} = props;
  return (
    <GsapHookContext.Provider value={{callback}}>
      {children}
    </GsapHookContext.Provider>
  );
}

export function useGsapTimeline<T>(
  gsapTimelineFactory: () => gsap.core.Timeline,
  deps: React.DependencyList = [],
) {
  const {callback} = useContext(GsapHookContext);
  if (callback) {
    const gsap = gsapTimelineFactory();
    callback(gsap);
    return;
  }
  const animationScopeRef = useRef<T>(null);
  const timelineRef = useRef<gsap.core.Timeline>();
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  useEffect(() => {
    const ctx = gsap.context(() => {
      timelineRef.current = gsapTimelineFactory();
      timelineRef.current.pause();
    }, animationScopeRef.current!);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationScopeRef.current, ...deps]);

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.seek(frame / fps);
    }
  }, [frame, fps]);

  return animationScopeRef;
}
