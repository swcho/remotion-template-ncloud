import './style.css';
import {makeRootPresentationComposition} from './presentation/RootPresentationComposition';
import {image} from './tts-samples/image';
import {intro} from './tts-samples/intro';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {makeRootPresentationComposition('intro', intro)}
      {makeRootPresentationComposition('image', image)}
    </>
  );
};
