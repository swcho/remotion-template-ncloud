import './style.css';
import {makeRootPresentationComposition} from './presentation/RootPresentationComposition';
import {image} from './tts-samples/image';
import {intro} from './tts-samples/intro';
import {video} from './tts-samples/video';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {makeRootPresentationComposition('intro', intro)}
      {makeRootPresentationComposition('image', image)}
      {makeRootPresentationComposition('video', video)}
    </>
  );
};
