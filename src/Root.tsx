import './style.css';
import {makeRootPresentationComposition} from './presentation/RootPresentationComposition';
import {gsap} from './tts-samples/gsap';
import {image} from './tts-samples/image';
import {intro} from './tts-samples/intro';
import {outro} from './tts-samples/outro';
import {video} from './tts-samples/video';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {makeRootPresentationComposition('intro', intro)}
      {makeRootPresentationComposition('image', image)}
      {makeRootPresentationComposition('video', video)}
      {makeRootPresentationComposition('gsap', gsap)}
      {makeRootPresentationComposition('all', [
        ...intro,
        ...image,
        ...video,
        ...outro,
      ])}
    </>
  );
};
